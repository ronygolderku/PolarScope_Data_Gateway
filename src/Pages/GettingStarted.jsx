import React from "react";
import {
  FaRocket,
  FaSearch,
  FaDownload,
  FaCode,
  FaCheckCircle,
  FaQuestionCircle,
  FaBook,
  FaLightbulb,
} from "react-icons/fa";
import { Link } from "react-router";

const GettingStarted = () => {
  const steps = [
    {
      number: "01",
      title: "Understand What You're Looking For",
      icon: FaQuestionCircle,
      description: "Before diving in, identify what type of data you need for your research.",
      content: [
        {
          heading: "Ask yourself:",
          points: [
            "What geographic region? (Antarctic Peninsula, Weddell Sea, entire Southern Ocean?)",
            "What time period? (Single year, seasonal, multi-decadal trends?)",
            "What variable? (Temperature, ice, chlorophyll, wind?)",
            "Satellite or in-situ? (Remote sensing vs. direct measurements)",
          ],
        },
        {
          heading: "Browse entry points:",
          points: [
            "Themes: Organized by science domain (Atmosphere, Cryosphere, Oceans)",
            "Variables: Search by specific measurement type",
            "Missions: Browse by satellite platform",
            "Products: Curated data products from providers",
          ],
        },
      ],
    },
    {
      number: "02",
      title: "Search and Browse the Catalogue",
      icon: FaSearch,
      description: "Use multiple ways to discover datasets that match your needs.",
      content: [
        {
          heading: "Search methods:",
          points: [
            "Keyword search: Try terms like 'sea ice', 'chlorophyll', 'temperature'",
            "Browse by theme: Start broad, then narrow down",
            "Filter by mission: If you know the satellite platform",
            "Check metrics page: See temporal coverage timeline for all products",
          ],
        },
        {
          heading: "Evaluate products:",
          points: [
            "Spatial coverage: Does it cover your region of interest?",
            "Temporal coverage: Does it span your time period?",
            "Resolution: Is the spatial/temporal resolution adequate?",
            "License: Can you use it for your purpose (research, publication)?",
          ],
        },
      ],
    },
    {
      number: "03",
      title: "Access the Data",
      icon: FaDownload,
      description: "Each product page provides links to the data provider. Follow their access instructions.",
      content: [
        {
          heading: "Access preparation:",
          points: [
            "Read the product description and documentation carefully",
            "Check if registration is required with the data provider",
            "Note the data format (NetCDF, HDF5, GeoTIFF, CSV)",
            "Identify the access protocol (HTTP, FTP, OPeNDAP, THREDDS)",
          ],
        },
        {
          heading: "Download strategies:",
          points: [
            "Start small: Download a single file or short time period first",
            "Test your workflow before bulk downloading",
            "Use OPeNDAP to subset data remotely (saves bandwidth)",
            "Check provider's download policies and rate limits",
          ],
        },
      ],
    },
    {
      number: "04",
      title: "Work with the Data",
      icon: FaCode,
      description: "Process and analyze the data using appropriate tools for your format.",
      content: [
        {
          heading: "Essential tools (Python):",
          points: [
            "xarray: For NetCDF/HDF5 multi-dimensional data",
            "pandas: For CSV and tabular data",
            "matplotlib/cartopy: For visualization and maps",
            "numpy: For numerical operations",
          ],
        },
        {
          heading: "Workflow tips:",
          points: [
            "Check data quality flags before analysis",
            "Understand coordinate systems and projections",
            "Apply appropriate spatial/temporal averaging",
            "Document your processing steps for reproducibility",
          ],
        },
      ],
    },
  ];

  const quickStartChecklist = [
    "Identify your research question and data requirements",
    "Browse themes or search for relevant keywords",
    "Review product metadata (coverage, resolution, license)",
    "Click through to data provider and check access requirements",
    "Download a test file to verify format and content",
    "Set up your analysis environment (Python, R, or GIS software)",
    "Process and quality-check your data",
    "Cite the dataset properly in your work",
  ];

  const commonScenarios = [
    {
      title: "I want to analyze sea ice trends",
      steps: [
        'Browse to "Cryosphere" theme',
        'Look for "Sea Ice Concentration" products',
        "Check temporal coverage (need multi-year for trends)",
        "Download monthly averages for your time period",
        "Use xarray to calculate regional averages and trends",
      ],
    },
    {
      title: "I need chlorophyll data for the Southern Ocean",
      steps: [
        'Search for "chlorophyll" or browse "Oceans" theme',
        "Compare available products (OC-CCI, MODIS, VIIRS)",
        "Note spatial resolution and coverage gaps",
        "Download L3 (gridded) products for easier analysis",
        "Apply quality flags to remove cloudy/suspect pixels",
      ],
    },
    {
      title: "I want to validate satellite data with in-situ measurements",
      steps: [
        'Visit BGC-Argo page for float locations and measurements',
        "Identify floats in your region and time period",
        "Download corresponding satellite product for matchup",
        "Extract satellite pixels at float locations/times",
        "Compare and calculate validation statistics",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 flex flex-col gap-10">
          {/* Header */}
          <section className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#D6E1F0] backdrop-blur-sm">
              <FaRocket className="text-[#F4C542]" />
              Beginner's Guide
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Getting Started
            </h1>
            <p className="max-w-3xl text-base sm:text-lg leading-7 text-[#D6E1F0]">
              New to Earth observation data? This guide walks you through finding, accessing, and working
              with Antarctic and Southern Ocean datasets, step by step.
            </p>
          </section>

          {/* Quick Checklist */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FaCheckCircle className="text-2xl text-[#F4C542]" />
              <h2 className="text-xl font-semibold text-white">Quick Start Checklist</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickStartChecklist.map((item, index) => (
                <div key={index} className="flex items-start gap-3 text-sm text-[#D6E1F0]">
                  <span className="flex-shrink-0 mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-[#F4C542]/20 text-[#F4C542] text-xs font-semibold">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Main Steps */}
          <section className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">
                Step by Step
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Your Data Journey
              </h2>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-[#0b2748] overflow-hidden shadow-sm"
                >
                  <div className="bg-[#143A6A] border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4C542] text-[#071a34] font-bold text-lg">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                          <step.icon className="text-[#F4C542]" />
                          {step.title}
                        </h3>
                        <p className="text-sm text-[#D6E1F0] mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    {step.content.map((section, sIndex) => (
                      <div key={sIndex}>
                        <h4 className="text-sm font-semibold text-[#F4C542] mb-3">
                          {section.heading}
                        </h4>
                        <ul className="space-y-2">
                          {section.points.map((point, pIndex) => (
                            <li
                              key={pIndex}
                              className="text-sm text-[#D6E1F0] flex items-start gap-2"
                            >
                              <span className="text-[#F4C542] mt-1.5 flex-shrink-0">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Scenarios */}
          <section className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">
                Real Examples
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Common Research Scenarios
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#D6E1F0]">
                See how to approach typical research questions using this catalogue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {commonScenarios.map((scenario, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-[#143A6A] p-6 shadow-sm"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <FaLightbulb className="text-[#F4C542] text-xl flex-shrink-0 mt-1" />
                    <h3 className="text-lg font-semibold text-white">
                      {scenario.title}
                    </h3>
                  </div>
                  <ol className="space-y-2">
                    {scenario.steps.map((step, sIndex) => (
                      <li
                        key={sIndex}
                        className="text-sm text-[#D6E1F0] flex items-start gap-2"
                      >
                        <span className="flex-shrink-0 font-semibold text-[#F4C542]">
                          {sIndex + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </section>

          {/* Important Notes */}
          <section className="bg-[#1B457A]/50 p-6 md:p-8 rounded-2xl border-l-4 border-[#F4C542]">
            <h3 className="text-xl font-semibold text-[#F4C542] mb-4 flex items-center gap-2">
              <FaLightbulb />
              Important Notes
            </h3>
            <ul className="space-y-3">
              <li className="text-sm sm:text-base text-[#D6E1F0] flex items-start gap-2">
                <span className="text-[#F4C542] mt-1 flex-shrink-0">•</span>
                <span>
                  <strong>This catalogue is a discovery portal</strong> - it provides metadata and links,
                  but the actual data is hosted by external providers. You'll be directed to the provider's
                  site for downloads.
                </span>
              </li>
              <li className="text-sm sm:text-base text-[#D6E1F0] flex items-start gap-2">
                <span className="text-[#F4C542] mt-1 flex-shrink-0">•</span>
                <span>
                  <strong>Registration may be required</strong> - Some data providers require free
                  registration before you can download data. Plan accordingly.
                </span>
              </li>
              <li className="text-sm sm:text-base text-[#D6E1F0] flex items-start gap-2">
                <span className="text-[#F4C542] mt-1 flex-shrink-0">•</span>
                <span>
                  <strong>File sizes can be large</strong> - Satellite datasets often range from hundreds
                  of MB to several GB per file. Ensure adequate storage and bandwidth.
                </span>
              </li>
              <li className="text-sm sm:text-base text-[#D6E1F0] flex items-start gap-2">
                <span className="text-[#F4C542] mt-1 flex-shrink-0">•</span>
                <span>
                  <strong>Cite your data sources</strong> - Always provide proper attribution when using
                  datasets in publications. Check each product page for citation information.
                </span>
              </li>
            </ul>
          </section>

          {/* Next Steps */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/tutorials"
              className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 shadow-sm hover:border-[#F4C542]/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F4C542]/10 text-[#F4C542]">
                  <FaBook />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-[#F4C542] transition-colors">
                  Tutorials
                </h3>
              </div>
              <p className="text-sm text-[#D6E1F0]">
                Follow detailed step-by-step tutorials for common analysis workflows.
              </p>
            </Link>

            <Link
              to="/documentation"
              className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 shadow-sm hover:border-[#F4C542]/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F4C542]/10 text-[#F4C542]">
                  <FaBook />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-[#F4C542] transition-colors">
                  Documentation
                </h3>
              </div>
              <p className="text-sm text-[#D6E1F0]">
                Technical reference for data formats, protocols, and metadata standards.
              </p>
            </Link>

            <Link
              to="/search"
              className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 shadow-sm hover:border-[#F4C542]/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F4C542]/10 text-[#F4C542]">
                  <FaSearch />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-[#F4C542] transition-colors">
                  Start Searching
                </h3>
              </div>
              <p className="text-sm text-[#D6E1F0]">
                Ready to find data? Use the search to discover relevant datasets.
              </p>
            </Link>
          </section>

          {/* Help Section */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6 md:p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">
              Still Have Questions?
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
              We're Here to Help
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-7 text-[#D6E1F0]">
              If you're stuck or have questions about getting started, contact the ACEAS project office.
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

export default GettingStarted;
