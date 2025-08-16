import React from "react";
import PaperPlain from '@/public/image/paperPlain.svg'
import Image from "next/image";
const radarData = [
  {
    radar: "Advancements in AI-powered automation",
    recommendation:
      "Leverage emerging AI automation tools to enhance operational efficiency and reduce time-to-market by 15%. Evaluate areas like supply chain optimization, predictive analytics for demand forecasting, and customer support automation to improve scalability and cut operational costs. Conduct a pilot test to measure impact before full implementation.",
  },
  {
    radar: "Blockchain integration opportunities",
    recommendation:
      "Prioritize eco-friendly initiatives in product development and marketing strategies. Highlight sustainability as a core value in branding, and collaborate with environmentally conscious suppliers to align with customer expectations. Consider launching green-certified product lines and using carbon-neutral logistics to strengthen market presence among sustainability-focused consumers.",
  },
  {
    radar: "Renewable energy innovations",
    recommendation:
      "Proactively address potential compliance risks by conducting a thorough audit of current data management and security practices. Develop a roadmap to integrate GDPR, CCPA, or similar frameworks based on target markets. Train employees on new privacy protocols, and communicate transparent data-handling policies to customers to build trust and mitigate legal vulnerabilities.",
  },
  {
    radar: "Quantum computing developments",
    recommendation:
      "Identify gaps in your product offerings by analyzing competitors’ strengths. Enhance differentiation by focusing on exclusive features, pricing strategies, or superior customer experience. Additionally, explore partnerships and regional expansions to counteract rising competition. Regularly monitor competitors’ activities using AI-powered market intelligence tools to stay ahead in the market.",
  },
];

export default function OnTheRadar() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 w-full">
      {/* Title */}
      <h2 className="text-lg font-semibold text-blue-900">
        On the Radar and AI Recommendations
      </h2>

      {/* Table Head */}
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 text-sm font-medium text-gray-700 mt-4 border-b border-gray-200 pb-2">
        <span>On the Radar</span>
        <span>AI Recommendations</span>
      </div>

      {/* Table Body */}
      <div>
        {radarData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 py-4 border-b border-gray-200 last:border-b-0"
          >
            {/* On the Radar */}
            <div className="flex items-start gap-2">
              <span className="text-blue-500 text-sm mt-[6px]">•</span>
              <span className="text-blue-600 hover:underline cursor-pointer text-sm">
                {item.radar}
              </span>
            </div>

            {/* AI Recommendations */}
            <div className="flex items-start gap-4">
              <Image src={PaperPlain} alt="Paper Plain" width={20} height={20} className="mt-[10px]"/>
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold">{item.recommendation}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
