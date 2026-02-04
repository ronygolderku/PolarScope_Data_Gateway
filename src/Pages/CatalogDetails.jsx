import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Loading from "./Loading";

const CatalogDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  // /products/cloud-op-livas
  const productPath = location.pathname.replace("/products/", "");

  useEffect(() => {
    fetch(`/data/products/${productPath}/collection.json`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, [productPath]);

  if (!data) {
    return <Loading />;
  }

  // Helper to get formatted date
  const formatDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toLocaleString() : "Unknown";
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
            onClick={() => navigate(-1)}
            className="btn btn-xs btn-outline rounded-sm"
          >
            Up
          </button>
          <button
            onClick={() => navigate(`/themes/${productPath.split("-")[0]}`)}
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
            <div>
              <span className="font-bold">License</span>:{" "}
              {data.license || "Unknown"}
            </div>
            <div>
              <span className="font-bold">Temporal Extent</span>:{" "}
              {data.extent?.temporal?.interval?.[0]?.[0]
                ? new Date(
                    data.extent.temporal.interval[0][0],
                  ).toLocaleDateString()
                : "Unknown"}{" "}
              -{" "}
              {data.extent?.temporal?.interval?.[0]?.[1]
                ? new Date(
                    data.extent.temporal.interval[0][1],
                  ).toLocaleDateString()
                : "Present"}
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] w-full border border-gray-300 rounded shadow-sm relative z-0">
            {/*MapContainer needs specific height */}
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

            {/* Cf Table */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-2">Cf</h3>
              <div className="overflow-x-auto border border-gray-200 rounded">
                <table className="table table-xs w-full">
                  <tbody>
                    <tr className="bg-gray-50">
                      <td className="font-semibold w-24">Parameter</td>
                      <td className="break-all">
                        {data["cf:parameter"]?.[0]?.name || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Open Science Catalog Table */}
            <div>
              <h3 className="font-bold text-gray-700 mb-2">
                Open Science Catalog
              </h3>
              <div className="overflow-x-auto border border-gray-200 rounded">
                <table className="table table-xs w-full">
                  <tbody>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <td className="font-semibold w-24">Project</td>
                      <td className="text-blue-600 font-semibold">
                        {data["osc:project"] || "Unknown"}
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-gray-100">
                      <td className="font-semibold">Status</td>
                      <td>{data["osc:status"] || "Unknown"}</td>
                    </tr>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <td className="font-semibold">Region</td>
                      <td>{data["osc:region"] || "Global"}</td>
                    </tr>
                    <tr className="bg-white border-b border-gray-100">
                      <td className="font-semibold">Type</td>
                      <td>{data["osc:type"] || "Product"}</td>
                    </tr>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <td className="font-semibold">Variables</td>
                      <td>{data["osc:variables"]?.join(", ") || "N/A"}</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="font-semibold">Missions</td>
                      <td>{data["osc:missions"]?.join(", ") || "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              Additional Resources
            </h3>
            <div className="text-sm space-y-2">
              <div>
                <span className="font-semibold">Related resource</span>
              </div>
              <ul className="list-disc list-inside pl-2 text-gray-600">
                <li>Project: {data["osc:project"] || "Unknown"}</li>

                <li>
                  Theme:{" "}
                  {data.themes?.find((t) => t.concepts?.[0]?.id)?.concepts[0]
                    .id || "Unknown"}
                </li>
                <li>EO Mission: {data["osc:missions"]?.[0] || "N/A"}</li>
              </ul>
              <div className="mt-2">
                <span className="font-semibold">Source metadata</span>
              </div>
              <ul className="list-disc list-inside pl-2 text-gray-600">
                {data.links
                  ?.filter((l) => l.rel === "via" || l.rel === "self")
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogDetails;
