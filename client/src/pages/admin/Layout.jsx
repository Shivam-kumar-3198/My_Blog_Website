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
    <div className="flex flex-col h-[100dvh] bg-gray-50 overflow-hidden font-sans">
      
      {/* Header */}
      <header className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-10 bg-white border-b border-gray-100 shadow-sm shrink-0 z-10">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-28 sm:w-36 md:w-40 cursor-pointer hover:opacity-80 transition-opacity duration-200 object-contain"
          onClick={() => navigate("/")}
        />
        
        <button
          onClick={logout}
          className="text-xs sm:text-sm font-medium px-5 sm:px-8 py-2 sm:py-2.5 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </header>

      {/* Sidebar + Main Content Wrapper */}
      {/* ✅ FIX APPLIED HERE: Added flex-col md:flex-row */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative">
        
        {/* Sidebar Component */}
        <Sidebar />
        
        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto w-full scroll-smooth bg-gray-50">
          <Outlet />
        </main>

      </div>
      
    </div>
  );
};

export default Layout;