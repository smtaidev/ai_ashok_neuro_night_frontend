






// 'use client';

// import React, { JSX, useState, useEffect } from 'react';
// import { Check, ChevronRight } from 'lucide-react';
// import { useCreateTrendMutation, useGetTrendsQuery } from '@/redux/api/trend/trendApi';

// // API Types based on your backend structure
// interface TrendDetail {
//   question: string;
//   answer: string;
//   impactLevel: 'High' | 'Medium' | 'Low';
// }

// interface Trend {
//   trendName: string;
//   trendDetails: TrendDetail[];
// }

// // Form Types - Updated to match API structure
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
// }

// const CreateTrendPage: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState<number>(0);
//   const [showToast, setShowToast] = useState<boolean>(false);
//   const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [createTrend] = useCreateTrendMutation();
//   const { data } = useGetTrendsQuery();
//   console.log('Fetched trends:', data);

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
//     { id: 'introduction', title: 'Introduction', number: '01' },
//     { id: 'customerInsights', title: 'Customer Insights', number: '02' },
//     { id: 'competitorLandscape', title: 'Competitor Landscape', number: '03' },
//     { id: 'technologicalAdvances', title: 'Technological Advances', number: '04' },
//     { id: 'regulatoryFactors', title: 'Regulatory and Legal Factors', number: '05' },
//     { id: 'economicConsiderations', title: 'Economic Considerations', number: '06' },
//     { id: 'supplyChainLogistics', title: 'Supply Chain and Logistics', number: '07' },
//     { id: 'globalMarketTrends', title: 'Global Market Trends', number: '08' },
//     { id: 'environmentalSocialImpact', title: 'Environmental and Social Impact', number: '09' },
//     { id: 'collaborationPartnerships', title: 'Collaboration and Partnerships', number: '10' },
//     { id: 'scenariosRiskAssessment', title: 'Scenarios and Risk Assessment', number: '11' },
//     { id: 'emergingMarketsOpportunities', title: 'Emerging Markets and Opportunities', number: '12' },
//     { id: 'onTheRadar', title: 'On The Radar', number: '13' }
//   ];

//   useEffect(() => {
//     if (data?.trends) {
//       const newFormData = { ...formData };
//       data.trends.forEach((trend: Trend) => {
//         const sectionEntry = Object.entries(newFormData).find(([id, sec]) => 
//           id !== 'introduction' && 'trendName' in sec && sec.trendName === trend.trendName
//         );
//         if (sectionEntry) {
//           const [sectionId, section] = sectionEntry;
//           if ('questions' in section && Array.isArray(section.questions)) {
//             const updatedQuestions = section.questions.map((q) => {
//               const detail = trend.trendDetails.find(d => d.question === q.question);
//               if (detail) {
//                 return {
//                   ...q,
//                   answer: detail.answer,
//                   impact: detail.impactLevel.toLowerCase() as 'high' | 'medium' | 'low'
//                 };
//               }
//               return q;
//             });
//             newFormData[sectionId] = { ...section, questions: updatedQuestions };
//           }
//         }
//       });
//       setFormData(newFormData);
//     }
//   }, [data]);

//   const existingTrendNames = new Set((data?.trends || []).map((t: Trend) => t.trendName));

//   // Helper function to convert form impact to API impact format
//   const convertImpactLevel = (impact: 'high' | 'medium' | 'low'): 'High' | 'Medium' | 'Low' => {
//     return impact.charAt(0).toUpperCase() + impact.slice(1) as 'High' | 'Medium' | 'Low';
//   };

//   // Fixed helper function to prepare API data
//   const prepareApiData = (): Trend[] => {
//     const trends: Trend[] = [];

//     // Process all sections except introduction
//     Object.keys(formData).forEach(sectionId => {
//       if (sectionId === 'introduction') return;
      
//       const section = formData[sectionId];
      
//       // Type guard to ensure we're working with TrendSection
//       if ('questions' in section && Array.isArray(section.questions)) {
//         const trendSection = section as TrendSection;
        
//         // Skip if already existing
//         if (existingTrendNames.has(trendSection.trendName)) return;

//         // Create trend details for all questions
//         const trendDetails: TrendDetail[] = trendSection.questions
//           .map(q => ({
//             question: q.question,
//             answer: q.answer.trim(),
//             impactLevel: convertImpactLevel(q.impact)
//           }));

//         // Only add the trend if all questions have answers
//         if (trendDetails.every(d => d.answer !== '')) {
//           trends.push({
//             trendName: trendSection.trendName,
//             trendDetails
//           });
//         }
//       }
//     });

//     console.log('Prepared API data:', trends);
//     return trends;
//   };

//   const isStepCompleted = (stepIndex: number): boolean => {
//     const section = trendSections[stepIndex];
    
//     // Introduction is completed once user moves to next step
//     if (section.id === 'introduction') {
//       return visitedSteps.has(stepIndex) && currentStep > 0;
//     }
    
//     // For other sections, check if existing or all questions have an answer
//     const sectionData = formData[section.id];
//     if ('questions' in sectionData && Array.isArray(sectionData.questions)) {
//       return existingTrendNames.has((sectionData as TrendSection).trendName) || sectionData.questions.every(q => q.answer.trim() !== '');
//     }
//     return false;
//   };

//   // Get count of answered questions in a section
//   const getAnsweredQuestionsCount = (sectionId: string): number => {
//     if (sectionId === 'introduction') return 0;
//     const section = formData[sectionId];
//     if ('questions' in section && Array.isArray(section.questions)) {
//       return section.questions.filter(q => q.answer.trim() !== '').length;
//     }
//     return 0;
//   };

//   // Get total questions count in a section
//   const getTotalQuestionsCount = (sectionId: string): number => {
//     if (sectionId === 'introduction') return 0;
//     const section = formData[sectionId];
//     if ('questions' in section && Array.isArray(section.questions)) {
//       return section.questions.length;
//     }
//     return 0;
//   };

//   // Check if user can submit (at least one section with answers)
//   const canSubmit = (): boolean => {
//     const apiData = prepareApiData();
//     return apiData.length > 0;
//   };

//   const handleNext = (): void => {
//     if (currentStep < trendSections.length - 1) {
//       if (currentStep > 0) {
//         const sectionId = trendSections[currentStep].id;
//         const answeredCount = getAnsweredQuestionsCount(sectionId);
//         const totalCount = getTotalQuestionsCount(sectionId);
//         if (answeredCount > 0 && answeredCount < totalCount) {
//           alert('Please answer all questions in this section before proceeding.');
//           return;
//         }
//       }
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
//     // Allow clicking on any step
//     setCurrentStep(stepIndex);
//     setVisitedSteps(prev => new Set([...prev, stepIndex]));
//   };

//   const handleSubmit = async (): Promise<void> => {
//     if (!canSubmit()) {
//       alert('Please answer at least one question in any section before submitting.');
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       const apiData = prepareApiData();
      
//       // Debug: Log what we're sending
//       console.log('=== FRONTEND DEBUG ===');
//       console.log('Submitting trend data:', apiData);
//       console.log('Trends count:', apiData.length);
//       console.log('First trend details count:', apiData[0]?.trendDetails?.length);
//       console.log('Sample trend detail:', apiData[0]?.trendDetails[0]);
//       console.log('API endpoint will be called: PATCH /assess/create-trend');
//       console.log('=====================');
      
//       const response = await createTrend(apiData).unwrap();
      
//       // Debug: Log what we received back
//       console.log('=== RESPONSE DEBUG ===');
//       console.log('API Response:', response);
//       console.log('Returned trends count:', response.data.trends?.length);
//       console.log('First returned trend details count:', response.data.trends[0]?.trendDetails?.length);
//       console.log('=====================');
      
//       if (response.success) {
//         setShowToast(true);
        
//         // Show success message and redirect after delay
//         setTimeout(() => {
//           console.log('Trend updated successfully');
//           setShowToast(false);
//           // In real app: router.push('/dashboard/trends');
//         }, 2000);
//       } else {
//         throw new Error(response.message || 'Failed to update trend');
//       }
//     } catch (error) {
//       console.error('Error updating trend:', error);
//       // Show error toast or handle error appropriately
//       alert('Failed to update trend. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Fixed update function with proper typing and state management
//   const updateQuestionData = (sectionId: string, questionIndex: number, field: keyof Question, value: string): void => {
//     const section = formData[sectionId];
//     if ('trendName' in section && existingTrendNames.has(section.trendName)) {
//       return; // Do not update if section is disabled (existing)
//     }

