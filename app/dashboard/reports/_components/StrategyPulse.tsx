

// /* eslint-disable @typescript-eslint/no-explicit-any */
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
//   const needleBaseWidth = 10; // Width at the base for a sharper look
//   const needleBaseX1 = 100 + (needleBaseWidth / 2) * Math.cos(needleAngleRad + Math.PI / 2);
//   const needleBaseY1 = 100 + (needleBaseWidth / 2) * Math.sin(needleAngleRad + Math.PI / 2);
//   const needleBaseX2 = 100 + (needleBaseWidth / 2) * Math.cos(needleAngleRad - Math.PI / 2);
//   const needleBaseY2 = 100 + (needleBaseWidth / 2) * Math.sin(needleAngleRad - Math.PI / 2);

//   return (
//     <div className="flex flex-col items-center p-4 rounded-lg ">
//       <div className="flex flex-col items-center w-full mb-4">
//         <h2 className="text-xl font-bold text-gray-800">Vision Score</h2>
//       </div>

//       <div className="relative w-full h-40 ">
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

//           <path
//             d={`M ${needleBaseX1} ${needleBaseY1} L ${needleTipX} ${needleTipY} L ${needleBaseX2} ${needleBaseY2} Z`}
//             fill="#666666"
//             stroke="#666666"
//             strokeWidth="1"
//           />

//           {/* Define shadow filter */}
//           <defs>
//             <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
//               <feDropShadow dx="4" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.3"/>
//             </filter>
//           </defs>

//           {/* Circle with shadow */}
//           <circle cx="100" cy="100" r="20" fill="#43A047" filter="url(#shadow)" />
//         </svg>
//       </div>

//       <p className="text-3xl z-10 -mt-11 font-bold text-white">{normalizedScore}</p>
//       <p className="text-center text-sm text-gray-600 mt-40 px-4">
//         A vision score of 60 or higher is considered a guiding and compelling vision.
//       </p>
//     </div>
//   );
// };

// export default SpeedMeterPage;





/* eslint-disable @typescript-eslint/no-explicit-any */
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

  const getArcPath = (start: any, end: any) => {
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
  const needleBaseWidth = 10;
  const needleBaseX1 =
    100 + (needleBaseWidth / 2) * Math.cos(needleAngleRad + Math.PI / 2);
  const needleBaseY1 =
    100 + (needleBaseWidth / 2) * Math.sin(needleAngleRad + Math.PI / 2);
  const needleBaseX2 =
    100 + (needleBaseWidth / 2) * Math.cos(needleAngleRad - Math.PI / 2);
  const needleBaseY2 =
    100 + (needleBaseWidth / 2) * Math.sin(needleAngleRad - Math.PI / 2);

  // Labels at intervals (20, 40, 60, 80, 100)
  const labelPositions = [20, 40, 60, 80, 100].map((val) => {
    const angle = (-180 + (val / 100) * 180) * (Math.PI / 180);
    const radius = 110; // slightly outside the arc
    return {
      val,
      x: 100 + radius * Math.cos(angle),
      y: 100 + radius * Math.sin(angle),
    };
  });

  return (
    <div className="flex flex-col items-center p-4 rounded-lg ">
      <div className="flex flex-col items-center w-full mb-4">
        <h2 className="text-xl font-bold text-gray-800">Vision Score</h2>
      </div>

      <div className="relative w-full h-40 ">
        <svg viewBox="0 0 200 120" className="w-full h-full">
          {/* Colored Segments */}
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

          {/* Needle */}
          <path
            d={`M ${needleBaseX1} ${needleBaseY1} L ${needleTipX} ${needleTipY} L ${needleBaseX2} ${needleBaseY2} Z`}
            fill="#666666"
            stroke="#666666"
            strokeWidth="1"
          />

          {/* Shadow filter */}
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="4"
                dy="2"
                stdDeviation="2"
                floodColor="#000000"
                floodOpacity="0.3"
              />
            </filter>
          </defs>

          {/* Center Circle */}
          <circle
            cx="100"
            cy="100"
            r="20"
            fill="#43A047"
            filter="url(#shadow)"
          />

          {/* Labels */}
          {labelPositions.map((pos, i) => (
            <text
              key={i}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] fill-gray-700 font-semibold"
            >
              {pos.val}
            </text>
          ))}
        </svg>
      </div>

      <p className="text-3xl z-10 -mt-11 font-bold text-white">
        {normalizedScore}
      </p>
      <p className="text-center text-sm text-gray-600 mt-40 px-4">
        A vision score of 60 or higher is considered a guiding and compelling
        vision.
      </p>
    </div>
  );
};

export default SpeedMeterPage;





