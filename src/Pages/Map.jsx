import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const MapPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = Date.now();
    // Ensure at least 2s loading if iframe loads quickly
    const minDelay = 2000;

    const timer = setTimeout(() => {
      // If iframe hasn't loaded, keep showing until onLoad fires
      // This timer only ensures minimum display time
    }, minDelay);

    return () => clearTimeout(timer);
  }, []);

  const handleLoad = () => {
    const elapsed = Date.now();
    // ensure minimum 2s total display
    const minDelay = 2000;
    const remaining = Math.max(0, minDelay - (Date.now() - (window.__bgcLoadStart || Date.now())));
    setTimeout(() => setLoading(false), remaining);
  };

  // Record start time when component mounts so we can enforce min display
  useEffect(() => {
    window.__bgcLoadStart = Date.now();
    return () => {
      delete window.__bgcLoadStart;
    };
  }, []);

  return (
    <div className="h-full w-full min-h-screen bg-gradient-to-b from-[#0F2D57] to-[#1B3A5F] overflow-hidden relative">
      {loading && <Loading />}
      <iframe
        src="https://fleetmonitoring.euro-argo.eu/dashboard?Status=Active&Basin=SOUTHERN%20OCEAN&Network=BGC"
        title="Argo Fleet Monitoring"
        width="100%"
        height="100%"
        loading="lazy"
        style={{ border: "1px solid #ddd", borderRadius: "6px" }}
        allowFullScreen
        onLoad={handleLoad}
      />
    </div>
  );
};

export default MapPage;
