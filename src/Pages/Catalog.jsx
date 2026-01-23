import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaThLarge, FaList, FaSortAmountDown, FaSortAmountUp, FaBook } from "react-icons/fa";

const Catalog = () => {
  const navigate = useNavigate();
  const [themes, setThemes] = useState([]);
  const [catalogInfo, setCatalogInfo] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    // Fetch Themes Catalog as the MAIN info for this page
    fetch(`/data/themes/catalog.json`)
      .then((res) => res.json())
      .then(async (data) => {
        setCatalogInfo(data);
        const childLinks = data.links.filter((link) => link.rel === "child");
        
        // Fetch details for each theme
        const themesWithDetails = await Promise.all(
            childLinks.map(async (link) => {
                const themePath = link.href.replace("./", "/data/themes/");
                try {
                    const res = await fetch(themePath);
                    const details = await res.json();
                    return {
                        ...link,
                        id: details.id, 
                        title: details.title,
                        description: details.description,
                        updated: details.updated,
                        // Construct image path: /data/themes/atmosphere/EO_Atmosphere.webp
                        image: `/data/themes/${details.id}/EO_${details.title}.webp`
                    };
                } catch (e) {
                    console.error("Failed to fetch theme details", e);
                    return link;
                }
            })
        );
        setThemes(themesWithDetails);
      })
      .catch((err) => console.error("Error fetching themes:", err));
  }, []);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
             <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {catalogInfo?.title || "Themes"}
                </h1>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="text-gray-400">in</span> 
                    <span className="text-[#009d9a] font-semibold">Open Science Catalog</span>
                    <div className="flex gap-1 ml-4">
                        <button className="btn btn-xs btn-outline rounded-sm flex items-center gap-1">Up</button>
                        <button className="btn btn-xs btn-outline rounded-sm flex items-center gap-1"><FaBook className="text-xs"/> Overview</button>
                    </div>
                </div>
             </div>
             <button className="btn btn-sm btn-outline gap-2 hidden md:flex">
                 <FaBook /> Source
             </button>
        </div>
      </div>

      {/* Description & Metadata Section */}
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
             <h2 className="text-2xl font-bold text-gray-700 mb-3">Description</h2>
             <p className="text-gray-700 leading-relaxed text-justify">
                {catalogInfo?.description || "Loading description..."}
             </p>
        </div>

        {/* Metadata Section */}
        <div className="lg:w-1/3">
             <h2 className="text-2xl font-bold text-gray-700 mb-3">Metadata</h2>
             <div>
                 <h3 className="font-bold text-gray-900 mb-2 text-sm">General</h3>
                 <div className="bg-gray-50 border border-gray-200 rounded p-3">
                     <div className="flex justify-between text-sm items-center">
                         <span className="font-bold text-gray-700">Updated</span>
                         <span className="text-gray-600">
                             {catalogInfo?.updated ? new Date(catalogInfo.updated).toLocaleString() : 'Loading...'}
                         </span> 
                     </div>
                 </div>
             </div>
        </div>
      </div>


      {/* Catalogs List Section */}
      <div className="space-y-4 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div className="flex items-center gap-2">
                 <h2 className="text-2xl font-bold text-gray-700">Catalogs</h2>
                 <span className="badge badge-neutral rounded-full text-xs">{themes.length}</span>
             </div>

             <div className="flex flex-wrap gap-2">
                <div className="join">
                    <button 
                    className={`btn btn-sm join-item ${viewMode === 'tiles' ? 'btn-active' : ''}`}
                    onClick={() => setViewMode('tiles')}
                    >
                        <FaThLarge /> <span className="hidden sm:inline">Tiles</span>
                    </button>
                    <button 
                    className={`btn btn-sm join-item ${viewMode === 'list' ? 'btn-active' : ''}`}
                    onClick={() => setViewMode('list')}
                    >
                        <FaList /> <span className="hidden sm:inline">List</span>
                    </button>
                </div>
                <div className="join">
                    <button 
                    className={`btn btn-sm join-item ${sortOrder === 'asc' ? 'btn-active' : ''}`}
                    onClick={() => setSortOrder('asc')}
                    >
                        <FaSortAmountUp /> <span className="hidden sm:inline">Ascending</span>
                    </button>
                    <button 
                    className={`btn btn-sm join-item ${sortOrder === 'desc' ? 'btn-active' : ''}`}
                    onClick={() => setSortOrder('desc')}
                    >
                        <FaSortAmountDown /> <span className="hidden sm:inline">Descending</span>
                    </button>
                </div>
             </div>
          </div>

          <div className="relative">
             <FaBook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input type="text" placeholder="Filter catalogs by title, description or keywords" className="input input-bordered w-full pl-10" />
          </div>

        <div className={`grid ${viewMode === 'tiles' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {themes.map((theme, index) => (
            <div
              key={index}
              onClick={() => navigate(`/themes/${theme.id}`)}
              className={`cursor-pointer bg-white group ${
                  viewMode === 'list' 
                  ? 'flex flex-col md:flex-row gap-6 border-b border-gray-100 last:border-0 pb-6 hover:bg-gray-50 transition-colors' 
                  : 'rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition border-l-4 border-l-transparent hover:border-l-[#009d9a]'
              }`}
            >
              <div className={`flex-1 ${viewMode === 'list' ? '' : ''}`}>
                  <h3 className={`font-bold text-lg mb-2 text-[#003366] group-hover:text-[#009d9a] capitalize ${viewMode === 'list' ? 'text-xl' : ''}`}>
                    {theme.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-3">
                    {theme.description || "No description available."}
                  </p>
              </div>
              
              {/* Image in List View (Right Side) */}
              {viewMode === 'list' && theme.image && (
                  <div className="w-full md:w-48 h-32 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      <img src={theme.image} alt={theme.title} className="w-full h-full object-cover" />
                  </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
