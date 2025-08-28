// import { useGetPastTwoMeetingsQuery } from "@/redux/api/meeting/meetingApi";
// import React from "react";
// import { FaDownload } from "react-icons/fa";

// interface MeetingItem {
//   id: string;
//   name: string;
//   date: string;
//   time: string;
//   type: "Monthly" | "Quarterly";
// }

// const getMeetingTypeBadge = (type: MeetingItem["type"]) => {
//   const styles: Record<MeetingItem["type"], string> = {
//     Monthly: "bg-teal-600 text-white",
//     Quarterly: "bg-green-600 text-white",
//   };
//   return (
//     <span
//       className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${styles[type]}`}
//     >
//       {type}
//     </span>
//   );
// };

// const LastTwoMeetings: React.FC = () => {

//   const { data: meetingsData, isLoading, error } = useGetPastTwoMeetingsQuery();

//   console.log(meetingsData, "meetingsData");


//   const meetings: MeetingItem[] = [
//     {
//       id: "1",
//       name: "Meeting Name",
//       date: "May 17, 2024",
//       time: "10:50 P.M.",
//       type: "Monthly",
//     },
//     {
//       id: "2",
//       name: "Meeting Name",
//       date: "May 17, 2024",
//       time: "10:50 P.M.",
//       type: "Quarterly",
//     },
//   ];

//   return (
//     <div className="bg-white rounded-lg border shadow-sm p-4">
//       <h2 className="text-[22px] font-semibold text-gray-800 mb-4">
//         Agendas/Minutes From the Last Two Meetings
//       </h2>
      
//       <div className="space-y-3 overflow-y-auto scrollable">
//         {meetings.map((meeting) => (
//           <div
//             key={meeting.id}
//             className="flex border p-4 rounded-2xl justify-between b items-center gap-4 min-w-2xl flex-nowrap"
//           >
//             {/* Meeting Name */}
//             <div className="text-[16px]  font-semibold text-gray-800">
//               {meeting.name}
//             </div>

//             {/* Date */}
//             <div className="text-[16px]  text-gray-600">{meeting.date}</div>

//             {/* Time */}
//             <div className="text-[16px]  text-gray-600">{meeting.time}</div>

//             {/* Badge */}
//             <div className="text-[10px]">{getMeetingTypeBadge(meeting.type)}</div>

//             {/* Download Button */}
//             <button className="flex items-center gap-2 px-4 py-2 text-[17px] font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-950 transition-colors duration-200">
//               <FaDownload className="w-3 h-3" />
//               Download Now
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LastTwoMeetings;


import { useGetPastTwoMeetingsQuery } from "@/redux/api/meeting/meetingApi";
import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import ArchiveFromModal from "../agenda-builder/_components/modals/ArchiveFromModal";
import MeetingDetailsModal from "./MeetingDetailsModal";

interface MeetingItem {
  id: string;
  name: string;
  date: string;
  time: string;
  type: "Monthly" | "Quarterly" | string;
  raw: any; // keep raw meeting data for modal
}

const getMeetingTypeBadge = (type: MeetingItem["type"]) => {
  const styles: Record<string, string> = {
    Monthly: "bg-teal-600 text-white",
    Quarterly: "bg-green-600 text-white",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${
        styles[type] || "bg-gray-400 text-white"
      }`}
    >
      {type}
    </span>
  );
};

const LastTwoMeetings: React.FC = () => {
  const { data: meetingsData, isLoading, error } = useGetPastTwoMeetingsQuery();

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any | null>(null);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  const meetings: MeetingItem[] =
    meetingsData?.data?.map((meeting: any) => {
      const dateObj = new Date(meeting.meetingDate);

      return {
        id: meeting._id,
        name: meeting.name,
        date: dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: dateObj.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        type: meeting.type,
        raw: meeting,
      };
    }) || [];

  // handle download (open modal)
  const handleDownloadClick = (meeting: any) => {
    setSelectedMeeting(meeting);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4">
      <h2 className="text-[22px] font-semibold text-gray-800 mb-4">
        Agendas/Minutes From the Last Two Meetings
      </h2>

      <div className="space-y-3 overflow-y-auto scrollable">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] items-center gap-4 border p-4 rounded-2xl"
          >
            {/* Meeting Name */}
            <div className="text-[16px] font-semibold text-gray-800 truncate">
              {meeting.name}
            </div>

            {/* Date */}
            <div className="text-[16px] text-gray-600">{meeting.date}</div>

            {/* Time */}
            <div className="text-[16px] text-gray-600">{meeting.time}</div>

            {/* Badge */}
            <div>{getMeetingTypeBadge(meeting.type)}</div>

            {/* Download Button */}
            <button
              onClick={() => handleDownloadClick(meeting.raw)}
              className="flex items-center gap-2 px-4 py-2 text-[15px] font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-950 transition-colors duration-200"
            >
              <FaDownload className="w-4 h-4" />
              Download
            </button>
          </div>
        ))}
      </div>

      {/* Archive Modal */}
      <MeetingDetailsModal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setSelectedMeeting(null);
  }}
  meetingId={selectedMeeting?._id ?? ""}
/>
    </div>
  );
};

export default LastTwoMeetings;
