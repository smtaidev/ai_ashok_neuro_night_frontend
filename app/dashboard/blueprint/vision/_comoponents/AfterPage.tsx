

//? previously working but because of api changes to mutation to query for ai recomendations its not working








// "use client";
// import React, { useState } from "react";
// import { FaLightbulb, FaRegEdit } from "react-icons/fa";
// import Image from "next/image";
// import LinkImage from "@/public/image/link-icon.svg";
// import Link from "next/link";
// import { useCreateVisionMutation, useCreateAIVisionMutation } from "@/redux/api/blueprint/vison/visonApi";
// import toast from "react-hot-toast"; // ✅ import toast
// import ClarhetImage from "@/public/image/chat-bot-bg.png"
// import SpeedMeterPage from "@/app/dashboard/overview/_components/SpeedMeter";

// type AfterPageProps = {
//   visionData: { _id: string; vision: string };
// };

// const AfterPage: React.FC<AfterPageProps> = ({ visionData }) => {
//   const [vision, setVision] = useState(
//     visionData?.vision 
//   );

//   // For editing Vision (modal)
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editedVision, setEditedVision] = useState(
//     visionData?.vision 
//   );

//   // For AI Vision Modal
//   const [isAIModalOpen, setIsAIModalOpen] = useState(false);
//   const [aiVisionData, setAiVisionData] = useState<any>(null);

//   // For Drawer
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [infoData, setInfoData] = useState<React.ReactNode>(null);

//   // ✅ Mutation hooks
//   const [updateVision, { isLoading: isUpdating }] = useCreateVisionMutation();
//   const [generateVision, { isLoading: isGenerating }] = useCreateAIVisionMutation();
//   console.log(aiVisionData);

//   /** Save vision changes (API call) */
//   const handleSave = async () => {
//     try {
//       const payload = { id: visionData._id, vision: editedVision };
//       const res = await updateVision(payload).unwrap();

//       setVision(res.data.vision); // update local state
//       setIsModalOpen(false);

//       toast.success("Vision updated successfully ");
//     } catch (error) {
//       console.error("Failed to update vision:", error);
//       toast.error("Failed to update vision ");
//     }
//   };

//   /** Cancel vision editing */
//   const handleCancel = () => {
//     setEditedVision(vision);
//     setIsModalOpen(false);
//   };

//   /** Generate AI Vision Insights */
//   const handleAIInsights = async () => {
//     try {
//       setIsAIModalOpen(true);
//       const payload = { vision: vision };
//       const res = await generateVision(payload).unwrap();
//       setAiVisionData(res.data);
//     } catch (error) {
//       console.error("Failed to generate AI vision:", error);
//       toast.error("Failed to generate AI insights");
//       setIsAIModalOpen(false);
//     }
//   };

//   /** Open Drawer with AI insights */


//   return (
//     <div className="p-5 min-h-[calc(100vh-110px)]">
//       {/* Vision Section */}
//       <div className="bg-white border border-gray-200 p-5 rounded-lg relative">
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-xl font-bold text-[#0b1c33]
//  mb-2">Vision</h2>
//           <div className="flex items-center gap-4">
//             <Link href="#">
//               <Image src={LinkImage} alt="Link Image" height={25} width={25} />
//             </Link>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="text-blue-800 cursor-pointer flex text-lg items-center gap-2"
//             >
//               <FaRegEdit size={25} /> Edit
//             </button>
//           </div>
//         </div>
//         <p className="mb-2 text-base text-[#231f20]">{vision}</p>
//       </div>

//       {/* Trigger AI Insights Modal */}
//       <div className="flex justify-end">
        
//         <button
//           onClick={handleAIInsights}
//           className="bg-blue-900 mr-1 mt-5 text-white px-4 py-2 rounded-lg hover:bg-blue-950"
//         >
//           ClaretiAI Insights
//         </button>
//       </div>

     

//       {/* Edit Vision Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
//           <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-2xl relative">
//             {/* Close Button */}
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-3 right-3 text-2xl text-gray-600"
//             >
//               &times;
//             </button>

//             {/* Header */}
//             <div className="bg-blue-900 text-white rounded-t-2xl p-4 mb-4">
//               <h2 className="text-xl font-bold">Edit Vision</h2>
//             </div>

//             {/* Content */}
//             <div className="p-4 mb-4">
//               <textarea
//                 value={editedVision}
//                 onChange={(e) => setEditedVision(e.target.value)}
//                 className="w-full min-h-[150px] p-2 border border-gray-300 rounded-lg"
//               />
//             </div>

//             {/* Footer Buttons */}
//             <div className="flex justify-end p-4 gap-4">
//               {/* more Info button  */}
              
//               <button
//                 onClick={handleCancel}
//                 className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 disabled={isUpdating}
//                 className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950 disabled:opacity-50"
//               >
//                 {isUpdating ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Ai insight drawer start  */}
//       {/* AI Vision Insights Modal - Drawer Style */}
//       <div
//         className={`fixed inset-0 z-50 transition-all duration-300 ${
//           isAIModalOpen ? "visible" : "invisible"
//         }`}
//       >
//         {/* Background overlay */}
//         <div
//           className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
//             isAIModalOpen ? "opacity-100" : "opacity-0"
//           }`}
//           onClick={() => {
//             setIsAIModalOpen(false);
//             setAiVisionData(null);
//           }}
//         />
//         {/* Drawer content */}
//         <div
//           className={`absolute top-0 right-0 w-full lg:w-[40rem] h-full bg-white shadow-lg transition-transform duration-300 ${
//             isAIModalOpen ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           {/* Header */}
//           <div className="flex justify-between  relative items-center p-4  text-white">
//             <Image
//           src={ClarhetImage}
//           alt="Product Interface showing challenges and data"
//           layout="fill"
//           objectFit="cover"
//         />
//             <h2 className="text-lg font-bold z-10">ClaretiAI Vision Insights</h2>
//             <button
//               onClick={() => {
//                 setIsAIModalOpen(false);
//                 setAiVisionData(null);
//               }}
//               className="text-2xl z-10"
//             >
//               &times;
//             </button>
//           </div>

//           {/* Scrollable Body with Custom Scrollbar */}
//           <div className="p-4 overflow-y-auto h-[calc(100%-64px)] custom-scrollbar">
//   {isGenerating ? (
//     <div className="flex flex-col items-center justify-center py-12">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mb-4"></div>
//       <p className="description">Generating AI insights...</p>
//     </div>
//   ) : aiVisionData ? (
//     <div className="space-y-5">
//       {/* Vision Score Section */}
//       <div className="border p-4 rounded-lg">
//         <h2 className="title mb-5">Vision Score Analysis</h2>
//         <div className="flex items-center">
//           <SpeedMeterPage score={aiVisionData.vision_score} />
//         </div>
//         <p className="description mb-4">
//           <span className="subtitle mr-2">Overall Assessment:</span>
//           {aiVisionData.vision_summary}
//         </p>
//       </div>

//       {/* Alternative Vision Suggestions */}
//       <div className="border bg-sky-50 p-4 rounded-lg">
//         <h2 className="title mb-5">Alternative Vision Suggestions</h2>
//         {aiVisionData.vision_alt?.map((alt: string, index: number) => (
//           <div
//             key={index}
//             className="bg-white mt-4 px-2 py-2 rounded-lg flex items-center gap-2"
//           >
//             <div className="p-6 rounded-2xl mr-2 bg-blue-50">
//               {/* Icon */}
//               <FaLightbulb className="text-base" size={20} />
//             </div>

//             {/* Text */}
//             <p className="description leading-relaxed">
//               <span className="font-bold text-[#0b1c33]">Option {index + 1}</span> {alt}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Recommendations Section */}
//       <div className="border p-4 rounded-lg">
//         <h2 className="title mb-5">Improvement Recommendations</h2>
//         {aiVisionData.vision_recommendations?.map(
//           (rec: string, index: number) => (
//             <div
//               key={index}
//               className="bg-white mt-4 px-2 py-2 rounded-lg flex items-center gap-2"
//             >
//               <div className="p-6 rounded-2xl mr-2 bg-blue-50">
//                 {/* Icon */}
//                 <FaLightbulb className="text-base" size={20} />
//               </div>

//               {/* Text */}
//               <p className="description leading-relaxed">
//                 <span className="font-bold text-[#0b1c33]">Option {index + 1}</span> {rec}
//               </p>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   ) : (
//     <div className="text-center py-8">
//       <p className="description">No AI insights available</p>
//     </div>
//   )}
// </div>

//         </div>
//       </div>
//          {/* Ai insight drawer end  */}
//     </div>
//   );
// };

// export default AfterPage;

//? done 

"use client";
import React, { useState } from "react";
import { FaLightbulb, FaRegEdit } from "react-icons/fa";
import Image from "next/image";
import LinkImage from "@/public/image/link-icon.svg";
import Link from "next/link";
import {
  useCreateVisionMutation,
  useCreateAIVisionQuery, // ✅ using query now
} from "@/redux/api/blueprint/vison/visonApi";
import toast from "react-hot-toast"; 
import ClarhetImage from "@/public/image/chat-bot-bg.png";
import SpeedMeterPage from "@/app/dashboard/overview/_components/SpeedMeter";

type AfterPageProps = {
  visionData: { _id: string; vision: string };
};

const AfterPage: React.FC<AfterPageProps> = ({ visionData }) => {
  const [vision, setVision] = useState(visionData?.vision);

  // Vision editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedVision, setEditedVision] = useState(visionData?.vision);

  // AI Vision Drawer
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [triggerAI, setTriggerAI] = useState(false); // trigger query

  // Drawer placeholder (not used right now but kept from original)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [infoData, setInfoData] = useState<React.ReactNode>(null);

  // ✅ API hooks
  const [updateVision, { isLoading: isUpdating }] = useCreateVisionMutation();

  // ✅ AI Vision Query (runs only when triggered)
  const {
    data: aiVisionQuery,
    isFetching: isGenerating,
    error: aiError,
  } = useCreateAIVisionQuery(
    // { vision },
    // { skip: !triggerAI }
  );

  // ✅ unwrap actual AI data (response is in data[0])
  const aiVisionData = aiVisionQuery?.data?.[0];

  /** Save vision changes */
  const handleSave = async () => {
    try {
      const payload = { id: visionData._id, vision: editedVision };
      const res = await updateVision(payload).unwrap();

      setVision(res.data.vision);
      setIsModalOpen(false);
      toast.success("Vision updated successfully ");
    } catch (error) {
      console.error("Failed to update vision:", error);
      toast.error("Failed to update vision ");
    }
  };

  /** Cancel vision editing */
  const handleCancel = () => {
    setEditedVision(vision);
    setIsModalOpen(false);
  };

  /** Generate AI Vision Insights */
  const handleAIInsights = () => {
    setIsAIModalOpen(true);
    setTriggerAI(true); // ✅ query will now fetch
  };

  return (
    <div className="p-5 min-h-[calc(100vh-110px)]">
      {/* Vision Section */}
      <div className="bg-white border border-gray-200 p-5 rounded-lg relative">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-[#0b1c33] mb-2">Vision</h2>
          <div className="flex items-center gap-4">
            <Link href="#">
              <Image src={LinkImage} alt="Link Image" height={25} width={25} />
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-800 cursor-pointer flex text-lg items-center gap-2"
            >
              <FaRegEdit size={25} /> Edit
            </button>
          </div>
        </div>
        <p className="mb-2 text-base text-[#231f20]">{vision}</p>
      </div>

      {/* Trigger AI Insights Modal */}
      <div className="flex justify-end">
        <button
          onClick={handleAIInsights}
          className="bg-blue-900 mr-1 mt-5 text-white px-4 py-2 rounded-lg hover:bg-blue-950"
        >
          ClaretiAI Insights
        </button>
      </div>

      {/* Edit Vision Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-2xl relative">
            {/* Close */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-2xl text-gray-600"
            >
              &times;
            </button>

            {/* Header */}
            <div className="bg-blue-900 text-white rounded-t-2xl p-4 mb-4">
              <h2 className="text-xl font-bold">Edit Vision</h2>
            </div>

            {/* Content */}
            <div className="p-4 mb-4">
              <textarea
                value={editedVision}
                onChange={(e) => setEditedVision(e.target.value)}
                className="w-full min-h-[150px] p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end p-4 gap-4">
              <button
                onClick={handleCancel}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950 disabled:opacity-50"
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Insight Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isAIModalOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isAIModalOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => {
            setIsAIModalOpen(false);
            setTriggerAI(false);
          }}
        />
        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 w-full lg:w-[40rem] h-full bg-white shadow-lg transition-transform duration-300 ${
            isAIModalOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between relative items-center p-4 text-white">
            <Image
              src={ClarhetImage}
              alt="Product Interface showing challenges and data"
              layout="fill"
              objectFit="cover"
            />
            <h2 className="text-lg font-bold z-10">
              ClaretiAI Vision Insights
            </h2>
            <button
              onClick={() => {
                setIsAIModalOpen(false);
                setTriggerAI(false);
              }}
              className="text-2xl z-10"
            >
              &times;
            </button>
          </div>

          {/* Body */}
          <div className="p-4 overflow-y-auto h-[calc(100%-64px)] custom-scrollbar">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mb-4"></div>
                <p className="description">Generating AI insights...</p>
              </div>
            ) : aiVisionData ? (
              <div className="space-y-5">
                {/* Vision Score */}
                <div className="border p-4 rounded-lg">
                  <h2 className="title mb-5">Vision Score Analysis</h2>
                  <div className="flex items-center">
                  <SpeedMeterPage score={(aiVisionData as any).vision_score ?? 0} />
                  </div>
                  <p className="description mb-4">
                    <span className="subtitle mr-2">Overall Assessment:</span>
                    {/* {aiVisionData.vision_summary} */}
                  { (aiVisionData as any).vision_summary }
                  </p>
                </div>

                {/* Alternatives */}
                <div className="border bg-sky-50 p-4 rounded-lg">
                  <h2 className="title mb-5">Alternative Vision Suggestions</h2>
                  {(aiVisionData as any).vision_alt?.map((alt: string, index: number)  => (
                    <div
                      key={index}
                      className="bg-white mt-4 px-2 py-2 rounded-lg flex items-center gap-2"
                    >
                      <div className="p-6 rounded-2xl mr-2 bg-blue-50">
                        <FaLightbulb className="text-base" size={20} />
                      </div>
                      <p className="description leading-relaxed">
                        <span className="font-bold text-[#0b1c33]">
                          Option {index + 1}
                        </span>{" "}
                        {alt}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                <div className="border p-4 rounded-lg">
                  <h2 className="title mb-5">Improvement Recommendations</h2>
                  {(aiVisionData as any)?.vision_recommendations?.map(
                    (rec: string, index: number) => (
                      <div
                        key={index}
                        className="bg-white mt-4 px-2 py-2 rounded-lg flex items-center gap-2"
                      >
                        <div className="p-6 rounded-2xl mr-2 bg-blue-50">
                          <FaLightbulb className="text-base" size={20} />
                        </div>
                        <p className="description leading-relaxed">
                          <span className="font-bold text-[#0b1c33]">
                            Option {index + 1}
                          </span>{" "}
                          {rec}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : aiError ? (
              <div className="text-center py-8 text-red-500">
                Failed to load AI insights
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="description">No AI insights available</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Drawer end */}
    </div>
  );
};

export default AfterPage;