//     setFormData(prev => {
//       const section = prev[sectionId];
      
//       // Ensure we're working with a TrendSection
//       if ('questions' in section && Array.isArray(section.questions)) {
//         const updatedQuestions = section.questions.map((q, index) => 
//           index === questionIndex ? { ...q, [field]: value } : q
//         );
        
//         return {
//           ...prev,
//           [sectionId]: {
//             ...section,
//             questions: updatedQuestions
//           }
//         };
//       }
      
//       return prev;
//     });
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
//             <div className="bg-blue-100 p-4 rounded-lg mb-4">
//               <p className="text-sm text-blue-800">
//                 <strong>Note:</strong> Not all trends and insights impact the future of your business equally. Some trends may be just noise, and some would significantly impact your industry. The feedback from your employees, customers, vendors, and suppliers will help you determine the trends you should integrate into your strategic direction.
//               </p>
//             </div>
//             <div className="bg-green-50 p-4 rounded-lg border border-green-200">
//               <p className="text-sm text-green-800">
//                 <strong>Flexible Approach:</strong> You can fill out any sections you want (4, 7, 9, or all 12 sections). There are no mandatory fields - complete what&#39;s relevant for your business now and update the rest later.
//               </p>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     const section = formData[currentSection.id];
    
//     // Type guard to ensure we have a TrendSection
//     if (!('questions' in section) || !Array.isArray(section.questions)) {
//       return <div>Error: Invalid section data</div>;
//     }
    
//     const trendSection = section as TrendSection;
//     const isSectionDisabled = existingTrendNames.has(trendSection.trendName);
    
//     return (
//       <div className="space-y-8">
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="text-sm text-gray-600">
//             <strong>Section:</strong> Please answer all questions that are most relevant to your business.
//           </p>
//         </div>
        
//         {trendSection.questions.map((questionData, index) => (
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
//                         onChange={(e) => updateQuestionData(currentSection.id, index, 'impact', e.target.value)}
//                         className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                         disabled={isSectionDisabled}
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
//               className={`w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
//                 isSectionDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
//               }`}
//               placeholder="Enter your response..."
//               value={questionData.answer}
//               onChange={(e) => updateQuestionData(currentSection.id, index, 'answer', e.target.value)}
//               readOnly={isSectionDisabled}
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
//             <div className="mb-4 p-3 bg-blue-50 rounded-lg">
//               <p className="text-xs text-blue-700">
//                 <strong>Flexible form:</strong> Fill any sections you want. No mandatory fields.
//               </p>
//             </div>
            
//             <div className="space-y-2">
//               {trendSections.map((section, index) => {
//                 const answeredCount = getAnsweredQuestionsCount(section.id);
//                 const totalCount = getTotalQuestionsCount(section.id);
                
//                 return (
//                   <div
//                     key={section.id}
//                     className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
//                       currentStep === index 
//                         ? 'bg-blue-50 border-l-4 border-blue-500' 
//                         : 'hover:bg-gray-50'
//                     }`}
//                     onClick={() => handleStepClick(index)}
//                   >
//                     <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                       isStepCompleted(index)
//                         ? 'bg-green-100 text-green-700'
//                         : currentStep === index
//                         ? 'bg-blue-100 text-blue-700'
//                         : visitedSteps.has(index)
//                         ? 'bg-gray-100 text-gray-600'
//                         : 'bg-gray-50 text-gray-400'
//                     }`}>
//                       {isStepCompleted(index) ? (
//                         <Check className="w-4 h-4" />
//                       ) : (
//                         section.number
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <div className="font-medium text-sm text-gray-900">{section.title}</div>
//                       {section.id !== 'introduction' && (
//                         <div className="text-xs text-gray-500 mt-1">
//                           {answeredCount}/{totalCount} answered
//                         </div>
//                       )}
//                     </div>
//                     {isStepCompleted(index) && (
//                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     )}
//                   </div>
//                 );
//               })}
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
//                       <span className="text-sm text-gray-500">Optional - Fill what&#39;s relevant for your business</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Step Content */}
//                 {renderStepContent()}

//                 {/* Navigation Buttons */}
//                 <div className="fixed bottom-0 right-0 left-[600px] bg-white border-t p-6">
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
//                           disabled={isSubmitting || !canSubmit()}
//                           className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
//                             (isSubmitting || !canSubmit())
//                               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                               : 'bg-blue-600 text-white hover:bg-blue-700'
//                           }`}
//                         >
//                           {isSubmitting ? (
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
//                           className="px-6 py-2 text-sm font-medium rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-700"
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






// 'use client';

// import React, { JSX, useState, useEffect } from 'react';
// import { Check, ChevronRight, Lock, Users } from 'lucide-react';
// import { useCreateTrendMutation, useGetTrendsQuery } from '@/redux/api/trend/trendApi';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';


// // API Types based on your backend structure
// interface TrendDetail {
//   question: string;
//   answer: string;
//   impactLevel: string; // 'High' | 'Medium' | 'Low'
//   createdBy?: string;
//   createdAt?: string;
//   _id?: string;
// }

// interface Trend {
//   trendName: string;
//   trendDetails: TrendDetail[];
//   isCompleted?: boolean;
//   completedBy?: string;
//   completedAt?: string;
//   _id?: string;
// }

// // Form Types - Updated to match API structure
// interface Question {
//   question: string;
//   impact: string; // 'high' | 'medium' | 'low'
//   answer: string;
// }

// interface TrendSection {
//   trendName: string;
//   questions: Question[];
//   isCompleted?: boolean;
//   completedBy?: string;
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
// }

// const CreateTrendPage: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState<number>(0);
//   const [showToast, setShowToast] = useState<boolean>(false);
//   const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [createTrend] = useCreateTrendMutation();
//   const { data, isLoading, error } = useGetTrendsQuery();

//   if (isLoading) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }
//   if (error) {
//     return <div className="flex items-center justify-center h-screen text-red-500">Error loading data.</div>;
//   }

//   const router = useRouter();

//   // Track completed trends by different users
//   const [completedTrends, setCompletedTrends] = useState<Set<string>>(new Set());
//   const [trendCompletionInfo, setTrendCompletionInfo] = useState<Map<string, { completedBy: string, completedAt: string }>>(new Map());

//   // Debug logs
//   console.log('=== API DATA DEBUG ===');
//   console.log('Full API response:', data);
//   console.log('Is loading:', isLoading);
//   console.log('Error:', error);
//   console.log('data?.data:', data?.data);
  
//   console.log('=====================');

//   // Form data state
//   const [formData, setFormData] = useState<FormData>({
//     introduction: {
//       trendName: 'Introduction',
//       insights: ''
//     },
//     customerInsights: {
//       trendName: 'Customer Insights',
//       questions: [
//         { question: 'What are the evolving needs and preferences of our target customers?', impact: '', answer: '' },
//         { question: 'How is customer behavior changing, and what factors are influencing these changes?', impact: '', answer: '' },
//         { question: 'Are there any unmet needs or pain points that we should address?', impact: '', answer: '' }
//       ],
//       isCompleted: false
//     },
//     competitorLandscape: {
//       trendName: 'Competitor Landscape',
//       questions: [
//         { question: 'Who are our main competitors, and what are their strengths and weaknesses?', impact: '', answer: '' },
//         { question: 'Have there been any notable changes in competitor strategies or offerings?', impact: '', answer: '' },
//         { question: 'How do we differentiate ourselves from competitors, and is this differentiation still relevant?', impact: '', answer: '' },
//         { question: 'Are there any emerging competitors that we should be aware of?', impact: '', answer: '' }
//       ],
//       isCompleted: false
//     },
//     technologicalAdvances: {
//       trendName: 'Technological Advances',
//       questions: [
//         { question: 'How is technology shaping the industry, and are there new technologies we should leverage?', impact: '', answer: '' },
//         { question: 'Are there any technological disruptions that could impact our business model?', impact: '', answer: '' },
//       ],
//       isCompleted: false
//     },
//     regulatoryFactors: {
//       trendName: 'Regulatory and Legal Factors',
//       questions: [
//         { question: 'Are there any upcoming regulatory changes that could impact our industry?', impact: '', answer: '' },
//         { question: 'How do current regulations affect our business, and are there any compliance challenges?', impact: '', answer: '' },
//       ],
//       isCompleted: false
//     },
//     economicConsiderations: {
//       trendName: 'Economic Considerations',
//       questions: [
//         { question: 'How is the economic environment (e.g., inflation, interest rates) affecting consumer spending and industry growth?', impact: '', answer: '' },
//         { question: 'Are there any economic indicators that suggest potential challenges or opportunities?', impact: '', answer: '' },
//       ],
//       isCompleted: false
//     },
//     supplyChainLogistics: {
//       trendName: 'Supply Chain and Logistics',
//       questions: [
//         { question: 'Are there any vulnerabilities or disruptions in our supply chain?', impact: '', answer: '' },
//         { question: 'How are logistics and distribution channels evolving, and how does this impact our operations?', impact: '', answer: '' },
//       ],
//       isCompleted: false
//     },
//     globalMarketTrends: {
//       trendName: 'Global Market Trends',
//       questions: [
//         { question: 'How are global trends influencing our industry or market segment?', impact: '', answer: '' },
//         { question: 'Are there international markets with significant growth potential or risks?', impact: '', answer: '' },
//       ],
//       isCompleted: false
//     },
//     environmentalSocialImpact: {
//       trendName: 'Environmental and Social Impact',
//       questions: [
//         { question: 'How are environmental and social considerations affecting consumer behavior and industry trends?', impact: '', answer: '' },
//         { question: 'Are there emerging sustainability trends that could impact our business?', impact: '', answer: '' },
//       ],
//       isCompleted: false
//     },
//     collaborationPartnerships: {
//       trendName: 'Collaboration and Partnerships',
//       questions: [
//         { question: 'Are there potential collaboration opportunities with other businesses or partners in the ecosystem?', impact: '', answer: '' },
//         { question: 'How can partnerships help us stay agile and respond to market shifts?', impact: '', answer: '' },
//       ],
//       isCompleted: false
//     },
//     scenariosRiskAssessment: {
//       trendName: 'Scenarios and Risk Assessment',
//       questions: [
//         { question: 'What are the most significant risks and uncertainties in the market?', impact: '', answer: '' },
//         { question: 'How well-prepared are we to adapt to different scenarios and potential disruptions?', impact: '', answer: '' },
//       ],
//       isCompleted: false
//     },
//     emergingMarketsOpportunities: {
//       trendName: 'Emerging Markets and Opportunities',
//       questions: [
//         { question: 'Are there untapped markets or demographic segments we should explore?', impact: '', answer: '' },
//         { question: 'What emerging trends could open up new business opportunities for us?', impact: '', answer: '' },
//       ],
//       isCompleted: false
//     },
//     onTheRadar: {
//       trendName: 'On The Radar',
//       questions: [
//         { question: 'Please enter any emerging trends that are currently not apparent, but you would like to monitor as early warnings to prepare your company for them when the time is right', impact: '', answer: '' },
//       ],
//       isCompleted: false
//     }
//   });

//   const trendSections: TrendSectionConfig[] = [
//     { id: 'introduction', title: 'Introduction', number: '01' },
//     { id: 'customerInsights', title: 'Customer Insights', number: '02' },
//     { id: 'competitorLandscape', title: 'Competitor Landscape', number: '03' },
//     { id: 'technologicalAdvances', title: 'Technological Advances', number: '04' },
//     { id: 'regulatoryFactors', title: 'Regulatory and Legal Factors', number: '05' },
//     { id: 'economicConsiderations', title: 'Economic Considerations', number: '06' },
//     { id: 'supplyChainLogistics', title: 'Supply Chain and Logistics', number: '07' },
//     { id: 'globalMarketTrends', title: 'Global Market Trends', number: '08' },
//     { id: 'environmentalSocialImpact', title: 'Environmental and Social Impact', number: '09' },
//     { id: 'collaborationPartnerships', title: 'Collaboration and Partnerships', number: '10' },
//     { id: 'scenariosRiskAssessment', title: 'Scenarios and Risk Assessment', number: '11' },
//     { id: 'emergingMarketsOpportunities', title: 'Emerging Markets and Opportunities', number: '12' },
//     { id: 'onTheRadar', title: 'On The Radar', number: '13' }
//   ];

//   // FIXED: Updated useEffect to handle correct API structure
//   useEffect(() => {
//     console.log('=== PROCESSING API DATA ===');
//     console.log('Raw API data:', data);
    
//     // Fix: Handle the correct API response structure
//     const trendsArray = data?.data || [];
//     console.log('Extracted trends array:', trendsArray);
//     console.log('Trends array length:', trendsArray.length);
    
//     if (trendsArray && trendsArray.length > 0) {
//       const newFormData = { ...formData };
//       const newCompletedTrends = new Set<string>();
//       const newCompletionInfo = new Map<string, { completedBy: string, completedAt: string }>();

//       trendsArray.forEach((trend: Trend, trendIndex: number) => {
//         console.log(`\n--- Processing Trend ${trendIndex + 1} ---`);
//         console.log('Trend name:', trend.trendName);
//         console.log('Trend details count:', trend.trendDetails?.length);
//         console.log('First detail:', trend.trendDetails?.[0]);
        
//         const sectionEntry = Object.entries(newFormData).find(([id, sec]) => 
//           id !== 'introduction' && 'trendName' in sec && sec.trendName === trend.trendName
//         );
        
//         if (sectionEntry) {
//           const [sectionId, section] = sectionEntry;
//           console.log(`Found matching section: ${sectionId} for trend: ${trend.trendName}`);
          
//           if ('questions' in section && Array.isArray(section.questions)) {
//             // Check if all questions in this trend are answered
//             const allQuestionsAnswered = trend.trendDetails && trend.trendDetails.length > 0 && 
//               trend.trendDetails.every(detail => detail.answer && detail.answer.trim() !== '');
            
//             console.log(`All questions answered for ${trend.trendName}:`, allQuestionsAnswered);
            
//             if (allQuestionsAnswered) {
//               newCompletedTrends.add(trend.trendName);
//               // Since API doesn't provide completion info, create default
//               newCompletionInfo.set(trend.trendName, {
//                 completedBy: trend.completedBy || 'Team Member',
//                 completedAt: trend.completedAt || new Date().toISOString()
//               });
//               console.log(`✅ Marked ${trend.trendName} as completed`);
//             }

//             // FIXED: Proper impact level conversion and question matching
//             const updatedQuestions = section.questions.map((q, qIndex) => {
//               const detail = trend.trendDetails?.find(d => d.question === q.question);
//               if (detail) {
//                 console.log(`  Updated Q${qIndex + 1}: ${q.question.substring(0, 50)}...`);
//                 console.log(`    Impact: ${detail.impactLevel} → ${detail.impactLevel.toLowerCase()}`);
//                 console.log(`    Answer: ${detail.answer.substring(0, 30)}...`);
                
//                 return {
//                   ...q,
//                   answer: detail.answer,
//                   // Fix: Convert 'High'/'Medium'/'Low' to 'high'/'medium'/'low'
//                   impact: detail.impactLevel.toLowerCase() as 'high' | 'medium' | 'low'
//                 };
//               }
//               return q;
//             });
            
//             newFormData[sectionId] = { 
//               ...section, 
//               questions: updatedQuestions,
//               isCompleted: allQuestionsAnswered,
//               completedBy: trend.completedBy || 'Team Member'
//             };
//           }
//         } else {
//           console.warn(`❌ No matching section found for trend: ${trend.trendName}`);
//           console.log('Available sections:', Object.keys(newFormData).filter(k => k !== 'introduction'));
//         }
//       });
      
//       console.log('\n=== FINAL RESULTS ===');
//       console.log('Completed trends:', Array.from(newCompletedTrends));
//       console.log('Completion info:', newCompletionInfo);
//       console.log('Updated sections:', Object.keys(newFormData).filter(k => k !== 'introduction'));
//       console.log('====================');
      
//       setFormData(newFormData);
//       setCompletedTrends(newCompletedTrends);
//       setTrendCompletionInfo(newCompletionInfo);
//     } else {
//       console.log('No trends data to process');
//     }
//   }, [data]);

//   // FIXED: Updated existing trends check
//   const existingTrendNames = new Set(
//     (data?.data || []).map((t: Trend) => t.trendName)
//   );

//   // Helper function to convert form impact to API impact format
//   function convertImpactLevel(level: string): "High" | "Medium" | "Low" {
//   switch (level.toLowerCase()) {
//     case "high":
//       return "High";
//     case "medium":
//       return "Medium";
//     case "low":
//       return "Low";
//     default:
//       throw new Error(`Invalid impact level: ${level}`);
//   }
// }


