import React from "react";
import { NavLink } from "react-router-dom";
import { FaPlus, FaList, FaComments, FaTachometerAlt } from "react-icons/fa";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
      isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="w-64 border-r border-gray-200 p-4 bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
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
