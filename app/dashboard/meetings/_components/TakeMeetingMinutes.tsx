import React from "react";
import { IoIosArrowForward } from "react-icons/io";

interface MeetingItem {
  id: string;
  name: string;
  date: string;
  time: string;
  type: "Monthly" | "Quarterly" | "Weekly";
}

const getMeetingTypeBadge = (type: MeetingItem["type"]) => {
  let bgColor = "";
  let textColor = "text-white";
  switch (type) {
    case "Monthly":
      bgColor = "bg-teal-600";
      break;
    case "Quarterly":
      bgColor = "bg-green-600";
      break;
    case "Weekly":
      bgColor = "bg-blue-600";
      break;
    default:
      bgColor = "bg-gray-200";
      textColor = "text-gray-800";
  }
  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-medium ${bgColor} ${textColor}`}
    >
      {type}
    </span>
  );
};

const TakeMeetingMinutes: React.FC = () => {
  const meetings: MeetingItem[] = [
    {
      id: "m1",
      name: "Meeting Name",
      date: "May 17, 2024",
      time: "10:50 P.M.",
      type: "Monthly",
    },
    {
      id: "m2",
      name: "Meeting Name",
      date: "May 17, 2024",
      time: "10:50 P.M.",
      type: "Quarterly",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
      {/* Header */}
      <div className="p-6 ">
        <h2 className="text-[22px] font-bold text-gray-800 flex items-center justify-between">
          Take Meeting Minutes
          
        </h2>
      </div>

      {/* Scrollable content */}
      <div className="p-6 space-y-4 max-h-96  overflow-y-auto scrollable">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="">
            <div
            
            className="flex border p-4 rounded-2xl justify-between b items-center gap-4 min-w-2xl flex-nowrap"
          >
            <div className="text-[16px] font-semibold text-gray-800 truncate flex-shrink-0">
              {meeting.name}
            </div>
            <div className="text-[16px] text-gray-500 flex-shrink-0">
              {meeting.date}
            </div>
            <div className="text-[16px] text-gray-500 flex-shrink-0">
              {meeting.time}
            </div>
            <span className="flex-shrink-0 text-[10px]">
              {getMeetingTypeBadge(meeting.type)}
            </span>
            <button className="px-6 py-2 text-[17px] font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-950 transition-colors duration-200 flex-shrink-0">
              Open
            </button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TakeMeetingMinutes;
