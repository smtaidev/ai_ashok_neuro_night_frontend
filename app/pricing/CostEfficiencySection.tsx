// App.tsx
import React from 'react';

interface FeatureItem {
  title: string;
  description: string;
}

const CostEfficiencySection: React.FC = () => {
  const features: FeatureItem[] = [
    {
      title: "Cost-Efficiency:",
      description: "Eliminate the need for expensive consultants by leveraging our AI-powered platform. Develop and translate your business strategy into actionable plans with ease, saving on consultancy fees and accelerating the implementation process.",
    },
    {
      title: "Strategic Precision:",
      description: "Our platform empowers you to make informed decisions, providing insights that would typically require extensive consultant involvement. Achieve strategic goals efficiently with a technology-driven approach.",
    },
    {
      title: "Break Down Silos:",
      description: "Say goodbye to long and confusing meetings. Our platform promotes collaboration and breaks down silos, and fosters more agile decision-making.",
    },
    {
      title: "Aligned Change Management and Culture:",
      description: "With our platform, change management, and cultural alignment are integral from day one. Our platform ensures that your team embraces change positively and aligns culture with strategic choices, enhancing overall productivity and employee satisfaction.",
    },
    {
      title: "Custom Fit:",
      description: "Our solutions are not one-size-fits-all. We customize to match your unique requirements.",
    },
    {
      title: "Innovation:",
      description: "Stay ahead with cutting-edge features that set your business apart.",
    },
  ];

  return (
    <section className="pb-12 px-4 sm:px-6  lg:px-8">
      <div className="max-w-7xl bg-blue-50 rounded-xl p-5 mx-auto"> {/* Adjusted to match image's narrower width */}
        <div className="space-y-5"> {/* Increased spacing to match image */}
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-2"> {/* Reduced space-x for tighter alignment */}
              
              <div>
                
                <p className="text-base leading-relaxed"> {/* Adjusted text-base for image font size */}
                  <span className="font-semibold text-blue-700">
                   <span className="text-green-500 pr-1">✓</span> {feature.title}</span> {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CostEfficiencySection;