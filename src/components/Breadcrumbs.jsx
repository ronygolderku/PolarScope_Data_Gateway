import React from "react";
import { Link } from "react-router";
import { FaChevronRight, FaHome } from "react-icons/fa";

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-[#D6E1F0]">
      <ol className="inline-flex items-center space-x-1 sm:space-x-2">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[#D6E1F0] hover:text-[#F4C542] transition-colors"
          >
            <FaHome className="text-xs" />
            <span>Home</span>
          </Link>
        </li>
        <li className="flex items-center">
          <FaChevronRight className="text-[10px] text-white/30" />
          <Link
            to="/tutorials"
            className="ml-1 sm:ml-2 text-[#D6E1F0] hover:text-[#F4C542] transition-colors"
          >
            Tutorials
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              <FaChevronRight className="text-[10px] text-white/30" />
              {isLast || !item.to ? (
                <span className="ml-1 sm:ml-2 font-medium text-[#F4C542] truncate max-w-[200px] sm:max-w-xs">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="ml-1 sm:ml-2 text-[#D6E1F0] hover:text-[#F4C542] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
