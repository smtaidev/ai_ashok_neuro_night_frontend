// "use client";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useState } from "react";
// import SharedDrawerButton from "../../_components/reuseable/SharedDrawerButton";
// import AlignmentBeforeData from "@/public/static-json-data/blueprint/business-goal-before";

// type BusinessGoalsForm = {
//   title: string;
//   description: string;
//   related_strategic_theme: string[];
//   goalOwner: string[];
//   funding: number;
//   assigned_functions: string;
//   duration: string;
//   goalTimelineStart: string;
//   goalTimelineEnd: string;
//   priority: string;
//   goalProgress: number;
//   isSpecificStrategic: string;
//   hasTalent: string; // NEW
//   talentDetails?: string;
//   resource_readiness: string;
//   resourcesDetails?: string;
//   esg_issues: string;
//   environmentalIssuesDetails?: string;
//   goal_impact: string;

//   // Additional info fields merged here
//   risksChallenges?: string;
//   risks?: string;
//   regulatoryCompliance?: string;
//   compliance?: string;
//   culturalRealignment?: string;
//   culture?: string;
//   changeTransformation?: string;
//   change_management?: string;
//   capabilityEnhancement?: string;
//   l_and_d?: string;
//   capabilityInfluenced?: string;
//   capabilityOwner?: string;
//   capabilities?: string;
//   existing_capabilities_to_enhance?: string;
//   enhanceDetails?: string;
//   new_capabilities_needed?: string;
//   capabilityName?: string;
//   capabilityType?: string;
//   capabilityDescription?: string;
//   otherDetails?: string;
//   enhancementDetails?: string;
//   newCapabilityName?: string;
//   capabilityOwners?: string[];
// };

// type BusinessGoalsModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (data: { businessGoals: BusinessGoalsForm }) => void;
// };

// const BusinessGoalsModal = ({
//   isOpen,
//   onClose,
//   onSave,
// }: BusinessGoalsModalProps) => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm<BusinessGoalsForm>({
//     defaultValues: {
//       goalOwner: [],
//       new_capabilities_needed: "No",
//       existing_capabilities_to_enhance: "No",
//     },
//   });



// const [capabilityOwners, setCapabilityOwners] = useState<string[]>([]);
// const [capabilityOwnerInput, setCapabilityOwnerInput] = useState("");

// const handleAddCapabilityOwner = () => {
//   if (capabilityOwnerInput.trim()) {
//     setCapabilityOwners([...capabilityOwners, capabilityOwnerInput.trim()]);
//     setCapabilityOwnerInput("");
//   }
// };

// const handleRemoveCapabilityOwner = (index: number) => {
//   setCapabilityOwners(capabilityOwners.filter((_, i) => i !== index));
// };




//   const [ownerInput, setOwnerInput] = useState("");
//   const [owners, setOwners] = useState<string[]>([]);
//   const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

//   const resource_readiness = watch("resource_readiness");
//   const esg_issues = watch("esg_issues");
//   const selectedCapability = watch("capabilities");
//   const selectedEnhanceCapability = watch("existing_capabilities_to_enhance");
//   const selectedNewCapability = watch("new_capabilities_needed");

//   const handleAddOwner = () => {
//     if (ownerInput.trim() !== "") {
//       const updatedOwners = [...owners, ownerInput.trim()];
//       setOwners(updatedOwners);
//       setValue("goalOwner", updatedOwners);
//       setOwnerInput("");
//     }
//   };

//   const handleRemoveOwner = (index: number) => {
//     const updatedOwners = owners.filter((_, i) => i !== index);
//     setOwners(updatedOwners);
//     setValue("goalOwner", updatedOwners);
//   };

//   const onSubmit: SubmitHandler<BusinessGoalsForm> = (data) => {
//     // console.log("Form Data to Save:", data);
//     onSave({ businessGoals: data });
//     reset();
//     setOwners([]);
//     setShowAdditionalInfo(false);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[95vh] overflow-y-auto">
//         <div className="bg-blue-900 text-white rounded-t-lg p-5 flex justify-between items-center">
//           <h2 className="text-2xl font-semibold">Business Goals</h2>
//           <button onClick={onClose} className="text-3xl font-light">
//             &times;
//           </button>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-5 border rounded-2xl p-4">
//               {/* Goal Title */}
//               <div>
//                 <label className="block text-[16px] font-medium text-gray-700 mb-1">
//                   Goal Title<span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   {...register("title", {
//                     required: "Goal Title is required",
//                   })}
//                   placeholder="Add Title....."
//                   className="w-full p-3 border border-gray-300 rounded-md bg-[#F2F5FA]"
//                 />
//                 {errors.title && (
//                   <p className="text-red-500 text-[16px]">
//                     {errors.title.message}
//                   </p>
//                 )}
//               </div>

//               {/* Goal Description */}
//               <div>
//                 <label className="block text-[16px] font-medium text-gray-700 mb-1">
//                   Goal Description<span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   {...register("description", {
//                     required: "Goal Description is required",
//                   })}
//                   placeholder="Add Details....."
//                   className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md bg-[#F2F5FA]"
//                 />
//                 {errors.description && (
//                   <p className="text-red-500 text-[16px]">
//                     {errors.description.message}
//                   </p>
//                 )}
//               </div>

