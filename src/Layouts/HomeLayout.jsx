import React, { useState } from "react";
import {
  FaBook,
  FaChartBar,
  FaHome,
  FaSearch,
  FaBars,
  FaChevronLeft,
} from "react-icons/fa";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import aseasLogo from "../assets/Aseaslogo.jpg";

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
      location.pathname.startsWith("/products")
    );
  };

  return (
    <div className={`drawer ${isSidebarOpen ? "lg:drawer-open" : ""} mx-auto`}>
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isSidebarOpen}
        onChange={toggleSidebar}
      />
      <div className="drawer-content transition-all duration-300">
        {/* Navbar */}
        <nav className="navbar sticky top-0 z-5 w-full bg-base-300">
          <button
            aria-label="toggle sidebar"
            className="btn btn-square btn-ghost"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaChevronLeft /> : <FaBars />}
          </button>
          <div className="px-4 text-3xl font-bold text-secondary">
            PolarScope: Antarctic & Southern Ocean Data Gateway
          </div>
        </nav>

        {/* Page content */}
        <Outlet />
      </div>

      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-4"
          className="drawer-overlay"
          onClick={closeSidebar}
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 w-64">
          {/* Logo Section */}
          <Link to="/" className="w-full p-6 pb-4 flex flex-col items-center border-b border-gray-300">
            <img
              src={aseasLogo}
              alt="ACEAS Logo"
              className="w-full h-auto object-contain mb-3"
            />
            <h3 className="text-sm font-bold text-center text-gray-700 leading-tight">
              Australian Center of Excellence in Antarctic Science
            </h3>
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
          </ul>

          {/* Footer Section */}
          <div className="w-full p-4 border-t border-gray-300 text-center">
            <p className="text-xs text-gray-600">
              © 2026 ACEAS
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PolarScope Data Gateway
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
