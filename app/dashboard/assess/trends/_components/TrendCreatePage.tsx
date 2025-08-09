'use client';

import React, { JSX, useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';

interface Question {
  question: string;
  impact: 'high' | 'medium' | 'low';
  answer: string;
}

interface TrendSection {
  trendName: string;
  questions: Question[];
}

interface IntroductionSection {
  trendName: string;
  insights: string;
}

interface FormData {
  introduction: IntroductionSection;
  [key: string]: TrendSection | IntroductionSection;
}

interface TrendSectionConfig {
  id: string;
  title: string;
  number: string;
  mandatory: boolean;
}

const CreateTrendPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));
  
  // Form data state
  const [formData, setFormData] = useState<FormData>({
    introduction: {
      trendName: 'Introduction',
      insights: ''
    },
    customerInsights: {
      trendName: 'Customer Insights',
      questions: [
        { question: 'What are the evolving needs and preferences of our target customers?', impact: 'high', answer: '' },
        { question: 'How is customer behavior changing, and what factors are influencing these changes?', impact: 'high', answer: '' },
        { question: 'Are there any unmet needs or pain points that we should address?', impact: 'high', answer: '' }
      ]
    },
    competitorLandscape: {
      trendName: 'Competitor Landscape',
      questions: [
        { question: 'How is the competitive landscape evolving in our industry?', impact: 'high', answer: '' },
        { question: 'What new competitors or competitive threats are emerging?', impact: 'high', answer: '' },
        { question: 'What strategies are competitors using that we should be aware of?', impact: 'high', answer: '' }
      ]
    },
    technologicalAdvances: {
      trendName: 'Technological Advances',
      questions: [
        { question: 'What technological innovations are disrupting our industry?', impact: 'high', answer: '' },
        { question: 'How can we leverage emerging technologies to improve our offerings?', impact: 'high', answer: '' },
        { question: 'What technology trends should we monitor for future opportunities?', impact: 'high', answer: '' }
      ]
    },
    regulatoryFactors: {
      trendName: 'Regulatory and Legal Factors',
      questions: [
        { question: 'What regulatory changes are affecting our industry?', impact: 'high', answer: '' },
        { question: 'How do compliance requirements impact our business strategy?', impact: 'high', answer: '' },
        { question: 'What legal trends should we prepare for in the coming years?', impact: 'high', answer: '' }
      ]
    },
    economicConsiderations: {
      trendName: 'Economic Considerations',
      questions: [
        { question: 'How are economic trends affecting our market and customers?', impact: 'high', answer: '' },
        { question: 'What economic indicators should we monitor closely?', impact: 'high', answer: '' },
        { question: 'How do economic cycles impact our business model?', impact: 'high', answer: '' }
      ]
    },
    supplyChainLogistics: {
      trendName: 'Supply Chain and Logistics',
      questions: [
        { question: 'What supply chain disruptions or changes are affecting our industry?', impact: 'high', answer: '' },
        { question: 'How can we optimize our logistics and supply chain operations?', impact: 'high', answer: '' },
        { question: 'What supply chain trends should we adapt to remain competitive?', impact: 'high', answer: '' }
      ]
    },
    globalMarketTrends: {
      trendName: 'Global Market Trends',
      questions: [
        { question: 'What global market trends are influencing our industry?', impact: 'high', answer: '' },
        { question: 'How do international markets present opportunities or threats?', impact: 'high', answer: '' },
        { question: 'What geopolitical factors should we consider in our strategy?', impact: 'high', answer: '' }
      ]
    },
    environmentalSocialImpact: {
      trendName: 'Environmental and Social Impact',
      questions: [
        { question: 'How are sustainability trends affecting customer expectations?', impact: 'high', answer: '' },
        { question: 'What environmental regulations should we prepare for?', impact: 'high', answer: '' },
        { question: 'How can we improve our social and environmental responsibility?', impact: 'high', answer: '' }
      ]
    },
    collaborationPartnerships: {
      trendName: 'Collaboration and Partnerships',
      questions: [
        { question: 'What partnership opportunities could enhance our competitive position?', impact: 'high', answer: '' },
        { question: 'How are industry collaborations evolving?', impact: 'high', answer: '' },
        { question: 'What strategic alliances should we consider for growth?', impact: 'high', answer: '' }
      ]
    },
    scenariosRiskAssessment: {
      trendName: 'Scenarios and Risk Assessment',
      questions: [
        { question: 'What are the most significant risks facing our business?', impact: 'high', answer: '' },
        { question: 'How should we prepare for different market scenarios?', impact: 'high', answer: '' },
        { question: 'What contingency plans should we develop for potential disruptions?', impact: 'high', answer: '' }
      ]
    },
    emergingMarketsOpportunities: {
      trendName: 'Emerging Markets and Opportunities',
      questions: [
        { question: 'What new markets or customer segments should we explore?', impact: 'high', answer: '' },
        { question: 'How can we identify and capitalize on emerging opportunities?', impact: 'high', answer: '' },
        { question: 'What trends suggest new revenue streams for our business?', impact: 'high', answer: '' }
      ]
    },
    onTheRadar: {
      trendName: 'On The Radar',
      questions: [
        { question: 'What early-stage trends should we monitor for future impact?', impact: 'medium', answer: '' },
        { question: 'What weak signals might become significant trends?', impact: 'medium', answer: '' },
        { question: 'What innovative ideas or concepts are worth exploring?', impact: 'medium', answer: '' }
      ]
    }
  });

  const trendSections: TrendSectionConfig[] = [
    { id: 'introduction', title: 'Introduction', number: '01', mandatory: true },
    { id: 'customerInsights', title: 'Customer Insights', number: '02', mandatory: true },
    { id: 'competitorLandscape', title: 'Competitor Landscape', number: '03', mandatory: true },
    { id: 'technologicalAdvances', title: 'Technological Advances', number: '04', mandatory: true },
    { id: 'regulatoryFactors', title: 'Regulatory and Legal Factors', number: '05', mandatory: true },
    { id: 'economicConsiderations', title: 'Economic Considerations', number: '06', mandatory: true },
    { id: 'supplyChainLogistics', title: 'Supply Chain and Logistics', number: '07', mandatory: true },
    { id: 'globalMarketTrends', title: 'Global Market Trends', number: '08', mandatory: true },
    { id: 'environmentalSocialImpact', title: 'Environmental and Social Impact', number: '09', mandatory: true },
    { id: 'collaborationPartnerships', title: 'Collaboration and Partnerships', number: '10', mandatory: true },
    { id: 'scenariosRiskAssessment', title: 'Scenarios and Risk Assessment', number: '11', mandatory: true },
    { id: 'emergingMarketsOpportunities', title: 'Emerging Markets and Opportunities', number: '12', mandatory: true },
    { id: 'onTheRadar', title: 'On The Radar', number: '13', mandatory: false }
  ];

  const isStepCompleted = (stepIndex: number): boolean => {
    const section = trendSections[stepIndex];
    
    // Introduction is completed once user moves to next step
    if (section.id === 'introduction') {
      return visitedSteps.has(stepIndex) && currentStep > 0;
    }
    
    // For other sections, check if at least one question has an answer
    const sectionData = formData[section.id] as TrendSection;
    return sectionData.questions.some(q => q.answer.trim() !== '');
  };

  const canProceedToNext = (): boolean => {
    const currentSection = trendSections[currentStep];
    if (currentSection.id === 'introduction') {
      return true; // Can always proceed from introduction
    }
    if (currentSection.mandatory) {
      return isStepCompleted(currentStep);
    }
    return true;
  };

  const handleNext = (): void => {
    if (currentStep < trendSections.length - 1 && canProceedToNext()) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      setVisitedSteps(prev => new Set([...prev, newStep]));
    }
  };

  const handlePrevious = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number): void => {
    // Allow clicking on visited steps or the next immediate step
    if (visitedSteps.has(stepIndex) || stepIndex === currentStep + 1) {
      setCurrentStep(stepIndex);
      setVisitedSteps(prev => new Set([...prev, stepIndex]));
    }
  };

  const handleSubmit = (): void => {
    // Check if all mandatory fields are completed
    const mandatorySections = trendSections.filter(section => section.mandatory && section.id !== 'introduction');
    const allMandatoryCompleted = mandatorySections.every((section, index) => {
      const sectionIndex = trendSections.findIndex(s => s.id === section.id);
      return isStepCompleted(sectionIndex);
    });
    
    if (allMandatoryCompleted) {
      // Console log the complete form data
      console.log('=== TREND FORM DATA ===');
      Object.keys(formData).forEach(sectionId => {
        const section = formData[sectionId];
        console.log(`\n${section.trendName}:`);
        
        if (sectionId === 'introduction') {
          const introSection = section as IntroductionSection;
          console.log(`- Insights: ${introSection.insights}`);
        } else {
          const trendSection = section as TrendSection;
          trendSection.questions.forEach((q, index) => {
            console.log(`- Question ${index + 1}: ${q.question}`);
            console.log(`  Impact: ${q.impact}`);
            console.log(`  Answer: ${q.answer}`);
          });
        }
      });
      
      setShowToast(true);
      setTimeout(() => {
        // Simulate redirect to dashboard
        console.log('Redirecting to /dashboard/trend');
        setShowToast(false);
      }, 2000);
    }
  };

  const updateQuestionData = (sectionId: string, questionIndex: number, field: keyof Question, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] as TrendSection),
        questions: (prev[sectionId] as TrendSection).questions.map((q, index) => 
          index === questionIndex ? { ...q, [field]: value } : q
        )
      }
    }));
  };

  const renderStepContent = (): JSX.Element => {
    const currentSection = trendSections[currentStep];
    
    if (currentSection.id === 'introduction') {
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Answering the following questions will provide valuable insights and enable you to develop a robust business strategy that takes into account the dynamic nature of the market.
            </h3>
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Not all trends and insights impact the future of your business equally. Some trends may be just noise, and some would significantly impact your industry. The feedback from your employees, customers, vendors, and suppliers will help you determine the trends you should integrate into your strategic direction.
              </p>
            </div>
          </div>
        </div>
      );
    }

    const section = formData[currentSection.id] as TrendSection;
    
    return (
      <div className="space-y-8">
        {section.questions.map((questionData, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-900 block">
                  {questionData.question}
                </label>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm text-gray-500 font-medium">Impact</span>
                <div className="flex gap-6">
                  {(['high', 'medium', 'low'] as const).map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`impact_${currentSection.id}_${index}`}
                        value={level}
                        checked={questionData.impact === level}
                        onChange={(e) => updateQuestionData(currentSection.id, index, 'impact', e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className={`text-sm font-medium capitalize ${
                        level === 'high' ? 'text-green-600' : 
                        level === 'medium' ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {level}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <textarea
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your response..."
              value={questionData.answer}
              onChange={(e) => updateQuestionData(currentSection.id, index, 'answer', e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Create New Trend Analysis</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Assess</span>
            <ChevronRight className="w-4 h-4" />
            <span>Trends</span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Scrollable */}
        <div className="w-80 bg-white border-r h-screen overflow-y-auto">
          <div className="p-6">
            <div className="space-y-2">
              {trendSections.map((section, index) => (
                <div
                  key={section.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    currentStep === index 
                      ? 'bg-blue-50 border-l-4 border-blue-500' 
                      : visitedSteps.has(index) || index === currentStep + 1
                      ? 'hover:bg-gray-50 cursor-pointer'
                      : 'opacity-60 cursor-not-allowed'
                  } ${section.id === 'onTheRadar' ? 'border-t pt-4 mt-4' : ''}`}
                  onClick={() => handleStepClick(index)}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isStepCompleted(index)
                      ? 'bg-green-100 text-green-700'
                      : currentStep === index
                      ? 'bg-blue-100 text-blue-700'
                      : visitedSteps.has(index)
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-gray-50 text-gray-400'
                  }`}>
                    {isStepCompleted(index) ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      section.number
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">{section.title}</div>
                    {section.id === 'onTheRadar' && (
                      <div className="text-xs text-gray-500 mt-1">Optional</div>
                    )}
                  </div>
                  {isStepCompleted(index) && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Sticky after margin */}
        <div className="flex-1 relative">
          <div className="ml-10 sticky top-0 h-screen overflow-y-auto">
            <div className="p-6 pb-20">
              <div className="max-w-4xl">
                {/* Current Step Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      isStepCompleted(currentStep)
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {isStepCompleted(currentStep) ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        trendSections[currentStep].number
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {trendSections[currentStep].title}
                      </h2>
                      {!trendSections[currentStep].mandatory && (
                        <span className="text-sm text-gray-500">Optional</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="fixed bottom-0 right-0 left-150 bg-white border-t p-6">
                  <div className="ml-10 max-w-4xl flex items-center justify-between">
                    <button
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className={`px-6 py-2 text-sm font-medium rounded-lg border transition-colors ${
                        currentStep === 0
                          ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                          : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>
                    
                    <div className="flex gap-3">
                      <button className="px-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        More Info
                      </button>
                      
                      {currentStep === trendSections.length - 1 ? (
                        <button
                          onClick={handleSubmit}
                          disabled={!trendSections.filter(s => s.mandatory && s.id !== 'introduction').every((s, i) => {
                            const sectionIndex = trendSections.findIndex(sec => sec.id === s.id);
                            return isStepCompleted(sectionIndex);
                          })}
                          className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                            trendSections.filter(s => s.mandatory && s.id !== 'introduction').every((s, i) => {
                              const sectionIndex = trendSections.findIndex(sec => sec.id === s.id);
                              return isStepCompleted(sectionIndex);
                            })
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Create Trend
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          className="px-6 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>Trend created successfully! Redirecting...</span>
        </div>
      )}
    </div>
  );
};

export default CreateTrendPage;





// 'use client';

// import React, { JSX, useState } from 'react';
// import { Check, ChevronRight } from 'lucide-react';
// // import { useCreateTrendMutation } from '@/store/api/trendsApi'; // Adjust the import path as necessary

// interface Question {
//   question: string;
//   impact: 'high' | 'medium' | 'low';
//   answer: string;
// }

// interface TrendSection {
//   trendName: string;
//   questions: Question[];
// }

// interface IntroductionSection {
//   trendName: string;
//   insights: string;
// }

// interface FormData {
//   introduction: IntroductionSection;
//   [key: string]: TrendSection | IntroductionSection;
// }

// interface TrendSectionConfig {
//   id: string;
//   title: string;
//   number: string;
//   mandatory: boolean;
// }

// const CreateTrendPage: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState<number>(0);
//   const [showToast, setShowToast] = useState<boolean>(false);
//   const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));
  
//   // RTK Query mutation hook - Destructure isLoading and rename it for clarity
// //   const [createTrendMutation, { isLoading: isCreatingTrend }] = useCreateTrendMutation();
  
//   // Form data state
//   const [formData, setFormData] = useState<FormData>({
//     introduction: {
//       trendName: 'Introduction',
//       insights: ''
//     },
//     customerInsights: {
//       trendName: 'Customer Insights',
//       questions: [
//         { question: 'What are the evolving needs and preferences of our target customers?', impact: 'high', answer: '' },
//         { question: 'How is customer behavior changing, and what factors are influencing these changes?', impact: 'high', answer: '' },
//         { question: 'Are there any unmet needs or pain points that we should address?', impact: 'high', answer: '' }
//       ]
//     },
//     competitorLandscape: {
//       trendName: 'Competitor Landscape',
//       questions: [
//         { question: 'How is the competitive landscape evolving in our industry?', impact: 'high', answer: '' },
//         { question: 'What new competitors or competitive threats are emerging?', impact: 'high', answer: '' },
//         { question: 'What strategies are competitors using that we should be aware of?', impact: 'high', answer: '' }
//       ]
//     },
//     technologicalAdvances: {
//       trendName: 'Technological Advances',
//       questions: [
//         { question: 'What technological innovations are disrupting our industry?', impact: 'high', answer: '' },
//         { question: 'How can we leverage emerging technologies to improve our offerings?', impact: 'high', answer: '' },
//         { question: 'What technology trends should we monitor for future opportunities?', impact: 'high', answer: '' }
//       ]
//     },
//     regulatoryFactors: {
//       trendName: 'Regulatory and Legal Factors',
//       questions: [
//         { question: 'What regulatory changes are affecting our industry?', impact: 'high', answer: '' },
//         { question: 'How do compliance requirements impact our business strategy?', impact: 'high', answer: '' },
//         { question: 'What legal trends should we prepare for in the coming years?', impact: 'high', answer: '' }
//       ]
//     },
//     economicConsiderations: {
//       trendName: 'Economic Considerations',
//       questions: [
//         { question: 'How are economic trends affecting our market and customers?', impact: 'high', answer: '' },
//         { question: 'What economic indicators should we monitor closely?', impact: 'high', answer: '' },
//         { question: 'How do economic cycles impact our business model?', impact: 'high', answer: '' }
//       ]
//     },
//     supplyChainLogistics: {
//       trendName: 'Supply Chain and Logistics',
//       questions: [
//         { question: 'What supply chain disruptions or changes are affecting our industry?', impact: 'high', answer: '' },
//         { question: 'How can we optimize our logistics and supply chain operations?', impact: 'high', answer: '' },
//         { question: 'What supply chain trends should we adapt to remain competitive?', impact: 'high', answer: '' }
//       ]
//     },
//     globalMarketTrends: {
//       trendName: 'Global Market Trends',
//       questions: [
//         { question: 'What global market trends are influencing our industry?', impact: 'high', answer: '' },
//         { question: 'How do international markets present opportunities or threats?', impact: 'high', answer: '' },
//         { question: 'What geopolitical factors should we consider in our strategy?', impact: 'high', answer: '' }
//       ]
//     },
//     environmentalSocialImpact: {
//       trendName: 'Environmental and Social Impact',
//       questions: [
//         { question: 'How are sustainability trends affecting customer expectations?', impact: 'high', answer: '' },
//         { question: 'What environmental regulations should we prepare for?', impact: 'high', answer: '' },
//         { question: 'How can we improve our social and environmental responsibility?', impact: 'high', answer: '' }
//       ]
//     },
//     collaborationPartnerships: {
//       trendName: 'Collaboration and Partnerships',
//       questions: [
//         { question: 'What partnership opportunities could enhance our competitive position?', impact: 'high', answer: '' },
//         { question: 'How are industry collaborations evolving?', impact: 'high', answer: '' },
//         { question: 'What strategic alliances should we consider for growth?', impact: 'high', answer: '' }
//       ]
//     },
//     scenariosRiskAssessment: {
//       trendName: 'Scenarios and Risk Assessment',
//       questions: [
//         { question: 'What are the most significant risks facing our business?', impact: 'high', answer: '' },
//         { question: 'How should we prepare for different market scenarios?', impact: 'high', answer: '' },
//         { question: 'What contingency plans should we develop for potential disruptions?', impact: 'high', answer: '' }
//       ]
//     },
//     emergingMarketsOpportunities: {
//       trendName: 'Emerging Markets and Opportunities',
//       questions: [
//         { question: 'What new markets or customer segments should we explore?', impact: 'high', answer: '' },
//         { question: 'How can we identify and capitalize on emerging opportunities?', impact: 'high', answer: '' },
//         { question: 'What trends suggest new revenue streams for our business?', impact: 'high', answer: '' }
//       ]
//     },
//     onTheRadar: {
//       trendName: 'On The Radar',
//       questions: [
//         { question: 'What early-stage trends should we monitor for future impact?', impact: 'medium', answer: '' },
//         { question: 'What weak signals might become significant trends?', impact: 'medium', answer: '' },
//         { question: 'What innovative ideas or concepts are worth exploring?', impact: 'medium', answer: '' }
//       ]
//     }
//   });

//   const trendSections: TrendSectionConfig[] = [
//     { id: 'introduction', title: 'Introduction', number: '01', mandatory: true },
//     { id: 'customerInsights', title: 'Customer Insights', number: '02', mandatory: true },
//     { id: 'competitorLandscape', title: 'Competitor Landscape', number: '03', mandatory: true },
//     { id: 'technologicalAdvances', title: 'Technological Advances', number: '04', mandatory: true },
//     { id: 'regulatoryFactors', title: 'Regulatory and Legal Factors', number: '05', mandatory: true },
//     { id: 'economicConsiderations', title: 'Economic Considerations', number: '06', mandatory: true },
//     { id: 'supplyChainLogistics', title: 'Supply Chain and Logistics', number: '07', mandatory: true },
//     { id: 'globalMarketTrends', title: 'Global Market Trends', number: '08', mandatory: true },
//     { id: 'environmentalSocialImpact', title: 'Environmental and Social Impact', number: '09', mandatory: true },
//     { id: 'collaborationPartnerships', title: 'Collaboration and Partnerships', number: '10', mandatory: true },
//     { id: 'scenariosRiskAssessment', title: 'Scenarios and Risk Assessment', number: '11', mandatory: true },
//     { id: 'emergingMarketsOpportunities', title: 'Emerging Markets and Opportunities', number: '12', mandatory: true },
//     { id: 'onTheRadar', title: 'On The Radar', number: '13', mandatory: false }
//   ];

//   const isStepCompleted = (stepIndex: number): boolean => {
//     const section = trendSections[stepIndex];
    
//     // Introduction is completed once user moves to next step
//     if (section.id === 'introduction') {
//       return visitedSteps.has(stepIndex) && currentStep > 0;
//     }
    
//     // For other sections, check if at least one question has an answer
//     const sectionData = formData[section.id] as TrendSection;
//     return sectionData.questions.some(q => q.answer.trim() !== '');
//   };

//   const canProceedToNext = (): boolean => {
//     const currentSection = trendSections[currentStep];
//     if (currentSection.id === 'introduction') {
//       return true; // Can always proceed from introduction
//     }
//     if (currentSection.mandatory) {
//       return isStepCompleted(currentStep);
//     }
//     return true;
//   };

//   const handleNext = (): void => {
//     if (currentStep < trendSections.length - 1 && canProceedToNext()) {
//       const newStep = currentStep + 1;
//       setCurrentStep(newStep);
//       setVisitedSteps(prev => new Set([...prev, newStep]));
//     }
//   };

//   const handlePrevious = (): void => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleStepClick = (stepIndex: number): void => {
//     // Allow clicking on visited steps or the next immediate step
//     if (visitedSteps.has(stepIndex) || stepIndex === currentStep + 1) {
//       setCurrentStep(stepIndex);
//       setVisitedSteps(prev => new Set([...prev, stepIndex]));
//     }
//   };

//   const handleSubmit = async (): Promise<void> => {
//     // Check if all mandatory fields are completed
//     const mandatorySections = trendSections.filter(section => section.mandatory && section.id !== 'introduction');
//     const allMandatoryCompleted = mandatorySections.every((section) => {
//       const sectionIndex = trendSections.findIndex(s => s.id === section.id);
//       return isStepCompleted(sectionIndex);
//     });
    
//     if (!allMandatoryCompleted) {
//       alert('Please complete all mandatory sections before submitting.');
//       return;
//     }
    
//     // Prepare API payload
//     const apiPayload = {
//       trendAnalysis: {
//         createdAt: new Date().toISOString(),
//         status: 'draft',
//         sections: {} as { [key: string]: any },
//         summary: {} as any
//       }
//     };
    
//     // Transform form data to API format
//     Object.keys(formData).forEach(sectionId => {
//       const section = formData[sectionId];
      
//       if (sectionId === 'introduction') {
//         const introSection = section as IntroductionSection;
//         apiPayload.trendAnalysis.sections[sectionId] = {
//           name: introSection.trendName,
//           type: 'introduction',
//           insights: introSection.insights,
//           completed: true
//         };
//       } else {
//         const trendSection = section as TrendSection;
//         const processedQuestions = trendSection.questions.map((q, index) => ({
//           id: `${sectionId}_q${index + 1}`,
//           question: q.question,
//           impact: q.impact,
//           answer: q.answer,
//           hasAnswer: q.answer.trim() !== ''
//         }));
        
//         apiPayload.trendAnalysis.sections[sectionId] = {
//           name: trendSection.trendName,
//           type: 'trend_section',
//           questions: processedQuestions,
//           completed: processedQuestions.some(q => q.hasAnswer),
//           answeredQuestions: processedQuestions.filter(q => q.hasAnswer).length,
//           totalQuestions: processedQuestions.length
//         };
//       }
//     });
    
//     // Add summary
//     const totalSections = Object.keys(apiPayload.trendAnalysis.sections).length;
//     const completedSections = Object.values(apiPayload.trendAnalysis.sections)
//       .filter((s: any) => s.completed).length;
//     const totalQuestions = Object.values(apiPayload.trendAnalysis.sections)
//       .filter((s: any) => s.type === 'trend_section')
//       .reduce((sum: number, s: any) => sum + s.totalQuestions, 0);
//     const answeredQuestions = Object.values(apiPayload.trendAnalysis.sections)
//       .filter((s: any) => s.type === 'trend_section')
//       .reduce((sum: number, s: any) => sum + s.answeredQuestions, 0);
    
//     apiPayload.trendAnalysis.summary = {
//       totalSections,
//       completedSections,
//       totalQuestions,
//       answeredQuestions,
//       completionPercentage: totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0
//     };
    
//     console.log('API Payload:', JSON.stringify(apiPayload, null, 2)); // Pretty print for better readability
    
//     try {
//       // Await the mutation and unwrap the result for proper error handling
//       const unwrappedResult = await createTrendMutation(apiPayload).unwrap();
      
//       console.log('Success Response:', unwrappedResult);
      
//       setShowToast(true);
//       setTimeout(() => {
//         setShowToast(false);
//         // Optionally redirect the user after success
//         // router.push('/trends'); 
//       }, 2000);
      
//     } catch (error) {
//       console.error('Failed to create trend analysis:', error);
//       alert('Failed to create trend analysis. Please check the console for details.');
//     }
//   };

//   const updateQuestionData = (sectionId: string, questionIndex: number, field: keyof Question, value: string): void => {
//     setFormData(prev => ({
//       ...prev,
//       [sectionId]: {
//         ...(prev[sectionId] as TrendSection),
//         questions: (prev[sectionId] as TrendSection).questions.map((q, index) => 
//           index === questionIndex ? { ...q, [field]: value } : q
//         )
//       }
//     }));
//   };

//   const renderStepContent = (): JSX.Element => {
//     const currentSection = trendSections[currentStep];
    
//     if (currentSection.id === 'introduction') {
//       return (
//         <div className="space-y-6">
//           <div className="bg-blue-50 p-6 rounded-lg">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">
//               Answering the following questions will provide valuable insights and enable you to develop a robust business strategy that takes into account the dynamic nature of the market.
//             </h3>
//             <div className="bg-blue-100 p-4 rounded-lg">
//               <p className="text-sm text-blue-800">
//                 <strong>Note:</strong> Not all trends and insights impact the future of your business equally. Some trends may be just noise, and some would significantly impact your industry. The feedback from your employees, customers, vendors, and suppliers will help you determine the trends you should integrate into your strategic direction.
//               </p>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     const section = formData[currentSection.id] as TrendSection;
    
//     return (
//       <div className="space-y-8">
//         {section.questions.map((questionData, index) => (
//           <div key={index} className="space-y-4">
//             <div className="flex items-start gap-6">
//               <div className="flex-1">
//                 <label className="text-sm font-medium text-gray-900 block">
//                   {questionData.question}
//                 </label>
//               </div>
//               <div className="flex items-center gap-6">
//                 <span className="text-sm text-gray-500 font-medium">Impact</span>
//                 <div className="flex gap-6">
//                   {(['high', 'medium', 'low'] as const).map((level) => (
//                     <label key={level} className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name={`impact_${currentSection.id}_${index}`}
//                         value={level}
//                         checked={questionData.impact === level}
//                         onChange={(e) => updateQuestionData(currentSection.id, index, 'impact', e.target.value as 'high' | 'medium' | 'low')}
//                         className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                       />
//                       <span className={`text-sm font-medium capitalize ${
//                         level === 'high' ? 'text-green-600' : 
//                         level === 'medium' ? 'text-yellow-600' : 
//                         'text-red-600'
//                       }`}>
//                         {level}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <textarea
//               className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//               placeholder="Enter your response..."
//               value={questionData.answer}
//               onChange={(e) => updateQuestionData(currentSection.id, index, 'answer', e.target.value)}
//             />
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b px-6 py-4">
//         <div className="flex items-center justify-between">
//           <h1 className="text-xl font-semibold text-gray-900">Create New Trend Analysis</h1>
//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <span>Assess</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Trends</span>
//           </div>
//         </div>
//       </div>

//       <div className="flex">
//         {/* Left Sidebar - Scrollable */}
//         <div className="w-80 bg-white border-r h-screen overflow-y-auto">
//           <div className="p-6">
//             <div className="space-y-2">
//               {trendSections.map((section, index) => (
//                 <div
//                   key={section.id}
//                   className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
//                     currentStep === index 
//                       ? 'bg-blue-50 border-l-4 border-blue-500' 
//                       : visitedSteps.has(index) || index === currentStep + 1
//                       ? 'hover:bg-gray-50 cursor-pointer'
//                       : 'opacity-60 cursor-not-allowed'
//                   } ${section.id === 'onTheRadar' ? 'border-t pt-4 mt-4' : ''}`}
//                   onClick={() => handleStepClick(index)}
//                 >
//                   <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                     isStepCompleted(index)
//                       ? 'bg-green-100 text-green-700'
//                       : currentStep === index
//                       ? 'bg-blue-100 text-blue-700'
//                       : visitedSteps.has(index)
//                       ? 'bg-gray-100 text-gray-600'
//                       : 'bg-gray-50 text-gray-400'
//                   }`}>
//                     {isStepCompleted(index) ? (
//                       <Check className="w-4 h-4" />
//                     ) : (
//                       section.number
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <div className="font-medium text-sm text-gray-900">{section.title}</div>
//                     {section.id === 'onTheRadar' && (
//                       <div className="text-xs text-gray-500 mt-1">Optional</div>
//                     )}
//                   </div>
//                   {isStepCompleted(index) && (
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Content - Sticky after margin */}
//         <div className="flex-1 relative">
//           <div className="ml-10 sticky top-0 h-screen overflow-y-auto">
//             <div className="p-6 pb-20">
//               <div className="max-w-4xl">
//                 {/* Current Step Header */}
//                 <div className="mb-8">
//                   <div className="flex items-center gap-4 mb-2">
//                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
//                       isStepCompleted(currentStep)
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-blue-100 text-blue-700'
//                     }`}>
//                       {isStepCompleted(currentStep) ? (
//                         <Check className="w-5 h-5" />
//                       ) : (
//                         trendSections[currentStep].number
//                       )}
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-semibold text-gray-900">
//                         {trendSections[currentStep].title}
//                       </h2>
//                       {!trendSections[currentStep].mandatory && (
//                         <span className="text-sm text-gray-500">Optional</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Step Content */}
//                 {renderStepContent()}

//                 {/* Navigation Buttons */}
//                 <div className="fixed bottom-0 right-0 left-80 bg-white border-t p-6">
//                   <div className="ml-10 max-w-4xl flex items-center justify-between">
//                     <button
//                       onClick={handlePrevious}
//                       disabled={currentStep === 0}
//                       className={`px-6 py-2 text-sm font-medium rounded-lg border transition-colors ${
//                         currentStep === 0
//                           ? 'text-gray-400 border-gray-200 cursor-not-allowed'
//                           : 'text-gray-700 border-gray-300 hover:bg-gray-50'
//                       }`}
//                     >
//                       Previous
//                     </button>
                    
//                     <div className="flex gap-3">
//                       <button className="px-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//                         More Info
//                       </button>
                      
//                       {currentStep === trendSections.length - 1 ? (
//                         <button
//                           onClick={handleSubmit}
//                           // Disable if creating trend or not all mandatory sections are completed
//                           disabled={isCreatingTrend || !allMandatoryCompleted} 
//                           className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
//                             (isCreatingTrend || !allMandatoryCompleted)
//                               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                               : 'bg-blue-600 text-white hover:bg-blue-700'
//                           }`}
//                         >
//                           {isCreatingTrend ? (
//                             <>
//                               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                               Creating...
//                             </>
//                           ) : (
//                             'Create Trend'
//                           )}
//                         </button>
//                       ) : (
//                         <button
//                           onClick={handleNext}
//                           className="px-6 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
//                         >
//                           Next
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Success Toast */}
//       {showToast && (
//         <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
//           <Check className="w-5 h-5" />
//           <span>Trend created successfully! Redirecting...</span>
//         </div>
//       )}
      
//     </div>
//   );
// };

// export default CreateTrendPage;