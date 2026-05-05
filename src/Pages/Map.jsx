import React from "react";

const MapPage = () => {
  return (
    <div className="h-full w-full bg-white overflow-hidden">
      <iframe
        src="https://fleetmonitoring.euro-argo.eu/dashboard?Status=Active&Basin=SOUTHERN%20OCEAN&Network=BGC"
        title="Argo Fleet Monitoring"
        width="100%"
        height="100%"
        loading="lazy"
        style={{ border: "1px solid #ddd", borderRadius: "6px" }}
        allowFullScreen
      />
    </div>
  );
};

export default MapPage;
