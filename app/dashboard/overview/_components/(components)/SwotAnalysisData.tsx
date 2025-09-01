

// "use client";
// // components/SwotAnalysis.tsx
// import { useState } from "react";
// import { FaStar, FaLightbulb, FaLock, FaExclamationTriangle } from "react-icons/fa";

// import React from "react";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { useGetAiSwotQuery } from "@/redux/api/clarhetai-recomandation/clarhetaiApi";

// type SwotItem = {
//   title: string;
//   percentage: number;
//   color: string;
//   icon: React.ReactElement;
//   details?: string[];
//   bgColor?: string;
// };

// const swotData: SwotItem[] = [
//   {
//     title: "Strengths",
//     percentage: 70,
//     color: "red",
//     bgColor:"bg-[#F87171]",
//     icon: <FaStar className="text-red-500" />,
//     details: [
//       "Needs to be more specific about the 'other stuff' mentioned at the end of the vision statement.",
//       "Reinforce the company's commitment to ethical and responsible collection of screams.",
//       "Include references to safety and adaptability to align better with the mission statement.",
//       "Emphasize community involvement more, which is a key part of the mission statement.",
//       "Make a concise statement. The vision statement should be direct, clear and easily understandable."
//     ]
//   },
//   {
//     title: "Weaknesses",
//     percentage: 10,
//     color: "yellow",
//     bgColor:"bg-[#F1BA31]",
//     icon: <FaLock className="text-yellow-500" />,
//     details: []
//   },
//   {
//     title: "Opportunities",
//     percentage: 80,
//     color: "blue",
//     bgColor:"bg-[#60A5FA]",
//     icon: <FaLightbulb className="text-blue-500" />,
//     details: []
//   },
//   {
//     title: "Threats",
//     percentage: 20,
//     color: "green",
//     bgColor:"bg-[#166534]",
//     icon: <FaExclamationTriangle className="text-green-600" />,
//     details: []
//   }
// ];

// export default function SwotAnalysis() {
//   const [openIndex, setOpenIndex] = useState<number | null>(0);
//   const {data:swotDataMain} = useGetAiSwotQuery();
//   console.log(swotDataMain);

//   return (
//     <div className="bg-white rounded-xl p-4 flex flex-col md:flex-row gap-6 overflow-auto">
//       {/* {JSON.stringify(swotDataMain)} */}
//       {/* Left grid */}
//       <div className="grid grid-cols-2 h-[300px] gap-4 flex-shrink-0">
//         {swotData.map((item, idx) => (
//           <div
//             key={idx}
//             className={`${item.bgColor}  text-white rounded-lg flex flex-col justify-center items-center p-6 font-semibold text-lg`}
//           >
//             <p className="text-[16px]">{item.title}</p>
//             <p className="text-[36px] font-thin">{item.percentage}%</p>
//           </div>
//         ))}
//       </div>

//       {/* Right accordion */}
//       <div className="flex-1 space-y-4">
//         {swotData.map((item, idx) => {
//           const isOpen = openIndex === idx;
//           return (
//             <div
//               key={idx}
//               className="border rounded-lg p-4"
//             >
//               <div
//                 className="flex items-center justify-between cursor-pointer"
//                 onClick={() => setOpenIndex(isOpen ? null : idx)}
//               >
//                 <div className="flex items-center gap-3 ">
//                   <span className={`p-3 bg-${item.color}-100 rounded-lg`}>
                   

//                     {item.icon}
                   
//                     </span>
//                   <span className="font-semibold text-[18px]">{item.title}</span>
//                   <span className="text-gray-500 text-[18px] ">{item.percentage}%</span>
//                 </div>
//                 <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
//               </div>
//               {isOpen && item.details && item.details.length > 0 && (
//                 <ul className="mt-3 list-inside pl-6 space-y-1 text-gray-700 text-sm">
//                   {item.details.map((detail, dIdx) => (
//                     <li key={dIdx}> &gt; {detail}</li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


"use client";
// components/SwotAnalysis.tsx
import { useState } from "react";
import { FaStar, FaLightbulb, FaLock, FaExclamationTriangle } from "react-icons/fa";
import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useGetAiSwotQuery } from "@/redux/api/clarhetai-recomandation/clarhetaiApi";

type SwotItem = {
  title: string;
  percentage: number;
  color: string;
  icon: React.ReactElement;
  details: string[];
  bgColor: string;
};

export default function SwotAnalysis() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { data: swotDataMain, isLoading, isError } = useGetAiSwotQuery();

  if (isLoading) return <p>Loading SWOT analysis...</p>;
  if (isError || !swotDataMain?.success) return <p>Failed to load SWOT analysis.</p>;

  const { scores, recommendations } = swotDataMain.data;

  // Map API response into component-friendly structure
  const swotData: SwotItem[] = [
    {
      title: "Strengths",
      percentage: (scores.strengths as unknown as { percentage: number }).percentage,
      // percentage: (scores.strengths as { percentage: number }).percentage,
      color: "red",
      bgColor: "bg-[#F87171]",
      icon: <FaStar className="text-red-500" />,
      details: recommendations.strengths || [],
    },
    {
      title: "Weaknesses",
      // percentage: scores.weaknesses.percentage,
      percentage: (scores.weaknesses as unknown as { percentage: number }).percentage,
      color: "yellow",
      bgColor: "bg-[#F1BA31]",
      icon: <FaLock className="text-yellow-500" />,
      details: recommendations.weaknesses || [],
    },
    {
      title: "Opportunities",
      percentage: (scores.opportunities as unknown as { percentage: number }).percentage,
      color: "blue",
      bgColor: "bg-[#60A5FA]",
      icon: <FaLightbulb className="text-blue-500" />,
      details: recommendations.opportunities || [],
    },
    {
      title: "Threats",
      percentage: (scores.threats as unknown as { percentage: number }).percentage,
      color: "green",
      bgColor: "bg-[#166534]",
      icon: <FaExclamationTriangle className="text-green-600" />,
      details: recommendations.threats || [],
    },
  ];

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col md:flex-row gap-6 overflow-auto">
      {/* Left grid */}
      <div className="grid grid-cols-2 h-[300px] gap-4 flex-shrink-0">
        {swotData.map((item, idx) => (
          <div
            key={idx}
            className={`${item.bgColor} text-white rounded-lg flex flex-col justify-center items-center p-6 font-semibold text-lg`}
          >
            <p className="text-[16px]">{item.title}</p>
            <p className="text-[36px] font-thin">{item.percentage}%</p>
          </div>
        ))}
      </div>

      {/* Right accordion */}
      <div className="flex-1 space-y-4">
        {swotData.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="border rounded-lg p-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div className="flex items-center gap-3">
                  <span className={`p-3 rounded-lg bg-gray-100`}>
                    {item.icon}
                  </span>
                  <span className="font-semibold text-[18px]">{item.title}</span>
                  <span className="text-gray-500 text-[18px]">
                    {item.percentage}%
                  </span>
                </div>
                <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
              </div>
              {isOpen && item.details.length > 0 && (
                <ul className="mt-3 list-inside pl-6 space-y-3 text-gray-700 text-base">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx}>  {detail}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
