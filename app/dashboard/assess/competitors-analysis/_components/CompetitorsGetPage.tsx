'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

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
      isExpanded: true
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
      isExpanded: false
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
      isExpanded: false
    }
  ],
  onCompetitorsChange
}) => {
  const [competitors, setCompetitors] = useState<CompetitorData[]>(initialCompetitors);

  const toggleExpanded = (id: number) => {
    const updatedCompetitors = competitors.map(competitor =>
      competitor.id === id
        ? { ...competitor, isExpanded: !competitor.isExpanded }
        : competitor
    );
    setCompetitors(updatedCompetitors);
    onCompetitorsChange?.(updatedCompetitors);
  };

  const updateCompetitor = (id: number, field: keyof CompetitorData, value: string) => {
    const updatedCompetitors = competitors.map(competitor =>
      competitor.id === id
        ? { ...competitor, [field]: value }
        : competitor
    );
    setCompetitors(updatedCompetitors);
    onCompetitorsChange?.(updatedCompetitors);
  };

   

  return (
    <div className="p-6 bg-white rounded-lg my-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Competitive Analysis</h1>
      
      <div className="space-y-4">
        {competitors.map((competitor) => (
          <div key={competitor.id} className="border border-gray-200 rounded-lg">
            {/* Header with competitor number and name */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#22398A] rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {competitor.id.toString().padStart(2, '0')}
                </div>
                <span className="text-lg font-medium text-gray-900">{competitor.name}</span>
              </div>
              <button
                onClick={() => toggleExpanded(competitor.id)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              >
                {competitor.isExpanded ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>
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
                        onChange={(e) => updateCompetitor(competitor.id, 'website', e.target.value)}
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
                        onChange={(e) => updateCompetitor(competitor.id, 'stockSymbol', e.target.value)}
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
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <X className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={competitor.twitterHandle}
                          onChange={(e) => updateCompetitor(competitor.id, 'twitterHandle', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="@username"
                        />
                      </div>
                    </div>

                    {/* Instagram Handle */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram Handle
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <div className="w-4 h-4 border border-gray-400 rounded-sm"></div>
                        </div>
                        <input
                          type="text"
                          value={competitor.instagramHandle}
                          onChange={(e) => updateCompetitor(competitor.id, 'instagramHandle', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="@username"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: LinkedIn URL - Full Width */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Company Page
                    </label>
                    <input
                      type="text"
                      value={competitor.linkedinUrl}
                      onChange={(e) => updateCompetitor(competitor.id, 'linkedinUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="www.linkedin.com/company/example"
                    />
                  </div>

                  {/* Row 4: Glassdoor URL - Full Width */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Glassdoor Profile
                    </label>
                    <input
                      type="text"
                      value={competitor.glassdoorUrl}
                      onChange={(e) => updateCompetitor(competitor.id, 'glassdoorUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="www.glassdoor.com/Overview/Working-at-..."
                    />
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