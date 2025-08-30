





"use client";
import Image from "next/image";
import React, { useState } from "react";
import Drawer from "@/app/dashboard/blueprint/vision/_comoponents/DrawarModal";
import trendImage from "@/public/image/challenges-img.png";
import { useRouter } from "next/navigation";
import { useCreateChallengeMutation } from '@/redux/api/challenge/challengeApi';
import type { CreateChallengeRequest } from '@/redux/api/challenge/challengeApi';
import toast from "react-hot-toast";

// Enums to match the API
export enum ChallengeCategory {
  HUMAN = "Human Resources",
  POLITICAL = "Political", 
  FINANCIAL = "Financial",
  STRATEGIC = "Strategic",
  COMPLIANCE = "Compliance",
  OPERATIONAL = "Operational"
}

export enum ImpactOnBusiness {
  VERY_LOW = "Very Low",
  LOW = "Low",
  MODERATE = "Moderate", 
  HIGH = "High",
  VERY_HIGH = "Very High"
}

export enum AbilityToAddress {
  VERY_LOW = "Very Low",
  LOW = "Low",
  MODERATE = "Moderate",
  HIGH = "High", 
  VERY_HIGH = "Very High"
}

// Type definitions
export type ChallengeCategoryType = 
  | "Human Resources"
  | "Political" 
  | "Financial"
  | "Strategic"
  | "Compliance"
  | "Operational";

export type ImpactOnBusinessType = 
  | "Very Low"
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";

export type AbilityToAddressType = 
  | "Very Low"
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";

