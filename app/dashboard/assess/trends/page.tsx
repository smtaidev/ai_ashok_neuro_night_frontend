import Image from 'next/image';
import React from 'react';
import trendImage from "@/public/image/trends-img.png"


const TopTrends = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="mb-6 flex justify-center" >
        <Image
          src={trendImage}
          alt="Description of image"
          width={950}
          height={300}
          className="rounded-lg  mb-4"
        />
      </div>
      <h2 className="text-xl font-semibold mb-4">Top Trends</h2>
      <p className=" mb-4">
        Business trends refer to changes in consumer behavior, market dynamics, and technologies that can significantly impact markets and industries. Recognizing and adapting to these trends can be a game-changer for businesses that aim to achieve longevity and resilience.
      </p>
      <div className="space-y-10">
        <div className="flex items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22398A] text-gray-200 text-sm ">01</div>
              <h3 className="text-md font-semibold text-gray-900">Circular Economy Practices</h3>
            </div>
            <p className="">
              Embracing circular economy principles, including recycling and responsible waste management, aligns with sustainability trends. Monsters, Inc. may explore ways to minimize environmental impact and enhance resource efficiency in its operations.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22398A] text-gray-200 text-sm ">02</div>
              <h3 className="text-md font-semibold text-gray-900">Carbon Offsetting Initiatives</h3>
            </div>
            <p className="">
              As companies strive for carbon neutrality, there may be increased interest in offsetting emissions. Monsters, Inc. could explore initiatives or partnerships that contribute to carbon offset programs, reinforcing its commitment to environmental responsibility.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22398A] text-gray-200 text-sm ">03</div>
              <h3 className="text-md font-semibold text-gray-900">Smart Grid Technology</h3>
            </div>
            <p className="">
              The integration of smart grid technologies allows for more efficient energy distribution and consumption. Monsters, Inc. might consider investing in smart grid solutions to enhance overall operational efficiency and sustainability.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22398A] text-gray-200 text-sm ">04</div>
              <h3 className="text-md font-semibold text-gray-900">Green Certification and Labeling</h3>
            </div>
            <p className="">
              Consumers are increasingly seeking products and services with green certifications. Monsters, Inc. could explore obtaining relevant certifications to showcase its commitment to sustainability and appeal to environmentally conscious customers.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22398A] text-gray-200 text-sm ">05</div>
              <h3 className="text-md font-semibold text-gray-900">Renewable Energy Integration</h3>
            </div>
            <p className="">
              Increasing emphasis on integrating renewable energy sources such as solar and wind into the energy mix may impact Monsters, Inc.s reliance on scream-based energy. Exploring complementary technologies or hybrid approaches could align the company with emerging trends.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end items-center space-x-4">
        <a href="#" className="text-[#22398A] font-semibold hover:underline">More info</a>
        <button className="bg-[#22398A] text-white px-4 py-2 rounded-lg hover:bg-[#1D2A6D]">Get Started</button>
      </div>
    </div>
  );
};

export default TopTrends;