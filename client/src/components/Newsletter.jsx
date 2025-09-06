import React from "react";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-12">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog!</h1>
      <p className="md:text-lg text-gray-500/70 pb-8 max-w-xl">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>

      <form className="flex items-center max-w-2xl w-full md:h-13 h-12">
        <input
          type="email"
          placeholder="Enter your email id"
          className="border border-gray-300 h-full border-r-0 outline-none w-full rounded-l-md px-3 text-gray-500"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-r-md"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;