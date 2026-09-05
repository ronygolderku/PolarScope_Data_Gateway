import React, { useState, useMemo } from "react";
import {
  FaDownload,
  FaMap,
  FaDatabase,
  FaPython,
  FaExternalLinkAlt,
  FaSearch,
  FaArrowRight,
  FaEye,
} from "react-icons/fa";
import { Link } from "react-router";
import CodeBlock from "../components/CodeBlock";

const categories = ["All", "Sea Ice", "Ocean", "Data Access"];

const tutorials = [
  {
    title: "Sea Surface Temperature - Southern Ocean",
    description: "Load and visualize NOAA OISST data for the Southern Ocean. Covers basic NetCDF handling with xarray and polar projections.",
    notebook: "sst_so.ipynb",
    category: "Ocean",
    tags: ["SST", "xarray", "Cartopy"],
  },
  {
    title: "Antarctic Sea Ice Index",
    description: "Calculate sea ice extent and area from concentration data. Learn to work with NSIDC datasets and polar stereographic grids.",
    notebook: "antarctic_sea_ice_index.ipynb",
    category: "Sea Ice",
    tags: ["NSIDC", "Sea Ice", "Extent"],
  },
  {
    title: "OSI SAF - Data Access via FTP",
    description: "Download OSI SAF sea ice products using automated FTP access. Essential for building data pipelines.",
    notebook: "1_1a_OSI_SAF_sea_ice_FTP_data_access.ipynb",
    category: "Data Access",
    tags: ["OSI SAF", "FTP", "Download"],
  },
  {
    title: "OSI SAF - Mapping Ice Concentration",
    description: "Visualize sea ice concentration from OSI SAF products. Create publication-quality maps with polar projections.",
    notebook: "1_3a_OSI_SAF_sea_ice_mapping_Ice_Concentration.ipynb",
    category: "Sea Ice",
    tags: ["OSI SAF", "Concentration", "Mapping"],
  },
  {
    title: "OSI SAF - Ice Drift Analysis",
    description: "Analyze sea ice motion vectors. Understand ice transport patterns and seasonal dynamics.",
    notebook: "1_3d_OSI_SAF_sea_ice_mapping_Ice_Drift.ipynb",
    category: "Sea Ice",
    tags: ["OSI SAF", "Drift", "Motion"],
  },
  {
    title: "OSI SAF - Monthly Concentration Anomalies",
    description: "Calculate and analyze sea ice concentration anomalies. Detect trends and interannual variability.",
    notebook: "2_1_OSI_SAF_sea_ice_Monthly_concentration_anomalies.ipynb",
    category: "Sea Ice",
    tags: ["OSI SAF", "Anomalies", "Trends"],
  },
  {
    title: "Southern Ocean Chlorophyll Overview",
    description: "Explore chlorophyll-a distributions in the Southern Ocean. Work with ocean color satellite data.",
    notebook: "01_southern_ocean_chlorophyll_overview.ipynb",
    category: "Ocean",
    tags: ["Chlorophyll", "Ocean Color", "Phytoplankton"],
  },
  {
    title: "Wind Visualization - Southern Ocean",
    description: "Visualize wind patterns using CCMP data. Understand Southern Ocean wind forcing.",
    notebook: "02_wind_visualization.ipynb",
    category: "Ocean",
    tags: ["Wind", "CCMP", "Forcing"],
  },
  {
    title: "Multi-Variable Southern Ocean Analysis",
    description: "Combine multiple datasets (SST, chlorophyll, ice, wind) for integrated Southern Ocean analysis.",
    notebook: "08_multi_variable_southern_ocean_analysis.ipynb",
    category: "Ocean",
    tags: ["Multi-variable", "Integration", "Analysis"],
  },
];

