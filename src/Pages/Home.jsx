import React, { useEffect, useMemo, useState } from "react";
import {
  FaBookOpen,
  FaChartBar,
  FaCube,
  FaFish,
  FaGlobe,
  FaLayerGroup,
  FaSatelliteDish,
  FaSearch,
  FaShieldAlt,
} from "react-icons/fa";
import { Link } from "react-router";
import homepageImg from "../assets/homepage.png";
import aceasLogo from "../assets/ACEAS-Logo.png";
import ResourceCard from "../components/ResourceCard";
import Loading from "./Loading";

const Home = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const resourceCards = useMemo(() => [
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
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 flex flex-col gap-10">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-7 overflow-hidden rounded-3xl border border-white/10 bg-[#0F2D57] shadow-[0_24px_80px_rgba(2,10,24,0.32)]">
              <div className="relative h-full min-h-[320px] sm:min-h-[420px]">
                <img
                  src={homepageImg}
                  alt="Satellite imagery over the Southern Ocean, illustrating research and observation coverage"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071a34] via-[#071a34]/55 to-[#071a34]/15" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#D6E1F0]">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                      <FaGlobe />
                    </span>
                    ACEAS Open Science Catalogue
                  </div>

                  <div className="max-w-2xl space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#D6E1F0] backdrop-blur-sm">
                      <FaShieldAlt className="text-[#F4C542]" />
                      Discovery portal for Antarctic and Southern Ocean data
                    </div>

                    <div className="space-y-4">
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white text-balance">
                        A clear, trusted gateway to Antarctic and Southern Ocean data.
                      </h1>
                      <p className="max-w-xl text-sm sm:text-base lg:text-lg leading-7 text-[#D6E1F0]">
                        Browse curated Earth observation missions, thematic collections, variables, and products maintained by contributing data providers.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Link
                        to="/catalog"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F4C542] px-5 py-3 text-sm sm:text-base font-semibold text-[#0F2D57] shadow-md transition-colors hover:bg-[#e8ba30]"
                      >
                        <FaBookOpen />
                        Open catalog
                      </Link>
                      <Link
                        to="/search"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm sm:text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                      >
                        <FaSearch />
                        Search records
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#0b2748] p-6 sm:p-8 shadow-[0_18px_60px_rgba(2,10,24,0.22)]">
              <div className="flex items-center gap-3">
                <img
                  src={aceasLogo}
                  alt="Australian Centre for Excellence in Antarctic Science logo"
                  className="h-14 w-14 rounded-xl bg-white/5 p-2 object-contain"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">
                    Supported by ACEAS
                  </p>
                  <p className="text-sm text-[#D6E1F0]">
                    Australian Centre for Excellence in Antarctic Science
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-semibold text-white">{themes.length}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.22em] text-[#D6E1F0]">Themes</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-semibold text-white">5</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.22em] text-[#D6E1F0]">Entry points</div>
                </div>
              </div>

              <div className="space-y-4 pt-1">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                    Catalogue overview
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#D6E1F0]">
                    This portal focuses on metadata, access links, and discovery. It does not host the underlying datasets, which remain with the original providers.
                  </p>
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#143A6A] p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#F4C542]">
                    <FaSearch />
                    Quick access
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link to="/getting-started" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10">
                      Getting Started
                    </Link>
                    <Link to="/tutorials" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10">
                      Tutorials
                    </Link>
                    <Link to="/metrics" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10">
                      Metrics
                    </Link>
                    <Link to="/eo-missions" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10">
                      Missions
                    </Link>
                    <Link to="/variables" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10">
                      Variables
                    </Link>
                    <Link to="/bgc-argo" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F8FAFC] transition-colors hover:bg-white/10">
                      BGC Argo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-[#143A6A] p-6 shadow-sm">
              <h3 className="text-lg font-semibold tracking-tight text-white">Focused discovery</h3>
              <p className="mt-3 text-sm leading-6 text-[#D6E1F0]">
                Search and browse without noise. Entry points are grouped by collection type so users can move quickly to the right source.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#143A6A] p-6 shadow-sm">
              <h3 className="text-lg font-semibold tracking-tight text-white">Transparent sourcing</h3>
              <p className="mt-3 text-sm leading-6 text-[#D6E1F0]">
                Each record links back to the provider of record, keeping the catalogue lightweight and easier to maintain.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#143A6A] p-6 shadow-sm">
              <h3 className="text-lg font-semibold tracking-tight text-white">Research-ready context</h3>
              <p className="mt-3 text-sm leading-6 text-[#D6E1F0]">
                Metadata, coverage, and supporting context are presented together so researchers can assess fit before leaving the site.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#0b2748] p-6 sm:p-8 shadow-[0_18px_60px_rgba(2,10,24,0.18)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">Browse</p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  Main entry points
                </h2>
                <p className="mt-2 max-w-2xl text-sm sm:text-base leading-6 text-[#D6E1F0]">
                  Use these sections to move directly into the major collections and product categories.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#D6E1F0]">
                <span className="h-2 w-2 rounded-full bg-[#F4C542]" />
                5 curated entry points
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {resourceCards.map((card) => (
                <ResourceCard key={card.to} {...card} />
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-[#143A6A] p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-semibold tracking-tight text-white">About the catalogue</h3>
              <p className="mt-4 text-sm sm:text-base leading-7 text-[#D6E1F0]">
                The catalogue provides metadata and links to externally hosted datasets. The data products themselves remain managed by the original providers, so this portal stays focused on discovery and access.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#143A6A] p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-semibold tracking-tight text-white">Contribute</h3>
              <p className="mt-4 text-sm sm:text-base leading-7 text-[#D6E1F0]">
                Suggestions for additional datasets or improvements are welcome. The goal is to keep the catalogue relevant, accurate, and easy to use.
              </p>
            </div>
          </section>

          <section className="bg-[#1B457A]/50 p-6 md:p-8 rounded-2xl border-l-4 border-[#F4C542]">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F4C542] mb-4">Disclaimer</h3>
            <p className="text-sm sm:text-base lg:text-[1.05rem] leading-7 sm:leading-8 text-left no-break text-[#D6E1F0]">
              Inclusion of a dataset or product in this catalogue does not imply endorsement, ranking, certification, or recommendation by the catalogue
              team, ACEAS, or participating institutions. The catalogue does not assess which product is "best" for a given scientific or operational
              application. Products vary in methodology, validation, spatial and temporal coverage, and intended use. Users are encouraged to consult the
              original dataset documentation and providers for product-specific guidance and suitability.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0b2748] to-[#143A6A] p-6 md:p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4C542]">
              Contact
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
              Get in touch with the ACEAS project office
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-7 text-[#D6E1F0]">
              Questions, corrections, or dataset suggestions can be sent directly to the project office.
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

export default Home;
