import React from "react";
import {
  FaBook,
  FaDatabase,
  FaFileAlt,
  FaGlobe,
  FaKey,
  FaShieldAlt,
  FaTools,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router";

const Documentation = () => {
  const sections = [
    {
      id: "data-formats",
      title: "Data Formats",
      icon: FaFileAlt,
      content: [
        {
          subtitle: "NetCDF (Network Common Data Form)",
          description: "The most common format for gridded scientific data. Self-describing, portable, and supports multi-dimensional arrays.",
          details: [
            "File extensions: .nc, .nc4",
            "Best for: Gridded satellite data, model outputs, time series",
            "Tools: xarray (Python), ncview, Panoply",
            "Standards: CF-compliant metadata conventions",
          ],
        },
        {
          subtitle: "HDF5 (Hierarchical Data Format)",
          description: "Flexible format for storing large amounts of data. Supports complex data structures and metadata.",
          details: [
            "File extensions: .h5, .hdf5, .he5",
            "Best for: Complex hierarchical datasets, NASA products",
            "Tools: h5py (Python), HDFView",
            "Note: Many newer NetCDF files use HDF5 backend",
          ],
        },
        {
          subtitle: "GeoTIFF",
          description: "Standard for geospatial raster imagery. Widely supported by GIS software.",
          details: [
            "File extensions: .tif, .tiff",
            "Best for: Single-band or RGB imagery, DEMs",
            "Tools: GDAL, rasterio (Python), QGIS",
            "Contains embedded georeference information",
          ],
        },
        {
          subtitle: "CSV and Text Files",
          description: "Simple tabular data formats. Common for in-situ measurements and profile data.",
          details: [
            "File extensions: .csv, .txt, .dat",
            "Best for: Station data, BGC-Argo profiles, time series",
            "Tools: pandas (Python), Excel, R",
            "Often includes header with column descriptions",
          ],
        },
      ],
    },
    {
      id: "access-protocols",
      title: "Data Access Protocols",
      icon: FaGlobe,
      content: [
        {
          subtitle: "HTTP/HTTPS Download",
          description: "Direct file download via web browser or command-line tools.",
          details: [
            "Simple and widely supported",
            "Use wget or curl for automated downloads",
            "Example: wget https://data.provider.org/file.nc",
            "May require authentication for some providers",
          ],
        },
        {
          subtitle: "FTP/SFTP",
          description: "File Transfer Protocol for bulk data access.",
          details: [
            "Traditional method for large datasets",
            "Many providers transitioning to HTTPS",
            "Tools: lftp, FileZilla, Python ftplib",
            "Check provider documentation for credentials",
          ],
        },
        {
          subtitle: "OPeNDAP",
          description: "Remote data access protocol allowing subsetting without full download.",
          details: [
            "Access only the data you need (spatial/temporal subset)",
            "Saves bandwidth and storage",
            "Supported by xarray, MATLAB, IDL",
            "URLs often end with .html or .nc (OPeNDAP endpoint)",
          ],
        },
        {
          subtitle: "THREDDS Data Server",
          description: "Web-based data catalog and distribution system.",
          details: [
            "Provides multiple access methods (HTTP, OPeNDAP, WMS)",
            "Interactive data exploration",
            "Common for meteorological and oceanographic data",
            "Web interface for browsing catalog structure",
          ],
        },
      ],
    },
    {
      id: "metadata-standards",
      title: "Metadata Standards",
      icon: FaDatabase,
      content: [
        {
          subtitle: "STAC (SpatioTemporal Asset Catalog)",
          description: "This catalogue uses STAC v1.0.0 for organizing and describing geospatial data.",
          details: [
            "JSON-based metadata specification",
            "Standardized way to describe spatial and temporal extents",
            "Links between related datasets (themes, missions, products)",
            "Enables interoperability across data catalogs",
          ],
        },
        {
          subtitle: "CF Conventions",
          description: "Climate and Forecast metadata conventions for NetCDF files.",
          details: [
            "Standard names for variables (e.g., sea_surface_temperature)",
            "Coordinate systems and projections",
            "Time units and calendars",
            "Quality flags and missing data indicators",
          ],
        },
        {
          subtitle: "ISO 19115",
          description: "International standard for geographic information metadata.",
          details: [
            "Used by many data providers and portals",
            "Comprehensive metadata elements",
            "Supports discovery and evaluation of datasets",
            "Often exported as XML files",
          ],
        },
      ],
    },
    {
      id: "common-variables",
      title: "Common Variables",
      icon: FaTools,
      content: [
        {
          subtitle: "Ocean Variables",
          details: [
            "Sea Surface Temperature (SST): ocean skin temperature from infrared/microwave sensors",
            "Chlorophyll-a Concentration: ocean color product, proxy for phytoplankton biomass",
            "Sea Surface Height (SSH): altimetry measurements, ocean circulation indicator",
            "Salinity: sea surface salinity from SMOS, SMAP missions",
            "Ocean Color: reflectance at multiple wavelengths",
          ],
        },
        {
          subtitle: "Cryosphere Variables",
          details: [
            "Sea Ice Concentration: fraction of area covered by ice (0-100%)",
            "Sea Ice Extent: total area with >15% ice concentration",
            "Ice Thickness: from altimetry (CryoSat-2, ICESat-2)",
            "Snow Depth: on sea ice or land",
            "Albedo: surface reflectance, important for energy balance",
          ],
        },
        {
          subtitle: "Atmosphere Variables",
          details: [
            "Aerosol Optical Depth (AOD): atmospheric turbidity measure",
            "Cloud Properties: cloud fraction, height, optical thickness",
            "Precipitation: rain/snow rates from PMW sensors or models",
            "Wind Speed/Direction: scatterometer measurements",
            "Water Vapor: total column water vapor",
          ],
        },
      ],
    },
    {
      id: "quality-control",
      title: "Quality Control &amp; Flags",
      icon: FaShieldAlt,
      content: [
        {
          subtitle: "Understanding Quality Flags",
          description: "Most satellite products include quality indicators. Always check these before analysis.",
          details: [
            "Quality flags indicate data reliability (good, suspect, bad)",
            "Cloud masking: identifies pixels contaminated by clouds",
            "Missing data: represented by fill values (often -999, NaN)",
            "Processing levels: L1 (raw), L2 (calibrated), L3 (gridded), L4 (gap-filled)",
          ],
        },
        {
          subtitle: "Common Quality Issues",
          details: [
            "Cloud contamination in optical sensors",
            "Ice/land masking errors near coastlines",
            "Sensor degradation over time",
            "Seasonal coverage gaps (polar night for optical sensors)",
            "Calibration uncertainties",
          ],
        },
        {
          subtitle: "Best Practices",
          details: [
            "Always read the product documentation and known issues",
            "Apply recommended quality filters",
            "Compare multiple products when available",
            "Validate with in-situ data when possible",
            "Be aware of temporal coverage gaps",
          ],
        },
      ],
    },
    {
      id: "data-citations",
      title: "Data Citations &amp; Licensing",
      icon: FaKey,
      content: [
        {
          subtitle: "How to Cite Data",
          description: "Proper attribution is essential when using datasets in publications.",
          details: [
            "Each product page includes licensing information",
            "Check for DOI (Digital Object Identifier) in metadata",
            "Include: Dataset name, version, access date, provider",
            "Example: Author (Year). Dataset Title. Provider. DOI",
          ],
        },
        {
          subtitle: "Common Licenses",
          details: [
            "CC BY 4.0: Free use with attribution",
            "CC BY-SA 4.0: Free use with attribution and share-alike",
            "Proprietary: May require registration or have use restrictions",
            "Various: Check specific dataset license before use",
          ],
        },
        {
          subtitle: "Data Provider Acknowledgments",
          details: [
            "ESA (European Space Agency): Copernicus/Sentinel data",
            "NASA: Multiple missions and products",
            "NOAA: Environmental monitoring datasets",
            "EUMETSAT: Meteorological satellite data",
            "BGC-Argo: International float program",
          ],
        },
      ],
    },
  ];

  const glossary = [
    { term: "Albedo", definition: "Fraction of solar radiation reflected by a surface." },
    { term: "Altimetry", definition: "Satellite measurement technique for determining surface elevation." },
    { term: "AOD", definition: "Aerosol Optical Depth - measure of atmospheric turbidity." },
    { term: "BGC-Argo", definition: "Biogeochemical Argo - autonomous profiling floats measuring ocean properties." },
    { term: "Chlorophyll-a", definition: "Primary pigment in phytoplankton, used as proxy for ocean productivity." },
    { term: "EO", definition: "Earth Observation - satellite-based monitoring of Earth's systems." },
    { term: "GDAC", definition: "Global Data Assembly Center - central repository for Argo float data." },
    { term: "Geolocation", definition: "Process of assigning geographic coordinates to satellite observations." },
    { term: "In-situ", definition: "Direct measurements made at the location (e.g., ship, float, station)." },
    { term: "L-band", definition: "Microwave frequency band (~1-2 GHz), used for soil moisture and salinity." },
    { term: "OPeNDAP", definition: "Open-source Project for a Network Data Access Protocol." },
    { term: "PMW", definition: "Passive Microwave - sensors measuring naturally emitted microwave radiation." },
    { term: "SAR", definition: "Synthetic Aperture Radar - active microwave imaging system." },
    { term: "SST", definition: "Sea Surface Temperature." },
    { term: "THREDDS", definition: "Thematic Real-time Environmental Distributed Data Services." },
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 flex flex-col gap-10">
          {/* Header */}
          <section className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#D6E1F0] backdrop-blur-sm">
              <FaBook className="text-[#F4C542]" />
              Technical Reference
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Documentation
            </h1>
            <p className="max-w-3xl text-base sm:text-lg leading-7 text-[#D6E1F0]">
              Technical documentation, data format specifications, access protocols, and reference materials
              for working with Antarctic and Southern Ocean datasets.
            </p>
          </section>

          {/* Quick Navigation */}
          <section className="rounded-2xl border border-white/10 bg-[#143A6A] p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Navigation</h2>
            <div className="flex flex-wrap gap-3">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10 flex items-center gap-2"
                >
                  <section.icon className="text-[#F4C542]" />
                  {section.title}
                </a>
              ))}
              <a href="#glossary" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10 flex items-center gap-2">
                <FaQuestionCircle className="text-[#F4C542]" />
                Glossary
              </a>
              <Link to="/tutorials" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10">
                View Tutorials
              </Link>
            </div>
          </section>

          {/* Main Content Sections */}
          {sections.map((section, sectionIndex) => (
            <section key={section.id} id={section.id} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4C542]/10 text-[#F4C542]">
                  <section.icon className="text-2xl" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">
                    Section {sectionIndex + 1}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                    {section.title}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {section.content.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 shadow-sm"
                  >
                    {item.subtitle && (
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {item.subtitle}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-sm text-[#D6E1F0] mb-4">
                        {item.description}
                      </p>
                    )}
                    <ul className="space-y-2">
                      {item.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="text-sm text-[#D6E1F0] flex items-start gap-2"
                        >
                          <span className="text-[#F4C542] mt-1.5 flex-shrink-0">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Glossary */}
          <section id="glossary" className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4C542]/10 text-[#F4C542]">
                <FaQuestionCircle className="text-2xl" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">
                  Reference
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  Glossary
                </h2>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {glossary.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <dt className="text-sm font-semibold text-[#F4C542]">
                      {item.term}
                    </dt>
                    <dd className="text-sm text-[#D6E1F0]">
                      {item.definition}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Help Section */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6 md:p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">
              Questions?
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
              Contact the Project Office
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-7 text-[#D6E1F0]">
              For questions about data formats, access issues, or technical documentation, reach out to ACEAS.
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

export default Documentation;
