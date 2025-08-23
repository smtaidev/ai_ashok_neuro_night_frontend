





"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import alignmentPng from '@/public/image/Alignment-Check-img.svg';
import { useCreateAlignmentMutation } from '@/redux/api/Alignment/alignmentApi';
import toast from 'react-hot-toast';

interface ClarhetAiRecommendationsProps {
  headerColor?: string;
}

interface ModalData {
  title: string;
  questions: Array<{
    question: string;
    options: string[];
  }>;
  additionalOptions: string[];
}

// Define valid color keys as a type
type ColorKey = 'red-500' | 'blue-500' | 'green-600';

// Color mapping utility with index signature
const colorMap: Record<ColorKey, { bg: string; text: string; border: string; borderTop: string }> = {
  'red-500': { 
    bg: 'bg-red-500', 
    text: 'text-red-500', 
    border: 'border-red-500',
    borderTop: ' border-t-20 border-t-red-500'
  },
  'blue-500': { 
    bg: 'bg-blue-500', 
    text: 'text-blue-500', 
    border: 'border-blue-500',
    borderTop: 'border-t-20 border-t-blue-500'
  },
  'green-600': { 
    bg: 'bg-green-600', 
    text: 'text-green-600', 
    border: 'border-green-600',
    borderTop: ' border-t-20 border-t-green-600'
  }
};

// Helper function to safely get color properties
const getColorProperties = (color: string) => {
  const validColor = color as ColorKey;
  return colorMap[validColor] || colorMap['red-500']; // Fallback to red-500 if invalid
};

// Define types for our persisted data
interface PersistedAlignmentData {
  sectionColors: {[key: string]: string};
  completedSections: {[key: string]: boolean};
}

const AlignmentCheck: React.FC<ClarhetAiRecommendationsProps> = ({ 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<string>('');
  const [formData, setFormData] = useState<{[key: string]: boolean}>({});
  const [suggestions, setSuggestions] = useState<string>('');
  const [sectionColors, setSectionColors] = useState<{[key: string]: string}>({
    trends: 'red-500',
    swot: 'red-500',
    challenges: 'red-500',
    competitor: 'red-500'
  });
  const [completedSections, setCompletedSections] = useState<{[key: string]: boolean}>({
    trends: false,
    swot: false,
    challenges: false,
    competitor: false
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedAlignmentData = localStorage.getItem('alignmentData');
    if (savedAlignmentData) {
      try {
        const parsedData: PersistedAlignmentData = JSON.parse(savedAlignmentData);
        setSectionColors(parsedData.sectionColors);
        if (parsedData.completedSections) {
          setCompletedSections(parsedData.completedSections);
        }
      } catch (error) {
        console.error('Failed to parse alignment data from localStorage', error);
      }
    }
  }, []);

  // Save data to localStorage whenever sectionColors or completedSections changes
  useEffect(() => {
    const dataToSave: PersistedAlignmentData = {
      sectionColors,
      completedSections
    };
    localStorage.setItem('alignmentData', JSON.stringify(dataToSave));
  }, [sectionColors, completedSections]);

  const getModalTitle = (type: string) => {
    const titles: {[key: string]: string} = {
      trends: 'Assess Alignment Check',
      swot: 'Assess Alignment Check',
      challenges: 'Assess Alignment Check',
      competitor: 'Assess Alignment Check'
    };
    return titles[type] || 'Alignment Check';
  };

  // alignment mutation 
  const [createAlignment] = useCreateAlignmentMutation();

  const modalData = {
    questions: [
      {
        question: 'Were all relevant stakeholders involved in the Assess phase?',
        options: [
          'Verified the inclusion of key internal and external stakeholders.',
          'Ensured diverse perspectives were considered during the Assess phase.',
          'Confirmed representation from relevant departments and teams.'
        ]
      },
      {
        question: 'Do we have a shared understanding of the outcomes from the Assess phase?',
        options: [
          'Conducted a review session to discuss assessment findings.',
          'Ensured alignment of interpretations and insights among stakeholders.',
          'Documented and communicated key takeaways from the Assess phase.'
        ]
      }
    ],
    additionalOptions: ['Trends', 'SWOT', 'Challenges', 'Competitor Analysis']
  };

  const openModal = (type: string) => {
    setCurrentModal(type);
    setIsModalOpen(true);
    setFormData({});
    setSuggestions('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentModal('');
    setFormData({});
    setSuggestions('');
  };

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleSave = () => {
    const currentModalData = modalData;

    const answers = currentModalData.questions.map((q, qIndex) => {
      const selectedOptions = q.options.filter((opt, oIndex) => formData[`q${qIndex}_o${oIndex}`]);
      return {
        questionNumber: qIndex + 1,
        selectedOptions,
      };
    });

    const selectedComponents = currentModalData.additionalOptions.map((opt, index) => ({
      name: opt,
      checked: !!formData[`additional_${index}`]
    }));

    const body = {
      title: getModalTitle(currentModal),
      userId: "64f123abc456def789012345",
      companyName: "SM LTD",
      answers,
      selectedComponents,
      suggestions,
    };

    // Calculate total checked question boxes (first 6)
    const totalChecked = answers.reduce((sum, a) => sum + a.selectedOptions.length, 0);

    let colorClass: ColorKey;
    if (totalChecked === 6) {
      colorClass = 'green-600';
    } else if (totalChecked >= 4) {
      colorClass = 'blue-500';
    } else {
      colorClass = 'red-500';
    }

    setSectionColors(prev => ({ ...prev, [currentModal]: colorClass }));
    setCompletedSections(prev => ({ ...prev, [currentModal]: true }));

    createAlignment(body).unwrap().then(() => {
      toast.success('Alignment created successfully');
    }).catch((error) => {
      console.error('Error creating alignment:', error);
      toast.error('Failed to save alignment');
    });

    console.log('Form Data:', body);
    closeModal();
  };

  const currentModalData = modalData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="">
          {/* Header Section */}
          <div className="flex items-start mb-12 bg-white p-6 border border-gray-200 rounded-xl ">
            <div className="flex-1 max-w-2xl">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                ClarhetAi Recommendations
              </h1>
              <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                <p>
                  The Alignment Check is a collaborative process that ensures teams are aware of the current landscape and
                  internal and external factors that could impact the company&#39;s current and future direction. It fosters the shared
                  development of strategic directions and ensures that teams and decision-makers are on the same page.
                  Importantly, stakeholders review and either approve or offer suggestions, nurturing a sense of shared
                  responsibility and active participation.
                </p>
                <p>
                  Its primary purpose is to ensure that everyone is aligned and understands the strategic directions chosen by the
                  organization.
                </p>
              </div>
            </div>
            
            {/* Icon */}
            <div className="flex items-center justify-center ml-64 flex-shrink-0">
              <div className="flex items-center justify-center">
                <Image
                  src={alignmentPng}
                  alt="Icon"
                  width={320}
                  height={305}
                  className=""
                />
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Identity Card */}
            <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[16rem] border-t-4 ${getColorProperties(sectionColors.trends).borderTop}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-6 h-6 ${getColorProperties(sectionColors.trends).bg} rounded-full flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">01</span>
                </div>
                <h3 className={`text-lg font-semibold ${getColorProperties(sectionColors.trends).text}`}>Identity</h3>
              </div>
              <div className="flex justify-center items-center h-32 mb-6">
                {/* Placeholder for content */}
              </div>
              <div className="flex justify-center">
                <button 
                  onClick={() => openModal('trends')}
                  className="bg-[#22398A] hover:bg-[#1E2A78] text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Trends
                </button>
              </div>
            </div>

            {/* Swot Card */}
            <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[16rem] border-t-4 ${getColorProperties(sectionColors.swot).borderTop}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-6 h-6 ${getColorProperties(sectionColors.swot).bg} rounded-full flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">02</span>
                </div>
                <h3 className={`text-lg font-semibold ${getColorProperties(sectionColors.swot).text}`}>Swot</h3>
              </div>
              <div className="flex justify-center items-center h-32 mb-6">
                {/* Placeholder for content */}
              </div>
              <div className="flex justify-center">
                <button 
                  onClick={() => openModal('swot')}
                  className="bg-[#22398A] hover:bg-[#1E2A78] text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Swot
                </button>
              </div>
            </div>

            {/* Challenges Card */}
            <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[16rem] border-t-4 ${getColorProperties(sectionColors.challenges).borderTop}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-6 h-6 ${getColorProperties(sectionColors.challenges).bg} rounded-full flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">03</span>
                </div>
                <h3 className={`text-lg font-semibold ${getColorProperties(sectionColors.challenges).text}`}>Challenges</h3>
              </div>
              <div className="flex justify-center items-center h-32 mb-6">
                {/* Placeholder for content */}
              </div>
              <div className="flex justify-center">
                <button 
                  onClick={() => openModal('challenges')}
                  className="bg-[#22398A] hover:bg-[#1E2A78] text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Challenges
                </button>
              </div>
            </div>

            {/* Competitor's Analysis Card */}
            <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[16rem] border-t-4 ${getColorProperties(sectionColors.competitor).borderTop}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-6 h-6 ${getColorProperties(sectionColors.competitor).bg} rounded-full flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">04</span>
                </div>
                <h3 className={`text-lg font-semibold ${getColorProperties(sectionColors.competitor).text}`}>Competitor&#39;s Analysis</h3>
              </div>
              <div className="flex justify-center items-center h-32 mb-6">
                {/* Placeholder for content */}
              </div>
              <div className="flex justify-center">
                <button 
                  onClick={() => openModal('competitor')}
                  className="bg-[#22398A] hover:bg-[#1E2A78] text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Competitor&#39;s Analysis
                </button>
              </div>
            </div>
          </div>

          {/* Status Legend */}
          <div className="mt-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alignment Status Legend</h3>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">Needs Attention (0-3 checks)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">Moderate Alignment (4-5 checks)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-600 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">Full Alignment (6 checks)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && currentModalData && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-[#22398A] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-semibold">{getModalTitle(currentModal)}</h2>
              <button 
                onClick={closeModal}
                className="text-white hover:text-gray-200 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8 ">
              {/* Questions Section */}
              {currentModalData.questions.map((questionData, qIndex) => (
                <div key={qIndex} className="space-y-4 ">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {questionData.question}
                  </h3>
                  <div className="space-y-3">
                    {questionData.options.map((option, oIndex) => (
                      <label key={oIndex} className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={formData[`q${qIndex}_o${oIndex}`] || false}
                          onChange={(e) => handleCheckboxChange(`q${qIndex}_o${oIndex}`, e.target.checked)}
                          disabled={completedSections[currentModal]}
                        />
                        <span className="text-gray-700 text-sm leading-relaxed">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {/* Additional Options */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="space-y-3">
                  {currentModalData.additionalOptions.map((option, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={formData[`additional_${index}`] || false}
                        onChange={(e) => handleCheckboxChange(`additional_${index}`, e.target.checked)}
                        disabled={completedSections[currentModal]}
                      />
                      <span className="text-gray-700 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Suggestions/Notes */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Suggestions/Notes</h3>
                <textarea
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  placeholder="Enter your suggestions or notes here..."
                  disabled={completedSections[currentModal]}
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSave}
                  disabled={completedSections[currentModal]}
                  className={`px-8 py-2 rounded-md font-medium transition-colors ${
                    completedSections[currentModal] 
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                      : 'bg-[#22398A] hover:bg-[#1E2A78] text-white'
                  }`}
                >
                  {completedSections[currentModal] ? 'Already Completed' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlignmentCheck;