import React from 'react';
import adaptiveImage from '@/public/assets/adaptive_strategies_rooted_in_problem_solving.png';
import { GoArrowUpRight } from 'react-icons/go';
import Image from 'next/image';

const AdaptiveStrategiesSection = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Content Area */}
        <div className="w-full md:w-1/2 text-start md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900/90 leading-tight mb-6">
            Adaptive strategies 
            rooted in problem-solving
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl lg:mx-auto md:mx-0">
            Our AI-powered platform drives organizations through strategy development, creating
            adaptive and aligned strategies for current and future challenges. Address your most
            critical challenges strategically, and stay ahead with us.
          </p>
          <a href='get-a-demo' className="btn flex w-fit pt-3 pb-2 px-4 text-center gap-2 bg-blue-700 text-white font-semibold rounded-lg  hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
            Solve
            <GoArrowUpRight className="ml-2" size={30} />
          </a>
        </div>

        {/* Right Image Area */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src={adaptiveImage}
            alt="Product Interface showing challenges and data"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AdaptiveStrategiesSection;