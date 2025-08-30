// "use client";
// import React, { useState } from "react";
// import { FaRegEdit } from "react-icons/fa";
// import ReuseableDrawer from "../../_components/reuseable/ReuseableDrawer";
// import Image from "next/image";
// import LinkImage from "@/public/image/link-icon.svg";
// import Link from "next/link";
// import VisionAfter from "@/public/static-json-data/blueprint/vision-after-form-db";
// import { useCreateVisionMutation } from "@/redux/api/blueprint/vison/visonApi";
// import toast from "react-hot-toast"; // ✅ import toast

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

//   // For Drawer
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [infoData, setInfoData] = useState<React.ReactNode>(null);

//   // ✅ Mutation hook
//   const [updateVision, { isLoading: isUpdating }] = useCreateVisionMutation();

 

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

//   /** Open Drawer with AI insights */
//   const handleMoreInfo = () => {
//     setInfoData(<VisionAfter vision={vision} />);
//     setIsDrawerOpen(true);
//   };

//   return (
//     <div className="p-5 min-h-[calc(100vh-110px)]">
//       {/* Vision Section */}
//       <div className="bg-white border border-gray-200 p-5 rounded-lg relative">
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-2xl font-semibold mb-2">Vision</h2>
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
//         <p className="mb-2">{vision}</p>
//       </div>

//       {/* Trigger Drawer */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleMoreInfo}
//           className="bg-blue-900 mr-1 mt-5 text-white px-4 py-2 rounded-lg"
//         >
//           ClaretiAI Insights
//         </button>
//       </div>

//       {/* Drawer (reusable) */}
//       <ReuseableDrawer
//         isOpen={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         title="ClarhetAI Insights"
//         isAi={true}
//       >
    
//         {infoData || (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
//             <div className="animate-spin text-white rounded-full h-10 w-10 border-b-2 border-blue-800"></div>
//           </div>
//         )}
//       </ReuseableDrawer>

//       {/* Modal */}
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
//     </div>
//   );
// };

// export default AfterPage;
  


//?! clode 





// "use client";
// import React, { useState } from "react";
// import { FaRegEdit } from "react-icons/fa";
// import ReuseableDrawer from "../../_components/reuseable/ReuseableDrawer";
// import Image from "next/image";
// import LinkImage from "@/public/image/link-icon.svg";
// import Link from "next/link";
// import VisionAfter from "@/public/static-json-data/blueprint/vision-after-form-db";
// import { useCreateVisionMutation, useCreateAIVisionMutation } from "@/redux/api/blueprint/vison/visonApi";
// import toast from "react-hot-toast"; // ✅ import toast

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
//   const handleMoreInfo = () => {
//     setInfoData(<VisionAfter vision={vision} />);
//     setIsDrawerOpen(true);
//   };

//   return (
//     <div className="p-5 min-h-[calc(100vh-110px)]">
//       {/* Vision Section */}
//       <div className="bg-white border border-gray-200 p-5 rounded-lg relative">
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-2xl font-semibold mb-2">Vision</h2>
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
//         <p className="mb-2">{vision}</p>
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

//       {/* Drawer (reusable) */}
//       <ReuseableDrawer
//         isOpen={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         title="ClarhetAI Insights"
//         isAi={true}
//       >
//         {infoData || (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
//             <div className="animate-spin text-white rounded-full h-10 w-10 border-b-2 border-blue-800"></div>
//           </div>
//         )}
//       </ReuseableDrawer>

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

//       {/* AI Vision Insights Modal */}
//       {isAIModalOpen && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
//           <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto relative">
//             {/* Close Button */}
//             <button
//               onClick={() => {
//                 setIsAIModalOpen(false);
//                 setAiVisionData(null);
//               }}
//               className="absolute top-3 right-3 text-2xl text-gray-600 z-10"
//             >
//               &times;
//             </button>

//             {/* Header */}
//             <div className="bg-blue-900 text-white rounded-t-2xl p-4 mb-4 sticky top-0">
//               <h2 className="text-xl font-bold">ClaretiAI Vision Insights</h2>
//             </div>

