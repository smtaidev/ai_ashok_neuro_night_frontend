

'use client';

import React, { JSX, useState, useEffect } from 'react';
import { Check, ChevronRight, Lock, Users, Save, RefreshCw } from 'lucide-react';
import { useGetTrendsQuery, useUpdateTrendMutation } from '@/redux/api/trend/trendApi';
import toast from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';

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

const UpdateTrendPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [originalFormData, setOriginalFormData] = useState<FormData | null>(null);
  
  const { data, isLoading, error, refetch } = useGetTrendsQuery();
  const [updateTrend] = useUpdateTrendMutation();
  
  const router = useRouter();
  const params = useParams();

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

  // Load existing trend data into form
  useEffect(() => {
    console.log('=== LOADING EXISTING TREND DATA ===');
    console.log('Raw API data:', data);
    
    const trendsArray = data?.data || [];
    console.log('Extracted trends array:', trendsArray);
    
    if (trendsArray && trendsArray.length > 0) {
      const newFormData = { ...formData };
      
      trendsArray.forEach((trend: Trend, trendIndex: number) => {
        console.log(`\n--- Processing Trend ${trendIndex + 1} ---`);
        console.log('Trend name:', trend.trendName);
        console.log('Trend details count:', trend.trendDetails?.length);
        
        const sectionEntry = Object.entries(newFormData).find(([id, sec]) => 
          id !== 'introduction' && 'trendName' in sec && sec.trendName === trend.trendName
        );
        
        if (sectionEntry) {
          const [sectionId, section] = sectionEntry;
          console.log(`Found matching section: ${sectionId} for trend: ${trend.trendName}`);
          
          if ('questions' in section && Array.isArray(section.questions)) {
            const updatedQuestions = section.questions.map((q, qIndex) => {
              const detail = trend.trendDetails?.find(d => d.question === q.question);
              if (detail) {
                console.log(`  Updated Q${qIndex + 1}: ${q.question.substring(0, 50)}...`);
                console.log(`    Impact: ${detail.impactLevel} → ${detail.impactLevel.toLowerCase()}`);
                console.log(`    Answer: ${detail.answer.substring(0, 30)}...`);
                
                return {
                  ...q,
                  answer: detail.answer,
                  impact: detail.impactLevel.toLowerCase() as 'high' | 'medium' | 'low'
                };
              }
              return q;
            });
            
            newFormData[sectionId] = { 
              ...section, 
              questions: updatedQuestions,
              isCompleted: trend.isCompleted || false,
              completedBy: trend.completedBy || 'Unknown'
            };
          }
        }
      });
      
      console.log('\n=== SETTING FORM DATA ===');
      setFormData(newFormData);
      setOriginalFormData(JSON.parse(JSON.stringify(newFormData))); // Deep copy for comparison
    }
  }, [data]);

  // Helper function to convert form impact to API impact format
  function convertImpactLevel(level: string): "High" | "Medium" | "Low" {
    switch (level.toLowerCase()) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        throw new Error(`Invalid impact level: ${level}`);
    }
  }

  // Check if form has changes compared to original
  const checkForChanges = (newFormData: FormData): boolean => {
    if (!originalFormData) return false;
    
    // Compare all sections except introduction
    for (const [sectionId, section] of Object.entries(newFormData)) {
      if (sectionId === 'introduction') continue;
      
      const originalSection = originalFormData[sectionId];
      if ('questions' in section && 'questions' in originalSection) {
        const sectionQuestions = section.questions;
        const originalQuestions = originalSection.questions;
        
        for (let i = 0; i < sectionQuestions.length; i++) {
          const current = sectionQuestions[i];
          const original = originalQuestions[i];
          
          if (current.answer !== original.answer || current.impact !== original.impact) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Prepare API data for update (no ID needed, just like create)
  const prepareUpdateApiData = (): any[] => {
    const trends: any[] = [];

    // Process all sections except introduction
    Object.keys(formData).forEach(sectionId => {
      if (sectionId === 'introduction') return;
      
      const section = formData[sectionId];
      
      if ('questions' in section && Array.isArray(section.questions)) {
        const trendSection = section as TrendSection;
        
        // Create trend details for questions that have answers
        const trendDetails: TrendDetail[] = trendSection.questions
          .filter(q => q.answer.trim() !== '') // Only include answered questions
          .map(q => ({
            question: q.question,
            answer: q.answer.trim(),
            impactLevel: convertImpactLevel(q.impact),
            createdBy: 'Current User',
            createdAt: new Date().toISOString()
          }));

        // Only add the trend if it has some answered questions
        if (trendDetails.length > 0) {
          trends.push({
            trendName: trendSection.trendName,
            trendDetails,
            isCompleted: trendDetails.length === trendSection.questions.length,
            completedBy: 'Current User',
            completedAt: new Date().toISOString()
          });
        }
      }
    });

    return trends;
  };

  const isStepCompleted = (stepIndex: number): boolean => {
    const section = trendSections[stepIndex];
    
    if (section.id === 'introduction') {
      return visitedSteps.has(stepIndex) && currentStep > 0;
    }
    
    const sectionData = formData[section.id];
    if ('questions' in sectionData && Array.isArray(sectionData.questions)) {
      return sectionData.questions.every(q => q.answer.trim() !== '' && q.impact.trim() !== '');
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

  // Check if user can save changes
  const canSave = (): boolean => {
    return hasChanges && !isSubmitting;
  };

  const handleNext = (): void => {
    if (currentStep < trendSections.length - 1) {
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
    setCurrentStep(stepIndex);
    setVisitedSteps(prev => new Set([...prev, stepIndex]));
  };

  const handleSaveChanges = async (): Promise<void> => {
    if (!canSave()) {
      toast.error('No changes to save or save operation in progress.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const updateData = prepareUpdateApiData();
      
      console.log('=== UPDATE TREND DEBUG ===');
      console.log('Update data:', updateData);
      console.log('Trends count:', updateData.length);
      console.log('Sample trend detail:', updateData[0]?.trendDetails[0]);
      console.log('API endpoint will be called: PATCH /assess/update-trend');
      console.log('===========================');
      
      if (updateData.length === 0) {
        throw new Error('No trend data to update');
      }

      // Send data directly (no ID wrapper needed)
      const response = await updateTrend(updateData).unwrap();
      
      console.log('=== UPDATE RESPONSE DEBUG ===');
      console.log('API Response:', response);
      console.log('==============================');
      
      if (response.success) {
        toast.success('Trends updated successfully!');
        setHasChanges(false);
        
        // Refresh the data to get updated values
        await refetch();
        
        // Update original form data to reflect new baseline
        setOriginalFormData(JSON.parse(JSON.stringify(formData)));
        
      } else {
        throw new Error(response.message || 'Failed to update trends');
      }
    } catch (error) {
      console.error('Error updating trends:', error);
      toast.error('Failed to update trends. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update function with change detection
  const updateQuestionData = (sectionId: string, questionIndex: number, field: keyof Question, value: string): void => {
    console.log(`Updating ${sectionId} question ${questionIndex} field ${field}:`, value);

    setFormData(prev => {
      const section = prev[sectionId];
      
      if ('questions' in section && Array.isArray(section.questions)) {
        const updatedQuestions = section.questions.map((q, index) => 
          index === questionIndex ? { ...q, [field]: value } : q
        );
        
        const newFormData = {
          ...prev,
          [sectionId]: {
            ...section,
            questions: updatedQuestions
          }
        };
        
        // Check for changes after state update
        setTimeout(() => {
          const hasChangesNow = checkForChanges(newFormData);
          setHasChanges(hasChangesNow);
          console.log('Has changes:', hasChangesNow);
        }, 0);
        
        return newFormData;
      }
      
      return prev;
    });
  };

  const renderStepContent = (): JSX.Element => {
    const currentSection = trendSections[currentStep];
    
    if (currentSection.id === 'introduction') {
      const totalSections = trendSections.length - 1; // Exclude introduction
      const completedSections = trendSections.filter(section => 
        section.id !== 'introduction' && isStepCompleted(trendSections.indexOf(section))
      ).length;
      
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Edit and update your trend analysis responses. You can modify any answers or impact levels and save your changes.
            </h3>
            
            <div className="bg-white p-4 rounded-lg mb-4 border border-blue-200">
              <div className="flex items-center gap-4 mb-3">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-gray-900">Update Progress</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Sections with data: <strong>{completedSections}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Total sections: <strong>{totalSections}</strong></span>
                </div>
              </div>
              {hasChanges && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-orange-600 font-medium">
                    ⚠️ You have unsaved changes. Click Save Changes to update your trends.
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg mb-4 border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Edit Mode:</strong> You can edit any existing answers or impact levels. Changes will be highlighted and you can save them when ready.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                <strong>Auto-Save:</strong> Your changes are tracked automatically. The save button will appear when you make modifications.
              </p>
            </div>
          </div>
        </div>
      );
    }

    const section = formData[currentSection.id];
    
    if (!('questions' in section) || !Array.isArray(section.questions)) {
      return <div>Error: Invalid section data</div>;
    }
    
    const trendSection = section as TrendSection;
    
    return (
      <div className="space-y-8">        
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
            <div className="relative">
              <textarea
                className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your response..."
                value={questionData.answer}
                onChange={(e) => updateQuestionData(currentSection.id, index, 'answer', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

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
          <p className="text-gray-600">{error.toString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Update Trend Analysis</h1>
            <p className="text-sm text-gray-600 mt-1">
              Edit and update your existing trend responses
              {hasChanges && <span className="text-orange-600 font-medium"> • Unsaved changes</span>}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {hasChanges && (
              <button
                onClick={handleSaveChanges}
                disabled={isSubmitting}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Assess</span>
              <ChevronRight className="w-4 h-4" />
              <span>Update Trends</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Scrollable */}
        <div className="w-120 bg-white border-r h-screen overflow-y-auto">
          <div className="p-6">
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Edit Mode:</strong> Make changes to any section and save when ready.
              </p>
            </div>
            
            <div className="space-y-2">
              {trendSections.map((section, index) => {
                const answeredCount = getAnsweredQuestionsCount(section.id);
                const totalCount = getTotalQuestionsCount(section.id);
                
                return (
                  <div
                    key={section.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                      currentStep === index 
                        ? 'bg-blue-50 border-l-4 border-blue-500' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleStepClick(index)}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isStepCompleted(index)
                        ? 'bg-green-600 text-white'
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
                      {section.id !== 'introduction' && (
                        <div className="text-xs text-gray-500 mt-1">
                          <span>{answeredCount}/{totalCount} answered</span>
                        </div>
                      )}
                    </div>
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
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      isStepCompleted(currentStep)
                        ? 'bg-green-600 text-white'
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
                      <span className="text-sm text-gray-500">
                        Edit and update your responses for this section
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="fixed bottom-0 right-0 left-[800px] bg-white border-t p-6">
                  <div className="ml-10 max-w-4xl flex items-center justify-end gap-8">
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
                      {/* Save Changes Button - Always visible when there are changes */}
                      {hasChanges && (
                        <button
                          onClick={handleSaveChanges}
                          disabled={isSubmitting}
                          className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                            isSubmitting
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Save Changes
                            </>
                          )}
                        </button>
                      )}
                      
                      {/* Next/Finish Button */}
                      {currentStep === trendSections.length - 1 ? (
                        <button
                          onClick={() => {
                            if (hasChanges) {
                              alert('Please save your changes before finishing.');
                              return;
                            }
                            toast.success('Trend update completed!');
                            router.push('/dashboard/assess/trends');
                          }}
                          className="px-6 py-2 text-sm font-medium rounded-lg transition-colors bg-[#22398A] text-white hover:bg-[#22398A]"
                        >
                          Finish Editing
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          className="px-6 py-2 text-sm font-medium rounded-lg transition-colors bg-[#22398A] text-white hover:bg-[#22398A]"
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

export default UpdateTrendPage;