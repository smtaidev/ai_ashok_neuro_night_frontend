//? previous code 


// "use client";
// import { useGetCapabilitiesDataQuery } from '@/redux/api/foundation/foundationApi';
// import React, { useState } from 'react';

// // A simple utility function to calculate the circumference of a circle
// const calculateCircumference = (radius: number) => 2 * Math.PI * radius;

// const TotalCapabilities = () => {

//   const {data:capabilitysData} = useGetCapabilitiesDataQuery();

//   console.log(capabilitysData);
//   // State for the dynamic data. This is where you would fetch data from an API.
//   const [capabilitiesData, setCapabilitiesData] = useState({
//     total: 50,
//     core: { value: 19, percentage: 38, color: '#f97316' }, // Orange-500
//     differentiating: { value: 31, percentage: 62, host: 62, color: '#3b82f6' }, // Blue-500
//   });

//   // SVG parameters for the donut chart
//   const radius = 80;
//   const strokeWidth = 25;
//   const normalizedRadius = radius - strokeWidth / 2;
//   const circumference = calculateCircumference(normalizedRadius);

//   // Calculate the stroke-dashoffset for each arc
//   const coreStrokeDashoffset = circumference - (capabilitiesData.core.percentage / 100) * circumference;
//   const differentiatingStrokeDashoffset = circumference - (capabilitiesData.differentiating.percentage / 100) * circumference;

//   return (
//     <div className="flex justify-center  ">
//       <div className="bg-white rounded-2xl p-8 w-full ">
//         {/* {JSON.stringify(capabilitysData)} */}
//         {/* Header section */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Total Capabilities ({capabilitiesData.total})
//           </h2>
//           <p className="text-sm text-gray-500">
//             Overview of the Company&#39;s {capabilitiesData.total} Total Capabilities
//           </p>
//         </div>

//         {/* Main content - Donut chart and legend */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//           {/* Donut chart container */}
//           <div className="relative w-40 h-40">
//             {/* SVG for the donut chart */}
//             <svg className="w-full h-full transform -rotate-90">
//               {/* Background circle */}
//               <circle
//                 className="text-gray-200"
//                 strokeWidth={strokeWidth}
//                 stroke="currentColor"
//                 fill="transparent"
//                 r={normalizedRadius}
//                 cx={radius}
//                 cy={radius}
//               />
//               {/* Differentiating arc */}
//               <circle
//                 className="text-[#6284EE]"
//                 strokeWidth={strokeWidth}
//                 strokeDasharray={circumference}
//                 strokeDashoffset={differentiatingStrokeDashoffset}
//                 strokeLinecap="butt"
//                 stroke="currentColor"
//                 fill="transparent"
//                 r={normalizedRadius}
//                 cx={radius}
//                 cy={radius}
//               />
//               {/* Core arc */}
//               <circle
//                 className="text-[#FDA018]"
//                 strokeWidth={strokeWidth}
//                 strokeDasharray={circumference}
//                 strokeDashoffset={coreStrokeDashoffset}
//                 strokeLinecap="butt"
//                 stroke="currentColor"
//                 fill="transparent"
//                 r={normalizedRadius}
//                 cx={radius}
//                 cy={radius}
//                 transform={`rotate(${capabilitiesData.differentiating.percentage * 3.6}, ${radius}, ${radius})`}
//               />
//             </svg>
            
//             {/* Text inside the donut chart */}
//             <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
//               {capabilitiesData.total}
//             </div>
//           </div>

//           {/* Legend and details */}
//           <div className="flex-1 w-full mt-4 md:mt-0">
//             <div className="grid grid-cols-2 text-gray-500 font-semibold mb-2 pb-2 border-b border-gray-200">
//                 <span className="col-span-1">Type</span>
//                 <span className="col-span-1 text-right">Total</span>
//             </div>
            
//             <div className="space-y-4">
//               {/* Core capability row */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 rounded-full bg-[#FDA018]"></div>
//                   <span className="font-semibold text-gray-700">{capabilitiesData.core.percentage}% Core</span>
//                 </div>
//                 <span className="font-medium text-gray-600">{capabilitiesData.core.value}</span>
//               </div>
              
