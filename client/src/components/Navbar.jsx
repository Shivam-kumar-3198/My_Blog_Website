import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();



  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Brand Logo"
        className="w-32 sm:w-44 cursor-pointer"
      />

      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 bg-violet-900 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-200 cursor-pointer"
        aria-label="Login to your account"
      >
        <span>Login</span>
        <img src={assets.arrow} alt="Login Arrow Icon" className="w-3" />
      </button>
    </div>
  );
};

export default Navbar;
