


'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useGetTrendsQuery } from '@/redux/api/trend/trendApi';

// Types for our data structures
interface TrendQuestion {
  _id: string;
  question: string;
  answer: string;
  impactLevel: string;
}

interface TrendCategory {
  _id: string;
  trendName: string;
  icon: string;
  isExpanded: boolean;
  trendDetails: TrendQuestion[];
}

const TrendsInsightsPage = () => {
  const [trendsData, setTrendsData] = useState<TrendCategory[]>([]);

  const { data, isLoading, isError, error } = useGetTrendsQuery();
  console.log("trenddata", data);

  // Icon mapping for different trend categories
  const getIconForTrend = (trendName: string): string => {
    const iconMap: { [key: string]: string } = {
      'Customer Insights': '👥',
      'Competitor Landscape': '🏆',
      'Economic Considerations': '💰',
      'Technological Advances': '🚀',
      'Regulatory and Legal Factors': '⚖️',
      'Supply Chain and Logistics': '🚛',
      'Global Market Trends': '🌍',
      'Environmental and Social Impact': '🌱',
      'Collaboration and Partnerships': '🤝',
      'Scenarios and Risk Assessment': '⚠️',
      'Emerging Markets and Opportunities': '💡',
      'On The Radar': '📡',
    };
    return iconMap[trendName] || '📊';
  };

  // Process API data and set initial state
    useEffect(() => {
    if (data?.data) {
      const processedData = data.data.map((trend: any, index: number) => ({
        _id: trend._id,
        trendName: trend.trendName,
        icon: getIconForTrend(trend.trendName),
        isExpanded: index === 0, // Only expand first item by default
        trendDetails: trend.trendDetails || []
      }));
      setTrendsData(processedData);
    }
  }, [data]);

  // Toggle expansion of trend sections
  const toggleTrend = (categoryId: string) => {
    setTrendsData(prev => prev.map(trend => 
      trend._id === categoryId 
        ? { ...trend, isExpanded: !trend.isExpanded }
        : trend
    ));
  };

  // Get impact color based on value
  const getImpactColor = (impact: string) => {
    switch (impact?.toLowerCase()) {
      case 'high':
        return 'border-green-500 bg-green-500';
      case 'medium':
        return 'border-yellow-500 bg-yellow-500';
      case 'low':
        return 'border-red-500 bg-red-500';
      default:
        return 'border-gray-300 bg-gray-300';
    }
  };

  // Get impact display text
  const getImpactDisplay = (impact: string) => {
    return impact || 'Not Set';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white my-8 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white my-8 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trends & Insights</h1>
        </div>
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Data</h3>
          <p className="text-red-600">
            {
              typeof error === 'object' && error !== null
              ? ('message' in error
                  ? (error as { message?: string }).message
                  : 'data' in error && typeof error.data === 'string'
                    ? error.data
                    : 'Failed to load trends data. Please try again later.')
              : 'Failed to load trends data. Please try again later.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white my-8 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trends & Insights</h1>
          <p className="text-gray-600">
            Analyze emerging trends and their potential impact on your business strategy
          </p>
        </div>

        {/* Trends List */}
        {trendsData.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Trends Available</h3>
            <p className="text-gray-500">No trend data is currently available.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trendsData.map((category) => (
              <div key={category._id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                {/* Category Header */}
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                  onClick={() => toggleTrend(category._id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{category.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{category.trendName}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {category.trendDetails.length} questions
                    </span>
                  </div>
                  {category.isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                {/* Expanded Content - Question Cards */}
                {category.isExpanded && (
                  <div className="p-4 space-y-4">
                    {category.trendDetails.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No questions available for this trend category.
                      </div>
                    ) : (
                      category.trendDetails.map((question) => (
                        <div key={question._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          {/* Question Header */}
                          <div className="md:flex items-start justify-between mb-4">
                            <h4 className="text-base font-medium text-gray-900 flex-1 pr-4">
                              {question.question}
                            </h4>
                            <div className="flex items-center gap-4 flex-shrink-0">
                              {/* Impact Display */}
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 font-medium">Impact:</span>
                                <div className="flex items-center gap-2">
                                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${getImpactColor(question.impactLevel)}`}>
                                    {question.impactLevel && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                  </div>
                                  <span className={`text-sm font-medium capitalize ${question.impactLevel ? 'text-gray-700' : 'text-gray-400 italic'}`}>
                                    {getImpactDisplay(question.impactLevel)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Answer Section */}
                          <div className="border-t border-gray-200 pt-4">
                            <div className="min-h-[80px] p-3 bg-white border border-gray-200 rounded text-sm text-gray-600">
                              {question.answer || 'No answer provided yet.'}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendsInsightsPage;