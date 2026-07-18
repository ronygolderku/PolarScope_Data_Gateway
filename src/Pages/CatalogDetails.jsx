import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { MapContainer, Rectangle, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Loading from "./Loading";
import { useProductData } from "../context/ProductDataContext";

const CatalogDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [childItems, setChildItems] = useState([]);
    const [childSearchTerm, setChildSearchTerm] = useState("");
    const [childSortOrder, setChildSortOrder] = useState("asc");
    const selectionStack = location.state?.selectionStack || location.state?.returnState?.selectionStack || [];
    const selectedId = selectionStack[selectionStack.length - 1] || location.state?.selectedId || location.state?.returnState?.selectedId;

    const { pushSelection, setSelection } = useProductData();

    const pathParts = location.pathname.split("/").filter(Boolean);
    const catalogType = pathParts[0];
    const itemPath = pathParts.slice(1).join("/");

    useEffect(() => {
        let cancelled = false;

        const loadDetails = async () => {
            setData(null);
            setChildItems([]);

            const fileName = catalogType === "products" ? "collection.json" : "catalog.json";
            const fetchPath = `/data/${catalogType}/${itemPath}/${fileName}`;

            try {
                const response = await fetch(fetchPath);
                const json = await response.json();
                if (cancelled) return;

                setData(json);

                if (catalogType === "products") return;

                const childLinks = (json.links || []).filter((link) => link.rel === "child");
                if (childLinks.length === 0) return;

                const baseUrl = new URL(`/data/${catalogType}/${itemPath}/`, window.location.origin);
                const itemsWithDetails = await Promise.all(
                    childLinks.map(async (link) => {
                        try {
                            const resolvedPath = new URL(link.href, baseUrl).pathname;
                            const childRes = await fetch(resolvedPath);
                            const details = await childRes.json();

                            return {
                                ...link,
                                id: details.id,
                                title: details.title || link.title,
                                description: details.description,
                                region: details["osc:region"],
                                extent: details.extent,
                            };
                        } catch (error) {
                            console.error("Error fetching child details:", error);
                            return { ...link, title: link.title };
                        }
                    }),
                );

                if (!cancelled) {
                    setChildItems(itemsWithDetails);
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadDetails();

        return () => {
            cancelled = true;
        };
    }, [catalogType, itemPath]);

    if (!data) {
        return <Loading />;
    }

    const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleString() : "Unknown");

    const getUpPath = () => {
        if (location.state?.from) return location.state.from;

        if (catalogType === "products") {
            const theme = data?.themes?.[0]?.concepts?.[0]?.id;
            if (theme) return `/themes/${theme}`;
        }

        return `/${catalogType}`;
    };

    const sortedChildItems = [...childItems].sort((a, b) => {
        const aTitle = a.title || "";
        const bTitle = b.title || "";
        return childSortOrder === "asc" ? aTitle.localeCompare(bTitle) : bTitle.localeCompare(aTitle);
    });

    const filteredChildItems = sortedChildItems.filter((item) =>
        item.title?.toLowerCase().includes(childSearchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(childSearchTerm.toLowerCase()),
    );

    const getProductIdFromHref = (href = "") => {
        const match = href.match(/products\/([^/]+)\//);
        return match?.[1] || "";
    };

    const bbox = data.extent?.spatial?.bbox?.[0] || [-180, -90, 180, 90];
    const bounds = [
        [bbox[1], bbox[0]],
        [bbox[3], bbox[2]],
    ];

    const handleUpNavigation = () => {
        const parentReturnState = location.state?.returnState?.parentReturnState;

        if (catalogType === "products") {
            const listState = location.state?.returnState || location.state;
            if (listState?.selectionStack) setSelection(listState.selectionStack);
            navigate(getUpPath(), { state: listState });
            return;
        }

        if (parentReturnState) {
            if (parentReturnState?.selectionStack) setSelection(parentReturnState.selectionStack);
            navigate(getUpPath(), { state: parentReturnState });
            return;
        }

        const fallback = location.state?.returnState || location.state;
        if (fallback?.selectionStack) setSelection(fallback.selectionStack);
        navigate(getUpPath(), { state: fallback });
    };

    const handleOverviewNavigation = () => {
        if (catalogType === "products") {
            const theme = data?.themes?.[0]?.concepts?.[0]?.id;
            if (theme) {
                navigate(`/themes/${theme}`);
                return;
            }
        }

        navigate(`/${catalogType}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0F2D57] to-[#1B3A5F] text-[#F8FAFC]">
            <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
                <section className="rounded-3xl border border-white/10 bg-[#0b2748] p-6 md:p-8 shadow-[0_18px_60px_rgba(2,10,24,0.2)]">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-3 max-w-4xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">Record details</p>
                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">{data.title}</h1>
                            <p className="text-sm sm:text-base leading-7 text-[#D6E1F0]">In the Open Science Catalog</p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <a
                                href={data.links?.find((link) => link.rel === "self")?.href || "#"}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm rounded-full border-white/10 bg-white/5 text-[#F8FAFC] hover:bg-white/10"
                            >
                                Source
                            </a>
                            <button onClick={handleUpNavigation} className="btn btn-sm rounded-full border-white/10 bg-white/5 text-[#F8FAFC] hover:bg-white/10">Up</button>
                            <button onClick={handleOverviewNavigation} className="btn btn-sm rounded-full border-white/10 bg-white/5 text-[#F8FAFC] hover:bg-white/10">Overview</button>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-[#143A6A] p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-semibold tracking-tight text-white mb-3">Description</h2>
                            <p className="text-[#D6E1F0] leading-7 text-left">{data.description}</p>

                            {data.keywords && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {data.keywords.map((keyword, index) => (
                                        <span key={index} className="badge rounded-full bg-white/5 text-[#F8FAFC] border border-white/10">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {data.license && (
                                <div className="rounded-2xl border border-white/10 bg-[#143A6A] p-5 shadow-sm text-[#D6E1F0]">
                                    <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-[#F4C542] mb-2">License</span>
                                    <div className="leading-6">{data.license}</div>
                                </div>
                            )}

                            {data.extent?.temporal?.interval?.[0] && (
                                <div className="rounded-2xl border border-white/10 bg-[#143A6A] p-5 shadow-sm text-[#D6E1F0]">
                                    <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-[#F4C542] mb-2">Temporal extent</span>
                                    <div className="leading-6">
                                        {data.extent.temporal.interval[0][0] ? new Date(data.extent.temporal.interval[0][0]).toLocaleDateString() : "Unknown"}
                                        {" - "}
                                        {data.extent.temporal.interval[0][1] ? new Date(data.extent.temporal.interval[0][1]).toLocaleDateString() : "Present"}
                                    </div>
                                </div>
                            )}
                        </div>

                        {data.extent?.spatial?.bbox?.[0] && (
                            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#143A6A] shadow-sm">
                                <div className="border-b border-white/10 px-5 py-4">
                                    <h2 className="text-lg font-semibold tracking-tight text-white">Spatial coverage</h2>
                                </div>
                                <div className="h-[380px] w-full">
                                    <MapContainer bounds={bounds} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }} className="z-0">
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Rectangle bounds={bounds} pathOptions={{ color: "#F4C542", weight: 2, fillOpacity: 0.15 }} />
                                    </MapContainer>
                                </div>
                            </div>
                        )}

                        {(data["osc:project"] || data.themes || data["osc:missions"] || data.links) && (
                            <div className="rounded-3xl border border-white/10 bg-[#143A6A] p-6 md:p-8 shadow-sm">
                                <h2 className="text-xl font-semibold tracking-tight text-white mb-4">Additional resources</h2>
                                <div className="space-y-4 text-sm text-[#D6E1F0]">
                                    {(data["osc:project"] || data.themes || data["osc:missions"]) && (
                                        <div>
                                            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F4C542] mb-2">Related resource</div>
                                            <ul className="list-disc list-inside space-y-1 pl-1">
                                                {data["osc:project"] && <li>Project: {data["osc:project"]}</li>}
                                                {data.themes?.find((theme) => theme.concepts?.[0]?.id) && <li>Theme: {data.themes.find((theme) => theme.concepts?.[0]?.id).concepts[0].id}</li>}
                                                {data["osc:missions"]?.[0] && <li>EO Mission: {data["osc:missions"][0]}</li>}
                                            </ul>
                                        </div>
                                    )}

                                    {data.links?.filter((link) => link.rel === "via").length > 0 && (
                                        <div>
                                            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F4C542] mb-2">Data access</div>
                                            <ul className="list-disc list-inside space-y-1 pl-1">
                                                {data.links.filter((link) => link.rel === "via").map((link, index) => (
                                                    <li key={index}>
                                                        <a href={link.href} target="_blank" rel="noreferrer" className="text-[#F4C542] hover:underline">
                                                            {link.title || "Link"}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-[#143A6A] p-6 md:p-8 shadow-sm">
                            <h2 className="text-xl font-semibold tracking-tight text-white mb-4">Metadata</h2>

                            <div className="space-y-4 text-sm text-[#D6E1F0]">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F4C542] mb-2">General</div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between gap-4"><span className="font-semibold text-white">Created</span><span>{formatDate(data.created)}</span></div>
                                        <div className="flex justify-between gap-4"><span className="font-semibold text-white">Updated</span><span>{formatDate(data.updated)}</span></div>
                                    </div>
                                </div>

                                {data["cf:parameter"]?.[0]?.name && (
                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F4C542] mb-2">Cf</div>
                                        <div className="break-all">{data["cf:parameter"][0].name}</div>
                                    </div>
                                )}

                                {(data["osc:project"] || data["osc:status"] || data["osc:region"] || data["osc:type"] || data["osc:variables"] || data["osc:missions"]) && (
                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F4C542] mb-3">Open Science Catalog</div>
                                        <div className="space-y-2">
                                            {data["osc:project"] && <div className="flex justify-between gap-4"><span className="font-semibold text-white">Project</span><span className="text-[#F4C542] font-semibold text-right">{data["osc:project"]}</span></div>}
                                            {data["osc:status"] && <div className="flex justify-between gap-4"><span className="font-semibold text-white">Status</span><span className="text-right">{data["osc:status"]}</span></div>}
                                            {data["osc:region"] && <div className="flex justify-between gap-4"><span className="font-semibold text-white">Region</span><span className="text-right">{data["osc:region"]}</span></div>}
                                            {data["osc:type"] && <div className="flex justify-between gap-4"><span className="font-semibold text-white">Type</span><span className="text-right">{data["osc:type"]}</span></div>}
                                            {data["osc:variables"] && <div className="flex justify-between gap-4"><span className="font-semibold text-white">Variables</span><span className="text-right">{data["osc:variables"].join(", ")}</span></div>}
                                            {data["osc:missions"] && <div className="flex justify-between gap-4"><span className="font-semibold text-white">Missions</span><span className="text-right">{data["osc:missions"].join(", ")}</span></div>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {catalogType !== "products" && childItems.length > 0 && (
                    <section className="space-y-4 rounded-3xl border border-white/10 bg-[#0b2748] p-6 md:p-8 shadow-[0_18px_60px_rgba(2,10,24,0.18)]">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-semibold tracking-tight text-white">Products</h2>
                                <span className="badge badge-neutral text-xs rounded-full bg-white/5 text-white border border-white/10">{filteredChildItems.length}</span>
                            </div>
                            <div className="join">
                                <button className={`btn btn-sm join-item ${childSortOrder === "asc" ? "btn-active" : ""}`} onClick={() => setChildSortOrder("asc")}>A-Z</button>
                                <button className={`btn btn-sm join-item ${childSortOrder === "desc" ? "btn-active" : ""}`} onClick={() => setChildSortOrder("desc")}>Z-A</button>
                            </div>
                        </div>

                        <input
                            type="text"
                            placeholder="Filter products by title or description"
                            className="input input-bordered w-full rounded-xl bg-[#143A6A] border-white/10 text-[#F8FAFC] placeholder-[#D6E1F0] shadow-sm"
                            value={childSearchTerm}
                            onChange={(e) => setChildSearchTerm(e.target.value)}
                        />

                        <div className="grid grid-cols-1 gap-4">
                            {filteredChildItems.map((item, index) => {
                                const productId = item.id || getProductIdFromHref(item.href);
                                const navPath = productId ? `/products/${productId}` : "";
                                const isSelected = selectedId === productId;
                                const fromPath = `${location.pathname}${location.search || ""}`;
                                const parentReturnState =
                                    location.state?.returnState?.parentReturnState ||
                                    location.state?.returnState ||
                                    {
                                        selectedId: data.id,
                                        from: location.state?.from || getUpPath(),
                                        selectionStack: [data.id],
                                    };
                                const nextStack = [...(parentReturnState.selectionStack || []), productId];

                                return (
                                    <Link
                                        key={index}
                                        to={navPath}
                                        state={{
                                            from: fromPath,
                                            returnState: {
                                                selectedId: productId,
                                                selectionStack: nextStack,
                                                parentReturnState,
                                            },
                                        }}
                                        onClick={(event) => {
                                            if (!navPath) {
                                                event.preventDefault();
                                                return;
                                            }

                                            try {
                                                setSelection(nextStack);
                                                pushSelection(productId);
                                            } catch {
                                                // ignore navigation state persistence failures
                                            }
                                        }}
                                        className={`${navPath ? "cursor-pointer" : "pointer-events-none"} block rounded-2xl border border-white/10 bg-[#143A6A] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-md group ${isSelected ? "ring-2 ring-[#F4C542]" : ""}`}
                                    >
                                        <h3 className="text-lg font-semibold text-white group-hover:text-[#F4C542] mb-2">{item.title}</h3>
                                        <p className="text-sm text-[#D6E1F0] line-clamp-3 leading-6">{item.description || "No description available."}</p>
                                        {(item.extent?.temporal?.interval?.[0] || item.region) && (
                                            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[#D6E1F0]">
                                                <div className="min-w-0">
                                                    {item.extent?.temporal?.interval?.[0] && (
                                                        <span>
                                                            {new Date(item.extent.temporal.interval[0][0]).toLocaleString()} - {item.extent.temporal.interval[0][1] ? new Date(item.extent.temporal.interval[0][1]).toLocaleString() : "Present"}
                                                        </span>
                                                    )}
                                                </div>
                                                {item.region && (
                                                    <div className="flex-shrink-0 text-right">
                                                        <span className="font-semibold text-white">Region:</span>{" "}
                                                        <span className="text-[#D6E1F0]">{item.region}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default CatalogDetails;