//               {/* Strategic Themes as dropdown */}

//               <div>
//                 <label className="block text-[16px] font-medium text-gray-700 mb-2">
//                   What Strategic Theme is this business goal tied to?
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <div className="w-full p-3 border border-gray-300 rounded-md">
//                   <h3 className="p-2 border rounded bg-[#F2F5FA]/70">
//                     Select Strategic Themes
//                   </h3>
//                   {/* Dynamic values will be mapped here */}
//                   {[
//                     { value: "hasib" },
//                     { value: "nasir" },
//                     { value: "shofiq" },
//                   ].map((theme, index) => (
//                     <label className="block ml-4" key={index}>
//                       <input
//                         type="radio"
//                         {...register("related_strategic_theme", {
//                           required: "Strategic Theme is required",
//                         })}
//                         value={theme.value}
//                         className="mr-2 "
//                         defaultChecked={index === 0}
//                       />
//                       {theme.value}
//                     </label>
//                   ))}
//                 </div>
//                 {errors.related_strategic_theme && (
//                   <p className="text-red-500 text-[16px]">
//                     {errors.related_strategic_theme.message}
//                   </p>
//                 )}
//               </div>

//               {/* Goal Owner */}
//               <div className="group">
//                 <label className="block text-[16px] mb-3">
//                   Goal Owner<span className="text-red-500 ml-1">*</span>
//                 </label>
//                 <div className="border border-gray-300 rounded-xl p-5">
//                   <div className="flex gap-3 mb-4">
//                     <input
//                       type="text"
//                       value={ownerInput}
//                       onChange={(e) => setOwnerInput(e.target.value)}
//                       placeholder="Enter Owner Name"
//                       className="flex-1 p-3 border-2 bg-[#F2F5FA] rounded-lg  focus:ring-2 focus:ring-blue-200 "
//                     />
//                     <button
//                       type="button"
//                       onClick={handleAddOwner}
//                       disabled={!ownerInput.trim()}
//                       className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-3 rounded-lg  disabled:from-blue-800 disabled:to-blue-700 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 font-medium"
//                     >
//                       Add
//                     </button>
//                   </div>

