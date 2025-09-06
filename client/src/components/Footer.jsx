import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3 py-10">
      {/* Footer bottom text */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        © 2025 Shivam — All Rights Reserved.
      </p>

      {/* Footer content layout */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 mt-10">
        {/* Left side: Logo and description */}
        <div className="max-w-lg">
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44 mb-4" />
          <p className="text-gray-600 text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptates sequi nihil dolores aliquam praesentium accusamus
            blanditiis aperiam, rerum reprehenderit, reiciendis culpa debitis
            pariatur optio laudantium?
          </p>
        </div>

        {/* Right side: Footer links in columns */}
        <div className="flex flex-wrap gap-x-10 gap-y-10 md:gap-x-20 md:gap-y-10 justify-start md:justify-end flex-1">
          {footer_data.map((section, index) => (
            <div key={index} className="w-1/2 sm:w-1/3 md:w-auto">
              <h3 className="font-semibold text-base text-gray-900 mb-2 md:mb-5">
                {section.title}
              </h3>
              <ul>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:underline transition text-sm text-gray-600"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;