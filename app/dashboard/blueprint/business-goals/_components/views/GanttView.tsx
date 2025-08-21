"use client";

import React from "react";

interface Goal {
  id: number;
  title: string;
  goalTimelineStart: string; // YYYY-MM-DD
  goalTimelineEnd: string;   // YYYY-MM-DD
  goalProgress: string;      // e.g. "61"
}

interface DateRange {
  start: Date;
  end: Date;
}

const parseDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const generateDateRange = (start: Date, end: Date): Date[] => {
  const dates: Date[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    dates.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
};

const getChartDateRange = (goals: Goal[]): DateRange => {
  let min = parseDate(goals[0].goalTimelineStart);
  let max = parseDate(goals[0].goalTimelineEnd);
  goals.forEach((g) => {
    const s = parseDate(g.goalTimelineStart);
    const e = parseDate(g.goalTimelineEnd);
    if (s < min) min = s;
    if (e > max) max = e;
  });
  return { start: min, end: max };
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
  const offsetDays = Math.max(
    0,
    Math.floor((start.getTime() - chartStart.getTime()) / 86400000)
  );
  const durationDays = Math.max(
    1,
    Math.floor((end.getTime() - start.getTime()) / 86400000) + 1
  );
  const leftPercent = (offsetDays / totalDays) * 100;
  const widthPercent = (durationDays / totalDays) * 100;
  const progressPercent = Math.min(
    100,
    Math.max(0, Number(goal.goalProgress))
  );

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="lg:sticky lg:left-0 bg-white px-3 py-2 text-sm font-medium border-r border-gray-200 min-w-[150px] z-10">
        {goal.title}
      </td>
      <td className="relative h-10 p-0">
        <div className="relative h-full w-full bg-gray-50 rounded">
          <div
            className="absolute top-2 h-6 bg-gray-300 rounded-4xl"
            style={{
              left: `${leftPercent}%`,
              width: `${widthPercent}%`,
            }}
          ></div>
          <div
            className="absolute top-2 h-6 bg-blue-900 rounded-4xl text-white text-xs font-semibold flex items-center justify-end pr-2"
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
  if (!goals.length) return <div>No goals</div>;

  const { start: chartStart, end: chartEnd } = getChartDateRange(goals);
  const totalDays =
    Math.floor((chartEnd.getTime() - chartStart.getTime()) / 86400000) + 1;
  const allDates = generateDateRange(chartStart, chartEnd);

  // মাস গ্রুপ
  const monthGroups: { month: string; days: Date[] }[] = [];
  allDates.forEach((date) => {
    const monthName = date.toLocaleString("default", { month: "long" });
    const lastGroup = monthGroups[monthGroups.length - 1];
    if (lastGroup && lastGroup.month === monthName) {
      lastGroup.days.push(date);
    } else {
      monthGroups.push({ month: monthName, days: [date] });
    }
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-y-auto max-h-[700px] border">
      <table
        className="border-collapse"
        style={{ minWidth: "900px", tableLayout: "fixed", width: "100%" }}
      >
        <thead>
          {/* 1st row: মাস */}
          <tr className="bg-gray-100 border-b border-gray-200">
            <th
              className="lg:sticky lg:left-0 lg:top-0 lg:z-30 bg-gray-100 px-2 py-2 text-left text-sm font-semibold border-r border-gray-200 truncate"
              style={{
                width: "150px",
                minWidth: "150px",
                maxWidth: "150px",
              }}
            >
              Goal
            </th>
            <th className="sticky top-0 z-20 bg-gray-100 p-0">
              <div className="flex">
                {monthGroups.map((group, i) => (
                  <div
                    key={i}
                    className="text-center text-sm font-semibold border-r border-gray-200"
                    style={{
                      width: `${(group.days.length / totalDays) * 100}%`,
                    }}
                  >
                    {group.month}
                  </div>
                ))}
              </div>
            </th>
          </tr>

          {/* 2nd row: দিন */}
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="lg:sticky lg:left-0 lg:top-[40px] lg:z-30 bg-gray-50 px-3 py-2 text-left text-xs font-semibold border-r border-gray-200">
              #
            </th>
            <th className="sticky top-[40px] z-20 bg-gray-50 p-0">
              <div className="flex">
                {allDates.map((date) => {
                  const day = date.getDate();
                  const showLabel = day % 5 === 0 || day === 1;
                  return (
                    <div
                      key={date.toISOString()}
                      className="flex-none border-r border-gray-200 text-center text-[10px] text-gray-700"
                      style={{ width: `${100 / totalDays}%` }}
                    >
                      {showLabel ? day : ""}
                    </div>
                  );
                })}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {goals.map((goal) => (
            <GanttRow
              key={goal.id}
              goal={goal}
              chartStart={chartStart}
              totalDays={totalDays}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GanttView;
