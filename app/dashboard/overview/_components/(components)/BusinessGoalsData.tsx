// working code 



// "use client";
// import { useGetBusinessGoalsQuery } from "@/redux/api/blueprint/businessGoal/businessGoalApi";
// // import { truncateText } from "@/utils/truncateText";
// import React from "react";


//  function truncateText(text: string, length: number = 14): string {
//   if (!text) return "";
//   return text.length > length ? text.slice(0, length) + "..." : text;
// }


// const BusinessGoalsData = () => {
//   // Function to calculate timeline difference (days & hours only)
//   const calculateTimeline = (start: string, end: string) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const diffMs = endDate.getTime() - startDate.getTime();

//     if (isNaN(diffMs)) return "N/A";

//     const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const days = Math.floor(totalHours / 24);
//     const hours = totalHours % 24;

//     return `${days} d ${hours} hr`;
//   };

//   const { data: goalsData } = useGetBusinessGoalsQuery();
//   const goals = goalsData?.data || [];
//   const totalGoals = goals.length;

//   // Priority badge colors
//   const getPriorityColor = (priority: "High" | "Medium" | "Low") => {
//     switch (priority) {
//       case "High":
//         return "bg-pink-100 text-pink-700";
//       case "Medium":
//         return "bg-yellow-100 text-yellow-700";
//       case "Low":
//         return "bg-gray-100 text-gray-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl relative w-full flex flex-col lg:flex-row min-h-[300px]">
//       {/* Left column - Business Goals count */}
//       <div className="flex flex-col items-center w-full lg:w-[30%] p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
//         <h2 className="text-lg md:text-xl xl:text-[24px] font-bold p-6 text-gray-700 mb-4">
//           Business Goals
//         </h2>
//         <div className="p-2 bg-blue-100 rounded-full">
//           <div className="flex items-center justify-center w-32 h-32 rounded-full bg-blue-800 text-white font-bold text-5xl">
//             {totalGoals}
//           </div>
//         </div>
//       </div>

//       {/* Right column - Goals table */}
//       <div className="flex-1 w-full border-gray-200 overflow-x-auto lg:border-l">
//         {/* Table header */}
//         <div className="grid grid-cols-[1fr_2fr_1.5fr_1.5fr_1.5fr] gap-4 pb-4 pt-6 border-b pr-6 border-gray-200 text-gray-500 font-semibold whitespace-nowrap">
//           <span></span> {/* Placeholder for ID */}
//           <span>Title</span>
//           <span>Goal Timeline</span>
//           <span>Priority</span>
//           <span>Goal Progress</span>
//         </div>

//         {/* Table content rows */}
//         <div className="space-y-4 pt-4 pr-4 max-h-[400px] w-full">
//           {goals.map((goal: any, index: number) => (
//             <div
//               key={goal._id}
//               className="grid pl-2 grid-cols-[1fr_2fr_1.5fr_1.5fr_1.5fr] items-center gap-4 py-2 border-b border-gray-100 whitespace-nowrap"
//             >
//               {/* ID number */}
//               <span className="text-sm font-bold text-gray-400">
//                 {String(index + 1).padStart(2, "0")}
//               </span>

//               {/* Goal Title */}
//               <div className="flex flex-col">
//                 <span
//                   className="text-gray-800 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
//                   title={goal.title}
//                 >
//                   {truncateText(goal.title, 14)}
//                 </span>
//                 <span
//                   className="text-gray-500 text-xs whitespace-nowrap overflow-hidden text-ellipsis"
//                   title={goal.related_strategic_theme}
//                 >
//                   {truncateText(goal.related_strategic_theme || "", 12)}
//                 </span>
//               </div>

//               {/* Goal Timeline */}
//               <span className="text-gray-600 font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis">
//                 {calculateTimeline(goal.goalTimelineStart, goal.goalTimelineEnd)}
//               </span>

//               {/* Priority */}
//               <span className="text-center">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
//                     goal.priority
//                   )}`}
//                 >
//                   {goal.priority}
//                 </span>
//               </span>

