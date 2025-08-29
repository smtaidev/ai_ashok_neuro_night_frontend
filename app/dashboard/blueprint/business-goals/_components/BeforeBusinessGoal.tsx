// "use client";
// import Image from "next/image";
// import image from "@/public/image/business-goals-img.png";
// import SharedDrawerButton from "../../_components/reuseable/SharedDrawerButton";
// import { useState } from "react";
// import BusinessGoalsModal from "./BusinessGoalsModal";
// import BusinessGoalBeforeData from "@/public/static-json-data/blueprint/business-goal-before";
// import { useCreateBusinessGoalMutation } from "@/redux/api/blueprint/businessGoal/businessGoalApi";
// import { create } from "domain";

// const BeforeAlignment = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const[createGoal, { isLoading }] = useCreateBusinessGoalMutation(); 

//   const handleSave = (data: any) => {
//     console.log("Business Goal request: =====================>", data);
    
//     // 👉 Save to localStorage
//     try {
     
//       createGoal(data); // Call the mutation to create a business goal
//       // localStorage.setItem("businessGoalsData", JSON.stringify(data));
//       console.log("✅ Data saved to localStorage successfully.");
//     } catch (error) {
//       console.error("❌ Failed to save to localStorage:", error);
//     }

//     setIsModalOpen(false);
//   };

//   return (
//     <div className="bg-blue-50/50 min-h-[calc(100vh-65px)] p-5">
//       <div className="space-y-10 p-5 bg-white rounded-2xl border border-gray-200">
//         <h1 className="text-xl font-bold">Strategic Theme</h1>

//         <div className="flex justify-center w-8/12 mx-auto items-center flex-col relative">
//           <Image src={image} className="w-full" alt="strategic theme image" />

//           <h1 className="pt-10 text-sm lg:text-base">
//             Business Goals represent an organization&#39;s overarching targets and strategic priorities. They provide a clear direction and purpose, guiding efforts across divisions/functions and teams toward shared pursuits.
//           </h1>
//           <h1 className="py-10 mb-10 text-sm lg:text-base">
//             Business Goals are derived from the organization&#39;s strategic direction and themesand serve as benchmarks for measuring progress and success.
//           </h1>

//           <div className="absolute flex gap-4 bottom-0 right-0">
//             <SharedDrawerButton
//               title="Business Goals"
//               buttonLabel="More info"
//               content={<BusinessGoalBeforeData />}
//               buttonClassName="text-blue-900 cursor-pointer"
//               isAi={false}
//             />

//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
//             >
//               + Let’s Start
//             </button>
//           </div>
//         </div>
//       </div>

//       <BusinessGoalsModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSave}
//       />
//     </div>
//   );
// };

// export default BeforeAlignment;




"use client";
import Image from "next/image";
import image from "@/public/image/business-goals-img.png";
import SharedDrawerButton from "../../_components/reuseable/SharedDrawerButton";
import { useState } from "react";
import BusinessGoalsModal from "./BusinessGoalsModal";
import BusinessGoalBeforeData from "@/public/static-json-data/blueprint/business-goal-before";
import { useCreateBusinessGoalMutation } from "@/redux/api/blueprint/businessGoal/businessGoalApi";
import toast, { Toaster } from "react-hot-toast";

const BeforeAlignment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createGoal, { isLoading }] = useCreateBusinessGoalMutation();

  const handleSave = async (data: any) => {
    console.log("Business Goal request: =====================>", data.businessGoals);

    try {
      const response = await createGoal(data?.businessGoals).unwrap();
      console.log("✅ Business Goal created successfully:", response);
      // console.log("✅ Business Goal created successfully:");

      toast.success("Business Goal created successfully!");
      setIsModalOpen(false);

      // Optional localStorage save
      // localStorage.setItem("businessGoalsData", JSON.stringify(data));
    } catch (error: any) {
      console.error("❌ Failed to create business goal:", error);
      toast.error(error?.data?.message || "Failed to create Business Goal");
    }
  };

  return (
    <div className="bg-blue-50/50 min-h-[calc(100vh-65px)] p-5">
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="space-y-10 p-5 bg-white rounded-2xl border border-gray-200">
        <h1 className="text-xl font-bold text-[#0b1c33]
">Business Goal</h1>

        <div className="flex justify-center w-8/12 mx-auto items-center flex-col relative">
          <Image src={image} className="w-full" alt="strategic theme image" />

          <h1 className="pt-10 text-sm lg:text-base text-[#231f20]">
            Business Goals represent an organization&#39;s overarching targets
            and strategic priorities. They provide a clear direction and
            purpose, guiding efforts across divisions/functions and teams toward
            shared pursuits.
          </h1>
          <h1 className="py-10 mb-10 text-sm lg:text-base text-[#231f20]">
            Business Goals are derived from the organization&#39;s strategic
            direction and themes and serve as benchmarks for measuring progress
            and success.
          </h1>

          <div className="absolute flex gap-4 bottom-0 right-0">
            <SharedDrawerButton
              title="Business Goals"
              buttonLabel="More info"
              content={<BusinessGoalBeforeData />}
              buttonClassName="text-blue-900 cursor-pointer"
              isAi={false}
            />

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950 disabled:opacity-70 flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isLoading ? "Saving..." : "+ Let’s Start"}
            </button>
          </div>
        </div>
      </div>

      <BusinessGoalsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default BeforeAlignment;
