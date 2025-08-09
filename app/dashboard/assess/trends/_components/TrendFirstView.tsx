"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import Drawer from '@/app/dashboard/blueprint/vision/_comoponents/DrawarModal';
import trendImage from "@/public/image/trends-img.png";
import Link from 'next/link';


const TrendFirstView = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMoreInfoClick = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6 flex justify-center">
        <Image
          src={trendImage}
          alt="Description of image"
          width={950}
          height={300}
          className="rounded-lg mb-4"
        />
      </div>
      <h2 className="text-xl font-semibold mb-4">Top Trends</h2>
      <p className="text-gray-600 mb-4">
        Business trends refer to changes in consumer behavior, market dynamics, and technologies that can significantly impact markets and industries. Recognizing and adapting to these trends can be a game-changer for businesses that aim to achieve longevity and resilience.
      </p>
      <div className="space-y-10">
        <div className="flex items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22398A] text-gray-200 text-sm font-semibold">01</div>
              <h3 className="text-md font-semibold text-gray-900">Circular Economy Practices</h3>
            </div>
            <p className="text-gray-600">
              Embracing circular economy principles, including recycling and responsible waste management, aligns with sustainability trends. Monsters, Inc. may explore ways to minimize environmental impact and enhance resource efficiency in its operations.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22398A] text-gray-200 text-sm font-semibold">02</div>
              <h3 className="text-md font-semibold text-gray-900">Carbon Offsetting Initiatives</h3>
            </div>
            <p className="text-gray-600">
              As companies strive for carbon neutrality, there may be increased interest in offsetting emissions. Monsters, Inc. could explore initiatives or partnerships that contribute to carbon offset programs, reinforcing its commitment to environmental responsibility.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22398A] text-gray-200 text-sm font-semibold">03</div>
              <h3 className="text-md font-semibold text-gray-900">Smart Grid Technology</h3>
            </div>
            <p className="text-gray-600">
              The integration of smart grid technologies allows for more efficient energy distribution and consumption. Monsters, Inc. might consider investing in smart grid solutions to enhance overall operational efficiency and sustainability.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22398A] text-gray-200 text-sm font-semibold">04</div>
              <h3 className="text-md font-semibold text-gray-900">Green Certification and Labeling</h3>
            </div>
            <p className="text-gray-600">
              Consumers are increasingly seeking products and services with green certifications. Monsters, Inc. could explore obtaining relevant certifications to showcase its commitment to sustainability and appeal to environmentally conscious customers.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22398A] text-gray-200 text-sm font-semibold">05</div>
              <h3 className="text-md font-semibold text-gray-900">Renewable Energy Integration</h3>
            </div>
            <p className="text-gray-600">
              Increasing emphasis on integrating renewable energy sources such as solar and wind into the energy mix may impact Monsters, Inc.s reliance on scream-based energy. Exploring complementary technologies or hybrid approaches could align the company with emerging trends.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end items-center space-x-4">
        <a href="#" onClick={handleMoreInfoClick} className="text-[#22398A] font-semibold hover:underline cursor-pointer">
          More info
        </a>
        <Link href="/dashboard/create-trend">
          <button className="bg-[#22398A] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#1D2A6D]">Get Started</button>
        </Link>
      </div>

      {/* Drawer Component */}
      <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} title="More Information">
        <div className="p-4  rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            Business trends refer to changes in consumer behaviors, market dynamics, and technologies that can significantly impact markets and industries. Recognizing and adapting to these trends can be a game-changer for businesses that aim to achieve longevity and resilience.
          </p>
        </div>
        <div className="p-4   rounded-lg mb-4 border border-gray-200">
          <h3 className=" text-lg font-semibold text-black mb-2">The Importance of Identifying Trends:</h3>
          <p className="text-gray-800 mb-3">
            <span className='text-gray-800 font-semibold'>Innovation Catalyst:</span> Trends often signify opportunities for innovation. By identifying emerging patterns, businesses can position themselves as industry leaders, driving creativity and staying relevant in a competitive environment.
          </p>
          <p className="text-gray-800 mb-3">
            <span className='text-gray-800 font-semibold'>Customer-Centric Approach:</span> Successful business strategies require understanding consumer behavior. By staying attuned to trends, companies can tailor their products and services to meet evolving customer needs, enhancing satisfaction and loyalty.
          </p>
          <p className="text-gray-800 mb-3">
            <span className='text-gray-800 font-semibold'>Risk Mitigation:</span> Anticipating and adapting to trends can serve as a buffer against market uncertainties. Businesses that are agile and responsive to change are better equipped to navigate challenges and capitalize on new opportunities.
          </p>
          <p className="text-gray-800 mb-3">
            <span className='text-gray-800 font-semibold'>Strategic Planning:</span> Incorporating trend analysis into strategic planning enables businesses to shape their future proactively.
          </p>
          <p className="text-gray-800 mb-3">
            <span className='text-gray-800 font-semibold'>Adaptability::</span> Markets are in a constant state of flux. Recognizing trends allows businesses to adapt their strategies quickly, ensuring they remain relevant and resilient in the face of change.
          </p>
        </div>
        <div className="p-4   rounded-lg mb-4 border border-gray-200">
          <h3 className=" text-lg font-semibold text-black mb-2">Ways for Spotting Trends:</h3>
          <p className="text-gray-800 mb-3">
            <span className='text-gray-800 font-semibold'>Market Research:</span> Regular and comprehensive market research is essential. Utilize surveys, interviews, and data analysis to gain insights into consumer preferences, competitor strategies, and industry developments.
          </p>
          <p className="text-gray-800 mb-3">
            <span className='text-gray-800 font-semibold'>Technology Monitoring:</span>  Keep a close eye on technological advancements. Engage with industry publications, attend conferences, and network with professionals to stay informed.
          </p>
          <p className="text-gray-800 mb-3">
            <span className='text-gray-800 font-semibold'>Social Listening:</span> Monitor social media platforms and online forums to gauge public sentiment. Consumers often express their opinions and preferences online, providing a real-time snapshot of emerging trends.
          </p>
          <p className="text-gray-800 mb-3">
            <span className='text-gray-800 font-semibold'>Competitor Analysis: </span>  Analyze competitors performance, identify what works well for them, and how you can adapt or differentiate your approach.
          </p>
          <p className="text-gray-800 mb-3">
            <span className='text-gray-800 font-semibold'>Collaboration and Partnerships: :</span> Collaborate with other businesses, startups, or research institutions. Partnerships can expose you to new ideas and technologies, fostering a culture of innovation within your organization.
          </p>
        </div>
        <div className="p-4  rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
           <span className='text-gray-800 font-semibold'> Note: </span> Not all trends impact the future of your business equally. Some trends may be just noises, and some would significantly impact your industry. The feedback from your employees, Innovation capabilities, customers, vendors, and suppliers will help you determine the trends you should integrate into your strategic direction.
          </p>
        </div>
      </Drawer>
    </div>
  );
};

export default TrendFirstView;