const codeExamples = [
  {
    title: "Load Southern Ocean SST Data",
    language: "Python",
    code: `import xarray as xr
import matplotlib.pyplot as plt
import cartopy.crs as ccrs

# Open dataset
ds = xr.open_dataset('sst.mon.mean.nc')

# Subset Southern Ocean (south of 40°S)
so_sst = ds['sst'].sel(lat=slice(-40, -90), time=slice('2020', '2023'))

# Calculate mean and plot
mean_sst = so_sst.mean(dim='time')

fig, ax = plt.subplots(figsize=(8, 8),
                       subplot_kw={'projection': ccrs.SouthPolarStereo()})
ax.set_extent([-180, 180, -90, -45], ccrs.PlateCarree())
ax.coastlines(resolution='50m')

mean_sst.plot(ax=ax, transform=ccrs.PlateCarree(), cmap='coolwarm',
              cbar_kwargs={'label': 'SST (°C)'})
plt.show()`,
  },
  {
    title: "Calculate Sea Ice Extent",
    language: "Python",
    code: `import xarray as xr

# Open sea ice concentration dataset
ds = xr.open_dataset('seaice_conc_daily.nc')
sic = ds['ice_conc']  # Concentration in %

# Grid cell area (25 km x 25 km)
CELL_AREA = 625.0  # km²

# Calculate extent (>= 15% threshold)
ice_extent = (sic >= 15).sum(dim=['x', 'y']) * CELL_AREA / 1e6

# Calculate area (actual ice coverage)
ice_area = (sic / 100.0).sum(dim=['x', 'y']) * CELL_AREA / 1e6

print(f"Latest extent: {float(ice_extent.isel(time=-1)):.2f} M km²")
print(f"Latest area: {float(ice_area.isel(time=-1)):.2f} M km²")`,
  },
  {
    title: "Download with wget",
    language: "Bash",
    code: `# Setup credentials in ~/.netrc
# machine urs.earthdata.nasa.gov login USER password PASS

# Bulk download with resume capability
wget --load-cookies ~/.urs_cookies \\
     --save-cookies ~/.urs_cookies \\
     --keep-session-cookies \\
     --continue \\
     --input-file=urls.txt`,
  },
];

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTutorials = useMemo(() => {
    return tutorials.filter((tutorial) => {
      const matchesCat =
        selectedCategory === "All" || tutorial.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tutorial.title.toLowerCase().includes(q) ||
        tutorial.description.toLowerCase().includes(q) ||
        tutorial.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-10">

          {/* Header */}
          <section className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F4C542]">
              Jupyter Notebooks
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Antarctic Data Tutorials
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#D6E1F0]">
              Step-by-step notebooks for working with polar datasets. Download and run locally, or use as reference for your own analysis.
            </p>
          </section>

          {/* Quick Navigation */}
          <nav className="border-y border-white/10 py-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <a href="#tutorials" className="text-[#F4C542] hover:text-white">
              Notebooks ({filteredTutorials.length})
            </a>
            <a href="#code-examples" className="text-[#D6E1F0] hover:text-[#F4C542]">
              Code Snippets
            </a>
            <Link to="/documentation" className="text-[#D6E1F0] hover:text-[#F4C542]">
              Documentation
            </Link>
          </nav>

          {/* Tutorials Section */}
          <section id="tutorials" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Available Notebooks
              </h2>

              {/* Search */}
              <div className="relative w-full md:w-72">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F4C542] text-xs" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter notebooks..."
                  className="w-full rounded-xl border border-white/15 bg-[#071a34] pl-9 pr-4 py-2 text-sm text-white placeholder-[#D6E1F0]/60 outline-none focus:border-[#F4C542] focus:ring-1 focus:ring-[#F4C542]"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-[#F4C542] text-[#071a34]"
                      : "border border-white/15 bg-white/5 text-[#D6E1F0] hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tutorial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredTutorials.map((tutorial, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-[#0b2748]/80 p-5 hover:border-[#F4C542]/50 hover:bg-[#0f325c] transition-all"
                >
                  <h3 className="text-lg font-bold text-white mb-3">
                    {tutorial.title}
                  </h3>

                  <p className="text-sm text-[#D6E1F0] mb-4 leading-relaxed">
                    {tutorial.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tutorial.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs text-[#3dd6d0] bg-[#3dd6d0]/10 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                    <Link
                      to={`/notebook-viewer?file=${tutorial.notebook}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#F4C542] hover:text-white transition-colors"
                    >
                      <FaEye />
                      View notebook
                    </Link>
                    <a
                      href={`/notebooks/${tutorial.notebook}`}
                      download
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#D6E1F0] hover:text-[#F4C542] transition-colors"
                    >
                      <FaDownload />
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredTutorials.length === 0 && (
              <div className="text-center py-12 rounded-xl border border-dashed border-white/20 bg-white/5">
                <p className="text-white">No notebooks found matching "{searchQuery}"</p>
                <button
                  onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                  className="mt-3 text-xs font-semibold text-[#F4C542] hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </section>

          {/* Code Snippets */}
          <section id="code-examples" className="space-y-6 pt-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#F4C542] mb-2">
                <FaPython /> Quick Reference
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Common Code Patterns
              </h2>
              <p className="mt-1 text-sm text-[#D6E1F0]">
                Copy-paste these snippets into your own scripts.
              </p>
            </div>

            <div className="space-y-6">
              {codeExamples.map((example, idx) => (
                <div key={idx} className="rounded-xl border border-white/10 bg-[#0b2748] p-5">
                  <h3 className="text-base font-semibold text-white mb-3">
                    {example.title}
                  </h3>
                  <CodeBlock
                    code={example.code}
                    language={example.language}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* External Resources */}
          <section className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold text-white">
              External Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://pangeo.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-[#0b2748]/60 p-4 hover:border-[#F4C542]/40 hover:bg-[#0f325c] transition-all"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-semibold text-white group-hover:text-[#F4C542]">
                    Pangeo
                  </h3>
                  <FaExternalLinkAlt className="text-[#D6E1F0] text-xs" />
                </div>
                <p className="mt-2 text-sm text-[#D6E1F0]">
                  Community platform for big data geoscience with xarray and Dask.
                </p>
              </a>

              <a
                href="https://github.com/nsidc/earthaccess"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-[#0b2748]/60 p-4 hover:border-[#F4C542]/40 hover:bg-[#0f325c] transition-all"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-semibold text-white group-hover:text-[#F4C542]">
                    earthaccess (Python)
                  </h3>
                  <FaExternalLinkAlt className="text-[#D6E1F0] text-xs" />
                </div>
                <p className="mt-2 text-sm text-[#D6E1F0]">
                  Python library for searching and downloading NASA polar datasets.
                </p>
              </a>

              <a
                href="https://scitools.org.uk/cartopy/"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-[#0b2748]/60 p-4 hover:border-[#F4C542]/40 hover:bg-[#0f325c] transition-all"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-semibold text-white group-hover:text-[#F4C542]">
                    Cartopy
                  </h3>
                  <FaExternalLinkAlt className="text-[#D6E1F0] text-xs" />
                </div>
                <p className="mt-2 text-sm text-[#D6E1F0]">
                  Python library for polar projections and Antarctic mapping.
                </p>
              </a>

              <a
                href="https://biogeochemical-argo.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-[#0b2748]/60 p-4 hover:border-[#F4C542]/40 hover:bg-[#0f325c] transition-all"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-semibold text-white group-hover:text-[#F4C542]">
                    BGC-Argo
                  </h3>
                  <FaExternalLinkAlt className="text-[#D6E1F0] text-xs" />
                </div>
                <p className="mt-2 text-sm text-[#D6E1F0]">
                  Access protocols and quality-control guidelines for float data.
                </p>
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Tutorials;