//   // FIXED: Check if a trend section is completed by any user
//   const isTrendCompleted = (sectionId: string): boolean => {
//     if (sectionId === 'introduction') return false;
//     const section = formData[sectionId];
//     if ('trendName' in section) {
//       const isCompleted = completedTrends.has(section.trendName);
//       console.log(`Checking completion for ${section.trendName}:`, isCompleted);
//       return isCompleted;
//     }
//     return false;
//   };

//   // FIXED: Get completion info for a trend
//   const getTrendCompletionInfo = (sectionId: string): { completedBy: string, completedAt: string } | null => {
//     if (sectionId === 'introduction') return null;
//     const section = formData[sectionId];
//     if ('trendName' in section) {
//       const info = trendCompletionInfo.get(section.trendName) || null;
//       console.log(`Getting completion info for ${section.trendName}:`, info);
//       return info;
//     }
//     return null;
//   };

//   // Fixed helper function to prepare API data
//   const prepareApiData = (): Trend[] => {
//     const trends: Trend[] = [];

//     // Process all sections except introduction
//     Object.keys(formData).forEach(sectionId => {
//       if (sectionId === 'introduction') return;
      
//       const section = formData[sectionId];
      
//       // Type guard to ensure we're working with TrendSection
//       if ('questions' in section && Array.isArray(section.questions)) {
//         const trendSection = section as TrendSection;
        
//         // Skip if already completed by someone else
//         if (isTrendCompleted(sectionId)) {
//           console.log(`Skipping ${trendSection.trendName} - already completed`);
//           return;
//         }

//         // Create trend details for all questions
//         const trendDetails: TrendDetail[] = trendSection.questions
//           .map(q => ({
//             question: q.question,
//             answer: q.answer.trim(),
//             impactLevel: convertImpactLevel(q.impact),
//             createdBy: 'Current User',
//             createdAt: new Date().toISOString()
//           }));

//         // Only add the trend if all questions have answers
//         if (trendDetails.every(d => d.answer !== '')) {
//           trends.push({
//             trendName: trendSection.trendName,
//             trendDetails,
//             isCompleted: true,
//             completedBy: 'Current User',
//             completedAt: new Date().toISOString()
//           });
//           console.log(`✅ Prepared ${trendSection.trendName} for submission`);
//         }
//       }
//     });

//     console.log('Prepared API data:', trends);
//     return trends;
//   };

//   const isStepCompleted = (stepIndex: number): boolean => {
//     const section = trendSections[stepIndex];
    
//     // Introduction is completed once user moves to next step
//     if (section.id === 'introduction') {
//       return visitedSteps.has(stepIndex) && currentStep > 0;
//     }
    
//     // Check if completed by any user
//     if (isTrendCompleted(section.id)) {
//       return true;
//     }
    
//     // For other sections, check if all questions have an answer
//     const sectionData = formData[section.id];
//     if ('questions' in sectionData && Array.isArray(sectionData.questions)) {
//       return sectionData.questions.every(q => q.answer.trim() !== '');
//     }
//     return false;
//   };

//   // Get count of answered questions in a section
//   const getAnsweredQuestionsCount = (sectionId: string): number => {
//     if (sectionId === 'introduction') return 0;
//     const section = formData[sectionId];
//     if ('questions' in section && Array.isArray(section.questions)) {
//       return section.questions.filter(q => q.answer.trim() !== '').length;
//     }
//     return 0;
//   };

//   // Get total questions count in a section
//   const getTotalQuestionsCount = (sectionId: string): number => {
//     if (sectionId === 'introduction') return 0;
//     const section = formData[sectionId];
//     if ('questions' in section && Array.isArray(section.questions)) {
//       return section.questions.length;
//     }
//     return 0;
//   };

//   // Check if user can submit (at least one section with answers that's not completed)
//   const canSubmit = (): boolean => {
//     const apiData = prepareApiData();
//     return apiData.length > 0;
//   };

//   // Get count of remaining trends to complete
//   const getRemainingTrendsCount = (): number => {
//     return trendSections.filter(section => 
//       section.id !== 'introduction' && !isTrendCompleted(section.id)
//     ).length;
//   };

//   // Get count of completed trends
//   const getCompletedTrendsCount = (): number => {
//     return trendSections.filter(section => 
//       section.id !== 'introduction' && isTrendCompleted(section.id)
//     ).length;
//   };

//   const handleNext = (): void => {
//     if (currentStep < trendSections.length - 1) {
//       if (currentStep > 0) {
//         const sectionId = trendSections[currentStep].id;
        
//         // Skip validation for completed trends
//         if (!isTrendCompleted(sectionId)) {
//           const answeredCount = getAnsweredQuestionsCount(sectionId);
//           const totalCount = getTotalQuestionsCount(sectionId);
//           if (answeredCount > 0 && answeredCount < totalCount) {
//             alert('Please answer all questions in this section before proceeding.');
//             return;
//           }
//         }
//       }
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
//     // Allow clicking on any step
//     setCurrentStep(stepIndex);
//     setVisitedSteps(prev => new Set([...prev, stepIndex]));
//   };

//   const handleSubmit = async (): Promise<void> => {
//     if (!canSubmit()) {
//       alert('Please answer at least one complete section that hasn\'t been completed by others before submitting.');
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       const apiData = prepareApiData();
      
//       // Debug: Log what we're sending
//       console.log('=== FRONTEND SUBMIT DEBUG ===');
//       console.log('Submitting trend data:', apiData);
//       console.log('Trends count:', apiData.length);
//       console.log('First trend details count:', apiData[0]?.trendDetails?.length);
//       console.log('Sample trend detail:', apiData[0]?.trendDetails[0]);
//       console.log('API endpoint will be called: PATCH /assess/create-trend');
//       console.log('===============================');
      
//       const response = await createTrend(apiData).unwrap();
      
//       // Debug: Log what we received back
//       console.log('=== SUBMIT RESPONSE DEBUG ===');
//       console.log('API Response:', response);
//       console.log('Returned trends count:', response.data?.trends?.length || response.data?.data?.length);
//       console.log('First returned trend details count:', response.data?.trends?.[0]?.trendDetails?.length || response.data?.data?.[0]?.trendDetails?.length);
//       console.log('==============================');
      
//       if (response.success) {
//         setShowToast(true);
        
//         // Show success message and redirect after delay
//         setTimeout(() => {
//           toast.success('Trend updated successfully');
//           router.push('/dashboard/assess/trends');
//           setShowToast(false);
//         }, 2000);
//       } else {
//         throw new Error(response.message || 'Failed to update trend');
//       }
//     } catch (error) {
//       console.error('Error updating trend:', error);
//       // Show error toast or handle error appropriately
//       alert('Failed to update trend. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Fixed update function with proper typing and state management
//   const updateQuestionData = (sectionId: string, questionIndex: number, field: keyof Question, value: string): void => {
//     // Prevent updates on completed trends
//     if (isTrendCompleted(sectionId)) {
//       console.log(`Blocked update to completed trend: ${sectionId}`);
//       return;
//     }

//     console.log(`Updating ${sectionId} question ${questionIndex} field ${field}:`, value);

//     setFormData(prev => {
//       const section = prev[sectionId];
      
//       // Ensure we're working with a TrendSection
//       if ('questions' in section && Array.isArray(section.questions)) {
//         const updatedQuestions = section.questions.map((q, index) => 
//           index === questionIndex ? { ...q, [field]: value } : q
//         );
        
//         return {
//           ...prev,
//           [sectionId]: {
//             ...section,
//             questions: updatedQuestions
//           }
//         };
//       }
      
//       return prev;
//     });
//   };

//   const renderStepContent = (): JSX.Element => {
//     const currentSection = trendSections[currentStep];
    
//     if (currentSection.id === 'introduction') {
//       const remainingCount = getRemainingTrendsCount();
//       const completedCount = getCompletedTrendsCount();
      
//       return (
//         <div className="space-y-6">
//           <div className="bg-blue-50 p-6 rounded-lg">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">
//               Answering the following questions will provide valuable insights and enable you to develop a robust business strategy that takes into account the dynamic nature of the market.
//             </h3>
            
