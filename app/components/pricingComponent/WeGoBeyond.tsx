import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const WeGoBeyond = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-10 p-6 py-20">
     <p className="text-lg md:text-2xl lg:text-4xl text-[#111827] font-semibold leading-[50px]">
  At Clarhet,{" "}
  <span className="font-bold bg-[#DBEAFE] px-3 py-1 rounded">we go beyond</span>{" "}
  conventional solutions. Our product is engineered to solve your strategy journey. With a
  focus on developing and translating strategy into actions, we bring unmatched value to
  businesses like yours.
</p>

      <p className="text-lg md:text-2xl lg:text-4xl font-thin text-[#111827] leading-[50px]">
        Ready to experience the difference? Discover how our tailored solutions can elevate your business.
      </p>
       <a href='get-a-demo' className="btn flex w-fit pt-3 pb-2 px-4 text-center gap-2 bg-blue-700 text-white font-semibold rounded-lg  hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
                  Get Started
                  <GoArrowUpRight className="ml-2" size={30} />
                  {/* Right arrow icon */}
                </a>
    </div>
  );
};

export default WeGoBeyond;
