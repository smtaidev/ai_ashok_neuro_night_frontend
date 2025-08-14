




// "use client";
// import React, { useState } from 'react';
// import { MoreVertical, Grid3X3, Menu } from 'lucide-react';
// import { swotSectionsData } from '@/app/dashboard/foundation/_components/dummyData';
// import Drawer from '@/app/dashboard/blueprint/vision/_comoponents/DrawarModal';
// import { BsFillGridFill } from 'react-icons/bs';
// import { PiSquareSplitHorizontalFill } from "react-icons/pi";
// import { useCreateSwotMutation, useGetSwotsQuery } from '@/redux/api/swot/swotApi';
// import toast from 'react-hot-toast';


// interface ChartData {
//   label: string;
//   value: number;
//   color: string;
//   lightColor: string;
// }

// const DonutChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
//   const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   const total = data.reduce((sum, item) => sum + item.value, 0);

//   const handleMouseMove = (e: React.MouseEvent) => {
//     setMousePosition({ x: e.clientX, y: e.clientY });
//   };

//   let cumulativeAngle = -Math.PI / 2;

//   return (
//     <div className="relative">
//       <svg 
//         className="w-64 mh-64" 
//         viewBox="0 0 100 100"
//         onMouseMove={handleMouseMove}
//       >
//         {data.map((segment, index) => {
//           const angle = (segment.value / total) * 2 * Math.PI;
//           const startAngle = cumulativeAngle;
//           const endAngle = cumulativeAngle + angle;
          
//           const outerRadius = 36;
//           const innerRadius = 20;
//           const centerX = 50;
//           const centerY = 50;
          
//           const startXOuter = (centerX + outerRadius * Math.cos(startAngle)).toFixed(10);
//           const startYOuter = (centerY + outerRadius * Math.sin(startAngle)).toFixed(10);
//           const endXOuter = (centerX + outerRadius * Math.cos(endAngle)).toFixed(10);
//           const endYOuter = (centerY + outerRadius * Math.sin(endAngle)).toFixed(10);
          
//           const startXInner = (centerX + innerRadius * Math.cos(startAngle)).toFixed(10);
//           const startYInner = (centerY + innerRadius * Math.sin(startAngle)).toFixed(10);
//           const endXInner = (centerX + innerRadius * Math.cos(endAngle)).toFixed(10);
//           const endYInner = (centerY + innerRadius * Math.sin(endAngle)).toFixed(10);
          
//           const largeArcFlag = angle <= Math.PI ? "0" : "1";
          
//           const pathData = [
//             `M ${startXOuter} ${startYOuter}`,
//             `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endXOuter} ${endYOuter}`,
//             `L ${endXInner} ${endYInner}`,
//             `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startXInner} ${startYInner}`,
//             'Z'
//           ].join(' ');
          
//           cumulativeAngle += angle;
          
//           return (
//             <path
//               key={segment.label}
//               d={pathData}
//               fill={segment.color}
//               className="cursor-pointer transition-opacity duration-200"
//               style={{
//                 opacity: hoveredSegment && hoveredSegment !== segment.label ? 0.6 : 1,
//               }}
//               onMouseEnter={() => setHoveredSegment(segment.label)}
//               onMouseLeave={() => setHoveredSegment(null)}
//             />
//           );
//         })}
//       </svg>
      
//       {hoveredSegment && (
//         <div
//           className="fixed z-50 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg pointer-events-none text-sm"
//           style={{
//             left: mousePosition.x + 10,
//             top: mousePosition.y - 40,
//           }}
//         >
//           {hoveredSegment}: {data.find(d => d.label === hoveredSegment)?.value}
//         </div>
//       )}
//     </div>
//   );
// };

// const BarChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
//   const [hoveredBar, setHoveredBar] = useState<string | null>(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   const maxValue = Math.max(60, ...data.map(d => d.value));

//   const handleMouseMove = (e: React.MouseEvent) => {
//     setMousePosition({ x: e.clientX, y: e.clientY });
//   };

