"use client";
import React, { useState } from 'react';

const BusinessGoalsData = () => {
  // Define a type for a single business goal
  interface Goal {
    id: number;
    title: string;
    subTitle: string;
    goalTimeline: string;
    priority: 'High' | 'Medium' | 'Low';
    goalProgress: number; // Stored as a percentage value
  }

  // State for the dynamic data, making it easy to update.
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: 'Test Goal 1', subTitle: 'Brand Awareness', goalTimeline: '16 d 2 hr', priority: 'High', goalProgress: 50 },
    { id: 2, title: 'Test Goal 2', subTitle: 'Global expansion', goalTimeline: '25 d 12 hr', priority: 'Medium', goalProgress: 80 },
    { id: 3, title: 'Test Goal 3', subTitle: 'Global expansion', goalTimeline: '1 mo 3 d', priority: 'Low', goalProgress: 40 },
  ]);

  // Calculate the total number of goals
  const totalGoals = goals.length;

  // Function to get the priority pill color
  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High':
        return 'bg-pink-100 text-pink-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full flex flex-row overflow-y-auto scroll-auto min-h-[300px]">
      {/* Left column - Business Goals count */}
      <div className="flex flex-col items-center w-[30%] p-6 border-r border-gray-200">
        <h2 className="text-lg md:text-xl xl:text-[24px] font-bold p-6 text-gray-700 mb-4">Business Goals</h2>
        <div className='p-2 bg-blue-100 rounded-full '>
          <div className="flex items-center justify-center w-32 h-32 rounded-full bg-blue-800 text-white font-bold text-5xl shadow-lg">
            {totalGoals}
          </div>
        </div>
      </div>

      {/* Right column - Goals table */}
      <div className="flex-1 w-full border-l border-gray-200 overflow-x-auto">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_2fr_1.5fr_1.5fr_1.5fr] gap-4 pb-4 pt-6 border-b pr-6 border-gray-200 text-gray-500 font-semibold whitespace-nowrap">
          <span></span> {/* Placeholder for ID */}
          <span>Title</span>
          <span>Goal Timeline</span>
          <span>Priority</span>
          <span>Goal Progress</span>
        </div>

        {/* Table content rows */}
        <div className="space-y-4 pt-4 pr-4 max-h-[400px] overflow-y-auto">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="grid pl-2 grid-cols-[1fr_2fr_1.5fr_1.5fr_1.5fr] items-center gap-4 py-2 border-b border-gray-100 whitespace-nowrap"
            >
              {/* ID number */}
              <span className="text-sm font-bold text-gray-400">
                {String(goal.id).padStart(2, '0')}
              </span>
              
              {/* Goal Title */}
              <div className="flex flex-col">
                <span className="text-gray-800 font-medium whitespace-nowrap overflow-hidden text-ellipsis">{goal.title}</span>
                <span className="text-gray-500 text-xs whitespace-nowrap overflow-hidden text-ellipsis">{goal.subTitle}</span>
              </div>
              
              {/* Goal Timeline */}
              <span className="text-gray-600 font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                {goal.goalTimeline}
              </span>

              {/* Priority */}
              <span className="text-center">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(goal.priority)}`}>
                  {goal.priority}
                </span>
              </span>

              {/* Goal Progress */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-sm">{goal.goalProgress}%</span>
                <div className="w-full bg-gray-200 rounded-sm h-4">
                  <div className="bg-blue-800 h-4 rounded-sm" style={{ width: `${goal.goalProgress}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "Explore More" link */}
        <div className="flex justify-end mt-6 p-6 pr-8">
          <a href="/dashboard/blueprint/business-goals" className="flex items-center gap-1 text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200">
            Explore More →
          </a>
        </div>
      </div>     
    </div>
  );
};

export default BusinessGoalsData;