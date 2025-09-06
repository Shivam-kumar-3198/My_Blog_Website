import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext(); // ✅ use context instead of localStorage

  const handleClick = () => {
    if (token) {
      navigate("/admin"); // or /dashboard depending on your routes
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Brand Logo"
        className="w-32 sm:w-44 cursor-pointer"
      />

      <button
        onClick={handleClick}
        className="flex items-center gap-2 bg-violet-800 text-white px-4 py-2 rounded-full hover:bg-violet-600 transition duration-200 cursor-pointer"
        aria-label="Login to your account"
      >
        <span>{token ? "Dashboard" : "Login"}</span>
        <img src={assets.arrow} alt="Login Arrow Icon" className="w-3" />
      </button>
    </div>
  );
};

export default Navbar;
