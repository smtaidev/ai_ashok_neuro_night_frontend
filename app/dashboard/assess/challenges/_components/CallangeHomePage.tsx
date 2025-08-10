


"use client";
import Image from "next/image";
import React, { useState } from "react";
import Drawer from "@/app/dashboard/blueprint/vision/_comoponents/DrawarModal";
import trendImage from "@/public/image/challenges-img.png";

const CallangeHomePage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [challengeTitle, setChallengeTitle] = useState("");
  const [category, setCategory] = useState("");
  const [impact, setImpact] = useState("");
  const [abilityToAddress, setAbilityToAddress] = useState("");
  const [description, setDescription] = useState("");

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

  const handleSave = () => {
    // Handle save logic here (e.g., save to state or API)
    console.log({
      challengeTitle,
      category,
      impact,
      abilityToAddress,
      description,
    });
    handleCloseModal();
  };

  return (
    <div className="bg-gray-50 p-6 my-8 rounded-lg shadow-md">
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
      <p className="text-gray-600 mb-4">
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
          className="bg-[#22398A] text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-[#1D2A6D]"
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
              <h2 className="text-lg font-semibold">Challenges</h2>
              <button
                onClick={handleCloseModal}
                className="text-white text-xl hover:text-gray-200"
              >
                ×
              </button>
            </div>
            <div className="p-5 border border-[#e5e7eb] rounded-b-lg">
              <div className="mb-4">
                <input
                  type="text"
                  value={challengeTitle}
                  onChange={(e) => setChallengeTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Challenges Title"
                />
              </div>
              <div className="mb-4">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                >
                   <option value="">challenge category</option>
                  <option value="Human">Human</option>
                  <option value="Political">Political</option>
                  <option value="Financial">Financial</option>
                  <option value="Strategic">Strategic</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Operational">Operational</option>
                </select>
              </div>
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <select
                    value={impact}
                    onChange={(e) => setImpact(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  >
                    <option value="">Impact on business</option>
                    <option value="Very Low">Very Low</option>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                    <option value="Very High">Very High</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <select
                    value={abilityToAddress}
                    onChange={(e) => setAbilityToAddress(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  >
                    <option value="">Ability to address</option>
                     <option value="Very Low">Very Low</option>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                    <option value="Very High">Very High</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1 h-24"
                  placeholder="Describe"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleMoreInfoClick}
                  className="text-[#22398A] font-semibold hover:underline"
                >
                  More info
                </button>
                <button
                  onClick={handleSave}
                  className="bg-[#1D2A6D] text-white px-6 py-2 rounded-lg hover:bg-[#22398A]"
                >
                  Save
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