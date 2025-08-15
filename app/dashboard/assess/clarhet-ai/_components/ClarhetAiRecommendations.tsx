"use client";

interface RecommendationsProps {
  title?: string;
  description?: string;
  challengesContent?: string;
  swotContent?: string;
  trendsContent?: string;
  competitorsAnalysisContent?: string;
}

const ClarhetAiRecommendations: React.FC<RecommendationsProps> = ({
  title = "ClarhetAi Recommendations",
  description = "Harness the power of artificial intelligence to elevate your strategy. The ClarhetAi Recommendations component consolidates all AI-generated recommendations from SWOT, Challenges, Trends, and Competitors Analysis, providing a dynamic playbook for developing high-impact strategy. It is your AI-powered advisor, offering actionable recommendations to inform and enhance your strategic initiatives.",
  challengesContent = "",
  swotContent = "",
  trendsContent = "",
  competitorsAnalysisContent = ""
}) => {
  return (
    <div className="my-8 rounded-lg p-6 bg-white">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Grid Layout for Four Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Challenges Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[300px]">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Challenges</h2>
          <div className="text-sm text-gray-600">
            {challengesContent || (
              <div className="h-48 flex items-center justify-center text-gray-400">
                AI recommendations will appear here
              </div>
            )}
          </div>
        </div>

        {/* SWOT Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[300px]">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SWOT</h2>
          <div className="text-sm text-gray-600">
            {swotContent || (
              <div className="h-48 flex items-center justify-center text-gray-400">
                AI recommendations will appear here
              </div>
            )}
          </div>
        </div>

        {/* Trends Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[300px]">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Trends</h2>
          <div className="text-sm text-gray-600">
            {trendsContent || (
              <div className="h-48 flex items-center justify-center text-gray-400">
                AI recommendations will appear here
              </div>
            )}
          </div>
        </div>

        {/* Competitors Analysis Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[300px]">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Competitors Analysis</h2>
          <div className="text-sm text-gray-600">
            {competitorsAnalysisContent || (
              <div className="h-48 flex items-center justify-center text-gray-400">
                AI recommendations will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClarhetAiRecommendations;