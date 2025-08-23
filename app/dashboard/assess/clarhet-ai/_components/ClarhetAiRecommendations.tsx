// "use client";

// import { useGetAiSwotQuery } from "@/redux/api/clarhetai-recomandation/clarhetaiApi";

//  // Adjust import path as needed

// interface RecommendationsProps {
//   title?: string;
//   description?: string;
//   challengesContent?: string;
//   trendsContent?: string;
//   competitorsAnalysisContent?: string;
// }

// const ClarhetAiRecommendations: React.FC<RecommendationsProps> = ({
//   title = "ClarhetAi Recommendations",
//   description = "Harness the power of artificial intelligence to elevate your strategy. The ClarhetAi Recommendations component consolidates all AI-generated recommendations from SWOT, Challenges, Trends, and Competitors Analysis, providing a dynamic playbook for developing high-impact strategy. It is your AI-powered advisor, offering actionable recommendations to inform and enhance your strategic initiatives.",
//   challengesContent = "",
//   trendsContent = "",
//   competitorsAnalysisContent = ""
// }) => {
//   // Fetch SWOT data
//   const { data: swotData, isLoading: isSwotLoading, error: swotError } = useGetAiSwotQuery();

//   // Render SWOT content
//   const renderSwotContent = () => {
//     if (isSwotLoading) {
//       return (
//         <div className="h-48 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2 text-gray-500">Loading SWOT recommendations...</span>
//         </div>
//       );
//     }

//     if (swotError) {
//       return (
//         <div className="h-48 flex items-center justify-center text-red-500">
//           <div className="text-center">
//             <p className="mb-2">Failed to load SWOT recommendations</p>
//             <p className="text-sm text-gray-500">Please try again later</p>
//           </div>
//         </div>
//       );
//     }

//     if (!swotData?.data) {
//       return (
//         <div className="h-48 flex items-center justify-center text-gray-400">
//           No SWOT data available
//         </div>
//       );
//     }

//     const { scores, recommendations } = swotData.data;

//     return (
//       <div className="space-y-6">
//         {/* Scores Section */}
//         <div>
//           <h3 className="text-md font-medium text-gray-800 mb-3">Analysis Scores</h3>
//           <div className="grid grid-cols-2 gap-3">
//             <div className="bg-green-50 p-3 rounded-lg">
//               <div className="flex justify-between items-center mb-1">
//                 <span className="text-sm font-medium text-green-800">Strengths</span>
//                 <span className="text-lg font-bold text-green-600">{scores.strengths.value}/10</span>
//               </div>
//               <p className="text-xs text-green-700">{scores.strengths.rationale}</p>
//             </div>
            
//             <div className="bg-red-50 p-3 rounded-lg">
//               <div className="flex justify-between items-center mb-1">
//                 <span className="text-sm font-medium text-red-800">Weaknesses</span>
//                 <span className="text-lg font-bold text-red-600">{scores.weaknesses.value}/10</span>
//               </div>
//               <p className="text-xs text-red-700">{scores.weaknesses.rationale}</p>
//             </div>
            
//             <div className="bg-blue-50 p-3 rounded-lg">
//               <div className="flex justify-between items-center mb-1">
//                 <span className="text-sm font-medium text-blue-800">Opportunities</span>
//                 <span className="text-lg font-bold text-blue-600">{scores.opportunities.value}/10</span>
//               </div>
//               <p className="text-xs text-blue-700">{scores.opportunities.rationale}</p>
//             </div>
            
//             <div className="bg-yellow-50 p-3 rounded-lg">
//               <div className="flex justify-between items-center mb-1">
//                 <span className="text-sm font-medium text-yellow-800">Threats</span>
//                 <span className="text-lg font-bold text-yellow-600">{scores.threats.value}/10</span>
//               </div>
//               <p className="text-xs text-yellow-700">{scores.threats.rationale}</p>
//             </div>
//           </div>
//         </div>

//         {/* Recommendations Section */}
//         <div>
//           <h3 className="text-md font-medium text-gray-800 mb-3">AI Recommendations</h3>
//           <div className="space-y-4">
//             {/* Strengths Recommendations */}
//             <div>
//               <h4 className="text-sm font-medium text-green-800 mb-2">Strengths</h4>
//               <ul className="space-y-1">
//                 {recommendations.strengths.map((rec, index) => (
//                   <li key={index} className="text-xs text-gray-600 flex items-start">
//                     <span className="text-green-500 mr-2">•</span>
//                     <span>{rec}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Weaknesses Recommendations */}
//             <div>
//               <h4 className="text-sm font-medium text-red-800 mb-2">Weaknesses</h4>
//               <ul className="space-y-1">
//                 {recommendations.weaknesses.map((rec, index) => (
//                   <li key={index} className="text-xs text-gray-600 flex items-start">
//                     <span className="text-red-500 mr-2">•</span>
//                     <span>{rec}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Opportunities Recommendations */}
//             <div>
//               <h4 className="text-sm font-medium text-blue-800 mb-2">Opportunities</h4>
//               <ul className="space-y-1">
//                 {recommendations.opportunities.map((rec, index) => (
//                   <li key={index} className="text-xs text-gray-600 flex items-start">
//                     <span className="text-blue-500 mr-2">•</span>
//                     <span>{rec}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Threats Recommendations */}
//             <div>
//               <h4 className="text-sm font-medium text-yellow-800 mb-2">Threats</h4>
//               <ul className="space-y-1">
//                 {recommendations.threats.map((rec, index) => (
//                   <li key={index} className="text-xs text-gray-600 flex items-start">
//                     <span className="text-yellow-500 mr-2">•</span>
//                     <span>{rec}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="my-8 rounded-lg p-6 bg-white">
//       {/* Header Section */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
//         <p className="text-sm text-gray-700 leading-relaxed">
//           {description}
//         </p>
//       </div>

//       {/* Grid Layout for Four Sections */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Challenges Section */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[300px]">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Challenges</h2>
//           <div className="text-sm text-gray-600">
//             {challengesContent || (
//               <div className="h-48 flex items-center justify-center text-gray-400">
//                 AI recommendations will appear here
//               </div>
//             )}
//           </div>
//         </div>

//         {/* SWOT Section - Now with API data */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[300px]">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">SWOT</h2>
//           <div className="text-sm text-gray-600">
//             {renderSwotContent()}
//           </div>
//         </div>

//         {/* Trends Section */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[300px]">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Trends</h2>
//           <div className="text-sm text-gray-600">
//             {trendsContent || (
//               <div className="h-48 flex items-center justify-center text-gray-400">
//                 AI recommendations will appear here
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Competitors Analysis Section */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[300px]">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Competitors Analysis</h2>
//           <div className="text-sm text-gray-600">
//             {competitorsAnalysisContent || (
//               <div className="h-48 flex items-center justify-center text-gray-400">
//                 AI recommendations will appear here
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClarhetAiRecommendations;







"use client";

import { useGetAiChallengeQuery, useGetAiSwotQuery, useGetAiTrendQuery } from "@/redux/api/clarhetai-recomandation/clarhetaiApi";

 // Adjust import path as needed

interface RecommendationsProps {
  title?: string;
  description?: string;
  competitorsAnalysisContent?: string;
}

