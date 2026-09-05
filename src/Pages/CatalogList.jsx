import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import {
  FaThLarge,
  FaList,
  FaSortAmountDown,
  FaSortAmountUp,
  FaChevronLeft,
} from "react-icons/fa";
import Loading from "./Loading";
import { useProductData } from "../context/ProductDataContext";

const CatalogList = () => {
  const { themeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const catalogType = themeId ? 'themes' : location.pathname.split("/")[1];
  const [products, setProducts] = useState([]);
  const [themeInfo, setThemeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const initialFilters = location.state?.filters || {};
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
  const [sortOrder, setSortOrder] = useState(initialFilters.sortOrder || "asc");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || "");
  const [selectedKeyword, setSelectedKeyword] = useState(initialFilters.selectedKeyword || "");

  useEffect(() => {
    setLoading(true);

    const catalogPath = themeId
      ? `/data/themes/${themeId}/catalog.json`
      : `/data/${catalogType}/catalog.json`;

    fetch(catalogPath)
      .then((res) => res.json())
      .then(async (data) => {
        setThemeInfo(data);
        const childLinks = data.links.filter((link) => link.rel === "child");

        const productsWithDetails = await Promise.all(
          childLinks.map(async (link) => {
            try {
              let itemPath;

              if (themeId) {
                const productPath = link.href
                  .replace("../../products/", "")
                  .replace("/collection.json", "");
                itemPath = `/data/products/${productPath}/collection.json`;
              } else {
                itemPath = link.href.replace("./", `/data/${catalogType}/`);
              }

              const res = await fetch(itemPath);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const details = await res.json();

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
    <div className="min-h-screen bg-transparent text-[#F8FAFC] px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-sm font-semibold">
          <button
            onClick={() => navigate(themeId ? "/themes" : "/catalog")}
            className="flex items-center gap-2 text-[#F4C542] hover:text-white transition-colors"
          >
            <FaChevronLeft className="text-xs" />
            Back
          </button>
        </div>

        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F4C542]">
            {catalogType.replace("-", " ")}
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white capitalize">
            {themeInfo?.title || catalogType}
          </h1>
          {themeInfo?.updated && (
            <p className="text-sm text-[#D6E1F0]/75">
              Last updated: {new Date(themeInfo.updated).toLocaleDateString()}
            </p>
          )}
        </div>
      </section>

      {/* Description & Image */}
      <section className={themeId ? "grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8" : ""}>
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">About</h2>
          <div className="text-[#D6E1F0] leading-7">
            <p className={`${!isExpanded ? "line-clamp-6" : ""} transition-all`}>
              {themeInfo?.description || "Loading..."}
            </p>
            {themeInfo?.description && themeInfo.description.length > 300 && (
              <button
                onClick={toggleReadMore}
                className="mt-2 text-sm font-semibold text-[#F4C542] hover:text-white transition-colors"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        </div>

        {themeId && (
          <div className="overflow-hidden rounded-lg">
            <img
              src={getThemeImage()}
              alt={themeId}
              className="w-full h-full max-h-80 object-cover"
            />
          </div>
        )}
      </section>

      {/* Controls */}
      <div className="border-y border-white/10 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl font-semibold text-white">Items</h2>
          <span className="text-sm text-[#D6E1F0]">
            ({filteredAndSortedProducts.length})
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Filter..."
            className="px-3 py-2 text-sm rounded bg-[#0b2748] border border-white/20 text-[#F8FAFC] placeholder-[#D6E1F0]/60 w-48 focus:outline-none focus:border-[#F4C542]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {catalogType === "products" && !themeId && allKeywords.length > 0 && (
            <select
              className="px-3 py-2 text-sm rounded bg-[#0b2748] border border-white/20 text-[#F8FAFC] focus:outline-none focus:border-[#F4C542]"
              value={selectedKeyword}
              onChange={(e) => setSelectedKeyword(e.target.value)}
            >
              <option value="">All keywords</option>
              {allKeywords.map((kw) => (
                <option key={kw} value={kw}>
                  {kw}
                </option>
              ))}
            </select>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${viewMode === "list" ? "bg-[#F4C542] text-[#0F2D57]" : "text-[#D6E1F0] hover:text-white"}`}
              aria-label="List view"
            >
              <FaList />
            </button>
            <button
              onClick={() => setViewMode("tiles")}
              className={`p-2 rounded transition-colors ${viewMode === "tiles" ? "bg-[#F4C542] text-[#0F2D57]" : "text-[#D6E1F0] hover:text-white"}`}
              aria-label="Grid view"
            >
              <FaThLarge />
            </button>
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="p-2 text-[#D6E1F0] hover:text-white transition-colors"
            aria-label="Toggle sort"
          >
            {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </button>
        </div>
      </div>

      {/* Items list */}
      <div
        className={`${viewMode === "tiles" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}`}
      >
        {filteredAndSortedProducts.map((item, index) => {
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
              className={`group ${navPath ? "cursor-pointer" : ""} border border-white/10 transition-colors hover:border-white/25 hover:bg-white/5 ${
                viewMode === "list"
                  ? "py-5 flex flex-col md:flex-row gap-6"
                  : "rounded-lg p-5"
              } ${isSelected ? "border-[#F4C542]" : ""}`}
            >
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-white group-hover:text-[#F4C542] transition-colors mb-2 capitalize">
                  {item.title}
                </h3>
                <p className="text-sm text-[#D6E1F0] leading-relaxed line-clamp-2 mb-2">
                  {item.description || "No description available."}
                </p>

                {(item.extent?.temporal?.interval?.[0] || item.region) && (
                  <div className="mt-2 flex items-center gap-3 text-xs text-[#D6E1F0]">
                    {item.extent?.temporal?.interval?.[0] && (
                      <span>
                        {new Date(item.extent.temporal.interval[0][0]).toLocaleDateString()}{" "}
                        -{" "}
                        {item.extent.temporal.interval[0][1]
                          ? new Date(item.extent.temporal.interval[0][1]).toLocaleDateString()
                          : "Present"}
                      </span>
                    )}
                    {item.region && (
                      <span className="text-[#F4C542]">{item.region}</span>
                    )}
                  </div>
                )}
              </div>

              {viewMode === "list" && item.image && (
                <div className="w-full md:w-48 h-32 flex-shrink-0 rounded overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
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
    </div>
  );
};

export default CatalogList;