//                   {owners.length > 0 ? (
//                     <div className="space-y-3">
//                       <p className="text-[16px] font-semibold text-gray-800 mb-2">
//                         Added Owners ({owners.length}):
//                       </p>
//                       <div className="flex flex-wrap gap-3">
//                         {owners.map((owner, index) => (
//                           <span
//                             key={index}
//                             className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[16px] font-semibold border-2 border-blue-300 transition-all duration-200"
//                           >
//                             {owner}
//                             <button
//                               type="button"
//                               onClick={() => handleRemoveOwner(index)}
//                               className="text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ml-1 transition-all duration-200"
//                               aria-label={`Remove ${owner}`}
//                             >
//                               ×
//                             </button>
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   ) : (
//                     <p className="text-gray-500 text-[16px] italic">
//                       Add goal owners using the input above
//                     </p>
//                   )}
//                 </div>
//                 {errors.goalOwner && (
//                   <p className="text-red-500 text-[16px] mt-2">
//                     At least one owner is required
//                   </p>
//                 )}
//               </div>

//               {/* Funding */}
//               <div>
//                 <label className="block text-[16px] font-medium text-gray-700 mb-1">
//                   Funding allocated toward achieving this goal?
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   {...register("funding", { required: "Funding is required" })}
//                   type="number"
//                   placeholder="Enter Amount....."
//                   className="w-full p-3 border bg-[#F2F5FA] border-gray-300 rounded-md"
//                 />
//                 {errors.funding && (
//                   <p className="text-red-500 text-[16px]">
//                     {errors.funding.message}
//                   </p>
//                 )}
//               </div>

//               {/* Business Function */}
//               <div>
//                 <label className="block text-[16px] font-medium text-gray-700 mb-1">
//                   Assign this goal to a Business Function(s)
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   {...register("assigned_functions", {
//                     required: "Business Function is required",
//                   })}
//                   className="w-full p-3 border bg-[#F2F5FA] border-gray-300 rounded-md"
//                 >
//                   <option value="">Select Function(s)</option>
//                   <option value="Sales">Sales</option>
//                   <option value="Marketing">Marketing</option>
//                 </select>
//                 {errors.assigned_functions && (
//                   <p className="text-red-500 text-[16px]">
//                     {errors.assigned_functions.message}
//                   </p>
//                 )}
//               </div>

//               {/* Goal Term */}
//               <div>
//                 <label className="block text-[16px] font-medium text-gray-700 mb-1">
//                   Is this a long-term or short-term goal?
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   {...register("duration", {
//                     required: "Goal Term is required",
//                   })}
//                   className="w-full p-3 border bg-[#F2F5FA] border-gray-300 rounded-md"
//                 >
//                   <option value="">Select Term</option>
//                   <option value="Long-term">Long-term</option>
//                   <option value="Short-term">Short-term</option>
//                 </select>
//                 {errors.duration && (
//                   <p className="text-red-500 text-[16px]">
//                     {errors.duration.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-5 border rounded-2xl p-4">
//               {/* Goal Timeline */}
//               <div>
//                 <label className="block text-[16px] font-medium text-gray-800 mb-4">
//                   Goal Timeline<span className="text-red-500">*</span>
//                 </label>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Start Date */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Start Date
//                     </label>
//                     <input
//                       type="date"
//                       {...register("goalTimelineStart", {
//                         required: "Start date is required",
//                       })}
//                       className="w-full p-3 border bg-[#F2F5FA] border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     {errors.goalTimelineStart && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.goalTimelineStart.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* End Date */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       End Date
//                     </label>
//                     <input
//                       type="date"
//                       {...register("goalTimelineEnd", {
//                         required: "End date is required",
//                       })}
//                       className="w-full p-3 border bg-[#F2F5FA] border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     {errors.goalTimelineEnd && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {errors.goalTimelineEnd.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               {/* goal priority and progress  */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Goal Priority */}
//                 <div>
//                   <label className="block text-[16px] font-medium text-gray-700 mb-1">
//                     Goal Priority<span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     {...register("priority", {
//                       required: "Priority is required",
//                     })}
//                     className="w-full p-3 border bg-[#F2F5FA] border-gray-300 rounded-md"
//                   >
//                     <option value="">Select Priority</option>
//                     <option value="High">High</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Low">Low</option>
//                   </select>
//                   {errors.priority && (
//                     <p className="text-red-500 text-[16px]">
//                       {errors.priority.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Goal Progress */}
//                 <div>
//                   <label className="block text-[16px] font-medium text-gray-700 mb-1">
//                     Goal Progress<span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     {...register("goalProgress", {
//                       required: "Progress is required",
//                       min: 0,
//                       max: 100,
//                     })}
//                     className="w-full p-3 border bg-[#F2F5FA] border-gray-300 rounded-md"
//                     placeholder="% 0"
//                   />
//                   {errors.goalProgress && (
//                     <p className="text-red-500 text-[16px]">
//                       {errors.goalProgress.message}
//                     </p>
//                   )}
//                 </div>
//               </div>




















































// {/* Specific & Strategic */}
// <div className="mb-5">
//   <label className="block text-[16px] font-medium text-gray-700 mb-1">
//     Is this goal both specific and strategic?
//   </label>
//   <select
//     {...register("isSpecificStrategic", { required: "Specificity is required" })}
//     className="w-full p-3 border border-gray-300 rounded-md"
//   >
//     <option value="">Select</option>
//     <option value="Yes">Yes</option>
//     <option value="No">No</option>
//   </select>
// </div>

// {/* Has Talent */}
// <div className="mb-5">
//   <label className="block text-[16px] font-medium text-gray-700 mb-1">
//     Do we possess the necessary talent to accomplish this goal?
//   </label>
//   <select
//     {...register("hasTalent", { required: "Talent status is required" })}
//     className="w-full p-3 border border-gray-300 rounded-md"
//   >
//     <option value="">Select</option>
//     <option value="Yes">Yes</option>
//     <option value="No">No</option>
//   </select>
// <label className="block text-[14px] ml-2 font-medium text-gray-700 mt-3">
//     If no, please explain
//   </label>
//   <textarea
//     {...register("talentDetails")}
//     placeholder="Add Details….."
//     className="w-full min-h-[100px] p-3 mt-1 border border-gray-300 rounded-md bg-[#F2F5FA]
// "
//   />
// </div>

// {/* Has Resources */}
// <div className="mb-5">
//   <label className="block text-[16px] font-medium text-gray-700 mb-1">
//     Do we possess the necessary resources (material) to accomplish this Goal?
//   </label>
//   <select
//     {...register("resource_readiness", { required: "Resources status is required" })}
//     className="w-full p-3 border border-gray-300 rounded-md"
//   >
//     <option value="">Select</option>
//     <option value="Yes">Yes</option>
//     <option value="No">No</option>
//   </select>
// <label className="block text-[14px] ml-2 font-medium text-gray-700 mt-3">
//     If no, please explain
//   </label>
//   <textarea
//     {...register("resourcesDetails")}
//     placeholder="Add Details….."
//     className="w-full min-h-[100px] p-3 mt-1 border border-gray-300 rounded-md bg-[#F2F5FA]
// "
//   />
// </div>

// {/* Environmental Issues */}
// <div className="mb-5">
//   <label className="block text-[16px] font-medium text-gray-700 mb-1">
//     Are there any environmental and social issues that must be addressed while accomplishing this goal?
//     <span className="text-red-500">*</span>
//   </label>
//   <select
//     {...register("esg_issues", { required: "Environmental issues status is required" })}
//     className="w-full p-3 border border-gray-300 rounded-md"
//   >
//     <option value="">Select</option>
//     <option value="Yes">Yes</option>
//     <option value="No">No</option>
//   </select>

//   <div className="mt-3 space-y-3">
//     <label className="block text-[14px] font-medium text-gray-700">
//       If yes, what specific environmental and social issues need to be addressed, and how might they impact the accomplishment of this goal?
//     </label>
//     <textarea
//       {...register("environmentalIssuesDetails")}
//       placeholder="Add Details….."
//       className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md bg-[#F2F5FA]
// "
//     />

//     <div className="flex items-center gap-6">
//       {["High", "Medium", "Low"].map((level) => (
//         <label key={level} className="flex items-center gap-2">
//           <input type="radio" value={level} {...register("goal_impact")} />
//           <span
//             className={
//               level === "High"
//                 ? "text-red-500 font-medium"
//                 : level === "Medium"
//                 ? "text-yellow-500 font-medium"
//                 : "text-green-500 font-medium"
//             }
//           >
//             {level}
//           </span>
//         </label>
//       ))}
//     </div>
//   </div>
// </div>






















//             </div>
//           </div>

//           {/* Additional info section */}
//           {showAdditionalInfo && (
//             <div className="mt-6 border-t border-gray-300 pt-4 space-y-6">
//               <h2 className="text-blue-800 text-center py-6 border-b text-3xl font-bold">
//                 Additional Information
//               </h2>
//               {[
//                 {
//                   label:
//                     "Are there any potential risks and challenges that could hinder our progress toward the goal?",
//                   name: "risksChallenges",
//                   impact: "risks",
//                 },
//                 {
//                   label:
//                     "Are there any potential risk that could hinder our progress toward the goal?",
//                   name: "risksHinderProgress",
//                   impact: "risksHinderProgress_impact",
//                 },
//                 {
//                   label:
//                     "Is there any regulatory compliance to address to ensure goal achievement?",
//                   name: "regulatoryCompliance",
//                   impact: "compliance",
//                 },
//                 {
//                   label:
//                     "What cultural realignment is necessary to bolster the goal's success?",
//                   name: "culturalRealignment",
//                   impact: "culture",
//                 },
//                 {
//                   label:
//                     "What Change/transformation should be addressed to achieve this goal? (Change Management)",
//                   name: "changeTransformation",
//                   impact: "change_management",
//                 },
//                 {
//                   label:
//                     "How will learning and development initiatives be integrated to enhance the skills and capabilities necessary for the successful execution of this objective?",
//                   name: "capabilityEnhancement",
//                   impact: "l_and_d",
//                 },
//               ].map((section, index) => (
//                 <div key={section.name} className="space-y-2">
//                   <label className="block text-[16px] font-medium text-gray-700">
//                     <span className="bg-blue-900 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">
//                       {(index + 1).toString().padStart(2, "0")}
//                     </span>
//                     {section.label}
//                   </label>
//                   <textarea
//                     {...register(section.name as keyof BusinessGoalsForm)}
//                     placeholder="Add details..."
//                     className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md bg-[#F2F5FA]
// "
//                   />
//                   <div className="flex space-x-4">
//                     {["High", "Medium", "Low"].map((level) => (
//                       <label
//                         key={level}
//                         className="flex items-center space-x-1"
//                       >
//                         <input
//                           {...register(
//                             section.impact as keyof BusinessGoalsForm
//                           )}
//                           type="radio"
//                           value={level}
//                           className={
//                             level === "High"
//                               ? "accent-green-600"
//                               : level === "Medium"
//                               ? "accent-yellow-500"
//                               : "accent-red-600"
//                           }
//                         />
//                         <span
//                           className={
//                             level === "High"
//                               ? "text-green-600"
//                               : level === "Medium"
//                               ? "text-yellow-600"
//                               : "text-red-600"
//                           }
//                         >
//                           {level}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               ))}

//               {/* Rest additional info fields */}
                
                
                
//                  {/* add all of those fields into this  */}




// {/* Capabilities Section */}
// <div className="space-y-6">

//   {/* Influenced Capabilities */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       What capabilities will be influenced by the accomplishment of this goal?
//     </label>
//     <select
//       {...register("capabilityInfluenced")}
//       multiple
//       className="w-full p-3 border border-gray-300 rounded-md"
//     >
//       <option value="Capability 1">Capability 1</option>
//       <option value="Capability 2">Capability 2</option>
//       <option value="Capability 3">Capability 3</option>
//     </select>
//     <p className="text-xs text-gray-500">Hold Ctrl (Windows) or ⌘ (Mac) to select multiple</p>
//   </div>


//       {/* capability impact  */}
//                <div className="flex space-x-4">
//                     {["High", "Medium", "Low"].map((level) => (
//                       <label
//                         key={level}
//                         className="flex items-center space-x-1"
//                       >
//                         <input
//                           {...register(
//                             "capabilities"
//                           )}
//                           type="radio"
//                           value={level}
//                           className={
//                             level === "High"
//                               ? "accent-green-600"
//                               : level === "Medium"
//                               ? "accent-yellow-500"
//                               : "accent-red-600"
//                           }
//                         />
//                         <span
//                           className={
//                             level === "High"
//                               ? "text-green-600"
//                               : level === "Medium"
//                               ? "text-yellow-600"
//                               : "text-red-600"
//                           }
//                         >
//                           {level}
//                         </span>
//                       </label>
//                     ))}
//                   </div>

// {/* Capability Owner(s) */}
// <div className="group">
//   <label className="block text-[16px] mb-3">
//     Capability Owner(s)<span className="text-red-500 ml-1">*</span>
//   </label>
//   <div className="border border-gray-300 rounded-xl p-5">
//     {/* Input + Add button */}
//     <div className="flex gap-3 mb-4">
//       <input
//         type="text"
//         value={capabilityOwnerInput}
//         onChange={(e) => setCapabilityOwnerInput(e.target.value)}
//         placeholder="Enter Capability Owner"
//         className="flex-1 p-3 border-2 bg-[#F2F5FA] rounded-lg focus:ring-2 focus:ring-blue-200"
//       />
//       <button
//         type="button"
//         onClick={handleAddCapabilityOwner}
//         disabled={!capabilityOwnerInput.trim()}
//         className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-3 rounded-lg disabled:from-blue-800 disabled:to-blue-700 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 font-medium"
//       >
//         Add
//       </button>
//     </div>

//     {/* Added  Owners */}
//     {capabilityOwners.length > 0 ? (
//       <div className="space-y-3">
//         <p className="text-[16px] font-semibold text-gray-800 mb-2">
//           Added Capability Owners ({capabilityOwners.length}):
//         </p>
//         <div className="flex flex-wrap gap-3">
//           {capabilityOwners.map((owner, index) => (
//             <span
//               key={index}
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[16px] font-semibold border-2 border-blue-300 transition-all duration-200"
//             >
//               {owner}
//               <button
//                 type="button"
//                 onClick={() => handleRemoveCapabilityOwner(index)}
//                 className="text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ml-1 transition-all duration-200"
//                 aria-label={`Remove ${owner}`}
//               >
//                 ×
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>
//     ) : (
//       <p className="text-gray-500 text-[16px] italic">
//         Add capability owners using the input above
//       </p>
//     )}
//   </div>
//   {errors.capabilityOwners && (
//     <p className="text-red-500 text-[16px] mt-2">
//       At least one capability owner is required
//     </p>
//   )}
// </div>



//   {/* Enhance Existing Capabilities */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       Does this goal require enhancing existing capabilities to achieve it?
//     </label>
//     <select
//       {...register("existing_capabilities_to_enhance")}
//       className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
//     >
//       <option value="">Select</option>
//       <option value="Yes">Yes</option>
//       <option value="No">No</option>
//     </select>
//   </div>

//   {/* Enhancement Details */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       If Yes, briefly explain what we are enhancing in this existing capabilities
//     </label>
//     <textarea
//       {...register("enhancementDetails")}
//       placeholder="Briefly explain the enhancement..."
//       className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
//     />
//   </div>

//   {/* Add New Capabilities */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       Does this goal require adding new capabilities to achieve it?
//     </label>
//     <select
//       {...register("new_capabilities_needed")}
//       className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
//     >
//       <option value="">Select</option>
//       <option value="Yes">Yes</option>
//       <option value="No">No</option>
//     </select>
//   </div>

//   {/* New Capability Name */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       If yes, add new capability name
//     </label>
//     <input
//       {...register("newCapabilityName")}
//       placeholder="Enter new capability name"
//       className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
//     />
//   </div>

//   {/* Capability Type */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       Select Capability Type
//     </label>
//     <select
//       {...register("capabilityType")}
//       className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
//     >
//       <option value="">Select Capability Type</option>
//       <option value="Core">Core</option>
//       <option value="Supporting">differenciating</option>
//     </select>
//   </div>

//   {/* New Capability Description */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       Please describe the new capability
//     </label>
//     <textarea
//       {...register("capabilityDescription")}
//       placeholder="Describe the capability..."
//       className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
//     />
//   </div>

//   {/* Other Details */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       Add Other Detail (optional)
//     </label>
//     <textarea
//       {...register("otherDetails")}
//       placeholder="Add other details..."
//       className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md bg-gray-50"
//     />
//   </div>

// </div>





























//             </div>
//           )}

//           {/* Button to toggle additional info */}
//           <div className="flex justify-between items-center p-5 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
//               className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
//             >
//               {showAdditionalInfo
//                 ? "Hide Additional Info"
//                 : "Add Additional Info"}
//             </button>

//             <div className="flex gap-4">
//               <SharedDrawerButton
//                 title="Business Goals"
//                 buttonLabel="More info"
//                 content={<AlignmentBeforeData />}
//                 buttonClassName="text-blue-900 cursor-pointer"
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BusinessGoalsModal;

// {
//   "title": "Expand Cloud Services in Latin America",
//   "description": "Broaden our cloud service offerings across three new Latin American markets by end of year.",
//   "related_strategic_theme": "Digital Transformation",
//   "priority": "High",
//   "resource_readiness": "No",
//   "assigned_functions": [
//     "Product",
//     "Engineering",
//     "Sales"
//   ],
//   "duration": "Long-term",
  // "impact_ratings": {
  //   "risks": "High",
  //   "compliance": "Medium",
  //   "culture": "Low",
  //   "change_management": "High",
  //   "l_and_d": "Medium",
  //   "capabilities": "High"
  // },
//   "esg_issues": "Yes",
//   "new_capabilities_needed": "Yes",
//   "existing_capabilities_to_enhance": "No"
// }
// create business goal modal 

"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";

import { useGetStrategicThemesQuery } from "@/redux/api/blueprint/strategicTheme/strategicThemeApi";

export type BusinessGoalsForm = {
  title: string;
  description: string;
  related_strategic_theme: string;
  strategicID:string;
  goalOwner: string[];
  funding: number;
  assigned_functions: string[];
  duration: string;
  goalTimelineStart: string;
  goalTimelineEnd: string;
  priority: string;
  goalProgress: number;
  isSpecificStrategic: string;
  hasTalent: string;
  talentDetails?: string;
  resource_readiness: string;
  resourcesDetails?: string;
  esg_issues: string;
  environmentalIssuesDetails?: string;
  goal_impact: string;

  // Additional info fields
  risksChallenges?: string;
  risks?: string;
  regulatoryCompliance?: string;
  compliance?: string;
  culturalRealignment?: string;
  culture?: string;
  changeTransformation?: string;
  change_management?: string;
  capabilityEnhancement?: string;
  l_and_d?: string;
  capabilityInfluenced?: string[];
  capabilityOwner?: string[];
  capabilities?: string;
  existing_capabilities_to_enhance?: string;
  enhanceDetails?: string;
  new_capabilities_needed?: string;
  capabilityName?: string;
  capabilityType?: string;
  capabilityDescription?: string;
  otherDetails?: string;
  enhancementDetails?: string;
  newCapabilityName?: string;
  capabilityOwners?: string[];
};




type BusinessGoalsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { businessGoals: BusinessGoalsForm }) => void;
};





const BusinessGoalsModal = ({
  isOpen,
  onClose,
  onSave,
}: BusinessGoalsModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BusinessGoalsForm>({
    defaultValues: {
      goalOwner: [],
      assigned_functions: [],
      new_capabilities_needed: "No",
      existing_capabilities_to_enhance: "No",
      capabilityOwners: [],
    },
  });

  const { data:strategicThemes, isLoading: strategicThemesLoading, isError } =
    useGetStrategicThemesQuery() 
    // console.log("kjlskjfkljslkjflkj", strategicThemes);


  const [capabilityOwners, setCapabilityOwners] = useState<string[]>([]);
  const [capabilityOwnerInput, setCapabilityOwnerInput] = useState("");
  const [ownerInput, setOwnerInput] = useState("");
  const [owners, setOwners] = useState<string[]>([]);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  // Sync capability owners with form
  useEffect(() => {
    setValue("capabilityOwners", capabilityOwners);
  }, [capabilityOwners, setValue]);

  // Sync goal owners with form
  useEffect(() => {
    setValue("goalOwner", owners);
  }, [owners, setValue]);

  const handleAddCapabilityOwner = () => {
    if (capabilityOwnerInput.trim()) {
      setCapabilityOwners([...capabilityOwners, capabilityOwnerInput.trim()]);
      setCapabilityOwnerInput("");
    }
  };

  const handleRemoveCapabilityOwner = (index: number) => {
    setCapabilityOwners(capabilityOwners.filter((_, i) => i !== index));
  };

  const handleAddOwner = () => {
    if (ownerInput.trim() !== "") {
      const updatedOwners = [...owners, ownerInput.trim()];
      setOwners(updatedOwners);
      setOwnerInput("");
    }
  };

  const handleRemoveOwner = (index: number) => {
    const updatedOwners = owners.filter((_, i) => i !== index);
    setOwners(updatedOwners);
  };

  const onSubmit: SubmitHandler<BusinessGoalsForm> = (data) => {
    // Ensure arrays are properly set
    const formData = {
      ...data,
      goalOwner: owners,
      capabilityOwners: capabilityOwners,
      // Format impact ratings as requested
      impact_ratings: {
        risks: data.risks || "",
        compliance: data.compliance || "",
        culture: data.culture || "",
        change_management: data.change_management || "",
        l_and_d: data.l_and_d || "",
        capabilities: data.capabilities || "",
      }
    };
    
    // Remove the individual impact rating fields from the main object
    const {
      risks,
      compliance,
      culture,
      change_management,
      l_and_d,
      capabilities,
      ...cleanedData
    } = formData;
    
    const finalData = {
      ...cleanedData,
      impact_ratings: formData.impact_ratings
    };
    
    console.log("Form Data to Save:", finalData);
    onSave({ businessGoals: finalData });
    
    // Reset form and state
    reset();
    setOwners([]);
    setCapabilityOwners([]);
    setShowAdditionalInfo(false);
    onClose();
  };

  if (!isOpen) return null;
  if (strategicThemesLoading) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        <div className="bg-blue-900 text-white rounded-t-lg p-5 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Business Goals</h2>
          <button onClick={onClose} className="text-3xl font-light hover:text-gray-300">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5 border rounded-2xl p-4">
              {/* Goal Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Title<span className="text-red-500">*</span>
                </label>
                <input
                  {...register("title", {
                    required: "Goal Title is required",
                  })}
                  placeholder="Add Title....."
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Goal Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("description", {
                    required: "Goal Description is required",
                  })}
                  placeholder="Add Details....."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

            {/* Strategic Themes */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    What Strategic Theme is this business goal tied to?
    <span className="text-red-500">*</span>
  </label>

  <div className="space-y-2">
    {strategicThemes?.data.map((theme) => (
      <label className="flex items-center space-x-2" key={theme._id}>
        <input
          type="radio"
          value={theme.name} // main value stored in related_strategic_theme
          {...register("related_strategic_theme", {
            required: "Strategic Theme is required",
          })}
          onChange={(e) => {
            // ✅ store both name & id
            setValue("related_strategic_theme", theme.name);
            setValue("strategicID", theme._id);
          }}
          className="text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm">{theme.name}</span>
      </label>
    ))}
  </div>

  {errors.related_strategic_theme && (
    <p className="text-red-500 text-sm mt-1">
      {errors.related_strategic_theme.message}
    </p>
  )}
</div>


              {/* Goal Owner */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Owner<span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={ownerInput}
                      onChange={(e) => setOwnerInput(e.target.value)}
                      placeholder="Enter Owner Name"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddOwner())}
                    />
                    <button
                      type="button"
                      onClick={handleAddOwner}
                      disabled={!ownerInput.trim()}
                                              className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>

                  {owners.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Added Owners ({owners.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {owners.map((owner, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                          >
                            {owner}
                            <button
                              type="button"
                              onClick={() => handleRemoveOwner(index)}
                              className="text-red-600 hover:text-red-800 ml-1"
                              aria-label={`Remove ${owner}`}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      Add goal owners using the input above
                    </p>
                  )}
                </div>
                {errors.goalOwner && (
                  <p className="text-red-500 text-sm mt-1">
                    At least one owner is required
                  </p>
                )}
              </div>

              {/* Funding */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Funding allocated toward achieving this goal?
                  <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("funding", { 
                    required: "Funding is required",
                    min: { value: 0, message: "Funding must be positive" }
                  })}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter Amount....."
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.funding && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.funding.message}
                  </p>
                )}
              </div>

              {/* Business Function */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign this goal to a Business Function(s)
                  <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2 border border-gray-300 rounded-md p-3 bg-gray-50">
                  {[
                    { value: "Sales", label: "Sales" },
                    { value: "Marketing", label: "Marketing" },
                    { value: "Engineering", label: "Engineering" },
                    { value: "Product", label: "Product" },
                    { value: "Operations", label: "Operations" },
                  ].map((func, index) => (
                    <label className="flex items-center space-x-2" key={index}>
                      <input
                        type="checkbox"
                        {...register("assigned_functions", {
                          required: "At least one Business Function is required",
                        })}
                        value={func.value}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{func.label}</span>
                    </label>
                  ))}
                </div>
                {errors.assigned_functions && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.assigned_functions.message}
                  </p>
                )}
              </div>

              {/* Goal Term */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Is this a long-term or short-term goal?
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("duration", {
                    required: "Goal Term is required",
                  })}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Term</option>
                  <option value="Long-term">Long-term</option>
                  <option value="Short-term">Short-term</option>
                </select>
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.duration.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5 border rounded-2xl p-4">
              {/* Goal Timeline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Timeline<span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      {...register("goalTimelineStart", {
                        required: "Start date is required",
                      })}
                      className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.goalTimelineStart && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.goalTimelineStart.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      {...register("goalTimelineEnd", {
                        required: "End date is required",
                      })}
                      className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.goalTimelineEnd && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.goalTimelineEnd.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Priority and Progress */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goal Priority<span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("priority", {
                      required: "Priority is required",
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  {errors.priority && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.priority.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goal Progress (%)<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    {...register("goalProgress", {
                      required: "Progress is required",
                      min: { value: 0, message: "Progress must be at least 0%" },
                      max: { value: 100, message: "Progress cannot exceed 100%" },
                    })}
                    min="0"
                    max="100"
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0-100"
                  />
                  {errors.goalProgress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.goalProgress.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Specific & Strategic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Is this goal both specific and strategic?
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("isSpecificStrategic", { required: "This field is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.isSpecificStrategic && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.isSpecificStrategic.message}
                  </p>
                )}
              </div>

              {/* Has Talent */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do we possess the necessary talent to accomplish this goal?
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("hasTalent", { required: "This field is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.hasTalent && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.hasTalent.message}
                  </p>
                )}
                
                <div className="mt-2">
                  <label className="block text-xs text-gray-600 mb-1">
                    If no, please explain
                  </label>
                  <textarea
                    {...register("talentDetails")}
                    placeholder="Add Details....."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                </div>
              </div>

              {/* Has Resources */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do we possess the necessary resources (material) to accomplish this Goal?
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("resource_readiness", { required: "This field is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.resource_readiness && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.resource_readiness.message}
                  </p>
                )}
                
                <div className="mt-2">
                  <label className="block text-xs text-gray-600 mb-1">
                    If no, please explain
                  </label>
                  <textarea
                    {...register("resourcesDetails")}
                    placeholder="Add Details....."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                </div>
              </div>

              {/* Environmental Issues */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Are there any environmental and social issues that must be addressed while accomplishing this goal?
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("esg_issues", { required: "This field is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.esg_issues && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.esg_issues.message}
                  </p>
                )}

                <div className="mt-3 space-y-3">
                  <label className="block text-xs text-gray-600">
                    If yes, what specific environmental and social issues need to be addressed, and how might they impact the accomplishment of this goal?
                  </label>
                  <textarea
                    {...register("environmentalIssuesDetails")}
                    placeholder="Add Details....."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />

                  <div className="space-y-2">
                    <label className="block text-xs text-gray-600">Impact Level:</label>
                    <div className="flex gap-4">
                      {["High", "Medium", "Low"].map((level) => (
                        <label key={level} className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            value={level} 
                            {...register("goal_impact")}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span
                            className={`text-sm font-medium ${
                              level === "High"
                                ? "text-red-600"
                                : level === "Medium"
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {level}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          {showAdditionalInfo && (
            <div className="mt-8 border-t border-gray-200 pt-6 space-y-6">
              <h3 className="text-2xl font-bold text-blue-900 text-center mb-6">
                Additional Information
              </h3>

              {/* Additional Info Fields */}
              {[
                {
                  label: "Are there any potential risks and challenges that could hinder our progress toward the goal?",
                  name: "risksChallenges",
                  impact: "risks",
                },
                {
                  label: "Is there any regulatory compliance to address to ensure goal achievement?",
                  name: "regulatoryCompliance",
                  impact: "compliance",
                },
                {
                  label: "What cultural realignment is necessary to bolster the goal's success?",
                  name: "culturalRealignment",
                  impact: "culture",
                },
                {
                  label: "What Change/transformation should be addressed to achieve this goal? (Change Management)",
                  name: "changeTransformation",
                  impact: "change_management",
                },
                {
                  label: "How will learning and development initiatives be integrated to enhance the skills and capabilities necessary for the successful execution of this objective?",
                  name: "capabilityEnhancement",
                  impact: "l_and_d",
                },
              ].map((section, index) => (
                <div key={section.name} className="space-y-3 p-4 border border-gray-200 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700">
                    <span className="bg-blue-900 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    {section.label}
                  </label>
                  <textarea
                    {...register(section.name as keyof BusinessGoalsForm)}
                    placeholder="Add details..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                  
                  <div className="space-y-2">
                    <label className="block text-xs text-gray-600">Impact Level:</label>
                    <div className="flex gap-4">
                      {["High", "Medium", "Low"].map((level) => (
                        <label key={level} className="flex items-center gap-2">
                          <input
                            {...register(section.impact as keyof BusinessGoalsForm)}
                            type="radio"
                            value={level}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span
                            className={`text-sm font-medium ${
                              level === "High"
                                ? "text-red-600"
                                : level === "Medium"
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {level}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Capabilities Section */}
              <div className="space-y-6 p-4 border border-gray-200 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800">Capabilities Management</h4>

                {/* Influenced Capabilities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What capabilities will be influenced by the accomplishment of this goal?
                  </label>
                  <select
                    {...register("capabilityInfluenced")}
                    multiple
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    size={4}
                  >
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Product Development">Product Development</option>
                    <option value="Supply Chain">Supply Chain</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or ⌘ (Mac) to select multiple</p>
                </div>

                {/* Capability Impact */}
                <div className="space-y-2">
                  <label className="block text-xs text-gray-600">Capability Impact Level:</label>
                  <div className="flex gap-4">
                    {["High", "Medium", "Low"].map((level) => (
                      <label key={level} className="flex items-center gap-2">
                        <input
                          {...register("capabilities")}
                          type="radio"
                          value={level}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span
                          className={`text-sm font-medium ${
                            level === "High"
                              ? "text-red-600"
                              : level === "Medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Capability Owners */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capability Owner(s)
                  </label>
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={capabilityOwnerInput}
                        onChange={(e) => setCapabilityOwnerInput(e.target.value)}
                        placeholder="Enter Capability Owner"
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCapabilityOwner())}
                      />
                      <button
                        type="button"
                        onClick={handleAddCapabilityOwner}
                        disabled={!capabilityOwnerInput.trim()}
                        className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                    </div>

                    {capabilityOwners.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Added Capability Owners ({capabilityOwners.length}):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {capabilityOwners.map((owner, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                            >
                              {owner}
                              <button
                                type="button"
                                onClick={() => handleRemoveCapabilityOwner(index)}
                                className="text-red-600 hover:text-red-800 ml-1"
                                aria-label={`Remove ${owner}`}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm italic">
                        Add capability owners using the input above
                      </p>
                    )}
                  </div>
                </div>

                {/* Enhance Existing Capabilities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Does this goal require enhancing existing capabilities to achieve it?
                  </label>
                  <select
                    {...register("existing_capabilities_to_enhance")}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Enhancement Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    If Yes, briefly explain what we are enhancing in this existing capabilities
                  </label>
                  <textarea
                    {...register("enhancementDetails")}
                    placeholder="Briefly explain the enhancement..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                </div>

                {/* Add New Capabilities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Does this goal require adding new capabilities to achieve it?
                  </label>
                  <select
                    {...register("new_capabilities_needed")}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* New Capability Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    If yes, add new capability name
                  </label>
                  <input
                    {...register("newCapabilityName")}
                    placeholder="Enter new capability name"
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Capability Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Capability Type
                  </label>
                  <select
                    {...register("capabilityType")}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Capability Type</option>
                    <option value="Core">Core</option>
                    <option value="Differentiating">Differentiating</option>
                    <option value="Supporting">Supporting</option>
                  </select>
                </div>

                {/* New Capability Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Please describe the new capability
                  </label>
                  <textarea
                    {...register("capabilityDescription")}
                    placeholder="Describe the capability..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                </div>

                {/* Other Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add Other Detail (optional)
                  </label>
                  <textarea
                    {...register("otherDetails")}
                    placeholder="Add other details..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-between items-center p-5 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <button
              type="button"
              onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
              className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-950 transition-colors duration-200"
            >
              {showAdditionalInfo ? "Hide Additional Info" : "Add Additional Info"}
            </button>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-950 transition-colors duration-200"
              >
                Save Goal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessGoalsModal;