import React from "react";
import { Link } from "react-router";
import { FaDatabase, FaExternalLinkAlt } from "react-icons/fa";

const RelatedDatasets = ({ datasets = [] }) => {
  if (!datasets || datasets.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[#3dd6d0]/30 bg-gradient-to-br from-[#082244] to-[#0c315e] p-5 shadow-md">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#3dd6d0] mb-3">
        <FaDatabase />
        <span>Datasets Used in this Tutorial</span>
      </div>
      <p className="text-xs text-[#D6E1F0] mb-4">
        This workflow uses publicly available polar observations catalogued in PolarScope:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {datasets.map((ds, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#071a34]/80 p-3.5 transition-all hover:border-[#F4C542]/40 hover:bg-[#071a34]"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-semibold text-white">{ds.name}</h4>
                {ds.to && (
                  <Link
                    to={ds.to}
                    className="text-xs text-[#F4C542] hover:text-white flex items-center gap-1 shrink-0"
                    title="View in Catalog"
                  >
                    <span>View</span>
                    <FaExternalLinkAlt className="text-[10px]" />
                  </Link>
                )}
              </div>
              <p className="mt-1 text-xs text-[#D6E1F0] line-clamp-2">{ds.description}</p>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 text-[11px] text-[#A0AEC0]">
              {ds.provider && (
                <span className="rounded bg-white/5 px-2 py-0.5 text-white/80">
                  {ds.provider}
                </span>
              )}
              {ds.format && (
                <span className="rounded bg-[#3dd6d0]/10 px-2 py-0.5 text-[#3dd6d0]">
                  {ds.format}
                </span>
              )}
              {ds.resolution && (
                <span className="text-white/60">
                  {ds.resolution}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDatasets;
