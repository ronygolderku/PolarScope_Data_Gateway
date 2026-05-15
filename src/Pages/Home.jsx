import React, { useEffect, useState } from "react";
import { FaChartBar, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import homepageImg from "../assets/homepage.png";
import aceasLogo from "../assets/ACEAS-Logo.png";
import Loading from "./Loading";

const Home = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-b from-[#0F2D57] to-[#1B3A5F] text-[#F8FAFC]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 flex flex-col gap-12">
          {/* Hero/Header Section */}
          <section className="flex flex-col gap-8">
          {/* Hero Image */}
            <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group">
              <img
                src={homepageImg}
                alt="homepage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
                <img
                  src={aceasLogo}
                  alt="ACEAS logo"
                  className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto aceas-logo-float"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4C542] leading-tight">
                  Welcome to the Southern Ocean Open Science Catalogue
                </h1>
                
              </div>
              {/* Intro Paragraphs */}
              <div className="flex flex-col gap-4 text-[#D6E1F0]">
                <p className="text-lg sm:text-xl leading-8 text-justify hyphens-auto">
                  The Southern Ocean Open Science Catalogue is a curated gateway to publicly available
                  geoscience datasets, Earth observation products, and scientific resources relevant to the
                  Southern Ocean and Antarctic regions.
                </p>

                <p className="text-lg sm:text-xl leading-8 text-justify hyphens-auto">
                  This initiative is supported by the Australian Centre for Excellence in Antarctic Science
                  (ACEAS) to improve discovery, accessibility, and visibility of open scientific resources
                  across the Southern Ocean and Antarctic research community. The catalogue brings together
                  metadata and access links from multiple external data providers, research programs, and
                  repositories to support open science and interdisciplinary research.
                </p>
              </div>

              {/* Resources Section */}
              <div className="bg-[#143A6A] p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#1B457A]">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] mb-3">Explore Available Resources</h2>
                <p className="text-[#D6E1F0] mb-4 text-justify">Browse datasets and products by:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <li>
                    <Link to="/eo-missions" className="flex items-center gap-2 p-3 rounded-lg hover:bg-[#1B457A] transition-colors duration-200 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4C542]"></span>
                      <span className="font-semibold text-[#F8FAFC] group-hover:translate-x-1 transition-transform duration-200">Satellite Earth Observation Missions</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/themes" className="flex items-center gap-2 p-3 rounded-lg hover:bg-[#1B457A] transition-colors duration-200 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4C542]"></span>
                      <span className="font-semibold text-[#F8FAFC] group-hover:translate-x-1 transition-transform duration-200">Themes</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/variables" className="flex items-center gap-2 p-3 rounded-lg hover:bg-[#1B457A] transition-colors duration-200 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4C542]"></span>
                      <span className="font-semibold text-[#F8FAFC] group-hover:translate-x-1 transition-transform duration-200">Variables</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="flex items-center gap-2 p-3 rounded-lg hover:bg-[#1B457A] transition-colors duration-200 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4C542]"></span>
                      <span className="font-semibold text-[#F8FAFC] group-hover:translate-x-1 transition-transform duration-200">Products</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/bgc-argo" className="flex items-center gap-2 p-3 rounded-lg hover:bg-[#1B457A] transition-colors duration-200 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4C542]"></span>
                      <span className="font-semibold text-[#F8FAFC] group-hover:translate-x-1 transition-transform duration-200">BGC Argo</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Info Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* About Card */}
                <div className="bg-[#143A6A] p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#1B457A]">
                  <h3 className="text-2xl font-bold text-[#F8FAFC] mb-4">About the Catalogue</h3>
                  <p className="text-[#D6E1F0] leading-7 text-justify hyphens-auto">
                    The catalogue primarily provides metadata and links to externally hosted datasets. In most cases, the underlying
                    data products remain maintained and distributed by the original data providers. This platform is intended as a
                    discovery and access portal and does not host or manage any of the datasets listed.
                  </p>
                </div>

                {/* Contribute Card */}
                <div className="bg-[#143A6A] p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#1B457A]">
                  <h3 className="text-2xl font-bold text-[#F8FAFC] mb-4">Contribute</h3>
                  <p className="text-[#D6E1F0] leading-7 text-justify hyphens-auto">
                    We welcome community contributions and suggestions for additional datasets and products relevant to the Southern
                    Ocean and Antarctic regions.
                  </p>\n                </div>
              </div>

              {/* Disclaimer Card */}
              <div className="bg-[#1B457A]/50 p-6 md:p-8 rounded-2xl border-l-4 border-[#F4C542]">
                <h3 className="text-2xl font-bold text-[#F4C542] mb-4">Disclaimer</h3>
                <p className="text-[#D6E1F0] leading-7 text-justify hyphens-auto">
                  Inclusion of a dataset or product in this catalogue does not imply endorsement, ranking, certification, or recommendation by the catalogue
                  team, ACEAS, or participating institutions. The catalogue does not assess which product is "best" for a given scientific or operational
                  application. Products vary in methodology, validation, spatial and temporal coverage, and intended use. Users are encouraged to consult the
                  original dataset documentation and providers for product-specific guidance and suitability.
                </p>
              </div>

              {/* Contact Section */}
              <div className="bg-gradient-to-r from-[#143A6A] to-[#1B457A] p-6 md:p-8 rounded-2xl border border-[#1B457A]">
                <p className="text-lg text-[#F4C542] font-semibold mb-2">
                  📧 Get in Touch
                </p>
                <p className="text-[#D6E1F0]">
                  Have questions or feedback? Contact us at:
                </p>
                <a
                  href="mailto:communications@antarcticscience.utas.edu.au"
                  className="inline-block mt-3 px-4 py-2 bg-[#F4C542] hover:bg-[#E5B933] text-[#0F2D57] font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  communications@antarcticscience.utas.edu.au
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/metrics" className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group">
                  <FaChartBar className="group-hover:scale-110 transition-transform duration-200" />
                  View Metrics
                </Link>
                <Link to="/search" className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group">
                  <FaSearch className="group-hover:scale-110 transition-transform duration-200" />
                  Search Catalog
                </Link>
              </div>
            </div>
          </section>

          {/* Themes Grid */}
          <section className="flex flex-col gap-8">
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => {
            const folder = theme.href.split("/")[1]; // atmosphere, cryosphere, oceans
            const imgPath = `/data/themes/${folder}/EO_${theme.title}.webp`;

            return (
              <div
                key={theme.title}
                onClick={() => navigate(`/themes/${folder}`)}
                className="group relative h-72 w-full overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
              >
                {/* Background Image */}
                <img
                  src={imgPath}
                  alt={theme.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay & Text */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-2 border-white/80 rounded-full flex items-center justify-center backdrop-blur-md mb-4 group-hover:border-white transition-all">
                      <div className="w-10 h-10 rounded-full border border-dashed border-white/60 animate-pulse"></div>
                    </div>

                    <h2 className="text-white text-2xl font-black tracking-[0.2em] uppercase drop-shadow-lg">
                      {theme.title}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