//             {/* Multi-user progress indicator */}
//             <div className="bg-white p-4 rounded-lg mb-4 border border-blue-200">
//               <div className="flex items-center gap-4 mb-3">
//                 <Users className="w-5 h-5 text-blue-600" />
//                 <h4 className="font-medium text-gray-900">Team Progress</h4>
//               </div>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                   <span className="text-gray-700">Completed: <strong>{completedCount}</strong> sections</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
//                   <span className="text-gray-700">Remaining: <strong>{remainingCount}</strong> sections</span>
//                 </div>
//               </div>
//               {completedCount > 0 && (
//                 <div className="mt-3 pt-3 border-t border-gray-200">
//                   <p className="text-xs text-gray-600">
//                     ✨ Great teamwork! {completedCount} sections have been completed by your team members.
//                   </p>
//                 </div>
//               )}
//             </div>
            
//             <div className="bg-blue-100 p-4 rounded-lg mb-4">
//               <p className="text-sm text-blue-800">
//                 <strong>Multi-User Collaboration:</strong> Multiple team members (admin, team leaders) can work on different trend sections. Once a section is completed by someone, it will be marked as done and locked for editing.
//               </p>
//             </div>
            
//             <div className="bg-green-50 p-4 rounded-lg border border-green-200">
//               <p className="text-sm text-green-800">
//                 <strong>Flexible Approach:</strong> You can fill out any remaining sections (complete 1 section or all remaining sections). Completed sections are protected and show who completed them.
//               </p>
//             </div>

//             {/* Debug info */}
//             <div className="bg-gray-100 p-3 rounded text-xs mt-4">
//               <strong>Debug Info:</strong>
//               <div>API Data Loaded: {data ? 'Yes' : 'No'}</div>
//               <div>Total API Trends: {(data?.data || []).length}</div>
//               <div>Completed Trends: {Array.from(completedTrends).join(', ') || 'None'}</div>
//               <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     const section = formData[currentSection.id];
    
//     // Type guard to ensure we have a TrendSection
//     if (!('questions' in section) || !Array.isArray(section.questions)) {
//       return <div>Error: Invalid section data</div>;
//     }
    
//     const trendSection = section as TrendSection;
//     const isSectionCompleted = isTrendCompleted(currentSection.id);
//     const completionInfo = getTrendCompletionInfo(currentSection.id);
    
//     return (
//       <div className="space-y-8">
//         {/* Section status indicator */}
//         {isSectionCompleted && completionInfo ? (
//           <div className="bg-green-50 p-4 rounded-lg border border-green-200">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2">
//                 <Check className="w-5 h-5 text-green-600" />
//                 <Lock className="w-4 h-4 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-green-800">
//                   This section has been completed by <strong>{completionInfo.completedBy}</strong>
//                 </p>
//                 <p className="text-xs text-green-600 mt-1">
//                   Completed on {new Date(completionInfo.completedAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
//             <div className="flex items-center gap-3">
//               <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
//               <p className="text-sm text-orange-800">
//                 <strong>Available for completion:</strong> You can fill out this section and contribute to the team&#39;s progress.
//               </p>
//             </div>
//           </div>
//         )}
        
//         {trendSection.questions.map((questionData, index) => (
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
//                         onChange={(e) => updateQuestionData(currentSection.id, index, 'impact', e.target.value)}
//                         className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
//                         disabled={isSectionCompleted}
//                       />
//                       <span className={`text-sm font-medium capitalize ${
//                         level === 'high' ? 'text-green-600' : 
//                         level === 'medium' ? 'text-yellow-600' : 
//                         'text-red-600'
//                       } ${isSectionCompleted ? 'opacity-60' : ''}`}>
//                         {level}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="relative">
//               <textarea
//                 className={`w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
//                   isSectionCompleted ? 'bg-gray-50 cursor-not-allowed text-gray-600' : ''
//                 }`}
//                 placeholder={isSectionCompleted ? "This section has been completed by a team member..." : "Enter your response..."}
//                 value={questionData.answer}
//                 onChange={(e) => updateQuestionData(currentSection.id, index, 'answer', e.target.value)}
//                 readOnly={isSectionCompleted}
//               />
//               {isSectionCompleted && (
//                 <div className="absolute top-2 right-2">
//                   <Lock className="w-4 h-4 text-gray-400" />
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading trend data...</p>
//         </div>
//       </div>
//     );
//   }

//   // Show error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">Error loading trend data</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-xl font-semibold text-gray-900">Create New Trend Analysis</h1>
//             <p className="text-sm text-gray-600 mt-1">
//               Collaborative trend analysis • {getCompletedTrendsCount()} completed • {getRemainingTrendsCount()} remaining
//             </p>
//           </div>
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
//             <div className="mb-4 p-3 bg-blue-50 rounded-lg">
//               <p className="text-xs text-blue-700">
//                 <strong>Team Collaboration:</strong> Work on any available sections. Completed sections are locked.
//               </p>
//             </div>
            
//             <div className="space-y-2">
//               {trendSections.map((section, index) => {
//                 const answeredCount = getAnsweredQuestionsCount(section.id);
//                 const totalCount = getTotalQuestionsCount(section.id);
//                 const isSectionCompleted = isTrendCompleted(section.id);
//                 const completionInfo = getTrendCompletionInfo(section.id);
                
//                 return (
//                   <div
//                     key={section.id}
//                     className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
//                       currentStep === index 
//                         ? 'bg-blue-50 border-l-4 border-blue-500' 
//                         : 'hover:bg-gray-50'
//                     } ${isSectionCompleted ? 'bg-green-50' : ''}`}
//                     onClick={() => handleStepClick(index)}
//                   >
//                     <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium relative ${
//                       isSectionCompleted
//                         ? 'bg-green-100 text-green-700'
//                         : isStepCompleted(index)
//                         ? 'bg-green-100 text-green-700'
//                         : currentStep === index
//                         ? 'bg-blue-100 text-blue-700'
//                         : visitedSteps.has(index)
//                         ? 'bg-gray-100 text-gray-600'
//                         : 'bg-gray-50 text-gray-400'
//                     }`}>
//                       {isSectionCompleted || isStepCompleted(index) ? (
//                         <Check className="w-4 h-4" />
//                       ) : (
//                         section.number
//                       )}
//                       {isSectionCompleted && (
//                         <Lock className="w-3 h-3 absolute -top-1 -right-1 text-green-600 bg-white rounded-full p-0.5" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <div className="font-medium text-sm text-gray-900">{section.title}</div>
//                       {section.id !== 'introduction' && (
//                         <div className="text-xs text-gray-500 mt-1">
//                           {isSectionCompleted ? (
//                             <span className="text-green-600 font-medium">
//                               ✓ Completed by {completionInfo?.completedBy || 'Team member'}
//                             </span>
//                           ) : (
//                             <span>{answeredCount}/{totalCount} answered</span>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     {isSectionCompleted && (
//                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     )}
//                   </div>
//                 );
//               })}
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
//                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium relative ${
//                       isTrendCompleted(trendSections[currentStep].id)
//                         ? 'bg-green-100 text-green-700'
//                         : isStepCompleted(currentStep)
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-blue-100 text-blue-700'
//                     }`}>
//                       {isTrendCompleted(trendSections[currentStep].id) || isStepCompleted(currentStep) ? (
//                         <Check className="w-5 h-5" />
//                       ) : (
//                         trendSections[currentStep].number
//                       )}
//                       {isTrendCompleted(trendSections[currentStep].id) && (
//                         <Lock className="w-3 h-3 absolute -top-1 -right-1 text-green-600 bg-white rounded-full p-0.5" />
//                       )}
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-semibold text-gray-900">
//                         {trendSections[currentStep].title}
//                       </h2>
//                       <span className="text-sm text-gray-500">
//                         {isTrendCompleted(trendSections[currentStep].id) 
//                           ? 'Completed by team member - View only'
//                           : 'Available for completion - Fill what\'s relevant for your business'
//                         }
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Step Content */}
//                 {renderStepContent()}

//                 {/* Navigation Buttons */}
//                 <div className="fixed bottom-0 right-0 left-[600px] bg-white border-t p-6">
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
//                       {currentStep === trendSections.length - 1 ? (
//                         <button
//                           onClick={handleSubmit}
//                           disabled={isSubmitting || !canSubmit()}
//                           className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
//                             (isSubmitting || !canSubmit())
//                               ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                               : 'bg-blue-600 text-white hover:bg-blue-700'
//                           }`}
//                         >
//                           {isSubmitting ? (
//                             <>
//                               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                               Creating...
//                             </>
//                           ) : (
//                             'Submit My Contributions'
//                           )}
//                         </button>
//                       ) : (
//                         <button
//                           onClick={handleNext}
//                           className="px-6 py-2 text-sm font-medium rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-700"
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
//     </div>
//   );
// };

