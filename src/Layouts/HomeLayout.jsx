import React, { useState } from "react";
import { FaBook, FaChartBar, FaHome, FaSearch, FaBars, FaChevronLeft } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";

const HomeLayout = () => {
  // Initialize based on screen width (lg breakpoint is 1024px)
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  // Handle window resize to auto-close/open based on breakpoint
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Auto-close on mobile only
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={`drawer ${isSidebarOpen ? 'lg:drawer-open' : ''}  mx-auto`}>
      <input 
        id="my-drawer-4" 
        type="checkbox" 
        className="drawer-toggle" 
        checked={isSidebarOpen}
        onChange={toggleSidebar}
      />
      <div className="drawer-content transition-all duration-300">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <button
            aria-label="toggle sidebar"
            className="btn btn-square btn-ghost"
            onClick={toggleSidebar}
          >
            {/* Sidebar toggle icon */}
            {isSidebarOpen ? (
               <FaChevronLeft className="size-5" />
            ) : (
               <FaBars className="size-5" />
            )}
          </button>
          <div className="px-4 text-3xl font-bold text-secondary">
            PolarScope: Antarctic & Southern Ocean Data Gateway
          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible z-50">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={closeSidebar}
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
           

            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home page"
                onClick={handleLinkClick}
              >
                {/* Home icon */}
                <FaHome></FaHome>
                <span className="">Homepage</span>
              </Link>
            </li>

            {/* our  links */}
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Catalog"
                onClick={handleLinkClick}
              >
                <FaBook></FaBook>
                <span className="">Catalog</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Metrics"
                onClick={handleLinkClick}
              >
                <FaChartBar></FaChartBar>
                <span className="">Metrics</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip=" Search"
                onClick={handleLinkClick}
              >
                <FaSearch></FaSearch>
                <span className="">Search</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
