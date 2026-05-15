import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FaThLarge,
  FaList,
  FaSortAmountDown,
  FaSortAmountUp,
  FaBook,
} from "react-icons/fa";
import Loading from "./Loading";

const Catalog = () => {
  const navigate = useNavigate();
  const [themes, setThemes] = useState([]);
  const [catalogInfo, setCatalogInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCatalogClick = (catalog) => {
    // Navigate to catalog page for all types
    navigate(`/${catalog.id}`);
  };

  useEffect(() => {
    setLoading(true);
    // Fetch ROOT Catalog (main catalog.json)
    fetch(`/data/catalog.json`)
      .then((res) => res.json())
      .then(async (data) => {
        setCatalogInfo(data);
        const childLinks = data.links.filter((link) => link.rel === "child");

        // Fetch details for each catalog
        const catalogsWithDetails = await Promise.all(
          childLinks.map(async (link) => {
            const catalogPath = link.href.replace("./", "/data/");
            try {
              const res = await fetch(catalogPath);
              const details = await res.json();
              
              return {
                ...link,
                id: details.id,
                title: details.title || link.title,
                description: details.description,
                updated: details.updated,
              };
            } catch (e) {
              console.error("Failed to fetch catalog details", e);
              return {
                ...link,
                title: link.title,
                description: "",
              };
            }
          }),
        );
        setThemes(catalogsWithDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching catalog:", err);
        setLoading(false);
      });
  }, []);

  const sortedThemes = [...themes].sort((a, b) => {
    const aTitle = a.title || "";
    const bTitle = b.title || "";
    return sortOrder === "asc"
      ? aTitle.localeCompare(bTitle)
      : bTitle.localeCompare(aTitle);
  });

  const filteredAndSortedThemes = sortedThemes.filter((theme) =>
    theme.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theme.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F2D57] to-[#1B3A5F] text-[#F8FAFC] p-4 md:p-6 max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-2">
              {catalogInfo?.title || "Open Science Catalog"}
            </h1>
            <div className="text-sm text-[#D6E1F0] flex items-center gap-2">
              <button className="btn btn-xs btn-outline rounded-sm flex items-center gap-1 text-[#F8FAFC] border-[#1B457A]">
                <FaBook className="text-xs" /> Overview
              </button>
            </div>
          </div>
          <button className="btn btn-sm btn-outline gap-2 hidden md:flex text-[#F8FAFC] border-[#1B457A]">
            <FaBook /> Source
          </button>
        </div>
      </div>

      {/* Description & Metadata Section */}
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#F4C542] mb-3">Description</h2>
          <p className="text-[#D6E1F0] leading-relaxed text-justify">
            {catalogInfo?.description || "Loading description..."}
          </p>
        </div>

        {/* Metadata Section */}
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-bold text-[#F4C542] mb-3">Metadata</h2>
          <div>
            <h3 className="font-bold text-[#F8FAFC] mb-2 text-sm">General</h3>
            <div className="bg-[#143A6A] border border-[#1B457A] rounded p-3">
              <div className="flex justify-between text-sm items-center">
                <span className="font-bold text-[#F8FAFC]">Updated</span>
                <span className="text-[#D6E1F0]">
                  {catalogInfo?.updated
                    ? new Date(catalogInfo.updated).toLocaleString()
                    : "Loading..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catalogs List Section */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#F4C542]">Catalogs</h2>
            <span className="badge badge-neutral rounded-full text-xs">
              {filteredAndSortedThemes.length}
            </span>
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

        <div className="relative">
          <FaBook className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F4C542]" />
          <input
            type="text"
            placeholder="Filter catalogs by title, description or keywords"
            className="input input-bordered w-full pl-10 bg-[#143A6A] border-[#1B457A] text-[#F8FAFC] placeholder-[#D6E1F0]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div
          className={`grid ${viewMode === "tiles" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
        >
          {filteredAndSortedThemes.map((catalog, index) => (
            <div
              key={index}
              onClick={() => handleCatalogClick(catalog)}
              className={`cursor-pointer bg-[#143A6A] border border-[#1B457A] group ${
                viewMode === "list"
                  ? "flex flex-col md:flex-row gap-6 border-b border-[#1B457A] last:border-0 pb-6 hover:bg-[#1B457A] transition-colors"
                  : "rounded-lg p-5 shadow-sm hover:shadow-md transition border-l-4 border-l-transparent hover:border-l-[#F4C542]"
              }`}
            >
              <div className={`flex-1 ${viewMode === "list" ? "" : ""}`}>
                <h3
                  className={`font-bold text-lg mb-2 text-[#F8FAFC] group-hover:text-[#F4C542] ${viewMode === "list" ? "text-xl" : ""}`}
                >
                  {catalog.title}
                </h3>
                <p className="text-sm text-[#D6E1F0] leading-relaxed line-clamp-3 mb-3">
                  {catalog.description || "No description available."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
