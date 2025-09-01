/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';

// const SpeedMeterPage = ({ score = 60 }) => {
//   const normalizedScore = Math.min(Math.max(score, 0), 100);

//   const needleAngle = -180 + (normalizedScore / 100) * 180;
//   const segments = [
//     { color: "#FF0000", start: 0, end: 10 },
//     { color: "#FF3300", start: 10, end: 20 },
//     { color: "#FF6600", start: 20, end: 30 },
//     { color: "#FF9900", start: 30, end: 40 },
//     { color: "#FFCC00", start: 40, end: 50 },
//     { color: "#FFFF00", start: 50, end: 60 },
//     { color: "#CCFF33", start: 60, end: 70 },
//     { color: "#66FF33", start: 70, end: 80 },
//     { color: "#33CC33", start: 80, end: 90 },
//     { color: "#009933", start: 90, end: 100 }
//   ];

//   const getArcPath = (start: any, end: any) => {
//     const radius = 90;
//     const centerX = 100;
//     const centerY = 100;

//     const startAngle = (-180 + (start / 100) * 180) * (Math.PI / 180);
//     const endAngle = (180 + (end / 100) * 180) * (Math.PI / 180);

//     const startX = centerX + radius * Math.cos(startAngle);
//     const startY = centerY + radius * Math.sin(startAngle);
//     const endX = centerX + radius * Math.cos(endAngle);
//     const endY = centerY + radius * Math.sin(endAngle);


//     return `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
//   };


//   const needleLength = 70;
//   const needleAngleRad = (needleAngle * Math.PI) / 180;
//   const needleTipX = 100 + needleLength * Math.cos(needleAngleRad);
//   const needleTipY = 100 + needleLength * Math.sin(needleAngleRad);
//   return (
//     <div className="flex flex-col items-center p-4 rounded-lg ">
//       <div className="flex flex-col items-center w-full mb-4">
//         <h2 className="text-xl font-bold text-gray-800">Vision Score</h2>
//       </div>


//       <div className="relative w-full h-40">
//         <svg viewBox="0 0 200 120" className="w-full h-full">
//           {segments.map((seg, index) => (
//             <path
//               key={index}
//               d={getArcPath(seg.start, seg.end)}
//               stroke={seg.color}
//               strokeWidth="20"
//               fill="transparent"
//               strokeLinecap="butt"
//             />
//           ))}


//           <line
//             x1="100"
//             y1="100"
//             x2={needleTipX}
//             y2={needleTipY}
//             stroke="#000"
//             strokeWidth="1"
//           />
//           {/* Needle as an arrow/triangle */}
// <polygon
//   points={`
//     ${100 + 6 * Math.cos(needleAngleRad - Math.PI / 2)} ${100 + 6 * Math.sin(needleAngleRad - Math.PI / 2)},
//     ${100 + 6 * Math.cos(needleAngleRad + Math.PI / 2)} ${100 + 6 * Math.sin(needleAngleRad + Math.PI / 2)},
//     ${needleTipX} ${needleTipY}
//   `}
//   fill="#666666"
// />

// {/* Center circle */}
// <circle cx="100" cy="100" r="7" fill="#6f6f6f" />


//           {/* <circle cx="100" cy="100" r="6" fill="#000" /> */}
//         </svg>
//       </div>

//       <p className="text-3xl font-bold text-lime-600">{normalizedScore}</p>
//       <p className="text-center text-sm text-gray-600 mt-4 px-4">
//         A vision score of 60 or higher is considered a guiding and compelling vision.
//       </p>
//     </div>
//   );
// };

// export default SpeedMeterPage;

//! kichu ta kaj kore 

// import React from "react";

// const SpeedMeterPage = ({ score = 60 }) => {
//   const normalizedScore = Math.min(Math.max(score, 0), 100);

//   const needleAngle = -180 + (normalizedScore / 100) * 180;
//   const segments = [
//     { color: "#FF0000", start: 0, end: 10 },
//     { color: "#FF3300", start: 10, end: 20 },
//     { color: "#FF6600", start: 20, end: 30 },
//     { color: "#FF9900", start: 30, end: 40 },
//     { color: "#FFCC00", start: 40, end: 50 },
//     { color: "#FFFF00", start: 50, end: 60 },
//     { color: "#CCFF33", start: 60, end: 70 },
//     { color: "#66FF33", start: 70, end: 80 },
//     { color: "#33CC33", start: 80, end: 90 },
//     { color: "#009933", start: 90, end: 100 },
//   ];

//   const getArcPath = (start: any, end: any) => {
//     const radius = 90;
//     const centerX = 100;
//     const centerY = 100;

//     const startAngle = (-180 + (start / 100) * 180) * (Math.PI / 180);
//     const endAngle = (-180 + (end / 100) * 180) * (Math.PI / 180);

//     const startX = centerX + radius * Math.cos(startAngle);
//     const startY = centerY + radius * Math.sin(startAngle);
//     const endX = centerX + radius * Math.cos(endAngle);
//     const endY = centerY + radius * Math.sin(endAngle);

//     return `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
//   };

//   const needleLength = 70;
//   const needleAngleRad = (needleAngle * Math.PI) / 180;
//   const needleTipX = 100 + needleLength * Math.cos(needleAngleRad);
//   const needleTipY = 100 + needleLength * Math.sin(needleAngleRad);

//   const labels = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);

