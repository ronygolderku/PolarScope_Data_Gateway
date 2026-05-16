import React, { useState } from "react";
import {
  FaBook,
  FaChartBar,
  FaHome,
  FaSearch,
  FaBars,
  FaChevronLeft,
  FaGlobe,
} from "react-icons/fa";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import aceasLogo from "../assets/ACEAS-Logo.png";

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const location = useLocation();

  // Auto open/close sidebar on resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  // Function to determine active link for multiple paths
  const isCatalogActive = () => {
    return (
      location.pathname.startsWith("/catalog") ||
      location.pathname.startsWith("/themes") ||
      location.pathname.startsWith("/products") ||
      location.pathname.startsWith("/eo-missions") ||
      location.pathname.startsWith("/variables")
    );
  };

  return (
    <div className={`drawer ${isSidebarOpen ? "lg:drawer-open" : ""} mx-auto h-screen overflow-hidden`}>
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isSidebarOpen}
        onChange={toggleSidebar}
      />
      <div className="drawer-content transition-all duration-300 h-screen flex flex-col overflow-hidden">
        {/* Navbar */}
        <nav className="navbar sticky top-0 z-5 w-full bg-[#0F2D57] border-b border-[#1B457A]">
          <button
            aria-label="toggle sidebar"
            className="btn btn-square btn-ghost"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaChevronLeft /> : <FaBars />}
          </button>
          <div className="px-4 text-3xl font-bold text-[#F4C542]">
            PolarScope: Antarctic & Southern Ocean Data Gateway
          </div>
        </nav>

        {/* Page content */}
        <div className="flex-1 min-h-0 overflow-auto bg-transparent">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-4"
          className="drawer-overlay"
          onClick={closeSidebar}
        ></label>
        <div className="flex min-h-full flex-col items-start bg-[#0F2D57] border-r border-[#1B457A] w-64 text-[#F8FAFC]">
          {/* Logo Section */}
          <Link to="/" className="w-full p-3 flex justify-center border-b border-[#1B457A]">
            <div className="w-full rounded-lg bg-[#143A6A] p-1 shadow-sm">
              <img
                src={aceasLogo}
                alt="ACEAS Logo"
                className="w-full max-h-28 h-auto rounded-md object-contain"

              />
            </div>
          </Link>

          <ul className="menu w-full grow">
            {/* Home */}
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleLinkClick}
              >
                <FaHome /> Homepage
              </NavLink>
            </li>

            {/* Catalog (multiple paths active) */}
            <li>
              <NavLink
                to="/catalog"
                className={() => (isCatalogActive() ? "active" : "")}
                onClick={handleLinkClick}
              >
                <FaBook /> Catalog
              </NavLink>
            </li>

            {/* Metrics */}
            <li>
              <NavLink
                to="/metrics"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleLinkClick}
              >
                <FaChartBar /> Metrics
              </NavLink>
            </li>

            {/* Search */}
            <li>
              <NavLink
                to="/search"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={handleLinkClick}
              >
                <FaSearch /> Search
              </NavLink>
            </li>

            {/* BGC-Argo */}
            <li>
              <NavLink
                to="/bgc-argo"
                className={() => (location.pathname.startsWith("/map") || location.pathname.startsWith("/bgc-argo") ? "active" : "")}
                onClick={handleLinkClick}
              >
                <FaGlobe /> BGC-Argo
              </NavLink>
            </li>
          </ul>

          {/* Footer Section */}
          <div className="w-full p-4 border-t border-[#1B457A] text-center">
            <p className="text-xs text-[#D6E1F0]">© 2026 ACEAS</p>
            <p className="text-xs text-[#D6E1F0] mt-1">PolarScope Data Gateway</p>
            <p className="text-xs text-[#D6E1F0] mt-2">
              <a
                href="mailto:communications@antarcticscience.utas.edu.au"
                className="underline"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
