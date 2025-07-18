import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary font-semibold text-gray-800">
          <p>New: AI Feature Integrated</p>
          <img src={assets.star_icon} alt="Star Icon" className="w-3 h-3" />
        </div>
      </div>

      <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-[4.5rem] text-center text-gray-700">
        Your own <span className="text-primary">blogging</span> platform.
      </h1>

      <p className="my-6 sm:my-8 max-w-2xl mx-auto text-sm sm:text-base text-gray-700 text-center">
        This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.
      </p>


      <form className="flex jusitfy-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden">
        <input type="text" placeholder="Search for blogs" className="w-full pl-4 outline-none" required/>
        <button type="submit" className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer">Search</button>
      </form>

      <img
        src={assets.gradientBackground}
        alt="Background Gradient"
        className="absolute -top-20 z-[-1] opacity-50"
      />
    </div>
  );
};

export default Header;
