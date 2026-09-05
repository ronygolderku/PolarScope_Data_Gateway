import React from "react";
import { FaArrowLeft, FaLightbulb, FaCheckCircle, FaPython, FaExclamationTriangle, FaChartLine } from "react-icons/fa";
import { Link } from "react-router";
import CodeBlock from "../../components/CodeBlock";
import Breadcrumbs from "../../components/Breadcrumbs";
import RelatedDatasets from "../../components/RelatedDatasets";

const WorkingWithNetCDF = () => {
  const datasets = [
    {
      name: "NOAA Optimum Interpolation SST V2",
      description: "Daily and monthly 1/4° sea surface temperature for the Southern Ocean.",
      to: "/search?q=temperature",
      provider: "NOAA PSL",
      format: "NetCDF-4",
      resolution: "0.25° grid",
    },
    {
      name: "Ocean Colour CCI Chlorophyll-a",
      description: "Merged multi-sensor global chlorophyll concentration composite.",
      to: "/search?q=chlorophyll",
      provider: "ESA / Copernicus",
      format: "NetCDF-4",
      resolution: "4 km grid",
    },
  ];

  const installCode = `# Recommended: conda environment with geospatial scientific stack
conda create -n polar_env -c conda-forge python=3.11 xarray netcdf4 dask matplotlib cartopy bottleneck
conda activate polar_env

# Alternative: pip install
pip install xarray netCDF4 "dask[array]" matplotlib cartopy bottleneck`;

  const openDatasetCode = `import xarray as xr

# 1. Open NetCDF file with Dask chunking for memory efficiency
# Chuncked loading allows analyzing 30+ year stacks without filling RAM
ds = xr.open_dataset('southern_ocean_sst.nc', chunks={'time': 12})

# 2. Inspect dataset structure, coordinates, and metadata
print(ds)

# 3. View variable attributes and CF-standard conventions
print(ds['sst'].attrs)
# Example output shows:
# units: "degC"
# long_name: "Daily Sea Surface Temperature"
# _FillValue: -9.99e+33`;

  const subsettingCode = `# Step 1: Spatial subsetting for the Southern Ocean (south of 40°S)
# Note: depending on the provider, latitude can run +90 to -90 or -90 to +90
so_subset = ds.sel(lat=slice(-40, -90))

# Step 2: Critical Polar Gotcha — Longitude Wrapping
# Many climate models and NOAA datasets store longitude from 0 to 360°.
# Cartopy South Polar projections require longitude in -180 to 180° format:
if so_subset.lon.max() > 180:
    so_subset = so_subset.assign_coords(
        lon=(((so_subset.lon + 180) % 360) - 180)
    ).sortby('lon')

# Step 3: Temporal subsetting with ISO date strings
recent_decade = so_subset.sel(time=slice('2010-01-01', '2023-12-31'))
print(f"Subsetted array shape: {recent_decade['sst'].shape}")`;

  const maskingCode = `import numpy as np

# Masking land and ice-shelf areas
# Many polar variables mark land / ice shelves with specific fill values or flags
sst_clean = so_subset['sst'].where(so_subset['sst'] > -3.0)

# Computing seasonal climatology (Austral Summer: Dec, Jan, Feb)
# Austral summer spans year-end: DJF
summer_climatology = sst_clean.groupby('time.season')['DJF'].mean(dim='time')

# Area-weighted spatial mean (accounting for decreasing grid area towards South Pole)
weights = np.cos(np.deg2rad(sst_clean.lat))
weights.name = "weights"
sst_weighted = sst_clean.weighted(weights)
weighted_timeseries = sst_weighted.mean(dim=['lat', 'lon'])`;

  const cartopyPlotCode = `import matplotlib.pyplot as plt
import matplotlib.path as mpath
import cartopy.crs as ccrs
import cartopy.feature as cfeature
import numpy as np

# Create South Polar Stereographic projection map
fig = plt.figure(figsize=(9, 9))
ax = fig.add_subplot(1, 1, 1, projection=ccrs.SouthPolarStereo())

# Limit plot boundary to south of 50°S
ax.set_extent([-180, 180, -90, -50], ccrs.PlateCarree())

# Polar Map Gotcha: Create a circular boundary so map doesn't look like a square
theta = np.linspace(0, 2*np.pi, 100)
center, radius = [0.5, 0.5], 0.5
verts = np.vstack([np.sin(theta), np.cos(theta)]).T
circle = mpath.Path(verts * radius + center)
ax.set_boundary(circle, transform=ax.transAxes)

# Plot summer temperature contour
im = summer_climatology.plot.pcolormesh(
    ax=ax,
    transform=ccrs.PlateCarree(),
    cmap='twilight_shifted',
    vmin=-2, vmax=14,
    cbar_kwargs={'label': 'Austral Summer Mean SST (°C)', 'shrink': 0.7, 'pad': 0.05}
)

# Add Antarctic coastline and bathymetric boundaries
ax.add_feature(cfeature.LAND, facecolor='#2d3748', zorder=2)
ax.coastlines(resolution='50m', color='white', linewidth=0.8, zorder=3)
ax.gridlines(draw_labels=True, color='gray', alpha=0.5, linestyle='--')

plt.title('Southern Ocean Austral Summer SST Climatology', fontsize=14, color='white', pad=20)
plt.tight_layout()
plt.savefig('so_summer_sst.png', dpi=300)
plt.show()`;

  const hovmollerCode = `# Average SST over longitude to produce Latitude-Time Hovmöller diagram
hovmoller = sst_clean.mean(dim='lon')

fig, ax = plt.subplots(figsize=(12, 6))
im = hovmoller.plot(
    ax=ax,
    x='time',
    y='lat',
    cmap='Spectral_r',
    vmin=-2,
    vmax=15,
    cbar_kwargs={'label': 'Zonally Averaged SST (°C)'}
)
ax.set_title('Southern Ocean Meridional SST Evolution (Hovmöller Diagram)', fontsize=13)
ax.set_ylabel('Latitude (°S)')
ax.set_xlabel('Year')
plt.tight_layout()
plt.show()`;

  const exportCode = `# Save processed analysis to compressed NetCDF-4
encoding = {
    'sst': {'zlib': True, 'complevel': 4, 'dtype': 'float32'}
}
recent_decade.to_netcdf('southern_ocean_subset_compressed.nc', encoding=encoding)

# Export regional time series to pandas CSV
df_ts = weighted_timeseries.to_dataframe(name='mean_sst_celsius')
df_ts.to_csv('southern_ocean_weighted_sst.csv')
print("Successfully saved NetCDF and CSV files!")`;

  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 flex flex-col gap-8">
          
          {/* Breadcrumbs & Back */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <Breadcrumbs items={[{ label: "Working with NetCDF in Python" }]} />
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
              <span className="text-xs text-[#D6E1F0]">30 min read</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#3dd6d0]/20 text-[#3dd6d0] font-semibold">
                Python 3.10+
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white flex items-center gap-3">
              <FaPython className="text-[#3dd6d0]" />
              Working with NetCDF Files in Python
            </h1>
            <p className="text-lg text-[#D6E1F0] leading-relaxed">
              A researcher's guide to processing, slicing, masking, and visualizing Antarctic multi-dimensional arrays using Python's xarray and Cartopy ecosystems.
            </p>
          </section>

          {/* Datasets Callout */}
          <RelatedDatasets datasets={datasets} />

          {/* Core Introduction */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">Why NetCDF in Polar Research?</h2>
            <p className="text-sm leading-relaxed text-[#D6E1F0]">
              NetCDF-4 (built on HDF5) is the primary format for satellite observations and ocean climate reanalyses. It stores multi-dimensional arrays (such as <code>[time, depth, latitude, longitude]</code>) along with embedded coordinates, units, and CF (Climate and Forecast) metadata conventions.
            </p>
            <p className="text-sm leading-relaxed text-[#D6E1F0]">
              Working with polar data introduces unique quirks—such as longitude wrapping around the pole (0–360° vs ±180°), latitude area weighting, and polar projection distortion. This guide covers how to handle these correctly with <strong>xarray</strong>.
            </p>
          </section>

          {/* Step 1: Environment Setup */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">1</span>
              Environment Setup
            </div>
            <h2 className="text-2xl font-bold text-white">Install Geospatial Dependencies</h2>
            <p className="text-sm text-[#D6E1F0]">
              We strongly recommend using <strong>conda</strong> or <strong>mamba</strong> to install GDAL and Cartopy dependencies without binary compilation issues:
            </p>
            <CodeBlock code={installCode} language="Bash" title="Environment Installation" />
          </section>

          {/* Step 2: Reading & Metadata */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">2</span>
              Loading Data
            </div>
            <h2 className="text-2xl font-bold text-white">Opening Files with Dask Chunking</h2>
            <p className="text-sm text-[#D6E1F0]">
              Always inspect coordinate orientations and missing data flags (<code>_FillValue</code>) when loading a new polar dataset:
            </p>
            <CodeBlock code={openDatasetCode} language="Python" title="open_netcdf.py" />
          </section>

          {/* Step 3: Spatial Slicing & Polar Gotchas */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">3</span>
              Spatial & Temporal Slicing
            </div>
            <h2 className="text-2xl font-bold text-white">Southern Ocean Subsetting & Longitude Wrapping</h2>
            
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3">
              <FaExclamationTriangle className="text-amber-400 text-lg mt-0.5 shrink-0" />
              <div className="text-xs sm:text-sm text-[#D6E1F0] leading-relaxed">
                <strong className="text-amber-300">Polar Gotcha: 0–360° Longitude Grids.</strong> Many global satellite datasets (e.g. NOAA OISST) index longitude from <code>0° to 360°</code>. When plotted on Antarctic polar projections, this creates a split line at 0° (Greenwich). You must convert to <code>-180° to +180°</code> before mapping.
              </div>
            </div>

            <CodeBlock code={subsettingCode} language="Python" title="subset_so.py" />
          </section>

          {/* Step 4: Masking & Weighted Averages */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">4</span>
              Masking & Climatology
            </div>
            <h2 className="text-2xl font-bold text-white">Area-Weighted Averages & Seasonal Aggregation</h2>
            <p className="text-sm text-[#D6E1F0]">
              Grid cells shrink significantly as latitude approaches -90°S. To avoid heavily biasing regional averages towards the pole, apply a cosine latitude weighting:
            </p>
            <CodeBlock code={maskingCode} language="Python" title="climatology_weights.py" />
          </section>

          {/* Step 5: South Polar Stereographic Plotting */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">5</span>
              Antarctic Mapping
            </div>
            <h2 className="text-2xl font-bold text-white">South Polar Stereographic Projections with Cartopy</h2>
            <p className="text-sm text-[#D6E1F0]">
              For publication-quality Antarctic figures, use <code>ccrs.SouthPolarStereo()</code> and apply a circular boundary path to produce a circular polar boundary:
            </p>
            <CodeBlock code={cartopyPlotCode} language="Python" title="plot_south_polar.py" />
          </section>

          {/* Step 6: Hovmöller Diagram */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">6</span>
              Diagnostics
            </div>
            <h2 className="text-2xl font-bold text-white">Meridional Hovmöller Diagrams</h2>
            <p className="text-sm text-[#D6E1F0]">
              A Hovmöller diagram averages values over longitude to illustrate how temperatures or anomalies propagate southward over multiple seasons:
            </p>
            <CodeBlock code={hovmollerCode} language="Python" title="hovmoller_diagram.py" />
          </section>

          {/* Step 7: Exporting */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F4C542]">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">7</span>
              Output
            </div>
            <h2 className="text-2xl font-bold text-white">Saving Compressed NetCDF & CSV Formats</h2>
            <CodeBlock code={exportCode} language="Python" title="export_data.py" />
          </section>

          {/* Next Steps (Fixed Link: now points to /tutorials/sst-analysis instead of 404!) */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#F4C542] uppercase tracking-wider">
                <FaChartLine /> Ready for Full Research Workflows?
              </div>
              <h3 className="text-xl font-bold text-white mt-1">Apply this to 32 Years of Southern Ocean Data</h3>
              <p className="text-sm text-[#D6E1F0] mt-1">
                Explore our full worked tutorial calculating SST warming rates and mapping circumpolar fronts.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/tutorials/sst-analysis"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4C542] px-5 py-3 text-sm font-semibold text-[#071a34] hover:bg-[#e8ba30] transition-colors"
              >
                Next: SST Analysis Tutorial →
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
              >
                Browse Catalogue
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default WorkingWithNetCDF;