//   return (
//     <div className="w- md:w-full  h-80 relative bg-gray-50 rounded-lg">
//       {/* Y-axis labels */}
//       <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-8">
//         <div>{maxValue}</div>
//         <div>{Math.floor(maxValue * 5/6)}</div>
//         <div>{Math.floor(maxValue * 4/6)}</div>
//         <div>{Math.floor(maxValue * 3/6)}</div>
//         <div>{Math.floor(maxValue * 2/6)}</div>
//         <div>{Math.floor(maxValue * 1/6)}</div>
//         <div>0</div>
//       </div>

//       {/* Grid lines */}
//       <div className="absolute left-8 right-4 top-8 bottom-12">
//         <div className="h-full relative">
//           {[6,5,4,3,2,1,0].map((_, index) => (
//             <div 
//               key={index} 
//               className="absolute w-full border-t border-gray-300"
//               style={{ top: `${(index / 6) * 100}%` }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Chart area */}
//       <div className="ml-8 mr-4 absolute top-8 bottom-12 left-0 right-0 flex items-end justify-center space-x-8" onMouseMove={handleMouseMove}>
//         {data.map((item) => (
//           <div key={item.label} className="flex flex-col items-center h-full justify-end">
//             <div 
//               className="w-20 cursor-pointer relative transition-all duration-200 flex items-center justify-center"
//               style={{ 
//                 height: `${(item.value / maxValue) * 100}%`,
//                 backgroundColor: item.color,
//               }}
//               onMouseEnter={() => setHoveredBar(item.label)}
//               onMouseLeave={() => setHoveredBar(null)}
//             >
//               <div className="text-gray-700 font-medium text-sm">
//                 {item.value}
//               </div>
//             </div>
//             <div className="text-xs text-gray-600 mt-3 text-center font-medium absolute bottom-[-20px]">{item.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Tooltip */}
//       {hoveredBar && (
//         <div
//           className="fixed z-50 bg-white border border-gray-300 shadow-lg px-3 py-2 rounded-md pointer-events-none text-sm"
//           style={{
//             left: mousePosition.x + 10,
//             top: mousePosition.y - 50,
//           }}
//         >
//           <div className="font-medium text-gray-700">
//             {hoveredBar}: {data.find(d => d.label === hoveredBar)?.value}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const SWOTSection: React.FC<{ title: string; bgColor: string; textColor: string; items: string[] }> = ({ 
//   title, 
//   bgColor, 
//   textColor,
//   items 
// }) => {
//   const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

//   return (
//     <div className="bg-white rounded-lg border border-gray-200">
//       <div className={`${bgColor} px-4 py-3 rounded-t-lg flex items-center justify-between`}>
//         <div className="flex items-center space-x-2">
//           <div className={`w-6 h-6 ${textColor} bg-white rounded-full flex items-center justify-center text-xs font-semibold`}>
//             {title.charAt(0)}
//           </div>
//           <h3 className="font-semibold text-white">{title}</h3>
//         </div>
//       </div>
//       <div className="p-4">
//         <div className="space-y-3">
//           {items.map((item, index) => (
//             <div key={index} className="flex items-center justify-between px-2 py-1 rounded relative">
//               <span className="text-gray-700 text-sm">{item}</span>
//               <div className="relative">
//                 <button 
//                   className="text-gray-400 hover:text-gray-600 p-1"
//                   onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
//                 >
//                   <MoreVertical className="w-4 h-4" />
//                 </button>
//                 {activeDropdown === index && (
//                   <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[100px]">
//                     <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                       Edit
//                     </button>
//                     <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50">
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// type SectionType = (typeof swotSectionsData)[number];
// const SWOTAnalysis: React.FC = () => {

// const [sections] = useState(swotSectionsData);
//   const [activeSection, setActiveSection] = useState<SectionType | null>(null);
//   const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [viewMode, setViewMode] = useState<'grid' | 'split'>('grid');

//   const [createSwot, {isLoading}] = useCreateSwotMutation();

