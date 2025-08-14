"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const StrategicThemeData = () => {
  // State for the dynamic data, making it easy to update.
  const [themes, setThemes] = useState([
    { id: 1, title: 'Data as an asset', goalConnection: 19, accomplishedGoals: 15 },
    { id: 2, title: 'Global expansion', goalConnection: 12, accomplishedGoals: 7 },
    { id: 3, title: 'Brand Awareness', goalConnection: 5, accomplishedGoals: 2 },
    { id: 4, title: 'Brand Awareness', goalConnection: 5, accomplishedGoals: 2 },
  ]);

  // Calculate the total number of themes from the state
  const totalThemes = themes.length;

  return (
   
      <div className="bg-white rounded-2xl shadow-xl  w-full  flex flex-row overflow-y-auto scroll-auto">
        {/* Left column - Strategic Themes count */}
        <div className="flex flex-col items-center w-[30%] p-6 border-r border-gray-200">
          <h2 className="text-lg md:text-xl xl:text-[24px] font-bold p-6 text-gray-700 mb-4">Strategic Themes</h2>
          <div className='p-2 bg-blue-100 rounded-full '>

          <div className="flex items-center justify-center w-32 h-32 rounded-full bg-blue-800 text-white font-bold text-5xl shadow-lg">
            {totalThemes}
          </div>
          </div>
        </div>

        {/* Right column - Themes table */}
        <div className="flex-1 w-full border-l  border-gray-200 ">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_2fr_1.5fr_1.5fr] gap-4 pb-4 pt-6 border-b pr-6 border-gray-200 text-gray-500 font-semibold">
            <span></span> {/* Placeholder for ID */}
            <span>Title</span>
            <span className="text-center">Goal Connection</span>
            <span className="text-center">Accomplished Goals</span>
          </div>

          {/* Table content rows */}
          <div className="space-y-4 pt-4 pr-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className="grid pl-2 grid-cols-[1fr_2fr_1.5fr_1.5fr] items-center gap-4 py-2 border-b border-gray-100"
              >
                {/* ID number */}
                <span className="text-sm font-bold text-gray-400">
                  {String(theme.id).padStart(2, '0')}
                </span>
                
                {/* Theme Title */}
                <span className="text-gray-800 font-medium">{theme.title}</span>
                
                {/* Goal Connection */}
                <span className="text-center text-gray-600 font-medium">
                  {theme.goalConnection}
                </span>
                
                {/* Accomplished Goals */}
                <span className="text-center text-gray-600">
                  <span className="font-medium text-gray-900">
                    {String(theme.accomplishedGoals).padStart(2, '0')}
                  </span> / {String(theme.goalConnection).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>

          {/* "Explore More" link */}
          <div className="flex justify-end mt-6 p-6 pr-8">
            <Link href="/dashboard/blueprint/strategic-themes" className="flex items-center gap-1 text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200">
              Explore More →
            </Link>
          </div>
        </div>
      </div>
    
  );
};

export default StrategicThemeData;
