import React, { useState } from "react";
import Loading from "./Loading";

const MapPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="h-full w-full bg-white overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <Loading />
        </div>
      )}
      <iframe
        src="https://fleetmonitoring.euro-argo.eu/dashboard?Status=Active&Basin=SOUTHERN%20OCEAN&Network=BGC"
        title="Argo Fleet Monitoring"
        width="100%"
        height="100%"
        loading="lazy"
        style={{ border: "1px solid #ddd", borderRadius: "6px" }}
        allowFullScreen
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default MapPage;