//             {/* Content */}
//             <div className="p-6">
//               {isGenerating ? (
//                 <div className="flex flex-col items-center justify-center py-12">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mb-4"></div>
//                   <p className="text-gray-600">Generating AI insights...</p>
//                 </div>
//               ) : aiVisionData ? (
//                 <div className="space-y-6">
//                   {/* Vision Score */}
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <h3 className="text-lg font-semibold text-blue-900 mb-2">Vision Score</h3>
//                     <div className="flex items-center gap-3">
//                       <div className="text-3xl font-bold text-blue-800">
//                         {aiVisionData.vision_score}/100
//                       </div>
//                       <div className="flex-1 bg-gray-200 rounded-full h-3">
//                         <div
//                           className="bg-blue-600 h-3 rounded-full transition-all duration-300"
//                           style={{ width: `${aiVisionData.vision_score}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Vision Summary */}
//                   <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">Summary</h3>
//                     <p className="text-gray-700 leading-relaxed">{aiVisionData.vision_summary}</p>
//                   </div>

//                   {/* Alternative Visions */}
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                     <h3 className="text-lg font-semibold text-green-900 mb-3">Alternative Vision Suggestions</h3>
//                     <div className="space-y-3">
//                       {aiVisionData.vision_alt?.map((alt: string, index: number) => (
//                         <div key={index} className="bg-white border border-green-300 rounded-lg p-3">
//                           <div className="flex items-start gap-3">
//                             <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full min-w-fit">
//                               Option {index + 1}
//                             </span>
//                             <p className="text-gray-700 flex-1">{alt}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Recommendations */}
//                   <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
//                     <h3 className="text-lg font-semibold text-orange-900 mb-3">Recommendations</h3>
//                     <div className="space-y-2">
//                       {aiVisionData.vision_recommendations?.map((rec: string, index: number) => (
//                         <div key={index} className="flex items-start gap-3 bg-white border border-orange-300 rounded-lg p-3">
//                           <span className="bg-orange-100 text-orange-800 text-sm font-medium px-2 py-1 rounded-full min-w-fit">
//                             {index + 1}
//                           </span>
//                           <p className="text-gray-700 flex-1">{rec}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <p className="text-gray-600">No AI insights available</p>
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="flex justify-end p-4 border-t border-gray-200">
//               <button
//                 onClick={() => {
//                   setIsAIModalOpen(false);
//                   setAiVisionData(null);
//                 }}
//                 className="bg-gray-300 px-6 py-2 rounded-md hover:bg-gray-400"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AfterPage;
 

//? working code without more info modal 

// "use client";
// import React, { useState } from "react";
// import { FaLightbulb, FaRegEdit } from "react-icons/fa";
// import ReuseableDrawer from "../../_components/reuseable/ReuseableDrawer";
// import Image from "next/image";
// import LinkImage from "@/public/image/link-icon.svg";
// import Link from "next/link";
// import VisionAfter from "@/public/static-json-data/blueprint/vision-after-form-db";
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
//           <h2 className="text-2xl font-semibold mb-2">Vision</h2>
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
//         <p className="mb-2">{vision}</p>
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
//               <button>More Info</button>
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
//             {isGenerating ? (
//               <div className="flex flex-col items-center justify-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mb-4"></div>
//                 <p className="text-gray-600">Generating AI insights...</p>
//               </div>
//             ) : aiVisionData ? (
//               <div className="space-y-5">
//                 {/* Vision Score Section */}
//                 <div className="border p-4 rounded-lg">
//                   <h2 className="font-semibold mb-5">Vision Score Analysis</h2>
//                   <div className="flex items-center">
                    
//                     <SpeedMeterPage score={aiVisionData.vision_score} />
                   
//                   </div>
//                   <p className="text-xs font-thin mb-4 text-gray-600">
//                     <span className="text-xs mr-2 text-black font-semibold">
//                       Overall Assessment:
//                     </span>
//                     {aiVisionData.vision_summary}
//                   </p>
//                 </div>

//                 {/* Alternative Vision Suggestions */}
//                 <div className="border bg-sky-50 p-4 rounded-lg">
//                   <h2 className="font-semibold mb-5">Alternative Vision Suggestions</h2>
//                   {aiVisionData.vision_alt?.map((alt: string, index: number) => (
                    
//                       <div key={index} className="bg-white mt-4  px-2 py-2 rounded-lg flex items-center gap-2">
//         <div className="p-6 rounded-2xl mr-2 bg-blue-50">

//       {/* Icon */}
//       <FaLightbulb className=" text-base " size={20} />
//         </div>

//       {/* Text */}
//       <p className="text-gray-700 text-[12px] leading-relaxed">
//         <span className="font-semibold">Option {index + 1}</span> {alt}
//       </p>
//     </div>
                  
