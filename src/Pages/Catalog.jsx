import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FaThLarge,
  FaList,
  FaSortAmountDown,
  FaSortAmountUp,
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
    navigate(`/${catalog.id}`);
  };

  useEffect(() => {
    fetch(`/data/catalog.json`)
      .then((res) => res.json())
      .then(async (data) => {
        setCatalogInfo(data);
        const childLinks = data.links.filter((link) => link.rel === "child");

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
    <div className="min-h-screen bg-transparent text-[#F8FAFC] px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <section className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F4C542]">
          Data catalogue
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
          {catalogInfo?.title || "Open Science Catalog"}
        </h1>
        <p className="text-base leading-7 text-[#D6E1F0]">
          {catalogInfo?.description || "Loading description..."}
        </p>
        {catalogInfo?.updated && (
          <p className="text-sm text-[#D6E1F0]/75">
            Last updated: {new Date(catalogInfo.updated).toLocaleDateString()}
          </p>
        )}
      </section>

      {/* Controls */}
      <div className="border-y border-white/10 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl font-semibold text-white">Collections</h2>
          <span className="text-sm text-[#D6E1F0]">
            ({filteredAndSortedThemes.length})
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

          <div className="flex items-center gap-2 text-sm">
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
            aria-label="Toggle sort order"
          >
            {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
          </button>
        </div>
      </div>

      {/* Catalog list */}
      <div
        className={`${viewMode === "tiles" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}`}
      >
        {filteredAndSortedThemes.map((catalog, index) => (
          <div
            key={index}
            onClick={() => handleCatalogClick(catalog)}
            className={`group cursor-pointer transition-colors ${viewMode === "list"
                ? "border-b border-white/10 py-5 hover:bg-white/5"
                : "border-b border-white/10 p-5 hover:bg-white/5"
              }`}
          >
            <h3 className="font-semibold text-lg text-white group-hover:text-[#F4C542] transition-colors mb-2">
              {catalog.title}
            </h3>
            <p className="text-sm text-[#D6E1F0] leading-relaxed line-clamp-2">
              {catalog.description || "No description available."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
