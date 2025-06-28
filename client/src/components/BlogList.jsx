import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [menu, setMenu] = useState("All");

  const filteredBlogs = blog_data.filter((blog) =>
    menu === "All" ? true : blog.category === menu
  );

  return (
    <div className="px-4">
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              className={`relative z-10 cursor-pointer text-gray-500 transition-colors duration-300 ${
                menu === item && "text-white px-4 pt-0.5"
              }`}
              onClick={() => setMenu(item)}
            >
              {item}
              {menu === item && (
                <motion.div
                  transition={{ type: "spring", stiffness: 1000, damping: 180 }}
                  layoutId="underline"
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;