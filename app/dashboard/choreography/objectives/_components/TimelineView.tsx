// import React from 'react';

// const TimelineView = () => {
//   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

//   const projects = [
//     { name: "Project 1", progress: 35, startMonth: 0, duration: 1.5 },
//     { name: "Project 2", progress: 36, startMonth: 2, duration: 2.5 },
//   ]

//   return (
//     <div className="space-y-6 p-6">
//       <div className="grid grid-cols-6 gap-4 border-b border-gray-200 pb-4">
//         <div className="font-medium text-gray-900"># Name</div>
//         {months.map((month) => (
//           <div key={month} className="text-center">
//             <div className="font-medium text-gray-900 mb-2">{month}</div>
//             <div className="grid grid-cols-7 gap-1 text-xs text-gray-400">
//               <div>M</div>
//               <div>T</div>
//               <div>W</div>
//               <div>T</div>
//               <div>F</div>
//               <div>S</div>
//               <div>S</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="space-y-4">
//         {projects.map((project, index) => (
//           <div key={index} className="grid grid-cols-6 gap-4 items-center">
//             <div className="font-medium text-gray-700">{project.name}</div>
//             <div className="col-span-5 relative">
//               <div className="h-8 bg-gray-50 rounded relative">
//                 <div
//                   className="absolute top-1 bottom-1 bg-[#22398A] rounded flex items-center justify-end pr-2"
//                   style={{
//                     left: `${(project.startMonth / 5) * 100}%`,
//                     width: `${(project.duration / 5) * 100}%`,
//                   }}
//                 >
//                   <span className="text-xs text-white font-medium">{project.progress}%</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default TimelineView;

//! Try - 2

// "use client";

// import React, { useMemo } from "react";
// import { useGetAllObjectivesQuery } from "@/redux/api/choreograph/objectivesApi";

// interface Objective {
//   _id: string;
//   title: string;
//   startDate: string; // YYYY-MM-DD
//   endDate: string;   // YYYY-MM-DD
//   progress: string;  // "25" or "50%" or "Planning Phase"
// }

// // ---- Date helpers ----
// const parseDate = (dateStr: string) => {
//   const [y, m, d] = dateStr.split("-").map(Number);
//   return new Date(y, m - 1, d);
// };

// const generateDateRange = (start: Date, end: Date): Date[] => {
//   const dates: Date[] = [];
//   const cur = new Date(start);
//   while (cur <= end) {
//     dates.push(new Date(cur));
//     cur.setDate(cur.getDate() + 1);
//   }
//   return dates;
// };

// const getChartDateRange = (objectives: Objective[]) => {
//   let min = parseDate(objectives[0].startDate);
//   let max = parseDate(objectives[0].endDate);

//   objectives.forEach((o) => {
//     const s = parseDate(o.startDate);
//     const e = parseDate(o.endDate);
//     if (s < min) min = s;
//     if (e > max) max = e;
//   });

//   return { start: min, end: max };
// };

// // ---- Timeline Row ----
// const TimelineRow = ({
//   obj,
//   chartStart,
//   totalDays,
// }: {
//   obj: Objective;
//   chartStart: Date;
//   totalDays: number;
// }) => {
//   const start = parseDate(obj.startDate);
//   const end = parseDate(obj.endDate);

//   const offsetDays = Math.max(
//     0,
//     Math.floor((start.getTime() - chartStart.getTime()) / 86400000)
//   );
//   const durationDays = Math.max(
//     1,
//     Math.floor((end.getTime() - start.getTime()) / 86400000) + 1
//   );

//   const leftPercent = (offsetDays / totalDays) * 100;
//   const widthPercent = (durationDays / totalDays) * 100;

//   // Handle progress value (strip % or convert non-numeric to 0)
//   const rawProgress = String(obj.progress).replace("%", "");
//   const progressPercent = isNaN(Number(rawProgress))
//     ? 0
//     : Math.min(100, Math.max(0, Number(rawProgress)));

//   return (
//     <div className="grid grid-cols-6 gap-4 items-center">
//       {/* Objective Title */}
//       <div className="font-medium text-gray-700 truncate">{obj.title}</div>

//       {/* Timeline Bar */}
//       <div className="col-span-5 relative">
//         <div className="h-8 bg-gray-50 rounded relative">
//           {/* Gray duration bar */}
//           <div
//             className="absolute top-1 bottom-1 bg-gray-300 rounded"
//             style={{
//               left: `${leftPercent}%`,
//               width: `${widthPercent}%`,
//             }}
//           ></div>

