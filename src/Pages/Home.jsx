import React, { useEffect, useState } from "react";
import { FaChartBar, FaCube, FaFish, FaLayerGroup, FaSatelliteDish, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import homepageImg from "../assets/homepage.png";
import aceasLogo from "../assets/ACEAS-Logo.png";
import ResourceCard from "../components/ResourceCard";
import Loading from "./Loading";

const Home = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const resourceCards = [
    {
      to: "/eo-missions",
      title: "Satellite Earth Observation Missions",
      description: "Explore mission archives, sensors, and observation platforms.",
      icon: FaSatelliteDish,
    },
    {
      to: "/themes",
      title: "Themes",
      description: "Browse the catalogue by research theme and science focus.",
      icon: FaLayerGroup,
    },
    {
      to: "/variables",
      title: "Variables",
      description: "Find the environmental variables used across the catalogue.",
      icon: FaCube,
    },
    {
      to: "/products",
      title: "Products",
      description: "Open data products and curated outputs from providers.",
      icon: FaChartBar,
    },
    {
      to: "/bgc-argo",
      title: "BGC Argo",
      description: "Access biogeochemical float resources and related records.",
      icon: FaFish,
    },
  ];

  const themeImageMap = {
    atmosphere: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=80",
    cryosphere: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1200&q=80",
    oceans: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
  };

  // JSON data fetch korar jonno
  useEffect(() => {
    setLoading(true);
    const startTime = Date.now();

    fetch("/data/themes/catalog.json")
      .then((res) => res.json())
      .then((data) => {
        const childThemes = data.links.filter((link) => link.rel === "child");
        setThemes(childThemes);

        // Minimum 2 seconds loading time ensure kora
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 2000 - elapsedTime);

        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);

        // Error hole o 2 seconds por loading off kora
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 2000 - elapsedTime);

        setTimeout(() => {
          setLoading(false);
        }, remainingTime);
      });
  }, []);
  console.log(themes);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 flex flex-col gap-12">
          {/* Hero/Header Section */}
          <section className="flex flex-col gap-8">
            <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group">
              <img
                src={homepageImg}
                alt="Satellite imagery over the Southern Ocean, illustrating research and observation coverage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
                <img
                  src={aceasLogo}
                  alt="Australian Centre for Excellence in Antarctic Science logo"
                  className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto aceas-logo-float"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance text-[#F4C542]">
                  Welcome to the Southern Ocean Open Science Catalogue
                </h2>
              </div>

              {/* Intro Paragraphs */}
              <div className="flex w-full flex-col gap-4 text-[#D6E1F0] max-w-none">
                <p className="text-base sm:text-lg leading-relaxed text-left no-justify no-break">
                  The Southern Ocean Open Science Catalogue is a curated gateway to public geoscience datasets,
                  Earth-observation products, and research resources focused on the Southern Ocean and
                  Antarctic regions.
                </p>

                <p className="text-base sm:text-lg leading-relaxed text-left no-justify no-break">
                  This initiative is supported by the Australian Centre for Excellence in Antarctic Science
                  (ACEAS) to improve discovery, accessibility, and visibility of open scientific resources
                  across the Southern Ocean and Antarctic research community. The catalogue brings together
                  metadata and access links from multiple external data providers, research programs, and
                  repositories to support open science and interdisciplinary research.
                </p>
              </div>

              {/* Resources Section */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(244,197,66,0.12),_transparent_28%),linear-gradient(135deg,_rgba(20,58,106,0.98),_rgba(15,45,87,0.96))] p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#F4C542]/10 blur-3xl" />
                <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-[#1B457A]/60 blur-3xl" />

                <div className="relative mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#F4C542]">
                      Explore
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance text-[#F8FAFC]">
                      Available Resources
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 text-[#D6E1F0]">
                      Jump into the main catalogue entry points and browse by collection type.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#D6E1F0] backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-[#F4C542]" />
                    5 curated entry points
                  </div>
                </div>

                <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {resourceCards.map((card) => (
                    <ResourceCard key={card.to} {...card} />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/metrics" className="flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group">
                    <FaChartBar className="group-hover:scale-110 transition-transform duration-200" />
                    View Metrics
                  </Link>
                  <Link to="/search" className="flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group">
                    <FaSearch className="group-hover:scale-110 transition-transform duration-200" />
                    Search Catalog
                  </Link>
                </div>

              </div>

              {/* Info Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* About Card */}
                <div className="bg-[#143A6A] p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#1B457A]">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F8FAFC] mb-4">About the Catalogue</h3>
                  <p className="text-sm sm:text-base lg:text-[1.05rem] leading-7 sm:leading-8 text-left no-break text-[#D6E1F0]">
                    The catalogue primarily provides metadata and links to externally hosted datasets. In most cases, the underlying
                    data products remain maintained and distributed by the original data providers. This platform is intended as a
                    discovery and access portal and does not host or manage any of the datasets listed.
                  </p>
                </div>

                {/* Contribute Card */}
                <div className="bg-[#143A6A] p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#1B457A]">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F8FAFC] mb-4">Contribute</h3>
                  <p className="text-sm sm:text-base lg:text-[1.05rem] leading-7 sm:leading-8 text-left no-break text-[#D6E1F0]">
                    We welcome community contributions and suggestions for additional datasets and products relevant to the Southern
                    Ocean and Antarctic regions.
                  </p></div>
              </div>

              {/* Disclaimer Card */}
              <div className="bg-[#1B457A]/50 p-6 md:p-8 rounded-2xl border-l-4 border-[#F4C542]">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F4C542] mb-4">Disclaimer</h3>
                <p className="text-sm sm:text-base lg:text-[1.05rem] leading-7 sm:leading-8 text-left no-break text-[#D6E1F0]">
                  Inclusion of a dataset or product in this catalogue does not imply endorsement, ranking, certification, or recommendation by the catalogue
                  team, ACEAS, or participating institutions. The catalogue does not assess which product is "best" for a given scientific or operational
                  application. Products vary in methodology, validation, spatial and temporal coverage, and intended use. Users are encouraged to consult the
                  original dataset documentation and providers for product-specific guidance and suitability.
                </p>
              </div>

              {/* Contact Section */}
              <div className="bg-gradient-to-r from-[#143A6A] to-[#1B457A] p-6 md:p-8 rounded-2xl border border-[#1B457A]">
                <p className="text-base sm:text-lg font-semibold tracking-wide text-[#F4C542] mb-2">
                  📧 Get in Touch
                </p>
                <p className="text-sm sm:text-base lg:text-[1.05rem] leading-7 no-break text-[#D6E1F0]">
                  Have questions or feedback? Contact us at:
                </p>
                <a
                  href="mailto:communications@antarcticscience.utas.edu.au"
                  className="inline-block mt-3 px-4 py-2 text-sm sm:text-base bg-[#F4C542] hover:bg-[#E5B933] text-[#0F2D57] font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  communications@antarcticscience.utas.edu.au
                </a>
              </div>

              {/* Action Buttons */}

            </div>
          </section>

          {/* Themes Grid */}
          {false && (
            <section className="flex flex-col gap-8">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map((theme) => {
                  const folder = theme.href.split("/")[1]; // atmosphere, cryosphere, oceans
                  const localImage = `/data/themes/${folder}/EO_${theme.title}.webp`;
                  const remoteImage = themeImageMap[folder] || localImage;

                  return (
                    <div
                      key={theme.title}
                      onClick={() => navigate(`/themes/${folder}`)}
                      className="group relative h-72 w-full overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
                    >
                      {/* Background Image */}
                      <img
                        src={remoteImage}
                        alt={theme.title}
                        loading="lazy"
                        onError={(event) => {
                          if (event.currentTarget.dataset.fallbackApplied === "true") return;
                          event.currentTarget.dataset.fallbackApplied = "true";
                          event.currentTarget.src = localImage;
                        }}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Gradient Overlay & Text */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 border-2 border-white/80 rounded-full flex items-center justify-center backdrop-blur-md mb-4 group-hover:border-white transition-all">
                            <div className="w-10 h-10 rounded-full border border-dashed border-white/60 animate-pulse"></div>
                          </div>

                          <h2 className="text-white text-2xl font-black tracking-tight uppercase drop-shadow-lg">
                            {theme.title}
                          </h2>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
