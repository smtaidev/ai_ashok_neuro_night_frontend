import React from 'react';
import report_1 from '@/public/image/report-1.svg';
import Image from 'next/image';
import StrategicContext from '@/components/admin/reports/StrategicContext';
// import StrategyPulse from './_components/StrategyPulse';




const Page = () => {
  return (
    <div className='min-h-screen w-full px-6'>
   <div className=" flex gap-4   border-b-[1px] border-b-blue-800/20">
        <Image src={report_1} alt="NovaEdge Logo" width={50} height={50} className='mx-4' />
      <div className="text-[#1E3A8A] font-poppins text-[26px] font-semibold leading-[140%]">
        <p>NovaEdge PLC. — Reports</p>
      <p className="text-[#231F20] font-normal text-base mt-1 mb-4">
        The executive summary provides an overview of the key points and insights from this report. It is designed to help stakeholders quickly grasp the essential details.
      </p>
      </div>
    </div>
      {/*
    <StrategyPulse/> */}

    <div>
      <h3 className="text-[#0B1C33] font-poppins text-[26px] font-semibold leading-[140%]">
        Strategic Context
      </h3>
      <StrategicContext />
    </div>
    </div>
  );
};

export default Page;