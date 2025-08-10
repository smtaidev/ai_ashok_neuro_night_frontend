"use client";

import { useState } from "react";
import { FiGrid } from "react-icons/fi";
import { GoRows } from "react-icons/go";
import { MdOutlineBarChart } from 'react-icons/md';
import BusinessGoalImpactSummary from "./BusinessGoalImpactSummary";
import BusinessGoalsModal from "./BusinessGoalsModal";
import GanttView from "./views/GanttView";
import GoalCard from "./views/GoalCard";

// Remove useState from here. The state will be declared inside the component.

const handleSave = (data: any) => {
  console.log("Business Goal Submitted: =====================>", data);
}


// ব্যবসায়িক লক্ষ্যের জন্য TypeScript ইন্টারফেস সংজ্ঞায়িত করা
export interface Goal {
  id: number;
  title: string;
  subtitle: string;
  priority: string;
  status: string;
  category: string;
  progressLabel: string;
  progressValue: number;
  startDate?: Date;
  endDate?: Date;
  completionPercentage?: number;
}

// মাস এবং দিনের ডেটা ইন্টারফেস
interface MonthData {
  name: string;
  days: number;
  startIndex: number;
}

// একটি গ্যান্ট চার্ট আইটেমের জন্য কম্পোনেন্ট
const GanttRow = ({ goal, monthsData, totalDays }: { 
  goal: Goal; 
  monthsData: MonthData[];
  totalDays: number;
}) => {
  // প্রজেক্টের শুরু এবং শেষের দিন গণনা (ডেমো উদ্দেশ্যে র্যান্ডম)
  const startDay = Math.floor(Math.random() * 30) + 1;
  const duration = Math.floor(Math.random() * 60) + 20; // ২০-৮০ দিনের মধ্যে
  const endDay = Math.min(startDay + duration, totalDays);
  
  // গ্যান্ট বারের শতাংশ অবস্থান এবং প্রস্থ গণনা
  const leftPercentage = (startDay / totalDays) * 100;
  const widthPercentage = ((endDay - startDay) / totalDays) * 100;
  
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      {/* প্রজেক্ট নাম কলাম */}
      <td className="sticky left-0 bg-white px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200 min-w-[120px]">
        {goal.title}
      </td>
      
      {/* গ্যান্ট চার্ট এরিয়া */}
      <td className="relative h-12 p-0">
        <div className="relative h-full w-full">
          {/* গ্যান্ট বার */}
          <div
            className="absolute top-2 h-6 bg-blue-600 rounded-sm flex items-center justify-end pr-2"
            style={{
              left: `${leftPercentage}%`,
              width: `${widthPercentage}%`,
              minWidth: '40px'
            }}
          >
            {/* সমাপ্তির শতাংশ টেক্সট */}
            <span className="text-xs text-white font-medium">
              {goal.progressValue}%
            </span>
          </div>
        </div>
      </td>
    </tr>
  );
};

// গ্যান্ট চার্ট ভিউ কম্পোনেন্ট


// রো বা গ্রিড ফরম্যাটে একটি গোল প্রদর্শনের জন্য কম্পোনেন্ট


// বার চার্ট-এর মতো ফরম্যাটে গোল প্রদর্শনের জন্য সরলীকৃত কম্পোনেন্ট
const BarViewCard = ({ goal }: { goal: Goal }) => (
  <div className="flex flex-col rounded-md bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">{goal.title}</h3>
      <span className="text-sm font-medium text-gray-500">{goal.progressValue}%</span>
    </div>
    <div className="mt-2 h-4 w-full overflow-hidden rounded-md bg-gray-200">
      <div
        className="h-full rounded-md bg-blue-900 transition-all duration-300 ease-in-out"
        style={{ width: `${goal.progressValue}%` }}
      />
    </div>
  </div>
);

