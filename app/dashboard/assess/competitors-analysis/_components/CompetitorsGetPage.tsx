"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CompetitorData {
  id: number;
  name: string;
  website: string;
  twitterHandle: string;
  linkedinUrl: string;
  glassdoorUrl: string;
  stockSymbol: string;
  instagramHandle: string;
  isExpanded: boolean;
}

interface CompetitiveAnalysisFormProps {
  initialCompetitors?: CompetitorData[];
  onCompetitorsChange?: (competitors: CompetitorData[]) => void;
}

const CompetitiveAnalysisForm: React.FC<CompetitiveAnalysisFormProps> = ({
  initialCompetitors = [
    {
      id: 1,
      name: "Competitor's Name",
      website: "www.demo.com",
      twitterHandle: "@demo_social",
      linkedinUrl: "www.linkedin.com/company/demo-company",
      glassdoorUrl: "www.glassdoor.co.in/Overview/Working-at-Accenture-...",
      stockSymbol: "",
      instagramHandle: "@demo_social",
      isExpanded: true,
    },
    {
      id: 2,
      name: "Competitor's Name",
      website: "",
      twitterHandle: "",
      linkedinUrl: "",
      glassdoorUrl: "",
      stockSymbol: "",
      instagramHandle: "",
      isExpanded: false,
    },
    {
      id: 3,
      name: "Competitor's Name",
      website: "",
      twitterHandle: "",
      linkedinUrl: "",
      glassdoorUrl: "",
      stockSymbol: "",
      instagramHandle: "",
      isExpanded: false,
    },
  ],
  onCompetitorsChange,
}) => {
  const [competitors, setCompetitors] =
    useState<CompetitorData[]>(initialCompetitors);

  const toggleExpanded = (id: number) => {
    const updatedCompetitors = competitors.map((competitor) =>
      competitor.id === id
        ? { ...competitor, isExpanded: !competitor.isExpanded }
        : competitor
    );
    setCompetitors(updatedCompetitors);
    onCompetitorsChange?.(updatedCompetitors);
  };

  const updateCompetitor = (
    id: number,
    field: keyof CompetitorData,
    value: string
  ) => {
    const updatedCompetitors = competitors.map((competitor) =>
      competitor.id === id ? { ...competitor, [field]: value } : competitor
    );
    setCompetitors(updatedCompetitors);
    onCompetitorsChange?.(updatedCompetitors);
  };

  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [competitorName, setCompetitorName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [glassdoorUrl, setGlassdoorUrl] = useState("");

  // const handleMoreInfoClick = () => {
  //   setIsModalOpen(false); // Close the modal
  //   setCompetitorName("");
  //   setCompanyUrl("");
  //   setStockSymbol("");
  //   setTwitterHandle("");
  //   setLinkedinUrl("");
  //   setInstagramHandle("");
  //   setGlassdoorUrl("");
  //   setIsDrawerOpen(true); // Open the drawer
  // };

  // const handleCloseDrawer = () => {
  //   setIsDrawerOpen(false);
  // };

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
    <div className="p-6 bg-white rounded-lg ml-6 my-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Competitive Analysis
        </h1>
        <button
          onClick={handleGetStartedClick}
          className="px-4 py-2 bg-[#22398A] text-white rounded-lg hover:bg-[#1a2d6d] transition-colors"
        >
          + Add Competitor
        </button>
      </div>

      <div className="space-y-4">
        {competitors.map((competitor) => (
          <div
            key={competitor.id}
            className="border border-gray-200 rounded-lg"
          >
            {/* Header with competitor number and name */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#22398A] rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {competitor.id.toString().padStart(2, "0")}
                </div>
                <span className="text-lg font-medium text-gray-900">
                  {competitor.name}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition"
                  onClick={() =>
                    alert(`Viewing details for ${competitor.name}`)
                  }
                >
                  Details
                </button>
                <button
                  onClick={() => toggleExpanded(competitor.id)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {competitor.isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Expanded content */}
            {competitor.isExpanded && (
              <div className="p-6">
                <div className="space-y-4">
                  {/* Row 1: Website and Stock Symbol */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Website */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      <input
                        type="text"
                        value={competitor.website}
                        onChange={(e) =>
                          updateCompetitor(
                            competitor.id,
                            "website",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="www.example.com"
                      />
                    </div>

                    {/* Stock Symbol */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Symbol
                      </label>
                      <input
                        type="text"
                        value={competitor.stockSymbol}
                        onChange={(e) =>
                          updateCompetitor(
                            competitor.id,
                            "stockSymbol",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="AAPL"
                      />
                    </div>
                  </div>

                  {/* Row 2: Twitter and Instagram */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Twitter Handle */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twitter Handle
                      </label>
                      <input
                        type="text"
                        value={competitor.twitterHandle}
                        onChange={(e) =>
                          updateCompetitor(
                            competitor.id,
                            "twitterHandle",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="@username"
                      />
                    </div>

                    {/* Instagram Handle */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram Handle
                      </label>
                      <input
                        type="text"
                        value={competitor.instagramHandle}
                        onChange={(e) =>
                          updateCompetitor(
                            competitor.id,
                            "instagramHandle",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="@username"
                      />
                    </div>
                  </div>

                  {/* Row 3: LinkedIn URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Company Page
                    </label>
                    <input
                      type="text"
                      value={competitor.linkedinUrl}
                      onChange={(e) =>
                        updateCompetitor(
                          competitor.id,
                          "linkedinUrl",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="www.linkedin.com/company/example"
                    />
                  </div>

                  {/* Row 4: Glassdoor URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Glassdoor Profile
                    </label>
                    <input
                      type="text"
                      value={competitor.glassdoorUrl}
                      onChange={(e) =>
                        updateCompetitor(
                          competitor.id,
                          "glassdoorUrl",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="www.glassdoor.com/Overview/Working-at-..."
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg">
                  <div
                    className="bg-[#1D2A6D] text-white p-3 rounded-t-lg flex justify-between items-center"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    <h2 className="text-lg font-semibold">
                      Competitive Analysis
                    </h2>
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
        ))}
      </div>
    </div>
  );
};

export default CompetitiveAnalysisForm;
