"use client";
import Image from "next/image";
import React, { useState } from "react";
import Drawer from "@/app/dashboard/blueprint/vision/_comoponents/DrawarModal";
import trendImage from "@/public/image/Competitors-Analysis-img.png";

const CompetitorsHomePage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [competitorName, setCompetitorName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [glassdoorUrl, setGlassdoorUrl] = useState("");

  const handleMoreInfoClick = () => {
    setIsModalOpen(false); // Close the modal
    setCompetitorName("");
    setCompanyUrl("");
    setStockSymbol("");
    setTwitterHandle("");
    setLinkedinUrl("");
    setInstagramHandle("");
    setGlassdoorUrl("");
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
    setCompetitorName("");
    setCompanyUrl("");
    setStockSymbol("");
    setTwitterHandle("");
    setLinkedinUrl("");
    setInstagramHandle("");
    setGlassdoorUrl("");
  };

  const handleSave = () => {
    // Handle save logic here (e.g., save to state or API)
    console.log({
      competitorName,
      companyUrl,
      stockSymbol,
      twitterHandle,
      linkedinUrl,
      instagramHandle,
      glassdoorUrl,
    });
    handleCloseModal();
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="mb-6 flex justify-center">
        <Image
          src={trendImage}
          alt="Description of image"
          width={980}
          height={530}
          className="rounded-lg mb-4"
        />
      </div>
      <h2 className="text-xl font-semibold mb-4">Competitive Analysis</h2>
      <p className="text-gray-600 mb-4">
        Competitive analysis involves studying competitors&#39; market activities,
        brand sentiment, financial performance, and customer engagement to
        understand the market landscape better. It helps businesses develop
        successful strategies and identify market trends, opportunities for
        differentiation, and potential challenges.
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
          className="bg-[#22398A] text-white px-4 py-2 rounded-lg hover:bg-[#1D2A6D]"
        >
          Get Started
        </button>
      </div>

      {/* Drawer Component */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title="More Information"
        
      >
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            Competitors analysis involves learning about your competitors&#39; market
            moves, sentiments, financial performance, and customer engagement to
            better understand the market landscape. This process helps businesses
            develop effective strategies to gain a competitive edge. By
            analyzing competitors, companies can uncover market trends, identify
            opportunities for differentiation, and anticipate potential threats.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-2">
            Why Conduct a Competitors Analysis?
          </h3>
          <p className="text-gray-800 mb-3">
            <span className="text-gray-800 font-semibold">
              Informed Decision-Making:
            </span>{" "}
            Understanding competitors&#39; moves allows businesses to make strategic
            decisions based on market realities.
          </p>
          <p className="text-gray-800 mb-3">
            <span className="text-gray-800 font-semibold">Identify Opportunities:</span>{" "}
            Pinpoint gaps in the market that competitors have not exploited.
          </p>
          <p className="text-gray-800 mb-3">
            <span className="text-gray-800 font-semibold">Risk Mitigation:</span>{" "}
            Anticipate and prepare for competitors&#39; actions that could affect
            your market position.
          </p>
          <p className="text-gray-800 mb-3">
            <span className="text-gray-800 font-semibold">Benchmarking:</span>{" "}
            Set performance benchmarks by comparing against industry leaders and
            similar players.
          </p>
          <p className="text-gray-800 mb-3">
            <span className="text-gray-800 font-semibold">Customer Insights:</span>{" "}
            Learn from competitors&#39; successes and failures to better meet
            customer needs.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-2">
            Best Practices in Competitors Analysis
          </h3>
          <p className="text-gray-800 mb-3">
            <span className="text-gray-800 font-semibold">
              Identify Key Competitors:
            </span>{" "}
            Focus on direct and indirect competitors that impact your business
            most significantly.
          </p>
          <p className="text-gray-800 mb-3">
            <span className="text-gray-800 font-semibold">SWOT Analysis:</span>{" "}
            Evaluate competitors using SWOT (Strengths, Weaknesses,
            Opportunities, Threats) to gain a comprehensive view of their
            position.
          </p>
          <p className="text-gray-800 mb-3">
            <span className="text-gray-800 font-semibold">
              Focus on Differentiation:
            </span>{" "}
            Understand how competitors differentiate themselves and identify ways
            to set your business apart.
          </p>
          <p className="text-gray-800 mb-3">
            <span className="text-gray-800 font-semibold">Benchmarking:</span>{" "}
            Set performance benchmarks by comparing against industry leaders and
            similar players.
          </p>
          <p className="text-gray-800 mb-3">
            <span className="text-gray-800 font-semibold">
              Continuous Monitoring:
            </span>{" "}
            Competitors&#39; analysis should be an ongoing process rather than a
            one-time effort to stay updated with market changes.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-2">
            Dos and Don&#39;ts of Competitors Analysis
          </h3>
          {/* Dos */}
          <div className="p-4 rounded-lg mb-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-black mb-2">Do’s</h3>
            <p className="text-gray-800 mb-3">
              <span className="text-gray-800 font-semibold">
                Identify Key Competitors:
              </span>{" "}
              Focus on direct and indirect competitors that impact your business
              most significantly.
            </p>
            <p className="text-gray-800 mb-3">
              <span className="text-gray-800 font-semibold">SWOT Analysis:</span>{" "}
              Evaluate competitors using SWOT (Strengths, Weaknesses,
              Opportunities, Threats) to gain a comprehensive view of their
              position.
            </p>
            <p className="text-gray-800 mb-3">
              <span className="text-gray-800 font-semibold">
                Focus on Differentiation:
              </span>{" "}
              Understand how competitors differentiate themselves and identify
              ways to set your business apart.
            </p>
          </div>

          {/* Don'ts */}
          <div className="p-4 rounded-lg mb-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-black mb-2">Don’ts</h3>
            <p className="text-gray-800 mb-3">
              <span className="text-gray-800 font-semibold">
                Identify Key Competitors:
              </span>{" "}
              Focus on direct and indirect competitors that impact your business
              most significantly.
            </p>
            <p className="text-gray-800 mb-3">
              <span className="text-gray-800 font-semibold">SWOT Analysis:</span>{" "}
              Evaluate competitors using SWOT (Strengths, Weaknesses,
              Opportunities, Threats) to gain a comprehensive view of their
              position.
            </p>
            <p className="text-gray-800 mb-3">
              <span className="text-gray-800 font-semibold">
                Focus on Differentiation:
              </span>{" "}
              Understand how competitors differentiate themselves and identify
              ways to set your business apart.
            </p>
          </div>
          <p className="text-gray-800">
            Competitors analysis involves learning about your competitors&#39; market
            moves, sentiments, financial performance, and customer engagement to
            better understand the market landscape. This process helps businesses
            develop effective strategies to gain a competitive edge. By
            analyzing competitors, companies can uncover market trends, identify
            opportunities for differentiation, and anticipate potential threats.
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
              <h2 className="text-lg font-semibold">Competitive Analysis</h2>
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
                  value={competitorName}
                  onChange={(e) => setCompetitorName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Competitor's Name"
                />
              </div>
              <div className="mb-4">
                <input
                  type="url"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Company URL"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={stockSymbol}
                  onChange={(e) => setStockSymbol(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Stock Symbol"
                />
              </div>
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    placeholder="X (formerly Twitter) Handle"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    placeholder="LinkedIn Company Page URL"
                  />
                </div>
              </div>
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    placeholder="Instagram Handle"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="url"
                    value={glassdoorUrl}
                    onChange={(e) => setGlassdoorUrl(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    placeholder="Glassdoor Company URL"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
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

export default CompetitorsHomePage;