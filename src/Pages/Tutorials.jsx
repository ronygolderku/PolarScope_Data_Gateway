import React from "react";
import {
  FaBook,
  FaDownload,
  FaCode,
  FaChartLine,
  FaMap,
  FaDatabase,
  FaLightbulb,
  FaPython,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { Link } from "react-router";

const Tutorials = () => {
  const tutorials = [
    {
      title: "Getting Started with Earth Observation Data",
      icon: FaLightbulb,
      level: "Beginner",
      duration: "15 min",
      description: "Learn the basics of EO data, common formats, and how to access datasets from this catalogue.",
      link: "/tutorials/getting-started-eo",
      topics: [
        "Understanding satellite missions and sensors",
        "Common data formats (NetCDF, HDF5, GeoTIFF)",
        "Spatial and temporal coverage concepts",
        "How to read data access links",
      ],
    },
    {
      title: "Accessing and Downloading Data",
      icon: FaDownload,
      level: "Beginner",
      duration: "20 min",
      description: "Step-by-step guide to accessing datasets from different providers and download methods.",
      link: "/tutorials/accessing-data",
      topics: [
        "Understanding data access protocols (HTTP, FTP, OPeNDAP)",
        "Using wget and curl for bulk downloads",
        "Navigating THREDDS data servers",
        "Authentication and registration requirements",
      ],
    },
    {
      title: "Working with NetCDF Files in Python",
      icon: FaPython,
      level: "Intermediate",
      duration: "30 min",
      description: "Practical guide to reading, processing, and visualizing NetCDF data using Python libraries.",
      link: "/tutorials/working-with-netcdf",
      topics: [
        "Installing required libraries (xarray, netCDF4, matplotlib)",
        "Opening and exploring NetCDF files",
        "Subsetting data by time and space",
        "Creating basic visualizations",
      ],
    },
    {
      title: "Analyzing Sea Surface Temperature",
      icon: FaChartLine,
      level: "Intermediate",
      duration: "45 min",
      description: "Complete workflow analyzing 32 years of NOAA SST data for the Southern Ocean with real-world examples.",
      link: "/tutorials/sst-analysis",
      topics: [
        "Download and process NOAA satellite SST data",
        "Create Antarctic projection maps with oceanic fronts",
        "Calculate long-term temperature trends",
        "Regional time series analysis and interpretation",
      ],
    },
    {
      title: "Antarctic Sea Ice Extent Analysis",
      icon: FaMap,
      level: "Intermediate",
      duration: "40 min",
      description: "Analyze Antarctic sea ice concentration and extent using NSIDC passive microwave data.",
      link: "/tutorials/sea-ice-analysis",
      topics: [
        "Download and process NSIDC Antarctic sea ice data",
        "Calculate sea ice extent and area metrics (15% threshold)",
        "Create South Polar projection maps",
        "Analyze seasonal cycles, trends, and regional variations",
      ],
    },
    {
      title: "Integrating BGC-Argo Float Data",
      icon: FaDatabase,
      level: "Advanced",
      duration: "50 min",
      description: "Combine in-situ BGC-Argo measurements with satellite observations.",
      topics: [
        "Accessing BGC-Argo data from GDAC",
        "Matching satellite pixels with float profiles",
        "Quality control for BGC-Argo data",
        "Satellite-float data validation workflows",
      ],
    },
  ];

  const codeExamples = [
    {
      title: "Quick Start: Load NetCDF Data",
      language: "Python",
      code: `import xarray as xr
import matplotlib.pyplot as plt

# Open a NetCDF file
ds = xr.open_dataset('chlorophyll_data.nc')

# View dataset structure
print(ds)

# Select Southern Ocean region (south of 40°S)
southern = ds.sel(lat=slice(-90, -40))

# Plot a map for a specific date
southern['chlor_a'].sel(time='2023-01-15').plot()
plt.title('Chlorophyll-a Concentration')
plt.show()`,
    },
    {
      title: "Download Data with Python",
      language: "Python",
      code: `import requests
from pathlib import Path

# Download a file from a data provider
url = "https://data.provider.org/dataset/file.nc"
output_path = Path("downloads/file.nc")

# Create directory if it doesn't exist
output_path.parent.mkdir(parents=True, exist_ok=True)

# Download with progress
response = requests.get(url, stream=True)
with open(output_path, 'wb') as f:
    for chunk in response.iter_content(chunk_size=8192):
        f.write(chunk)

print(f"Downloaded to {output_path}")`,
    },
    {
      title: "Subset Data by Region and Time",
      language: "Python",
      code: `import xarray as xr

# Open dataset
ds = xr.open_dataset('data.nc')

# Define Antarctic region
lat_min, lat_max = -80, -60
lon_min, lon_max = -180, 180

# Subset spatially and temporally
subset = ds.sel(
    lat=slice(lat_min, lat_max),
    lon=slice(lon_min, lon_max),
    time=slice('2022-01-01', '2022-12-31')
)

# Save subset to new file
subset.to_netcdf('antarctic_2022.nc')`,
    },
  ];

  const externalResources = [
    {
      title: "Xarray Documentation",
      url: "https://docs.xarray.dev/",
      description: "Official documentation for xarray - the primary library for working with labeled multi-dimensional arrays",
    },
    {
      title: "Cartopy Tutorial",
      url: "https://scitools.org.uk/cartopy/docs/latest/",
      description: "Cartopy is a Python package for geospatial data processing and map projections",
    },
    {
      title: "OPeNDAP User Guide",
      url: "https://www.opendap.org/support/user-documentation",
      description: "Learn how to access remote datasets without downloading entire files",
    },
    {
      title: "BGC-Argo Data Access",
      url: "https://biogeochemical-argo.org/data-access.php",
      description: "Official guide to accessing BGC-Argo float data",
    },
    {
      title: "NASA Earthdata Search",
      url: "https://search.earthdata.nasa.gov/",
      description: "Search and access NASA Earth observation data",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 flex flex-col gap-10">
          {/* Header */}
          <section className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#D6E1F0] backdrop-blur-sm">
              <FaBook className="text-[#F4C542]" />
              Learning Resources
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Tutorials &amp; Guides
            </h1>
            <p className="max-w-3xl text-base sm:text-lg leading-7 text-[#D6E1F0]">
              Step-by-step tutorials to help you access, process, and analyze Antarctic and Southern Ocean data.
              From beginner-friendly introductions to advanced analysis workflows.
            </p>
          </section>

          {/* Quick Navigation */}
          <section className="rounded-2xl border border-white/10 bg-[#143A6A] p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
            <div className="flex flex-wrap gap-3">
              <a href="#tutorials" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10">
                Tutorials
              </a>
              <a href="#code-examples" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10">
                Code Examples
              </a>
              <a href="#resources" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10">
                External Resources
              </a>
              <Link to="/documentation" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10">
                Documentation
              </Link>
              <Link to="/getting-started" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10">
                Getting Started Guide
              </Link>
            </div>
          </section>

          {/* Tutorials */}
          <section id="tutorials" className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">
                Learn by Doing
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Tutorial Library
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#D6E1F0]">
                Structured tutorials covering common workflows and analysis techniques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial, index) => {
                const TutorialCard = tutorial.link ? Link : 'div';
                const cardProps = tutorial.link ? { to: tutorial.link } : {};

                return (
                  <TutorialCard
                    key={index}
                    {...cardProps}
                    className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 shadow-sm hover:border-[#F4C542]/30 transition-colors block"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4C542]/10 text-[#F4C542]">
                          <tutorial.icon className="text-xl" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {tutorial.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-1 rounded-full bg-[#F4C542]/20 text-[#F4C542] font-medium">
                              {tutorial.level}
                            </span>
                            <span className="text-xs text-[#D6E1F0]">
                              {tutorial.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-[#D6E1F0] mb-4">
                      {tutorial.description}
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4C542]">
                        Topics Covered
                      </p>
                      <ul className="space-y-1">
                        {tutorial.topics.map((topic, idx) => (
                          <li key={idx} className="text-sm text-[#D6E1F0] flex items-start gap-2">
                            <span className="text-[#F4C542] mt-1.5">•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {tutorial.link && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className="text-sm font-semibold text-[#F4C542]">
                          Start Tutorial →
                        </span>
                      </div>
                    )}
                  </TutorialCard>
                );
              })}
            </div>
          </section>

          {/* Code Examples */}
          <section id="code-examples" className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">
                Ready to Use
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Code Examples
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#D6E1F0]">
                Copy-paste code snippets to get started quickly with common tasks.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {codeExamples.map((example, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-[#0b2748] overflow-hidden shadow-sm"
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#143A6A]">
                    <div className="flex items-center gap-3">
                      <FaCode className="text-[#F4C542]" />
                      <h3 className="text-lg font-semibold text-white">
                        {example.title}
                      </h3>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-[#F4C542]/20 text-[#F4C542] font-medium">
                      {example.language}
                    </span>
                  </div>
                  <div className="p-6">
                    <pre className="overflow-x-auto text-sm text-[#D6E1F0] bg-[#071a34] p-4 rounded-lg">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* External Resources */}
          <section id="resources" className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">
                Learn More
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                External Resources
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#D6E1F0]">
                Curated links to official documentation and learning materials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {externalResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-white/10 bg-[#143A6A] p-6 shadow-sm hover:border-[#F4C542]/30 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#F4C542] transition-colors">
                      {resource.title}
                    </h3>
                    <FaExternalLinkAlt className="text-[#D6E1F0] text-sm mt-1 group-hover:text-[#F4C542] transition-colors" />
                  </div>
                  <p className="mt-3 text-sm text-[#D6E1F0]">
                    {resource.description}
                  </p>
                </a>
              ))}
            </div>
          </section>

          {/* Help Section */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6 md:p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">
              Need Help?
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
              Get Support
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-7 text-[#D6E1F0]">
              If you have questions about using the data or need help with a specific analysis, contact the ACEAS project office.
            </p>
            <a
              href="mailto:ACEAS.Project.Office@utas.edu.au"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#F4C542] px-5 py-3 text-sm font-semibold text-[#0F2D57] transition-colors hover:bg-[#e8ba30]"
            >
              ACEAS.Project.Office@utas.edu.au
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
