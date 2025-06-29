import React from "react";
import { NavLink, Outlet } from "react-router"; // fixed import
import { FaHome, FaChartPie, FaPlusCircle, FaUsers } from "react-icons/fa"; // import icons

const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-primary text-white lg:hidden px-4">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 font-semibold text-lg ml-2">Dashboard</div>
        </div>

        {/* Routed Child Page */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-2 text-[16px] font-medium">
          <li>
            <NavLink to="/" end>
              <FaHome className="mr-2" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/overview">
              <FaChartPie className="mr-2" />
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/createGroup">
              <FaPlusCircle className="mr-2" />
              Create Group
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myGroups">
              <FaUsers className="mr-2" />
              My Groups
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
