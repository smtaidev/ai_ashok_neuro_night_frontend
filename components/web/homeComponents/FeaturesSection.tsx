import React from 'react';
import AiPower1 from '@/public/assets/ai_power_1.svg'
import AiPower2 from '@/public/assets/ai_power_2.svg'
import AiPower3 from '@/public/assets/ai_power_3.svg'
import { GoArrowRight } from 'react-icons/go';
import Image from 'next/image';

const FeaturesSection = () => {
  const features = [
    {
      // Replace 'path/to/your/icon1.png' with the actual path to your image asset
      iconSrc: AiPower1,
      altText: 'Collaboration Icon',
      title: 'Collaboratively develop, communicate, and translate strategies from day one.',
      link: 'get-a-demo',
    },
    {
      // Replace 'path/to/your/icon2.png' with the actual path to your image asset
      iconSrc:AiPower2,
      altText: 'Cost Savings Icon',
      title: 'Say goodbye to expensive consultants.',
      link: 'get-a-demo',
    },
    {
      // Replace 'path/to/your/icon3.png' with the actual path to your image asset
      iconSrc: AiPower3,
      altText: 'Alignment Icon',
      title: 'Alignment from the boardroom to the newest team member.',
      link: 'get-a-demo',
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 lg:py-32">
      <div className="p-6 max-w-7xl mx-auto ">
        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-16 leading-tight">
          Discover <span className="bg-gradient-to-r from-[#0043E2] to-[#D95F8A] bg-clip-text font-extrabold text-transparent">AI powered</span> agile, effective, and
          <br className="hidden md:inline" /> efficient strategy development, communication,
          <br className="hidden md:inline" /> and translation into actions.
        </h2>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-5 flex flex-col items-start text-left border border-gray-200 hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Image Icon */}
              <div className="mb-4">
                <Image src={feature.iconSrc} alt={feature.altText} className="w-16 h-16 bg-blue-100/50 rounded-full object-contain" />
              </div>
              <p className="text-lg text-black/70 font-semibold mb-6 flex-grow">
                {feature.title}
              </p>
            
              <a href={feature.link} className="absolute bottom-4 right-4 font-semibold md:text-base duration-300 hover:-translate-x-2  flex items-center">
                Learn More
               <GoArrowRight className='pl-2' size={30} />
              </a>
            
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
