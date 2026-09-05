import React, { useState } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaSnowflake,
  FaDownload,
  FaExternalLinkAlt,
  FaGitlab,
  FaBookOpen,
  FaRocket,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Link } from "react-router";
import CodeBlock from "../../components/CodeBlock";
import Breadcrumbs from "../../components/Breadcrumbs";
import RelatedDatasets from "../../components/RelatedDatasets";

const SeaIceAnalysis = () => {
  const [showIframe, setShowIframe] = useState(false);

  const datasets = [
    {
      name: "NSIDC Sea Ice Index (G02135)",
      description: "Passive microwave sea ice concentration and extent (1978–present).",
      to: "/search?q=sea+ice",
      provider: "NASA NSIDC",
      format: "NetCDF-4 / GeoTIFF",
      resolution: "25 km polar grid",
    },
    {
      name: "EUMETSAT OSI SAF Sea Ice Concentration",
      description: "Global ocean sea ice concentration climate data record (OSI-450 / OSI-430).",
      to: "/search?q=osi+saf",
      provider: "EUMETSAT",
      format: "NetCDF-4",
      resolution: "12.5–25 km grid",
    },
  ];

  const loadSicCode = `import xarray as xr
import numpy as np

# Load daily/monthly passive microwave sea ice concentration
# NetCDF array indexed by [time, y, x] in South Polar Stereographic (EPSG:3412)
ds = xr.open_dataset('data/antarctic_seaice_index.nc')

# Ice concentration variable (SIC) is typically 0% to 100%
sic = ds['ice_conc']

# Inspect coordinate metadata
print(f"Temporal span: {str(sic.time.values[0])[:10]} to {str(sic.time.values[-1])[:10]}")
print(f"Grid dimensions: {sic.shape[1]} x {sic.shape[2]} cells")`;

  const extentCalcCode = `# Grid cell area for NSIDC 25km South Polar Stereographic grid
# Standard cell area = 25 km x 25 km = 625 km² (accounting for map distortion)
GRID_CELL_AREA_KM2 = 625.0

# 1. Calculate Sea Ice Extent:
# Cumulative area of all ocean grid cells having >= 15% sea ice concentration
# (15% is the universal international threshold established in climate literature)
is_ice = (sic >= 15.0).astype(float)
extent_km2 = is_ice.sum(dim=['x', 'y']) * GRID_CELL_AREA_KM2

# 2. Calculate Sea Ice Area:
# Cumulative area of actual ice coverage (sum of cell area * concentration fraction)
area_km2 = (sic / 100.0).where(sic >= 15.0).sum(dim=['x', 'y']) * GRID_CELL_AREA_KM2

# Convert to millions of square kilometers (M km²)
extent_million_km2 = extent_km2 / 1e6
area_million_km2 = area_km2 / 1e6

print(f"Annual Max Extent (September): ~{float(extent_million_km2.max()):.2f} M km²")
print(f"Annual Min Extent (February):  ~{float(extent_million_km2.min()):.2f} M km²")`;

  const sectorAnalysisCode = `# Define longitudinal boundaries for the 5 Antarctic Sea Ice Sectors
# Sector coordinates based on Parkinson & Cavalieri (NASA Goddard):
SECTORS = {
    'Weddell Sea':               (-60, 20),
    'Indian Ocean':              (20, 90),
    'Western Pacific':           (90, 160),
    'Ross Sea':                  (160, -130), # Spans 180° date line
    'Bellingshausen-Amundsen':   (-130, -60),
}

# Regional mask using longitude coordinates
def calculate_sector_extent(ds_sic, lon_min, lon_max, cell_area=625.0):
    lon = ds_sic.lon
    if lon_min < lon_max:
        mask = (lon >= lon_min) & (lon < lon_max)
    else: # Handles wrapping across 180° meridian (e.g. Ross Sea)
        mask = (lon >= lon_min) | (lon < lon_max)
    
    sector_ice = (ds_sic >= 15.0).where(mask)
    return (sector_ice.sum(dim=['x', 'y']) * cell_area) / 1e6

# Calculate time series for each sector
sector_extents = {}
for name, (lmin, lmax) in SECTORS.items():
    sector_extents[name] = calculate_sector_extent(sic, lmin, lmax)
    print(f"{name}: Mean extent = {float(sector_extents[name].mean()):.2f} M km²")`;

  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 flex flex-col gap-8">
          
          {/* Breadcrumbs & Back */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <Breadcrumbs items={[{ label: "Antarctic Sea Ice Extent Analysis" }]} />
            <Link
              to="/tutorials"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#F4C542] hover:text-white transition-colors"
            >
              <FaArrowLeft />
              Back to Tutorials
            </Link>
          </div>

          {/* Header */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-full bg-[#F4C542]/20 text-[#F4C542] font-semibold">
                Intermediate
              </span>
              <span className="text-xs text-[#D6E1F0]">40 min read</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#3dd6d0]/20 text-[#3dd6d0] font-semibold">
                Cryosphere
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white flex items-center gap-3">
              <FaSnowflake className="text-[#3dd6d0]" />
              Antarctic Sea Ice Extent & Concentration Analysis
            </h1>
            <p className="text-lg text-[#D6E1F0] leading-relaxed">
              Analyze Southern Ocean sea ice dynamics using passive microwave satellite records (1978–present). Learn to apply the 15% extent threshold, decompose extreme seasonal swings, and quantify anomalies across the 5 Antarctic sectors.
            </p>
          </section>

          {/* Related Datasets */}
          <RelatedDatasets datasets={datasets} />

          {/* Quick Action Bar */}
          <section className="rounded-2xl border border-white/15 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FaRocket className="text-[#F4C542]" /> Jupyter Notebook Artifacts
                </h2>
                <p className="text-xs text-[#D6E1F0] mt-0.5">
                  Complete Antarctic-focused sea ice index notebook (Arctic sections removed for clarity).
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://colab.research.google.com/github/ronygolderku/PolarScope_Data_Gateway/blob/main/public/notebooks/antarctic_sea_ice_index.ipynb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#F4C542] px-3.5 py-2 text-xs font-bold text-[#071a34] hover:bg-[#e8ba30] transition-colors shadow-sm"
                >
                  <FaRocket /> Run in Colab
                </a>
                <a
                  href="/notebooks/antarctic_sea_ice_index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  <FaBookOpen /> HTML Report
                </a>
                <a
                  href="/notebooks/antarctic_sea_ice_index.ipynb"
                  download
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#3dd6d0]/40 bg-[#3dd6d0]/10 px-3.5 py-2 text-xs font-semibold text-[#3dd6d0] hover:bg-[#3dd6d0]/20 transition-colors"
                >
                  <FaDownload /> .ipynb File
                </a>
                <a
                  href="https://gitlab.eumetsat.int/eumetlab/oceans/ocean-training/sensors/learn-osi-saf-sea-ice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-[#D6E1F0] hover:text-white transition-colors"
                >
                  <FaGitlab /> EUMETSAT Training
                </a>
              </div>
            </div>
          </section>

          {/* Scientific Context: The Extreme Seasonal Swing */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">Antarctic Sea Ice Seasonality</h2>
            <p className="text-sm leading-relaxed text-[#D6E1F0]">
              Unlike the Arctic (an ocean enclosed by land), Antarctic sea ice surrounds a frozen continent and is free to expand outward into open ocean waters. This results in one of the most extreme annual seasonal cycles on Earth:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="rounded-xl border border-white/10 bg-[#143A6A]/60 p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-300">Austral Summer Minimum (February)</span>
                <div className="text-2xl font-bold text-white mt-1">~2 to 3 Million km²</div>
                <p className="text-xs text-[#D6E1F0] mt-1">Ice contracts primarily to the western Weddell Sea and coastal embayments in the Ross and Bellingshausen seas.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#143A6A]/60 p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300">Austral Winter Maximum (September)</span>
                <div className="text-2xl font-bold text-white mt-1">~18 to 19 Million km²</div>
                <p className="text-xs text-[#D6E1F0] mt-1">Ice expands northward past 60°S, covering an area larger than the Antarctic continent itself (~14M km²).</p>
              </div>
            </div>
          </section>

          {/* Workflow Step 1: Loading Microwave Data */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">1</span>
              Passive Microwave Data
            </div>
            <h2 className="text-2xl font-bold text-white">Loading Sea Ice Concentration (SIC)</h2>
            <p className="text-sm text-[#D6E1F0]">
              Passive microwave sensors (SMMR, SSM/I, SSMIS, AMSR2) detect brightness temperature differences between open water and sea ice. The resulting grid values represent Sea Ice Concentration from 0% to 100%:
            </p>
            <CodeBlock code={loadSicCode} language="Python" title="load_sea_ice.py" />
          </section>

          {/* Workflow Step 2: 15% Extent vs Area Calculation */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">2</span>
              Metric Calculation
            </div>
            <h2 className="text-2xl font-bold text-white">Applying the 15% Extent Threshold</h2>
            <div className="rounded-xl border border-[#3dd6d0]/30 bg-[#3dd6d0]/10 p-4 text-xs sm:text-sm text-[#D6E1F0] leading-relaxed">
              <strong className="text-[#3dd6d0]">Extent vs Area:</strong> <strong>Sea Ice Extent</strong> counts any ocean grid cell with concentration ≥15% as 100% ice-covered (minimizing algorithm sensor noise at the ice edge). <strong>Sea Ice Area</strong> integrates the true fraction of ice coverage.
            </div>
            <CodeBlock code={extentCalcCode} language="Python" title="calculate_extent.py" />
          </section>

          {/* Workflow Step 3: Five Sector Regional Analysis */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">3</span>
              Regional Breakdown
            </div>
            <h2 className="text-2xl font-bold text-white">Analyzing the 5 Antarctic Sectors</h2>
            <p className="text-sm text-[#D6E1F0]">
              Antarctic sea ice trends vary significantly by sector due to regional wind forcing (e.g. Amundsen Sea Low) and bathymetry:
            </p>
            <CodeBlock code={sectorAnalysisCode} language="Python" title="sector_breakdown.py" />
          </section>

          {/* Sector Overview Grid */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">The Five Antarctic Sea Ice Sectors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-[#D6E1F0]">
              <div className="border border-white/10 rounded-xl p-3.5 bg-[#143A6A]/60">
                <span className="font-bold text-white">Weddell Sea (60°W–20°E)</span>
                <p className="mt-1">Largest ice reservoir; contains substantial multi-year sea ice surviving austral summer melting.</p>
              </div>
              <div className="border border-white/10 rounded-xl p-3.5 bg-[#143A6A]/60">
                <span className="font-bold text-white">Ross Sea (160°E–130°W)</span>
                <p className="mt-1">Wind-driven coastal polynyas produce vast volumes of sea ice and dense Antarctic Bottom Water (AABW).</p>
              </div>
              <div className="border border-white/10 rounded-xl p-3.5 bg-[#143A6A]/60">
                <span className="font-bold text-white">Bellingshausen-Amundsen (130°W–60°W)</span>
                <p className="mt-1">Highest interannual variability, strongly modulated by atmospheric circulation and ENSO teleconnections.</p>
              </div>
              <div className="border border-white/10 rounded-xl p-3.5 bg-[#143A6A]/60">
                <span className="font-bold text-white">Indian Ocean (20°E–90°E)</span>
                <p className="mt-1">Narrow meridional ice band with rapid seasonal retreat during spring.</p>
              </div>
              <div className="border border-white/10 rounded-xl p-3.5 bg-[#143A6A]/60">
                <span className="font-bold text-white">Western Pacific (90°E–160°E)</span>
                <p className="mt-1">Dynamic pack ice interacting directly with East Antarctic glacier tongues (e.g. Mertz Glacier).</p>
              </div>
            </div>
          </section>

          {/* Collapsible Interactive Notebook Preview */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] overflow-hidden">
            <div className="p-5 flex items-center justify-between border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">Complete Interactive Notebook Output</h3>
                <p className="text-xs text-[#D6E1F0]">
                  Full Antarctic-focused notebook with monthly and daily trend charts.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowIframe(!showIframe)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-all"
              >
                {showIframe ? (
                  <>
                    <FaChevronUp /> Hide Viewer
                  </>
                ) : (
                  <>
                    <FaChevronDown /> Expand Full Viewer
                  </>
                )}
              </button>
            </div>

            {showIframe && (
              <div>
                <iframe
                  src="/notebooks/antarctic_sea_ice_index.html"
                  className="w-full border-none bg-white"
                  style={{ height: "750px" }}
                  title="Antarctic Sea Ice Notebook"
                />
              </div>
            )}
          </section>

          {/* Next Steps Banner */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">Explore In-Situ Observations</h3>
              <p className="text-sm text-[#D6E1F0] mt-1">
                See how satellite sea ice concentration aligns with autonomous BGC-Argo profiling floats.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/bgc-argo"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4C542] px-5 py-3 text-sm font-semibold text-[#071a34] hover:bg-[#e8ba30] transition-colors"
              >
                BGC-Argo Portal →
              </Link>
              <Link
                to="/tutorials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
              >
                All Tutorials
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default SeaIceAnalysis;