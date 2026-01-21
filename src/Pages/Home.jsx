import React, { useEffect, useState } from "react";
import { FaChartBar, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";

const Home = () => {
  const [themes, setThemes] = useState([]);
  const navigate = useNavigate();

  // JSON data fetch korar jonno
  useEffect(() => {
    fetch("/data/themes/catalog.json")
      .then((res) => res.json())
      .then((data) => {
        const childThemes = data.links.filter((link) => link.rel === "child");
       setThemes(childThemes);
      })
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);
   console.log(themes)
  return (
    <div className="min-h-screen bg-base-100 p-6 md:p-12">
      {/* Hero/Header Section */}
      <header className="max-w-7xl mx-auto mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
          Welcome to the Open Science Catalog
        </h1>
        <p className="text-lg text-gray-700 max-w-4xl">
          A catalog of publicly available geoscience products, datasets and
          resources developed in the frame of scientific research Projects
          funded by Asutralian Center of Excellence in Antarctic Science
          (ACEAS). Products vary in geographical and temporal extent, production
          methodology, validation and quality. Please refer to the documentation
          of each product for details
        </p>

        <p className="font-bold text-black my-2">
          What products can I find here?
        </p>
        <p>
          The majority of pages on opensciencedata.esa.int only hold metadata
          for each product and project. The actual data and its documentation
          are maintained and accessible at the data providers, outside of
          esa.int, for the majority of cases. This catalog provides the metadata
          and links to the data as it exists in those many other locations.
        </p>
        <p className="mt-2">
          Explore the catalog, consisting of{" "}
          <a
            href=""
            className="underline font-semibold text-green-600 hover:text-green-800"
          >
            Themes
          </a>
        </p>
        <p className="mt-2">
          Choose a theme below to explore available products/projects or
          programmatically access the catalog via the{" "}
          <a
            href=""
            className="underline font-semibold text-green-600 hover:text-green-800"
          >
            API Documentation
          </a>
          !
        </p>

        <p className="mt-2">
          To suggest changes and/or contribute to continuously growing number of
          available products, you can register here, and make your contribution
          to the catalog!
        </p>
        <p>
          If you have any questions or feedback regarding Open Science Catalog,
          please contact us at{" "}
          <a
            href=""
            className="underline font-semibold text-green-600 hover:text-green-800"
          >
            opensciencedata@esa.int.
          </a>
        </p>

        <div className="flex gap-4 mt-6">
          <button className="btn btn-neutral btn-sm rounded-md shadow-md capitalize">
            <FaChartBar></FaChartBar>
            Metrics
          </button>
          <button className="btn btn-outline btn-neutral btn-sm rounded-md capitalize">
            <FaSearch></FaSearch>
            Search
          </button>
        </div>
      </header>

      {/* Themes Grid */}
       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  );
};

export default Home;