//                   ))}
//                 </div>

//                 {/* Recommendations Section */}
//                 <div className="border p-4 rounded-lg">
//                   <h2 className="font-semibold mb-5">Improvement Recommendations</h2>
//                   {aiVisionData.vision_recommendations?.map((rec: string, index: number) => (
//                      <div key={index} className="bg-white mt-4  px-2 py-2 rounded-lg flex items-center gap-2">
//         <div className="p-6 rounded-2xl mr-2 bg-blue-50">

//       {/* Icon */}
//       <FaLightbulb className=" text-base " size={20} />
//         </div>

//       {/* Text */}
//       <p className="text-gray-700 text-[12px] leading-relaxed">
//         <span className="font-semibold">Option {index + 1}</span> {rec}
//       </p>
//     </div>
//                   ))}
//                 </div>

               
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <p className="text-gray-600">No AI insights available</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//          {/* Ai insight drawer end  */}
//     </div>
//   );
// };

// export default AfterPage;












//? try 2 









"use client";
import React, { useState } from "react";
import { FaLightbulb, FaRegEdit } from "react-icons/fa";
import Image from "next/image";
import LinkImage from "@/public/image/link-icon.svg";
import Link from "next/link";
import { useCreateVisionMutation, useCreateAIVisionMutation } from "@/redux/api/blueprint/vison/visonApi";
import toast from "react-hot-toast"; // ✅ import toast
import ClarhetImage from "@/public/image/chat-bot-bg.png"
import SpeedMeterPage from "@/app/dashboard/overview/_components/SpeedMeter";

type AfterPageProps = {
  visionData: { _id: string; vision: string };
};

