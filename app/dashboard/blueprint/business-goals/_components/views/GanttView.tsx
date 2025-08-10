"use client";

import React from "react";

interface Goal {
  id: number;
  title: string;
  goalTimelineStart: string; // "YYYY-MM-DD"
  goalTimelineEnd: string;   // "YYYY-MM-DD"
  goalProgress: string;      // e.g. "61"
}

interface DateRange {
  start: Date;
  end: Date;
}

// Helper: parse "YYYY-MM-DD" to Date object (at UTC midnight)
const parseDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Generate array of dates between start and end (inclusive)
const generateDateRange = (start: Date, end: Date): Date[] => {
  const dates: Date[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    dates.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
};

const formatDate = (date: Date) =>
  date.getDate().toString(); // Only show day number in header

// Find the min start date and max end date across all goals for chart scale
const getChartDateRange = (goals: Goal[]): DateRange => {
  let minDate = parseDate(goals[0].goalTimelineStart);
  let maxDate = parseDate(goals[0].goalTimelineEnd);

  goals.forEach((goal) => {
    const start = parseDate(goal.goalTimelineStart);
    const end = parseDate(goal.goalTimelineEnd);
    if (start < minDate) minDate = start;
    if (end > maxDate) maxDate = end;
  });

  return { start: minDate, end: maxDate };
};

const GanttRow = ({
  goal,
  chartStart,
  totalDays,
}: {
  goal: Goal;
  chartStart: Date;
  totalDays: number;
}) => {
  const start = parseDate(goal.goalTimelineStart);
  const end = parseDate(goal.goalTimelineEnd);
  const progress = Number(goal.goalProgress);

  // Calculate offset and duration in days from chartStart
  const offsetDays = Math.max(0, Math.floor((start.getTime() - chartStart.getTime()) / (1000 * 60 * 60 * 24)));
  const durationDays = Math.max(1, Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);

  // Calculate percentages for left offset and width
  const leftPercent = (offsetDays / totalDays) * 100;
  const widthPercent = (durationDays / totalDays) * 100;

  // Progress bar width relative to task width
  const progressPercent = Math.min(100, Math.max(0, progress));

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="sticky left-0 bg-white px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200 min-w-[120px]">
        {goal.title}
      </td>
      <td className="relative h-10 p-0">
        <div className="relative h-full w-full bg-gray-100 rounded">
          {/* Full task duration bar */}
          <div
            className="absolute top-2 left-0 h-6 bg-gray-300 rounded"
            style={{
              left: `${leftPercent}%`,
              width: `${widthPercent}%`,
            }}
          ></div>

          {/* Progress bar */}
          <div
            className="absolute top-2 left-0 h-6 bg-blue-600 rounded text-white text-xs font-semibold flex items-center justify-end pr-2"
            style={{
              left: `${leftPercent}%`,
              width: `${(widthPercent * progressPercent) / 100}%`,
              minWidth: "24px",
            }}
          >
            {progressPercent}%
          </div>
        </div>
      </td>
    </tr>
  );
};

const GanttView = ({ goals }: { goals: Goal[] }) => {
  if (goals.length === 0) return <div>No goals to display</div>;

  // Get chart date range based on goals
  const { start: chartStart, end: chartEnd } = getChartDateRange(goals);
  const totalDays = Math.floor((chartEnd.getTime() - chartStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Generate all dates between chartStart and chartEnd for header
  const allDates = generateDateRange(chartStart, chartEnd);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="sticky left-0 bg-gray-50 px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200 min-w-[120px]">
                #
              </th>
              <th>
                <div className="flex">
                  {allDates.map((date) => (
                    <div
                      key={date.toISOString()}
                      className="flex-none border-r border-gray-200 text-center text-xs font-semibold text-gray-700"
                      style={{ width: `${100 / totalDays}%` }}
                      title={date.toDateString()}
                    >
                      {formatDate(date)}
                    </div>
                  ))}
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {goals.map((goal) => (
              <GanttRow key={goal.id} goal={goal} chartStart={chartStart} totalDays={totalDays} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GanttView;
