"use client";

import { useState } from "react";
import Image from "next/image";
import humanImage from "@/public/image/swot-img.png";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function TalentOverview() {
  const [formData, setFormData] = useState({
    function: "All Functions",
    talent: "All Talent",
    skillsGaps: "",
    priorityGaps: "",
    trainingNeeds: "",
    workforceTrends: "",
    talentRisks: "",
    regulatoryChanges: "",
    otherRisks: "",
    summary: "",
    actionItems: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form saved successfully!");
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
        <div className="flex-none mr-38 w-full md:w-[300px]">
          <Image
            src={humanImage}
            alt="Human Resources Image"
            layout="responsive"
            width={300}
            height={300}
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
              <select
                name="function"
                value={formData.function}
                onChange={handleChange}
                className="border rounded-md p-2 w-64 bg-gray-100"
              >
                <option>Select Function</option>
                <option>IT</option>
                <option>HR</option>
                <option>Finance</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="talent">Talent</label>
              <select
                name="talent"
                value={formData.talent}
                onChange={handleChange}
                className="border rounded-md p-2 w-64 bg-gray-100"
              >
                <option>Select Talent Level</option>
                <option>Senior</option>
                <option>Mid-Level</option>
                <option>Junior</option>
              </select>
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
              name="skillsGaps"
              value={formData.skillsGaps}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
            />
          </div>
          <div>
            <h3 className="font-medium mb-2">Priority for Filling Gaps</h3>
            <textarea
              name="priorityGaps"
              value={formData.priorityGaps}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
            />
          </div>

          {/* Training */}
          <div className="col-span-2">
            <h3 className="font-medium mb-2">Training and Development Needs</h3>
            <textarea
              name="trainingNeeds"
              value={formData.trainingNeeds}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
            />
          </div>

          {/* Workforce Trends */}
          <div className="col-span-2">
            <h3 className="font-medium mb-2">
              Market Trends Affecting Workforce
            </h3>
            <textarea
              name="workforceTrends"
              value={formData.workforceTrends}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
            />
          </div>

          {/* Risk Factors */}
          <div>
            <h3 className="font-medium mb-2">Talent Shortage Risks</h3>
            <textarea
              name="talentRisks"
              value={formData.talentRisks}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
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
            />
          </div>
          <div className="col-span-2">
            <h3 className="font-medium mb-2">Other Talent-Related Risks</h3>
            <textarea
              name="otherRisks"
              value={formData.otherRisks}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-100"
              rows={3}
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
            />
          </div>

          {/* Save Button */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