//           {/* Blue progress bar */}
//           <div
//             className="absolute top-1 bottom-1 bg-[#22398A] rounded flex items-center justify-end pr-2"
//             style={{
//               left: `${leftPercent}%`,
//               width: `${(widthPercent * progressPercent) / 100}%`,
//               minWidth: "24px",
//             }}
//           >
//             <span className="text-xs text-white font-medium">
//               {progressPercent}%
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---- Main TimelineView ----
// const TimelineView = () => {
//   const { data, isLoading, isError } = useGetAllObjectivesQuery();

//   const objectives: Objective[] = useMemo(() => {
//     if (!data?.data) return [];
//     return data.data.map((o: any) => ({
//       _id: o._id,
//       title: o.title,
//       startDate: o.startDate,
//       endDate: o.endDate,
//       progress: o.progress,
//     }));
//   }, [data]);

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error loading objectives</div>;
//   if (!objectives.length) return <div>No objectives</div>;

//   const { start: chartStart, end: chartEnd } = getChartDateRange(objectives);
//   const totalDays =
//     Math.floor((chartEnd.getTime() - chartStart.getTime()) / 86400000) + 1;
//   const allDates = generateDateRange(chartStart, chartEnd);

//   // Group by months
//   const monthGroups: { month: string; days: Date[] }[] = [];
//   allDates.forEach((date) => {
//     const monthName = date.toLocaleString("default", { month: "long" });
//     const lastGroup = monthGroups[monthGroups.length - 1];
//     if (lastGroup && lastGroup.month === monthName) {
//       lastGroup.days.push(date);
//     } else {
//       monthGroups.push({ month: monthName, days: [date] });
//     }
//   });

//   return (
//     <div className="space-y-6 p-6">
//       {/* Header with months */}
//       <div className="grid grid-cols-6 gap-4 border-b border-gray-200 pb-4">
//         <div className="font-medium text-gray-900"># Name</div>
//         <div className="col-span-5 flex">
//           {monthGroups.map((group, i) => (
//             <div
//               key={i}
//               className="text-center"
//               style={{
//                 width: `${(group.days.length / totalDays) * 100}%`,
//               }}
//             >
//               <div className="font-medium text-gray-900 mb-1">
//                 {group.month}
//               </div>
//               <div className="flex text-[10px] text-gray-400 justify-between">
//                 {group.days.map((d, idx) =>
//                   idx % 5 === 0 || d.getDate() === 1 ? (
//                     <span key={d.toISOString()}>{d.getDate()}</span>
//                   ) : (
//                     <span key={d.toISOString()}></span>
//                   )
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Timeline rows */}
//       <div className="space-y-4">
//         {objectives.map((obj) => (
//           <TimelineRow
//             key={obj._id}
//             obj={obj}
//             chartStart={chartStart}
//             totalDays={totalDays}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TimelineView;

//! try - 3
"use client"

import { useMemo } from "react"
import { useGetAllObjectivesQuery } from "@/redux/api/choreograph/objectivesApi"

interface Objective {
  _id: string
  title: string
  startDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
  progress: string // "25" or "50%" or "Planning Phase"
}

// ---- Date helpers ----
const parseDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split("-").map(Number)
  return new Date(y, m - 1, d)
}

const generateDateRange = (start: Date, end: Date): Date[] => {
  const dates: Date[] = []
  const cur = new Date(start)
  while (cur <= end) {
    dates.push(new Date(cur))
    cur.setDate(cur.getDate() + 1)
  }
  return dates
}

const getCurrentYearDateRange = () => {
  const currentYear = new Date().getFullYear()
  const start = new Date(currentYear, 0, 1) // January 1st of current year
  const end = new Date(currentYear, 11, 31) // December 31st of current year
  return { start, end }
}

// ---- Timeline Row ----
const TimelineRow = ({
  obj,
  chartStart,
  totalDays,
}: {
  obj: Objective
  chartStart: Date
  totalDays: number
}) => {
  const start = parseDate(obj.startDate)
  const end = parseDate(obj.endDate)

  const offsetDays = Math.max(0, Math.floor((start.getTime() - chartStart.getTime()) / 86400000))
  const durationDays = Math.max(1, Math.floor((end.getTime() - start.getTime()) / 86400000) + 1)

  const leftPercent = (offsetDays / totalDays) * 100
  const widthPercent = (durationDays / totalDays) * 100

  // Handle progress value (strip % or convert non-numeric to 0)
  const rawProgress = String(obj.progress).replace("%", "")
  const progressPercent = isNaN(Number(rawProgress)) ? 0 : Math.min(100, Math.max(0, Number(rawProgress)))

  return (
    <div className="flex items-center">
      {/* Objective Title */}
      <div className="font-medium text-gray-700 truncate flex-shrink-0 pr-4" style={{ width: "200px" }}>
        {obj.title}
      </div>

      {/* Timeline Bar */}
      <div className="relative" style={{ width: "960px", }}>
        <TimelineBar obj={obj} chartStart={chartStart} totalDays={totalDays} />
      </div>
    </div>
  )
}

