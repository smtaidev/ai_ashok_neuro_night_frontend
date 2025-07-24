import React from "react";

import HeroImage from "@/public/assets/top_banner_image.png";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="  py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-300/70 rounded-full blur-3xl opacity-30 z-0"></div>
        {/* Left Content Area */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black leading-tight mb-6">
            Prioritize faster, act quicker, win sooner
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl mx-auto md:mx-0">
            The only platform for seamless strategy development, communication,
            and translation into strategic actions.
          </p>
          <a href='get-a-demo' className="btn flex w-fit pt-3 pb-2 px-4 text-center gap-2 bg-blue-700 text-white font-semibold rounded-lg  hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
            Get Started
            <GoArrowUpRight className="ml-2" size={30} />
            {/* Right arrow icon */}
          </a>
        </div>

        {/* Right Image Area */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          {/* Placeholder image - replace with your actual image path */}
          <Image
            src={HeroImage}
            alt="Product Screenshot"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );  
};

export default Hero;
