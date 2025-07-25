import React from "react";

import image from "@/public/assets/solutions_strategy_communication.png";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";

const StrategyCommunication = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content Area */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src={image}
            alt="Product Interface showing challenges and data"
            className="w-full object-cover"
          />
        </div>

        {/* Right Image Area */}
        <div className="pl-5 md:pl-0 w-full lg:pr-5 md:w-1/2 text-start md:text-left">
          <h2 className="text-2xl  md:text-3xl lg:text-4xl font-black text-gray-900/90 leading-tight mb-6">
            Strategy Communication
          </h2>
          <div className="text-lg  text-gray-700 mb-8 space-y-4 max-w-xl lg:mx-auto md:mx-0">
            <p>Say hello to seamless collaboration. Our platform eliminates
            confusion, removes boring PowerPoints, and connects teams for more</p>
            <p>informed decision-making. Stay organized, beat deadlines, and reach</p>
            <p>your goals hassle-free. Let’s get started for meaningful
            communication and better teamwork!</p>
            
            
          </div>
           <a href='get-a-demo' className="btn flex w-fit pt-3 pb-2 px-4 text-center gap-2 bg-blue-700 text-white font-semibold rounded-lg  hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
                      Communicate
                      <GoArrowUpRight className="ml-2" size={30} />
                    </a>
        </div>
      </div>
    </section>
  );
};

export default StrategyCommunication;
