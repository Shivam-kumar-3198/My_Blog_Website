import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              className={`cursot-pointer text-gray-500 ${
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
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      <div>{/* blog cards */}</div>
    </div>
  );
};

export default BlogList;
