import React from 'react';

import translationImage from '@/public/assets/strategy_translation.png';
import { GoArrowUpRight } from 'react-icons/go';
import Image from 'next/image';

const StrategyTranslation = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-[#F8F8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
        {/* Left Content Area */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src={translationImage}
            alt="Product Interface showing challenges and data"
            className="w-full object-cover"
          />
        </div>

        {/* Right Image Area */}
        <div className="w-full md:w-1/2 text-start md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900/90 leading-tight mb-6">
           Strategy Translation
          </h2>
          <div className="text-lg  text-gray-700 mb-8 space-y-4 max-w-xl lg:mx-auto md:mx-0">
            <p>Bridge the gap between strategy and execution with our empowering platform, achieving your desired outcomes in today's dynamic business landscape.</p>
            <p>Translate your strategies into actions and measurable success with our platform, which seamlessly integrates change management and proactive culture. Our system fosters strategic thinking and collaboration among stakeholders, enabling smooth transitions and widespread acceptance for staying ahead and securing both short-term and long-term success.</p>
            
            
            
          </div>
        <a href='get-a-demo' className="btn flex w-fit pt-3 pb-2 px-4 text-center gap-2 bg-blue-700 text-white font-semibold rounded-lg  hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
            Translate
            <GoArrowUpRight className="ml-2" size={30} />
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default StrategyTranslation;