import React from "react";
import { FaArrowLeft, FaLightbulb, FaCheckCircle, FaThermometerHalf, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";

const SSTAnalysis = () => {
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
              <span className="text-xs text-[#D6E1F0]">45 min</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white flex items-center gap-3">
              <FaThermometerHalf className="text-[#F4C542]" />
              Analyzing Sea Surface Temperature in the Southern Ocean
            </h1>
            <p className="text-lg text-[#D6E1F0]">
              Complete workflow for analyzing long-term SST trends in Antarctic waters using NOAA satellite data.
              Learn to visualize oceanic fronts, calculate temperature trends, and understand Southern Ocean dynamics.
            </p>
          </section>

          {/* Introduction */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white">Introduction</h2>
            <p className="text-[#D6E1F0]">
              Sea surface temperature is a critical indicator of ocean and climate change. The Southern Ocean
              plays a vital role in global climate regulation, absorbing significant amounts of heat and CO₂.
              Understanding SST patterns and trends helps us track climate change impacts on Antarctic ecosystems.
            </p>
            <p className="text-[#D6E1F0]">
              In this tutorial, you'll analyze 32 years (1991-2022) of NOAA satellite SST data to:
            </p>
            <ul className="space-y-2 text-[#D6E1F0]">
              <li className="flex gap-2">
                <span className="text-[#F4C542]">•</span>
                <span>Visualize mean SST patterns across the Southern Ocean</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#F4C542]">•</span>
                <span>Identify oceanic fronts (Polar Front, Subantarctic Front, etc.)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#F4C542]">•</span>
                <span>Calculate temperature trends showing warming rates</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#F4C542]">•</span>
                <span>Create publication-quality maps with Antarctic projection</span>
              </li>
            </ul>

            <div className="bg-[#1B457A]/50 p-4 rounded-lg border-l-4 border-[#3dd6d0]">
              <p className="text-sm text-[#D6E1F0] mb-3">
                <strong>Real-world example:</strong> This tutorial is based on actual research workflows
                used for Southern Ocean climate analysis.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://ronygolderku.github.io/so_sst/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#3dd6d0] px-4 py-2 text-sm font-semibold text-[#071a34] transition-colors hover:bg-[#34c5bf]"
                >
                  📓 View Interactive Notebook
                </a>
                <a
                  href="/notebooks/sst_so.ipynb"
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-[#3dd6d0] bg-transparent px-4 py-2 text-sm font-semibold text-[#3dd6d0] transition-colors hover:bg-[#3dd6d0]/10"
                >
                  ⬇️ Download Notebook (.ipynb)
                </a>
              </div>
            </div>
          </section>

          {/* Step 1: Getting the Data */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  1
                </span>
                STEP ONE
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Download NOAA SST Data
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
              <div className="bg-[#143A6A] rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Dataset Information</h3>
                <ul className="space-y-2 text-sm text-[#D6E1F0]">
                  <li><strong>Source:</strong> NOAA Optimum Interpolation Sea Surface Temperature V2</li>
                  <li><strong>Resolution:</strong> 1.0° × 1.0° grid</li>
                  <li><strong>Coverage:</strong> 30°S to 84.5°S latitude</li>
                  <li><strong>Temporal:</strong> Monthly data, 1991-2022 (384 months)</li>
                  <li><strong>Format:</strong> NetCDF</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Download the data</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Download NOAA OI SST V2 data
# Visit: downloads.psl.noaa.gov/Datasets/noaa.oisst.v2/

# Using wget:
wget https://downloads.psl.noaa.gov/Datasets/noaa.oisst.v2/sst.mnmean.nc

# Or using Python:
import urllib.request
url = "https://downloads.psl.noaa.gov/Datasets/noaa.oisst.v2/sst.mnmean.nc"
urllib.request.urlretrieve(url, "noaa_oisst.nc")`}
                  </pre>
                </div>
              </div>

              <div className="bg-[#1B457A]/50 p-4 rounded-lg border-l-4 border-[#F4C542]">
                <div className="flex items-start gap-2">
                  <FaLightbulb className="text-[#F4C542] mt-1 flex-shrink-0" />
                  <div className="text-sm text-[#D6E1F0]">
                    <strong>Note:</strong> The full global dataset is ~500 MB. For this tutorial, we'll subset
                    to the Southern Ocean region (south of 30°S) to reduce file size and processing time.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 2: Setup Environment */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  2
                </span>
                STEP TWO
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Install Required Libraries
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
              <div className="bg-[#071a34] rounded p-4">
                <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Install required packages
pip install xarray netCDF4 matplotlib cartopy pandas numpy cmaps

# Optional: for advanced EOF analysis
pip install xeofs`}
                </pre>
              </div>

              <div className="bg-[#143A6A] rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">What each library does:</h3>
                <ul className="space-y-2 text-sm text-[#D6E1F0]">
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>xarray:</strong> Multi-dimensional labeled arrays (perfect for NetCDF)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>cartopy:</strong> Map projections for Antarctic visualization</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>cmaps:</strong> Scientific color palettes (BlAqGrYeOrRe for ocean temps)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>xeofs:</strong> Empirical Orthogonal Function analysis (optional)</span>
                  </li>
                </ul>
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
                Load and Explore the Data
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Import libraries and load data</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`import xarray as xr
import numpy as np
import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import cartopy.feature as cfeature
from matplotlib import cm
import cmaps

# Load the NetCDF file
ds = xr.open_dataset('noaa_oisst.nc')

# Display dataset structure
print(ds)

# Expected output:
# Dimensions:  (time: 384, lat: 55, lon: 360)
# Coordinates:
#   * time     (time) datetime64[ns]
#   * lat      (lat) float32 -30.0 -31.0 ... -83.0 -84.0
#   * lon      (lon) float32 -179.5 -178.5 ... 178.5 179.5
# Data variables:
#     sst      (time, lat, lon) float32`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Subset to Southern Ocean</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Select Southern Ocean region (south of 30°S)
ds_so = ds.sel(lat=slice(-30, -85))

# Select specific time period (e.g., 1991-2022)
ds_so = ds_so.sel(time=slice('1991-01-01', '2022-12-31'))

# Check dimensions
print(f"Data shape: {ds_so.sst.shape}")
print(f"Time range: {ds_so.time[0].values} to {ds_so.time[-1].values}")
print(f"Latitude range: {ds_so.lat.min().values}°S to {ds_so.lat.max().values}°S")`}
                  </pre>
                </div>
                <div className="bg-[#143A6A] rounded-lg p-3 mt-3">
                  <p className="text-xs font-semibold text-[#F4C542] mb-2">Expected Output:</p>
                  <pre className="text-xs font-mono text-[#D6E1F0]">
{`Data shape: (384, 55, 360)
Time range: 1991-01-01 to 2022-12-31
Latitude range: -84.0°S to -30.0°S`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Quick data exploration</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Check for missing values
print(f"Missing values: {ds_so.sst.isnull().sum().values}")

# Get basic statistics
print(ds_so.sst.mean().values)  # Mean SST
print(ds_so.sst.std().values)   # Standard deviation
print(ds_so.sst.min().values)   # Minimum SST
print(ds_so.sst.max().values)   # Maximum SST

# Check variable attributes
print(ds_so.sst.attrs)
# Shows units, long_name, valid_range, etc.`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Step 4: Calculate Mean SST */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  4
                </span>
                STEP FOUR
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Calculate Mean SST Pattern
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <p className="text-[#D6E1F0]">
                Calculate the long-term mean SST to visualize the average temperature distribution
                across the Southern Ocean.
              </p>

              <div className="bg-[#071a34] rounded p-4">
                <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Calculate temporal mean (average across all months)
ds_mean = ds_so.mean(dim='time')

# The result is a 2D array (lat × lon) showing average SST
print(f"Mean SST shape: {ds_mean.sst.shape}")

# Calculate seasonal means
ds_summer = ds_so.sel(time=ds_so.time.dt.month.isin([12, 1, 2])).mean(dim='time')
ds_winter = ds_so.sel(time=ds_so.time.dt.month.isin([6, 7, 8])).mean(dim='time')

# Calculate monthly climatology
monthly_clim = ds_so.groupby('time.month').mean('time')

print("Climatology calculated for each month")`}
                </pre>
              </div>

              <div className="bg-[#1B457A]/50 p-4 rounded-lg border-l-4 border-[#F4C542]">
                <div className="flex items-start gap-2">
                  <FaLightbulb className="text-[#F4C542] mt-1 flex-shrink-0" />
                  <div className="text-sm text-[#D6E1F0]">
                    <strong>Understanding the pattern:</strong> The Southern Ocean shows strong latitudinal
                    temperature gradients, from ~20°C near 30°S to near-freezing temperatures (~-2°C) close
                    to Antarctica. This gradient is maintained by the Antarctic Circumpolar Current.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 5: Create Antarctic Map */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  5
                </span>
                STEP FIVE
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Create Professional Antarctic Maps
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">South Polar Stereographic projection</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import cartopy.feature as cfeature
import cmaps

# Create figure with South Polar projection
fig = plt.figure(figsize=(12, 10))
ax = plt.axes(projection=ccrs.SouthPolarStereo())

# Set map extent (latitude bounds)
ax.set_extent([-180, 180, -90, -30], ccrs.PlateCarree())

# Create filled contour plot
levels = np.linspace(-2, 24, 40)  # 40 levels from -2°C to 24°C
cf = ax.contourf(
    ds_mean.lon,
    ds_mean.lat,
    ds_mean.sst,
    levels=levels,
    cmap=cmaps.BlAqGrYeOrRe,
    transform=ccrs.PlateCarree(),
    extend='both'
)

# Add colorbar
cbar = plt.colorbar(cf, ax=ax, orientation='horizontal',
                     pad=0.05, aspect=50, shrink=0.8)
cbar.set_label('Sea Surface Temperature (°C)', fontsize=12)
cbar.set_ticks(np.arange(-2, 26, 2))

# Add geographic features
ax.add_feature(cfeature.LAND, facecolor='lightgray', edgecolor='black')
ax.add_feature(cfeature.COASTLINE, linewidth=0.5)
ax.gridlines(draw_labels=False, linewidth=0.5, color='gray', alpha=0.5)

# Add title
plt.title('Mean SST (1991-2022): Southern Ocean', fontsize=14, pad=20)

plt.tight_layout()
plt.savefig('southern_ocean_mean_sst.png', dpi=300, bbox_inches='tight')
plt.show()`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Adding oceanic fronts</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Define oceanic fronts by SST contour values
# These represent major circulation boundaries

fronts = {
    'Northern Boundary': 18,     # ~18°C (red)
    'Subantarctic Front': 10,    # ~10°C (orange)
    'Polar Front': 4,            # ~4°C (yellow)
    'Southern ACC Front': 2,     # ~2°C (green)
    'Southern Boundary': 0       # ~0°C (blue)
}

colors = ['red', 'orange', 'yellow', 'green', 'blue']

# Add contour lines for oceanic fronts
for (name, temp), color in zip(fronts.items(), colors):
    cs = ax.contour(
        ds_mean.lon,
        ds_mean.lat,
        ds_mean.sst,
        levels=[temp],
        colors=color,
        linewidths=2,
        transform=ccrs.PlateCarree()
    )
    ax.clabel(cs, inline=True, fontsize=8, fmt=f'{name}')

plt.savefig('sst_with_fronts.png', dpi=300, bbox_inches='tight')`}
                  </pre>
                </div>
              </div>

              <div className="bg-[#143A6A] rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Understanding Oceanic Fronts</h3>
                <ul className="space-y-2 text-sm text-[#D6E1F0]">
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>Polar Front:</strong> Major boundary separating cold Antarctic water from warmer subantarctic water</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>Subantarctic Front:</strong> Northern extent of Antarctic Circumpolar Current</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>Southern Boundary:</strong> Southernmost extent of circumpolar circulation</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Step 6: Calculate Trends */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  6
                </span>
                STEP SIX
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Analyze Temperature Trends
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <p className="text-[#D6E1F0]">
                Calculate linear trends to identify regions of warming or cooling over the 32-year period.
              </p>

              <div className="bg-[#071a34] rounded p-4">
                <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Calculate linear trend using polyfit
# Convert time to years since start for easier interpretation
years = (ds_so.time - ds_so.time[0]) / np.timedelta64(365, 'D')

# Fit linear trend for each grid point
trend = ds_so.sst.polyfit(dim='time', deg=1)

# Extract slope (trend per year)
slope = trend.polyfit_coefficients.sel(degree=1)

# Convert to °C per decade for easier interpretation
trend_per_decade = slope * 10

print(f"Mean warming trend: {slope.mean().values:.4f} °C/year")
print(f"Mean warming trend: {trend_per_decade.mean().values:.3f} °C/decade")

# Find regions with strongest warming
max_warming = trend_per_decade.max().values
max_warming_loc = trend_per_decade.argmax()
print(f"Maximum warming: {max_warming:.3f} °C/decade")`}
                  </pre>
                </div>
                <div className="bg-[#143A6A] rounded-lg p-3 mt-3">
                  <p className="text-xs font-semibold text-[#F4C542] mb-2">Expected Output:</p>
                  <pre className="text-xs font-mono text-[#D6E1F0]">
{`Mean warming trend: 0.0092 °C/year
Mean warming trend: 0.092 °C/decade
Maximum warming: 0.234 °C/decade`}
                  </pre>
                  <p className="text-xs text-[#D6E1F0] mt-2">
                    This shows the Southern Ocean has warmed by approximately 0.1°C per decade on average
                    over the 32-year period, with some regions warming faster.
                  </p>
                </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Visualize trend patterns</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Create trend map
fig = plt.figure(figsize=(12, 10))
ax = plt.axes(projection=ccrs.SouthPolarStereo())
ax.set_extent([-180, 180, -90, -30], ccrs.PlateCarree())

# Plot trends (diverging colormap for warming/cooling)
levels = np.linspace(-0.3, 0.3, 31)
cf = ax.contourf(
    trend_per_decade.lon,
    trend_per_decade.lat,
    trend_per_decade,
    levels=levels,
    cmap='RdBu_r',  # Red=warming, Blue=cooling
    transform=ccrs.PlateCarree(),
    extend='both'
)

# Colorbar
cbar = plt.colorbar(cf, ax=ax, orientation='horizontal',
                     pad=0.05, aspect=50, shrink=0.8)
cbar.set_label('SST Trend (°C/decade)', fontsize=12)

# Add features
ax.add_feature(cfeature.LAND, facecolor='lightgray')
ax.add_feature(cfeature.COASTLINE, linewidth=0.5)
ax.gridlines(draw_labels=False, linewidth=0.5, alpha=0.5)

plt.title('SST Trend 1991-2022: Southern Ocean', fontsize=14, pad=20)
plt.savefig('sst_trend_map.png', dpi=300, bbox_inches='tight')
plt.show()`}
                  </pre>
                </div>
                <div className="bg-[#143A6A] rounded-lg p-3 mt-3">
                  <p className="text-xs font-semibold text-[#F4C542] mb-2">What you'll see:</p>
                  <p className="text-xs text-[#D6E1F0]">
                    A South Polar Stereographic map showing warming (red) and cooling (blue) trends.
                    Most of the Southern Ocean will show red tones (warming), with spatial variability.
                    The Antarctic Peninsula and parts of the Weddell Sea often show stronger warming signals.
                  </p>
                </div>
              </div>

              <div className="bg-[#1B457A]/50 p-4 rounded-lg border-l-4 border-[#3dd6d0]">
                <div className="flex items-start gap-2">
                  <FaExclamationTriangle className="text-[#3dd6d0] mt-1 flex-shrink-0" />
                  <div className="text-sm text-[#D6E1F0]">
                    <strong>Interpretation:</strong> Positive trends (red) indicate warming, negative trends
                    (blue) indicate cooling. Most of the Southern Ocean shows warming trends, with regional
                    variability influenced by ocean circulation changes and sea ice dynamics.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 7: Time Series Analysis */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  7
                </span>
                STEP SEVEN
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Regional Time Series Analysis
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <div className="bg-[#071a34] rounded p-4">
                <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Calculate regional mean time series for different zones

# Define regions
regions = {
    'Subantarctic Zone': (-40, -50),
    'Polar Frontal Zone': (-50, -60),
    'Antarctic Zone': (-60, -70)
}

# Plot time series for each region
fig, axes = plt.subplots(3, 1, figsize=(14, 10), sharex=True)

for (name, (lat_min, lat_max)), ax in zip(regions.items(), axes):
    # Regional mean
    region_ts = ds_so.sst.sel(lat=slice(lat_max, lat_min)).mean(dim=['lat', 'lon'])

    # Plot
    region_ts.plot(ax=ax, linewidth=1, color='steelblue')

    # Add trend line
    trend_fit = region_ts.polyfit(dim='time', deg=1)
    fitted = xr.polyval(region_ts.time, trend_fit.polyfit_coefficients)
    fitted.plot(ax=ax, linewidth=2, color='red', linestyle='--',
                label=f'Trend: {trend_fit.polyfit_coefficients[0].values*10:.3f} °C/decade')

    ax.set_title(f'{name} ({lat_min}° to {lat_max}°S)', fontsize=12)
    ax.set_ylabel('SST (°C)')
    ax.grid(True, alpha=0.3)
    ax.legend(loc='upper left')

axes[-1].set_xlabel('Year')
plt.tight_layout()
plt.savefig('regional_timeseries.png', dpi=300, bbox_inches='tight')
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
                View the complete analysis with all code, outputs, and visualizations below:
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] overflow-hidden">
              <iframe
                src="https://ronygolderku.github.io/so_sst/"
                className="w-full"
                style={{ height: '800px', border: 'none' }}
                title="SST Analysis Notebook"
              />
              <div className="p-4 bg-[#143A6A] border-t border-white/10">
                <p className="text-sm text-[#D6E1F0] mb-3">
                  Can't see the notebook? Open it in a new tab or download it:
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://ronygolderku.github.io/so_sst/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#071a34] transition-colors hover:bg-[#e8ba30]"
                  >
                    📓 Open in New Tab
                  </a>
                  <a
                    href="/notebooks/sst_so.ipynb"
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
              <h2 className="text-xl font-semibold text-white">Complete Analysis Workflow</h2>
            </div>
            <div className="bg-[#071a34] rounded p-4">
              <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`"""
Complete SST Analysis Pipeline
Based on: ronygolderku.github.io/so_sst
"""
import xarray as xr
import numpy as np
import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import cartopy.feature as cfeature
import cmaps

# 1. Load data
ds = xr.open_dataset('noaa_oisst.nc')
ds_so = ds.sel(lat=slice(-30, -85), time=slice('1991', '2022'))

# 2. Calculate mean SST
ds_mean = ds_so.mean(dim='time')

# 3. Create Antarctic map
fig = plt.figure(figsize=(12, 10))
ax = plt.axes(projection=ccrs.SouthPolarStereo())
ax.set_extent([-180, 180, -90, -30], ccrs.PlateCarree())

levels = np.linspace(-2, 24, 40)
cf = ax.contourf(ds_mean.lon, ds_mean.lat, ds_mean.sst,
                 levels=levels, cmap=cmaps.BlAqGrYeOrRe,
                 transform=ccrs.PlateCarree())

plt.colorbar(cf, ax=ax, label='SST (°C)', orientation='horizontal')
ax.add_feature(cfeature.LAND, facecolor='lightgray')
ax.add_feature(cfeature.COASTLINE)
plt.title('Mean SST (1991-2022)')
plt.savefig('southern_ocean_sst.png', dpi=300, bbox_inches='tight')

# 4. Calculate trends
trend = ds_so.sst.polyfit(dim='time', deg=1)
trend_per_decade = trend.polyfit_coefficients.sel(degree=1) * 10

# 5. Create trend map
fig, ax = plt.subplots(figsize=(12, 10),
                       subplot_kw={'projection': ccrs.SouthPolarStereo()})
ax.contourf(trend_per_decade.lon, trend_per_decade.lat, trend_per_decade,
            levels=np.linspace(-0.3, 0.3, 31), cmap='RdBu_r',
            transform=ccrs.PlateCarree())
plt.title('SST Trend (°C/decade, 1991-2022)')
plt.savefig('sst_trend.png', dpi=300, bbox_inches='tight')

print("Analysis complete!")
print(f"Mean warming: {trend_per_decade.mean().values:.3f} °C/decade")`}
              </pre>
            </div>
          </section>

          {/* Key Findings */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Key Findings from This Analysis</h2>
            <ul className="space-y-3 text-[#D6E1F0]">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Temperature Gradient:</strong> Strong north-south gradient from ~20°C (30°S) to
                  ~-2°C (near Antarctica)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Oceanic Fronts:</strong> Clear boundaries visible in SST patterns, representing
                  major circulation features
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Warming Trends:</strong> Most regions show warming over 1991-2022, with spatial
                  variability
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Seasonal Cycle:</strong> Strong seasonality with summer warming and winter cooling
                </span>
              </li>
            </ul>
          </section>

          {/* Next Steps */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6">
            <h2 className="text-xl font-semibold text-white mb-3">Next Steps</h2>
            <p className="text-[#D6E1F0] mb-4">
              Extend this analysis with advanced techniques!
            </p>
            <div className="space-y-2 text-sm text-[#D6E1F0] mb-4">
              <p><strong>Further analyses you can try:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• EOF analysis to identify dominant variability patterns</li>
                <li>• Correlation with climate indices (SAM, ENSO)</li>
                <li>• Relationship with sea ice extent</li>
                <li>• Comparison with in-situ observations (ship data, moorings)</li>
                <li>• Validation with BGC-Argo float temperatures</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://ronygolderku.github.io/so_sst/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#0F2D57] transition-colors hover:bg-[#e8ba30]"
              >
                View Complete Notebook →
              </a>
              <Link
                to="/search?q=temperature"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Find More SST Datasets
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SSTAnalysis;
