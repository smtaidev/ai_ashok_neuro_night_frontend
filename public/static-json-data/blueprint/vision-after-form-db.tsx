// import SpeedMeterPage from "@/app/dashboard/overview/_components/SpeedMeter";
// import React from "react";
// import { FaLightbulb } from "react-icons/fa";

// const VisionAfter = (vision) => {
//   console.log(vision , "from reusable component , vision-after ");

//   const visionStatementFeedback = [
//   {
//     id: 1,
//     text: "Needs to be more specific about the 'other stuff' mentioned at the end of the vision statement.",
//   },
//   {
//     id: 2,
//     text: "Reinforce the company's commitment to ethical and responsible collection of screams.",
//   },
//   {
//     id: 3,
//     text: "Include references to safety and adaptability to align better with the mission statement.",
//   },
//   {
//     id: 4,
//     text: "Emphasize community involvement more, which is a key part of the mission statement.",
//   },
//   {
//     id: 5,
//     text: "Make a concise statement. The vision statement should be direct, clear and easily understandable.",
//   },
// ];


//   console.log("from reusable component , vision-after ");
//   return (
//     <div className="">
//       <div className="p-4 border border-gray-200 rounded-xl">
//         <h2 className="mb-2">Vision Statement Score</h2>
//         <div className="p-4 bg-blue-50 rounded-xl text-sm">
//           <p>
//             The company's vision statement is scored out of 10, considering
//             factors such as clarity, alignment with organizational values, and
//             its ability to inspire and guide stakeholders. This comprehensive
//             evaluation ensures that the vision not only reflects the company's
//             aspirations but also serves as a unifying force that propels the
//             organization toward its strategic goals.
//           </p>
//         </div>
//         <div className="mt-6 mb-8">
//           <SpeedMeterPage score={10} />
//         </div>
//         <h2 className="mb-2">ClarhetAI Feedback</h2>
//         <div className="p-4 bg-blue-50 rounded-xl text-sm">
//           <p>
//             While the vision statement strongly aligns with the nature of
//             Monsters, Inc. and builds upon the mission statement’s underlying
//             theme of ethical, sustainable energy, it overlooks a few key points.
//             The 'other stuff' it refers to is vague and fails to elaborate on
//             the broader goals of the company, leaving room for misunderstanding
//             or misinterpretation. Safety, adaptability, and a strong emphasis on
//             community are ingrained within the mission but are not adequately
//             highlighted in the vision. In its current form, the vision projects
//             a transformative and innovative future that aligns with the
//             company's unique energy business but could significantly benefit
//             from more specificity and greater alignment with the mission
//             statement.
//           </p>
//         </div>
//       </div>
//       <div className="p-4 mt-4 border bg-blue-50 border-gray-200 rounded-xl">
//         <h2 className="text-sm font-semibold ">Recomendation</h2>

//         {/* suru  */}

//         {
//           visionStatementFeedback.map(feedback =>(
//              <div key={feedback.id} className="bg-white mt-4 px-4 py-4 rounded-lg flex items-center gap-2">
//         <div className="p-6 rounded-2xl mr-2 bg-blue-50">

//       {/* Icon */}
//       <FaLightbulb className=" text-base " size={20} />
//         </div>

//       {/* Text */}
//       <p className="text-gray-700 text-sm leading-relaxed">
//         <span className="font-semibold">{feedback.id}</span> {feedback.text}
//       </p>
//     </div>
//           ))
//         }








      

//         {/* sesh  */}
//       </div>
    
//       <hr className="mt-4 mb-4" />
//       <div className="p-4 border border-gray-200 rounded-xl text-sm">
//         <p>A Vision Statement with a score over 65 is considered a Guiding and compelling vision.</p>
//       </div>
//     </div>
//   );
// };

// export default VisionAfter;

"use client";
import SpeedMeterPage from "@/app/dashboard/overview/_components/SpeedMeter";
import React, { useState } from "react";
import { FaLightbulb } from "react-icons/fa";
// ⚡ Props type
interface VisionAfterProps {
  vision?: string;
}

const VisionAfter: React.FC<VisionAfterProps> = ({ vision }) => {
  // AI response console

  const [isVision, setIsVision] = useState<string | null |any>('');
  setIsVision(vision);
  console.log("AI Vision from parent:", isVision);

  const visionStatementFeedback = [
    {
      id: 1,
      text: "Needs to be more specific about the 'other stuff' mentioned at the end of the vision statement.",
    },
    {
      id: 2,
      text: "Reinforce the company's commitment to ethical and responsible collection of screams.",
    },
    {
      id: 3,
      text: "Include references to safety and adaptability to align better with the mission statement.",
    },
    {
      id: 4,
      text: "Emphasize community involvement more, which is a key part of the mission statement.",
    },
    {
      id: 5,
      text: "Make a concise statement. The vision statement should be direct, clear and easily understandable.",
    },
  ];

  return (
    <div className="">
      <div className="p-4 border border-gray-200 rounded-xl">
        <h2 className="mb-2">Vision Statement Score</h2>
        <div className="p-4 bg-blue-50 rounded-xl text-sm">
          <p>
            The company&#39;s vision statement is scored out of 10, considering factors such as clarity, alignment with organizational values, and its ability to inspire and guide stakeholders.
          </p>
          {vision && (
            <p className="mt-2 text-blue-900 font-semibold">
              AI Recommendation: {vision}
            </p>
          )}
        </div>

        <div className="mt-6 mb-8">
          <SpeedMeterPage score={10} />
        </div>

        <h2 className="mb-2">ClarhetAI Feedback</h2>
        <div className="p-4 bg-blue-50 rounded-xl text-sm">
          <p>
            While the vision statement strongly aligns with the nature of Monsters, Inc. and builds upon the mission statement’s underlying theme of ethical, sustainable energy, it overlooks a few key points.
          </p>
        </div>
      </div>

      <div className="p-4 mt-4 border bg-blue-50 border-gray-200 rounded-xl">
        <h2 className="text-sm font-semibold ">Recomendation</h2>
        {visionStatementFeedback.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white mt-4 px-4 py-4 rounded-lg flex items-center gap-2"
          >
            <div className="p-6 rounded-2xl mr-2 bg-blue-50">
              <FaLightbulb className="text-base" size={20} />
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              <span className="font-semibold">{feedback.id}</span> {feedback.text}
            </p>
          </div>
        ))}
      </div>

      <hr className="mt-4 mb-4" />

      <div className="p-4 border border-gray-200 rounded-xl text-sm">
        <p>
          A Vision Statement with a score over 65 is considered a Guiding and compelling vision.
        </p>
      </div>
    </div>
  );
};

export default VisionAfter;