//   return (
//     <div className="flex flex-col items-center p-4 rounded-lg">
//       <h2 className="text-xl font-bold text-gray-800 mb-2">Vision Score</h2>

     
//       <div className="relative overflow-visible w-full h-40">
//         <svg viewBox="0 0 200 120" className="w-full h-full">
//           {/* Arc Segments */}
//           {segments.map((seg, index) => (
//             <path
//               key={index}
//               d={getArcPath(seg.start, seg.end)}
//               stroke={seg.color}
//               strokeWidth="20"
//               fill="transparent"
//               strokeLinecap="butt"
//             />
//           ))}

//           {/* Scale Labels */}
//           {labels.map((label) => {
//             const angle = (-180 + (label / 100) * 180) * (Math.PI / 180);
//             const radius = 115; // moved OUTSIDE the arc
//             const x = 100 + radius * Math.cos(angle);
//             const y = 100 + radius * Math.sin(angle);

//             return (
//               <text
//                 key={label}
//                 x={x}
//                 y={y}
//                 textAnchor="start"
//                 alignmentBaseline=""
//                 fontSize="7"
//                 fontWeight="thin"
//                 fill="#333"
//               >
//                 {label}
//               </text>
//             );
//           })}

//           {/* Needle */}
//           <polygon
//             points={`
//               ${100 + 6 * Math.cos(needleAngleRad - Math.PI / 2)} ${
//               100 + 6 * Math.sin(needleAngleRad - Math.PI / 2)
//             },
//               ${100 + 6 * Math.cos(needleAngleRad + Math.PI / 2)} ${
//               100 + 6 * Math.sin(needleAngleRad + Math.PI / 2)
//             },
//               ${needleTipX} ${needleTipY}
//             `}
//             fill="#333"
//           />

//           {/* Center circle */}
//           <circle cx="100" cy="100" r="7" fill="#333" />
//         </svg>
//       </div>
//        {/* Big Score Number */}
//       <div className="text-3xl font-bold text-green-800 mb-2">{normalizedScore}</div>


//       <p className="text-center text-sm text-gray-600 mt-4 px-4">
//         A vision score of 60 or higher is considered a guiding and compelling vision.
//       </p>
//     </div>
//   );
// };

// export default SpeedMeterPage;
  
//?"" try

import React from "react";

const SpeedMeterPage = ({ score = 60 }) => {
  const normalizedScore = Math.min(Math.max(score, 0), 100);

  const needleAngle = -180 + (normalizedScore / 100) * 180;
  const segments = [
    { color: "#FF0000", start: 0, end: 10 },
    { color: "#FF3300", start: 10, end: 20 },
    { color: "#FF6600", start: 20, end: 30 },
    { color: "#FF9900", start: 30, end: 40 },
    { color: "#FFCC00", start: 40, end: 50 },
    { color: "#FFFF00", start: 50, end: 60 },
    { color: "#CCFF33", start: 60, end: 70 },
    { color: "#66FF33", start: 70, end: 80 },
    { color: "#33CC33", start: 80, end: 90 },
    { color: "#009933", start: 90, end: 100 },
  ];

  const getArcPath = (start: number, end: number) => {
    const radius = 90;
    const centerX = 100;
    const centerY = 100;

    const startAngle = (-180 + (start / 100) * 180) * (Math.PI / 180);
    const endAngle = (-180 + (end / 100) * 180) * (Math.PI / 180);

    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);

    return `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
  };

  const needleLength = 70;
  const needleAngleRad = (needleAngle * Math.PI) / 180;
  const needleTipX = 100 + needleLength * Math.cos(needleAngleRad);
  const needleTipY = 100 + needleLength * Math.sin(needleAngleRad);

  const labels = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);

  return (
    <div className="flex flex-col items-center p-4 rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Vision Score</h2>

      <div className="relative overflow-visible w-full h-40">
        <svg viewBox="0 0 200 120" className="w-full h-full">
          {/* Arc Segments */}
          {segments.map((seg, index) => (
            <path
              key={index}
              d={getArcPath(seg.start, seg.end)}
              stroke={seg.color}
              strokeWidth="20"
              fill="transparent"
              strokeLinecap="butt"
            />
          ))}

          {/* Scale Labels inside arcs */}
          {labels.map((label) => {
            const angle = (-180 + (label / 100) * 180) * (Math.PI / 180);
            const radius = 90; // same as arc radius
            const x = 100 + radius * Math.cos(angle);
            const y = 100 + radius * Math.sin(angle);

            return (
              <text
                key={label}
                x={x}
                y={y} // slight vertical adjustment
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="6"
                fontWeight="baseline"
                fill="#323232B2"
              >
                {label}
              </text>
            );
          })}

          {/* Needle */}
          <polygon
            points={`
              ${100 + 6 * Math.cos(needleAngleRad - Math.PI / 2)} ${
              100 + 6 * Math.sin(needleAngleRad - Math.PI / 2)
            },
              ${100 + 6 * Math.cos(needleAngleRad + Math.PI / 2)} ${
              100 + 6 * Math.sin(needleAngleRad + Math.PI / 2)
            },
              ${needleTipX} ${needleTipY}
            `}
            fill="#333"
          />

          {/* Center circle */}
          <circle cx="100" cy="100" r="7" fill="#333" />
        </svg>
      </div>

      {/* Big Score Number */}
      <div className="text-3xl font-bold text-green-800 mb-2">
        {normalizedScore}
      </div>

      <p className="text-center text-sm text-gray-600 mt-4 px-4">
        A vision score of 60 or higher is considered a guiding and compelling
        vision.
      </p>
    </div>
  );
};

export default SpeedMeterPage;