//   const {data: swotData} = useGetSwotsQuery();

//   console.log( "swot data",swotData? swotData.data : "No data available");

  

//   const swot = swotData?.data?.[0];

//   const strengthsItems = swot?.strengths?.map((s: any) => s.details || s) || [];
//   const weaknessesItems = swot?.weaknesses?.map((w: any) => w.details || w) || [];
//   const opportunitiesItems = swot?.opportunities?.map((o: any) => o.details || o) || [];
//   const threatsItems = swot?.threats?.map((t: any) => t.details || t) || [];

//   const donutChartData: ChartData[] = [
//     { label: 'Strengths', value: strengthsItems.length, color: '#16a34a', lightColor: '#dcfce7' },
//     { label: 'Weaknesses', value: weaknessesItems.length, color: '#eab308', lightColor: '#fef3c7' },
//     { label: 'Opportunities', value: opportunitiesItems.length, color: '#3b82f6', lightColor: '#dbeafe' },
//     { label: 'Threats', value: threatsItems.length, color: '#ef4444', lightColor: '#fee2e2' }
//   ];

//   const barChartData: ChartData[] = [
//     { label: 'Strengths', value: strengthsItems.length, color: '#d8b4d8', lightColor: '#d8b4d8' },
//     { label: 'Weaknesses', value: weaknessesItems.length, color: '#a8d4a8', lightColor: '#a8d4a8' },
//     { label: 'Opportunities', value: opportunitiesItems.length, color: '#f5d982', lightColor: '#f5d982' },
//     { label: 'Threats', value: threatsItems.length, color: '#e6c2a6', lightColor: '#e6c2a6' }
//   ];

//   const handleMoreInfoClick = (sectionId: string) => {
//     const foundSection = sections.find((sec) => sec.id === sectionId);
//     if (foundSection) {
//       setIsModalOpen(false); // Close the modal first
//       setDescription(""); // Reset description
//       setActiveSection(foundSection);
//       setOpenDrawerId(foundSection.id); // Then open the drawer
//     }
//   };

//   const handleCloseDrawer = () => {
//     setOpenDrawerId(null);
//   };

//   const handleGetStartedClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setDescription(""); // Reset description on close
//     setOpenDrawerId(null); // Close drawer if open when modal closes
//   };

//   const handleSave = async () => {
//     if (!category || !description) {
//       toast.error("Please fill in both fields before saving.");
//       return;
//     }

//     try {
//       const payload = {
//         categoryName: category.toLowerCase(),
//         details: description.trim(),
//       };

//       const result = await createSwot(payload).unwrap();
//       toast.success("SWOT created successfully:");
      
//       // Reset form & close modal
//       setCategory("");
//       setDescription("");
//       handleCloseModal();
//     } catch (error) {
//       toast.error("Failed to create SWOT:");
//     }
//   };

//   return (
//     <div className="min-h-screen rounded-xl bg-white my-8 p-6">
//       <div className="">
//         {/* Header */}
//         <div className="md:flex justify-between space-y-3 items-start mb-6">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-900 mb-2">SWOT Analysis</h1>
//             <p className="text-gray-600 text-sm leading-relaxed max-w-4xl">
//               Identify the most significant <span className="text-blue-600">risks and uncertainties</span> in the market to formulate a robust risk mitigation strategy. Evaluate our preparedness to adapt to different scenarios and potential disruptions, ensuring <span className="text-blue-600">resilience and agility</span> in the face of uncertainties.
//             </p>
//           </div>
//           <div className="md:flex md:flex-col  items-start space-y-3">
//             <div>
//               <button className="px-4 py-2 border cursor-pointer  border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
//               ClearhetAI Recommendations
//             </button>
//             </div>
//             <div className='flex justify-center items-start space-x-3'>
//               <button
//               onClick={handleGetStartedClick}
//               className="bg-[#22398A] text-white px-4 py-2  rounded-lg cursor-pointer hover:bg-[#1D2A6D]">
//               Add New SWOT
//             </button>
//             <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setViewMode('grid')}>
//               <BsFillGridFill className="w-5 h-5 cursor-pointer text-gray-600" />
//             </button>
//             <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setViewMode('split')}>
//               <PiSquareSplitHorizontalFill className="w-5 h-5 cursor-pointer text-gray-600" />
//             </button>
//             </div>
//           </div>
//         </div>

