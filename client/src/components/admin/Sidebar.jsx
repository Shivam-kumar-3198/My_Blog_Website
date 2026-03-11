import React from "react";
import { NavLink } from "react-router-dom";
import { FaPlus, FaList, FaComments, FaTachometerAlt } from "react-icons/fa";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
      isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="w-full md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 p-4 flex flex-col md:min-h-screen sticky top-0 z-20 md:static shadow-sm md:shadow-none">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
      </div>
      <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <NavLink to="/admin" end className={linkClasses}>
          <FaTachometerAlt /> Dashboard
        </NavLink>
        <NavLink to="/admin/add-blog" className={linkClasses}>
          <FaPlus /> Add Blog
        </NavLink>
        <NavLink to="/admin/list-blog" className={linkClasses}>
          <FaList /> List Blogs
        </NavLink>
        <NavLink to="/admin/comments" className={linkClasses}>
          <FaComments /> Comments
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
