import React, { useEffect, useMemo, useState } from "react";
import {
  FaBookOpen,
  FaCube,
  FaGlobe,
  FaLayerGroup,
  FaSatelliteDish,
  FaSearch,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import homepageImg from "../assets/homepage.png";
import ResourceCard from "../components/ResourceCard";
import Loading from "./Loading";

const Home = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const resourceCards = useMemo(() => [
    {
      to: "/eo-missions",
      title: "Satellite missions",
      description: "Explore missions, sensors, and observation platforms.",
      icon: FaSatelliteDish,
    },
    {
      to: "/themes",
      title: "Research themes",
      description: "Browse datasets by science focus and research area.",
      icon: FaLayerGroup,
    },
    {
      to: "/variables",
      title: "Environmental variables",
      description: "Find the measurements used across the catalogue.",
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

  return (
    <div className="min-h-screen bg-transparent text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-12">

          <section className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-center">
            <div className="space-y-5">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#F4C542]">
                <FaGlobe /> Antarctic and Southern Ocean data
              </p>
              <h1 className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                Discover Antarctic and Southern Ocean datasets.
              </h1>
              <p className="max-w-xl text-lg text-[#D6E1F0] leading-relaxed">
                Search satellite, ocean, and environmental data from trusted providers. We link you to the source—the data stays with its owner.
              </p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const query = searchQuery.trim();
                  navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
                }}
                className="flex flex-col sm:flex-row gap-3 pt-2"
              >
                <label className="relative flex-1">
                  <span className="sr-only">Search datasets</span>
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F4C542]" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search by dataset, mission, or keyword"
                    className="h-12 w-full rounded-lg border border-white/20 bg-[#0b2748] pl-11 pr-4 text-sm text-white placeholder-[#D6E1F0]/75 outline-none focus:border-[#F4C542] focus:ring-2 focus:ring-[#F4C542]/30"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#F4C542] px-6 font-semibold text-[#0F2D57] shadow-lg hover:bg-[#e8ba30] transition-colors"
                >
                  Search
                </button>
                <Link
                  to="/catalog"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <FaBookOpen />
                  Browse all data
                </Link>
              </form>
              <p className="text-sm text-[#D6E1F0]">
                {themes.length} research themes · searchable catalogue
              </p>
            </div>

            <div className="h-56 sm:h-72 lg:h-[26rem] overflow-hidden rounded-xl border border-white/10 shadow-2xl">
              <img
                src={homepageImg}
                alt="Antarctica and the Southern Ocean from above"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </section>

          <section className="space-y-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Explore by</h2>
              <p className="mt-2 text-[#D6E1F0]">Choose the route that matches how you are starting your search.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resourceCards.map((card) => (
                <ResourceCard key={card.to} {...card} />
              ))}
            </div>
          </section>

          <section className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-white">Need help getting started?</h2>
              <p className="mt-1 text-sm text-[#D6E1F0]">Read the guide or learn how the catalogue is organised.</p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <Link to="/getting-started" className="text-[#F4C542] hover:text-white transition-colors">Getting started</Link>
              <Link to="/documentation" className="text-[#F4C542] hover:text-white transition-colors">Documentation</Link>
              <Link to="/metrics" className="text-[#F4C542] hover:text-white transition-colors">Catalogue metrics</Link>
            </div>
          </section>

          <p className="max-w-3xl text-xs leading-5 text-[#D6E1F0]/75">
            PolarScope lists datasets from external providers. Always check the original documentation to confirm that a product fits your research.
          </p>

          <footer className="-mx-4 sm:-mx-6 lg:-mx-8 mt-4 px-4 sm:px-6 lg:px-8 py-6 bg-[#123f71] border-y border-[#3dd6d0]/25 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-[#D6E1F0]">
            <div>
              <p className="font-semibold text-white">ACEAS Project Office</p>
              <p className="mt-1">Questions, corrections, or dataset suggestions?</p>
            </div>
            <a
              href="mailto:ACEAS.Project.Office@utas.edu.au"
              className="font-semibold text-[#F4C542] hover:text-white transition-colors"
            >
              Contact us
            </a>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default Home;