// export default CreateTrendPage;
















'use client';

import React, { JSX, useState, useEffect } from 'react';
import { Check, ChevronRight, Lock, Users } from 'lucide-react';
import { useCreateTrendMutation, useGetTrendsQuery } from '@/redux/api/trend/trendApi';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// API Types based on your backend structure
interface TrendDetail {
  question: string;
  answer: string;
  impactLevel: string; // 'High' | 'Medium' | 'Low'
  createdBy?: string;
  createdAt?: string;
  _id?: string;
}

interface Trend {
  trendName: string;
  trendDetails: TrendDetail[];
  isCompleted?: boolean;
  completedBy?: string;
  completedAt?: string;
  _id?: string;
}

// Form Types - Updated to match API structure
interface Question {
  question: string;
  impact: string; // 'high' | 'medium' | 'low'
  answer: string;
}

interface TrendSection {
  trendName: string;
  questions: Question[];
  isCompleted?: boolean;
  completedBy?: string;
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
}

const CreateTrendPage: React.FC = () => {
  // Add hydration check to prevent SSR/client mismatch
  const [isClient, setIsClient] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createTrend] = useCreateTrendMutation();
  const { data, isLoading, error } = useGetTrendsQuery();
  
  // Move useRouter to be called before any conditional returns
  const router = useRouter();

  // Track completed trends by different users
  const [completedTrends, setCompletedTrends] = useState<Set<string>>(new Set());
  const [trendCompletionInfo, setTrendCompletionInfo] = useState<Map<string, { completedBy: string, completedAt: string }>>(new Map());

  // Set client-side flag on mount to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Debug logs
  console.log('=== API DATA DEBUG ===');
  console.log('Full API response:', data);
  console.log('Is loading:', isLoading);
  console.log('Error:', error);
  console.log('data?.data:', data?.data);
  console.log('=====================');

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    introduction: {
      trendName: 'Introduction',
      insights: ''
    },
    customerInsights: {
      trendName: 'Customer Insights',
      questions: [
        { question: 'What are the evolving needs and preferences of our target customers?', impact: '', answer: '' },
        { question: 'How is customer behavior changing, and what factors are influencing these changes?', impact: '', answer: '' },
        { question: 'Are there any unmet needs or pain points that we should address?', impact: '', answer: '' }
      ],
      isCompleted: false
    },
    competitorLandscape: {
      trendName: 'Competitor Landscape',
      questions: [
        { question: 'Who are our main competitors, and what are their strengths and weaknesses?', impact: '', answer: '' },
        { question: 'Have there been any notable changes in competitor strategies or offerings?', impact: '', answer: '' },
        { question: 'How do we differentiate ourselves from competitors, and is this differentiation still relevant?', impact: '', answer: '' },
        { question: 'Are there any emerging competitors that we should be aware of?', impact: '', answer: '' }
      ],
      isCompleted: false
    },
    technologicalAdvances: {
      trendName: 'Technological Advances',
      questions: [
        { question: 'How is technology shaping the industry, and are there new technologies we should leverage?', impact: '', answer: '' },
        { question: 'Are there any technological disruptions that could impact our business model?', impact: '', answer: '' },
      ],
      isCompleted: false
    },
    regulatoryFactors: {
      trendName: 'Regulatory and Legal Factors',
      questions: [
        { question: 'Are there any upcoming regulatory changes that could impact our industry?', impact: '', answer: '' },
        { question: 'How do current regulations affect our business, and are there any compliance challenges?', impact: '', answer: '' },
      ],
      isCompleted: false
    },
    economicConsiderations: {
      trendName: 'Economic Considerations',
      questions: [
        { question: 'How is the economic environment (e.g., inflation, interest rates) affecting consumer spending and industry growth?', impact: '', answer: '' },
        { question: 'Are there any economic indicators that suggest potential challenges or opportunities?', impact: '', answer: '' },
      ],
      isCompleted: false
    },
    supplyChainLogistics: {
      trendName: 'Supply Chain and Logistics',
      questions: [
        { question: 'Are there any vulnerabilities or disruptions in our supply chain?', impact: '', answer: '' },
        { question: 'How are logistics and distribution channels evolving, and how does this impact our operations?', impact: '', answer: '' },
      ],
      isCompleted: false
    },
    globalMarketTrends: {
      trendName: 'Global Market Trends',
      questions: [
        { question: 'How are global trends influencing our industry or market segment?', impact: '', answer: '' },
        { question: 'Are there international markets with significant growth potential or risks?', impact: '', answer: '' },
      ],
      isCompleted: false
    },
    environmentalSocialImpact: {
      trendName: 'Environmental and Social Impact',
      questions: [
        { question: 'How are environmental and social considerations affecting consumer behavior and industry trends?', impact: '', answer: '' },
        { question: 'Are there emerging sustainability trends that could impact our business?', impact: '', answer: '' },
      ],
      isCompleted: false
    },
    collaborationPartnerships: {
      trendName: 'Collaboration and Partnerships',
      questions: [
        { question: 'Are there potential collaboration opportunities with other businesses or partners in the ecosystem?', impact: '', answer: '' },
        { question: 'How can partnerships help us stay agile and respond to market shifts?', impact: '', answer: '' },
      ],
      isCompleted: false
    },
    scenariosRiskAssessment: {
      trendName: 'Scenarios and Risk Assessment',
      questions: [
        { question: 'What are the most significant risks and uncertainties in the market?', impact: '', answer: '' },
        { question: 'How well-prepared are we to adapt to different scenarios and potential disruptions?', impact: '', answer: '' },
      ],
      isCompleted: false
    },
    emergingMarketsOpportunities: {
      trendName: 'Emerging Markets and Opportunities',
      questions: [
        { question: 'Are there untapped markets or demographic segments we should explore?', impact: '', answer: '' },
        { question: 'What emerging trends could open up new business opportunities for us?', impact: '', answer: '' },
      ],
      isCompleted: false
    },
    onTheRadar: {
      trendName: 'On The Radar',
      questions: [
        { question: 'Please enter any emerging trends that are currently not apparent, but you would like to monitor as early warnings to prepare your company for them when the time is right', impact: '', answer: '' },
      ],
      isCompleted: false
    }
  });

  const trendSections: TrendSectionConfig[] = [
    { id: 'introduction', title: 'Introduction', number: '01' },
    { id: 'customerInsights', title: 'Customer Insights', number: '02' },
    { id: 'competitorLandscape', title: 'Competitor Landscape', number: '03' },
    { id: 'technologicalAdvances', title: 'Technological Advances', number: '04' },
    { id: 'regulatoryFactors', title: 'Regulatory and Legal Factors', number: '05' },
    { id: 'economicConsiderations', title: 'Economic Considerations', number: '06' },
    { id: 'supplyChainLogistics', title: 'Supply Chain and Logistics', number: '07' },
    { id: 'globalMarketTrends', title: 'Global Market Trends', number: '08' },
    { id: 'environmentalSocialImpact', title: 'Environmental and Social Impact', number: '09' },
    { id: 'collaborationPartnerships', title: 'Collaboration and Partnerships', number: '10' },
    { id: 'scenariosRiskAssessment', title: 'Scenarios and Risk Assessment', number: '11' },
    { id: 'emergingMarketsOpportunities', title: 'Emerging Markets and Opportunities', number: '12' },
    { id: 'onTheRadar', title: 'On The Radar', number: '13' }
  ];

  // Updated useEffect to handle correct API structure
  useEffect(() => {
    console.log('=== PROCESSING API DATA ===');
    console.log('Raw API data:', data);
    
    // Handle the correct API response structure
    const trendsArray = data?.data || [];
    console.log('Extracted trends array:', trendsArray);
    console.log('Trends array length:', trendsArray.length);
    
    if (trendsArray && trendsArray.length > 0) {
      const newFormData = { ...formData };
      const newCompletedTrends = new Set<string>();
      const newCompletionInfo = new Map<string, { completedBy: string, completedAt: string }>();

      trendsArray.forEach((trend: Trend, trendIndex: number) => {
        console.log(`\n--- Processing Trend ${trendIndex + 1} ---`);
        console.log('Trend name:', trend.trendName);
        console.log('Trend details count:', trend.trendDetails?.length);
        console.log('First detail:', trend.trendDetails?.[0]);
        
        const sectionEntry = Object.entries(newFormData).find(([id, sec]) => 
          id !== 'introduction' && 'trendName' in sec && sec.trendName === trend.trendName
        );
        
        if (sectionEntry) {
          const [sectionId, section] = sectionEntry;
          console.log(`Found matching section: ${sectionId} for trend: ${trend.trendName}`);
          
          if ('questions' in section && Array.isArray(section.questions)) {
            // Check if all questions in this trend are answered
            const allQuestionsAnswered = trend.trendDetails && trend.trendDetails.length > 0 && 
              trend.trendDetails.every(detail => detail.answer && detail.answer.trim() !== '');
            
            console.log(`All questions answered for ${trend.trendName}:`, allQuestionsAnswered);
            
            if (allQuestionsAnswered) {
              newCompletedTrends.add(trend.trendName);
              // Since API doesn't provide completion info, create default
              newCompletionInfo.set(trend.trendName, {
                completedBy: trend.completedBy || 'Team Member',
                completedAt: trend.completedAt || new Date().toISOString()
              });
              console.log(`✅ Marked ${trend.trendName} as completed`);
            }

            // Proper impact level conversion and question matching
            const updatedQuestions = section.questions.map((q, qIndex) => {
              const detail = trend.trendDetails?.find(d => d.question === q.question);
              if (detail) {
                console.log(`  Updated Q${qIndex + 1}: ${q.question.substring(0, 50)}...`);
                console.log(`    Impact: ${detail.impactLevel} → ${detail.impactLevel.toLowerCase()}`);
                console.log(`    Answer: ${detail.answer.substring(0, 30)}...`);
                
                return {
                  ...q,
                  answer: detail.answer,
                  // Convert 'High'/'Medium'/'Low' to 'high'/'medium'/'low'
                  impact: detail.impactLevel.toLowerCase() as 'high' | 'medium' | 'low'
                };
              }
              return q;
            });
            
            newFormData[sectionId] = { 
              ...section, 
              questions: updatedQuestions,
              isCompleted: allQuestionsAnswered,
              completedBy: trend.completedBy || 'Team Member'
            };
          }
        } else {
          console.warn(`❌ No matching section found for trend: ${trend.trendName}`);
          console.log('Available sections:', Object.keys(newFormData).filter(k => k !== 'introduction'));
        }
      });
      
      console.log('\n=== FINAL RESULTS ===');
      console.log('Completed trends:', Array.from(newCompletedTrends));
      console.log('Completion info:', newCompletionInfo);
      console.log('Updated sections:', Object.keys(newFormData).filter(k => k !== 'introduction'));
      console.log('====================');
      
      setFormData(newFormData);
      setCompletedTrends(newCompletedTrends);
      setTrendCompletionInfo(newCompletionInfo);
    } else {
      console.log('No trends data to process');
    }
  }, [data]);

  // Updated existing trends check
  const existingTrendNames = new Set(
    (data?.data || []).map((t: Trend) => t.trendName)
  );

  // Helper function to convert form impact to API impact format
  function convertImpactLevel(level: string): "High" | "Medium" | "Low" {
    // Handle empty or invalid impact levels gracefully
    if (!level || level.trim() === '') {
      return "Medium"; // Default fallback
    }
    
    switch (level.toLowerCase().trim()) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        console.warn(`Unknown impact level: "${level}", defaulting to Medium`);
        return "Medium"; // Fallback instead of throwing error
    }
  }

  // Check if a trend section is completed by any user
  const isTrendCompleted = (sectionId: string): boolean => {
    if (sectionId === 'introduction') return false;
    const section = formData[sectionId];
    if ('trendName' in section) {
      const isCompleted = completedTrends.has(section.trendName);
      console.log(`Checking completion for ${section.trendName}:`, isCompleted);
      return isCompleted;
    }
    return false;
  };

  // Get completion info for a trend
  const getTrendCompletionInfo = (sectionId: string): { completedBy: string, completedAt: string } | null => {
    if (sectionId === 'introduction') return null;
    const section = formData[sectionId];
    if ('trendName' in section) {
      const info = trendCompletionInfo.get(section.trendName) || null;
      console.log(`Getting completion info for ${section.trendName}:`, info);
      return info;
    }
    return null;
  };

  // Helper function to prepare API data
  const prepareApiData = (): Trend[] => {
    const trends: Trend[] = [];

    // Process all sections except introduction
    Object.keys(formData).forEach(sectionId => {
      if (sectionId === 'introduction') return;
      
      const section = formData[sectionId];
      
      // Type guard to ensure we're working with TrendSection
      if ('questions' in section && Array.isArray(section.questions)) {
        const trendSection = section as TrendSection;
        
        // Skip if already completed by someone else
        if (isTrendCompleted(sectionId)) {
          console.log(`Skipping ${trendSection.trendName} - already completed`);
          return;
        }

        // Create trend details for questions that have both answer and impact
        const trendDetails: TrendDetail[] = trendSection.questions
          .filter(q => q.answer.trim() !== '' && q.impact.trim() !== '') // Only include completed questions
          .map(q => ({
            question: q.question,
            answer: q.answer.trim(),
            impactLevel: convertImpactLevel(q.impact),
            createdBy: 'Current User',
            createdAt: new Date().toISOString()
          }));

        // Only add the trend if there are some completed questions
        if (trendDetails.length > 0) {
          // Check if ALL questions in the section are completed
          const allQuestionsCompleted = trendSection.questions.every(q => 
            q.answer.trim() !== '' && q.impact.trim() !== ''
          );

          trends.push({
            trendName: trendSection.trendName,
            trendDetails,
            isCompleted: allQuestionsCompleted,
            completedBy: 'Current User',
            completedAt: new Date().toISOString()
          });
          console.log(`✅ Prepared ${trendSection.trendName} for submission (${trendDetails.length} questions)`);
        }
      }
    });

    console.log('Prepared API data:', trends);
    return trends;
  };

  const isStepCompleted = (stepIndex: number): boolean => {
    const section = trendSections[stepIndex];
    
    // Introduction is completed once user moves to next step
    if (section.id === 'introduction') {
      return visitedSteps.has(stepIndex) && currentStep > 0;
    }
    
    // Check if completed by any user
    if (isTrendCompleted(section.id)) {
      return true;
    }
    
    // For other sections, check if all questions have an answer
    const sectionData = formData[section.id];
    if ('questions' in sectionData && Array.isArray(sectionData.questions)) {
      return sectionData.questions.every(q => q.answer.trim() !== '');
    }
    return false;
  };

  // Get count of answered questions in a section
  const getAnsweredQuestionsCount = (sectionId: string): number => {
    if (sectionId === 'introduction') return 0;
    const section = formData[sectionId];
    if ('questions' in section && Array.isArray(section.questions)) {
      return section.questions.filter(q => q.answer.trim() !== '').length;
    }
    return 0;
  };

  // Get total questions count in a section
  const getTotalQuestionsCount = (sectionId: string): number => {
    if (sectionId === 'introduction') return 0;
    const section = formData[sectionId];
    if ('questions' in section && Array.isArray(section.questions)) {
      return section.questions.length;
    }
    return 0;
  };

  // Check if user can submit (at least one section with answers that's not completed)
  const canSubmit = (): boolean => {
    const apiData = prepareApiData();
    return apiData.length > 0;
  };

  // Get count of remaining trends to complete
  const getRemainingTrendsCount = (): number => {
    return trendSections.filter(section => 
      section.id !== 'introduction' && !isTrendCompleted(section.id)
    ).length;
  };

  // Get count of completed trends
  const getCompletedTrendsCount = (): number => {
    return trendSections.filter(section => 
      section.id !== 'introduction' && isTrendCompleted(section.id)
    ).length;
  };

  const handleNext = (): void => {
    if (currentStep < trendSections.length - 1) {
      if (currentStep > 0) {
        const sectionId = trendSections[currentStep].id;
        
        // Skip validation for completed trends
        if (!isTrendCompleted(sectionId)) {
          const answeredCount = getAnsweredQuestionsCount(sectionId);
          const totalCount = getTotalQuestionsCount(sectionId);
          if (answeredCount > 0 && answeredCount < totalCount) {
            alert('Please answer all questions in this section before proceeding.');
            return;
          }
        }
      }
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
    // Allow clicking on any step
    setCurrentStep(stepIndex);
    setVisitedSteps(prev => new Set([...prev, stepIndex]));
  };

  const handleSubmit = async (): Promise<void> => {
    if (!canSubmit()) {
      alert('Please answer at least one complete section that hasn\'t been completed by others before submitting.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const apiData = prepareApiData();
      
      // Debug: Log what we're sending
      console.log('=== FRONTEND SUBMIT DEBUG ===');
      console.log('Submitting trend data:', apiData);
      console.log('Trends count:', apiData.length);
      console.log('First trend details count:', apiData[0]?.trendDetails?.length);
      console.log('Sample trend detail:', apiData[0]?.trendDetails[0]);
      console.log('API endpoint will be called: PATCH /assess/create-trend');
      console.log('===============================');
      
      const response = await createTrend(apiData).unwrap();
      
      // Debug: Log what we received back
      console.log('=== SUBMIT RESPONSE DEBUG ===');
      console.log('API Response:', response);
      console.log('Returned trends count:', response.data?.trends?.length || response.data?.data?.length);
      console.log('First returned trend details count:', response.data?.trends?.[0]?.trendDetails?.length || response.data?.data?.[0]?.trendDetails?.length);
      console.log('==============================');
      
      if (response.success) {
        setShowToast(true);
        
        // Show success message and redirect after delay
        setTimeout(() => {
          toast.success('Trend updated successfully');
          router.push('/dashboard/assess/trends');
          setShowToast(false);
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to update trend');
      }
    } catch (error) {
      console.error('Error updating trend:', error);
      // Show error toast or handle error appropriately
      alert('Failed to update trend. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update function with proper typing and state management
  const updateQuestionData = (sectionId: string, questionIndex: number, field: keyof Question, value: string): void => {
    // Prevent updates on completed trends
    if (isTrendCompleted(sectionId)) {
      console.log(`Blocked update to completed trend: ${sectionId}`);
      return;
    }

    console.log(`Updating ${sectionId} question ${questionIndex} field ${field}:`, value);

    setFormData(prev => {
      const section = prev[sectionId];
      
      // Ensure we're working with a TrendSection
      if ('questions' in section && Array.isArray(section.questions)) {
        const updatedQuestions = section.questions.map((q, index) => 
          index === questionIndex ? { ...q, [field]: value } : q
        );
        
        return {
          ...prev,
          [sectionId]: {
            ...section,
            questions: updatedQuestions
          }
        };
      }
      
      return prev;
    });
  };

  const renderStepContent = (): JSX.Element => {
    const currentSection = trendSections[currentStep];
    
    if (currentSection.id === 'introduction') {
      const remainingCount = getRemainingTrendsCount();
      const completedCount = getCompletedTrendsCount();
      
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Answering the following questions will provide valuable insights and enable you to develop a robust business strategy that takes into account the dynamic nature of the market.
            </h3>
            
            {/* Multi-user progress indicator */}
            <div className="bg-white p-4 rounded-lg mb-4 border border-blue-200">
              <div className="flex items-center gap-4 mb-3">
                <Users className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-gray-900">Team Progress</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Completed: <strong>{completedCount}</strong> sections</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Remaining: <strong>{remainingCount}</strong> sections</span>
                </div>
              </div>
              {completedCount > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600">
                    Great teamwork! {completedCount} sections have been completed by your team members.
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-blue-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                <strong>Multi-User Collaboration:</strong> Multiple team members (admin, team leaders) can work on different trend sections. Once a section is completed by someone, it will be marked as done and locked for editing.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                <strong>Flexible Approach:</strong> You can fill out any remaining sections (complete 1 section or all remaining sections). Completed sections are protected and show who completed them.
              </p>
            </div>
          </div>
        </div>
      );
    }

    const section = formData[currentSection.id];
    
    // Type guard to ensure we have a TrendSection
    if (!('questions' in section) || !Array.isArray(section.questions)) {
      return <div>Error: Invalid section data</div>;
    }
    
    const trendSection = section as TrendSection;
    const isSectionCompleted = isTrendCompleted(currentSection.id);
    const completionInfo = getTrendCompletionInfo(currentSection.id);
    
    return (
      <div className="space-y-8">
        {/* Section status indicator */}
        {isSectionCompleted && completionInfo ? (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <Lock className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">
                  This section has been completed by <strong>{completionInfo.completedBy}</strong>
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Completed on {new Date(completionInfo.completedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-orange-800">
                <strong>Available for completion:</strong> You can fill out this section and contribute to the team&#39;s progress.
              </p>
            </div>
          </div>
        )}
        
        {trendSection.questions.map((questionData, index) => (
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
                        disabled={isSectionCompleted}
                      />
                      <span className={`text-sm font-medium capitalize ${
                        level === 'high' ? 'text-green-600' : 
                        level === 'medium' ? 'text-yellow-600' : 
                        'text-red-600'
                      } ${isSectionCompleted ? 'opacity-60' : ''}`}>
                        {level}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <textarea
                className={`w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  isSectionCompleted ? 'bg-gray-50 cursor-not-allowed text-gray-600' : ''
                }`}
                placeholder={isSectionCompleted ? "This section has been completed by a team member..." : "Enter your response..."}
                value={questionData.answer}
                onChange={(e) => updateQuestionData(currentSection.id, index, 'answer', e.target.value)}
                readOnly={isSectionCompleted}
              />
              {isSectionCompleted && (
                <div className="absolute top-2 right-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Check if we're on client side to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trend data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading trend data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ml-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Create New Trend Analysis</h1>
            <p className="text-sm text-gray-600 mt-1">
              Collaborative trend analysis • {getCompletedTrendsCount()} completed • {getRemainingTrendsCount()} remaining
            </p>
          </div>
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
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Team Collaboration:</strong> Work on any available sections. Completed sections are locked.
              </p>
            </div>
            
            <div className="space-y-2">
              {trendSections.map((section, index) => {
                const answeredCount = getAnsweredQuestionsCount(section.id);
                const totalCount = getTotalQuestionsCount(section.id);
                const isSectionCompleted = isTrendCompleted(section.id);
                const completionInfo = getTrendCompletionInfo(section.id);
                
                return (
                  <div
                    key={section.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                      currentStep === index 
                        ? 'bg-blue-50 border-l-4 border-blue-500' 
                        : 'hover:bg-gray-50'
                    } ${isSectionCompleted ? 'bg-green-50' : ''}`}
                    onClick={() => handleStepClick(index)}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium relative ${
                      isSectionCompleted
                        ? 'bg-green-100 text-green-700'
                        : isStepCompleted(index)
                        ? 'bg-green-100 text-green-700'
                        : currentStep === index
                        ? 'bg-blue-100 text-blue-700'
                        : visitedSteps.has(index)
                        ? 'bg-gray-100 text-gray-600'
                        : 'bg-gray-50 text-gray-400'
                    }`}>
                      {isSectionCompleted || isStepCompleted(index) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        section.number
                      )}
                      {isSectionCompleted && (
                        <Lock className="w-3 h-3 absolute -top-1 -right-1 text-green-600 bg-white rounded-full p-0.5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">{section.title}</div>
                      {section.id !== 'introduction' && (
                        <div className="text-xs text-gray-500 mt-1">
                          {isSectionCompleted ? (
                            <span className="text-green-600 font-medium">
                              Completed by {completionInfo?.completedBy || 'Team member'}
                            </span>
                          ) : (
                            <span>{answeredCount}/{totalCount} answered</span>
                          )}
                        </div>
                      )}
                    </div>
                    {isSectionCompleted && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                );
              })}
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
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium relative ${
                      isTrendCompleted(trendSections[currentStep].id)
                        ? 'bg-green-100 text-green-700'
                        : isStepCompleted(currentStep)
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {isTrendCompleted(trendSections[currentStep].id) || isStepCompleted(currentStep) ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        trendSections[currentStep].number
                      )}
                      {isTrendCompleted(trendSections[currentStep].id) && (
                        <Lock className="w-3 h-3 absolute -top-1 -right-1 text-green-600 bg-white rounded-full p-0.5" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {trendSections[currentStep].title}
                      </h2>
                      <span className="text-sm text-gray-500">
                        {isTrendCompleted(trendSections[currentStep].id) 
                          ? 'Completed by team member - View only'
                          : 'Available for completion - Fill what\'s relevant for your business'
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="fixed bottom-0 right-0 left-[660px] bg-white border-t p-6">
                  <div className="ml- max-w-4xl flex items-center justify-end gap-8 ">
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
                      {currentStep === trendSections.length - 1 ? (
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting || !canSubmit()}
                          className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                            (isSubmitting || !canSubmit())
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Creating...
                            </>
                          ) : (
                            'Submit My Contributions'
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          className="px-6 py-2 text-sm font-medium rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-700"
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
    </div>
  );
};

export default CreateTrendPage;