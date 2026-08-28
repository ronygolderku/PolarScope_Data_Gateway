import React from "react";
import { FaArrowLeft, FaLightbulb, FaCheckCircle, FaPython } from "react-icons/fa";
import { Link } from "react-router";

const WorkingWithNetCDF = () => {
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
              <span className="text-xs text-[#D6E1F0]">30 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white flex items-center gap-3">
              <FaPython className="text-[#F4C542]" />
              Working with NetCDF Files in Python
            </h1>
            <p className="text-lg text-[#D6E1F0]">
              Practical guide to reading, processing, and visualizing NetCDF satellite data using Python's
              xarray library - the gold standard for multi-dimensional scientific data.
            </p>
          </section>

          {/* Introduction */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white">Introduction</h2>
            <p className="text-[#D6E1F0]">
              NetCDF (Network Common Data Form) is the most common format for satellite data. Python's
              xarray library makes it incredibly easy to work with NetCDF files - providing labeled arrays,
              automatic coordinate handling, and powerful selection and aggregation methods.
            </p>
            <p className="text-[#D6E1F0]">
              In this tutorial, you'll learn the essential xarray workflows for Antarctic and Southern
              Ocean data analysis.
            </p>
          </section>

          {/* Step 1: Installation */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  1
                </span>
                STEP ONE
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Install Required Libraries
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
              <p className="text-[#D6E1F0]">
                First, install the Python libraries you'll need. Use conda (recommended) or pip.
              </p>

              <div className="space-y-3">
                <div className="bg-[#071a34] rounded p-4">
                  <p className="text-xs text-[#F4C542] mb-2"># Using conda (recommended)</p>
                  <pre className="text-sm font-mono text-[#D6E1F0]">
{`conda install -c conda-forge xarray netcdf4 dask matplotlib cartopy`}
                  </pre>
                </div>

                <div className="bg-[#071a34] rounded p-4">
                  <p className="text-xs text-[#F4C542] mb-2"># Using pip</p>
                  <pre className="text-sm font-mono text-[#D6E1F0]">
{`pip install xarray netCDF4 dask[array] matplotlib cartopy`}
                  </pre>
                </div>
              </div>

              <div className="bg-[#143A6A] rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">What each library does:</h3>
                <ul className="space-y-2 text-sm text-[#D6E1F0]">
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>xarray:</strong> High-level interface for labeled arrays (the main tool)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>netCDF4:</strong> Backend for reading/writing NetCDF files</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>dask:</strong> Enables working with datasets larger than RAM</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>matplotlib:</strong> Plotting library</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>cartopy:</strong> Map projections and geographic plotting</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Step 2: Opening Files */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  2
                </span>
                STEP TWO
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Opening and Exploring NetCDF Files
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Basic file opening</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`import xarray as xr
import matplotlib.pyplot as plt

# Open a NetCDF file
ds = xr.open_dataset('chlorophyll_data.nc')

# Display dataset information
print(ds)`}
                  </pre>
                </div>
                <div className="mt-3 bg-[#143A6A] rounded-lg p-3">
                  <p className="text-xs font-mono text-[#D6E1F0]">
                    Output shows:<br/>
                    - Dimensions (time, lat, lon)<br/>
                    - Coordinates with their ranges<br/>
                    - Data variables with units and metadata<br/>
                    - Global attributes
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Exploring the structure</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# List all variables
print(ds.data_vars)

# List dimensions
print(ds.dims)

# Get coordinates
print(ds.coords)

# Access a specific variable
chlor_a = ds['chlor_a']
print(chlor_a)

# Check variable attributes (units, long_name, etc.)
print(chlor_a.attrs)`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Open multiple files</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Open multiple files and concatenate along time dimension
ds = xr.open_mfdataset('chlorophyll_*.nc', combine='by_coords')

# Or specify pattern explicitly
import glob
files = sorted(glob.glob('data/2023/*.nc'))
ds = xr.open_mfdataset(files, combine='by_coords')`}
                  </pre>
                </div>
                <div className="mt-3 bg-[#1B457A]/50 p-3 rounded-lg border-l-4 border-[#F4C542]">
                  <div className="flex items-start gap-2">
                    <FaLightbulb className="text-[#F4C542] mt-1 flex-shrink-0" />
                    <p className="text-sm text-[#D6E1F0]">
                      <strong>Tip:</strong> open_mfdataset uses dask for lazy loading - files aren't
                      actually read until you request the data. Perfect for large datasets!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3: Selecting Data */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  3
                </span>
                STEP THREE
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Subsetting Data by Time and Space
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <p className="text-[#D6E1F0]">
                Xarray makes it easy to select data using coordinate labels instead of numeric indices.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Spatial selection</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Select Southern Ocean (south of 40°S)
southern_ocean = ds.sel(lat=slice(-90, -40))

# Select Antarctic region (south of 60°S)
antarctic = ds.sel(lat=slice(-90, -60))

# Select a specific region (Weddell Sea example)
weddell_sea = ds.sel(
    lat=slice(-80, -60),
    lon=slice(-60, -20)
)

# Select nearest point to a location
station = ds.sel(lat=-65.5, lon=-64.3, method='nearest')

print(weddell_sea)`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Temporal selection</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Select a specific year
year_2023 = ds.sel(time='2023')

# Select a date range
summer = ds.sel(time=slice('2023-01-01', '2023-03-31'))

# Select specific months (December, January, February)
djf = ds.sel(time=ds.time.dt.month.isin([12, 1, 2]))

# Select austral summer months for multiple years
austral_summer = ds.where(ds.time.dt.month.isin([12, 1, 2]), drop=True)

# Select every Nth time step
monthly_subset = ds.isel(time=slice(None, None, 30))  # Every 30th day`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Combining selections</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Antarctic summer 2023
subset = ds.sel(
    lat=slice(-90, -60),
    lon=slice(-180, 180),
    time=slice('2022-12-01', '2023-02-28')
)

# Extract just chlorophyll variable for this subset
chlor_summer_antarctic = subset['chlor_a']

print(f"Shape: {chlor_summer_antarctic.shape}")
print(f"Memory: {chlor_summer_antarctic.nbytes / 1e6:.1f} MB")`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Step 4: Processing Data */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  4
                </span>
                STEP FOUR
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Common Data Operations
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Temporal averaging</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Calculate monthly means
monthly_mean = ds.resample(time='1M').mean()

# Calculate seasonal means
seasonal_mean = ds.resample(time='QS-DEC').mean()

# Calculate annual means
annual_mean = ds.resample(time='1Y').mean()

# Overall time mean (climatology)
climatology = ds.mean(dim='time')

# Calculate specific month climatology (e.g., all Januaries)
jan_climatology = ds.sel(time=ds.time.dt.month == 1).mean(dim='time')`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Spatial averaging</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Area-weighted mean for Southern Ocean
# (simple approach - for accurate area weighting, use grid cell areas)
so_mean = ds.sel(lat=slice(-90, -40)).mean(dim=['lat', 'lon'])

# Zonal mean (average over longitude)
zonal_mean = ds.mean(dim='lon')

# Meridional mean (average over latitude)
meridional_mean = ds.mean(dim='lat')

# Regional average for a box
region_mean = ds.sel(
    lat=slice(-70, -60),
    lon=slice(-70, -50)
).mean(dim=['lat', 'lon'])`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Computing anomalies</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Calculate climatology (monthly means across all years)
climatology = ds.groupby('time.month').mean('time')

# Calculate anomalies
anomalies = ds.groupby('time.month') - climatology

# Detrended anomalies
from scipy import signal
trend = ds.polyfit(dim='time', deg=1)
fitted = xr.polyval(ds.time, trend.polyfit_coefficients)
detrended = ds - fitted`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Masking and filtering</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Mask values outside valid range
chlor_filtered = ds['chlor_a'].where(
    (ds['chlor_a'] > 0) & (ds['chlor_a'] < 20)
)

# Mask by quality flag
good_quality = ds.where(ds['quality_flag'] == 0)

# Mask ocean/land using coordinates
ocean_only = ds.where(ds['lat'] < -40)  # Simple example

# Replace masked values with NaN
cleaned = ds['chlor_a'].where(ds['chlor_a'] > 0, drop=False)

# Drop all NaN values
no_gaps = ds.dropna(dim='time', how='all')`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Step 5: Visualization */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  5
                </span>
                STEP FIVE
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Creating Basic Visualizations
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Simple map plot</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`import matplotlib.pyplot as plt

# Quick plot (xarray built-in)
ds['chlor_a'].isel(time=0).plot()
plt.title('Chlorophyll-a Concentration')
plt.show()

# Multiple time steps
ds['chlor_a'].isel(time=slice(0, 4)).plot(col='time', col_wrap=2)
plt.show()`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Map with projection</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`import cartopy.crs as ccrs
import matplotlib.pyplot as plt

# Create figure with Antarctic projection
fig = plt.figure(figsize=(10, 8))
ax = plt.axes(projection=ccrs.SouthPolarStereo())

# Plot data
ds['chlor_a'].isel(time=0).plot(
    ax=ax,
    transform=ccrs.PlateCarree(),
    cmap='viridis',
    vmin=0,
    vmax=2,
    cbar_kwargs={'label': 'Chlorophyll-a (mg/m³)'}
)

# Add features
ax.coastlines()
ax.gridlines()
ax.set_extent([-180, 180, -90, -40], ccrs.PlateCarree())

plt.title('Southern Ocean Chlorophyll-a')
plt.show()`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Time series plot</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Regional mean time series
region_ts = ds['chlor_a'].sel(
    lat=slice(-70, -60),
    lon=slice(-70, -50)
).mean(dim=['lat', 'lon'])

# Plot
region_ts.plot(figsize=(12, 4))
plt.title('Regional Mean Chlorophyll-a Time Series')
plt.ylabel('Chlorophyll-a (mg/m³)')
plt.grid(True, alpha=0.3)
plt.show()`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Hovmoller diagram</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Latitude-time plot (averaged over longitude)
hovmoller = ds['chlor_a'].mean(dim='lon')

hovmoller.plot(
    x='time',
    y='lat',
    figsize=(12, 6),
    cmap='viridis',
    vmin=0,
    vmax=2
)
plt.title('Chlorophyll-a Hovmöller Diagram')
plt.ylabel('Latitude')
plt.show()`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Step 6: Saving Results */}
          <section className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-sm font-semibold text-[#F4C542]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">
                  6
                </span>
                STEP SIX
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Saving Processed Data
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Save as NetCDF</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Save entire dataset
ds.to_netcdf('processed_data.nc')

# Save single variable
ds['chlor_a'].to_netcdf('chlorophyll_only.nc')

# Save with compression
encoding = {
    'chlor_a': {'zlib': True, 'complevel': 4}
}
ds.to_netcdf('compressed_data.nc', encoding=encoding)

# Append to existing file (if using unlimited time dimension)
ds.to_netcdf('existing.nc', mode='a')`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Export to CSV</h3>
                <div className="bg-[#071a34] rounded p-4">
                  <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`# Convert time series to pandas DataFrame and save
region_ts = ds['chlor_a'].mean(dim=['lat', 'lon'])
df = region_ts.to_dataframe()
df.to_csv('time_series.csv')

# For 2D or 3D data, flatten first
flat_data = ds['chlor_a'].isel(time=0).to_dataframe().reset_index()
flat_data.to_csv('map_data.csv', index=False)`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Complete Example */}
          <section className="rounded-2xl border border-[#F4C542]/30 bg-[#143A6A] p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaCheckCircle className="text-[#F4C542] text-xl" />
              <h2 className="text-xl font-semibold text-white">Complete Example Workflow</h2>
            </div>
            <div className="bg-[#071a34] rounded p-4">
              <pre className="text-sm font-mono text-[#D6E1F0] overflow-x-auto">
{`import xarray as xr
import matplotlib.pyplot as plt
import cartopy.crs as ccrs

# 1. Open data
ds = xr.open_dataset('chlorophyll_2023.nc')

# 2. Select region and time
summer = ds.sel(
    lat=slice(-80, -50),
    lon=slice(-180, 180),
    time=slice('2023-01-01', '2023-03-31')
)

# 3. Calculate monthly mean
monthly = summer['chlor_a'].resample(time='1M').mean()

# 4. Filter valid values
monthly_clean = monthly.where(monthly > 0)

# 5. Calculate regional average
regional_mean = monthly_clean.mean(dim=['lat', 'lon'])

# 6. Plot time series
regional_mean.plot(marker='o')
plt.title('Southern Ocean Summer Chlorophyll')
plt.ylabel('Chlorophyll-a (mg/m³)')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('chlorophyll_summer.png', dpi=150)

# 7. Save processed data
monthly_clean.to_netcdf('chlorophyll_monthly_summer_2023.nc')

print("Analysis complete!")`}
              </pre>
            </div>
          </section>

          {/* Next Steps */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6">
            <h2 className="text-xl font-semibold text-white mb-3">Next Steps</h2>
            <p className="text-[#D6E1F0] mb-4">
              Now you're ready to apply these skills to real research workflows!
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/tutorials/chlorophyll-analysis"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#0F2D57] transition-colors hover:bg-[#e8ba30]"
              >
                Next: Analyzing Chlorophyll Data →
              </Link>
              <Link
                to="/documentation"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                View Documentation
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WorkingWithNetCDF;
