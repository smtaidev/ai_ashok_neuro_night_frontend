"use client";

import React, { useState } from 'react';

interface ChartData {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

const DonutChart: React.FC = () => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const data: ChartData[] = [
    { label: 'High Impact', value: 44, color: '#16a34a', percentage: 44 },
    { label: 'Weaknesses', value: 55, color: '#eab308', percentage: 55 },
    { label: 'Threats', value: 41, color: '#ef4444', percentage: 41 }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const circumference = 2 * Math.PI * 30;

  const createPath = (startAngle: number, endAngle: number) => {
    const radius = 30;
    const centerX = 50;
    const centerY = 50;
    
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);
    
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
    
    return `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  let cumulativeAngle = -Math.PI / 2; // Start from top

  return (
    <div className="relative">
      <svg 
        className="w-72 h-72" 
        viewBox="0 0 100 100"
        onMouseMove={handleMouseMove}
      >
        {data.map((segment, index) => {
          const angle = (segment.value / total) * 2 * Math.PI;
          const startAngle = cumulativeAngle;
          const endAngle = cumulativeAngle + angle;
          
          // Create outer path for hover area
          const outerRadius = 36;
          const innerRadius = 24;
          const centerX = 50;
          const centerY = 50;
          
          const startXOuter = centerX + outerRadius * Math.cos(startAngle);
          const startYOuter = centerY + outerRadius * Math.sin(startAngle);
          const endXOuter = centerX + outerRadius * Math.cos(endAngle);
          const endYOuter = centerY + outerRadius * Math.sin(endAngle);
          
          const startXInner = centerX + innerRadius * Math.cos(startAngle);
          const startYInner = centerY + innerRadius * Math.sin(startAngle);
          const endXInner = centerX + innerRadius * Math.cos(endAngle);
          const endYInner = centerY + innerRadius * Math.sin(endAngle);
          
          const largeArcFlag = angle <= Math.PI ? "0" : "1";
          
          const pathData = [
            `M ${startXOuter} ${startYOuter}`,
            `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endXOuter} ${endYOuter}`,
            `L ${endXInner} ${endYInner}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startXInner} ${startYInner}`,
            'Z'
          ].join(' ');
          
          cumulativeAngle += angle;
          
          return (
            <path
              key={segment.label}
              d={pathData}
              fill={segment.color}
              className="cursor-pointer transition-opacity duration-200"
              style={{
                opacity: hoveredSegment && hoveredSegment !== segment.label ? 0.6 : 1,
              }}
              onMouseEnter={() => setHoveredSegment(segment.label)}
              onMouseLeave={() => setHoveredSegment(null)}
            />
          );
        })}
      </svg>
      
      {/* Tooltip */}
      {hoveredSegment && (
        <div
          className="fixed z-50 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg pointer-events-none text-sm"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 40,
          }}
        >
          {hoveredSegment}: {data.find(d => d.label === hoveredSegment)?.value}
        </div>
      )}
    </div>
  );
};

const TrendsDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-white rounded-lg shadow-md my-8  p-6">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Trends Impact Summary
          </h1>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            ClearAI Recommendation
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trends Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Trends</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Identified Trends:</span>
                <span className="font-semibold text-gray-900">20</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">High Impact:</span>
                <span className="font-semibold text-gray-900">20</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Medium Impact:</span>
                <span className="font-semibold text-gray-900">20</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Low Impact:</span>
                <span className="font-semibold text-gray-900">20</span>
              </div>
            </div>
          </div>

          {/* Trends Impact Snapshot Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Trends Impact Snapshot
            </h2>
            <div className="flex flex-col items-center">
              {/* Donut Chart */}
              <div className="relative w-56 h-56 mb-6">
                <DonutChart />
              </div>
              
              {/* Legend */}
              <div className="space-y-2 w-full">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-600 mr-3"></div>
                  <span className="text-sm text-gray-700">High Impact : 44</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></div>
                  <span className="text-sm text-gray-700">Weaknesses : 55</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                  <span className="text-sm text-gray-700">Threats : 41</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Trends Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Top Trends (High Impact)
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="  mr-2">1.</span>
                <span className="text-gray-700 leading-relaxed">
                  How is customer behavior changing, and what factors are influencing these changes?
                </span>
              </div>
              <div className="flex items-start">
                <span className=" mr-2">2.</span>
                <span className="text-gray-700 leading-relaxed">
                  How is customer behavior changing, and what factors are influencing these changes?
                </span>
              </div>
              <div className="flex items-start">
                <span className=" mr-2">3.</span>
                <span className="text-gray-700 leading-relaxed">
                  How is customer behavior changing, and what factors are influencing these changes?
                </span>
              </div>
            </div>
          </div>

          {/* On The Radar Trends Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              On The Radar Trends
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              Lorem Ipsum is simply dummy text of the{' '}
              <span className="text-blue-600">printing</span> and typesetting industry. Lorem Ipsum has been the industrys
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
              essentially unchanged. It was popularised in the 1960s with the{' '}
              <span className="text-blue-600">release of Letraset sheets</span> containing Lorem Ipsum 
              passages, and more recently with{' '}
              <span className="text-blue-600">desktop publishing software</span> like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsDashboard;