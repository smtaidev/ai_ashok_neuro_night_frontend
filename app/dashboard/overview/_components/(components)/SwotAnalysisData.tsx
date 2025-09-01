// "use client";

// import React, { useState } from 'react';
// import { FaStar, FaLightbulb, FaExclamationTriangle, FaMinusCircle } from 'react-icons/fa';

// // Define the data structure for a SWOT item
// interface SwotItem {
//   type: 'Strengths' | 'Weaknesses' | 'Opportunities' | 'Threats';
//   percentage: number;
//   color: string;
//   icon: React.FC; // Using React.FC for the icon component
//   details: string[];
// }

// // Data for the SWOT analysis, now with React Icons
// const swotData: SwotItem[] = [
//   {
//     type: 'Strengths',
//     percentage: 70,
//     color: 'bg-red-200 text-red-800',
//     icon: FaStar,
//     details: [
//       'Needs to be more specific about the "other stuff" mentioned at the end of the vision statement.',
//       'Reinforce the company’s commitment to ethical and responsible collection of screams.',
//       'Include references to safety and adaptability to align better with the mission statement.',
//       'Emphasize community involvement more, which is a key part of the mission statement.',
//       'Make a concise statement. The vision statement should be direct, clear and easily understandable.',
//     ],
//   },
//   {
//     type: 'Weaknesses',
//     percentage: 10,
//     color: 'bg-yellow-100 text-yellow-800',
//     icon: FaMinusCircle,
//     details: [
//       'Lack of clear differentiation from competitors.',
//       'Dependence on a single technology stack.',
//       'Slow response time to market changes.',
//     ],
//   },
//   {
//     type: 'Opportunities',
//     percentage: 80,
//     color: 'bg-blue-200 text-blue-800',
//     icon: FaLightbulb,
//     details: [
//       'Expanding into new geographic markets.',
//       'Developing new product lines or services.',
//       'Forming strategic partnerships.',
//     ],
//   },
//   {
//     type: 'Threats',
//     percentage: 20,
//     color: 'bg-green-200 text-green-800',
//     icon: FaExclamationTriangle,
//     details: [
//       'Increased competition from new entrants.',
//       'Changes in regulations or government policies.',
//       'Economic downturn affecting customer spending.',
//     ],
//   },
// ];

// const SwotSection: React.FC = () => {
//   const [openItem, setOpenItem] = useState<string | null>('Strengths');

//   const toggleAccordion = (type: string) => {
//     setOpenItem(openItem === type ? null : type);
//   };

//   return (
//     <div className="flex justify-center p-4 sm:p-8 bg-gray-50 font-sans">
//       <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-6xl">
//         {/* Main layout container, a grid for medium and larger screens */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//           {/* Left column: SWOT cards */}
//           <div className="md:col-span-1 grid grid-cols-2 gap-4">
//             {swotData.map((item) => (
//               <div
//                 key={item.type}
//                 className={`p-4 rounded-xl shadow-lg flex flex-col justify-center items-center ${item.color}`}
//               >
//                 <h3 className="text-xl sm:text-2xl font-bold">{item.type}</h3>
//                 <p className="text-2xl sm:text-3xl font-bold mt-2">{item.percentage}%</p>
//               </div>
//             ))}
//           </div>

//           {/* Right column: Accordion for details */}
//           <div className="md:col-span-2 space-y-4 mt-6 md:mt-0">
//             {swotData.map((item) => {
//               const IconComponent = item.icon; // Get the component from the data
//               return (
//                 <div key={item.type} className="border-b border-gray-200 last:border-b-0">
//                   <button
//                     onClick={() => toggleAccordion(item.type)}
//                     className="flex justify-between items-center w-full p-4 text-left font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//                   >
//                     <span className="flex items-center gap-2">
//                       <span className="text-2xl">
//                         <IconComponent /> {/* Render the icon component */}
//                       </span>
//                       <h4 className="text-lg md:text-xl">{item.type}</h4>
//                       <span className="ml-2 text-gray-500 font-medium">{item.percentage}%</span>
//                     </span>
//                     <span>
//                       <svg
//                         className={`w-6 h-6 transform transition-transform duration-200 ${
//                           openItem === item.type ? 'rotate-180' : ''
//                         }`}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </span>
//                   </button>
//                   {openItem === item.type && (
//                     <ul className="p-4 bg-gray-50 rounded-b-lg space-y-2">
//                       {item.details.map((detail, index) => (
//                         <li key={index} className="flex items-start gap-2 text-gray-600">
//                           <span className="text-xl leading-none">&gt;</span>
//                           <span className="flex-1">{detail}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SwotSection;

"use client";
// components/SwotAnalysis.tsx
import { useState } from "react";
import { FaStar, FaLightbulb, FaLock, FaExclamationTriangle } from "react-icons/fa";

import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type SwotItem = {
  title: string;
  percentage: number;
  color: string;
  icon: React.ReactElement;
  details?: string[];
  bgColor?: string;
};

const swotData: SwotItem[] = [
  {
    title: "Strengths",
    percentage: 70,
    color: "red",
    bgColor:"bg-[#F87171]",
    icon: <FaStar className="text-red-500" />,
    details: [
      "Needs to be more specific about the 'other stuff' mentioned at the end of the vision statement.",
      "Reinforce the company's commitment to ethical and responsible collection of screams.",
      "Include references to safety and adaptability to align better with the mission statement.",
      "Emphasize community involvement more, which is a key part of the mission statement.",
      "Make a concise statement. The vision statement should be direct, clear and easily understandable."
    ]
  },
  {
    title: "Weaknesses",
    percentage: 10,
    color: "yellow",
    bgColor:"bg-[#F1BA31]",
    icon: <FaLock className="text-yellow-500" />,
    details: []
  },
  {
    title: "Opportunities",
    percentage: 80,
    color: "blue",
    bgColor:"bg-[#60A5FA]",
    icon: <FaLightbulb className="text-blue-500" />,
    details: []
  },
  {
    title: "Threats",
    percentage: 20,
    color: "green",
    bgColor:"bg-[#166534]",
    icon: <FaExclamationTriangle className="text-green-600" />,
    details: []
  }
];

export default function SwotAnalysis() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col md:flex-row gap-6 overflow-auto">
      {/* Left grid */}
      <div className="grid grid-cols-2 h-[300px] gap-4 flex-shrink-0">
        {swotData.map((item, idx) => (
          <div
            key={idx}
            className={`${item.bgColor}  text-white rounded-lg flex flex-col justify-center items-center p-6 font-semibold text-lg`}
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
            <div
              key={idx}
              className="border rounded-lg p-4"
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div className="flex items-center gap-3 ">
                  <span className={`p-3 bg-${item.color}-100 rounded-lg`}>
                   

                    {item.icon}
                   
                    </span>
                  <span className="font-semibold text-[18px]">{item.title}</span>
                  <span className="text-gray-500 text-[18px] ">{item.percentage}%</span>
                </div>
                <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
              </div>
              {isOpen && item.details && item.details.length > 0 && (
                <ul className="mt-3 list-inside pl-6 space-y-1 text-gray-700 text-sm">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx}> &gt; {detail}</li>
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
