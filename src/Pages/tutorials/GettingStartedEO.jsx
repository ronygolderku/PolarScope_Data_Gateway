import React from "react";
import { FaArrowLeft, FaCompass, FaCheckCircle, FaExclamationTriangle, FaEye, FaBroadcastTower, FaRulerVertical, FaWaveSquare } from "react-icons/fa";
import { Link } from "react-router";
import Breadcrumbs from "../../components/Breadcrumbs";
import RelatedDatasets from "../../components/RelatedDatasets";

const GettingStartedEO = () => {
  const datasets = [
    {
      name: "CryoSat-2 Baseline E Radar Altimeter",
      description: "Surface elevation and sea ice freeboard across Antarctica.",
      to: "/search?q=cryosat",
      provider: "ESA",
      format: "NetCDF-4",
      resolution: "Along-track",
    },
    {
      name: "Sentinel-3 OLCI & SLSTR Ocean Products",
      description: "Ocean colour, SST, and sea ice surface temperature.",
      to: "/search?q=sentinel-3",
      provider: "Copernicus / EUMETSAT",
      format: "NetCDF-4 / SAFE",
      resolution: "300m - 1km",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 flex flex-col gap-8">
          
          {/* Breadcrumbs & Back */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <Breadcrumbs items={[{ label: "Foundations of Polar Earth Observation" }]} />
            <Link
              to="/tutorials"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#F4C542] hover:text-white transition-colors"
            >
              <FaArrowLeft />
              Back to Tutorials
            </Link>
          </div>

          {/* Header */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-full bg-[#F4C542]/20 text-[#F4C542] font-semibold">
                Beginner
              </span>
              <span className="text-xs text-[#D6E1F0]">15 min read</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#3dd6d0]/20 text-[#3dd6d0] font-semibold">
                Remote Sensing Essentials
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Foundations of Polar Earth Observation
            </h1>
            <p className="text-lg text-[#D6E1F0] leading-relaxed">
              Essential principles for navigating satellite missions, sensor physics, coordinate projections, and data formats across the Antarctic and Southern Ocean.
            </p>
          </section>

          {/* Related Datasets */}
          <RelatedDatasets datasets={datasets} />

          {/* Section 1: Unique Polar Constraints */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 sm:p-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F4C542] mb-1">
                <FaCompass /> Remote Sensing Physics
              </div>
              <h2 className="text-2xl font-bold text-white">
                Why Polar Earth Observation is Unique
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-[#D6E1F0]">
              Observing Antarctica and the surrounding Southern Ocean from space presents challenges that differ fundamentally from temperate and tropical regions. Understanding these physics-based constraints determines which sensor you should choose for your research:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-[#143A6A]/60 p-4 space-y-2">
                <h3 className="text-sm font-bold text-[#F4C542]">1. The Austral Polar Night</h3>
                <p className="text-xs text-[#D6E1F0] leading-relaxed">
                  During winter (April to September), areas south of the Antarctic Circle experience weeks to months of total darkness. <strong>Optical sensors (MODIS, Sentinel-2, Landsat) cannot capture visible bands</strong> during this period.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#143A6A]/60 p-4 space-y-2">
                <h3 className="text-sm font-bold text-[#3dd6d0]">2. Persistent Cloud Cover</h3>
                <p className="text-xs text-[#D6E1F0] leading-relaxed">
                  The Southern Ocean westerly wind belt is one of the cloudiest regions on Earth (&gt;80% cloud fraction). Infrared SST and visible ocean colour sensors suffer frequent data gaps, necessitating microwave alternatives or monthly composites.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#143A6A]/60 p-4 space-y-2">
                <h3 className="text-sm font-bold text-[#3dd6d0]">3. The "Pole Hole"</h3>
                <p className="text-xs text-[#D6E1F0] leading-relaxed">
                  Most polar-orbiting satellites fly in Sun-synchronous orbits with inclinations around 98°. Because they do not pass directly over the true geographical South Pole, they leave a circular data gap (the "pole hole", typically south of ~82°S to ~88°S depending on orbit).
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#143A6A]/60 p-4 space-y-2">
                <h3 className="text-sm font-bold text-[#F4C542]">4. Extreme Surface Albedo</h3>
                <p className="text-xs text-[#D6E1F0] leading-relaxed">
                  Fresh Antarctic snow reflects up to 90% of solar radiation. Optical sensors can easily saturate, and differentiating low-lying clouds from snow and sea ice requires specialized shortwave infrared (SWIR) and thermal bands.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Sensor Regimes */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Core Polar Sensor Regimes
              </h2>
              <p className="mt-1 text-sm text-[#D6E1F0]">
                Choose the appropriate sensor technology based on your variable of interest and atmospheric tolerance:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Optical */}
              <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-5 space-y-3">
                <div className="flex items-center gap-2.5 text-[#F4C542]">
                  <FaEye className="text-lg" />
                  <h3 className="text-base font-bold text-white">Optical / Multispectral</h3>
                </div>
                <p className="text-xs text-[#D6E1F0] leading-relaxed">
                  Measures reflected solar radiation in visible, near-infrared (NIR), and shortwave infrared (SWIR).
                </p>
                <div className="space-y-1 text-xs text-[#D6E1F0] border-t border-white/5 pt-2">
                  <p><strong>Variables:</strong> Chlorophyll-a, suspended particulate matter, sea ice surface albedo, melt ponds.</p>
                  <p><strong>Missions:</strong> Sentinel-2 (MSI), Sentinel-3 (OLCI), Aqua/Terra (MODIS).</p>
                  <p className="text-rose-300"><strong>Limitation:</strong> Blocked by clouds; strictly requires daylight.</p>
                </div>
              </div>

              {/* Passive Microwave */}
              <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-5 space-y-3">
                <div className="flex items-center gap-2.5 text-[#3dd6d0]">
                  <FaBroadcastTower className="text-lg" />
                  <h3 className="text-base font-bold text-white">Passive Microwave Radiometers</h3>
                </div>
                <p className="text-xs text-[#D6E1F0] leading-relaxed">
                  Measures natural microwave emissivity emitted by sea ice and ocean surfaces.
                </p>
                <div className="space-y-1 text-xs text-[#D6E1F0] border-t border-white/5 pt-2">
                  <p><strong>Variables:</strong> Sea ice concentration (SIC), sea ice extent, snow water equivalent.</p>
                  <p><strong>Missions:</strong> DMSP (SSMIS), GCOM-W1 (AMSR2), SMOS.</p>
                  <p className="text-emerald-300"><strong>Advantage:</strong> Operates 24/7 through clouds and polar darkness at ~12–25 km resolution.</p>
                </div>
              </div>

              {/* Radar Altimetry */}
              <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-5 space-y-3">
                <div className="flex items-center gap-2.5 text-[#F4C542]">
                  <FaRulerVertical className="text-lg" />
                  <h3 className="text-base font-bold text-white">Radar & Laser Altimetry</h3>
                </div>
                <p className="text-xs text-[#D6E1F0] leading-relaxed">
                  Transmits high-frequency pulses to measure round-trip time and determine elevation with centimeter-scale precision.
                </p>
                <div className="space-y-1 text-xs text-[#D6E1F0] border-t border-white/5 pt-2">
                  <p><strong>Variables:</strong> Ice sheet surface elevation change (mass balance), sea ice freeboard and thickness, sea surface height.</p>
                  <p><strong>Missions:</strong> CryoSat-2 (SIRAL), ICESat-2 (ATLAS laser), Sentinel-3 (SRAL), Sentinel-6.</p>
                </div>
              </div>

              {/* Synthetic Aperture Radar */}
              <div className="rounded-2xl border border-white/10 bg-[#0b2748] p-5 space-y-3">
                <div className="flex items-center gap-2.5 text-[#3dd6d0]">
                  <FaWaveSquare className="text-lg" />
                  <h3 className="text-base font-bold text-white">Synthetic Aperture Radar (SAR)</h3>
                </div>
                <p className="text-xs text-[#D6E1F0] leading-relaxed">
                  Active side-looking radar illuminating the ground with microwaves to produce high-resolution backscatter imagery.
                </p>
                <div className="space-y-1 text-xs text-[#D6E1F0] border-t border-white/5 pt-2">
                  <p><strong>Variables:</strong> Ice shelf calving, iceberg tracking, glacier flow velocity, sea ice deformation.</p>
                  <p><strong>Missions:</strong> Sentinel-1 C-band SAR, RADARSAT-2, ALOS-2.</p>
                  <p className="text-emerald-300"><strong>Advantage:</strong> All-weather, day-and-night imaging at 10–50 meter resolution.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Projections & Coordinate Systems */}
          <section className="rounded-2xl border border-white/10 bg-[#0b2748] p-6 sm:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Antarctic Map Projections (EPSG:3031 vs WGS84)
            </h2>
            <p className="text-sm leading-relaxed text-[#D6E1F0]">
              Displaying Antarctica in standard latitude/longitude (EPSG:4326 / Plate Carrée) distorts the South Pole into an infinitely stretched line along the bottom of the map. In polar geoscience, standardized projected coordinate systems are used instead:
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-[#D6E1F0]">
              <div className="border border-white/10 rounded-xl p-4 bg-[#071a34]">
                <h4 className="font-bold text-white text-base mb-1">South Polar Stereographic (EPSG:3031)</h4>
                <p className="mb-2">
                  The international standard for Antarctic continental mapping (used by SCAR, BEDMAP, and Quantarctica).
                </p>
                <ul className="space-y-1 text-[#D6E1F0] ml-4 list-disc">
                  <li><strong>True Scale Latitude:</strong> 71°S (standard parallel)</li>
                  <li><strong>Central Meridian:</strong> 0° (Greenwich)</li>
                  <li><strong>Units:</strong> Meters from the South Pole (0, 0)</li>
                </ul>
              </div>

              <div className="border border-white/10 rounded-xl p-4 bg-[#071a34]">
                <h4 className="font-bold text-white text-base mb-1">NSIDC Polar Stereographic (EPSG:3412 / EPSG:3976)</h4>
                <p className="mb-2">
                  The standard projection used for all NASA and NSIDC Sea Ice Index passive microwave products.
                </p>
                <ul className="space-y-1 text-[#D6E1F0] ml-4 list-disc">
                  <li><strong>Grid Resolutions:</strong> 25 km × 25 km and 12.5 km × 12.5 km polar grids</li>
                  <li><strong>Standard Parallel:</strong> 70°S</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Data Formats Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Standard Formats in Polar Science
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/10 bg-[#0b2748] p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#F4C542] mb-1">Standard #1</div>
                <h3 className="text-base font-bold text-white">NetCDF-4 (.nc)</h3>
                <p className="mt-2 text-xs text-[#D6E1F0]">
                  CF-compliant, self-describing, and optimized for multi-dimensional time series. Read natively using <code>xarray</code>.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0b2748] p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#3dd6d0] mb-1">Standard #2</div>
                <h3 className="text-base font-bold text-white">Cloud-Optimized GeoTIFF</h3>
                <p className="mt-2 text-xs text-[#D6E1F0]">
                  Ideal for spatial raster layers (e.g. ice velocity, DEMs) that require direct streaming into QGIS or GIS tools without downloading the whole raster.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0b2748] p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">Standard #3</div>
                <h3 className="text-base font-bold text-white">Zarr (.zarr)</h3>
                <p className="mt-2 text-xs text-[#D6E1F0]">
                  Modern cloud-native chunked format popular in Pangeo workflows for petabyte-scale climate and ocean model simulations.
                </p>
              </div>
            </div>
          </section>

          {/* Next Steps Banner */}
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">Ready to Download Real Polar Datasets?</h3>
              <p className="text-sm text-[#D6E1F0] mt-1">
                Proceed to our data access cookbook covering NASA Earthdata .netrc and Copernicus credentials.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/tutorials/accessing-data"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F4C542] px-5 py-3 text-sm font-semibold text-[#071a34] hover:bg-[#e8ba30] transition-colors"
              >
                Next: Accessing & Downloading →
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
              >
                Search Catalogue
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default GettingStartedEO;