// "Structure View" এর জন্য নতুন কম্পোনেন্ট
const StructureViewCard = ({ goal, isStrategicTheme }: { goal: Goal; isStrategicTheme?: boolean; }) => {
  let scoreColor = '';
  switch (goal.id) {
    case 1:
      scoreColor = 'text-green-600 bg-green-100'; // Strategic Theme
      break;
    case 2:
      scoreColor = 'text-yellow-600 bg-yellow-100'; // Business Goal
      break;
    case 3:
      scoreColor = 'text-green-600 bg-green-100'; // Business Goal
      break;
    case 4:
      scoreColor = 'text-red-600 bg-red-100'; // Business Goal
      break;
    case 5:
      scoreColor = 'text-yellow-600 bg-yellow-100'; // Business Goal
      break;
    default:
      scoreColor = 'text-gray-600 bg-gray-100';
  }

  const scoreText = "10/10";
  const percentage = `${goal.progressValue}%`;
  const title = isStrategicTheme ? "Strategic Theme Name" : "Business Goal Name";

  return (
    <div className="relative rounded-lg border border-gray-300 bg-white p-4 shadow-md w-64 h-24 flex items-center justify-between">
      <div className="absolute top-2 left-2 flex items-center space-x-2">
        <span className={`rounded-md px-2 py-1 text-xs font-semibold ${scoreColor}`}>
          {scoreText}
        </span>
        <span className={`rounded-md px-2 py-1 text-xs font-semibold ${scoreColor}`}>
          {percentage}
        </span>
      </div>
      <h4 className="mt-8 text-center w-full font-semibold">{title}</h4>
    </div>
  );
};

