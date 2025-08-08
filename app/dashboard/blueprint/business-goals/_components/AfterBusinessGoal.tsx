"use client";
import { useState } from "react";
import { FiGrid } from "react-icons/fi";
import { GoRows } from "react-icons/go";
import { MdOutlineBarChart } from 'react-icons/md';
// প্রয়োজনীয় আইকন ইমপোর্ট করা হয়েছে

// ব্যবসায়িক লক্ষ্যের জন্য TypeScript ইন্টারফেস সংজ্ঞায়িত করা
interface Goal {
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
const GanttView = ({ goals }: { goals: Goal[] }) => {
  // মাসের ডেটা (বর্তমান বছরের জানুয়ারি থেকে মে)
  const monthsData: MonthData[] = [
    { name: 'January', days: 31, startIndex: 0 },
    { name: 'February', days: 28, startIndex: 31 },
    { name: 'March', days: 31, startIndex: 59 },
    { name: 'April', days: 30, startIndex: 90 },
    { name: 'May', days: 31, startIndex: 120 }
  ];
  
  const totalDays = 151; // জানুয়ারি থেকে মে পর্যন্ত মোট দিন
  
  // সপ্তাহের দিনের শর্ট ফর্ম
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* গ্যান্ট চার্ট টেবিল */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* টেবিল হেডার */}
          <thead>
            {/* মাসের নাম রো */}
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="sticky left-0 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                #
              </th>
              <th className="px-0 py-0">
                <div className="flex">
                  {monthsData.map((month, index) => (
                    <div
                      key={month.name}
                      className="flex-none px-2 py-3 text-center text-sm font-semibold text-gray-900 border-r border-gray-200"
                      style={{ width: `${(month.days / totalDays) * 100}%` }}
                    >
                      {month.name}
                    </div>
                  ))}
                </div>
              </th>
            </tr>
            
