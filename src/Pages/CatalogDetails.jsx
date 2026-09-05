import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { MapContainer, Rectangle, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
    FaChevronLeft,
    FaSortAmountDown,
    FaSortAmountUp,
    FaExternalLinkAlt,
} from "react-icons/fa";
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

    const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleDateString() : "Unknown");

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

    const sourceLink = data.links?.find((link) => link.rel === "self")?.href;
    const dataAccessLinks = data.links?.filter((link) => link.rel === "via") || [];

    return (
        <div className="min-h-screen bg-transparent text-[#F8FAFC] px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto space-y-10">
            {/* Header */}
            <section className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-semibold">
                    <button
                        onClick={handleUpNavigation}
                        className="flex items-center gap-2 text-[#F4C542] hover:text-white transition-colors"
                    >
                        <FaChevronLeft className="text-xs" />
                        Back
                    </button>
                    <span className="text-[#D6E1F0]">/</span>
                    <button
                        onClick={handleOverviewNavigation}
                        className="text-[#F4C542] hover:text-white transition-colors"
                    >
                        Overview
                    </button>
                </div>

                <div className="max-w-4xl space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F4C542]">
                        {catalogType.replace("-", " ")}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                        {data.title}
                    </h1>
                    <div className="flex items-center gap-3 text-sm text-[#D6E1F0]/75">
                        <span>Updated: {formatDate(data.updated)}</span>
                        {data.created && <span>• Created: {formatDate(data.created)}</span>}
                    </div>
                </div>

                {sourceLink && (
                    <a
                        href={sourceLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#F4C542] border border-white/20 rounded hover:bg-white/5 transition-colors"
                    >
                        <FaExternalLinkAlt />
                        View source
                    </a>
                )}
            </section>

            {/* Main content grid */}
            <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8">
                {/* Left column */}
                <div className="space-y-8">
                    {/* Description */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
                        <p className="text-[#D6E1F0] leading-7">{data.description}</p>

                        {data.keywords && data.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {data.keywords.map((keyword, index) => (
                                    <span key={index} className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded text-[#F8FAFC]">
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Metadata grid */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border-t border-white/10 pt-8">
                        {data.license && (
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C542] mb-2">License</p>
                                <p className="text-[#D6E1F0]">{data.license}</p>
                            </div>
                        )}

                        {data.extent?.temporal?.interval?.[0] && (
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C542] mb-2">Temporal extent</p>
                                <p className="text-[#D6E1F0]">
                                    {data.extent.temporal.interval[0][0] ? new Date(data.extent.temporal.interval[0][0]).toLocaleDateString() : "Unknown"}
                                    {" - "}
                                    {data.extent.temporal.interval[0][1] ? new Date(data.extent.temporal.interval[0][1]).toLocaleDateString() : "Present"}
                                </p>
                            </div>
                        )}

                        {data["osc:region"] && (
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C542] mb-2">Region</p>
                                <p className="text-[#D6E1F0]">{data["osc:region"]}</p>
                            </div>
                        )}

                        {data["osc:type"] && (
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C542] mb-2">Type</p>
                                <p className="text-[#D6E1F0]">{data["osc:type"]}</p>
                            </div>
                        )}

                        {data["osc:status"] && (
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C542] mb-2">Status</p>
                                <p className="text-[#D6E1F0]">{data["osc:status"]}</p>
                            </div>
                        )}
                    </section>

                    {/* Map */}
                    {data.extent?.spatial?.bbox?.[0] && (
                        <section className="border-t border-white/10 pt-8">
                            <h2 className="text-xl font-semibold text-white mb-3">Spatial coverage</h2>
                            <div className="h-96 w-full border border-white/10 rounded overflow-hidden">
                                <MapContainer bounds={bounds} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }} className="z-0">
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Rectangle bounds={bounds} pathOptions={{ color: "#F4C542", weight: 2, fillOpacity: 0.15 }} />
                                </MapContainer>
                            </div>
                        </section>
                    )}

                    {/* Data access */}
                    {dataAccessLinks.length > 0 && (
                        <section className="border-t border-white/10 pt-8">
                            <h2 className="text-xl font-semibold text-white mb-3">Data access</h2>
                            <ul className="space-y-2">
                                {dataAccessLinks.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-[#F4C542] hover:text-white transition-colors"
                                        >
                                            <FaExternalLinkAlt className="text-xs" />
                                            {link.title || `Link ${index + 1}`}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

                {/* Right column - Additional info */}
                <div className="space-y-8">
                    {(data["osc:project"] || data.themes || data["osc:missions"] || data["osc:variables"] || data["cf:parameter"]?.[0]?.name) && (
                        <section className="border-l-2 border-[#3dd6d0]/40 pl-5">
                            <h2 className="text-lg font-semibold text-white mb-4">Related resources</h2>
                            <dl className="space-y-3 text-sm">
                                {data["osc:project"] && (
                                    <>
                                        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C542]">Project</dt>
                                        <dd className="text-[#D6E1F0] mb-3">{data["osc:project"]}</dd>
                                    </>
                                )}

                                {data.themes?.find((theme) => theme.concepts?.[0]?.id) && (
                                    <>
                                        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C542]">Theme</dt>
                                        <dd className="text-[#D6E1F0] mb-3">{data.themes.find((theme) => theme.concepts?.[0]?.id).concepts[0].id}</dd>
                                    </>
                                )}

                                {data["osc:missions"] && data["osc:missions"].length > 0 && (
                                    <>
                                        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C542]">EO Missions</dt>
                                        <dd className="text-[#D6E1F0] mb-3">{data["osc:missions"].join(", ")}</dd>
                                    </>
                                )}

                                {data["osc:variables"] && data["osc:variables"].length > 0 && (
                                    <>
                                        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C542]">Variables</dt>
                                        <dd className="text-[#D6E1F0] mb-3">{data["osc:variables"].join(", ")}</dd>
                                    </>
                                )}

                                {data["cf:parameter"]?.[0]?.name && (
                                    <>
                                        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C542]">CF Parameter</dt>
                                        <dd className="text-[#D6E1F0] break-all">{data["cf:parameter"][0].name}</dd>
                                    </>
                                )}
                            </dl>
                        </section>
                    )}
                </div>
            </div>

            {/* Child products */}
            {catalogType !== "products" && childItems.length > 0 && (
                <section className="space-y-6 border-t border-white/10 pt-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-2xl font-semibold text-white">Products</h2>
                            <span className="text-sm text-[#D6E1F0]">({filteredChildItems.length})</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                placeholder="Filter..."
                                className="px-3 py-2 text-sm rounded bg-[#0b2748] border border-white/20 text-[#F8FAFC] placeholder-[#D6E1F0]/60 w-48 focus:outline-none focus:border-[#F4C542]"
                                value={childSearchTerm}
                                onChange={(e) => setChildSearchTerm(e.target.value)}
                            />

                            <button
                                onClick={() => setChildSortOrder(childSortOrder === "asc" ? "desc" : "asc")}
                                className="p-2 text-[#D6E1F0] hover:text-white transition-colors"
                                aria-label="Toggle sort"
                            >
                                {childSortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
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
                                    className={`group block border border-white/10 py-5 transition-colors hover:border-white/25 hover:bg-white/5 ${isSelected ? "border-[#F4C542]" : ""}`}
                                >
                                    <h3 className="text-lg font-semibold text-white group-hover:text-[#F4C542] transition-colors mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-[#D6E1F0] line-clamp-2 leading-6">
                                        {item.description || "No description available."}
                                    </p>
                                    {(item.extent?.temporal?.interval?.[0] || item.region) && (
                                        <div className="mt-2 flex items-center gap-3 text-xs text-[#D6E1F0]">
                                            {item.extent?.temporal?.interval?.[0] && (
                                                <span>
                                                    {new Date(item.extent.temporal.interval[0][0]).toLocaleDateString()} - {item.extent.temporal.interval[0][1] ? new Date(item.extent.temporal.interval[0][1]).toLocaleDateString() : "Present"}
                                                </span>
                                            )}
                                            {item.region && <span className="text-[#F4C542]">{item.region}</span>}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
};

export default CatalogDetails;
