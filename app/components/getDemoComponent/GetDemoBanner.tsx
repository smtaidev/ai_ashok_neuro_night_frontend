import React from 'react'
import HeroImage from '@/public/assets/c_ai.png'
import { GoArrowUpRight } from 'react-icons/go';
import Image from 'next/image';
const GetDemoBanner = () => {
  return (
    <section className="w-full h-full bg-[#1E3A8A] md:min-h-96 py-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Content Area */}
            <div className="w-full md:w-1/2 text-start md:text-left">
              <h1 className='text-white text-6xl md:text-5xl lg:text-6xl text-center font-bold'>Driving Business Success</h1>
             
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

export default GetDemoBanner