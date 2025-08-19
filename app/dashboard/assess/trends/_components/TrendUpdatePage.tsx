'use client';

import React, { JSX, useState, useEffect } from 'react';
import { Check, ChevronRight, RefreshCw, AlertCircle, Save } from 'lucide-react';
import { useGetTrendsQuery, useUpdateTrendMutation } from '@/redux/api/trend/trendApi';

// API Types based on your backend structure
interface TrendDetail {
  _id?: string;
  question: string;
  answer: string;
  impactLevel: 'High' | 'Medium' | 'Low';
}

interface Trend {
  _id: string;
  trendName: string;
  trendDetails: TrendDetail[];
}

// Form Types - Updated to match API structure
interface Question {
  _id?: string;
  question: string;
  impact: 'high' | 'medium' | 'low';
  answer: string;
}

interface TrendSection {
  _id?: string;
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
}

const TrendUpdatePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [dataLoadError, setDataLoadError] = useState<string>('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // API calls
  const { data, isLoading, error, refetch } = useGetTrendsQuery();
  const [updateTrend, { isLoading: isUpdating }] = useUpdateTrendMutation();
  
  // Debug: Log API response
  useEffect(() => {
    console.log('=== API DEBUG INFO ===');
    console.log('isLoading:', isLoading);
    console.log('error:', error);
    console.log('data:', data);
    console.log('=====================');
  }, [data, isLoading, error]);
  
  // Form data state with default structure
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

  // Helper function to convert API impact to form impact format
  const convertApiImpactLevel = (impact: 'High' | 'Medium' | 'Low'): 'high' | 'medium' | 'low' => {
    return impact.toLowerCase() as 'high' | 'medium' | 'low';
  };

  // Helper function to convert form impact to API impact format
  const convertFormImpactLevel = (impact: 'high' | 'medium' | 'low'): 'High' | 'Medium' | 'Low' => {
    return impact.charAt(0).toUpperCase() + impact.slice(1) as 'High' | 'Medium' | 'Low';
  };

  // Helper function to map trend name to section ID
  const getTrendSectionId = (trendName: string): string | null => {
    const mapping: { [key: string]: string } = {
      'Customer Insights': 'customerInsights',
      'Competitor Landscape': 'competitorLandscape',
      'Technological Advances': 'technologicalAdvances',
      'Regulatory and Legal Factors': 'regulatoryFactors',
      'Economic Considerations': 'economicConsiderations',
      'Supply Chain and Logistics': 'supplyChainLogistics',
      'Global Market Trends': 'globalMarketTrends',
      'Environmental and Social Impact': 'environmentalSocialImpact',
      'Collaboration and Partnerships': 'collaborationPartnerships',
      'Scenarios and Risk Assessment': 'scenariosRiskAssessment',
      'Emerging Markets and Opportunities': 'emergingMarketsOpportunities',
      'On The Radar': 'onTheRadar'
    };
    
    return mapping[trendName] || null;
  };

  // Load existing trend data following the same pattern as your insights page
  const loadExistingData = () => {
    console.log('=== LOADING EXISTING DATA ===');
    console.log('Data object:', data);
    
    if (!data?.data || !Array.isArray(data.data)) {
      console.log('No trends data found');
      setDataLoadError('No existing trends found');
      setIsDataLoaded(true);
      return;
    }

    const trendsArray = data.data;
    console.log('Found trends array with', trendsArray.length, 'trends');
    
    setFormData(prevFormData => {
      const updatedFormData = { ...prevFormData };
      
      trendsArray.forEach((trend) => {
        console.log('Processing trend:', trend.trendName);
        
        const sectionId = getTrendSectionId(trend.trendName);
        
        if (!sectionId) {
          console.log(`Could not map trend name "${trend.trendName}" to section ID`);
          return;
        }
        
        if (updatedFormData[sectionId] && 'questions' in updatedFormData[sectionId]) {
          const section = updatedFormData[sectionId] as TrendSection;
          const updatedQuestions = [...section.questions];
          
          // Map existing answers to questions
          trend.trendDetails.forEach((detail: TrendDetail) => {
            const questionIndex = updatedQuestions.findIndex(q => q.question === detail.question);
            
            if (questionIndex !== -1) {
              updatedQuestions[questionIndex] = {
                ...updatedQuestions[questionIndex],
                _id: detail._id,
                answer: detail.answer,
                impact: convertApiImpactLevel(detail.impactLevel)
              };
            }
          });
          
          updatedFormData[sectionId] = {
            ...section,
            _id: trend._id,
            questions: updatedQuestions
          };
        }
      });
      
      console.log('Final updated form data:', updatedFormData);
      return updatedFormData;
    });
    
    setIsDataLoaded(true);
    setDataLoadError('');
    console.log('Data loading completed successfully');
  };

  // Load existing trend data into form
  useEffect(() => {
    if (data && !isLoading && !isDataLoaded) {
      loadExistingData();
    }
  }, [data, isLoading, isDataLoaded]);

  // Refresh data function
  const handleRefreshData = () => {
    console.log('Refreshing data...');
    setIsDataLoaded(false);
    setDataLoadError('');
    setHasUnsavedChanges(false);
    refetch();
  };

  // Show toast notification
  const showToastNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Update trend functionality
  const handleUpdateTrend = async () => {
    if (!hasUnsavedChanges) {
      showToastNotification('No changes to save', 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare updates for all modified sections
      const updatePromises: Promise<any>[] = [];
      
      Object.keys(formData).forEach(sectionKey => {
        if (sectionKey === 'introduction') return;
        
        const section = formData[sectionKey] as TrendSection;
        
        // Check if this section has any answered questions
        const hasAnswers = section.questions.some(q => q.answer.trim() !== '');
        
        if (hasAnswers && section._id) {
          // Prepare the trend details for API
          const trendDetails = section.questions
            .filter(q => q.answer.trim() !== '')
            .map(q => ({
              _id: q._id,
              question: q.question,
              answer: q.answer,
              impactLevel: convertFormImpactLevel(q.impact)
            }));

          const updateData = {
            id: section._id,
            trends: [
              {
                trendName: section.trendName,
                trendDetails
              }
            ]
          };

          console.log('Updating trend:', updateData);
          updatePromises.push(updateTrend(updateData).unwrap());
        }
      });

      if (updatePromises.length === 0) {
        showToastNotification('No sections with answers to update', 'error');
        setIsSubmitting(false);
        return;
      }

      // Execute all updates
      await Promise.all(updatePromises);
      
      showToastNotification(`Successfully updated ${updatePromises.length} trend section(s)!`);
      setHasUnsavedChanges(false);
      
      // Refresh data to get latest updates
      refetch();
      
    } catch (error: any) {
      console.error('Update failed:', error);
      showToastNotification(
        error?.data?.message || error?.message || 'Failed to update trends. Please try again.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
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

  // Updated question data update function
  const updateQuestionData = (sectionId: string, questionIndex: number, field: keyof Question, value: string): void => {
    setFormData(prev => {
      const section = prev[sectionId];
      
      if ('questions' in section && Array.isArray(section.questions)) {
        const updatedQuestions = section.questions.map((q, index) => 
          index === questionIndex ? { ...q, [field]: value } : q
        );
        
        const updatedFormData = {
          ...prev,
          [sectionId]: {
            ...section,
            questions: updatedQuestions
          }
        };
        
        // Mark as having unsaved changes
        setHasUnsavedChanges(true);
        
        return updatedFormData;
      }
      
      return prev;
    });
  };

  const renderStepContent = (): JSX.Element => {
    const currentSection = trendSections[currentStep];
    
    if (currentSection.id === 'introduction') {
      return (
        <div className="space-y-6">
          {/* Data Status Section */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Data Loading Status
            </h3>
            
            {isLoading && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Loading existing trend data...
                </p>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <strong>API Error:</strong> Failed to load trends data
                </p>
              </div>
            )}
            
            {dataLoadError && (
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <strong>Data Load Error:</strong> {dataLoadError}
                </p>
              </div>
            )}
            
            {isDataLoaded && !error && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <strong>Success:</strong> Existing trend data loaded successfully!
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Update your existing trend analysis by modifying any sections that are relevant to your current business situation.
            </h3>
            <div className="bg-blue-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                <strong>Update Mode:</strong> Your existing trend data has been loaded. You can edit any section, add new insights, or modify impact levels as needed.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                <strong>Flexible Updates:</strong> Only the sections you modify will be updated. You can edit one section or all sections - whatever suits your current needs.
              </p>
            </div>
          </div>

          {/* Quick Save Button */}
          {hasUnsavedChanges && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-800">
                    <strong>Unsaved Changes:</strong> You have modifications that haven&#39;t been saved yet.
                  </p>
                </div>
                <button
                  onClick={handleUpdateTrend}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isSubmitting ? 'Saving...' : 'Save All Changes'}
                </button>
              </div>
            </div>
          )}
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
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Update Section:</strong> Modify existing answers or add new insights. Changes will be saved when you click the Save button.
          </p>
        </div>
        
        {trendSection.questions.map((questionData, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-900 block">
                  {questionData.question}
                  {questionData.answer.trim() !== '' && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      Previously Answered
                    </span>
                  )}
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
              className={`w-full h-32 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                questionData.answer.trim() !== '' 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-300'
              }`}
              placeholder={questionData.answer.trim() !== '' 
                ? "Edit your existing response..." 
                : "Enter your response (optional)..."
              }
              value={questionData.answer}
              onChange={(e) => updateQuestionData(currentSection.id, index, 'answer', e.target.value)}
            />
          </div>
        ))}

        {/* Section Save Button */}
        {hasUnsavedChanges && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-blue-800">
                You have unsaved changes in this section.
              </p>
              <button
                onClick={handleUpdateTrend}
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900">Update Trend Analysis</h1>
            <button
              onClick={handleRefreshData}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
            <div className="text-xs text-gray-500">
              {isDataLoaded ? '✅ Data Loaded' : isLoading ? '🔄 Loading...' : '❌ No Data'}
            </div>
            {hasUnsavedChanges && (
              <div className="text-xs text-orange-600 font-medium">
                ⚠️ Unsaved Changes
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            {hasUnsavedChanges && (
              <button
                onClick={handleUpdateTrend}
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isSubmitting ? 'Saving...' : 'Save All Changes'}
              </button>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Assess</span>
              <ChevronRight className="w-4 h-4" />
              <span>Trends</span>
              <ChevronRight className="w-4 h-4" />
              <span>Update</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Scrollable */}
        <div className="w-80 bg-white border-r h-screen overflow-y-auto">
          <div className="p-6">
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
                      answeredCount > 0
                        ? 'bg-green-100 text-green-700'
                        : currentStep === index
                        ? 'bg-blue-100 text-blue-700'
                        : visitedSteps.has(index)
                        ? 'bg-gray-100 text-gray-600'
                        : 'bg-gray-50 text-gray-400'
                    }`}>
                      {answeredCount > 0 ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        section.number
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">{section.title}</div>
                      {section.id !== 'introduction' && (
                        <div className="text-xs text-gray-500 mt-1">
                          {answeredCount}/{totalCount} answered
                        </div>
                      )}
                    </div>
                    {answeredCount > 0 && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1">
          <div className="p-6">
            <div className="max-w-4xl">
              {/* Current Step Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    getAnsweredQuestionsCount(trendSections[currentStep].id) > 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {getAnsweredQuestionsCount(trendSections[currentStep].id) > 0 ? (
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
                      {trendSections[currentStep].id === 'introduction' 
                        ? 'Check data loading status and proceed' 
                        : 'Update existing data or add new insights'
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="mt-8 flex items-center justify-between">
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
                  <button 
                    onClick={handleRefreshData}
                    className="px-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                    disabled={isLoading}
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Reload Data
                  </button>
                  
                  {hasUnsavedChanges && (
                    <button
                      onClick={handleUpdateTrend}
                      disabled={isSubmitting}
                      className="px-6 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                  )}
                  
                  <button
                    onClick={handleNext}
                    disabled={currentStep >= trendSections.length - 1}
                    className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentStep >= trendSections.length - 1
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {currentStep === trendSections.length - 1 ? 'Last Step' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 ${
          toastType === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {toastType === 'success' ? (
            <Check className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>You have unsaved changes</span>
          <button
            onClick={handleUpdateTrend}
            disabled={isSubmitting}
            className="ml-4 px-3 py-1 bg-white text-yellow-600 rounded text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Now'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TrendUpdatePage;