const CallangeHomePage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [challengeTitle, setChallengeTitle] = useState<string>("");
  const [category, setCategory] = useState<ChallengeCategoryType | "">("");
  const [impact, setImpact] = useState<ImpactOnBusinessType | "">("");
  const [abilityToAddress, setAbilityToAddress] = useState<AbilityToAddressType | "">("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();
  const [createChallenge] = useCreateChallengeMutation();

  const handleMoreInfoClick = () => {
    setIsModalOpen(false); // Close the modal
    setChallengeTitle("");
    setCategory("");
    setImpact("");
    setAbilityToAddress("");
    setDescription("");
    setIsDrawerOpen(true); // Open the drawer
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleGetStartedClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setChallengeTitle("");
    setCategory("");
    setImpact("");
    setAbilityToAddress("");
    setDescription("");
  };

  const handleSave = async () => {
    // Validate required fields
    if (!challengeTitle || !category || !impact || !abilityToAddress) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the request body to match your API format
      const challengeData: CreateChallengeRequest = {
        title: challengeTitle,
        category: category as ChallengeCategoryType,
        impact_on_business: impact.toLowerCase() as string, // Convert to lowercase to match API
        ability_to_address: abilityToAddress.toLowerCase() as string, // Convert to lowercase to match API
        description: description
      };


      const response = await createChallenge(challengeData).unwrap();
      
      
      // Show success message
      toast.success("Challenge created successfully!");
      
      // Close modal and reset form
      handleCloseModal();
      
      // Navigate to challenges summary page
      // router.push("/dashboard/challenge-summarry");
      
    } catch (error: any) {
      console.error("Error creating challenge:", error);
      
      // Show error message
      if (error?.data?.message) {
        alert(`Error: ${error.data.message}`);
      } else if (error?.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert("Failed to create challenge. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 pl-6 my-8 rounded-lg p-6 ml-6 shadow-md">
      <div className="mb-6 flex justify-center">
        <Image
          src={trendImage}
          alt="Description of image"
          width={1580}
          height={530}
          className="rounded-lg mb-4"
        />
      </div>
      <h2 className="text-xl font-semibold mb-4">Challenges</h2>
      <p className="text-base text-[#231f20] mb-4">
        What are the main challenges the company is facing? In other words, what
        are the major obstacles that the strategy needs to address? The intent is
        to establish a list of the most pressing business challenges in order of
        priority. It is crucial to engage all relevant stakeholders in
        developing the prioritized list to foster alignment and ensure that
        everyone is on board with the business challenges the strategy aims to
        tackle.
      </p>
      <div className="mt-6 flex justify-end items-center space-x-4">
        <a
          href="#"
          onClick={handleMoreInfoClick}
          className="text-[#22398A] font-semibold hover:underline cursor-pointer"
        >
          More info
        </a>
        <button
          onClick={handleGetStartedClick}
          className="bg-[#22398A] text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-[#1D2A6D] transition-colors"
        >
          Get Started
        </button>
      </div>

      {/* Drawer Component */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title="Challenges"
      >
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            Identifying and prioritizing business challenges is crucial for
            crafting a robust and impactful strategy. To improve effectiveness,
            begin by listing all your business&apos;s challenges. Subsequently, delve
            deeper into understanding their root cause and how they are
            interconnected, which could create a potential domino effect.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            For example, a drop in sales may seem like an issue with your product
            or other related processes, but it could also indicate that your
            target market has changed, and you need to adjust your offerings
            accordingly.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            Determining the root cause is pivotal, as it reveals the broader
            context and may unearth untapped opportunities for business growth.
            For instance, if you discover your business has untapped potential in
            the digital domain, you could set a goal for expanding your online
            presence.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            Some of the most common business challenges include inferior
            strategy, declining sales, changing customer needs, new competition,
            poor business processes, inefficient use of resources, lack of
            capabilities, poor customer service, high employee turnover, poor
            financial management, etc.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            By carefully analyzing each challenge, understanding its interaction
            with others, and identifying the root causes, you can pave the path
            for strategic solutions that not only address immediate challenges
            but reveal opportunities for sustainable growth.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            Once you have identified all the challenges impacting your business,
            the next step is to prioritize them. It involves assessing the
            importance and urgency of each challenge.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            Some challenges can significantly impact your business performance
            more than others. For example, a decrease in sales due to
            poor-quality products or services will have a much greater impact
            than delaying upgrading a slightly older version of your CRM system
            by one or more years. (This example is just for illustration purposes
            because each business has its unique challenges).
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            The intent here is to create a prioritized list of the business
            challenges. It&#39;s important to involve all relevant stakeholders in
            developing the prioritized list, creating alignment, and bringing
            everyone on board with the real business challenges to be addressed
            by the strategy.
          </p>
        </div>
      </Drawer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg">
            <div
              className="bg-[#1D2A6D] text-white p-3 rounded-t-lg flex justify-between items-center"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <h2 className="text-lg font-semibold">Add New Challenge</h2>
              <button
                onClick={handleCloseModal}
                className="text-white text-xl hover:text-gray-200 transition-colors"
                disabled={isSubmitting}
              >
                ×
              </button>
            </div>
            <div className="p-5 border border-[#e5e7eb] rounded-b-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Challenge Title *
                </label>
                <input
                  type="text"
                  value={challengeTitle}
                  onChange={(e) => setChallengeTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                  placeholder="Enter challenge title"
                  disabled={isSubmitting}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Challenge Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ChallengeCategoryType)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                  disabled={isSubmitting}
                >
                  <option value="">Select challenge category</option>
                  <option value={ChallengeCategory.HUMAN}>Human Resources</option>
                  <option value={ChallengeCategory.POLITICAL}>Political</option>
                  <option value={ChallengeCategory.FINANCIAL}>Financial</option>
                  <option value={ChallengeCategory.STRATEGIC}>Strategic</option>
                  <option value={ChallengeCategory.COMPLIANCE}>Compliance</option>
                  <option value={ChallengeCategory.OPERATIONAL}>Operational</option>
                </select>
              </div>
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Impact on Business *
                  </label>
                  <select
                    value={impact}
                    onChange={(e) => setImpact(e.target.value as ImpactOnBusinessType)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                    disabled={isSubmitting}
                  >
                    <option value="">Select impact level</option>
                    <option value={ImpactOnBusiness.VERY_LOW}>Very Low</option>
                    <option value={ImpactOnBusiness.LOW}>Low</option>
                    <option value={ImpactOnBusiness.MODERATE}>Moderate</option>
                    <option value={ImpactOnBusiness.HIGH}>High</option>
                    <option value={ImpactOnBusiness.VERY_HIGH}>Very High</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ability to Address *
                  </label>
                  <select
                    value={abilityToAddress}
                    onChange={(e) => setAbilityToAddress(e.target.value as AbilityToAddressType)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                    disabled={isSubmitting}
                  >
                    <option value="">Select ability level</option>
                    <option value={AbilityToAddress.VERY_LOW}>Very Low</option>
                    <option value={AbilityToAddress.LOW}>Low</option>
                    <option value={AbilityToAddress.MODERATE}>Moderate</option>
                    <option value={AbilityToAddress.HIGH}>High</option>
                    <option value={AbilityToAddress.VERY_HIGH}>Very High</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded h-24 focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                  placeholder="Describe the challenge..."
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleMoreInfoClick}
                  className="text-[#22398A] font-semibold hover:underline transition-colors"
                  disabled={isSubmitting}
                >
                  More info
                </button>
                <button
                  onClick={handleSave}
                  className="bg-[#1D2A6D] text-white px-6 py-2 rounded-lg hover:bg-[#22398A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Challenge"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallangeHomePage;