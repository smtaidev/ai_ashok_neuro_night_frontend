// app/before-page.tsx or wherever it's located
import Image from "next/image";
import swotImage from "@/public/image/swot-img.png";



const SwotStartPage = () => {
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
            <a href="#"  className="text-[#22398A] font-semibold hover:underline cursor-pointer">
          More info
        </a>
        <button className="bg-[#22398A] text-white px-4 py-2 rounded-lg hover:bg-[#1D2A6D]">Get Started</button>
      </div>
        </div>
      </div>
    </div>
  );
  
};

export default SwotStartPage;
