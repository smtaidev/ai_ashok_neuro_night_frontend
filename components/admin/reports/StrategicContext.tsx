import React from "react";

const StrategicContext = () => {
  return (
    <>
      <div className="flex gap-5 mt-5 mb-10">
        <div className="border rounded-md w-3/5 border-[#DAE3F8] bg-white flex py-5 flex-col items-start gap-[15px] flex-1 self-stretch">
          <h6 className="text-[#1E3A8A] pl-7.5 font-poppins text-[18px] font-normal leading-normal">
            Statement
          </h6>
          <div className="border-t border-[#DAE3F8] gap-[10px] self-stretch py-5 px-[30px]">
            <h5 className="text-[#1E3A8A] font-poppins text-[26px] font-normal leading-normal">
              Vision Statement
            </h5>
            <p className="text-[#323232] font-poppins text-[16px] font-normal leading-normal">
              Your strategy demonstrates strong internal logic and-alignment
              with organizational purpose. However, several key trends are
              unaddressed, and some goals depend on underdeveloped capabilities
            </p>
          </div>
        </div>
        <div className="border rounded-md w-3/5 border-[#DAE3F8] bg-white flex py-5 flex-col items-start gap-[15px] flex-1 self-stretch">
          <h5 className="text-[#1E3A8A] pl-7.5 font-poppins text-[18px] font-normal leading-normal">
            Score
          </h5>
          <div className="border-t border-[#DAE3F8] gap-[10px] self-stretch py-5 px-[30px]">
            <h5 className="text-[#1E3A8A] font-poppins text-[26px] font-normal leading-normal">
              Vision Score
            </h5>
            <h6 className="text-[#1E3A8A] font-poppins text-[42px] font-bold leading-normal">
              50
            </h6>
            <p className="text-[rgba(50,50,50,0.7)] font-poppins text-[12px] font-normal leading-normal w-[230px]">
              A vision score of 50 or higher is considered a guiding and
              compelling vision.
            </p>
          </div>
        </div>
      </div>
      <div
        className="rounded-[12px] border border-[#DAE3F8] bg-white flex flex-col
        items-start gap-[15px] self-stretch py-5"
      >
        <h6 className="text-[#1E3A8A] pl-7.5 font-poppins text-lg font-normal leading-normal">
          Strategic Fit
        </h6>
        <div className="border-t border-[#DAE3F8] flex items-center gap-14 self-stretch py-5 px-7.5">
          <div>
            <h6 className="text-[#1E3A8A] font-poppins text-[26px] font-normal leading-normal">
              Strategic Fit Score
            </h6>
            <p className="text-[#1E3A8A] font-poppins text-[42px] font-bold leading-normal">
              73
              <span className="text-[#1E3A8A]  text-[18px] font-normal">
                / 100
              </span>
            </p>
            <div></div>
            <h5 className="text-[#1E3A8A] font-poppins text-[26px] font-normal leading-normal">
              Strategic Fit Score Summary
            </h5>
            <p className="text-[#323232] font-poppins text-[16px] font-normal leading-normal">
              Your strategy demonstrates strong internal logic and-alignment
              with organizational purpose. However, several key trends are
              unaddressed, and some goals depend on underdeveloped capabilities
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default StrategicContext;
