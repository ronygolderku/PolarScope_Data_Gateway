import React from "react";
import { FaArrowLeft, FaLightbulb, FaCheckCircle, FaSnowflake, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";

const SeaIceAnalysis = () => {
  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 flex flex-col gap-8">
          {/* Back Button */}
          <Link
            to="/tutorials"
            className="inline-flex items-center gap-2 text-sm text-[#F4C542] hover:text-[#e8ba30] transition-colors"
          >
            <FaArrowLeft />
            Back to Tutorials
          </Link>

          {/* Header */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-full bg-[#F4C542]/20 text-[#F4C542] font-medium">
                Intermediate
              </span>
              <span className="text-xs text-[#D6E1F0]">40 min</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white flex items-center gap-3">
              <FaSnowflake className="text-[#F4C542]" />
              Antarctic Sea Ice Extent Analysis
            </h1>
            <p className="text-lg text-[#D6E1F0]">
              Analyze Antarctic sea ice concentration and extent using satellite observations. Learn to process
              passive microwave data, calculate ice extent metrics, and visualize seasonal and interannual variations.
            </p>
          </section>

          {/* Introduction */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white">Introduction</h2>
            <p className="text-[#D6E1F0]">
              Antarctic sea ice is a critical component of the Earth's climate system. It moderates heat exchange
              between ocean and atmosphere, influences ocean circulation, and provides crucial habitat for polar ecosystems.
              Unlike Arctic sea ice which has shown dramatic decline, Antarctic sea ice exhibits complex regional
              and seasonal variability.
            </p>
            <p className="text-[#D6E1F0]">
              In this tutorial, you'll learn to:
            </p>
            <ul className="space-y-2 text-[#D6E1F0]">
              <li className="flex gap-2">
                <span className="text-[#F4C542]">•</span>
                <span>Process passive microwave sea ice concentration data</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#F4C542]">•</span>
                <span>Calculate sea ice extent and area metrics</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#F4C542]">•</span>
                <span>Create Antarctic-focused polar projection maps</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#F4C542]">•</span>
                <span>Analyze seasonal cycles and long-term trends</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#F4C542]">•</span>
                <span>Compare ice extent across different Antarctic sectors</span>
              </li>
            </ul>

            <div className="bg-[#1B457A]/50 p-4 rounded-lg border-l-4 border-[#F4C542]">
              <div className="flex items-start gap-2">
                <FaLightbulb className="text-[#F4C542] mt-1 flex-shrink-0" />
                <div className="text-sm text-[#D6E1F0]">
                  <strong>Focus:</strong> This tutorial specifically focuses on <strong>Antarctic</strong> sea ice
                  in the Southern Ocean, not Arctic sea ice. The analysis techniques apply to the region south of 40°S.
                </div>
              </div>
            </div>

            <div className="bg-[#143A6A] rounded-lg p-4 mt-4">
              <p className="text-sm font-semibold text-white mb-3">📓 Interactive Notebook with Outputs</p>
              <p className="text-sm text-[#D6E1F0] mb-3">
                Complete working example from EUMETSAT OSI SAF training materials showing sea ice index plotting with actual outputs and visualizations.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/notebooks/osi_saf_ice_index.ipynb"
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#071a34] transition-colors hover:bg-[#e8ba30]"
                >
                  ⬇️ Download Notebook (.ipynb)
                </a>
                <a
                  href="https://gitlab.eumetsat.int/eumetlab/oceans/ocean-training/sensors/learn-osi-saf-sea-ice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#F4C542] bg-transparent px-4 py-2 text-sm font-semibold text-[#F4C542] transition-colors hover:bg-[#F4C542]/10"
                >
                  🔗 View Source Repository
                </a>
              </div>
            </div>
          </section>

          {/* Step 1: Understanding Sea Ice Products */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  1
                </span>
                STEP ONE
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Understanding Antarctic Sea Ice Products
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <div className="bg-[#143A6A] rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Key Metrics Explained</h3>
                <ul className="space-y-3 text-sm text-[#D6E1F0]">
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <div>
                      <strong>Sea Ice Concentration (SIC):</strong> Percentage of ocean area covered by ice (0-100%).
                      Grid cells with values, not total coverage.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <div>
                      <strong>Sea Ice Extent:</strong> Total area of ocean with at least 15% ice concentration.
                      Standard metric for trend analysis.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <div>
                      <strong>Sea Ice Area:</strong> Actual ice-covered area accounting for concentration
                      (extent × concentration). More precise than extent.
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Data Sources for Antarctic Sea Ice</h3>
                <div className="space-y-3">
                  <div className="bg-[#143A6A] rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">NSIDC Sea Ice Index (Recommended)</h4>
                    <p className="text-sm text-[#D6E1F0] mb-2">
                      Daily and monthly sea ice extent and concentration from passive microwave satellites
                    </p>
                    <ul className="space-y-1 text-xs text-[#D6E1F0]">
                      <li><strong>Resolution:</strong> 25 km grid</li>
                      <li><strong>Coverage:</strong> 1978-present (both hemispheres)</li>
                      <li><strong>URL:</strong> nsidc.org/data/G02135</li>
                      <li><strong>Sensors:</strong> SMMR, SSM/I, SSMIS</li>
                    </ul>
                  </div>

                  <div className="bg-[#143A6A] rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">OSI SAF Sea Ice Concentration</h4>
                    <p className="text-sm text-[#D6E1F0] mb-2">
                      EUMETSAT Ocean and Sea Ice SAF products
                    </p>
                    <ul className="space-y-1 text-xs text-[#D6E1F0]">
                      <li><strong>Resolution:</strong> 10-25 km grid</li>
                      <li><strong>Coverage:</strong> Daily, 1978-present</li>
                      <li><strong>URL:</strong> osi-saf.eumetsat.int</li>
                      <li><strong>Products:</strong> OSI-401, OSI-450, OSI-430</li>
                    </ul>
                  </div>

                  <div className="bg-[#143A6A] rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">AMSR2 Sea Ice Concentration</h4>
                    <p className="text-sm text-[#D6E1F0] mb-2">
                      Advanced Microwave Scanning Radiometer 2
                    </p>
                    <ul className="space-y-1 text-xs text-[#D6E1F0]">
                      <li><strong>Resolution:</strong> 10 km and 6.25 km grids</li>
                      <li><strong>Coverage:</strong> 2012-present</li>
                      <li><strong>URL:</strong> seaice.uni-bremen.de/sea-ice-concentration/</li>
                      <li><strong>Advantage:</strong> Higher resolution for detailed analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 2: Download Data */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  2
                </span>
                STEP TWO
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Download NSIDC Sea Ice Data
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <p className="text-[#D6E1F0]">
                We'll use NSIDC Sea Ice Index data, which provides consistent long-term records.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Manual download</h3>
                <div className="bg-[#143A6A] rounded-lg p-4 space-y-2">
                  <p className="text-sm text-[#D6E1F0]">
                    1. Visit: <span className="text-[#3dd6d0] font-mono">nsidc.org/data/G02135</span>
                  </p>
                  <p className="text-sm text-[#D6E1F0]">
                    2. Click "Download Data" → "HTTPS"
                  </p>
                  <p className="text-sm text-[#D6E1F0]">
                    3. Navigate to <code className="bg-[#071a34] px-2 py-1 rounded">south/monthly/</code>
                  </p>
                  <p className="text-sm text-[#D6E1F0]">
                    4. Download concentration files: <code className="bg-[#071a34] px-2 py-1 rounded">seaice_conc_monthly_sh_*.nc</code>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Automated download with Python</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`import urllib.request
from pathlib import Path
import numpy as np

# Download monthly Antarctic sea ice concentration
base_url = "https://noaadata.apps.nsidc.org/NOAA/G02135/south/monthly/"

# Example: download data for 2023
year = 2023
output_dir = Path("data/seaice")
output_dir.mkdir(parents=True, exist_ok=True)

for month in range(1, 13):
    filename = f"seaice_conc_monthly_sh_{year}{month:02d}_v3.0.nc"
    url = base_url + filename
    output_path = output_dir / filename

    print(f"Downloading {filename}...")
    try:
        urllib.request.urlretrieve(url, output_path)
        print(f"  ✓ Downloaded to {output_path}")
    except Exception as e:
        print(f"  ✗ Error: {e}")

print("Download complete!")`}
                  </pre>
                </div>
              </div>

              <div className="bg-[#1B457A]/50 p-4 rounded-lg border-l-4 border-[#F4C542]">
                <div className="flex items-start gap-2">
                  <FaLightbulb className="text-[#F4C542] mt-1 flex-shrink-0" />
                  <div className="text-sm text-[#D6E1F0]">
                    <strong>Pro tip:</strong> Start with monthly data for easier handling. Daily data provides
                    more detail but files are larger (~1-2 MB each vs ~10 MB for monthly).
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3: Load and Explore */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  3
                </span>
                STEP THREE
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Load and Process Sea Ice Data
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Open sea ice concentration file</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`import xarray as xr
import numpy as np
import matplotlib.pyplot as plt

# Open monthly sea ice concentration
ds = xr.open_dataset('seaice_conc_monthly_sh_202301_v3.0.nc')

# Display dataset information
print(ds)

# Expected structure:
# Dimensions: x (316), y (332), time (1)
# Variables: cdr_seaice_conc (sea ice concentration)
# Coordinates: latitude, longitude (2D arrays)

# Extract concentration variable
sic = ds['cdr_seaice_conc']
print(f"Concentration range: {sic.min().values} to {sic.max().values}")`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Load time series</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Open multiple months
files = sorted(glob.glob('data/seaice/seaice_conc_monthly_sh_2023*.nc'))
ds = xr.open_mfdataset(files, combine='by_coords')

# Now we have a time dimension
print(f"Time coverage: {ds.time[0].values} to {ds.time[-1].values}")
print(f"Number of months: {len(ds.time)}")

# Extract concentration
sic = ds['cdr_seaice_conc']

# Handle fill values and quality flags
sic = sic.where(sic <= 100)  # Remove invalid values
sic = sic / 100  # Convert from % to fraction (0-1)`}
                  </pre>
                </div>
              </div>

              <div className="bg-[#143A6A] rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Understanding the Grid</h3>
                <p className="text-sm text-[#D6E1F0] mb-2">
                  NSIDC uses a polar stereographic projection centered on the South Pole:
                </p>
                <ul className="space-y-1 text-sm text-[#D6E1F0]">
                  <li>• <strong>Projection:</strong> EPSG:3412 (NSIDC Sea Ice Polar Stereographic South)</li>
                  <li>• <strong>Grid:</strong> 316 × 332 cells at 25 km resolution</li>
                  <li>• <strong>Coverage:</strong> Southern Ocean, typically to about 40°S</li>
                  <li>• <strong>Coordinates:</strong> x, y in meters from South Pole</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Step 4: Calculate Extent and Area */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  4
                </span>
                STEP FOUR
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Calculate Sea Ice Extent and Area
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <div className="bg-[#071a34] rounded p-4">
                <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Grid cell area (25 km × 25 km = 625 km²)
cell_area = 25 * 25  # km²

# Calculate sea ice extent (15% threshold)
# Extent = number of cells with ≥15% concentration × cell area
extent_threshold = 0.15
ice_mask = sic >= extent_threshold

# Sum ice-covered cells for each time step
extent = ice_mask.sum(dim=['x', 'y']) * cell_area

# Convert to million km²
extent_million_km2 = extent / 1e6

print(f"Sea ice extent (million km²):")
print(extent_million_km2.values)

# Calculate sea ice area (accounting for concentration)
# Area = sum of (concentration × cell area) for all cells
area = (sic * cell_area).sum(dim=['x', 'y'])
area_million_km2 = area / 1e6

print(f"\\nSea ice area (million km²):")
print(area_million_km2.values)

# Difference between extent and area shows ice compactness
compactness = area_million_km2 / extent_million_km2
print(f"\\nIce compactness: {compactness.mean().values:.2f}")`}
                  </pre>
              </div>

              <div className="bg-[#1B457A]/50 p-4 rounded-lg border-l-4 border-[#3dd6d0]">
                <div className="flex items-start gap-2">
                  <FaExclamationTriangle className="text-[#3dd6d0] mt-1 flex-shrink-0" />
                  <div className="text-sm text-[#D6E1F0]">
                    <strong>Note:</strong> The 15% threshold is the standard used by NSIDC and scientific
                    literature for sea ice extent calculations. This allows consistent comparison across studies.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 5: Visualize Sea Ice */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  5
                </span>
                STEP FIVE
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Create Antarctic Sea Ice Maps
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Map with South Polar projection</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`import cartopy.crs as ccrs
import cartopy.feature as cfeature
import matplotlib.pyplot as plt

# Create figure with Antarctic projection
fig = plt.figure(figsize=(12, 12))
ax = plt.axes(projection=ccrs.SouthPolarStereo())

# Set map extent to show Antarctic region
ax.set_extent([-180, 180, -90, -40], ccrs.PlateCarree())

# Plot sea ice concentration
# Note: Need to use data projection (EPSG:3412)
data_crs = ccrs.epsg(3412)

im = ax.pcolormesh(
    ds.x, ds.y,
    sic.isel(time=0) * 100,  # Convert back to %
    transform=data_crs,
    cmap='Blues_r',
    vmin=0,
    vmax=100
)

# Add colorbar
cbar = plt.colorbar(im, ax=ax, orientation='horizontal',
                     pad=0.05, shrink=0.7)
cbar.set_label('Sea Ice Concentration (%)', fontsize=12)

# Add geographic features
ax.add_feature(cfeature.LAND, facecolor='lightgray', edgecolor='black')
ax.add_feature(cfeature.COASTLINE, linewidth=0.5)
ax.gridlines(draw_labels=False, linewidth=0.5, color='gray', alpha=0.5)

# Add 15% extent contour (standard definition line)
ax.contour(ds.x, ds.y, sic.isel(time=0),
           levels=[0.15], colors='red', linewidths=2,
           transform=data_crs)

plt.title('Antarctic Sea Ice Concentration - January 2023',
          fontsize=14, pad=20)
plt.savefig('antarctic_sea_ice.png', dpi=300, bbox_inches='tight')
plt.show()`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Comparing months (seasonal cycle)</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Plot seasonal cycle: March (max) and September (min)
fig, axes = plt.subplots(1, 2, figsize=(16, 8),
                         subplot_kw={'projection': ccrs.SouthPolarStereo()})

months = [2, 8]  # March (index 2) and September (index 8)
titles = ['March 2023 (Maximum)', 'September 2023 (Minimum)']

for ax, month, title in zip(axes, months, titles):
    ax.set_extent([-180, 180, -90, -40], ccrs.PlateCarree())

    im = ax.pcolormesh(ds.x, ds.y, sic.isel(time=month) * 100,
                       transform=data_crs, cmap='Blues_r',
                       vmin=0, vmax=100)

    ax.add_feature(cfeature.LAND, facecolor='lightgray')
    ax.add_feature(cfeature.COASTLINE, linewidth=0.5)
    ax.gridlines(linewidth=0.5, alpha=0.5)
    ax.set_title(title, fontsize=12)

plt.tight_layout()
plt.savefig('seasonal_comparison.png', dpi=300)
plt.show()`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Step 6: Time Series Analysis */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  6
                </span>
                STEP SIX
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Analyze Extent Time Series and Trends
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <div className="bg-[#071a34] rounded p-4">
                <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Load multi-year dataset (example: 2010-2023)
files = sorted(glob.glob('data/seaice/seaice_conc_monthly_sh_*.nc'))
ds = xr.open_mfdataset(files, combine='by_coords')
sic = ds['cdr_seaice_conc'].where(ds['cdr_seaice_conc'] <= 100) / 100

# Calculate extent time series
cell_area = 25 * 25
extent = ((sic >= 0.15).sum(dim=['x', 'y']) * cell_area) / 1e6

# Plot time series
fig, ax = plt.subplots(figsize=(14, 6))
extent.plot(ax=ax, linewidth=1.5, color='steelblue')

# Add monthly mean climatology
monthly_clim = extent.groupby('time.month').mean()
months_extended = np.tile(monthly_clim.month.values,
                          len(extent) // 12 + 1)[:len(extent)]
clim_extended = np.tile(monthly_clim.values,
                        len(extent) // 12 + 1)[:len(extent)]

ax.plot(extent.time, clim_extended, 'r--', linewidth=2,
        label='Monthly climatology', alpha=0.7)

ax.set_ylabel('Sea Ice Extent (million km²)', fontsize=12)
ax.set_xlabel('Year', fontsize=12)
ax.set_title('Antarctic Sea Ice Extent Time Series', fontsize=14)
ax.grid(True, alpha=0.3)
ax.legend()

plt.tight_layout()
plt.savefig('extent_timeseries.png', dpi=300)
plt.show()

# Calculate anomalies
anomalies = extent.groupby('time.month') - monthly_clim
print(f"Mean anomaly: {anomalies.mean().values:.2f} million km²")
print(f"Largest positive anomaly: {anomalies.max().values:.2f} million km²")
print(f"Largest negative anomaly: {anomalies.min().values:.2f} million km²")`}
                  </pre>
                </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Calculate linear trend</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Fit linear trend
trend_fit = extent.polyfit(dim='time', deg=1)
trend_slope = trend_fit.polyfit_coefficients.sel(degree=1)

# Convert to trend per decade
years_elapsed = (extent.time[-1] - extent.time[0]) / np.timedelta64(365, 'D')
trend_per_decade = trend_slope * 10 * 365.25

print(f"Linear trend: {trend_per_decade.values:.3f} million km²/decade")

# Plot with trend line
fitted = xr.polyval(extent.time, trend_fit.polyfit_coefficients)

fig, ax = plt.subplots(figsize=(14, 6))
extent.plot(ax=ax, linewidth=1.5, label='Extent', alpha=0.7)
fitted.plot(ax=ax, color='red', linewidth=2, linestyle='--',
            label=f'Trend: {trend_per_decade.values:.3f} M km²/decade')

ax.set_ylabel('Sea Ice Extent (million km²)')
ax.set_title('Antarctic Sea Ice Extent with Linear Trend')
ax.grid(True, alpha=0.3)
ax.legend()
plt.tight_layout()
plt.savefig('extent_with_trend.png', dpi=300)
plt.show()`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Step 7: Regional Analysis */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  7
                </span>
                STEP SEVEN
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Compare Antarctic Sectors
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <p className="text-[#D6E1F0]">
                Antarctic sea ice shows strong regional variability. The five main sectors exhibit
                different behaviors due to local ocean and atmospheric conditions.
              </p>

              <div className="bg-[#143A6A] rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Antarctic Sectors</h3>
                <ul className="space-y-2 text-sm text-[#D6E1F0]">
                  <li><strong>Weddell Sea:</strong> 60°W to 20°E</li>
                  <li><strong>Indian Ocean:</strong> 20°E to 90°E</li>
                  <li><strong>West Pacific:</strong> 90°E to 160°E</li>
                  <li><strong>Ross Sea:</strong> 160°E to 130°W</li>
                  <li><strong>Amundsen-Bellingshausen:</strong> 130°W to 60°W</li>
                </ul>
              </div>

              <div className="bg-[#071a34] rounded p-4">
                <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Define sectors by longitude ranges
sectors = {
    'Weddell': (-60, 20),
    'Indian': (20, 90),
    'West Pacific': (90, 160),
    'Ross': (160, -130),
    'Amundsen-Bell.': (-130, -60)
}

# Calculate extent for each sector
sector_extent = {}
for name, (lon_min, lon_max) in sectors.items():
    # Create longitude mask
    lon = ds.longitude
    if lon_min < 0 and lon_max > 0:  # Crosses Greenwich
        mask = (lon >= lon_min) | (lon <= lon_max)
    else:
        mask = (lon >= lon_min) & (lon <= lon_max)

    # Calculate extent for this sector
    sic_sector = sic.where(mask)
    extent_sector = ((sic_sector >= 0.15).sum(dim=['x','y']) * cell_area) / 1e6
    sector_extent[name] = extent_sector

# Plot sectoral comparison
fig, ax = plt.subplots(figsize=(14, 8))

for name, extent in sector_extent.items():
    extent.plot(ax=ax, label=name, linewidth=2)

ax.set_ylabel('Sea Ice Extent (million km²)')
ax.set_xlabel('Year')
ax.set_title('Antarctic Sea Ice Extent by Sector')
ax.legend(loc='best')
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('sectoral_extent.png', dpi=300)
plt.show()`}
                  </pre>
              </div>
            </div>
          </section>

          {/* Embedded Notebook */}
          <section className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">
                Complete Working Example
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Interactive Notebook with Code & Outputs
              </h2>
              <p className="mt-2 text-sm text-[#D6E1F0]">
                View the complete EUMETSAT OSI SAF tutorial with all code, outputs, and visualizations:
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] overflow-hidden">
              <iframe
                src="https://nbviewer.org/urls/gitlab.eumetsat.int/eumetlab/oceans/ocean-training/sensors/learn-osi-saf-sea-ice/-/raw/main/1_OSI_SAF_sea_ice_introductory/1_3f_OSI_SAF_sea_ice_plotting_Ice_Index.ipynb"
                className="w-full"
                style={{ height: '800px', border: 'none' }}
                title="OSI SAF Sea Ice Notebook"
              />
              <div className="p-4 bg-[#143A6A] border-t border-white/10">
                <p className="text-sm text-[#D6E1F0] mb-3">
                  Can't see the notebook? Open it in a new tab or download it:
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://nbviewer.org/urls/gitlab.eumetsat.int/eumetlab/oceans/ocean-training/sensors/learn-osi-saf-sea-ice/-/raw/main/1_OSI_SAF_sea_ice_introductory/1_3f_OSI_SAF_sea_ice_plotting_Ice_Index.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#071a34] transition-colors hover:bg-[#e8ba30]"
                  >
                    📓 Open in NBViewer
                  </a>
                  <a
                    href="/notebooks/osi_saf_ice_index.ipynb"
                    download
                    className="inline-flex items-center gap-2 rounded-lg border border-[#F4C542] bg-transparent px-4 py-2 text-sm font-semibold text-[#F4C542] transition-colors hover:bg-[#F4C542]/10"
                  >
                    ⬇️ Download Notebook
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Complete Workflow */}
          <section className="rounded-2xl border border-[#F4C542]/30 bg-[#143A6A] p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaCheckCircle className="text-[#F4C542] text-xl" />
              <h2 className="text-xl font-semibold text-white">Complete Antarctic Sea Ice Workflow</h2>
            </div>
            <div className="bg-[#071a34] rounded p-4">
              <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`"""
Antarctic Sea Ice Analysis Pipeline
Focus: Southern Ocean (Antarctic) sea ice only
"""
import xarray as xr
import numpy as np
import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import glob

# 1. Load data
files = sorted(glob.glob('data/seaice/seaice_conc_monthly_sh_2023*.nc'))
ds = xr.open_mfdataset(files)
sic = ds['cdr_seaice_conc'].where(ds['cdr_seaice_conc'] <= 100) / 100

# 2. Calculate extent and area
cell_area = 25 * 25  # km²
extent = ((sic >= 0.15).sum(dim=['x', 'y']) * cell_area) / 1e6
area = (sic * cell_area).sum(dim=['x', 'y']) / 1e6

# 3. Create Antarctic map
fig = plt.figure(figsize=(12, 12))
ax = plt.axes(projection=ccrs.SouthPolarStereo())
ax.set_extent([-180, 180, -90, -40], ccrs.PlateCarree())

im = ax.pcolormesh(ds.x, ds.y, sic.isel(time=2) * 100,
                   transform=ccrs.epsg(3412),
                   cmap='Blues_r', vmin=0, vmax=100)

plt.colorbar(im, label='Sea Ice Concentration (%)')
ax.coastlines()
plt.title('Antarctic Sea Ice - March 2023 (Maximum)')
plt.savefig('antarctic_ice_march.png', dpi=300)

# 4. Plot time series
extent.plot(figsize=(14, 6), linewidth=2)
plt.ylabel('Sea Ice Extent (million km²)')
plt.title('Antarctic Sea Ice Extent 2023')
plt.grid(True, alpha=0.3)
plt.savefig('extent_2023.png', dpi=300)

print(f"Annual mean extent: {extent.mean().values:.2f} million km²")
print(f"Maximum (March): {extent.max().values:.2f} million km²")
print(f"Minimum (September): {extent.min().values:.2f} million km²")
print("Analysis complete!")`}
              </pre>
            </div>
          </section>

          {/* Key Points */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Key Points About Antarctic Sea Ice</h2>
            <ul className="space-y-3 text-[#D6E1F0]">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Seasonal Cycle:</strong> Antarctic sea ice reaches maximum extent in September-October
                  (~18-19 million km²) and minimum in February-March (~2-3 million km²)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Regional Variability:</strong> Weddell and Ross Seas contain most ice volume;
                  Amundsen-Bellingshausen shows strongest variability
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Trend Complexity:</strong> Unlike Arctic decline, Antarctic shows complex trends with
                  regional increases and decreases, recent dramatic declines since 2016
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>15% Threshold:</strong> Standard definition for extent; cells with ≥15% concentration
                  considered ice-covered
                </span>
              </li>
            </ul>
          </section>

          {/* Next Steps */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6">
            <h2 className="text-xl font-semibold text-white mb-3">Next Steps</h2>
            <p className="text-[#D6E1F0] mb-4">
              Explore more advanced sea ice analysis techniques!
            </p>
            <div className="space-y-2 text-sm text-[#D6E1F0] mb-4">
              <p><strong>Advanced topics:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Sea ice thickness from altimetry (CryoSat-2, ICESat-2)</li>
                <li>• Sea ice drift/motion tracking</li>
                <li>• Relationship with atmospheric/ocean forcing (SAM, ENSO)</li>
                <li>• Polynya detection and analysis</li>
                <li>• Ice-ocean-atmosphere interactions</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/search?q=sea+ice"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#0F2D57] transition-colors hover:bg-[#e8ba30]"
              >
                Find Sea Ice Datasets →
              </Link>
              <Link
                to="/tutorials"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Back to Tutorials
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SeaIceAnalysis;
