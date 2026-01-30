import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  FaThLarge,
  FaList,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";

const CatalogList = () => {
  // atmosphere / cryosphere / oceans
  const { themeId } = useParams();

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [themeInfo, setThemeInfo] = useState(null);
  // 'list' or 'tiles'
  const [viewMode, setViewMode] = useState("list");
  // 'asc' or 'desc'
  const [sortOrder, setSortOrder] = useState("asc");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`/data/themes/${themeId}/catalog.json`)
      .then((res) => res.json())
      .then(async (data) => {
        setThemeInfo(data);
        const childLinks = data.links.filter((link) => link.rel === "child");

        // Fetch details for each child to get the description
        const productsWithDetails = await Promise.all(
          childLinks.map(async (link) => {
            try {
              const productPath = link.href
                .replace("../../products/", "")
                .replace("/collection.json", "");

              const res = await fetch(
                `/data/products/${productPath}/collection.json`,
              );
              const details = await res.json();
              return {
                ...link,
                title: details.title || link.title,
                description: details.description,
                extent: details.extent, 
              };
            } catch (err) {
              console.error("Error fetching product details:", err);
              return link;
            }
          }),
        );

        setProducts(productsWithDetails);
      })
      .catch((err) => console.error(err));
  }, [themeId]);

  // Helper to get image based on themeId
  const getThemeImage = () => {
    if (!themeInfo) return "";
    return `/data/themes/${themeId}/EO_${themeInfo.title}.webp`;
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const sortedProducts = [...products].sort((a, b) => {
    const aTitle = a.title || "";
    const bTitle = b.title || "";
    return sortOrder === "asc"
      ? aTitle.localeCompare(bTitle)
      : bTitle.localeCompare(aTitle);
  });

  const filteredAndSortedProducts = sortedProducts.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold capitalize text-gray-900 border-l-8 border-primary pl-4">
          {themeInfo?.title || themeId}
        </h1>
        <div className="text-sm text-gray-500 pl-6 flex flex-wrap gap-2 items-center">
          <span>
            in{" "}
            <span className="text-primary font-semibold">
              PolarScope Catalog
            </span>
          </span>
          <span className="hidden md:inline mx-2">|</span>
          <button className="btn btn-xs btn-outline rounded-sm">Up</button>
          <button className="btn btn-xs btn-outline rounded-sm">
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
          <div className="bg-gray-100 p-2 border border-gray-200 rounded-md shadow-sm h-full max-h-[400px] overflow-hidden">
            <img
              src={getThemeImage()}
              alt={themeId}
              className="w-full h-full object-cover rounded transition-transform duration-300 hover:scale-105"
            />
          </div>
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
          <select className="select select-bordered w-full md:max-w-xs">
            <option disabled selected>
              Select keywords
            </option>
            <option>Keyword 1</option>
            <option>Keyword 2</option>
          </select>
        </div>

        <div
          className={`grid ${viewMode === "tiles" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
        >
          {filteredAndSortedProducts.map((item, index) => {
            const productPath = item.href
              .replace("../../products/", "")
              .replace("/collection.json", "");

            return (
              <div
                key={index}
                onClick={() => navigate(`/products/${productPath}`)}
                className={`cursor-pointer rounded-lg border border-gray-300 bg-white p-5 shadow-sm hover:shadow-md transition border-l-4 border-l-transparent hover:border-l-primary group`}
              >
                <h3 className="font-bold text-lg mb-2 text-blue-900 group-hover:text-blue-700">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                  {item.description || "No description available."}
                </p>

                <div className="text-xs text-gray-500 mt-2">
                  {item.extent?.temporal?.interval?.[0] ? (
                    <>
                      {new Date(
                        item.extent.temporal.interval[0][0],
                      ).toLocaleString()}{" "}
                      -{" "}
                      {item.extent.temporal.interval[0][1]
                        ? new Date(
                            item.extent.temporal.interval[0][1],
                          ).toLocaleString()
                        : "Present"}
                    </>
                  ) : (
                    "Date not available"
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CatalogList;