const ClarhetAiRecommendations: React.FC<RecommendationsProps> = ({
  title = "ClarhetAi Recommendations",
  description = "Harness the power of artificial intelligence to elevate your strategy. The ClarhetAi Recommendations component consolidates all AI-generated recommendations from SWOT, Challenges, Trends, and Competitors Analysis, providing a dynamic playbook for developing high-impact strategy. It is your AI-powered advisor, offering actionable recommendations to inform and enhance your strategic initiatives.",
  competitorsAnalysisContent = ""
}) => {
  // Fetch SWOT data
  const { data: swotData, isLoading: isSwotLoading, error: swotError } = useGetAiSwotQuery();
  // Fetch Challenge data
  const { data: challengeData, isLoading: isChallengeLoading, error: challengeError } = useGetAiChallengeQuery();
  // Fetch Trend data
  const { data: trendData, isLoading: isTrendLoading, error: trendError } = useGetAiTrendQuery();

  console.log(trendData);

  // Render Trend content
  const renderTrendContent = () => {
    if (isTrendLoading) {
      return (
        <div className="h-48 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-2 text-gray-500">Loading trend analysis...</span>
        </div>
      );
    }

    if (trendError) {
      return (
        <div className="h-48 flex items-center justify-center text-red-500">
          <div className="text-center">
            <p className="mb-2">Failed to load trend analysis</p>
            <p className="text-sm text-gray-500">Please try again later</p>
          </div>
        </div>
      );
    }

    if (!trendData?.data) {
      return (
        <div className="h-48 flex items-center justify-center text-gray-400">
          No trend data available
        </div>
      );
    }

    const { 
      summary, 
      trend_synthesis, 
      early_warnings, 
      strategic_opportunities, 
      analyst_recommendations,
      radar_executive_summary,
      radar_recommendation
    } = trendData.data;

    // Helper function to check if content is valid (not an error message)
    const isValidContent = (content: string | string[]) => {
      if (Array.isArray(content)) {
        return content.length > 0 && !content.some(item => item.includes("Error:"));
      }
      return content && !content.includes("Error:");
    };

    return (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-3">
            Company: <span className="font-medium">{trendData.data.companyName}</span>
          </p>
        </div>

        {/* Radar Executive Summary - Priority since it has valid data */}
        {radar_executive_summary && radar_executive_summary.length > 0 && (
          <div className="bg-indigo-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-indigo-800 mb-2">Executive Summary</h4>
            <div className="space-y-2">
              {radar_executive_summary.map((summary, index) => (
                <p key={index} className="text-xs text-indigo-700 flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>{summary}</span>
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Radar Recommendations - Priority since it has valid data */}
        {radar_recommendation && radar_recommendation.length > 0 && (
          <div className="bg-violet-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-violet-800 mb-2">Strategic Recommendations</h4>
            <div className="space-y-2">
              {radar_recommendation.map((recommendation, index) => (
                <p key={index} className="text-xs text-violet-700 flex items-start">
                  <span className="text-violet-500 mr-2">•</span>
                  <span>{recommendation}</span>
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Key Summary Cards - Only show if valid */}
        {isValidContent(summary.key_opportunities) && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-r-lg">
            <h4 className="text-xs font-semibold text-emerald-800 mb-1">Key Opportunities</h4>
            <p className="text-xs text-emerald-700">{summary.key_opportunities}</p>
          </div>
        )}
        
        {isValidContent(summary.significant_risks) && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg">
            <h4 className="text-xs font-semibold text-amber-800 mb-1">Significant Risks</h4>
            <p className="text-xs text-amber-700">{summary.significant_risks}</p>
          </div>
        )}

        {/* Trend Synthesis - Only show if valid */}
        {isValidContent(trend_synthesis) && (
          <div className="bg-cyan-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-cyan-800 mb-2">Trend Analysis</h4>
            <div className="space-y-1">
              {trend_synthesis.filter(trend => !trend.includes("Error:")).map((trend, index) => (
                <p key={index} className="text-xs text-cyan-700 flex items-start">
                  <span className="text-cyan-500 mr-2">•</span>
                  <span>{trend}</span>
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Strategic Opportunities - Only show if valid */}
        {isValidContent(strategic_opportunities) && (
          <div className="bg-teal-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-teal-800 mb-2">Strategic Opportunities</h4>
            <div className="space-y-1">
              {strategic_opportunities.filter(opp => !opp.includes("Error:")).map((opportunity, index) => (
                <p key={index} className="text-xs text-teal-700 flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  <span>{opportunity}</span>
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Early Warnings - Only show if valid */}
        {isValidContent(early_warnings) && (
          <div className="bg-red-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-red-800 mb-1">Early Warnings</h4>
            <p className="text-xs text-red-700">{early_warnings}</p>
          </div>
        )}

        {/* Analyst Recommendations - Only show if valid */}
        {isValidContent(analyst_recommendations) && (
          <div className="bg-purple-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-purple-800 mb-1">Analyst Recommendations</h4>
            <p className="text-xs text-purple-700">{analyst_recommendations}</p>
          </div>
        )}

        {/* Show message if no valid data is available */}
        {!radar_executive_summary?.length && 
         !radar_recommendation?.length && 
         !isValidContent(summary.key_opportunities) && 
         !isValidContent(summary.significant_risks) && 
         !isValidContent(trend_synthesis) && 
         !isValidContent(strategic_opportunities) && 
         !isValidContent(early_warnings) && 
         !isValidContent(analyst_recommendations) && (
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-2">Limited trend data available</p>
            <p className="text-xs text-gray-500">Some analysis sections may need more relevant business data</p>
          </div>
        )}
      </div>
    );
  };

  // Render Challenge content
  const renderChallengeContent = () => {
    if (isChallengeLoading) {
      return (
        <div className="h-48 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-2 text-gray-500">Loading challenge recommendations...</span>
        </div>
      );
    }

    if (challengeError) {
      return (
        <div className="h-48 flex items-center justify-center text-red-500">
          <div className="text-center">
            <p className="mb-2">Failed to load challenge recommendations</p>
            <p className="text-sm text-gray-500">Please try again later</p>
          </div>
        </div>
      );
    }

    if (!challengeData?.data?.recommendations) {
      return (
        <div className="h-48 flex items-center justify-center text-gray-400">
          No challenge data available
        </div>
      );
    }

    // Parse markdown-style recommendations
    const parseRecommendations = (text: string) => {
      // Split by lines that start with "- **"
      const recommendations = text.split(/(?=- \*\*)/g).filter(item => item.trim());
      
      return recommendations.map((rec, index) => {
        // Extract title (between ** **)
        const titleMatch = rec.match(/\*\*(.*?)\*\*/);
        const title = titleMatch ? titleMatch[1] : '';
        
        // Extract description (everything after the title)
        const description = rec.replace(/- \*\*.*?\*\*:\s*/, '').trim();
        
        return {
          id: index,
          title,
          description
        };
      });
    };

    const recommendations = parseRecommendations(challengeData.data.recommendations);

    return (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-3">
            Company: <span className="font-medium">{challengeData.data.companyName}</span>
          </p>
        </div>
        
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded-r-lg">
              <h4 className="text-sm font-semibold text-purple-800 mb-2">{rec.title}</h4>
              <p className="text-xs text-gray-700 leading-relaxed">{rec.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render SWOT content
  const renderSwotContent = () => {
    if (isSwotLoading) {
      return (
        <div className="h-48 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-500">Loading SWOT recommendations...</span>
        </div>
      );
    }

    if (swotError) {
      return (
        <div className="h-48 flex items-center justify-center text-red-500">
          <div className="text-center">
            <p className="mb-2">Failed to load SWOT recommendations</p>
            <p className="text-sm text-gray-500">Please try again later</p>
          </div>
        </div>
      );
    }

    if (!swotData?.data) {
      return (
        <div className="h-48 flex items-center justify-center text-gray-400">
          No SWOT data available
        </div>
      );
    }

    const { scores, recommendations } = swotData.data;

    return (
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {/* Scores Section */}
        <div>
          <h3 className="text-md font-medium text-gray-800 mb-3">Analysis Scores</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-green-800">Strengths</span>
                <span className="text-lg font-bold text-green-600">{scores.strengths.value}/10</span>
              </div>
              <p className="text-xs text-green-700">{scores.strengths.rationale}</p>
            </div>
            
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-red-800">Weaknesses</span>
                <span className="text-lg font-bold text-red-600">{scores.weaknesses.value}/10</span>
              </div>
              <p className="text-xs text-red-700">{scores.weaknesses.rationale}</p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-blue-800">Opportunities</span>
                <span className="text-lg font-bold text-blue-600">{scores.opportunities.value}/10</span>
              </div>
              <p className="text-xs text-blue-700">{scores.opportunities.rationale}</p>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-yellow-800">Threats</span>
                <span className="text-lg font-bold text-yellow-600">{scores.threats.value}/10</span>
              </div>
              <p className="text-xs text-yellow-700">{scores.threats.rationale}</p>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div>
          <h3 className="text-md font-medium text-gray-800 mb-3">AI Recommendations</h3>
          <div className="space-y-4">
            {/* Strengths Recommendations */}
            <div>
              <h4 className="text-sm font-medium text-green-800 mb-2">Strengths</h4>
              <ul className="space-y-1">
                {recommendations.strengths.map((rec, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses Recommendations */}
            <div>
              <h4 className="text-sm font-medium text-red-800 mb-2">Weaknesses</h4>
              <ul className="space-y-1">
                {recommendations.weaknesses.map((rec, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities Recommendations */}
            <div>
              <h4 className="text-sm font-medium text-blue-800 mb-2">Opportunities</h4>
              <ul className="space-y-1">
                {recommendations.opportunities.map((rec, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Threats Recommendations */}
            <div>
              <h4 className="text-sm font-medium text-yellow-800 mb-2">Threats</h4>
              <ul className="space-y-1">
                {recommendations.threats.map((rec, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        {/* Challenges Section - Now with API data */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[300px]">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Challenges</h2>
          <div className="text-sm text-gray-600">
            {renderChallengeContent()}
          </div>
        </div>

        {/* SWOT Section - Now with API data */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[300px]">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SWOT</h2>
          <div className="text-sm text-gray-600">
            {renderSwotContent()}
          </div>
        </div>

        {/* Trends Section - Now with API data */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-[300px]">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Trends</h2>
          <div className="text-sm text-gray-600">
            {renderTrendContent()}
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