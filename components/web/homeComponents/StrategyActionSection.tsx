import React from 'react';

import adaptiveImage from '@/public/assets/turn_strategy_into_action_with_accountability_and_commitment.png';
import { GoArrowUpRight } from 'react-icons/go';
import Image from 'next/image';

const StrategyActionSection = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-[#F8F8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content Area */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src={adaptiveImage}
            alt="Product Interface showing challenges and data"
            className="w-full object-cover"
          />
        </div>

        {/* Right Image Area */}
        <div className="w-full md:w-1/2 text-start md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900/90 leading-tight mb-6">
           Turn Strategy into Action with Accountability and Commitment
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl lg:mx-auto md:mx-0">
            Revitalize your strategy execution. Our platform enables the smooth translation of strategy into actions, fostering collaboration and aligning topdown directions with bottom-up insights. It ensures commitment, accountability, and visibility into the required resources.
          </p>
         <a href='get-a-demo' className="btn flex w-fit pt-3 pb-2 px-4 text-center gap-2 bg-blue-700 text-white font-semibold rounded-lg  hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
            Translate
            <GoArrowUpRight className="ml-2" size={30} />
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default StrategyActionSection;