//               {/* Differentiating capability row */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 rounded-full bg-[#6284EE]"></div>
//                   <span className="font-semibold text-gray-700">{capabilitiesData.differentiating.percentage}% Differentiating</span>
//                 </div>
//                 <span className="font-medium text-gray-600">{capabilitiesData.differentiating.value}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* "View Details" link */}
//         <div className="flex justify-end mt-8">
//           <a href="#" className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
//             View Details →
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TotalCapabilities;

"use client";
import { useGetCapabilitiesDataQuery } from "@/redux/api/foundation/foundationApi";
import React, { useMemo } from "react";

const calculateCircumference = (radius: number) => 2 * Math.PI * radius;

const TotalCapabilities = () => {
  const { data: capabilitysData } = useGetCapabilitiesDataQuery();

  console.log(capabilitysData);
  const capabilitiesData = useMemo(() => {
    const list = capabilitysData?.data || [];
    const total = list.length;

    const coreCount = list.filter((item: any) => item.type === "Core").length;
    const diffCount = list.filter(
      (item: any) => item.type === "Differentiating"
    ).length;

    const corePercentage = total > 0 ? Math.round((coreCount / total) * 100) : 0;
    const diffPercentage =
      total > 0 ? Math.round((diffCount / total) * 100) : 0;

    return {
      total,
      core: { value: coreCount, percentage: corePercentage, color: "#FDA018" },
      differentiating: {
        value: diffCount,
        percentage: diffPercentage,
        color: "#6284EE",
      },
    };
  }, [capabilitysData]);

  const radius = 80;
  const strokeWidth = 25;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = calculateCircumference(normalizedRadius);

  const coreStrokeDashoffset =
    circumference - (capabilitiesData.core.percentage / 100) * circumference;
  const differentiatingStrokeDashoffset =
    circumference -
    (capabilitiesData.differentiating.percentage / 100) * circumference;

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 w-full h-full">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">
            Total Capabilities ({capabilitiesData.total})
          </h2>
          <p className="text-sm text-gray-500">
            Overview of the Company&#39;s {capabilitiesData.total} Total
            Capabilities
          </p>
        </div>

        {/* Donut + legend */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-6 sm:gap-8">
          {/* Donut Chart */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background */}
              <circle
                className="text-gray-200"
                strokeWidth={strokeWidth}
                stroke="currentColor"
                fill="transparent"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Differentiating */}
              <circle
                className="text-[#6284EE]"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={differentiatingStrokeDashoffset}
                strokeLinecap="butt"
                stroke="currentColor"
                fill="transparent"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Core */}
              <circle
                className="text-[#FDA018]"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={coreStrokeDashoffset}
                strokeLinecap="butt"
                stroke="currentColor"
                fill="transparent"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                transform={`rotate(${
                  capabilitiesData.differentiating.percentage * 3.6
                }, ${radius}, ${radius})`}
              />
            </svg>

            {/* Number in center */}
            <div className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-bold text-gray-800">
              {capabilitiesData.total}
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 w-full mt-4 md:mt-0">
            <div className="grid grid-cols-2 text-gray-500 font-semibold mb-2 pb-2 border-b border-gray-200">
              <span className="col-span-1">Type</span>
              <span className="col-span-1 text-right">Total</span>
            </div>

            <div className="space-y-4">
              {/* Core */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#FDA018]"></div>
                  <span className="font-semibold text-gray-700">
                    {capabilitiesData.core.percentage}% Core
                  </span>
                </div>
                <span className="font-medium text-gray-600">
                  {capabilitiesData.core.value}
                </span>
              </div>

              {/* Differentiating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#6284EE]"></div>
                  <span className="font-semibold text-gray-700">
                    {capabilitiesData.differentiating.percentage}%
                    Differentiating
                  </span>
                </div>
                <span className="font-medium text-gray-600">
                  {capabilitiesData.differentiating.value}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer link */}
        <div className="flex justify-center md:justify-end mt-6 md:mt-8">
          <a
            href="#"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
          >
            View Details →
          </a>
        </div>
      </div>
    </div>
  );
};

export default TotalCapabilities;
