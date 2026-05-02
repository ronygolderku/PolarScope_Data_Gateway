import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import {
  FaThLarge,
  FaList,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import Loading from "./Loading";

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
  const [viewMode, setViewMode] = useState("list");
  // 'asc' or 'desc'
  const [sortOrder, setSortOrder] = useState("asc");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState("");

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
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold capitalize text-gray-900 border-l-8 border-primary pl-4">
          {themeInfo?.title || catalogType}
        </h1>
        <div className="text-sm text-gray-500 pl-6 flex flex-wrap gap-2 items-center">
          <span>
            in{" "}
            <span className="text-primary font-semibold">
              PolarScope Catalog
            </span>
          </span>
          <span className="hidden md:inline mx-2">|</span>
          <button
            onClick={() => navigate(themeId ? "/themes" : "/catalog")}
            className="btn btn-xs btn-outline rounded-sm"
          >
            Up
          </button>
          <button
            onClick={() => navigate("/catalog")}
            className="btn btn-xs btn-outline rounded-sm"
          >
            Overview
          </button>
        </div>
      </div>

      {/* Description Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-secondary mb-3">
            Description
          </h2>
          <div className="text-gray-700 leading-relaxed text-justify relative">
            <p
              className={`${!isExpanded ? "line-clamp-6 md:line-clamp-[10]" : ""} transition-all duration-300`}
            >
              {themeInfo?.description || "Description loading..."}
            </p>
            {themeInfo?.description && themeInfo.description.length > 300 && (
              <button
                onClick={toggleReadMore}
                className="text-primary font-bold hover:underline mt-2 text-sm focus:outline-none"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </div>

          <div className="mt-4 order-2 lg:order-none">
            <h3 className="text-xl font-bold text-secondary mb-2">
              Additional Resources
            </h3>
            <ul className="list-disc list-inside text-sm pl-2">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Description
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 flex flex-col order-3 lg:order-none">
          {themeId && (
            <div className="bg-gray-100 p-2 border border-gray-200 rounded-md shadow-sm h-full max-h-[400px] overflow-hidden">
              <img
                src={getThemeImage()}
                alt={themeId}
                className="w-full h-full object-cover rounded transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}
        </div>
      </div>

      {/* Metadata Section */}
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-2xl font-bold text-secondary mb-4">Metadata</h2>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="font-semibold text-gray-600">General</div>
          </div>
          <div className="divider my-2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10">
              <span className="font-semibold w-24">Updated</span>
              <span>
                {themeInfo?.updated
                  ? new Date(themeInfo.updated).toLocaleString()
                  : "Loading..."}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Catalogs List Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-secondary">Catalogs</h2>
            <span className="badge badge-neutral">{filteredAndSortedProducts.length}</span>
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
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {catalogType === "products" && !themeId && (
            <select
              className="select select-bordered w-full md:max-w-xs"
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

            return (
              <div
                key={index}
                onClick={() => navPath && navigate(navPath, { state: { from: location.pathname } })}
                className={`${navPath ? 'cursor-pointer' : ''} rounded-lg border border-gray-300 bg-white p-5 shadow-sm hover:shadow-md transition border-l-4 border-l-transparent hover:border-l-primary group ${
                  viewMode === "list" ? "flex flex-col md:flex-row gap-6" : ""
                }`}
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-blue-900 group-hover:text-blue-700 capitalize">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                    {item.description || "No description available."}
                  </p>

                    {(item.extent?.temporal?.interval?.[0] || item.region) && (
                      <div className="mt-2 flex items-center justify-between gap-3 text-xs text-gray-500">
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
                            <span className="font-semibold text-gray-600"></span>{" "}
                            <span className="text-gray-700">{item.region}</span>
                          </div>
                        )}
                      </div>
                    )}
                </div>
                
                {/* Image for themes in list view */}
                {viewMode === "list" && item.image && (
                  <div className="w-full md:w-48 h-32 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
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
      </div>
    </div>
  );
};

export default CatalogList;
