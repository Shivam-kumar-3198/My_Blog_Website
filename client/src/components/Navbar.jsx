import React from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img src={assets.logo} alt="Brand Logo" className="w-32 sm:w-44 cursor-pointer" />

      <button
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200"
        aria-label="Login to your account"
      >
        <span>Login</span>
        <img src={assets.arrow} alt="Login Arrow Icon" className="w-3" />
      </button>
    </div>
  );
};

export default Navbar;