            {/* দিনের নাম রো */}
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="sticky left-0 bg-gray-50 px-4 py-2 text-left text-xs font-medium text-gray-500 border-r border-gray-200">
                Name
              </th>
              <th className="px-0 py-0">
                <div className="flex">
                  {monthsData.map((month) => (
                    <div
                      key={`${month.name}-days`}
                      className="flex justify-between px-1"
                      style={{ width: `${(month.days / totalDays) * 100}%` }}
                    >
                      {dayLabels.map((day, dayIndex) => (
                        <span
                          key={`${month.name}-${day}-${dayIndex}`}
                          className="text-xs text-gray-500 font-medium"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </th>
            </tr>
          </thead>
          
          {/* টেবিল বডি */}
          <tbody className="bg-white divide-y divide-gray-200">
            {goals.slice(1).map((goal) => ( // প্রথম আইটেম (Strategic Theme) বাদ দিয়ে
              <GanttRow
                key={goal.id}
                goal={goal}
                monthsData={monthsData}
                totalDays={totalDays}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {/* স্ক্রল ইন্ডিকেটর */}
      <div className="flex justify-center p-2 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* স্ক্রল বার */}
          <div className="flex-1 h-2 bg-gray-300 rounded-full mx-4 max-w-md">
            <div className="h-full bg-gray-500 rounded-full" style={{ width: '30%' }}></div>
          </div>
          
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// রো বা গ্রিড ফরম্যাটে একটি গোল প্রদর্শনের জন্য কম্পোনেন্ট
const GoalCard = ({ goal }: { goal: Goal }) => (
  <div className="flex items-center justify-between rounded-md bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg">
    <div className="flex w-full items-center space-x-4">
      {/* গোলের শিরোনাম এবং উপশিরোনাম */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{goal.title}</h3>
        <p className="text-sm text-gray-500">{goal.subtitle}</p>
      </div>

      {/* লেবেল/ট্যাগ বিভাগ */}
      <div className="flex items-center space-x-2">
        {goal.priority && (
          <span className={`rounded-md px-3 py-1 text-xs font-medium ${goal.priority === 'Urgent' ? ' text-red-700' : 'bg-gray-100 text-gray-700'}`}>
            {goal.priority}
          </span>
        )}
        {goal.status && (
          <span className={`rounded-md px-3 py-1 text-xs font-medium ${goal.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {goal.status}
          </span>
        )}
        {goal.category && (
          <span className="rounded-md bg-blue-900 px-3 py-1 text-xs font-medium text-white">
            {goal.category}
          </span>
        )}
      </div>

      {/* প্রগ্রেস বার বিভাগ */}
      <div className="flex w-40 flex-col items-end space-y-1">
        <p className="text-xs text-gray-500">{goal.progressLabel}</p>
        <div className="h-2 w-full overflow-hidden rounded-md bg-gray-200">
          <div
            className="h-full rounded-md bg-blue-900"
            style={{ width: `${goal.progressValue}%` }}
          />
        </div>
      </div>
    </div>

    {/* অ্যাকশন মেনু বাটন */}
    <div className="ml-4">
      <button className="text-gray-400 hover:text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8ZM12 14C10.9 14 10 14.9 10 16C10 17.1 10.9 18 12 18C13.1 18 14 17.1 14 16C14 14.9 13.1 14 12 14Z" />
        </svg>
      </button>
    </div>
  </div>
);

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

// ব্যবসায়িক গোল পৃষ্ঠা প্রদর্শনের জন্য প্রধান কম্পোনেন্ট
const AfterBusinessGoal = () => {
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
  const [viewMode, setViewMode] = useState<'row' | 'structure' | 'gantt'>('gantt');

  // শর্তসাপেক্ষ রেন্ডারিং: কোনো গোল পাওয়া না গেলে একটি বার্তা দেখান।
  if (goals.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center text-gray-500 shadow">
        No data found. Please add a business goal.
      </div>
    );
  }

  // গোল সহ প্রধান পৃষ্ঠার বিষয়বস্তু রেন্ডার করুন।
  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
      <div className="space-y-6">
        {/* হেডার বিভাগ */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Business Goals</h1>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 border border-black rounded-md bg-white px-4 py-2 text-sm font-medium shadow transition-colors duration-200 hover:bg-black/90 hover:text-white cursor-pointer">
              
              Business Goal Impact Summary
            </button>
            <button className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors duration-200 hover:bg-blue-950">
              Add New Business Goal
            </button>
            
            {/* ভিউ টগল বাটনস */}
            <button
              onClick={() => setViewMode('row')}
              className={`cursor-pointer ${viewMode === 'row' ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500 transition-colors duration-200`}
            >
             <GoRows className="ml-2" size={25} />
            </button>
            <button
              onClick={() => setViewMode('structure')}
              className={`cursor-pointer ${viewMode === 'structure' ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500 transition-colors duration-200`}
            >
             <FiGrid className="ml-2" size={25} />
            </button>
            <button
              onClick={() => setViewMode('gantt')}
              className={`cursor-pointer ${viewMode === 'gantt' ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500 transition-colors duration-200`}
            >
             <MdOutlineBarChart className="ml-2" size={25} />
            </button>
          </div>
        </div>

        {/* ভিউ এবং ফিল্টার বিভাগ */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {viewMode === 'row' && 'Row View'}
            {viewMode === 'structure' && 'Structure View'}
            {viewMode === 'gantt' && 'Gantt View'}
          </h2>
          <div className="flex space-x-2">
            {/* ফিল্টার ড্রপডাউনস */}
            <select className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Filter by Priority</option>
              <option>Urgent</option>
              <option>High</option>
            </select>
            <select className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Filter by Status</option>
              <option>Overdue</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        {/* গোল কার্ডের তালিকা - viewMode এর উপর ভিত্তি করে শর্তসাপেক্ষ রেন্ডারিং */}
        {viewMode === 'row' && (
          <div className="space-y-4">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        )}

        {viewMode === 'gantt' && (
          <GanttView goals={goals} />
        )}

        {viewMode === 'structure' && (
          <div className="relative p-8 overflow-x-auto">
            {/* সংযোগকারী লাইনের জন্য SVG */}
            <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
              {/* Strategic Theme থেকে প্রথম সারির গোলগুলিতে লাইন */}
              <line x1="260" y1="96" x2="350" y2="96" stroke="#9CA3AF" strokeWidth="2" />
              {/* প্রথম সারির গোলগুলি সংযুক্তকারী উল্লম্ব লাইন */}
              <line x1="350" y1="96" x2="350" y2="444" stroke="#9CA3AF" strokeWidth="2" />
              {/* উল্লম্ব থেকে পৃথক গোলগুলিতে লাইন */}
              <line x1="350" y1="96" x2="360" y2="96" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="350" y1="216" x2="360" y2="216" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="350" y1="336" x2="360" y2="336" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="350" y1="444" x2="360" y2="444" stroke="#9CA3AF" strokeWidth="2" />
              
              {/* Goal 2 থেকে Goal 4 এ লাইন */}
              <line x1="628" y1="96" x2="710" y2="96" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="710" y1="96" x2="710" y2="216" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="710" y1="216" x2="720" y2="216" stroke="#9CA3AF" strokeWidth="2" />
            </svg>

            {/* স্ট্রাকচার ভিউর জন্য লেআউট */}
            <div className="flex flex-row space-x-16">
              {/* প্রথম কলাম: Strategic Theme */}
              <div className="flex flex-col">
                <StructureViewCard goal={goals[0]} isStrategicTheme={true} />
              </div>

              {/* দ্বিতীয় কলাম: চাইল্ড গোলস */}
              <div className="flex flex-col space-y-12 mt-12">
                <StructureViewCard goal={goals[1]} />
                <StructureViewCard goal={goals[2]} />
                <StructureViewCard goal={goals[4]} />
                <StructureViewCard goal={goals[5]} />
              </div>

              {/* তৃতীয় কলাম: সাব-চাইল্ড গোলস */}
               <div className="flex flex-col space-y-12 mt-12">
                <StructureViewCard goal={goals[2]} />
                <StructureViewCard goal={goals[3]} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AfterBusinessGoal;