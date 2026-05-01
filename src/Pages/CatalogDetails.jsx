import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Loading from "./Loading";

const CatalogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [childItems, setChildItems] = useState([]);
  const [childSearchTerm, setChildSearchTerm] = useState("");
  const [childSortOrder, setChildSortOrder] = useState("asc");

  // Detect catalog type and item path from URL
  // e.g., /products/cloud-op-livas or /eo-missions/aeolus or /variables/aerosol
  const pathParts = location.pathname.split("/").filter(Boolean);
  const catalogType = pathParts[0]; // products, eo-missions, variables
  const itemPath = pathParts.slice(1).join("/"); // cloud-op-livas, aeolus, etc.

  useEffect(() => {
    setData(null);
    setChildItems([]);

    // Determine file type based on catalog
    const fileName = catalogType === "products" ? "collection.json" : "catalog.json";
    const fetchPath = `/data/${catalogType}/${itemPath}/${fileName}`;

    fetch(fetchPath)
      .then((res) => res.json())
      .then(async (json) => {
        setData(json);

        if (catalogType === "products") {
          return;
        }

        const childLinks = (json.links || []).filter((link) => link.rel === "child");
        if (childLinks.length === 0) {
          return;
        }

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
            } catch (err) {
              console.error("Error fetching child details:", err);
              return {
                ...link,
                title: link.title,
              };
            }
          }),
        );

        setChildItems(itemsWithDetails);
      })
      .catch((err) => console.error(err));
  }, [catalogType, itemPath]);

  if (!data) {
    return <Loading />;
  }

  // Helper to get formatted date
  const formatDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toLocaleString() : "Unknown";
  };

  const getUpPath = () => {
    if (location.state?.from) {
      return location.state.from;
    }

    if (catalogType === "products") {
      const theme = data?.themes?.[0]?.concepts?.[0]?.id;
      if (theme) {
        return `/themes/${theme}`;
      }
    }

    return `/${catalogType}`;
  };

  const sortedChildItems = [...childItems].sort((a, b) => {
    const aTitle = a.title || "";
    const bTitle = b.title || "";
    return childSortOrder === "asc"
      ? aTitle.localeCompare(bTitle)
      : bTitle.localeCompare(aTitle);
  });

  const filteredChildItems = sortedChildItems.filter((item) =>
    item.title?.toLowerCase().includes(childSearchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(childSearchTerm.toLowerCase())
  );

  const getProductIdFromHref = (href = "") => {
    const match = href.match(/products\/([^/]+)\//);
    return match?.[1] || "";
  };

  // Extract bbox safely
  const bbox = data.extent?.spatial?.bbox?.[0] || [-180, -90, 180, 90];

  const bounds = [
    [bbox[1], bbox[0]],
    [bbox[3], bbox[2]],
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-8 border-primary pl-4">
            {data.title}
          </h1>
          <a
            href={data.links?.find((l) => l.rel === "self")?.href || "#"}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-outline gap-2"
          >
            Source
          </a>
        </div>
        <div className="text-sm text-gray-500 pl-6 flex flex-wrap gap-2 items-center">
          <span>
            in{" "}
            <span className="text-secondary font-semibold">
              Open Science Catalog
            </span>
          </span>
          <span className="hidden md:inline mx-2">|</span>
          <button
            onClick={() => navigate(getUpPath())}
            className="btn btn-xs btn-outline rounded-sm"
          >
            Up
          </button>
          <button
            onClick={() => {
              // Navigate back based on catalog type
              if (catalogType === "products") {
                // Try to find theme from data
                const theme = data?.themes?.[0]?.concepts?.[0]?.id;
                if (theme) {
                  navigate(`/themes/${theme}`);
                } else {
                  navigate(`/${catalogType}`);
                }
              } else {
                navigate(`/${catalogType}`);
              }
            }}
            className="btn btn-xs btn-outline rounded-sm"
          >
            Overview
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Description & Map */}
        <div className="flex-1 space-y-8">
          {/* Description */}
          <div>
            <h2 className="text-xl font-bold text-secondary mb-3">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify text-sm">
              {data.description}
            </p>
            {/* Keywords as badges */}
            {data.keywords && (
              <div className="flex flex-wrap gap-2 mt-4">
                {data.keywords.map((k, i) => (
                  <span
                    key={i}
                    className="badge badge-neutral text-xs rounded-sm"
                  >
                    {k}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
            {data.license && (
              <div>
                <span className="font-semibold">License</span>:{" "}
                {data.license}
              </div>
            )}
            {data.extent?.temporal?.interval?.[0] && (
              <div>
                <span className="font-semibold">Temporal Extent</span>:{" "}
                {data.extent.temporal.interval[0][0]
                  ? new Date(
                      data.extent.temporal.interval[0][0],
                    ).toLocaleDateString()
                  : "Unknown"}{" "}
                -{" "}
                {data.extent.temporal.interval[0][1]
                  ? new Date(
                      data.extent.temporal.interval[0][1],
                    ).toLocaleDateString()
                  : "Present"}
              </div>
            )}
          </div>

          {/* Map - only show if spatial extent exists */}
          {data.extent?.spatial?.bbox?.[0] && (
            <div className="h-[400px] w-full border border-gray-300 rounded shadow-sm relative z-0">
              <MapContainer
                bounds={bounds}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Rectangle
                  bounds={bounds}
                  pathOptions={{ color: "blue", weight: 1, fillOpacity: 0.2 }}
                />
              </MapContainer>
            </div>
          )}

          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              Related EarthCODE Forum Topics
            </h3>
            <p className="text-sm text-gray-500 italic">
              Didn't find what you were looking for?{" "}
              <a
                href="#"
                className="font-semibold text-blue-600 hover:underline"
              >
                Start a new topic on the EarthCODE forum!
              </a>
            </p>
          </div>
        </div>

        {/* Right Column: Metadata */}
        <div className="lg:w-1/3 space-y-8">
          {/* Metadata Section */}
          <div>
            <h2 className="text-xl font-bold text-secondary mb-4">Metadata</h2>

            {/* General Table */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-2">General</h3>
              <div className="overflow-x-auto border border-gray-200 rounded">
                <table className="table table-xs w-full">
                  <tbody>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <td className="font-semibold w-24">Created</td>
                      <td>{formatDate(data.created)}</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="font-semibold">Updated</td>
                      <td>{formatDate(data.updated)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cf Table - only show if cf:parameter exists */}
            {data["cf:parameter"]?.[0]?.name && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-2">Cf</h3>
                <div className="overflow-x-auto border border-gray-200 rounded">
                  <table className="table table-xs w-full">
                    <tbody>
                      <tr className="bg-gray-50">
                        <td className="font-semibold w-24">Parameter</td>
                        <td className="break-all">
                          {data["cf:parameter"][0].name}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Open Science Catalog Table - only show if osc fields exist */}
            {(data["osc:project"] || data["osc:status"] || data["osc:region"] || data["osc:type"] || data["osc:variables"] || data["osc:missions"]) && (
              <div>
                <h3 className="font-bold text-gray-700 mb-2">
                  Open Science Catalog
                </h3>
                <div className="overflow-x-auto border border-gray-200 rounded">
                  <table className="table table-xs w-full">
                    <tbody>
                      {data["osc:project"] && (
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <td className="font-semibold w-24">Project</td>
                          <td className="text-blue-600 font-semibold">
                            {data["osc:project"]}
                          </td>
                        </tr>
                      )}
                      {data["osc:status"] && (
                        <tr className="bg-white border-b border-gray-100">
                          <td className="font-semibold">Status</td>
                          <td>{data["osc:status"]}</td>
                        </tr>
                      )}
                      {data["osc:region"] && (
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <td className="font-semibold">Region</td>
                          <td>{data["osc:region"]}</td>
                        </tr>
                      )}
                      {data["osc:type"] && (
                        <tr className="bg-white border-b border-gray-100">
                          <td className="font-semibold">Type</td>
                          <td>{data["osc:type"]}</td>
                        </tr>
                      )}
                      {data["osc:variables"] && (
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <td className="font-semibold">Variables</td>
                          <td>{data["osc:variables"].join(", ")}</td>
                        </tr>
                      )}
                      {data["osc:missions"] && (
                        <tr className="bg-white">
                          <td className="font-semibold">Missions</td>
                          <td>{data["osc:missions"].join(", ")}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Additional Resources */}
          {(data["osc:project"] || data.themes || data["osc:missions"] || data.links) && (
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Additional Resources
              </h3>
              <div className="text-sm space-y-2">
                {(data["osc:project"] || data.themes || data["osc:missions"]) && (
                  <>
                    <div>
                      <span className="font-semibold">Related resource</span>
                    </div>
                    <ul className="list-disc list-inside pl-2 text-gray-600">
                      {data["osc:project"] && (
                        <li>Project: {data["osc:project"]}</li>
                      )}
                      {data.themes?.find((t) => t.concepts?.[0]?.id) && (
                        <li>
                          Theme:{" "}
                          {data.themes.find((t) => t.concepts?.[0]?.id).concepts[0].id}
                        </li>
                      )}
                      {data["osc:missions"]?.[0] && (
                        <li>EO Mission: {data["osc:missions"][0]}</li>
                      )}
                    </ul>
                  </>
                )}
                {data.links?.filter((l) => l.rel === "via" || l.rel === "self").length > 0 && (
                  <>
                    <div className="mt-2">
                      <span className="font-semibold">Source metadata</span>
                    </div>
                    <ul className="list-disc list-inside pl-2 text-gray-600">
                      {data.links
                        .filter((l) => l.rel === "via" || l.rel === "self")
                        .map((link, idx) => (
                          <li key={idx}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {link.title || "Link"}
                            </a>
                          </li>
                        ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {catalogType !== "products" && childItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-secondary">Products</h2>
              <span className="badge badge-neutral text-xs">
                {filteredChildItems.length}
              </span>
            </div>
            <div className="join">
              <button
                className={`btn btn-sm join-item ${childSortOrder === "asc" ? "btn-active" : ""}`}
                onClick={() => setChildSortOrder("asc")}
              >
                A-Z
              </button>
              <button
                className={`btn btn-sm join-item ${childSortOrder === "desc" ? "btn-active" : ""}`}
                onClick={() => setChildSortOrder("desc")}
              >
                Z-A
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="Filter products by title or description"
            className="input input-bordered w-full"
            value={childSearchTerm}
            onChange={(e) => setChildSearchTerm(e.target.value)}
          />

          <div className="grid grid-cols-1 gap-6">
            {filteredChildItems.map((item, index) => {
              const productId = item.id || getProductIdFromHref(item.href);
              const navPath = productId ? `/products/${productId}` : "";

              return (
                <div
                  key={index}
                  onClick={() => navPath && navigate(navPath, { state: { from: location.pathname } })}
                  className={`${navPath ? "cursor-pointer" : ""} rounded-lg border border-gray-300 bg-white p-5 shadow-sm hover:shadow-md transition border-l-4 border-l-transparent hover:border-l-primary group`}
                >
                  <h3 className="font-bold text-lg mb-2 text-blue-900 group-hover:text-blue-700">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {item.description || "No description available."}
                  </p>
                  {(item.extent?.temporal?.interval?.[0] || item.region) && (
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <div className="min-w-0">
                        {item.extent?.temporal?.interval?.[0] && (
                          <span>
                            {new Date(item.extent.temporal.interval[0][0]).toLocaleString()} - {item.extent.temporal.interval[0][1] ? new Date(item.extent.temporal.interval[0][1]).toLocaleString() : 'Present'}
                          </span>
                        )}
                      </div>
                      {item.region && (
                        <div className="flex-shrink-0 text-right">
                          <span className="font-semibold text-gray-600">Region:</span>{" "}
                          <span className="text-gray-700">{item.region}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogDetails;
