import React from "react";
import { FaArrowLeft, FaCheckCircle, FaThermometerHalf } from "react-icons/fa";
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
              This tutorial analyzes 32 years (1991-2022) of NOAA satellite SST data to visualize temperature
              patterns, identify oceanic fronts, and calculate warming trends.
            </p>

            <div className="bg-[#143A6A] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">What You'll Learn</h3>
              <ul className="space-y-2 text-sm text-[#D6E1F0]">
                <li className="flex gap-2">
                  <span className="text-[#F4C542]">•</span>
                  <span>Process NOAA Optimum Interpolation SST data for the Southern Ocean</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#F4C542]">•</span>
                  <span>Create Antarctic projection maps with oceanic fronts</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#F4C542]">•</span>
                  <span>Calculate and visualize temperature trends over 32 years</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#F4C542]">•</span>
                  <span>Analyze regional time series for different ocean zones</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Data & Methods */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-white">Data & Methodology</h2>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Dataset</h3>
              <div className="bg-[#143A6A] rounded-lg p-4">
                <ul className="space-y-2 text-sm text-[#D6E1F0]">
                  <li><strong>Source:</strong> NOAA Optimum Interpolation Sea Surface Temperature V2</li>
                  <li><strong>Resolution:</strong> 1.0° × 1.0° grid</li>
                  <li><strong>Coverage:</strong> Southern Ocean (30°S to 85°S)</li>
                  <li><strong>Period:</strong> Monthly data, 1991-2022 (384 months)</li>
                  <li><strong>Variables:</strong> Sea surface temperature (°C)</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Analysis Workflow</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#143A6A] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">1</span>
                    <h4 className="font-semibold text-white">Data Loading</h4>
                  </div>
                  <p className="text-sm text-[#D6E1F0]">Load NetCDF files using xarray and subset to Southern Ocean region</p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">2</span>
                    <h4 className="font-semibold text-white">Mean Calculation</h4>
                  </div>
                  <p className="text-sm text-[#D6E1F0]">Compute temporal mean SST to visualize average temperature distribution</p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">3</span>
                    <h4 className="font-semibold text-white">Visualization</h4>
                  </div>
                  <p className="text-sm text-[#D6E1F0]">Create South Polar maps with oceanic fronts using Cartopy</p>
                </div>

                <div className="bg-[#143A6A] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4C542] text-[#071a34] text-xs font-bold">4</span>
                    <h4 className="font-semibold text-white">Trend Analysis</h4>
                  </div>
                  <p className="text-sm text-[#D6E1F0]">Calculate linear trends and create warming/cooling pattern maps</p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Concepts */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-white">Key Concepts</h2>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Oceanic Fronts in the Southern Ocean</h3>
              <p className="text-sm text-[#D6E1F0] mb-4">
                Oceanic fronts are boundaries between water masses with different temperatures. They represent
                major circulation features in the Antarctic Circumpolar Current system.
              </p>
              <div className="bg-[#143A6A] rounded-lg p-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    Polar Front (~4°C)
                  </h4>
                  <p className="text-xs text-[#D6E1F0] ml-5">Major boundary separating cold Antarctic water from warmer subantarctic water</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                    Subantarctic Front (~10°C)
                  </h4>
                  <p className="text-xs text-[#D6E1F0] ml-5">Northern extent of Antarctic Circumpolar Current</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    Southern Boundary (~0°C)
                  </h4>
                  <p className="text-xs text-[#D6E1F0] ml-5">Southernmost extent of circumpolar circulation</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Temperature Trends</h3>
              <p className="text-sm text-[#D6E1F0]">
                Linear trends calculated using polynomial fitting reveal warming patterns across the Southern Ocean.
                The 32-year analysis shows mean warming of approximately 0.1°C per decade, with significant
                regional variability influenced by ocean circulation and sea ice dynamics.
              </p>
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
                View the complete analysis with all code, outputs, and visualizations below. The notebook includes
                step-by-step implementation, console outputs, and publication-quality figures.
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

          {/* Key Findings */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Key Findings</h2>
            <ul className="space-y-3 text-[#D6E1F0]">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Temperature Gradient:</strong> Strong north-south gradient from ~20°C (30°S) to
                  ~-2°C near Antarctica
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Oceanic Fronts:</strong> Clear boundaries visible in SST patterns representing
                  major Antarctic Circumpolar Current features
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Warming Trends:</strong> Mean warming of ~0.092°C per decade (1991-2022) with
                  spatial variability up to 0.23°C per decade in some regions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-[#F4C542] mt-1 flex-shrink-0" />
                <span>
                  <strong>Regional Differences:</strong> Antarctic Peninsula and parts of Weddell Sea show
                  stronger warming signals than other sectors
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
              <li>• EOF analysis to identify dominant variability patterns</li>
              <li>• Correlation with climate indices (SAM, ENSO)</li>
              <li>• Relationship with sea ice extent changes</li>
              <li>• Validation with BGC-Argo float temperature profiles</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/search?q=temperature"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F4C542] px-4 py-2 text-sm font-semibold text-[#0F2D57] transition-colors hover:bg-[#e8ba30]"
              >
                Find More SST Datasets
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

export default SSTAnalysis;
