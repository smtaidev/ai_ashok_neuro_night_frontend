import React from "react";
import { FaDownload } from "react-icons/fa";

// Define the type for a meeting object
interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  label: string;
  labelColor: "green" | "yellow";
  action: "PDF" | "Add Agenda";
}

// Data for the meetings to be displayed
const meetings: Meeting[] = [
  {
    id: 1,
    title: "Daily Meeting",
    date: "March 23, 2024",
    time: "7.50 P.M",
    label: "Monthly",
    labelColor: "green",
    action: "PDF",
  },
  {
    id: 2,
    title: "Important Meeting",
    date: "March 23, 2024",
    time: "7.50 P.M",
    label: "Quarterly",
    labelColor: "yellow",
    action: "Add Agenda",
  },
];

// Tailwind classes for button colors
const buttonColors = {
  green: "bg-green-600 hover:bg-green-700 text-white",
  yellow: "bg-yellow-500 hover:bg-yellow-600 text-white",
};

const actionButtonColors = {
  PDF: "bg-blue-800 hover:bg-blue-900 text-white",
  "Add Agenda":
    "bg-white hover:bg-blue-200 text-blue-800 hover:text-blue-600 border border-blue-800",
};

const MeetingsSection: React.FC = () => {
  return (
    <div className=" mx-auto p-6 bg-white rounded-xl h-auto">
      <h2 className="text-[18px] text-[#1E3A8A] mb-6">Upcoming Meetings</h2>
      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-start gap-4 overflow-y-auto"
          >
            <div className="flex justify-between w-full  items-center">
              <h3 className="text-[16px] font-semibold text-gray-900">
                {meeting.title}
              </h3>
              <button className="text-gray-400 font-bold hover:text-gray-600 focus:outline-none">
                ...
              </button>
            </div>
            <div className="flex justify-between w-full items-center">
              <p className="text-gray-500 text-[12px] ">
                {meeting.date} - {meeting.time}
              </p>
              <div className="flex-shrink-0 mt-4 sm:mt-0 flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    meeting.labelColor === "green"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {meeting.label}
                </span>
                <button
                  className={`px-3 flex gap-1 py-2 rounded-lg text-[10px] font-semibold transition-colors duration-200 ${
                    actionButtonColors[meeting.action]
                  }`}
                >
                  {meeting.action === "PDF" ? (
                    <FaDownload className="w-3 h-3" />
                  ) : (
                    ""
                  )}
                  {meeting.action}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingsSection;
