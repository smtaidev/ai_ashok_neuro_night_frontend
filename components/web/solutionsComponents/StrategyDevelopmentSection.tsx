import React from 'react';

import { GoArrowUpRight } from 'react-icons/go';

const StrategyDevelopmentSection = () => {
  return (
    <section className="bg-[#06042C]/5 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row gap-12 items-stretch">
          {/* Left Content Area */}
          <div className="w-full md:w-1/2 bg-white rounded-xl  p-6 md:p-8 lg:p-10 flex flex-col">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
              Strategy development
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-xl">
              Introducing our AI-driven strategy platform! Embrace an agile and adaptive strategy
              journey that aligns short and long-term goals with marketplace realities.
            </p>
            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Eliminate non-productive annual strategic planning and costly consultants. Our platform is
              designed to empower your strategic thinking today.
            </p>
            <div className="mt-auto">
              <a href='get-a-demo' className="btn px-4 py-2 w-fit bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-101 flex items-center">
                Get Started
                <GoArrowUpRight  className="ml-2" size={30} />
              </a>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="w-full md:w-1/2 bg-white rounded-xl p-6 md:p-8 lg:p-10 flex flex-col">
            <ul className="list-none space-y-4 flex-grow">
              {[
                {
                  title: 'Revolutionize Strategy Development with AI-Powered Simplicity:',
                  desc: 'Craft high-impact Agile Strategies for an Evolving Business Landscape',
                },
                {
                  title: 'Say Goodbye to Costly Consultants:',
                  desc: 'Embrace a Vibrant Strategy Narrative with Our Innovative Approach',
                },
                {
                  title: 'Unlock Marketplace Reality:',
                  desc: 'Navigate Success with Our Intuitive Streamlined Approach',
                },
                {
                  title: 'Empower Your Team to Confront Challenges Head-On:',
                  desc: 'Ignite Your Strategic Thinking for a Brighter Future',
                },
                {
                  title: 'Shape Your Success Story Today:',
                  desc: 'Let\'s Embark on a Transformative Strategy Journey with our platform',
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-clarhetBlue text-xl mr-3 mt-1">&#8226;</span>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">{item.title}</span> {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategyDevelopmentSection;
