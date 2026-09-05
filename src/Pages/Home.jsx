import React, { useEffect, useMemo, useState } from "react";
import {
  FaBookOpen,
  FaCube,
  FaGlobe,
  FaLayerGroup,
  FaSatelliteDish,
  FaSearch,
  FaGraduationCap,
  FaQuestionCircle,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import homepageImg from "../assets/homepage.png";
import ResourceCard from "../components/ResourceCard";
import Loading from "./Loading";

const Home = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showWelcome, setShowWelcome] = useState(
    !localStorage.getItem('polarscope-visited')
  );
  const navigate = useNavigate();

  const resourceCards = useMemo(() => [
    {
      to: "/eo-missions",
      title: "Satellite missions",
      description: "Explore missions, sensors, and observation platforms.",
      tooltip: "Browse by Earth Observation satellites like Sentinel-3, MODIS, CryoSat-2, and PACE",
      icon: FaSatelliteDish,
    },
    {
      to: "/themes",
      title: "Research themes",
      description: "Browse datasets by science focus and research area.",
      tooltip: "Organized by Atmosphere, Ocean, and Cryosphere research",
      icon: FaLayerGroup,
    },
    {
      to: "/variables",
      title: "Environmental variables",
      description: "Find the measurements used across the catalogue.",
      tooltip: "Search by what you measure: temperature, salinity, chlorophyll, sea ice, etc.",
      icon: FaCube,
    },
  ], []);

  useEffect(() => {
    fetch("/data/themes/catalog.json")
      .then((res) => res.json())
      .then((data) => {
        const childThemes = data.links.filter((link) => link.rel === "child");
        setThemes(childThemes);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  };

  const dismissWelcome = () => {
    localStorage.setItem('polarscope-visited', 'true');
    setShowWelcome(false);
  };

  const handleExampleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-12">

          {/* First Time Welcome Banner */}
          {showWelcome && (
            <div className="bg-[#3dd6d0]/10 border border-[#3dd6d0]/30 rounded-xl p-4 flex items-center justify-between gap-4">
              <p className="text-sm text-white flex items-center gap-2 flex-wrap">
                <span className="text-xl">👋</span>
                <span><strong>First time here?</strong></span>
                <Link to="/getting-started" className="text-[#F4C542] hover:underline font-semibold">
                  Take a 2-minute tour
                </Link>
                <span className="text-[#D6E1F0]">or</span>
                <Link to="/tutorials" className="text-[#F4C542] hover:underline font-semibold">
                  see example workflows
                </Link>
              </p>
              <button
                onClick={dismissWelcome}
                className="text-white/60 hover:text-white text-2xl leading-none flex-shrink-0"
                aria-label="Dismiss welcome message"
              >
                <FaTimes />
              </button>
            </div>
          )}

          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#F4C542]">
                <FaGlobe />
                <span>Antarctic and Southern Ocean Data</span>
              </div>

              <h1 className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                Discover Antarctic and Southern Ocean datasets.
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-[#D6E1F0] leading-relaxed">
                Search satellite, ocean, and environmental observations from trusted international providers. We connect you directly to the source data.
              </p>

              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 pt-2">
                <label className="relative flex-1">
                  <span className="sr-only">Search datasets</span>
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F4C542]" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search by dataset, mission, or keyword"
                    className="h-12 w-full rounded-xl border border-white/20 bg-[#071a34]/80 backdrop-blur-sm pl-11 pr-4 text-sm text-white placeholder-[#D6E1F0]/75 outline-none focus:border-[#F4C542] focus:ring-2 focus:ring-[#F4C542]/30"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#F4C542] px-6 font-semibold text-[#0F2D57] shadow-lg hover:bg-[#e8ba30] transition-colors"
                >
                  Search
                </button>
                <Link
                  to="/catalog"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 backdrop-blur-sm px-5 font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <FaBookOpen />
                  Browse all data
                </Link>
              </form>

              <div className="flex flex-wrap items-center gap-2 text-xs text-[#D6E1F0]/80">
                <span>Try:</span>
                <button
                  onClick={() => handleExampleSearch('sea ice')}
                  className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[#F4C542] transition-colors"
                  type="button"
                >
                  sea ice
                </button>
                <button
                  onClick={() => handleExampleSearch('chlorophyll')}
                  className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[#F4C542] transition-colors"
                  type="button"
                >
                  chlorophyll
                </button>
                <button
                  onClick={() => handleExampleSearch('MODIS')}
                  className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[#F4C542] transition-colors"
                  type="button"
                >
                  MODIS
                </button>
                <button
                  onClick={() => handleExampleSearch('temperature')}
                  className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[#F4C542] transition-colors"
                  type="button"
                >
                  temperature
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="h-56 sm:h-72 lg:h-[26rem] overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#071a34]">
              <img
                src={homepageImg}
                alt="Antarctica and the Southern Ocean from above"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </section>

          {/* What is PolarScope? Callout */}
          <section className="bg-[#F4C542]/10 border border-[#F4C542]/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <FaQuestionCircle className="text-[#F4C542] text-2xl flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  What is PolarScope?
                </h3>
                <p className="text-sm text-[#D6E1F0] leading-relaxed mb-3">
                  PolarScope is a <strong className="text-white">discovery gateway</strong> — we help you find
                  the right Antarctic and Southern Ocean dataset, then connect you to the
                  organization that hosts it. We don't host data ourselves; we're your
                  starting point for polar research.
                </p>
                <Link
                  to="/getting-started"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#F4C542] hover:text-white transition-colors"
                >
                  Learn how it works <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Explore By Section (Clean 3 Cards) */}
          <section className="space-y-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Explore by</h2>
              <p className="mt-1 text-sm text-[#D6E1F0]">Choose the route that matches how you are starting your search.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {resourceCards.map((card) => (
                <ResourceCard key={card.to} {...card} />
              ))}
            </div>
          </section>


          <p className="max-w-3xl text-xs leading-5 text-[#D6E1F0]/70">
            PolarScope lists datasets from external providers. Always check the original documentation to confirm that a product fits your research.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Home;
