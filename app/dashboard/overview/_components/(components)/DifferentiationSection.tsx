import React from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';

// Define the props for the DifferentiationSection component
interface FeatureProps {
  label: string;
  value: string;
}

const FeatureRow: React.FC<FeatureProps> = ({ label, value }) => (
  <div className="flex justify-between items-center py-4 border-b border-gray-200 last:border-b-0">
    <div className="text-gray-700 text-[16px]">{label}</div>
    <div className="font-semibold text-gray-900 text-[16px]">{value}</div>
  </div>
);

const DifferentiationSection: React.FC = () => {
  return (
    <div className="max-w- mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header section */}
      <div className="pb-4 border-b border-gray-200">
        <h2 className="text-[18px] font-thin mb-2 text-[#1E3A8A]">Differentiation</h2>
        <p className="text-gray-700 text-[15px]">The only AI-powered solution tailored for mining, delivering 30% faster results.</p>
      </div>

      {/* Feature list section */}
      <div className="mt-4">
        <FeatureRow label="Speed to Market" value="30% faster project turnaround" />
        <FeatureRow label="Customer Alignment" value="Resonates with mid-size retailers" />
        <FeatureRow label="Exclusive Feature" value="Proprietary AI integration" />
      </div>

      {/* Footer section with link */}
      <div className="mt-6 text-right">
        <a href="#" className="text-[#1E3A8A] hover:text-[#071438] font-medium flex items-center justify-end">
          View Details
          →
          
        </a>
      </div>
    </div>
  );
};

export default DifferentiationSection;

