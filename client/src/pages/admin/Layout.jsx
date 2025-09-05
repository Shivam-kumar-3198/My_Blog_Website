import React from "react";
import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  // const navigate = useNavigate();
  const { axios, setToken, navigate } = useAppContext(); // ✅ from context

  const logout = () => {
    // ✅ Clear token and user info
    localStorage.removeItem("token");
    axios.defaults.headers.common['Authorization'] = null;
    localStorage.removeItem("user");
    setToken(null); // ✅ update context so ProtectedRoute reacts immediately

    // ✅ Redirect to login
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