const AfterPage: React.FC<AfterPageProps> = ({ visionData }) => {
  const [vision, setVision] = useState(
    visionData?.vision 
  );

  // For editing Vision (modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedVision, setEditedVision] = useState(
    visionData?.vision 
  );

  // For AI Vision Modal
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiVisionData, setAiVisionData] = useState<any>(null);

  // For Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [infoData, setInfoData] = useState<React.ReactNode>(null);

  // ✅ Mutation hooks
  const [updateVision, { isLoading: isUpdating }] = useCreateVisionMutation();
  const [generateVision, { isLoading: isGenerating }] = useCreateAIVisionMutation();
  console.log(aiVisionData);

  /** Save vision changes (API call) */
  const handleSave = async () => {
    try {
      const payload = { id: visionData._id, vision: editedVision };
      const res = await updateVision(payload).unwrap();

      setVision(res.data.vision); // update local state
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
  const handleAIInsights = async () => {
    try {
      setIsAIModalOpen(true);
      const payload = { vision: vision };
      const res = await generateVision(payload).unwrap();
      setAiVisionData(res.data);
    } catch (error) {
      console.error("Failed to generate AI vision:", error);
      toast.error("Failed to generate AI insights");
      setIsAIModalOpen(false);
    }
  };

  /** Open Drawer with AI insights */


  return (
    <div className="p-5 min-h-[calc(100vh-110px)]">
      {/* Vision Section */}
      <div className="bg-white border border-gray-200 p-5 rounded-lg relative">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-[#0b1c33]
 mb-2">Vision</h2>
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
        <p className="mb-2 text-base text-[#231f20]">{vision}</p>
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
            {/* Close Button */}
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

            {/* Footer Buttons */}
            <div className="flex justify-end p-4 gap-4">
              {/* more Info button  */}
              
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

      {/* Ai insight drawer start  */}
      {/* AI Vision Insights Modal - Drawer Style */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isAIModalOpen ? "visible" : "invisible"
        }`}
      >
        {/* Background overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isAIModalOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => {
            setIsAIModalOpen(false);
            setAiVisionData(null);
          }}
        />
        {/* Drawer content */}
        <div
          className={`absolute top-0 right-0 w-full lg:w-[40rem] h-full bg-white shadow-lg transition-transform duration-300 ${
            isAIModalOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between  relative items-center p-4  text-white">
            <Image
          src={ClarhetImage}
          alt="Product Interface showing challenges and data"
          layout="fill"
          objectFit="cover"
        />
            <h2 className="text-lg font-bold z-10">ClaretiAI Vision Insights</h2>
            <button
              onClick={() => {
                setIsAIModalOpen(false);
                setAiVisionData(null);
              }}
              className="text-2xl z-10"
            >
              &times;
            </button>
          </div>

          {/* Scrollable Body with Custom Scrollbar */}
          <div className="p-4 overflow-y-auto h-[calc(100%-64px)] custom-scrollbar">
  {isGenerating ? (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mb-4"></div>
      <p className="description">Generating AI insights...</p>
    </div>
  ) : aiVisionData ? (
    <div className="space-y-5">
      {/* Vision Score Section */}
      <div className="border p-4 rounded-lg">
        <h2 className="title mb-5">Vision Score Analysis</h2>
        <div className="flex items-center">
          <SpeedMeterPage score={aiVisionData.vision_score} />
        </div>
        <p className="description mb-4">
          <span className="subtitle mr-2">Overall Assessment:</span>
          {aiVisionData.vision_summary}
        </p>
      </div>

      {/* Alternative Vision Suggestions */}
      <div className="border bg-sky-50 p-4 rounded-lg">
        <h2 className="title mb-5">Alternative Vision Suggestions</h2>
        {aiVisionData.vision_alt?.map((alt: string, index: number) => (
          <div
            key={index}
            className="bg-white mt-4 px-2 py-2 rounded-lg flex items-center gap-2"
          >
            <div className="p-6 rounded-2xl mr-2 bg-blue-50">
              {/* Icon */}
              <FaLightbulb className="text-base" size={20} />
            </div>

            {/* Text */}
            <p className="description leading-relaxed">
              <span className="font-bold text-[#0b1c33]">Option {index + 1}</span> {alt}
            </p>
          </div>
        ))}
      </div>

      {/* Recommendations Section */}
      <div className="border p-4 rounded-lg">
        <h2 className="title mb-5">Improvement Recommendations</h2>
        {aiVisionData.vision_recommendations?.map(
          (rec: string, index: number) => (
            <div
              key={index}
              className="bg-white mt-4 px-2 py-2 rounded-lg flex items-center gap-2"
            >
              <div className="p-6 rounded-2xl mr-2 bg-blue-50">
                {/* Icon */}
                <FaLightbulb className="text-base" size={20} />
              </div>

              {/* Text */}
              <p className="description leading-relaxed">
                <span className="font-bold text-[#0b1c33]">Option {index + 1}</span> {rec}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  ) : (
    <div className="text-center py-8">
      <p className="description">No AI insights available</p>
    </div>
  )}
</div>

        </div>
      </div>
         {/* Ai insight drawer end  */}
    </div>
  );
};

export default AfterPage;




// "use client";
// import React, { useState } from "react";
// import { FaLightbulb, FaRegEdit } from "react-icons/fa";
// import ReuseableDrawer from "../../_components/reuseable/ReuseableDrawer";
// import Image from "next/image";
// import LinkImage from "@/public/image/link-icon.svg";
// import Link from "next/link";
// import VisionAfter from "@/public/static-json-data/blueprint/vision-after-form-db";
// import { useCreateVisionMutation, useCreateAIVisionMutation } from "@/redux/api/blueprint/vison/visonApi";
// import toast from "react-hot-toast"; // ✅ import toast
// import ClarhetImage from "@/public/image/chat-bot-bg.png"
// import SpeedMeterPage from "@/app/dashboard/overview/_components/SpeedMeter";
// import { VisionHTML } from "@/public/static-json-data/blueprint/blueprint-vision";
// // ✅ Static content component

// type AfterPageProps = {
//   visionData: { _id: string; vision: string };
// };

// const AfterPage: React.FC<AfterPageProps> = ({ visionData }) => {
//   const [vision, setVision] = useState(visionData?.vision);

//   // For editing Vision (modal)
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editedVision, setEditedVision] = useState(visionData?.vision);

//   // For AI Vision Modal
//   const [isAIModalOpen, setIsAIModalOpen] = useState(false);
//   const [aiVisionData, setAiVisionData] = useState<any>(null);

//   // For Static Info Drawer
//   const [isStaticDrawerOpen, setIsStaticDrawerOpen] = useState(false);

//   // ✅ Mutation hooks
//   const [updateVision, { isLoading: isUpdating }] = useCreateVisionMutation();
//   const [generateVision, { isLoading: isGenerating }] = useCreateAIVisionMutation();

//   /** Save vision changes (API call) */
//   const handleSave = async () => {
//     try {
//       const payload = { id: visionData._id, vision: editedVision };
//       const res = await updateVision(payload).unwrap();
//       setVision(res.data.vision); // update local state
//       setIsModalOpen(false);
//       toast.success("Vision updated successfully");
//     } catch (error) {
//       console.error("Failed to update vision:", error);
//       toast.error("Failed to update vision");
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

//   return (
//     <div className="p-5 min-h-[calc(100vh-110px)]">
//       {/* Vision Section */}
//       <div className="bg-white border border-gray-200 p-5 rounded-lg relative">
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-2xl font-semibold mb-2">Vision</h2>
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
//         <p className="mb-2">{vision}</p>
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
//               <button
//                 onClick={() => setIsStaticDrawerOpen(true)}
//                 className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
//               >
//                 More Info
//               </button>
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

//       {/* AI Insight Drawer */}
//       <div
//         className={`fixed inset-0 z-50 transition-all duration-300 ${
//           isAIModalOpen ? "visible" : "invisible"
//         }`}
//       >
//         <div
//           className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
//             isAIModalOpen ? "opacity-100" : "opacity-0"
//           }`}
//           onClick={() => {
//             setIsAIModalOpen(false);
//             setAiVisionData(null);
//           }}
//         />
//         <div
//           className={`absolute top-0 right-0 w-full lg:w-[40rem] h-full bg-white shadow-lg transition-transform duration-300 ${
//             isAIModalOpen ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           {/* Header */}
//           <div className="flex justify-between relative items-center p-4 text-white">
//             <Image
//               src={ClarhetImage}
//               alt="AI Background"
//               layout="fill"
//               objectFit="cover"
//             />
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

//           {/* Scrollable Body */}
//           <div className="p-4 overflow-y-auto h-[calc(100%-64px)] custom-scrollbar">
//             {isGenerating ? (
//               <div className="flex flex-col items-center justify-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mb-4"></div>
//                 <p className="text-gray-600">Generating AI insights...</p>
//               </div>
//             ) : aiVisionData ? (
//               <VisionAfter {...aiVisionData} />
//             ) : (
//               <div className="text-center py-8">
//                 <p className="text-gray-600">No AI insights available</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
            
//       {/* Static Info Drawer */}
//       <div
//         className={`fixed inset-0 z-50 transition-all duration-300 ${
//           isStaticDrawerOpen ? "visible" : "invisible"
//         }`}
//       >
//         <div
//           className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
//             isStaticDrawerOpen ? "opacity-100" : "opacity-0"
//           }`}
//           onClick={() => setIsStaticDrawerOpen(false)}
//         />
//         <div
//           className={`absolute top-0 right-0 w-full lg:w-[40rem] h-full bg-white shadow-lg transition-transform duration-300 ${
//             isStaticDrawerOpen ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           <div className="flex justify-between relative items-center p-4 bg-yellow-500 text-black/60">
//             <h2 className="text-lg font-bold z-10">Vision Insights</h2>
//             <button
//               onClick={() => setIsStaticDrawerOpen(false)}
//               className="text-2xl z-10"
//             >
//               &times;
//             </button>
//           </div>
//           <div className="p-4 overflow-y-auto h-[calc(100%-64px)] custom-scrollbar">
//             <VisionHTML /> {/* ✅ Static content */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AfterPage;"use client";
















// import React, { useState, useCallback } from "react";
// import { FaRegEdit } from "react-icons/fa";
// import Image from "next/image";
// import LinkImage from "@/public/image/link-icon.svg";
// import Link from "next/link";
// import { useCreateVisionMutation, useCreateAIVisionMutation } from "@/redux/api/blueprint/vison/visonApi";
// import toast from "react-hot-toast";
// import ClarhetImage from "@/public/image/chat-bot-bg.png";
// import dynamic from "next/dynamic";

// // Dynamic imports to prevent hydration issues
// const VisionAfter = dynamic(() => import("@/public/static-json-data/blueprint/vision-after-form-db"), {
//   ssr: false
// });

// const VisionHTML = dynamic(() => import("@/public/static-json-data/blueprint/blueprint-vision").then(mod => ({ default: mod.VisionHTML })), {
//   ssr: false
// });

// type AfterPageProps = {
//   visionData: { _id: string; vision: string };
// };

// const AfterPage: React.FC<AfterPageProps> = ({ visionData }) => {
//   // Simple state without complex initialization
//   const [vision, setVision] = useState(visionData?.vision || "");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editedVision, setEditedVision] = useState(visionData?.vision || "");
//   const [isAIModalOpen, setIsAIModalOpen] = useState(false);
//   const [aiVisionData, setAiVisionData] = useState<any>(null);
//   const [isStaticDrawerOpen, setIsStaticDrawerOpen] = useState(false);

//   const [updateVision, { isLoading: isUpdating }] = useCreateVisionMutation();
//   const [generateVision, { isLoading: isGenerating }] = useCreateAIVisionMutation();

//   const handleSave = useCallback(async () => {
//     if (isUpdating) return;
    
//     try {
//       const payload = { id: visionData._id, vision: editedVision };
//       const res = await updateVision(payload).unwrap();
//       setVision(res.data.vision);
//       setIsModalOpen(false);
//       toast.success("Vision updated successfully");
//     } catch (error) {
//       console.error("Failed to update vision:", error);
//       toast.error("Failed to update vision");
//     }
//   }, [visionData._id, editedVision, updateVision, isUpdating]);

//   const handleCancel = useCallback(() => {
//     setEditedVision(vision);
//     setIsModalOpen(false);
//   }, [vision]);

//   const handleAIInsights = useCallback(async () => {
//     if (isGenerating) return;
    
//     try {
//       setIsAIModalOpen(true);
//       setAiVisionData(null);
//       const payload = { vision: vision };
//       const res = await generateVision(payload).unwrap();
//       setAiVisionData(res.data);
//     } catch (error) {
//       console.error("Failed to generate AI vision:", error);
//       toast.error("Failed to generate AI insights");
//       setIsAIModalOpen(false);
//     }
//   }, [vision, generateVision, isGenerating]);

//   const openEditModal = useCallback(() => {
//     setEditedVision(vision);
//     setIsModalOpen(true);
//   }, [vision]);

//   const closeAIModal = useCallback(() => {
//     setIsAIModalOpen(false);
//     setAiVisionData(null);
//   }, []);

//   return (
//     <div className="p-5 min-h-[calc(100vh-110px)]">
//       {/* Vision Section */}
//       <div className="bg-white border border-gray-200 p-5 rounded-lg relative">
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-2xl font-semibold mb-2">Vision</h2>
//           <div className="flex items-center gap-4">
//             <Link href="#">
//               <Image src={LinkImage} alt="Link Image" height={25} width={25} />
//             </Link>
//             <button
//               onClick={openEditModal}
//               className="text-blue-800 cursor-pointer flex text-lg items-center gap-2"
//               type="button"
//             >
//               <FaRegEdit size={25} /> Edit
//             </button>
//           </div>
//         </div>
//         <p className="mb-2">{vision}</p>
//       </div>

//       {/* Trigger AI Insights Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleAIInsights}
//           className="bg-blue-900 mr-1 mt-5 text-white px-4 py-2 rounded-lg hover:bg-blue-950"
//           type="button"
//         >
//           ClaretiAI Insights
//         </button>
//       </div>

//       {/* Edit Vision Modal */}
//       {isModalOpen ? (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div className="fixed inset-0 bg-black opacity-60" onClick={() => setIsModalOpen(false)}></div>
//           <div className="relative bg-white rounded-2xl shadow-lg w-11/12 max-w-2xl">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-gray-800"
//               type="button"
//             >
//               ×
//             </button>

//             <div className="bg-blue-900 text-white rounded-t-2xl p-4 mb-4">
//               <h2 className="text-xl font-bold">Edit Vision</h2>
//             </div>

//             <div className="p-4 mb-4">
//               <textarea
//                 value={editedVision}
//                 onChange={(e) => setEditedVision(e.target.value)}
//                 className="w-full min-h-[150px] p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your vision statement..."
//               />
//             </div>

//             <div className="flex justify-end p-4 gap-4">
//               <button
//                 onClick={() => setIsStaticDrawerOpen(true)}
//                 className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
//                 type="button"
//               >
//                 More Info
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
//                 type="button"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 disabled={isUpdating}
//                 className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950 disabled:opacity-50"
//                 type="button"
//               >
//                 {isUpdating ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : null}

//       {/* AI Insight Drawer */}
//       {isAIModalOpen ? (
//         <div className="fixed inset-0 z-50">
//           <div className="fixed inset-0 bg-black opacity-50" onClick={closeAIModal}></div>
//           <div className="fixed top-0 right-0 w-full lg:w-[40rem] h-full bg-white shadow-lg">
//             {/* Header */}
//             <div className="relative p-4 text-white overflow-hidden h-16">
//               <div 
//                 className="absolute inset-0"
//                 style={{ 
//                   backgroundImage: `url(${ClarhetImage.src})`,
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center'
//                 }}
//               ></div>
//               <div className="relative z-10 flex justify-between items-center h-full">
//                 <h2 className="text-lg font-bold">ClaretiAI Vision Insights</h2>
//                 <button
//                   onClick={closeAIModal}
//                   className="text-2xl hover:text-gray-200"
//                   type="button"
//                 >
//                   ×
//                 </button>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 64px)' }}>
//               {isGenerating ? (
//                 <div className="flex flex-col items-center justify-center py-12">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mb-4"></div>
//                   <p className="text-gray-600">Generating AI insights...</p>
//                 </div>
//               ) : aiVisionData ? (
//                 <VisionAfter {...aiVisionData} />
//               ) : (
//                 <div className="text-center py-8">
//                   <p className="text-gray-600">No AI insights available</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : null}
            
//       {/* Static Info Drawer */}
//       {isStaticDrawerOpen ? (
//         <div className="fixed inset-0 z-50">
//           <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsStaticDrawerOpen(false)}></div>
//           <div className="fixed top-0 right-0 w-full lg:w-[40rem] h-full bg-white shadow-lg">
//             <div className="flex justify-between items-center p-4 bg-yellow-500 text-black h-16">
//               <h2 className="text-lg font-bold">Vision Insights</h2>
//               <button
//                 onClick={() => setIsStaticDrawerOpen(false)}
//                 className="text-2xl hover:text-gray-700"
//                 type="button"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 64px)' }}>
//               {/* <VisionHTML /> */}
//               <div className="space-y-5">
//     <div className="border p-4 rounded-lg">
//       <h2 className=" font-semibold mb-5">Why have a vision statement?</h2>
//       <p className="text-xs font-thin mb-4  text-gray-600">
//         <span className="text-xs mr-2 text-black font-semibold">
//           Guiding Force:
//         </span>{" "}
//         A vision statement acts as a compass, driving a company toward its goals
//         by clarifying its intent and ensuring alignment toward a shared vision.
//       </p>
//       <p className="text-xs font-thin mb-4  text-gray-600">
//         <span className="text-xs mr-2 text-black font-semibold">
//           Motivation:
//         </span>{" "}
//         A clear and inspiring vision motivates employees and fosters a positive
//         and productive work environment.
//       </p>
//       <p className="text-xs font-thin mb-4  text-gray-600">
//         <span className="text-xs mr-2 text-black font-semibold">
//           Strategic Decision-Making:
//         </span>{" "}
//         A clear vision is essential in making strategic decisions and provides a
//         framework to ensure that choices align with the company&#39;s goals.
//       </p>
//       <p className="text-xs font-thin mb-4  text-gray-600">
//         <span className="text-xs mr-2 text-black font-semibold">
//           Brand Image:
//         </span>{" "}
//         A well-crafted vision statement builds a positive brand image. It
//         communicates the company&#39;s values and commitments to customers,
//         investors, and society.
//       </p>
//       <p className="text-xs font-thin mb-4  text-gray-600">
//         <span className="text-xs mr-2 text-black font-semibold">
//           Employee Engagement:
//         </span>{" "}
//         Employees are more motivated and engaged when they understand the
//         broader purpose of their work. A compelling vision fosters a sense of
//         belonging and commitment among team members.
//       </p>
//       <p className="text-xs font-thin mb-4  text-gray-600">
//         <span className="text-xs mr-2 text-black font-semibold">
//           Strategic Alignment:
//         </span>{" "}
//         A clear vision ensures that everyone within the organization is moving
//         in the same direction. It helps align diverse functions and teams toward
//         common goals.
//       </p>
//       <p className="text-xs font-thin mb-4  text-gray-600">
//         <span className="text-xs mr-2 text-black font-semibold">
//           Attracting Stakeholders:
//         </span>{" "}
//         A strong vision statement helps attract investors, partners, and
//         customers who resonate with the company&#39;s values and aspirations,
//         fostering trust and collaboration.
//       </p>
//     </div>
//     <div className="border p-4 rounded-lg">
//       <h2 className=" font-semibold mb-5">What it should include?</h2>
//       <p className="text-xs font-thin mb-4  text-gray-600">
//         <span className="text-xs mr-2 text-black font-semibold">Clarity</span>{" "}
//         Keep it clear and concise. A vision statement should be easily
//         understood by anyone, both inside and outside the organization.
//       </p>
//       <p className="text-xs font-thin mb-4  text-gray-600">
//         <span className="text-xs mr-2 text-black font-semibold">
//           Inspiration:
//         </span>{" "}
//         Infuse it with inspiration. A compelling vision statement should evoke a
//         sense of purpose and motivation among employees and stakeholders.
//       </p>
//       <p className="text-xs font-thin mb-4  text-gray-600">
//         <span className="text-xs mr-2 text-black font-semibold">
//           Future Orientation:
//         </span>{" "}
//         Focus on the future. A vision statement is not about the current state
//         of the company but about its long-term aspirations and goals.
//       </p>
//       <p className="text-xs font-thin mb-4  text-gray-600">
//         <span className="text-xs mr-2 text-black font-semibold">Values: </span>{" "}
//         Integrate the company&#39;s core values. The vision should align with the
//         principles that define the organization.
//       </p>
//     </div>
//     <div className="border p-4 rounded-lg">
//       <h2 className=" font-semibold mb-5">What it should not include?</h2>
//       <p className="text-xs font-thin mb-4  text-gray-600">
//         <span className="text-xs mr-2 text-black font-semibold">Jargon:</span>{" "}
//         Avoid industry jargon that may be unclear to those outside the company.
//       </p>
//       <p className="text-xs font-thin mb-4  text-gray-600">
//         <span className="text-xs mr-2 text-black font-semibold">
//           Generic Phrases:{" "}
//         </span>{" "}
//         Steer clear of generic or cliché phrases that could apply to any
//         business. Make it unique to your organization.
//       </p>
//       <p className="text-xs font-thin mb-4  text-gray-600">
//         <span className="text-xs mr-2 text-black font-semibold">
//           Overly Detailed Plans:
//         </span>
//         A vision statement is not a business plan. It should capture the essence
//         of the company&#39;s goals without getting bogged down in specifics.
//       </p>
//     </div>

//     <div className="border p-4 rounded-lg">
//       <h2 className=" font-semibold mb-5">
//         Dos and Don&#39;ts of Vision Statement
//       </h2>
//       {/* dos container */}
//       <div className="flex justify-between w-full gap-3">
//         <div className="border p-2 rounded-md w-full">
//           <h2 className="text-sm font-semibold mb-5">Do&#39;s</h2>
//           <p className="text-[10px] font-thin mb-2  text-gray-600">
//             <span className="text-[10px] mr-2 text-black font-semibold">
//               Engage Stakeholders:{" "}
//             </span>{" "}
//             Involve key stakeholders in the visioning process to ensure all the
//             crucial and diverse perspectives are considered.
//           </p>
//           <p className="text-[10px] font-thin mb-2  text-gray-600">
//             <span className="text-[10px] mr-2 text-black font-semibold">
//               Review Regularly:{" "}
//             </span>{" "}
//             A vision statement is not set in stone. Regularly review and update
//             it to reflect changes in the business environment or organizational
//             goals.
//           </p>
//           <p className="text-[10px] font-thin mb-2  text-gray-600">
//             <span className="text-[10px] mr-2 text-black font-semibold">
//               Be Memorable:{" "}
//             </span>{" "}
//             Craft a statement that is memorable and easily recalled by
//             employees, stakeholders, and customers.
//           </p>
//         </div>
//         <div className="border p-2 rounded-md w-full">
//           <h2 className="text-sm font-semibold mb-5">Don&#39;ts</h2>
//           <p className="text-[10px] font-thin mb-2  text-gray-600">
//             <span className="text-[10px] mr-2 text-black font-semibold">
//               Jargon:
//             </span>{" "}
//             Steer clear of industry jargon that may be unclear to those outside
//             the organization.
//           </p>
//           <p className="text-[10px] font-thin mb-2  text-gray-600">
//             <span className="text-[10px] mr-2 text-black font-semibold">
//               Overcomplicate:
//             </span>{" "}
//             Keep the language simple. A convoluted vision statement can be
//             confusing and lose its impact.
//           </p>
//           <p className="text-[10px] font-thin mb-2  text-gray-600">
//             <span className="text-[10px] mr-2 text-black font-semibold">
//               Copy others:
//             </span>{" "}
//             Your vision should be unique to your organization. Avoid copying
//             vision statements from other companies.
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default AfterPage;