import React from "react";
import { FaArrowLeft, FaLightbulb, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";

const GettingStartedEO = () => {
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
                Beginner
              </span>
              <span className="text-xs text-[#D6E1F0]">15 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Getting Started with Earth Observation Data
            </h1>
            <p className="text-lg text-[#D6E1F0]">
              Learn the basics of Earth Observation (EO) data, understand common formats,
              and discover how to access datasets from this catalogue.
            </p>
          </section>

          {/* Introduction */}
          <section className="border-t border-white/10 pt-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white">Introduction</h2>
            <p className="text-[#D6E1F0]">
              Earth Observation data comes from satellites orbiting our planet, continuously monitoring
              the atmosphere, oceans, land, and ice. For Antarctic and Southern Ocean research, these
              satellites provide crucial information about regions that are difficult and expensive to
              access with traditional field campaigns.
            </p>
            <p className="text-[#D6E1F0]">
              This tutorial will give you a solid foundation in EO data concepts so you can confidently
              find and use the datasets in this catalogue.
            </p>
          </section>

          {/* Section 1: Understanding Satellite Missions */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Understanding Satellite Missions and Sensors
              </h2>
            </div>

            <div className="border-t border-white/10 pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">What is a satellite mission?</h3>
              <p className="text-[#D6E1F0]">
                A <strong>satellite mission</strong> is a spacecraft launched to orbit Earth and collect
                specific types of observations. Each mission carries one or more <strong>sensors</strong>
                (instruments) designed to measure different aspects of our planet.
              </p>

              <div className="bg-[#143A6A] rounded-lg p-4 border-l-4 border-[#F4C542]">
                <h4 className="text-sm font-semibold text-[#F4C542] mb-2">Example Missions</h4>
                <ul className="space-y-2 text-sm text-[#D6E1F0]">
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>Sentinel-3:</strong> European mission measuring ocean color, sea surface temperature, and sea ice</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>CryoSat-2:</strong> Dedicated to measuring ice thickness in polar regions</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#F4C542]">•</span>
                    <span><strong>MODIS (on Aqua/Terra):</strong> NASA missions providing daily global ocean and land observations</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-white pt-4">Types of Sensors</h3>

              <div className="space-y-3">
                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Optical Sensors</h4>
                  <p className="text-sm text-[#D6E1F0] mb-2">
                    Measure visible and infrared light reflected or emitted from Earth's surface.
                  </p>
                  <p className="text-xs text-[#D6E1F0]">
                    <strong>Good for:</strong> Ocean color (chlorophyll), sea surface temperature, cloud properties
                  </p>
                  <p className="text-xs text-[#D6E1F0]">
                    <strong>Limitation:</strong> Cannot see through clouds, limited during polar night
                  </p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Radar Sensors (SAR)</h4>
                  <p className="text-sm text-[#D6E1F0] mb-2">
                    Send out microwave pulses and measure the return signal.
                  </p>
                  <p className="text-xs text-[#D6E1F0]">
                    <strong>Good for:</strong> Sea ice concentration, ice motion, surface roughness
                  </p>
                  <p className="text-xs text-[#D6E1F0]">
                    <strong>Advantage:</strong> Works through clouds and darkness
                  </p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Altimeters</h4>
                  <p className="text-sm text-[#D6E1F0] mb-2">
                    Measure the distance to Earth's surface with extreme precision.
                  </p>
                  <p className="text-xs text-[#D6E1F0]">
                    <strong>Good for:</strong> Sea surface height, ice sheet elevation, ice thickness
                  </p>
                  <p className="text-xs text-[#D6E1F0]">
                    <strong>Note:</strong> Provides profiles along satellite track, not full coverage
                  </p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Passive Microwave</h4>
                  <p className="text-sm text-[#D6E1F0] mb-2">
                    Detect natural microwave radiation emitted by the surface.
                  </p>
                  <p className="text-xs text-[#D6E1F0]">
                    <strong>Good for:</strong> Sea ice concentration, sea surface salinity, wind speed
                  </p>
                  <p className="text-xs text-[#D6E1F0]">
                    <strong>Trade-off:</strong> Coarse resolution (~25 km) but daily global coverage
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Common Data Formats */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Common Data Formats
              </h2>
            </div>

            <div className="border-t border-white/10 pt-6 space-y-6">
              <p className="text-[#D6E1F0]">
                Satellite data is stored in specialized formats designed for scientific use. Understanding
                these formats is essential for working with the data.
              </p>

              <div className="space-y-4">
                <div className="border border-[#F4C542]/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">NetCDF (.nc, .nc4)</h3>
                    <span className="text-xs px-2 py-1 rounded bg-[#F4C542]/20 text-[#F4C542]">Most Common</span>
                  </div>
                  <p className="text-sm text-[#D6E1F0] mb-3">
                    Network Common Data Form - the standard format for gridded scientific data.
                  </p>
                  <div className="bg-[#071a34] rounded p-3 mb-3">
                    <p className="text-xs font-mono text-[#D6E1F0]">
                      # Structure example:<br />
                      dimensions: lat=720, lon=1440, time=365<br />
                      variables: chlor_a(time, lat, lon), sst(time, lat, lon)<br />
                      attributes: units, valid_range, _FillValue
                    </p>
                  </div>
                  <ul className="space-y-1 text-sm text-[#D6E1F0]">
                    <li className="flex gap-2">
                      <span className="text-[#F4C542]">✓</span>
                      Self-describing (metadata embedded in file)
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#F4C542]">✓</span>
                      Supports multi-dimensional arrays
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#F4C542]">✓</span>
                      Platform-independent (works on Windows, Mac, Linux)
                    </li>
                  </ul>
                  <p className="text-xs text-[#D6E1F0] mt-3">
                    <strong>Best tools:</strong> xarray (Python), ncview, Panoply
                  </p>
                </div>

                <div className="border border-white/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">HDF5 (.h5, .hdf5)</h3>
                  <p className="text-sm text-[#D6E1F0] mb-3">
                    Hierarchical Data Format - flexible format for complex data structures.
                  </p>
                  <ul className="space-y-1 text-sm text-[#D6E1F0]">
                    <li className="flex gap-2">
                      <span className="text-[#F4C542]">•</span>
                      Can store multiple datasets in one file
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#F4C542]">•</span>
                      Commonly used by NASA products
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#F4C542]">•</span>
                      Many newer NetCDF files actually use HDF5 format internally
                    </li>
                  </ul>
                  <p className="text-xs text-[#D6E1F0] mt-3">
                    <strong>Best tools:</strong> h5py (Python), HDFView
                  </p>
                </div>

                <div className="border border-white/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">GeoTIFF (.tif, .tiff)</h3>
                  <p className="text-sm text-[#D6E1F0] mb-3">
                    Image format with embedded geographic information.
                  </p>
                  <ul className="space-y-1 text-sm text-[#D6E1F0]">
                    <li className="flex gap-2">
                      <span className="text-[#F4C542]">•</span>
                      Easy to visualize as an image
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#F4C542]">•</span>
                      Compatible with all GIS software
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#F4C542]">•</span>
                      Good for single-time snapshots, not time series
                    </li>
                  </ul>
                  <p className="text-xs text-[#D6E1F0] mt-3">
                    <strong>Best tools:</strong> QGIS, rasterio (Python), GDAL
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Spatial and Temporal Coverage */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Understanding Coverage: Spatial and Temporal
              </h2>
            </div>

            <div className="border-t border-white/10 pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Spatial Coverage</h3>
                <p className="text-[#D6E1F0] mb-4">
                  This tells you what geographic area the data covers and at what resolution.
                </p>

                <div className="bg-[#143A6A] rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-white mb-2">Coverage Area</p>
                    <ul className="space-y-2 text-sm text-[#D6E1F0]">
                      <li><strong>Global:</strong> Entire planet (most satellite products)</li>
                      <li><strong>Regional:</strong> Southern Ocean south of 40°S or 50°S</li>
                      <li><strong>Polar:</strong> Antarctic only (often starts at 60°S or higher latitude)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white mb-2">Spatial Resolution</p>
                    <p className="text-sm text-[#D6E1F0] mb-2">Size of each pixel or grid cell:</p>
                    <ul className="space-y-1 text-sm text-[#D6E1F0]">
                      <li><strong>High resolution:</strong> 100m - 1km (e.g., Sentinel-2, MODIS)</li>
                      <li><strong>Medium resolution:</strong> 4-10km (e.g., ocean color composites)</li>
                      <li><strong>Coarse resolution:</strong> 25-50km (e.g., passive microwave)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#1B457A]/50 p-4 rounded-lg border-l-4 border-[#F4C542] mt-4">
                  <div className="flex items-start gap-2">
                    <FaLightbulb className="text-[#F4C542] mt-1 flex-shrink-0" />
                    <div className="text-sm text-[#D6E1F0]">
                      <strong>Tip:</strong> Higher resolution = more detail but larger file sizes and
                      less frequent coverage. Choose resolution based on your research question.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Temporal Coverage</h3>
                <p className="text-[#D6E1F0] mb-4">
                  This describes when observations are available and how frequently.
                </p>

                <div className="space-y-3">
                  <div className="bg-[#143A6A] rounded-lg p-3">
                    <p className="text-sm font-semibold text-white mb-1">Time Span</p>
                    <p className="text-sm text-[#D6E1F0]">
                      The period covered by the dataset (e.g., "1997 - present" or "2015 - 2020")
                    </p>
                  </div>

                  <div className="bg-[#143A6A] rounded-lg p-3">
                    <p className="text-sm font-semibold text-white mb-1">Temporal Resolution</p>
                    <p className="text-sm text-[#D6E1F0] mb-2">How often new observations are available:</p>
                    <ul className="space-y-1 text-xs text-[#D6E1F0] ml-4">
                      <li><strong>Daily:</strong> New observation every day (may have gaps due to clouds)</li>
                      <li><strong>8-day or Monthly:</strong> Composite averages reducing cloud coverage</li>
                      <li><strong>Seasonal or Annual:</strong> Long-term averaged products</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: How to Access Data */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                How to Read Data Access Links
              </h2>
            </div>

            <div className="border-t border-white/10 pt-6 space-y-6">
              <p className="text-[#D6E1F0]">
                Each product in this catalogue includes links to the data provider. Here's how to interpret them:
              </p>

              <div className="space-y-4">
                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h3 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="text-[#F4C542]">1.</span> Provider Name
                  </h3>
                  <p className="text-sm text-[#D6E1F0]">
                    Who hosts the data (e.g., NASA, ESA, NOAA). You may need to register for an account
                    with them before downloading.
                  </p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h3 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="text-[#F4C542]">2.</span> Access Protocol
                  </h3>
                  <p className="text-sm text-[#D6E1F0] mb-2">
                    How you'll get the data:
                  </p>
                  <ul className="space-y-1 text-sm text-[#D6E1F0] ml-4">
                    <li><strong>HTTP/HTTPS:</strong> Direct browser download</li>
                    <li><strong>FTP:</strong> File transfer (use FTP client or wget/curl)</li>
                    <li><strong>OPeNDAP:</strong> Remote access without full download (best for large files)</li>
                    <li><strong>THREDDS:</strong> Data server with multiple access options</li>
                  </ul>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h3 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="text-[#F4C542]">3.</span> Documentation Link
                  </h3>
                  <p className="text-sm text-[#D6E1F0]">
                    Always read this first! It explains data quality, known issues, processing methods,
                    and how to cite the dataset.
                  </p>
                </div>
              </div>

              <div className="bg-[#1B457A]/50 p-4 rounded-lg border-l-4 border-[#3dd6d0]">
                <div className="flex items-start gap-2">
                  <FaExclamationTriangle className="text-[#3dd6d0] mt-1 flex-shrink-0" />
                  <div className="text-sm text-[#D6E1F0]">
                    <strong>Important:</strong> This catalogue is a discovery portal. The actual data
                    files are hosted by external providers, not here. Always check the provider's
                    terms of use and citation requirements.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold text-white mb-3">Before you use a dataset</h2>
            <p className="text-sm text-[#D6E1F0] mb-4">
              Check these details on the product page before you download or analyse it:
            </p>
            <div className="grid gap-x-8 gap-y-2 md:grid-cols-2">
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <span className="text-[#3dd6d0]">•</span>
                <span>Does it cover my region of interest?</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <span className="text-[#3dd6d0]">•</span>
                <span>Does it span my time period?</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <span className="text-[#3dd6d0]">•</span>
                <span>Is the spatial resolution adequate?</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <span className="text-[#3dd6d0]">•</span>
                <span>Is the temporal resolution adequate?</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <span className="text-[#3dd6d0]">•</span>
                <span>What format is the data in?</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <span className="text-[#3dd6d0]">•</span>
                <span>Do I have the tools to read this format?</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <span className="text-[#3dd6d0]">•</span>
                <span>Do I need to register with the provider?</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#D6E1F0]">
                <span className="text-[#3dd6d0]">•</span>
                <span>Can I use it for my purpose (check license)?</span>
              </div>
            </div>
          </section>

          <section className="border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold text-white mb-3">Where to go from here</h2>
            <p className="text-[#D6E1F0] mb-4">
              Continue with data access, or return to the catalogue and search for a product.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/tutorials/accessing-data"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#0F2D57] transition-colors hover:bg-[#e8ba30]"
              >
                Next: Accessing and Downloading Data →
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                Start Searching for Data
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedEO;
