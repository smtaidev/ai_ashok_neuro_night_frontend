"use client";

import React, { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const AlignmentCheck = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const alignmentCards = [
    {
      id: 'trends',
      title: 'Trends',
      icon: '🟢',
      color: 'green',
      description: 'Review market trends and future opportunities identified through analysis',
      status: 'pending',
      buttonText: 'Trends'
    },
    {
      id: 'swot',
      title: 'Swot',
      icon: '🔴',
      color: 'red',
      description: 'Validate strengths, weaknesses, opportunities, and threats assessment',
      status: 'pending',
      buttonText: 'Swot'
    },
    {
      id: 'challenges',
      title: 'Challenges',
      icon: '🔴',
      color: 'red',
      description: 'Align on key challenges and proposed solutions for the organization',
      status: 'pending',
      buttonText: 'Challenges'
    },
    {
      id: 'competitors',
      title: 'Competitor\'s Analysis',
      icon: '🔴',
      color: 'red',
      description: 'Review competitive landscape analysis and strategic positioning',
      status: 'pending',
      buttonText: 'Competitor\'s Analysis'
    }
  ];

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
    // Here you would typically navigate to the specific alignment review page
    console.log(`Opening alignment check for: ${cardId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Alignment Check</h1>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The Alignment Check is a collaborative process that ensures teams are aware of the 
                  current landscape and internal and external factors that could impact the company&#39;s 
                  current and future direction. It fosters the shared development of strategic directions and 
                  ensures that teams and decision-makers are on the same page. Importantly, stakeholders 
                  review and either approve or offer suggestions, nurturing a sense of shared responsibility 
                  and active participation.
                </p>
                <p className="font-medium">
                  Its primary purpose is to ensure that everyone is aligned and understands the strategic 
                  directions chosen by the organization.
                </p>
              </div>
            </div>
            <div className="ml-8 flex-shrink-0">
              {/* Alignment Check Icon - Matching the design */}
              <div className="relative w-40 h-40">
                {/* Gear background */}
                <div className="absolute inset-0">
                  <svg viewBox="0 0 160 160" className="w-40 h-40 text-amber-800">
                    <path
                      fill="currentColor"
                      d="M80 20L90 30L100 20L110 30L120 40L130 30L140 40L130 50L140 60L130 70L120 80L130 90L140 80L130 90L120 100L110 90L100 100L90 90L80 100L70 90L60 100L50 90L40 100L30 90L20 80L30 70L20 60L30 50L20 40L30 30L40 20L50 30L60 20L70 30Z"
                    />
                  </svg>
                </div>
                {/* White circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                  {/* Blue checkmark */}
                  <div className="w-16 h-16 bg-blue-600 rounded flex items-center justify-center transform rotate-12">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Alignment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alignmentCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer p-8"
              onClick={() => handleCardClick(card.id)}
            >
              {/* Card Header */}
              <div className="flex items-center mb-6">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  card.color === 'green' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
              </div>

              {/* Empty space for content - matching the image layout */}
              <div className="h-32 mb-8 bg-gray-50 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-sm">Content area</span>
              </div>

              {/* Action Button */}
              <div className="flex justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Begin Alignment?</h3>
              <p className="text-gray-600">
                Start the collaborative review process to ensure strategic alignment across your organization.
              </p>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center">
              Start Alignment Process
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlignmentCheck;