




"use client";
import Image from "next/image";
import humanImage from "@/public/image/business-goals-img.png"


const Business = () => {



  return (
    <div className="mx-auto py-12 bg-gray-50 p-6">
      <div className="w-full ml-3 md:h-[400px] space-y-6 bg-white p-12 mb-12 md:flex justify-between items-center rounded-lg shadow-md gap-4">
        {/* text left side  */}
        <div className="flex-1 space-y-4 md:text-left">
          <p className="text-base text-[#231f20] mt-2 leading-relaxed">
            Track and analyze key financial metrics that influence strategy
            development and execution. This component helps you monitor revenue,
            expenses, cash flow, and credit risks to align financials with the
            strategic direction.
          </p>
        </div>
        <div className="flex-none mr-20 w-full md:w-[400px]">
          <Image
            src={humanImage}
            alt="Financial Overview Image"
            layout="responsive"
            width={400}
            height={400}
          />
        </div>
      </div>
      
      
    </div>
  );
};

export default Business;