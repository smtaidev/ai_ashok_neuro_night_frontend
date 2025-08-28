


"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import humanImage from "@/public/image/talent.png";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCreateTalentMutation } from "@/redux/api/talent/talentApi";

// Import your mutation hook (adjust the import path as needed)
 // Adjust path

interface FormData {
  function: string;
  talent: string;
  identifiedSkillsGaps: string;
  priorityForFillingGaps: string;
  trainingAndDevelopmentNeeds: string;
  marketTrendsAffectingWorkforce: string;
  talentShortageRisks: string;
  regulatoryChanges: string;
  otherTalentRelatedRisks: string;
  summary: string;
  actionItems: string;
}

export default function TalentOverview() {
  const [formData, setFormData] = useState<FormData>({
    function: "",
    talent: "",
    identifiedSkillsGaps: "",
    priorityForFillingGaps: "",
    trainingAndDevelopmentNeeds: "",
    marketTrendsAffectingWorkforce: "",
    talentShortageRisks: "",
    regulatoryChanges: "",
    otherTalentRelatedRisks: "",
    summary: "",
    actionItems: "",
  });

  // Use the mutation hook
  const [createTalent, { isLoading }] = useCreateTalentMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
   

    try {
      // Show loading toast
      const loadingToast = toast.loading("Saving talent overview...");

      // Call the mutation
      const result = await createTalent(formData).unwrap();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success toast
      toast.success(result.message || "Talent overview created successfully!");

      // Optionally reset form or handle success
      console.log("Success:", result);
      
      // Reset form after successful submission
      setFormData({
        function: "",
        talent: "",
        identifiedSkillsGaps: "",
        priorityForFillingGaps: "",
        trainingAndDevelopmentNeeds: "",
        marketTrendsAffectingWorkforce: "",
        talentShortageRisks: "",
        regulatoryChanges: "",
        otherTalentRelatedRisks: "",
        summary: "",
        actionItems: "",
      });

    } catch (error: any) {
      // Show error toast
      toast.error(
        error?.data?.message || 
        error?.message || 
        "Failed to save talent overview. Please try again."
      );
      console.error("Error:", error);
    }
  };

  // Static chart data (later can be dynamic)
  const chartData = [
    { name: "Administration", value: 50 },
    { name: "Marketing", value: 50 },
    { name: "Finance", value: 50 },
    { name: "Customer Support", value: 50 },
    { name: "IT", value: 50 },
    { name: "Human Resources", value: 50 },
    { name: "Sales", value: 50 },
    { name: "Accounting", value: 50 },
  ];

  return (
    <div className=" mx-auto py-12 bg-gray-50 p-6">
      <div className="w-full md:h-[400px] space-y-6 bg-white  p-12 mb-12  ml-3 md:flex justify-between items-center rounded-lg shadow-md gap-4">
        {/* text left side  */}
        <div className="flex-1 space-y-4 md:text-left">
          <p className="text-base text-[#231f20] mt-2 leading-relaxed">
            <span className="font-semibold">The Human Resources:</span>{" "}
            component analyzes key HR factors to enhance strategic development.{" "}
            <br /> It will assist you in reviewing talent capabilities,
            workforce trends, and other HR considerations <br /> that influence
            strategic direction and execution.
          </p>
        </div>
        <div className="flex-none mr-20 w-full md:w-[400px]">
          <Image
            src={humanImage}
            alt="Human Resources Image"
            layout="responsive"
            width={400}
            height={400}
          />
        </div>
      </div>

      <div className="rounded-lg p-12 shadow-md  bg-white ml-3">
        {/* Header */}
        <h1 className="text-2xl font-semibold p-6 ">Talent Overview</h1>

        {/* Headcount Section */}
        <div className=" p-6">
          <h2 className="text-md font-medium mb-4">Current Talent Headcount</h2>

          {/* Static Bar Chart */}
          <div className="w-full max-w-2xl h-80 border rounded-md mb-20 bg-white">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 20, right: 20, left: 40, bottom: 20 }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" domain={[0, 200]} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 14 }}
                  width={150}
                />
                <Tooltip />
                <Bar dataKey="value" fill="#1d4ed8" barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-6 mb-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="function">Function</label>
              <input
                name="function"
                value={formData.function}
                onChange={handleChange}
                placeholder="function name"
                className="p-2 rounded bg-gray-100 border w-full"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="talent">Talent</label>
              <input
                name="talent"
                value={formData.talent}
                onChange={handleChange}
                placeholder="talent name"
                className="p-2 rounded bg-gray-100 border w-full"
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 border rounded-md mx-6 p-6"
        >
          

          {/* Skills Gaps */}
          <div>
            <h3 className="font-medium mb-2">Identified Skills Gaps</h3>
            <textarea
              name="identifiedSkillsGaps"
              value={formData.identifiedSkillsGaps}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
              placeholder="Describe the skills gaps in your organization"
            />
          </div>
          <div>
            <h3 className="font-medium mb-2">Priority for Filling Gaps</h3>
            <textarea
              name="priorityForFillingGaps"
              value={formData.priorityForFillingGaps}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
              placeholder="Set priority level (High, Medium, Low) and reasoning"
            />
          </div>

          {/* Training */}
          <div className="col-span-2">
            <h3 className="font-medium mb-2">Training and Development Needs</h3>
            <textarea
              name="trainingAndDevelopmentNeeds"
              value={formData.trainingAndDevelopmentNeeds}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
              placeholder="Outline training programs and development requirements"
            />
          </div>

          {/* Workforce Trends */}
          <div className="col-span-2">
            <h3 className="font-medium mb-2">
              Market Trends Affecting Workforce
            </h3>
            <textarea
              name="marketTrendsAffectingWorkforce"
              value={formData.marketTrendsAffectingWorkforce}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
              placeholder="Describe market trends impacting your workforce"
            />
          </div>

          {/* Risk Factors */}
          <div>
            <h3 className="font-medium mb-2">Talent Shortage Risks</h3>
            <textarea
              name="talentShortageRisks"
              value={formData.talentShortageRisks}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
              placeholder="Identify risks related to talent shortages"
            />
          </div>
          <div>
            <h3 className="font-medium mb-2">Regulatory Changes</h3>
            <textarea
              name="regulatoryChanges"
              value={formData.regulatoryChanges}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
              placeholder="Note any regulatory changes affecting talent management"
            />
          </div>
          <div className="col-span-2">
            <h3 className="font-medium mb-2">Other Talent-Related Risks</h3>
            <textarea
              name="otherTalentRelatedRisks"
              value={formData.otherTalentRelatedRisks}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
              placeholder="List other talent-related risks and concerns"
            />
          </div>

          {/* Summary */}
          <div className="col-span-2">
            <h3 className="font-medium mb-2">Summary</h3>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
              placeholder="Provide a comprehensive summary of the talent overview"
            />
          </div>

          {/* Action Items */}
          <div className="col-span-2">
            <h3 className="font-medium mb-2">Action Items</h3>
            <textarea
              name="actionItems"
              value={formData.actionItems}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
              placeholder="List specific action items and next steps"
            />
          </div>

          {/* Save Button */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-[#1D2A6D] text-white rounded-md hover:bg-[#1D2A6D] transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}