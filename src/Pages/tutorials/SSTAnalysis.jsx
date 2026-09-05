import React, { useState } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaThermometerHalf,
  FaDownload,
  FaExternalLinkAlt,
  FaGithub,
  FaBookOpen,
  FaRocket,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Link } from "react-router";
import CodeBlock from "../../components/CodeBlock";
import Breadcrumbs from "../../components/Breadcrumbs";
import RelatedDatasets from "../../components/RelatedDatasets";

const SSTAnalysis = () => {
  const [showIframe, setShowIframe] = useState(false);

  const datasets = [
    {
      name: "NOAA Optimum Interpolation SST (OISST) V2",
      description: "Monthly 1° resolution SST climatology and time series (1991–2022, 384 months).",
      to: "/search?q=temperature",
      provider: "NOAA PSL / NCEI",
      format: "NetCDF-4",
      resolution: "1.0° global grid",
    },
    {
      name: "Southern Ocean Oceanic Fronts (Orsi et al.)",
      description: "Mean climatological positions of ACC fronts (STF, SAF, PF, SB).",
      to: "/search?q=fronts",
      provider: "ACEAS / CCAMLR",
      format: "Shapefile / NetCDF",
      resolution: "Circumpolar",
    },
  ];

  const loadDataCode = `import xarray as xr
import numpy as np

# 1. Load NOAA Optimum Interpolation Sea Surface Temperature V2 dataset
# Spans 32 years: 1991 through 2022 (384 consecutive months)
ds = xr.open_dataset('data/sst_so_1991_2022.nc')

# 2. Subset to the Southern Ocean domain (30°S to 85°S)
so_sst = ds['sst'].sel(lat=slice(-30, -85))

# 3. Calculate 32-year temporal climatological mean
mean_sst = so_sst.mean(dim='time')

print(f"Southern Ocean Domain Dimensions: {so_sst.shape}")
print(f"Min Temp: {float(mean_sst.min()):.2f}°C, Max Temp: {float(mean_sst.max()):.2f}°C")`;

  const frontsMappingCode = `import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import cartopy.feature as cfeature

# South Polar Stereographic projection centered at the South Pole
fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(1, 1, 1, projection=ccrs.SouthPolarStereo())
ax.set_extent([-180, 180, -90, -35], ccrs.PlateCarree())

# Plot 32-year Mean Sea Surface Temperature
im = mean_sst.plot.contourf(
    ax=ax, transform=ccrs.PlateCarree(),
    levels=np.linspace(-2, 20, 23),
    cmap='RdYlBu_r', extend='both',
    cbar_kwargs={'label': 'Mean SST (°C)', 'shrink': 0.75, 'pad': 0.05}
)

# Highlight Characteristic Southern Ocean Fronts as Isotherms
# - Subantarctic Front (SAF): ~10°C isotherm (Northern ACC boundary)
# - Polar Front (PF): ~4°C isotherm (Cold Antarctic surface water boundary)
# - Southern ACC Boundary (SB): ~0°C isotherm (High-latitude boundary)
ax.contour(mean_sst.lon, mean_sst.lat, mean_sst, levels=[0.0],
           colors='#38bdf8', linewidths=1.8, transform=ccrs.PlateCarree(), linestyles='--')
ax.contour(mean_sst.lon, mean_sst.lat, mean_sst, levels=[4.0],
           colors='#eab308', linewidths=2.0, transform=ccrs.PlateCarree())
ax.contour(mean_sst.lon, mean_sst.lat, mean_sst, levels=[10.0],
           colors='#f97316', linewidths=2.0, transform=ccrs.PlateCarree())

ax.add_feature(cfeature.LAND, facecolor='#1e293b', edgecolor='white', zorder=3)
ax.coastlines(resolution='50m', color='white', linewidth=0.8, zorder=4)
ax.gridlines(draw_labels=True, color='gray', alpha=0.4, linestyle=':')

plt.title('Southern Ocean Oceanic Fronts & Climatological Mean SST (1991–2022)',
          fontsize=13, color='white', pad=20)
plt.tight_layout()
plt.show()`;

  const trendCalcCode = `# Calculate decadal SST linear trend (1991–2022) using xarray's polyfit
# Convert time coordinate to integer years for intuitive slope interpretation
time_in_years = so_sst['time.year'] + (so_sst['time.month'] - 0.5) / 12.0
so_sst_timed = so_sst.assign_coords(time_year=time_in_years)

# 1st-degree polynomial fit along the time dimension
fit = so_sst_timed.polyfit(dim='time_year', deg=1)

# Multiply by 10 to obtain warming trend in degrees Celsius per decade
trend_per_decade = fit['polyfit_coefficients'].sel(degree=1) * 10.0

# Calculate domain-averaged Southern Ocean warming rate
domain_trend = float(trend_per_decade.mean())
print(f"Southern Ocean Mean Warming Rate: +{domain_trend:.3f}°C per decade")
# Result: ~ +0.092°C / decade, with regional peaks exceeding +0.23°C / decade`;

  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 flex flex-col gap-8">
          
          {/* Breadcrumbs & Back */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <Breadcrumbs items={[{ label: "Analyzing Sea Surface Temperature" }]} />
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
              <span className="text-xs text-[#D6E1F0]">45 min read</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#3dd6d0]/20 text-[#3dd6d0] font-semibold">
                Climate & Oceanography
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white flex items-center gap-3">
              <FaThermometerHalf className="text-[#F4C542]" />
              Southern Ocean Sea Surface Temperature Trends
            </h1>
            <p className="text-lg text-[#D6E1F0] leading-relaxed">
              Complete scientific workflow analyzing 32 years (1991–2022) of NOAA satellite SST records. Calculate linear warming trends, delineate circumpolar fronts, and investigate regional warming anomalies.
            </p>
          </section>

          {/* Datasets in Catalog */}
          <RelatedDatasets datasets={datasets} />

          {/* Quick Action Bar */}
          <section className="rounded-2xl border border-white/15 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FaRocket className="text-[#F4C542]" /> Interactive Notebook Artifacts
                </h2>
                <p className="text-xs text-[#D6E1F0] mt-0.5">
                  Execute this analysis in the cloud or download the complete Jupyter notebook.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://colab.research.google.com/github/ronygolderku/PolarScope_Data_Gateway/blob/main/public/notebooks/sst_so.ipynb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#F4C542] px-3.5 py-2 text-xs font-bold text-[#071a34] hover:bg-[#e8ba30] transition-colors shadow-sm"
                >
                  <FaRocket /> Run in Colab
                </a>
                <a
                  href="/notebooks/sst_so.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  <FaBookOpen /> HTML Report
                </a>
                <a
                  href="/notebooks/sst_so.ipynb"
                  download
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#3dd6d0]/40 bg-[#3dd6d0]/10 px-3.5 py-2 text-xs font-semibold text-[#3dd6d0] hover:bg-[#3dd6d0]/20 transition-colors"
                >
                  <FaDownload /> .ipynb File
                </a>
                <a
                  href="https://github.com/ronygolderku/so_sst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-[#D6E1F0] hover:text-white transition-colors"
                >
                  <FaGithub /> Source
                </a>
              </div>
            </div>
          </section>

          {/* Science Background */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">Oceanographic Significance</h2>
            <p className="text-sm leading-relaxed text-[#D6E1F0]">
              The Southern Ocean is the engine of global ocean ventilation, absorbing over 40% of all anthropogenic oceanic carbon and 75% of excess heat. Temperature patterns are structured by the <strong>Antarctic Circumpolar Current (ACC)</strong>, bounded by intense hydrographic fronts that act as thermal barriers between cold polar water masses and the warmer mid-latitude gyres.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="rounded-xl border border-white/10 bg-[#143A6A]/60 p-3.5">
                <span className="font-bold text-[#f97316]">Subantarctic Front (~10°C)</span>
                <p className="mt-1 text-[#D6E1F0]">Northern boundary of the ACC, separating warm sub-tropical water from cold subantarctic zone water.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#143A6A]/60 p-3.5">
                <span className="font-bold text-[#eab308]">Polar Front (~4°C)</span>
                <p className="mt-1 text-[#D6E1F0]">Critical ecological transition where Antarctic surface water subducts under the subantarctic zone.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#143A6A]/60 p-3.5">
                <span className="font-bold text-[#38bdf8]">Southern ACC Boundary (~0°C)</span>
                <p className="mt-1 text-[#D6E1F0]">Southernmost extent of circumpolar transport, directly interfacing with sea ice formation zones.</p>
              </div>
            </div>
          </section>

          {/* Workflow Step 1: Loading & Subsetting */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">1</span>
              Data Subsetting
            </div>
            <h2 className="text-2xl font-bold text-white">Loading NOAA OISST Climatology</h2>
            <p className="text-sm text-[#D6E1F0]">
              We load 384 monthly records (1991–2022) of Optimum Interpolation Sea Surface Temperature, isolating the circumpolar domain south of 30°S:
            </p>
            <CodeBlock code={loadDataCode} language="Python" title="load_sst.py" />
          </section>

          {/* Workflow Step 2: Mapping Oceanic Fronts */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">2</span>
              Circumpolar Mapping
            </div>
            <h2 className="text-2xl font-bold text-white">Visualizing Oceanic Fronts on South Polar Projections</h2>
            <p className="text-sm text-[#D6E1F0]">
              By overlaying characteristic isotherms (0°C, 4°C, 10°C) on the temporal mean field, we map the circumpolar fronts in Cartopy:
            </p>
            <CodeBlock code={frontsMappingCode} language="Python" title="plot_fronts_cartopy.py" />
          </section>

          {/* Workflow Step 3: Decadal Warming Rate */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">3</span>
              Trend Calculation
            </div>
            <h2 className="text-2xl font-bold text-white">Calculating 32-Year Decadal Warming Rates</h2>
            <p className="text-sm text-[#D6E1F0]">
              Using linear regression across 384 monthly timestamps, we estimate the long-term warming rate per decade across the Southern Ocean:
            </p>
            <CodeBlock code={trendCalcCode} language="Python" title="calculate_trends.py" />
          </section>

          {/* Key Findings */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">Key Research Findings (1991–2022)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#D6E1F0]">
              <div className="flex items-start gap-2.5">
                <FaCheckCircle className="text-[#3dd6d0] text-base shrink-0 mt-0.5" />
                <span>
                  <strong>Mean Warming Trend:</strong> The Southern Ocean experienced an average warming rate of <strong>+0.092°C per decade</strong> over the 32-year record.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <FaCheckCircle className="text-[#3dd6d0] text-base shrink-0 mt-0.5" />
                <span>
                  <strong>Antarctic Peninsula Hotspot:</strong> The western Antarctic Peninsula and northern Bellingshausen Sea showed accelerated warming exceeding <strong>+0.23°C/decade</strong>.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <FaCheckCircle className="text-[#3dd6d0] text-base shrink-0 mt-0.5" />
                <span>
                  <strong>Frontal Asymmetry:</strong> The Subantarctic Zone warmed faster than the high-latitude Antarctic Zone, sharpening the meridional temperature gradient.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <FaCheckCircle className="text-[#3dd6d0] text-base shrink-0 mt-0.5" />
                <span>
                  <strong>Circumpolar Variability:</strong> Warming rates reflect strong coupling with the Southern Annular Mode (SAM) and regional sea ice retreat.
                </span>
              </div>
            </div>
          </section>

          {/* Collapsible Full Notebook Viewer */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] overflow-hidden">
            <div className="p-5 flex items-center justify-between border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">Complete Interactive Notebook Output</h3>
                <p className="text-xs text-[#D6E1F0]">
                  View complete rendered execution logs, tables, and figures from Jupyter.
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
                  src="/notebooks/sst_so.html"
                  className="w-full border-none bg-white"
                  style={{ height: "750px" }}
                  title="SST Analysis Notebook"
                />
              </div>
            )}
          </section>

          {/* Next Steps Banner */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">Next: Antarctic Sea Ice Extent Analysis</h3>
              <p className="text-sm text-[#D6E1F0] mt-1">
                Investigate how SST warming correlates with passive microwave sea ice extent and seasonal cycles.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/tutorials/sea-ice-analysis"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4C542] px-5 py-3 text-sm font-semibold text-[#071a34] hover:bg-[#e8ba30] transition-colors"
              >
                Next: Sea Ice Tutorial →
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

export default SSTAnalysis;
