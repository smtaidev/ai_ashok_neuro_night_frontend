import React from 'react';
import report_1 from '@/public/image/report-1.svg';
import Image from 'next/image';
import StrategyPulse from './_components/StrategyPulse';




const Page = () => {
  return (
    <div>
        {/* header  */}
    <div className=" flex gap-4   border-b-2 border-b-blue-800/20">
        <Image src={report_1} alt="NovaEdge Logo" width={50} height={50} className='mx-4' />
      <div className="text-[#1E3A8A] text-[26px] font-semibold flex flex-col gap-2">
        <p>NovaEdge PLC. — Reports</p>
      <p className="text-[#231F20] text-base mt-1 mb-4">
        The executive summary provides an overview of the key points and insights from this report. It is designed to help stakeholders quickly grasp the essential details.
      </p>
      </div>
    </div>
    <StrategyPulse/>
    </div>
  );
};

export default Page;