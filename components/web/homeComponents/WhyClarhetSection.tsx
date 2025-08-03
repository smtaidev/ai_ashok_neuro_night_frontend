import React from 'react';
import whyImage from '@/public/assets/why_clarhet.png'
import FAQSection from './FAQSection';
import Image from 'next/image';

const WhyClarhetSection = () => {
  return (
    <section className="bg-gray-50 pt-12 md:pt-16 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
        {/* Heading and Subtitle */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900/90 mb-4">Why Clarhet?</h2>
        <p className="text-lg text-gray-600 mb-10">Learn What Sets Us Apart</p>

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content Area */}
          <div className="w-full md:w-1/2 text-start md:text-left">
            <FAQSection />

          </div>

          {/* Right Image Area */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <Image
              src={whyImage}

              alt="Product Interface showing challenges and data"
              className="w-full object-cover"
            />
          </div>


        </div>
      </div>
    </section>
  );
};

export default WhyClarhetSection;