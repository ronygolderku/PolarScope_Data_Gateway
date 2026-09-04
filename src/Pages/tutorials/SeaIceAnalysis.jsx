import React from "react";
import { FaArrowLeft, FaCheckCircle, FaSnowflake } from "react-icons/fa";
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
              Analyze Antarctic sea ice concentration and extent using satellite passive microwave observations.
              Learn to process NSIDC and OSI SAF data, calculate ice metrics, and visualize seasonal patterns.
            </p>
          </section>

          {/* Introduction */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white">Introduction</h2>
            <p className="text-[#D6E1F0]">
              Antarctic sea ice is a critical component of Earth's climate system, moderating heat exchange between
              ocean and atmosphere and providing crucial habitat for polar ecosystems. This tutorial demonstrates
              how to analyze sea ice concentration data, calculate extent metrics, and examine seasonal and
              interannual variability in the Southern Ocean.
            </p>

            <div className="bg-[#1B457A]/50 p-4 rounded-lg border-l-4 border-[#F4C542]">
              <p className="text-sm font-semibold text-[#F4C542] mb-2">
                🌊 Antarctic Focus
              </p>
              <p className="text-sm text-[#D6E1F0]">
                This tutorial specifically covers <strong>Antarctic</strong> sea ice in the Southern Ocean
                (south of 40°S), not Arctic sea ice. Analysis techniques apply to NSIDC and OSI SAF products.
              </p>
            </div>

            <div className="bg-[#143A6A] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">What You'll Learn</h3>
              <ul className="space-y-2 text-sm text-[#D6E1F0]">
                <li className="flex gap-2">
                  <span className="text-[#F4C542]">•</span>
                  <span>Process passive microwave sea ice concentration data</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#F4C542]">•</span>
                  <span>Calculate sea ice extent and area using the 15% threshold</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#F4C542]">•</span>
                  <span>Create Antarctic polar projection maps</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#F4C542]">•</span>
                  <span>Analyze seasonal cycles and regional variations</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Data & Methods */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-white">Data & Methodology</h2>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Primary Data Sources</h3>
              <div className="space-y-3">
                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">NSIDC Sea Ice Index (Recommended)</h4>
                  <ul className="space-y-1 text-sm text-[#D6E1F0]">
                    <li><strong>Resolution:</strong> 25 km polar stereographic grid</li>
                    <li><strong>Coverage:</strong> Daily and monthly, 1978-present</li>
                    <li><strong>Sensors:</strong> SMMR, SSM/I, SSMIS passive microwave</li>
                    <li><strong>URL:</strong> nsidc.org/data/G02135</li>
                  </ul>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">OSI SAF Sea Ice Concentration</h4>
                  <ul className="space-y-1 text-sm text-[#D6E1F0]">
                    <li><strong>Resolution:</strong> 10-25 km grid</li>
                    <li><strong>Coverage:</strong> Daily, 1978-present</li>
                    <li><strong>Products:</strong> OSI-401, OSI-450, OSI-430</li>
                    <li><strong>URL:</strong> osi-saf.eumetsat.int</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Analysis Workflow</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#143A6A] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">1</span>
                    <h4 className="font-semibold text-white">Data Access</h4>
                  </div>
                  <p className="text-sm text-[#D6E1F0]">Download NSIDC or OSI SAF sea ice concentration NetCDF files</p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">2</span>
                    <h4 className="font-semibold text-white">Metric Calculation</h4>
                  </div>
                  <p className="text-sm text-[#D6E1F0]">Calculate extent (15% threshold) and area from concentration grids</p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">3</span>
                    <h4 className="font-semibold text-white">Visualization</h4>
                  </div>
                  <p className="text-sm text-[#D6E1F0]">Create Antarctic maps with South Polar Stereographic projection</p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">4</span>
                    <h4 className="font-semibold text-white">Time Series</h4>
                  </div>
                  <p className="text-sm text-[#D6E1F0]">Analyze seasonal cycles, trends, and regional sector variations</p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Concepts */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-white">Key Concepts</h2>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Sea Ice Metrics</h3>
              <div className="space-y-3">
                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h4 className="font-semibold text-white text-sm mb-2">Sea Ice Concentration (SIC)</h4>
                  <p className="text-sm text-[#D6E1F0]">
                    Percentage of ocean area covered by ice (0-100%). Retrieved from passive microwave
                    brightness temperatures using algorithms like Bootstrap or NASA Team.
                  </p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h4 className="font-semibold text-white text-sm mb-2">Sea Ice Extent</h4>
                  <p className="text-sm text-[#D6E1F0]">
                    Total area of ocean with ≥15% ice concentration. Standard metric for trend analysis
                    and climate monitoring. The 15% threshold is used across all scientific literature.
                  </p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <h4 className="font-semibold text-white text-sm mb-2">Sea Ice Area</h4>
                  <p className="text-sm text-[#D6E1F0]">
                    Actual ice-covered area accounting for concentration (extent × concentration).
                    More precise than extent but less commonly used for climate comparisons.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Antarctic Sea Ice Characteristics</h3>
              <div className="bg-[#143A6A] rounded-lg p-4 space-y-2 text-sm text-[#D6E1F0]">
                <p>
                  <strong>Seasonal Cycle:</strong> Maximum extent in September-October (~18-19 million km²),
                  minimum in February-March (~2-3 million km²)
                </p>
                <p>
                  <strong>Regional Sectors:</strong> Five main sectors (Weddell, Indian, West Pacific, Ross,
                  Amundsen-Bellingshausen) exhibit different behaviors due to local conditions
                </p>
                <p>
                  <strong>Recent Trends:</strong> Complex patterns with regional increases and decreases;
                  dramatic decline since 2016 following record maximum in 2014
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Antarctic Sectors</h3>
              <div className="bg-[#143A6A] rounded-lg p-4">
                <ul className="space-y-2 text-sm text-[#D6E1F0]">
                  <li><strong>Weddell Sea:</strong> 60°W to 20°E (largest ice reservoir)</li>
                  <li><strong>Indian Ocean:</strong> 20°E to 90°E</li>
                  <li><strong>West Pacific:</strong> 90°E to 160°E</li>
                  <li><strong>Ross Sea:</strong> 160°E to 130°W (second largest)</li>
                  <li><strong>Amundsen-Bellingshausen:</strong> 130°W to 60°W (highest variability)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Run the analysis
              </h2>
              <p className="mt-2 text-sm text-[#D6E1F0]">
                The notebook contains monthly and daily Antarctic sea ice index analysis. Open it separately for the full notebook view, or download it to run with your own data.
              </p>
            </div>

            <div className="border-y border-white/10 py-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
              <p className="text-sm text-[#D6E1F0]">Antarctic sea ice index notebook, covering 1978 to the present.</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold sm:mt-0">
                <a href="/notebooks/antarctic_sea_ice_index.ipynb" download className="text-[#F4C542] hover:text-white">Download notebook</a>
                <a href="https://mybinder.org/v2/git/https%3A%2F%2Fgitlab.eumetsat.int%2Feumetlab%2Foceans%2Focean-training%2Fsensors%2Flearn-osi-saf-sea-ice/HEAD?labpath=1_OSI_SAF_sea_ice_introductory%2F1_3f_OSI_SAF_sea_ice_plotting_Ice_Index.ipynb" target="_blank" rel="noopener noreferrer" className="text-[#F4C542] hover:text-white">Run in Binder</a>
                <a href="https://gitlab.eumetsat.int/eumetlab/oceans/ocean-training/sensors/learn-osi-saf-sea-ice/-/tree/main/1_OSI_SAF_sea_ice_introductory" target="_blank" rel="noopener noreferrer" className="text-[#F4C542] hover:text-white">EUMETSAT tutorials</a>
              </div>
            </div>
          </section>

          {/* Key Points */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Key Points</h2>
            <ul className="space-y-3 text-[#D6E1F0]">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Standard Threshold:</strong> 15% concentration threshold is universally used
                  for extent calculations to enable consistent comparisons
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Seasonal Amplitude:</strong> Antarctic sea ice exhibits extreme seasonality
                  with ~6-fold variation between minimum and maximum extent
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Regional Variability:</strong> Weddell and Ross Seas dominate ice extent,
                  while Amundsen-Bellingshausen sector shows highest interannual variability
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Passive Microwave Algorithms:</strong> Bootstrap and NASA Team algorithms
                  produce slightly different concentration estimates but consistent extent metrics
                </span>
              </li>
            </ul>
          </section>

          {/* Next Steps */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6">
            <h2 className="text-xl font-semibold text-white mb-3">Further Analysis</h2>
            <p className="text-[#D6E1F0] mb-4">
              Extend this analysis with advanced techniques:
            </p>
            <ul className="space-y-1 text-sm text-[#D6E1F0] mb-4">
              <li>• Seasonal cycle decomposition and anomaly analysis</li>
              <li>• Correlation with climate modes (SAM, ENSO)</li>
              <li>• Regional sector time series and trend analysis</li>
              <li>• Ice-ocean interaction studies with SST data</li>
              <li>• Comparison between NSIDC and OSI SAF products</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/search?q=sea+ice"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#0F2D57] transition-colors hover:bg-[#e8ba30]"
              >
                Find More Sea Ice Datasets
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