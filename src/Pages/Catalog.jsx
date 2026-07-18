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
    <div className="min-h-screen bg-gradient-to-b from-[#0F2D57] to-[#1B3A5F] text-[#F8FAFC] p-4 md:p-6 max-w-7xl mx-auto space-y-8">
      <section className="rounded-3xl border border-white/10 bg-[#0b2748] p-6 md:p-8 shadow-[0_18px_60px_rgba(2,10,24,0.2)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">Catalog overview</p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
              {catalogInfo?.title || "Open Science Catalog"}
            </h1>
            <p className="max-w-3xl text-sm sm:text-base leading-7 text-[#D6E1F0]">
              Browse the catalogue by collection type, then open individual records for source-linked metadata and access details.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#D6E1F0]">
            <FaBook className="text-[#F4C542]" />
            Curated catalog index
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#143A6A] p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-white mb-3">Description</h2>
          <p className="text-[#D6E1F0] leading-7 text-left">
            {catalogInfo?.description || "Loading description..."}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#143A6A] p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-white mb-3">Metadata</h2>
          <div>
            <h3 className="font-semibold text-[#F4C542] mb-2 text-sm uppercase tracking-[0.25em]">General</h3>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between text-sm items-center gap-4">
                <span className="font-semibold text-white">Updated</span>
                <span className="text-[#D6E1F0] text-right">
                  {catalogInfo?.updated
                    ? new Date(catalogInfo.updated).toLocaleString()
                    : "Loading..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5 rounded-3xl border border-white/10 bg-[#0b2748] p-6 md:p-8 shadow-[0_18px_60px_rgba(2,10,24,0.18)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-white">Catalogs</h2>
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
            className="input input-bordered w-full pl-10 bg-[#143A6A] border-white/10 text-[#F8FAFC] placeholder-[#D6E1F0] rounded-xl shadow-sm"
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
              className={`cursor-pointer bg-[#143A6A] border border-white/10 rounded-2xl p-5 group transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 ${viewMode === "list"
                  ? "flex flex-col md:flex-row gap-6 hover:bg-[#1B457A]"
                  : "shadow-sm hover:shadow-md border-l-4 border-l-transparent hover:border-l-[#F4C542]"
                }`}
            >
              <div className={`flex-1 ${viewMode === "list" ? "" : ""}`}>
                <h3
                  className={`font-semibold text-lg mb-2 text-white group-hover:text-[#F4C542] ${viewMode === "list" ? "text-xl" : ""}`}
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