const AfterBusinessGoal = () => {
  // Modal open state moved here
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // ডেমো উদ্দেশ্যে মক ডেটা।
  const mockData: Goal[] = [
    { id: 1, title: "Strategic Theme", subtitle: "Main Theme", priority: "High", status: "Overdue", category: "Finance", progressLabel: "Financial", progressValue: 82 },
    { id: 2, title: "Project 1", subtitle: "Goal 1", priority: "Urgent", status: "Overdue", category: "Finance", progressLabel: "Financial", progressValue: 55 },
    { id: 3, title: "Project 2", subtitle: "Goal 2", priority: "Urgent", status: "Overdue", category: "Finance", progressLabel: "Financial", progressValue: 35 },
    { id: 4, title: "Project 3", subtitle: "Goal 3", priority: "High", status: "Overdue", category: "Finance", progressLabel: "Financial", progressValue: 55 },
    { id: 5, title: "Project 4", subtitle: "Goal 4", priority: "Urgent", status: "Overdue", category: "Finance", progressLabel: "Financial", progressValue: 75 },
    { id: 6, title: "Project 5", subtitle: "Goal 5", priority: "Urgent", status: "Overdue", category: "Finance", progressLabel: "Financial", progressValue: 65 },
  ];

  const [goals, setGoals] = useState<Goal[]>(mockData);
  const [viewMode, setViewMode] = useState<'row' | 'structure' | 'gantt'| 'summary'>('gantt');

  // শর্তসাপেক্ষ রেন্ডারিং: কোনো গোল পাওয়া না গেলে একটি বার্তা দেখান।
  if (goals.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center text-gray-500 shadow">
        No data found. Please add a business goal.
      </div>
    );
  }
  // গোলের তালিকা রেন্ডার করুন।
  // গোলের তালিকা রেন্ডার করুন।


  // গোল সহ প্রধান পৃষ্ঠার বিষয়বস্তু রেন্ডার করুন।
  return (
    <div className="min-h-screen bg-white rounded-2xl p-4 sm:p-5 lg:p-6 font-sans text-gray-800">
  <div className="space-y-6">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Title */}
      <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-center md:text-left">
        Business Goals
      </h1>

      {/* Buttons Group */}
      <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-2">
        {/* Summary + Add New */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            className="border border-black rounded-md bg-white px-4 py-2 text-sm font-medium hover:bg-black/90 hover:text-white cursor-pointer w-full sm:w-auto"
            onClick={() => setViewMode('summary')}
          >
            Business Goal Impact Summary
          </button>
          <button 
           onClick={() => setIsModalOpen(true)}
          className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-950 w-full sm:w-auto">
            Add New Business Goal
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center sm:justify-start gap-2 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('row')}
            className={`cursor-pointer ${viewMode === 'row' ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500 transition-colors duration-200`}
          >
            <GoRows size={25} />
          </button>
          <button
            onClick={() => setViewMode('structure')}
            className={`cursor-pointer ${viewMode === 'structure' ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500 transition-colors duration-200`}
          >
            <FiGrid size={25} />
          </button>
          <button
            onClick={() => setViewMode('gantt')}
            className={`cursor-pointer ${viewMode === 'gantt' ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500 transition-colors duration-200`}
          >
            <MdOutlineBarChart size={25} />
          </button>
        </div>
      </div>
    </div>

    {/* View & Filter Section */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h2 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
        {viewMode === 'row' && 'Row View'}
        {viewMode === 'structure' && 'Structure View'}
        {viewMode === 'gantt' && 'Gantt View'}
        {viewMode === 'summary' && 'Business Goal Impact Summary'}
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <select className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
          <option>Filter by Priority</option>
          <option>Urgent</option>
          <option>High</option>
        </select>
        <select className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
          <option>Filter by Status</option>
          <option>Overdue</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
    </div>

    {/* Conditional Content */}
    {viewMode === 'summary' && (
      <BusinessGoalImpactSummary/>
      // <div>skdj</div>
    )}

    {/* {viewMode === 'row' && (
      <div className="space-y-4">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    )} */}




    {viewMode === 'gantt' && <GanttView goals={[
  {
    id: 1,
    title: "Project 1",
    goalTimelineStart: "2025-02-03",
    goalTimelineEnd: "2025-02-25",
    goalProgress: "55",
  },
  {
    id: 2,
    title: "Project 2",
    goalTimelineStart: "2025-03-01",
    goalTimelineEnd: "2025-03-10",
    goalProgress: "35",
  },
  // {
  //   id: 2,
  //   title: "Project 2",
  //   goalTimelineStart: "2025-04-01",
  //   goalTimelineEnd: "2025-05-15",
  //   goalProgress: "35",
  // },
  // {
  //   id: 2,
  //   title: "Project 2",
  //   goalTimelineStart: "2025-01-01",
  //   goalTimelineEnd: "2025-03-15",
  //   goalProgress: "75",
  // }
]}  />}

    {viewMode === 'structure' && (
      <div className="relative p-4 sm:p-8 overflow-x-auto">
        {/* SVG connectors */}
        <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
          <line x1="260" y1="96" x2="350" y2="96" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="350" y1="96" x2="350" y2="444" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="350" y1="96" x2="360" y2="96" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="350" y1="216" x2="360" y2="216" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="350" y1="336" x2="360" y2="336" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="350" y1="444" x2="360" y2="444" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="628" y1="96" x2="710" y2="96" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="710" y1="96" x2="710" y2="216" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="710" y1="216" x2="720" y2="216" stroke="#9CA3AF" strokeWidth="2" />
        </svg>

        {/* Structure Layout */}
        <div className="flex flex-row space-x-8 md:space-x-16">
          <div className="flex flex-col">
            <StructureViewCard goal={goals[0]} isStrategicTheme={true} />
          </div>
          <div className="flex flex-col space-y-8 md:space-y-12 mt-8">
            <StructureViewCard goal={goals[1]} />
            <StructureViewCard goal={goals[2]} />
            <StructureViewCard goal={goals[4]} />
            <StructureViewCard goal={goals[5]} />
          </div>
          <div className="flex flex-col space-y-8 md:space-y-12 mt-8">
            <StructureViewCard goal={goals[2]} />
            <StructureViewCard goal={goals[3]} />
          </div>
        </div>
      </div>
    )}
  </div>
     <BusinessGoalsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
</div>

  );
};

export default AfterBusinessGoal;