// ---- Timeline Bar ----
const TimelineBar = ({
  obj,
  chartStart,
  totalDays,
}: {
  obj: Objective
  chartStart: Date
  totalDays: number
}) => {
  const start = parseDate(obj.startDate)
  const end = parseDate(obj.endDate)

  const offsetDays = Math.max(0, Math.floor((start.getTime() - chartStart.getTime()) / 86400000))
  const durationDays = Math.max(1, Math.floor((end.getTime() - start.getTime()) / 86400000) + 1)

  const leftPercent = (offsetDays / totalDays) * 100
  const widthPercent = (durationDays / totalDays) * 100

  // Handle progress value (strip % or convert non-numeric to 0)
  const rawProgress = String(obj.progress).replace("%", "")
  const progressPercent = isNaN(Number(rawProgress)) ? 0 : Math.min(100, Math.max(0, Number(rawProgress)))

  return (
    <div className="h-8 bg-gray-50 rounded relative">
      {/* Gray duration bar */}
      <div
        className="absolute top-1 bottom-1 bg-gray-300 rounded"
        style={{
          left: `${leftPercent}%`,
          width: `${widthPercent}%`,
        }}
      ></div>

      {/* Blue progress bar */}
      <div
        className="absolute top-1 bottom-1 bg-[#22398A] rounded flex items-center justify-end pr-2"
        style={{
          left: `${leftPercent}%`,
          width: `${(widthPercent * progressPercent) / 100}%`,
          minWidth: progressPercent > 0 ? "24px" : "0px",
        }}
      >
        {progressPercent > 0 && <span className="text-xs text-white font-medium">{progressPercent}%</span>}
      </div>
    </div>
  )
}

// ---- Main TimelineView ----
const TimelineView = () => {
  const { data, isLoading, isError } = useGetAllObjectivesQuery()

  const objectives: Objective[] = useMemo(() => {
    if (!data?.data) return []
    return data.data.map((o: any) => ({
      _id: o._id,
      title: o.title,
      startDate: o.startDate,
      endDate: o.endDate,
      progress: o.progress,
    }))
  }, [data])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading objectives</div>
  if (!objectives.length) return <div>No objectives</div>

  const { start: chartStart, end: chartEnd } = getCurrentYearDateRange()
  const totalDays = Math.floor((chartEnd.getTime() - chartStart.getTime()) / 86400000) + 1
  const allDates = generateDateRange(chartStart, chartEnd)

  // Group by months
  const monthGroups: { month: string; days: Date[] }[] = []
  allDates.forEach((date) => {
    const monthName = date.toLocaleString("default", { month: "long" })
    const lastGroup = monthGroups[monthGroups.length - 1]
    if (lastGroup && lastGroup.month === monthName) {
      lastGroup.days.push(date)
    } else {
      monthGroups.push({ month: monthName, days: [date] })
    }
  })

  const minTimelineWidth = Math.max(1200, totalDays * 6) // Increased from 4px to 6px per day
  const nameColumnWidth = 200 // Fixed width for name column
  const timelineContentWidth = minTimelineWidth - nameColumnWidth

  return (
    <div className="space-y-6 p-6">
      <div className="overflow-x-auto overflow-y-hidden scrollbar-gutter-stable" style={{ scrollbarWidth: "thin" }}>
        <div style={{ minWidth: `${minTimelineWidth}px` }} className="relative">
          {/* Header with months */}
          <div className="flex border-b border-gray-200 pb-4 mb-4">
            <div className="font-medium text-gray-900 flex-shrink-0" style={{ width: `${nameColumnWidth}px` }}>
              # Name
            </div>

            <div className="flex" style={{ width: `${timelineContentWidth}px` }}>
              {monthGroups.map((group, i) => {
                const monthWidth = (group.days.length / totalDays) * timelineContentWidth
                return (
                  <div
                    key={i}
                    className="text-center flex-shrink-0 border-r border-gray-100 last:border-r-0"
                    style={{ width: `${monthWidth}px` }}
                  >
                    <div className="font-medium text-gray-900 mb-2 px-2">{group.month}</div>
                    <div className="flex text-[10px] text-gray-400 justify-between px-1">
                      {group.days.map((d, idx) => {
                        // Show day numbers for 1st, 5th, 10th, 15th, 20th, 25th, and last day of month
                        const shouldShow = d.getDate() === 1 || d.getDate() % 5 === 0 || idx === group.days.length - 1
                        return (
                          <span key={d.toISOString()} className="flex-shrink-0">
                            {shouldShow ? d.getDate() : ""}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Timeline rows */}
          <div className="space-y-4">
            {objectives.map((obj) => (
              <TimelineRow key={obj._id} obj={obj} chartStart={chartStart} totalDays={totalDays} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineView

