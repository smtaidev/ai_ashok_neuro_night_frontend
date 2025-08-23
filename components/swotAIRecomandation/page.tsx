import React, { useState } from 'react';
import { X, TrendingUp, AlertTriangle, Target, Shield, Star, Lightbulb, ChevronRight, Brain, Sparkles } from 'lucide-react';

interface AIRecommendationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIRecommendationsDrawer: React.FC<AIRecommendationsDrawerProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'strengths' | 'weaknesses' | 'opportunities' | 'threats'>('strengths');

  if (!isOpen) return null;

  // REPLACE THIS SECTION WITH YOUR ACTUAL API HOOK:
  // const { data: aiSwotData, isLoading, error } = useGetAiSwotQuery();
  
  // For demo purposes, using the data structure from your console output
  // Remove this mock data and uncomment the API hook above
  const aiSwotData = {
    data: {
      companyName: "Clarhet Solutions",
      error: null,
      recommendations: {
        opportunities: [
          'Explore the potential of the dropshipping business market research to identify high-demand tech gadgets.',
          'Enhance personal development through targeted courses and certifications that align with emerging industry trends.',
          'Consider expanding the business model to include online workshops, leveraging existing skills and experiences.'
        ],
        strengths: [
          'Leverage strong web development skills to expand into new tech-related projects or markets.',
          'Utilize the proactive learning attitude to stay ahead of trends and continuously improve technical skills.',
          'Capitalize on the existing knowledge of dropshipping partnerships or collaborations in the tech gadget niche.'
        ],
        threats: [
          'Develop a risk management plan to address potential threats identified, focusing on external market changes.',
          'Stay informed about industry developments and competitive actions to anticipate and mitigate potential threats.',
          'Establish a contingency plan for business operations to ensure resilience against unforeseen challenges.'
        ],
        weaknesses: [
          'Conduct a detailed analysis to identify specific areas of weakness and develop targeted improvement plans.',
          'Reduce redundancy by ensuring clarity and specificity in documenting weaknesses to better address them.',
          'Implement a regular review process to monitor progress and adapt strategies to mitigate weaknesses effectively.'
        ]
      },
      scores: {
        strengths: { average: 8.5, total: 25.5 },
        weaknesses: { average: 6.2, total: 18.6 },
        opportunities: { average: 7.8, total: 23.4 },
        threats: { average: 5.9, total: 17.7 }
      }
    }
  };

  const aiData = aiSwotData?.data;

  const tabConfig = {
    strengths: {
      icon: TrendingUp,
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      title: 'Strengths',
      description: 'Leverage your competitive advantages'
    },
    weaknesses: {
      icon: AlertTriangle,
      color: 'amber',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200',
      badgeColor: 'bg-amber-100 text-amber-800',
      title: 'Weaknesses',
      description: 'Areas requiring improvement and attention'
    },
    opportunities: {
      icon: Target,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      badgeColor: 'bg-blue-100 text-blue-800',
      title: 'Opportunities',
      description: 'Growth potential and market possibilities'
    },
    threats: {
      icon: Shield,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200',
      badgeColor: 'bg-red-100 text-red-800',
      title: 'Threats',
      description: 'Risks and challenges to address'
    }
  };

  const currentTab = tabConfig[activeTab];
  const CurrentIcon = currentTab.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-4xl bg-white shadow-2xl transform transition-transform duration-300 ease-out">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">ClearhetAI Recommendations</h2>
                <p className="text-blue-100 text-sm">AI-Powered SWOT Analysis for {aiData.companyName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
        </div>

        {/* Content */}
        <div className="flex h-full">
          {/* Sidebar Navigation */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                Analysis Overview
              </h3>
              
              {/* Score Summary */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {Object.entries(aiData?.scores || {}).map(([key, score]) => {
                  const config = tabConfig[key as keyof typeof tabConfig];
                  if (!config) return null;
                  const ScoreIcon = config.icon;
                  return (
                    <div key={key} className={`${config.bgColor} ${config.borderColor} border rounded-lg p-3`}>
                      <div className="flex items-center justify-between mb-1">
                        <ScoreIcon className={`w-4 h-4 ${config.iconColor}`} />
                        <span className="text-lg font-bold text-gray-900">{score?.average || 'N/A'}</span>
                      </div>
                      <p className="text-xs text-gray-600 capitalize">{key}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="space-y-2">
              {Object.entries(tabConfig).map(([key, config]) => {
                const TabIcon = config.icon;
                const isActive = activeTab === key;
                const count = aiData?.recommendations?.[key as keyof typeof aiData.recommendations]?.length || 0;
                
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? `${config.bgColor} ${config.borderColor} border-2 shadow-sm` 
                        : 'hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-white shadow-sm' : 'bg-gray-200'}`}>
                          <TabIcon className={`w-4 h-4 ${isActive ? config.iconColor : 'text-gray-500'}`} />
                        </div>
                        <div>
                          <h4 className={`font-medium ${isActive ? config.textColor : 'text-gray-700'}`}>
                            {config.title}
                          </h4>
                          <p className="text-xs text-gray-500">{count} recommendations</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? config.iconColor : 'text-gray-400'}`} />
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
              <div className="p-8">
                {aiData?.error ? (
                  <div className="text-center py-12">
                    <div className="text-red-400 mb-4">
                      <AlertTriangle className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-red-500">Error loading AI recommendations</p>
                  </div>
                ) : !aiData ? (
                  <div className="text-center py-12">
                    <div className="animate-spin text-gray-400 mb-4">
                      <Brain className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-gray-500">Loading AI recommendations...</p>
                  </div>
                ) : (
                  <>
                    {/* Section Header */}
                    <div className={`${currentTab.bgColor} ${currentTab.borderColor} border rounded-xl p-6 mb-8`}>
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <CurrentIcon className={`w-6 h-6 ${currentTab.iconColor}`} />
                        </div>
                        <div>
                          <h3 className={`text-2xl font-bold ${currentTab.textColor}`}>
                            {currentTab.title}
                          </h3>
                          <p className="text-gray-600 mt-1">{currentTab.description}</p>
                        </div>
                        <div className="ml-auto">
                          <span className={`${currentTab.badgeColor} px-3 py-1 rounded-full text-sm font-medium`}>
                            Score: {aiData.scores?.[activeTab]?.average || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-6">AI-Generated Recommendations</h4>
                      
                      {aiData.recommendations?.[activeTab]?.map((recommendation, index) => (
                        <div
                          key={index}
                          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`${currentTab.bgColor} p-2 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                              <Lightbulb className={`w-5 h-5 ${currentTab.iconColor}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <span className={`${currentTab.badgeColor} px-2 py-1 rounded-md text-xs font-medium`}>
                                  Recommendation #{index + 1}
                                </span>
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              </div>
                              <p className="text-gray-700 leading-relaxed">{recommendation}</p>
                              
                              {/* Action buttons */}
                              <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-100">
                                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1">
                                  <span>Implement</span>
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                                <button className="text-sm text-gray-500 hover:text-gray-700">
                                  Save for later
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )) || (
                        <div className="text-center py-12">
                          <div className="text-gray-400 mb-4">
                            <Lightbulb className="w-12 h-12 mx-auto" />
                          </div>
                          <p className="text-gray-500">No recommendations available for this category.</p>
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-12 pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Brain className="w-4 h-4" />
                          <span>Powered by ClearhetAI</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">
                            Export Report
                          </button>
                          <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium">
                            Apply Recommendations
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationsDrawer;