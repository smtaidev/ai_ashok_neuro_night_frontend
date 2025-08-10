
"use client";
import React, { useState } from 'react';
import { MoreVertical, Grid3X3, Menu } from 'lucide-react';
import { swotSectionsData } from '@/app/dashboard/foundation/_components/dummyData';
import Drawer from '@/app/dashboard/blueprint/vision/_comoponents/DrawarModal';

interface ChartData {
  label: string;
  value: number;
  color: string;
  lightColor: string;
}

const DonutChart: React.FC = () => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const data: ChartData[] = [
    { label: 'Strengths', value: 44, color: '#16a34a', lightColor: '#dcfce7' },
    { label: 'Weaknesses', value: 55, color: '#eab308', lightColor: '#fef3c7' },
    { label: 'Opportunities', value: 22, color: '#3b82f6', lightColor: '#dbeafe' },
    { label: 'Threats', value: 13, color: '#ef4444', lightColor: '#fee2e2' }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  let cumulativeAngle = -Math.PI / 2;

  return (
    <div className="relative">
      <svg 
        className="w-64 h-64" 
        viewBox="0 0 100 100"
        onMouseMove={handleMouseMove}
      >
        {data.map((segment, index) => {
          const angle = (segment.value / total) * 2 * Math.PI;
          const startAngle = cumulativeAngle;
          const endAngle = cumulativeAngle + angle;
          
          const outerRadius = 36;
          const innerRadius = 20;
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

const BarChart: React.FC = () => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const data: ChartData[] = [
    { label: 'Strengths', value: 30, color: '#d8b4d8', lightColor: '#d8b4d8' },
    { label: 'Weaknesses', value: 55, color: '#a8d4a8', lightColor: '#a8d4a8' },
    { label: 'Opportunities', value: 22, color: '#f5d982', lightColor: '#f5d982' },
    { label: 'Threats', value: 13, color: '#e6c2a6', lightColor: '#e6c2a6' }
  ];

  const maxValue = 60; // Set max to 60 to match the chart scale

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="w-full h-80 relative bg-gray-50 rounded-lg">
      {/* Y-axis labels */}
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-8">
        <div>60</div>
        <div>50</div>
        <div>40</div>
        <div>30</div>
        <div>20</div>
        <div>10</div>
        <div>0</div>
      </div>

      {/* Grid lines */}
      <div className="absolute left-8 right-4 top-8 bottom-12">
        <div className="h-full relative">
          {[60, 50, 40, 30, 20, 10, 0].map((value, index) => (
            <div 
              key={value} 
              className="absolute w-full border-t border-gray-300"
              style={{ top: `${(index / 6) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Chart area */}
      <div className="ml-8 mr-4 absolute top-8 bottom-12 left-0 right-0 flex items-end justify-center space-x-8" onMouseMove={handleMouseMove}>
        {data.map((item) => (
          <div key={item.label} className="flex flex-col items-center h-full justify-end">
            <div 
              className="w-20 cursor-pointer relative transition-all duration-200 flex items-center justify-center"
              style={{ 
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color,
              }}
              onMouseEnter={() => setHoveredBar(item.label)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <div className="text-gray-700 font-medium text-sm">
                {item.value}
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-3 text-center font-medium absolute bottom-[-20px]">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredBar && (
        <div
          className="fixed z-50 bg-white border border-gray-300 shadow-lg px-3 py-2 rounded-md pointer-events-none text-sm"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 50,
          }}
        >
          <div className="font-medium text-gray-700">
            {hoveredBar}: {data.find(d => d.label === hoveredBar)?.value}
          </div>
        </div>
      )}
    </div>
  );
};

const SWOTSection: React.FC<{ title: string; bgColor: string; textColor: string; items: string[] }> = ({ 
  title, 
  bgColor, 
  textColor,
  items 
}) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className={`${bgColor} px-4 py-3 rounded-t-lg flex items-center justify-between`}>
        <div className="flex items-center space-x-2">
          <div className={`w-6 h-6 ${textColor} bg-white rounded-full flex items-center justify-center text-xs font-semibold`}>
            {title.charAt(0)}
          </div>
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between px-2 py-1 rounded relative">
              <span className="text-gray-700 text-sm">{item}</span>
              <div className="relative">
                <button 
                  className="text-gray-400 hover:text-gray-600 p-1"
                  onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {activeDropdown === index && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[100px]">
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Edit
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
type SectionType = (typeof swotSectionsData)[number];
const SWOTAnalysis: React.FC = () => {

const [sections] = useState(swotSectionsData);
  const [activeSection, setActiveSection] = useState<SectionType | null>(null);
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleMoreInfoClick = (sectionId: string) => {
    const foundSection = sections.find((sec) => sec.id === sectionId);
    if (foundSection) {
      setIsModalOpen(false); // Close the modal first
      setDescription(""); // Reset description
      setActiveSection(foundSection);
      setOpenDrawerId(foundSection.id); // Then open the drawer
    }
  };

  const handleCloseDrawer = () => {
    setOpenDrawerId(null);
  };

  const handleGetStartedClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDescription(""); // Reset description on close
    setOpenDrawerId(null); // Close drawer if open when modal closes
  };

  const handleSave = () => {
    // Handle save logic here (e.g., save to state or API)
    console.log("Saved:", { category, description });
    handleCloseModal();
  };





  const strengthsItems = [
    "This is a test for Strength",
    "This is a test for Strength", 
    "This is a test for Strength",
    "This is a test for Strength"
  ];

  const weaknessesItems = [
    "This is a test for Weakness",
    "This is a test for Weakness",
    "This is a test for Weakness"
  ];

  const threatsItems = [
    "This is a test for Threat",
    "This is a test for Threat"
  ];

  const opportunitiesItems = [
    "This is a test for Opportunity",
    "This is a test for Opportunity",
    "This is a test for Opportunity"
  ];

  return (
    <div className="min-h-screen bg-white my-8 p-6">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">SWOT Analysis</h1>
            <p className="text-gray-600 text-sm leading-relaxed max-w-4xl">
              Identify the most significant <span className="text-blue-600">risks and uncertainties</span> in the market to formulate a robust risk mitigation strategy. Evaluate our preparedness to adapt to different scenarios and potential disruptions, ensuring <span className="text-blue-600">resilience and agility</span> in the face of uncertainties.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              ClearAI Recommendation
            </button>
            <button 
            onClick={handleGetStartedClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Add New SWOT
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Grid3X3 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Donut Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-center mb-4">
              <DonutChart />
            </div>
            <div className="flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-sm text-gray-600">Strengths</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-600">Weaknesses</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">Opportunities</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600">Threats</span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-end mb-4 space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-purple-300"></div>
                <span>Strengths</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-green-300"></div>
                <span>Weaknesses</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                <span>Opportunities</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-orange-300"></div>
                <span>Threats</span>
              </div>
            </div>
            <BarChart />
          </div>
        </div>

        {/* SWOT Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SWOTSection 
            title="Strengths" 
            bgColor="bg-green-600" 
            textColor="text-green-600"
            items={strengthsItems}
          />
          <SWOTSection 
            title="Weaknesses" 
            bgColor="bg-yellow-500" 
            textColor="text-yellow-600"
            items={weaknessesItems}
          />
          <SWOTSection 
            title="Threats" 
            bgColor="bg-red-500" 
            textColor="text-red-600"
            items={threatsItems}
          />
          <SWOTSection 
            title="Opportunities" 
            bgColor="bg-blue-500" 
            textColor="text-blue-600"
            items={opportunitiesItems}
          />
        </div>


        {/* Drawer */}
          {activeSection && (
            <Drawer
              isOpen={openDrawerId === activeSection.id}
              onClose={handleCloseDrawer}
              title={activeSection.title}
            >
              <div
                className="p-4 bg-white text-gray-700 space-y-6"
                dangerouslySetInnerHTML={{
                  __html: activeSection.drawerContent.description,
                }}
              />
            </Drawer>
          )}

    {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div
                className="bg-[#1D2A6D] rounded-lg w-full max-w-3xl shadow-lg"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                <div className="p-3 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-white">SWOT Analysis</h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-white text-xl hover:text-gray-200"
                  >
                    ×
                  </button>
                </div>
                <div className="p-5 bg-white rounded-b-lg">
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    >
                      <option>Strengths</option>
                      <option>Weaknesses</option>
                      <option>Threats</option>
                      <option>Opportunities</option>
                      
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700">Describe</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mt-1 h-24"
                      placeholder="Describe"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => handleMoreInfoClick("swot")}
                      className="text-[#22398A] font-semibold hover:underline"
                    >
                      More info
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-[#1D2A6D] text-white px-6 py-2 rounded-lg hover:bg-[#22398A]"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}


      </div>
    </div>
  );
};

export default SWOTAnalysis;