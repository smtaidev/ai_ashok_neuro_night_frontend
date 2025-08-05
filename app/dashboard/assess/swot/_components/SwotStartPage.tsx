// app/before-page.tsx or wherever it's located
"use client";
import Image from "next/image";
import swotImage from "@/public/image/swot-img.png";
import Drawer from "@/app/dashboard/blueprint/vision/_comoponents/DrawarModal";
import { useState } from "react";



const SwotStartPage = () => {

   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
    const handleMoreInfoClick = () => {
      setIsDrawerOpen(true);
    };
  
    const handleCloseDrawer = () => {
      setIsDrawerOpen(false);
    };
  return (
    <div className="bg-blue-50/50 min-h-[calc(100vh-65px)] p-5">
      <div className="space-y-10 p-5 bg-white rounded-2xl border border-gray-200">
       
        <div className="flex justify-center w-8/12 mx-auto items-center flex-col">
          <Image src={swotImage} 
          width={600}
          height={300}
          alt="swot image" />
          <h1 className="py-10 text-sm lg:text-base">
            SWOT analysis is crucial for strategic decision-making. It evaluates internal strengths, weaknesses, external opportunities, and threats. Business leaders can create robust and actionable strategies by regularly reviewing and adapting the SWOT analysis. It sets the stage for strategic excellence.
          </h1>
         

          {/* Now using the client component */}
          <div className="mt-6 flex justify-end items-center space-x-8">
            <a href="#" onClick={handleMoreInfoClick} className="text-[#22398A] font-semibold hover:underline cursor-pointer">
              More info
            </a>
            <button className="bg-[#22398A] text-white px-4 py-2 rounded-lg hover:bg-[#1D2A6D]">Get Started</button>
          </div>
        </div>
      </div>

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

export default SwotStartPage;
