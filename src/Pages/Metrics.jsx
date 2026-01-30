import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  FaGlobe,
  FaSearch,
  FaChevronDown,
  FaChevronRight,
  FaExternalLinkAlt,
  FaFilter,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// --- COMPONENTS ---

const CoverageModal = ({ product, onClose }) => {
  if (!product) return null;

  const bbox = product.extent?.spatial?.bbox?.[0];
  const bounds = bbox
    ? [
        [bbox[1], bbox[0]],
        [bbox[3], bbox[2]],
      ]
    : [
        [-90, -180],
        [90, 180],
      ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded shadow-2xl w-full max-w-5xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
          <div className="flex gap-3">
            <div className="text-[#009d9a] mt-1">
              <FaMapMarkerAlt size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 leading-snug">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 font-semibold mt-1">
                Coverage
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0">
          {/* Left Panel: Products List */}
          <div className="w-full md:w-1/3 p-6 border-r border-gray-100 overflow-y-auto">
            <h4 className="text-xs font-bold text-[#009d9a] uppercase mb-4">
              Products
            </h4>

            <div className="space-y-3">
              <div className="group">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-700 leading-tight group-hover:text-[#009d9a] transition-colors cursor-pointer">
                    {product.title}
                  </span>
                  <div className="flex items-center gap-2 text-gray-400 shrink-0">
                    <FaMapMarkerAlt
                      className="hover:text-[#009d9a] cursor-pointer"
                      size={14}
                    />
                    <a
                      href={`/products/${product.productPath}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaExternalLinkAlt
                        className="hover:text-[#009d9a] cursor-pointer"
                        size={12}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Map */}
          <div className="w-full md:w-2/3 bg-gray-50 relative min-h-[400px]">
            <MapContainer
              bounds={bounds}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={false}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {bbox && (
                <Rectangle
                  bounds={bounds}
                  pathOptions={{
                    color: "#009d9a",
                    weight: 2,
                    fillOpacity: 0.1,
                    dashArray: "5, 5",
                  }}
                />
              )}
            </MapContainer>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-bold text-gray-500 hover:text-gray-800 uppercase tracking-wider px-4 py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductRow = ({
  product,
  minYear,
  maxYear,
  totalYears,
  isExpanded,
  onToggle,
  onOpenModal,
}) => {
  const navigate = useNavigate();

  // Calculate Bar Position & Width
  const interval = product.extent?.temporal?.interval?.[0];
  const startDate = interval ? new Date(interval[0]) : new Date();
  const endDate = interval && interval[1] ? new Date(interval[1]) : new Date();

  const startYear = startDate.getFullYear();
  const startOffset = startYear - minYear;
  const durationYears = endDate.getFullYear() - startYear + 1;

  // Convert to percentage
  const leftPercent = (startOffset / totalYears) * 100;
  const widthPercent = (durationYears / totalYears) * 100;

  return (
    <div className="border-b border-gray-200 hover:bg-gray-50 transition-colors group">
      <div className="flex items-stretch h-12">
        {/* Name & Accordion Toggle */}
        <div className="w-[350px] min-w-[350px] border-r border-gray-100 p-2 pl-4 flex items-center gap-3 relative bg-white z-10">
          <button
            onClick={onToggle}
            className="p-1 rounded hover:bg-gray-200 text-gray-500 transition-colors"
          >
            {isExpanded ? (
              <FaChevronDown size={10} />
            ) : (
              <FaChevronRight size={10} />
            )}
          </button>
          <span
            className="text-sm font-semibold text-gray-700 truncate cursor-pointer hover:text-[#009d9a] hover:underline"
            title={product.title}
            onClick={() => navigate(`/products/${product.productPath}`)}
          >
            {product.title}
          </span>
        </div>

        {/* Timeline Bar Area */}
        <div className="flex-1 relative bg-white group-hover:bg-gray-50">
          {/* The Bar */}
          <div
            className="absolute h-5 top-1/2 -translate-y-1/2 rounded bg-[#009d9a] hover:bg-[#007d7a] cursor-pointer transition-colors shadow-sm"
            style={{
              left: `${Math.max(0, leftPercent)}%`,
              width: `${Math.max(0.5, widthPercent)}%`,
              minWidth: "4px",
            }}
            title={`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
            onClick={() => navigate(`/products/${product.productPath}`)}
          ></div>
        </div>

        {/* Coverage Icon */}
        <div className="w-[80px] min-w-[80px] border-l border-gray-100 flex items-center justify-center bg-white">
          <button
            className="text-gray-400 hover:text-[#009d9a] transition-colors p-2"
            title="View Coverage Map"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(product);
            }}
          >
            <FaGlobe size={14} />
          </button>
        </div>
      </div>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="bg-gray-50 p-4 border-t border-gray-100 pl-[40px] shadow-inner">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-2">
              <div className="text-xs font-bold uppercase text-gray-400">
                Description
              </div>
              <p className="text-sm text-gray-600 leading-relaxed text-justify max-w-2xl">
                {product.description || "No description available."}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate(`/products/${product.productPath}`)}
                  className="text-[#009d9a] text-xs font-bold uppercase hover:underline flex items-center gap-1"
                >
                  View Product Details <FaExternalLinkAlt size={10} />
                </button>
              </div>
            </div>
            <div className="w-64 space-y-2">
              <div className="text-xs font-bold uppercase text-gray-400">
                Metadata
              </div>
              <div className="text-xs text-gray-600 grid grid-cols-2 gap-x-2 gap-y-1">
                <span className="font-semibold">Start:</span>{" "}
                {startDate.toLocaleDateString()}
                <span className="font-semibold">End:</span>{" "}
                {endDate.toLocaleDateString()}
                <span className="font-semibold">Region:</span>{" "}
                {product["osc:region"] || "N/A"}
                <span className="font-semibold">Project:</span>{" "}
                {product["osc:project"] || "N/A"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Metrics = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [themes, setThemes] = useState([]);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [selectedTheme, setSelectedTheme] = useState("All");

  // Timeline Configuration
  // Start timeline at 1970
  const MIN_YEAR = 1970;
  const MAX_YEAR = new Date().getFullYear();
  const TOTAL_YEARS = MAX_YEAR - MIN_YEAR + 1;
  // GAP 4 YEARS
  const YEARS_ARRAY = Array.from(
    { length: Math.ceil(TOTAL_YEARS / 4) },
    (_, i) => MIN_YEAR + i * 4,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Themes to discover products
        const themesRes = await fetch("/data/themes/catalog.json");
        const themesData = await themesRes.json();
        const themeLinks = themesData.links.filter(
          (link) => link.rel === "child",
        );

        // Fetch theme details for dropdown
        const themesDetailsProms = themeLinks.map(async (themeLink) => {
          const themePath = themeLink.href.replace("./", "/data/themes/");
          const themeRes = await fetch(themePath);
          const themeCatalog = await themeRes.json();
          return {
            id: themeCatalog.id,
            title: themeCatalog.title,
          };
        });
        const themesDetails = await Promise.all(themesDetailsProms);
        setThemes(themesDetails);

        const allProductsProms = themeLinks.map(async (themeLink) => {
          const themePath = themeLink.href.replace("./", "/data/themes/");
          const themeRes = await fetch(themePath);
          const themeCatalog = await themeRes.json();
          const themeId = themeCatalog.id;

          const productLinks = themeCatalog.links.filter(
            (link) => link.rel === "child",
          );

          const themeProductsProms = productLinks.map(async (prodLink) => {
            const prodPathRelative = prodLink.href;
            const prodPath = prodPathRelative
              .replace("../../", "/data/")
              .replace("../", "/data/");

            try {
              const prodRes = await fetch(prodPath);
              const prodData = await prodRes.json();
              return {
                ...prodData,
                rawLink: prodLink.href,
                productPath: prodData.id,
                themeId: themeId,
              };
            } catch (err) {
              return null;
            }
          });
          return Promise.all(themeProductsProms);
        });

        const nested = await Promise.all(allProductsProms);
        const flat = nested.flat().filter((p) => p !== null);
        // Unique by ID
        const unique = Array.from(
          new Map(flat.map((item) => [item.id, item])).values(),
        );

        // Sort by Title (Alphabetical)
        unique.sort((a, b) => a.title.localeCompare(b.title));

        setProducts(unique);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load products", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Helper to toggle accordion
  const toggleExpand = (id) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedIds(newSet);
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTheme =
        selectedTheme === "All" || p.themeId === selectedTheme;
      return matchesSearch && matchesTheme;
    });
  }, [products, searchTerm, selectedTheme]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <span className="loading loading-spinner loading-lg text-[#009d9a]"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Header & Filters */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 space-y-4">
          {/* Title Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold uppercase tracking-tight text-[#003049]">
                Metrics
              </h1>
              <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-500 font-mono">
                {filteredProducts.length} Products
              </span>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative w-full max-w-sm">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="input input-sm pl-10 w-full bg-gray-50 border-gray-300 focus:border-[#009d9a] focus:ring-1 focus:ring-[#009d9a] rounded-sm transition-all"
                placeholder="Filter products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <select className="select select-sm select-bordered rounded-sm text-xs w-32 bg-white">
              <option selected>Global</option>
            </select>

            <select
              className="select select-sm select-bordered rounded-sm text-xs w-40 bg-white capitalize"
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
            >
              <option value="All">All Themes</option>
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id} className="capitalize">
                  {theme.title}
                </option>
              ))}
            </select>

            <div className="ml-auto flex items-center gap-2">
              <button className="btn btn-sm btn-ghost text-xs font-semibold text-gray-500">
                <FaFilter size={10} /> Advanced
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Axis Header */}
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 border-t border-gray-100 bg-gray-50">
          <div className="flex text-xs font-bold text-gray-500 h-10 items-center">
            <div className="w-[350px] pl-4">Name</div>
            <div className="flex-1 relative h-full overflow-hidden">
              {/* Ticks */}
              <div className="absolute inset-0 flex items-center pointer-events-none">
                {YEARS_ARRAY.map((year) => {
                  const left = ((year - MIN_YEAR) / TOTAL_YEARS) * 100;
                  return (
                    <div
                      key={year}
                      className="absolute h-full flex flex-col justify-end pb-1 border-l border-gray-200"
                      style={{ left: `${left}%` }}
                    >
                      <span className="pl-1 text-[10px] opacity-70">
                        {year}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-[80px] text-center">Cov.</div>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 max-w-[1920px] mx-auto w-full px-4 md:px-8 pb-10">
        {/* Items */}
        <div className="border border-gray-200 border-t-0 rounded-b bg-white relative">
          {/* Vertical Grid Lines (Background) */}
          <div className="absolute inset-0 z-0 pointer-events-none w-[calc(100%-430px)] ml-[350px]">
            {YEARS_ARRAY.map((year) => {
              const left = ((year - MIN_YEAR) / TOTAL_YEARS) * 100;
              return (
                <div
                  key={`grid-${year}`}
                  className="absolute h-full border-l border-gray-100 border-dashed"
                  style={{ left: `${left}%` }}
                />
              );
            })}
          </div>

          {/* Rows */}
          <div className="relative z-10">
            {filteredProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                minYear={MIN_YEAR}
                maxYear={MAX_YEAR}
                totalYears={TOTAL_YEARS}
                isExpanded={expandedIds.has(product.id)}
                onToggle={() => toggleExpand(product.id)}
                onOpenModal={setSelectedProduct}
              />
            ))}
            {filteredProducts.length === 0 && (
              <div className="p-8 text-center text-gray-400 italic">
                No products found matching your filters.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <CoverageModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Metrics;
