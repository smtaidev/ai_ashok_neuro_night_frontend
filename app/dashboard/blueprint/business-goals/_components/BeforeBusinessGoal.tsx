"use client";
import Image from "next/image";
import image from "@/public/image/business-goals-img.png";
import SharedDrawerButton from "../../_components/reuseable/SharedDrawerButton";
import { useState } from "react";
import BusinessGoalsModal from "./BusinessGoalsModal";
import BusinessGoalBeforeData from "@/public/static-json-data/blueprint/business-goal-before";

const BeforeAlignment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (data: any) => {
    console.log("Business Goal Submitted: =====================>", data);
    
    // 👉 Save to localStorage
    try {
     
      
      localStorage.setItem("businessGoalsData", JSON.stringify(data));
      console.log("✅ Data saved to localStorage successfully.");
    } catch (error) {
      console.error("❌ Failed to save to localStorage:", error);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="bg-blue-50/50 min-h-[calc(100vh-65px)] p-5">
      <div className="space-y-10 p-5 bg-white rounded-2xl border border-gray-200">
        <h1 className="text-xl font-bold">Strategic Theme</h1>

        <div className="flex justify-center w-8/12 mx-auto items-center flex-col relative">
          <Image src={image} className="w-full" alt="strategic theme image" />

          <h1 className="pt-10 text-sm lg:text-base">
            Business Goals represent an organization&#39;s overarching targets and strategic priorities. They provide a clear direction and purpose, guiding efforts across divisions/functions and teams toward shared pursuits.
          </h1>
          <h1 className="py-10 mb-10 text-sm lg:text-base">
            Business Goals are derived from the organization&#39;s strategic direction and themesand serve as benchmarks for measuring progress and success.
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
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
            >
              + Let’s Start
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