//         {/* Charts Section */}
//         {viewMode === 'grid' && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             {/* Donut Chart */}
//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <div className="flex justify-center mb-4">
//                 <DonutChart data={donutChartData} />
//               </div>
//               <div className="md:flex justify-center space-x-6">
                
//                   <div className="flex items-center space-x-2">
//                   <div className="w-3 h-3 rounded-full bg-green-600"></div>
//                   <span className="text-sm text-gray-600">Strengths</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//                   <span className="text-sm text-gray-600">Weaknesses</span>
//                 </div>
                
              
//                 <div className="flex items-center space-x-2">
//                   <div className="w-3 h-3 rounded-full bg-blue-500"></div>
//                   <span className="text-sm text-gray-600">Opportunities</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                   <span className="text-sm text-gray-600">Threats</span>
//                 </div>
//               </div>
//             </div>

//             {/* Bar Chart */}
//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <div className="md:flex justify-end mb-4 space-x-4 text-xs">
//                 <div className="flex items-center space-x-1">
//                   <div className="w-3 h-3 rounded-full bg-purple-300"></div>
//                   <span>Strengths</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-3 h-3 rounded-full bg-green-300"></div>
//                   <span>Weaknesses</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
//                   <span>Opportunities</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <div className="w-3 h-3 rounded-full bg-orange-300"></div>
//                   <span>Threats</span>
//                 </div>
//               </div>
//               <BarChart data={barChartData} />
//             </div>
//           </div>
//         )}

//         {/* SWOT Sections */}
//         <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
//           <SWOTSection 
//             title="Strengths" 
//             bgColor="bg-green-600" 
//             textColor="text-green-600"
//             items={strengthsItems}
//           />
//           <SWOTSection 
//             title="Weaknesses" 
//             bgColor="bg-yellow-500" 
//             textColor="text-yellow-600"
//             items={weaknessesItems}
//           />
//           <SWOTSection 
//             title="Threats" 
//             bgColor="bg-red-500" 
//             textColor="text-red-600"
//             items={threatsItems}
//           />
//           <SWOTSection 
//             title="Opportunities" 
//             bgColor="bg-blue-500" 
//             textColor="text-blue-600"
//             items={opportunitiesItems}
//           />
//         </div>


//         {/* Drawer */}
//           {activeSection && (
//             <Drawer
//               isOpen={openDrawerId === activeSection.id}
//               onClose={handleCloseDrawer}
//               title={activeSection.title}
//             >
//               <div
//                 className="p-4 bg-white text-gray-700 space-y-6"
//                 dangerouslySetInnerHTML={{
//                   __html: activeSection.drawerContent.description,
//                 }}
//               />
//             </Drawer>
//           )}

//     {/* Modal */}
//           {isModalOpen && (
//             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//               <div
//                 className="bg-[#1D2A6D] rounded-lg w-full max-w-3xl shadow-lg"
//                 style={{ fontFamily: "Arial, sans-serif" }}
//               >
//                 <div className="p-3 flex justify-between items-center">
//                   <h2 className="text-lg font-semibold text-white">SWOT Analysis</h2>
//                   <button
//                     onClick={handleCloseModal}
//                     className="text-white text-xl hover:text-gray-200"
//                   >
//                     ×
//                   </button>
//                 </div>
//                 <div className="p-5 bg-white rounded-b-lg">
//                   <div className="mb-4">
//                     <label className="block text-sm text-gray-700">Category</label>
//                     <select
//                       value={category}
//                       onChange={(e) => setCategory(e.target.value)}
//                       className="w-full p-2 border border-gray-300 rounded mt-1"
//                     >
//                       <option>Strengths</option>
//                       <option>Weaknesses</option>
//                       <option>Threats</option>
//                       <option>Opportunities</option>
                      
