import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import {
  FaThLarge,
  FaList,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import Loading from "./Loading";
import { useProductData } from "../context/ProductDataContext";

const CatalogList = () => {
  const { themeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Detect catalog type from URL path
  const catalogType = themeId ? 'themes' : location.pathname.split("/")[1];
  const [products, setProducts] = useState([]);
  const [themeInfo, setThemeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  // 'list' or 'tiles'
  const initialFilters = location.state?.filters || {};
  // read persistent selection stack from context as primary source
  const { selectionStack: ctxSelectionStack } = useProductData();

  const selectionStack =
    ctxSelectionStack ||
    location.state?.selectionStack ||
    location.state?.returnState?.selectionStack;

  const selectedId =
    selectionStack?.[selectionStack.length - 1] ||
    location.state?.selectedId ||
    location.state?.returnState?.selectedId;
  const [viewMode, setViewMode] = useState(initialFilters.viewMode || "list");
  // 'asc' or 'desc'
  const [sortOrder, setSortOrder] = useState(initialFilters.sortOrder || "asc");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || "");
  const [selectedKeyword, setSelectedKeyword] = useState(initialFilters.selectedKeyword || "");

  useEffect(() => {
    setLoading(true);

    // Build catalog path based on type
    const catalogPath = themeId
      ? `/data/themes/${themeId}/catalog.json`
      : `/data/${catalogType}/catalog.json`;

    fetch(catalogPath)
      .then((res) => res.json())
      .then(async (data) => {
        setThemeInfo(data);
        const childLinks = data.links.filter((link) => link.rel === "child");

        // Fetch details for each child
        const productsWithDetails = await Promise.all(
          childLinks.map(async (link) => {
            try {
              let itemPath;

              // Handle different catalog types
              if (themeId) {
                // Theme products
                const productPath = link.href
                  .replace("../../products/", "")
                  .replace("/collection.json", "");
                itemPath = `/data/products/${productPath}/collection.json`;
              } else {
                // Direct catalog items
                itemPath = link.href.replace("./", `/data/${catalogType}/`);
              }

              const res = await fetch(itemPath);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const details = await res.json();
              console.log("Fetched catalog:", itemPath, "description exists:", !!details.description);

              // For themes catalog, add image
              let image = null;
              if (catalogType === "themes" && !themeId) {
                image = `/data/${catalogType}/${details.id}/EO_${details.title}.webp`;
              }

              return {
                ...link,
                id: details.id,
                title: details.title || link.title,
                description: details.description,
                region: details["osc:region"],
                extent: details.extent,
                keywords: details.keywords || [],
                image: image,
              };
            } catch (err) {
              console.error("Error fetching details for", link.href, ":", err);
              return {
                ...link,
                id: link.id || "",
                title: link.title,
                description: link.title || "No description available",
                region: undefined,
                extent: undefined,
                keywords: [],
              };
            }
          }),
        );

        setProducts(productsWithDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [themeId, catalogType]);

  // Helper to get image based on themeId
  const getThemeImage = () => {
    if (!themeInfo) return "";
    if (themeId) {
      return `/data/themes/${themeId}/EO_${themeInfo.title}.webp`;
    }
    return "";
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const allKeywords = useMemo(() => {
    if (catalogType !== "products" || themeId) return [];
    const kwSet = new Set();
    products.forEach((p) => {
      if (p.keywords) p.keywords.forEach((k) => kwSet.add(k));
    });
    return [...kwSet].sort();
  }, [products, catalogType, themeId]);

  const sortedProducts = [...products].sort((a, b) => {
    const aTitle = a.title || "";
    const bTitle = b.title || "";
    return sortOrder === "asc"
      ? aTitle.localeCompare(bTitle)
      : bTitle.localeCompare(aTitle);
  });

  const filteredAndSortedProducts = sortedProducts.filter((product) => {
    const matchesSearch =
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKeyword =
      !selectedKeyword || product.keywords?.includes(selectedKeyword);
    return matchesSearch && matchesKeyword;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F2D57] to-[#1B3A5F] text-[#F8FAFC] p-4 md:p-6 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <section className="rounded-3xl border border-white/10 bg-[#0b2748] p-6 md:p-8 shadow-[0_18px_60px_rgba(2,10,24,0.2)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">Collection view</p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white capitalize">
              {themeInfo?.title || catalogType}
            </h1>
            <p className="max-w-3xl text-sm sm:text-base leading-7 text-[#D6E1F0]">
              Explore the collection summary, then open individual products for detailed metadata and source links.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate(themeId ? "/themes" : "/catalog")} className="btn btn-sm rounded-full border-white/10 bg-white/5 text-[#F8FAFC] hover:bg-white/10">
              Up
            </button>
            <button onClick={() => navigate("/catalog")} className="btn btn-sm rounded-full border-white/10 bg-white/5 text-[#F8FAFC] hover:bg-white/10">
              Overview
            </button>
          </div>
        </div>
      </section>

      <section className={themeId ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "grid grid-cols-1 gap-6"}>
        <div className="rounded-3xl border border-white/10 bg-[#143A6A] p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-white mb-3">Description</h2>
          <div className="text-[#D6E1F0] leading-7 text-left relative">
            <p className={`${!isExpanded ? "line-clamp-6 md:line-clamp-[10]" : ""} transition-all duration-300`}>
              {themeInfo?.description || "Description loading..."}
            </p>
            {themeInfo?.description && themeInfo.description.length > 300 && (
              <button onClick={toggleReadMore} className="mt-3 text-sm font-semibold text-[#F4C542] hover:underline focus:outline-none">
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F4C542] mb-2">Additional resources</h3>
            <ul className="list-disc list-inside text-sm text-[#D6E1F0] pl-1">
              <li>
                <a href="#" className="text-white hover:text-[#F4C542] transition-colors">
                  Description
                </a>
              </li>
            </ul>
          </div>
        </div>

        {themeId && (
          <div className="rounded-3xl border border-white/10 bg-[#143A6A] p-3 md:p-4 shadow-sm overflow-hidden">
            <img
              src={getThemeImage()}
              alt={themeId}
              className="h-full w-full max-h-[380px] min-h-[240px] object-cover rounded-2xl"
            />
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#143A6A] p-6 shadow-sm text-sm text-[#D6E1F0]">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F4C542] mb-2">General</div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between gap-4">
              <span className="font-semibold text-white">Updated</span>
              <span>{themeInfo?.updated ? new Date(themeInfo.updated).toLocaleString() : "Loading..."}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#143A6A] p-6 shadow-sm text-sm text-[#D6E1F0]">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F4C542] mb-2">Context</div>
          <p className="leading-6">
            This page summarizes the selected collection and its metadata, then links into the underlying products.
          </p>
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-white/10 bg-[#0b2748] p-6 md:p-8 shadow-[0_18px_60px_rgba(2,10,24,0.18)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-white">Catalogs</h2>
            <span className="badge badge-neutral rounded-full bg-white/5 text-white border border-white/10">{filteredAndSortedProducts.length}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="join">
              <button
                className={`btn btn-sm join-item ${viewMode === "tiles" ? "btn-active" : ""}`}
                onClick={() => setViewMode("tiles")}
              >
                <FaThLarge /> <span className="hidden sm:inline">Tiles</span>
              </button>
              <button
                className={`btn btn-sm join-item ${viewMode === "list" ? "btn-active" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <FaList /> <span className="hidden sm:inline">List</span>
              </button>
            </div>
            <div className="join">
              <button
                className={`btn btn-sm join-item ${sortOrder === "asc" ? "btn-active" : ""}`}
                onClick={() => setSortOrder("asc")}
              >
                <FaSortAmountUp />{" "}
                <span className="hidden sm:inline">Ascending</span>
              </button>
              <button
                className={`btn btn-sm join-item ${sortOrder === "desc" ? "btn-active" : ""}`}
                onClick={() => setSortOrder("desc")}
              >
                <FaSortAmountDown />{" "}
                <span className="hidden sm:inline">Descending</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Filter catalogs by title, description or keywords"
            className="input input-bordered w-full bg-[#143A6A] border-[#1B457A] text-[#F8FAFC] placeholder-[#D6E1F0]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {catalogType === "products" && !themeId && (
            <select
              className="select select-bordered w-full md:max-w-xs bg-[#143A6A] border-[#1B457A] text-[#F8FAFC]"
              value={selectedKeyword}
              onChange={(e) => setSelectedKeyword(e.target.value)}
            >
              <option value="">Select keywords</option>
              {allKeywords.map((kw) => (
                <option key={kw} value={kw}>
                  {kw}
                </option>
              ))}
            </select>
          )}
        </div>

        <div
          className={`grid ${viewMode === "tiles" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
        >
          {filteredAndSortedProducts.map((item, index) => {
            // Determine navigation path
            let navPath = "";
            if (themeId) {
              const productPath = item.href
                .replace("../../products/", "")
                .replace("/collection.json", "");
              navPath = `/products/${productPath}`;
            } else if (catalogType === "themes") {
              navPath = `/themes/${item.id}`;
            } else if (catalogType === "eo-missions" || catalogType === "variables" || catalogType === "projects" || catalogType === "products") {
              navPath = `/${catalogType}/${item.id}`;
            }

            const isSelected = selectedId === item.id;
            const fromPath = `${location.pathname}${location.search || ""}`;

            return (
              <div
                key={index}
                onClick={() =>
                  navPath &&
                  navigate(navPath, {
                    state: {
                      from: fromPath,
                      returnState: {
                        selectedId: item.id,
                        from: fromPath,
                        selectionStack: [item.id],
                        filters: {
                          viewMode,
                          sortOrder,
                          searchTerm,
                          selectedKeyword,
                        },
                      },
                    },
                  })
                }
                className={`${navPath ? "cursor-pointer" : ""} rounded-lg border border-[#1B457A] bg-[#143A6A] p-5 shadow-sm hover:shadow-md transition border-l-4 border-l-transparent hover:border-l-[#F4C542] group ${viewMode === "list" ? "flex flex-col md:flex-row gap-6" : ""
                  } ${isSelected ? "ring-2 ring-[#F4C542]" : ""}`}
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-[#F8FAFC] group-hover:text-[#F4C542] capitalize transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#D6E1F0] line-clamp-3 mb-3">
                    {item.description || "No description available."}
                  </p>

                  {(item.extent?.temporal?.interval?.[0] || item.region) && (
                    <div className="mt-2 flex items-center justify-between gap-3 text-xs text-[#D6E1F0]">
                      <div className="min-w-0">
                        {item.extent?.temporal?.interval?.[0] && (
                          <span>
                            {new Date(
                              item.extent.temporal.interval[0][0],
                            ).toLocaleString()}{" "}
                            -{" "}
                            {item.extent.temporal.interval[0][1]
                              ? new Date(
                                item.extent.temporal.interval[0][1],
                              ).toLocaleString()
                              : "Present"}
                          </span>
                        )}
                      </div>
                      {item.region && (
                        <div className="flex-shrink-0 text-right">
                          <span className="font-semibold text-[#F4C542]"></span>{" "}
                          <span className="text-[#F8FAFC]">{item.region}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Image for themes in list view */}
                {viewMode === "list" && item.image && (
                  <div className="w-full md:w-48 h-32 flex-shrink-0 bg-[#143A6A] rounded overflow-hidden border border-[#1B457A]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CatalogList;