//               {/* Goal Progress */}
//               <div className="flex items-center space-x-2">
//                 <span className="text-gray-600 text-sm">
//                   {goal.goalProgress}%
//                 </span>
//                 <div className="w-full bg-gray-200 rounded-sm h-4">
//                   <div
//                     className="bg-blue-800 h-4 rounded-sm"
//                     style={{ width: `${goal.goalProgress}%` }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* "Explore More" link */}
//       <div className="flex justify-end bottom-0 right-0 absolute p-6 pr-8">
//         <a
//           href="/dashboard/blueprint/business-goals"
//           className="flex items-center gap-1 text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200"
//         >
//           Explore More →
//         </a>
//       </div>
//     </div>
//   );
// };

// export default BusinessGoalsData;



"use client";
import { useGetBusinessGoalsQuery } from "@/redux/api/blueprint/businessGoal/businessGoalApi";
import React from "react";

function truncateText(text: string, length: number = 14): string {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
}

const BusinessGoalsData = () => {
  // Function to calculate timeline difference (days & hours only)
  const calculateTimeline = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();

    if (isNaN(diffMs)) return "N/A";

    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    return `${days} d ${hours} hr`;
  };

  const { data: goalsData } = useGetBusinessGoalsQuery();
  const goals = goalsData?.data || [];
  const totalGoals = goals.length;

  // Priority badge colors
  const getPriorityColor = (priority: "High" | "Medium" | "Low") => {
    switch (priority) {
      case "High":
        return "bg-pink-100 text-pink-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl relative w-full flex flex-col lg:flex-row min-h-[300px]">
      {/* Left column - Business Goals count */}
      <div className="flex flex-col items-center w-full lg:w-[30%] p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
        <h2 className="text-lg md:text-xl xl:text-[24px] font-bold p-6 text-gray-700 mb-4">
          Business Goals
        </h2>
        <div className="p-2 bg-blue-100 rounded-full">
          <div className="flex items-center justify-center w-32 h-32 rounded-full bg-blue-800 text-white font-bold text-5xl">
            {totalGoals}
          </div>
        </div>
      </div>

      {/* Right column - Goals table */}
      <div className="flex-1 w-full border-gray-200 overflow-x-auto lg:border-l">
        <table className="min-w-full text-left border-collapse">
          {/* Table Head */}
          <thead className="border-b border-gray-200 text-gray-500 font-semibold whitespace-nowrap">
            <tr>
              <th className="py-4 px-2 w-[50px]"></th>
              <th className="py-4 px-2">Title</th>
              <th className="py-4 px-2">Goal Timeline</th>
              <th className="py-4 px-2">Priority</th>
              <th className="py-4 px-2">Goal Progress</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {goals.map((goal: any, index: number) => (
              <tr
                key={goal._id}
                className="border-b border-gray-100 whitespace-nowrap"
              >
                {/* ID number */}
                <td className="py-3 px-2 text-sm font-bold text-gray-400">
                  {String(index + 1).padStart(2, "0")}
                </td>

                {/* Goal Title */}
                <td className="py-3 px-2">
                  <div className="flex flex-col">
                    <span
                      className="text-gray-800 font-medium overflow-hidden text-ellipsis"
                      title={goal.title}
                    >
                      {truncateText(goal.title, 14)}
                    </span>
                    <span
                      className="text-gray-500 text-xs overflow-hidden text-ellipsis"
                      title={goal.related_strategic_theme}
                    >
                      {truncateText(goal.related_strategic_theme || "", 12)}
                    </span>
                  </div>
                </td>

                {/* Goal Timeline */}
                <td className="py-3 px-2 text-gray-600 font-medium text-sm">
                  {calculateTimeline(goal.goalTimelineStart, goal.goalTimelineEnd)}
                </td>

                {/* Priority */}
                <td className="py-3 px-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                      goal.priority
                    )}`}
                  >
                    {goal.priority}
                  </span>
                </td>

                {/* Goal Progress */}
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 text-sm">
                      {goal.goalProgress}%
                    </span>
                    <div className="w-full bg-gray-200 rounded-sm h-4">
                      <div
                        className="bg-blue-800 h-4 rounded-sm"
                        style={{ width: `${goal.goalProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* "Explore More" link */}
      <div className="flex justify-end bottom-0 right-0 absolute p-6 pr-8">
        <a
          href="/dashboard/blueprint/business-goals"
          className="flex items-center gap-1 text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200"
        >
          Explore More →
        </a>
      </div>
    </div>
  );
};

export default BusinessGoalsData;