//                     </select>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-sm text-gray-700">Describe</label>
//                     <textarea
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                       className="w-full p-2 border border-gray-300 rounded mt-1 h-24"
//                       placeholder="Describe"
//                     />
//                   </div>
//                   <div className="flex justify-end space-x-4">
//                     <button
//                       onClick={() => handleMoreInfoClick("swot")}
//                       className="text-[#22398A] font-semibold hover:underline"
//                     >
//                       More info
//                     </button>
//                     <button
//                       onClick={handleSave}
//                       className="bg-[#1D2A6D] text-white px-6 py-2 rounded-lg hover:bg-[#22398A]"
//                     >
//                      {isLoading ? "Saving..." : "Save"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}


//       </div>
//     </div>
//   );
// };

// export default SWOTAnalysis;




"use client";
import React, { useState } from 'react';
import { MoreVertical, Grid3X3, Menu, ChevronDown, ChevronUp } from 'lucide-react';
import { swotSectionsData } from '@/app/dashboard/foundation/_components/dummyData';
import Drawer from '@/app/dashboard/blueprint/vision/_comoponents/DrawarModal';
import { BsFillGridFill } from 'react-icons/bs';
import { PiSquareSplitHorizontalFill } from "react-icons/pi";
import { useCreateSwotMutation, useGetSwotsQuery, useUpdateSwotMutation, useDeleteSwotMutation } from '@/redux/api/swot/swotApi';
import toast from 'react-hot-toast';


interface ChartData {
  label: string;
  value: number;
  color: string;
  lightColor: string;
}

const DonutChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  let cumulativeAngle = -Math.PI / 2;

  return (
    <div className="relative">
      <svg 
        className="w-64 mh-64" 
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
          
          const startXOuter = (centerX + outerRadius * Math.cos(startAngle)).toFixed(10);
          const startYOuter = (centerY + outerRadius * Math.sin(startAngle)).toFixed(10);
          const endXOuter = (centerX + outerRadius * Math.cos(endAngle)).toFixed(10);
          const endYOuter = (centerY + outerRadius * Math.sin(endAngle)).toFixed(10);
          
          const startXInner = (centerX + innerRadius * Math.cos(startAngle)).toFixed(10);
          const startYInner = (centerY + innerRadius * Math.sin(startAngle)).toFixed(10);
          const endXInner = (centerX + innerRadius * Math.cos(endAngle)).toFixed(10);
          const endYInner = (centerY + innerRadius * Math.sin(endAngle)).toFixed(10);
          
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

const BarChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const maxValue = Math.max(60, ...data.map(d => d.value));

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="w- md:w-full  h-80 relative bg-gray-50 rounded-lg">
      {/* Y-axis labels */}
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-8">
        <div>{maxValue}</div>
        <div>{Math.floor(maxValue * 5/6)}</div>
        <div>{Math.floor(maxValue * 4/6)}</div>
        <div>{Math.floor(maxValue * 3/6)}</div>
        <div>{Math.floor(maxValue * 2/6)}</div>
        <div>{Math.floor(maxValue * 1/6)}</div>
        <div>0</div>
      </div>

      {/* Grid lines */}
      <div className="absolute left-8 right-4 top-8 bottom-12">
        <div className="h-full relative">
          {[6,5,4,3,2,1,0].map((_, index) => (
            <div 
              key={index} 
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

const SWOTSection: React.FC<{ 
  title: string; 
  bgColor: string; 
  textColor: string; 
  items: any[];
  onEdit: (item: any, index: number) => void;
  onDelete: (item: any, index: number) => void;
}> = ({ 
  title, 
  bgColor, 
  textColor,
  items,
  onEdit,
  onDelete
}) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayItems = showAll ? items : items.slice(0, 7);
  const hasMore = items.length > 7;

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
          {displayItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between px-2 py-1 rounded relative">
              <span className="text-gray-700 text-sm">{typeof item === 'string' ? item : item.details}</span>
              <div className="relative">
                <button 
                  className="text-gray-400 hover:text-gray-600 p-1"
                  onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {activeDropdown === index && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[100px]">
                    <button 
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        onEdit(item, showAll ? index : index);
                        setActiveDropdown(null);
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50"
                      onClick={() => {
                        onDelete(item, showAll ? index : index);
                        setActiveDropdown(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {hasMore && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <span>{showAll ? 'See Less' : 'See More'}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
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
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'split'>('grid');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [createSwot, {isLoading}] = useCreateSwotMutation();
  const [updateSwot, {isLoading: isUpdating}] = useUpdateSwotMutation();
  const [deleteSwot, {isLoading: isDeleting}] = useDeleteSwotMutation();

  const {data: swotData} = useGetSwotsQuery();

  console.log( "swot data",swotData? swotData.data : "No data available");

  const swot = swotData?.data?.[0];

  const strengthsItems = swot?.strengths?.map((s: any) => s.details || s) || [];
  const weaknessesItems = swot?.weaknesses?.map((w: any) => w.details || w) || [];
  const opportunitiesItems = swot?.opportunities?.map((o: any) => o.details || o) || [];
  const threatsItems = swot?.threats?.map((t: any) => t.details || t) || [];

  const donutChartData: ChartData[] = [
    { label: 'Strengths', value: strengthsItems.length, color: '#16a34a', lightColor: '#dcfce7' },
    { label: 'Weaknesses', value: weaknessesItems.length, color: '#eab308', lightColor: '#fef3c7' },
    { label: 'Opportunities', value: opportunitiesItems.length, color: '#3b82f6', lightColor: '#dbeafe' },
    { label: 'Threats', value: threatsItems.length, color: '#ef4444', lightColor: '#fee2e2' }
  ];

  const barChartData: ChartData[] = [
    { label: 'Strengths', value: strengthsItems.length, color: '#d8b4d8', lightColor: '#d8b4d8' },
    { label: 'Weaknesses', value: weaknessesItems.length, color: '#a8d4a8', lightColor: '#a8d4a8' },
    { label: 'Opportunities', value: opportunitiesItems.length, color: '#f5d982', lightColor: '#f5d982' },
    { label: 'Threats', value: threatsItems.length, color: '#e6c2a6', lightColor: '#e6c2a6' }
  ];

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
    setCategory("");
    setOpenDrawerId(null); // Close drawer if open when modal closes
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedItem(null);
    setSelectedIndex(0);
    setDescription("");
    setCategory("");
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
    setSelectedIndex(0);
  };

  const handleEdit = (item: any, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    setDescription(typeof item === 'string' ? item : item.details);
    
    // Determine category based on which array the item belongs to
    if (strengthsItems.includes(typeof item === 'string' ? item : item.details)) {
      setCategory('Strengths');
    } else if (weaknessesItems.includes(typeof item === 'string' ? item : item.details)) {
      setCategory('Weaknesses');
    } else if (opportunitiesItems.includes(typeof item === 'string' ? item : item.details)) {
      setCategory('Opportunities');
    } else if (threatsItems.includes(typeof item === 'string' ? item : item.details)) {
      setCategory('Threats');
    }
    
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (item: any, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async () => {
    if (!category || !description) {
      toast.error("Please fill in both fields before saving.");
      return;
    }

    try {
      const payload = {
        categoryName: category.toLowerCase(),
        details: description.trim(),
      };

      const result = await createSwot(payload).unwrap();
      toast.success("SWOT created successfully");
      
      // Reset form & close modal
      setCategory("");
      setDescription("");
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to create SWOT");
    }
  };

  const handleUpdate = async () => {
    if (!category || !description || !selectedItem) {
      toast.error("Please fill in all fields before updating.");
      return;
    }

    try {
      // Find the item ID - assuming the item has an id property
      const itemId = selectedItem.id || selectedItem._id;
      
      const payload = {
        categoryName: category.toLowerCase(),
        details: description.trim(),
      };

      await updateSwot({ id: itemId, ...payload }).unwrap();
      toast.success("SWOT updated successfully");
      
      handleCloseUpdateModal();
    } catch (error) {
      toast.error("Failed to update SWOT");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedItem) {
      toast.error("No item selected for deletion.");
      return;
    }

    try {
      // Find the item ID - assuming the item has an id property
      const itemId = selectedItem.id || selectedItem._id;
      
      await deleteSwot(itemId).unwrap();
      toast.success("SWOT deleted successfully");
      
      handleCloseDeleteModal();
    } catch (error) {
      toast.error("Failed to delete SWOT");
    }
  };

  return (
    <div className="min-h-screen rounded-xl bg-white my-8 p-6">
      <div className="">
        {/* Header */}
        <div className="md:flex justify-between space-y-3 items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">SWOT Analysis</h1>
            <p className="text-gray-600 text-sm leading-relaxed max-w-4xl">
              Identify the most significant <span className="text-blue-600">risks and uncertainties</span> in the market to formulate a robust risk mitigation strategy. Evaluate our preparedness to adapt to different scenarios and potential disruptions, ensuring <span className="text-blue-600">resilience and agility</span> in the face of uncertainties.
            </p>
          </div>
          <div className="md:flex md:flex-col  items-start space-y-3">
            <div>
              <button className="px-4 py-2 border cursor-pointer  border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              ClearhetAI Recommendations
            </button>
            </div>
            <div className='flex justify-center items-start space-x-3'>
              <button
              onClick={handleGetStartedClick}
              className="bg-[#22398A] text-white px-4 py-2  rounded-lg cursor-pointer hover:bg-[#1D2A6D]">
              Add New SWOT
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setViewMode('grid')}>
              <BsFillGridFill className="w-5 h-5 cursor-pointer text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setViewMode('split')}>
              <PiSquareSplitHorizontalFill className="w-5 h-5 cursor-pointer text-gray-600" />
            </button>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Donut Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-center mb-4">
                <DonutChart data={donutChartData} />
              </div>
              <div className="md:flex justify-center space-x-6">
                
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
              <div className="md:flex justify-end mb-4 space-x-4 text-xs">
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
              <BarChart data={barChartData} />
            </div>
          </div>
        )}

        {/* SWOT Sections */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          <SWOTSection 
            title="Strengths" 
            bgColor="bg-green-600" 
            textColor="text-green-600"
            items={strengthsItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <SWOTSection 
            title="Weaknesses" 
            bgColor="bg-yellow-500" 
            textColor="text-yellow-600"
            items={weaknessesItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <SWOTSection 
            title="Threats" 
            bgColor="bg-red-500" 
            textColor="text-red-600"
            items={threatsItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <SWOTSection 
            title="Opportunities" 
            bgColor="bg-blue-500" 
            textColor="text-blue-600"
            items={opportunitiesItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
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

        {/* Create Modal */}
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
                    <option value="">Select Category</option>
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
                    disabled={isLoading}
                  >
                   {isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Update Modal */}
        {isUpdateModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div
              className="bg-[#1D2A6D] rounded-lg w-full max-w-3xl shadow-lg"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <div className="p-3 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">Update SWOT Analysis</h2>
                <button
                  onClick={handleCloseUpdateModal}
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
                    onClick={handleCloseUpdateModal}
                    className="text-gray-600 font-semibold hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="bg-[#1D2A6D] text-white px-6 py-2 rounded-lg hover:bg-[#22398A]"
                    disabled={isUpdating}
                  >
                   {isUpdating ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div
              className="bg-white rounded-lg w-full max-w-md shadow-lg"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Delete SWOT Item</h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this item? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCloseDeleteModal}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    disabled={isDeleting}
                  >
                   {isDeleting ? "Deleting..." : "Delete"}
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