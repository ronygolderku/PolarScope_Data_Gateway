import React, { useState } from "react";
import logoImg from "../assets/aceasicon.png";

const BGCArgoPage = () => {
  const dashboardUrl = "https://fleetmonitoring.euro-argo.eu/dashboard?Status=Active&Basin=SOUTHERN%20OCEAN&Network=BGC";
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="h-full w-full bg-gradient-to-b from-[#0F2D57] to-[#1B3A5F] p-3 sm:p-4 lg:p-6">
      <div className="h-full w-full space-y-4 rounded-3xl border border-white/10 bg-[#0b2748] p-4 md:p-6 shadow-[0_18px_60px_rgba(2,10,24,0.2)]">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">Map view</p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">BGC Argo coverage</h1>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="text-sm text-[#D6E1F0] max-w-2xl md:text-right">
              External fleet monitoring dashboard embedded for quick access to the current Southern Ocean view.
            </p>
            <a
              href={dashboardUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#F8FAFC] transition-colors hover:bg-white/10"
            >
              Open dashboard
            </a>
          </div>
        </div>

        <div className="relative min-h-[78vh] overflow-hidden rounded-2xl border border-white/10 bg-[#143A6A]">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0F2D57]/90 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-[#0b2748]/90 px-8 py-7 shadow-2xl">
                <img
                  src={logoImg}
                  alt="Loading"
                  className="h-10 w-10 animate-spin"
                />
                <div className="text-center">
                  <div className="text-sm font-semibold uppercase tracking-[0.28em] text-[#F4C542]">
                    Loading
                  </div>
                  <div className="mt-1 text-sm text-[#D6E1F0]">
                    Preparing fleet monitoring dashboard
                  </div>
                </div>
              </div>
            </div>
          )}
          <iframe
            src={dashboardUrl}
            title="Argo Fleet Monitoring"
            width="100%"
            height="100%"
            loading="eager"
            style={{ border: "0" }}
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            className="min-h-[78vh] w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BGCArgoPage;
