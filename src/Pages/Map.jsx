import React, { useState, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useProductData } from "../context/ProductDataContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Loading from "./Loading";

const MapPage = () => {
  const { allProducts, isLoading, fetchAllProducts } = useProductData();
  const [loading, setLoading] = useState(false);

  // Selection state
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [selectedVariables, setSelectedVariables] = useState(new Set());
  const [selectedMissions, setSelectedMissions] = useState(new Set());
  const [selectedThemes, setSelectedThemes] = useState(new Set());

  // Accordion state
  const [expandedSections, setExpandedSections] = useState({
    products: true,
    variables: false,
    missions: false,
    themes: false,
  });

  // Fetch all products on mount
  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchAllProducts();
      setLoading(false);
    };
    loadData();
  }, [fetchAllProducts]);

  // Extract unique data
  const uniqueVariables = useMemo(() => {
    const vars = new Set();
    allProducts.forEach((p) => {
      if (p["osc:variables"]) {
        p["osc:variables"].forEach((v) => vars.add(v));
      }
    });
    return Array.from(vars).sort();
  }, [allProducts]);

  const uniqueMissions = useMemo(() => {
    const missions = new Set();
    allProducts.forEach((p) => {
      if (p["osc:missions"]) {
        p["osc:missions"].forEach((m) => missions.add(m));
      }
    });
    return Array.from(missions).sort();
  }, [allProducts]);

  const uniqueThemes = useMemo(() => {
    const themesMap = new Map(); // themeId -> themeName
    allProducts.forEach((p) => {
      if (p.themeId && p.themeName) {
        themesMap.set(p.themeId, p.themeName);
      } else if (p.themeName) {
        // Fallback: use themeName as key if themeId not available
        themesMap.set(p.themeName.toLowerCase(), p.themeName);
      }
    });
    return Array.from(themesMap.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [allProducts]);

  // Filter products based on selections
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchProduct = selectedProducts.size === 0 || selectedProducts.has(p.id);
      const matchVariable =
        selectedVariables.size === 0 ||
        (p["osc:variables"] &&
          Array.from(selectedVariables).some((v) => p["osc:variables"].includes(v)));
      const matchMission =
        selectedMissions.size === 0 ||
        (p["osc:missions"] &&
          Array.from(selectedMissions).some((m) => p["osc:missions"].includes(m)));
      const matchTheme =
        selectedThemes.size === 0 ||
        (p.themeId && selectedThemes.has(p.themeId)) ||
        (p.themeName && selectedThemes.has(p.themeName.toLowerCase()));

      return matchProduct && matchVariable && matchMission && matchTheme;
    });
  }, [allProducts, selectedProducts, selectedVariables, selectedMissions, selectedThemes]);

  // Extract markers from filtered products
  const markers = useMemo(() => {
    return filteredProducts
      .filter((p) => p.extent?.spatial?.bbox?.[0])
      .map((product) => {
        const bbox = product.extent.spatial.bbox[0];
        const [minLon, minLat, maxLon, maxLat] = bbox;
        const centerLat = (minLat + maxLat) / 2;
        const centerLon = (minLon + maxLon) / 2;

        return {
          id: product.id,
          title: product.title,
          lat: centerLat,
          lon: centerLon,
          bbox: bbox,
        };
      });
  }, [filteredProducts]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleProductSelection = (productId) => {
    const newSet = new Set(selectedProducts);
    if (newSet.has(productId)) {
      newSet.delete(productId);
    } else {
      newSet.add(productId);
    }
    setSelectedProducts(newSet);
  };

  const toggleVariableSelection = (variable) => {
    const newSet = new Set(selectedVariables);
    if (newSet.has(variable)) {
      newSet.delete(variable);
    } else {
      newSet.add(variable);
    }
    setSelectedVariables(newSet);
  };

  const toggleMissionSelection = (mission) => {
    const newSet = new Set(selectedMissions);
    if (newSet.has(mission)) {
      newSet.delete(mission);
    } else {
      newSet.add(mission);
    }
    setSelectedMissions(newSet);
  };

  const toggleThemeSelection = (themeId) => {
    const newSet = new Set(selectedThemes);
    if (newSet.has(themeId)) {
      newSet.delete(themeId);
    } else {
      newSet.add(themeId);
    }
    setSelectedThemes(newSet);
  };

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Data Distribution Map</h1>
        <p className="text-sm text-gray-600 mt-1">
          Interactive map showing data coverage. Select filters to visualize specific data types.
        </p>
      </div>

      {/* Main Content: Map + Right Panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Map */}
        <div className="flex-1 flex flex-col border-r border-gray-300 overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <MapContainer
              center={[0, 0]}
              zoom={2}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Data Points */}
              {markers.map((marker) => (
                <CircleMarker
                  key={marker.id}
                  center={[marker.lat, marker.lon]}
                  radius={7}
                  fillColor="#009d9a"
                  color="#007a77"
                  weight={2}
                  opacity={0.9}
                  fillOpacity={0.7}
                >
                  <Popup>
                    <div className="text-sm font-semibold text-gray-800 w-52">
                      <p className="font-bold text-primary mb-1">{marker.title}</p>
                      <p className="text-xs text-gray-600">
                        Lat: {marker.lat.toFixed(2)}° | Lon: {marker.lon.toFixed(2)}°
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Right: Control Panel */}
        <div className="w-80 bg-white border-l border-gray-300 overflow-y-auto flex flex-col">
          {/* Panel Header */}
          <div className="p-3 bg-gray-100 border-b border-gray-200 sticky top-0">
            <h2 className="font-bold text-gray-800">Data Selection</h2>
            <p className="text-xs text-gray-600 mt-1">
              Found: {markers.length} data points
            </p>
          </div>

          {/* Selection Panels */}
          <div className="flex-1 overflow-y-auto">
            {/* Products */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection("products")}
                className="w-full p-3 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-800">Products ({allProducts.length})</span>
                {expandedSections.products ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </button>
              {expandedSections.products && (
                <div className="px-3 pb-3 max-h-32 overflow-y-auto bg-gray-50">
                  {allProducts.slice(0, 20).map((product) => (
                    <label key={product.id} className="flex items-center gap-2 text-xs py-1">
                      <input
                        type="checkbox"
                        checked={selectedProducts.has(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700 truncate">{product.title}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Variables */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection("variables")}
                className="w-full p-3 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-800">Variables ({uniqueVariables.length})</span>
                {expandedSections.variables ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </button>
              {expandedSections.variables && (
                <div className="px-3 pb-3 max-h-32 overflow-y-auto bg-gray-50">
                  {uniqueVariables.map((variable) => (
                    <label key={variable} className="flex items-center gap-2 text-xs py-1">
                      <input
                        type="checkbox"
                        checked={selectedVariables.has(variable)}
                        onChange={() => toggleVariableSelection(variable)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700 truncate">{variable}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* EO Missions */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection("missions")}
                className="w-full p-3 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-800">EO Missions ({uniqueMissions.length})</span>
                {expandedSections.missions ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </button>
              {expandedSections.missions && (
                <div className="px-3 pb-3 max-h-32 overflow-y-auto bg-gray-50">
                  {uniqueMissions.map((mission) => (
                    <label key={mission} className="flex items-center gap-2 text-xs py-1">
                      <input
                        type="checkbox"
                        checked={selectedMissions.has(mission)}
                        onChange={() => toggleMissionSelection(mission)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700 truncate">{mission}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Themes */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection("themes")}
                className="w-full p-3 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-800">Themes ({uniqueThemes.length})</span>
                {expandedSections.themes ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </button>
              {expandedSections.themes && (
                <div className="px-3 pb-3 max-h-32 overflow-y-auto bg-gray-50">
                  {uniqueThemes.map(([themeId, themeName]) => (
                    <label key={themeId} className="flex items-center gap-2 text-xs py-1">
                      <input
                        type="checkbox"
                        checked={selectedThemes.has(themeId)}
                        onChange={() => toggleThemeSelection(themeId)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700 truncate">{themeName}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Selected Data List */}
      <div className="h-48 border-t border-gray-300 bg-gray-50 overflow-hidden flex flex-col">
        <div className="p-3 bg-gray-100 border-b border-gray-200">
          <h3 className="font-bold text-gray-800">Selected Data ({filteredProducts.length})</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white border border-gray-300 rounded p-2 text-xs">
                <p className="font-semibold text-gray-800 truncate">{product.title}</p>
                {product.themeName && <p className="text-gray-600 truncate">{product.themeName}</p>}
                {product["osc:missions"] && product["osc:missions"].length > 0 && (
                  <p className="text-gray-500 text-xs truncate">
                    {product["osc:missions"].join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
