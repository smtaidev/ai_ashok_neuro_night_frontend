// import React from 'react';

// interface BusinessGoal {
//     priority: string;
//     title: string;
//     department: string;
//     tiedGoal: string;
//     funds: string;
//     progress: number;
// }

// const goalsData: BusinessGoal[] = [
//     {
//         priority: '01',
//         title: 'Lack of Funding',
//         department: 'Operations Team',
//         tiedGoal: 'Market Volatility Reduction',
//         funds: '$100,000',
//         progress: 50,
//     },
//     {
//         priority: '02',
//         title: 'Rising Production Costs',
//         department: 'Finance Department',
//         tiedGoal: 'Streamline Supply Chain ...',
//         funds: '$150,000',
//         progress: 40,
//     },
//     {
//         priority: '01',
//         title: 'Lack of Funding',
//         department: 'Operations Team',
//         tiedGoal: 'Market Volatility Reduction',
//         funds: '$100,000',
//         progress: 50,
//     },
//     {
//         priority: '02',
//         title: 'Rising Production Costs',
//         department: 'Finance Department',
//         tiedGoal: 'Streamline Supply Chain ...',
//         funds: '$150,000',
//         progress: 40,
//     },
//     {
//         priority: '02',
//         title: 'Rising Production Costs',
//         department: 'Finance Department',
//         tiedGoal: 'Streamline Supply Chain ...',
//         funds: '$150,000',
//         progress: 40,
//     },
//     {
//         priority: '01',
//         title: 'Lack of Funding',
//         department: 'Operations Team',
//         tiedGoal: 'Market Volatility Reduction',
//         funds: '$100,000',
//         progress: 50,
//     },
//     {
//         priority: '02',
//         title: 'Rising Production Costs',
//         department: 'Finance Department',
//         tiedGoal: 'Streamline Supply Chain ...',
//         funds: '$150,000',
//         progress: 70,
//     },
// ];

// interface ProgressBarProps {
//     progress: number;
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
//     return (
//         <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//                 className="bg-blue-900 h-2.5 rounded-full"
//                 style={{ width: `${progress}%` }}
//             />
//         </div>
//     );
// };

// const BusinessGoalDataOverview: React.FC = () => {
//     return (
//         <div className="bg-white shadow rounded-xl p-6">
//             <h2 className="text-lg font-semibold text-blue-800 mb-4">Business Goals</h2>
//             <div className="overflow-x-auto">
//                 <table className="w-full text-sm text-left text-gray-600">
//                     <thead className="text-gray-500 border-b border-gray-200">
//                         <tr>
//                             <th className="py-2 pr-4">Priority</th>
//                             <th className="py-2 pr-4">Title</th>
//                             <th className="py-2 pr-4">Tied Goal</th>
//                             <th className="py-2 pr-4">Allocated funds</th>
//                             <th className="py-2">Progress</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {goalsData.map((goal, idx) => (
//                             <tr key={idx} className="border-b border-gray-100">
//                                 <td className="py-4 pr-4 font-medium text-gray-800">{goal.priority}</td>
//                                 <td className="py-4 pr-4">
//                                     <div className="font-semibold text-gray-800">{goal.title}</div>
//                                     <div className="text-xs text-gray-500">{goal.department}</div>
//                                 </td>
//                                 <td className="py-4 pr-4 text-blue-700 font-medium">{goal.tiedGoal}</td>
//                                 <td className="py-4 pr-4 font-bold text-gray-900">{goal.funds}</td>
//                                 <td className="py-4">
//                                     <div className="flex items-center gap-2 w-28">
//                                         <ProgressBar progress={goal.progress} />
//                                         <span className="text-sm font-medium text-gray-700">{goal.progress}%</span>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div className="mt-4 text-right">
//                 <a href="#" className="text-blue-700 text-sm font-medium hover:underline">
//                     View details →
//                 </a>
//             </div>
//         </div>
//     );
// };

// export default BusinessGoalDataOverview;




"use client";
import React from "react";
import { useGetBusinessGoalsQuery } from "@/redux/api/blueprint/businessGoal/businessGoalApi";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-900 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const BusinessGoalDataOverview: React.FC = () => {
  const { data, isLoading, isError } = useGetBusinessGoalsQuery();

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-xl p-6 text-center text-gray-500">
        Loading goals...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white shadow rounded-xl p-6 text-center text-red-500">
        Failed to load business goals.
      </div>
    );
  }

  const goals = data?.data || []; // Adjusted assuming API response shape { data: [...] }

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">
        Business Goals
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-gray-500 border-b border-gray-200">
            <tr>
              <th className="py-2 pr-4">Priority</th>
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">Tied Goal</th>
              <th className="py-2 pr-4">Allocated funds</th>
              <th className="py-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            {goals.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">
                  No business goals found.
                </td>
              </tr>
            ) : (
              goals.map((goal: any, idx: number) => (
                <tr key={goal._id || idx} className="border-b border-gray-100">
                  {/* Priority */}
                  <td className="py-4 pr-4 font-medium text-gray-800">
                    {goal.priority}
                  </td>

                  {/* Title + Department */}
                  <td className="py-4 pr-4">
                    <div className="font-semibold text-gray-800">
                      {goal.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {goal.department}
                    </div>
                  </td>

                  {/* Tied Goal */}
                  <td className="py-4 pr-4 text-blue-700 font-medium">
                    {goal.tiedGoal}
                  </td>

                  {/* Funds */}
                  <td className="py-4 pr-4 font-bold text-gray-900">
                    {goal.funds}
                  </td>

                  {/* Progress */}
                  <td className="py-4">
                    <div className="flex items-center gap-2 w-28">
                      <ProgressBar progress={goal.goalProgress || 0} />
                      <span className="text-sm font-medium text-gray-700">
                        {goal.goalProgress || 0}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right">
        <a
          href="/dashboard/blueprint/business-goals"
          className="text-blue-700 text-sm font-medium hover:underline"
        >
          View details →
        </a>
      </div>
    </div>
  );
};

export default BusinessGoalDataOverview;
