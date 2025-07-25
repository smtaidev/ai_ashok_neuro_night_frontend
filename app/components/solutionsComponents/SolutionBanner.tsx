import React from 'react'
import HeroImage from '@/public/assets/c_ai.png'
import { GoArrowUpRight } from 'react-icons/go';
import Image from 'next/image';
const SolutionBanner = () => {
  return (
    <section className="w-full h-full bg-gradient-to-r from-[#0043E2] to-[#D95F8A] md:min-h-96 py-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Content Area */}
            <div className="w-full md:w-1/2 text-start md:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                Take control of your strategy now
              </h1>
              <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl ">
                Your business strategy has never been easier or more robust. Our AI-powered innovative solution streamlines the entire journey and enables you to succeed fast.
              </p>
              <a href='get-a-demo' className="btn flex w-fit pt-3 pb-2 px-4 text-center gap-2 font-semibold bg-blue-50/10 text-white rounded-lg  hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
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
  )
}

export default SolutionBanner