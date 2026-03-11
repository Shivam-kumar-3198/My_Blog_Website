import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BlogList from "../components/BlogList";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full overflow-x-hidden font-sans bg-white">
      
      {/* Top Navigation */}
      <Navbar />
      
      {/* Primary Page Content */}
      <main className="flex-grow flex flex-col w-full">
        <Header />
        
        <div className="w-full">
          <BlogList />
        </div>
        
        {/* Newsletter section pushed towards the bottom of the main content */}
        <div className="w-full mt-8 sm:mt-12 md:mt-16">
          <Newsletter />
        </div>
      </main>
      
      {/* Footer automatically pinned to the bottom */}
      <Footer />
      
    </div>
  );
};

export default Home;