// import { useGetNextTwoMeetingsQuery } from "@/redux/api/meeting/meetingApi";
// import React from "react";

// interface MeetingItem {
//   id: string;
//   name: string;
//   date: string;
//   time: string;
//   type: "Monthly" | "Quarterly" | "Weekly" | string;
// }

// const getMeetingTypeBadge = (type: MeetingItem["type"]) => {
//   let bgColor = "";
//   let textColor = "text-white";
//   switch (type) {
//     case "Monthly":
//       bgColor = "bg-teal-600";
//       break;
//     case "Quarterly":
//       bgColor = "bg-green-600";
//       break;
//     case "Weekly":
//       bgColor = "bg-blue-600";
//       break;
//     default:
//       bgColor = "bg-gray-200";
//       textColor = "text-gray-800";
//   }
//   return (
//     <span
//       className={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-medium ${bgColor} ${textColor}`}
//     >
//       {type}
//     </span>
//   );
// };

// const TakeMeetingMinutes: React.FC = () => {
//   const { data, isLoading } = useGetNextTwoMeetingsQuery();
//   console.log(data);

//   if (isLoading) {
//     return (
//       <div className="bg-white rounded-lg shadow-lg border overflow-hidden p-6">
//         <p className="text-gray-600">Loading meetings...</p>
//       </div>
//     );
//   }

//   // Map API response into MeetingItem[] format
//   const meetings: MeetingItem[] =
//     data?.data?.map((meeting: any) => {
//       const dateObj = new Date(meeting.meetingDate);
//       return {
//         id: meeting._id,
//         name: meeting.name,
//         date: dateObj.toLocaleDateString("en-US", {
//           month: "short",
//           day: "numeric",
//           year: "numeric",
//         }),
//         time: dateObj.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         type: meeting.type,
//       };
//     }) || [];

//   return (
//     <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
//       {/* Header */}
//       <div className="p-6 ">
//         <h2 className="text-[22px] font-bold text-gray-800 flex items-center justify-between">
//           Take Meeting Minutes
//         </h2>
//       </div>

//       {/* Scrollable content */}
//       <div className="p-6 space-y-4 max-h-96 overflow-y-auto scrollable">
//         {meetings.map((meeting) => (
//           <div key={meeting.id} className="">
//             <div className="flex border p-4 rounded-2xl justify-between items-center gap-4 min-w-2xl flex-nowrap">
//               <div className="text-[16px] font-semibold text-gray-800 truncate flex-shrink-0">
//                 {meeting.name}
//               </div>
//               <div className="text-[16px] text-gray-500 flex-shrink-0">
//                 {meeting.date}
//               </div>
//               <div className="text-[16px] text-gray-500 flex-shrink-0">
//                 {meeting.time}
//               </div>
//               <span className="flex-shrink-0 text-[10px]">
//                 {getMeetingTypeBadge(meeting.type)}
//               </span>
//               <button className="px-6 py-2 text-[17px] font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-950 transition-colors duration-200 flex-shrink-0">
//                 Open
//               </button>
//             </div>
//           </div>
//         ))}

//         {meetings.length === 0 && (
//           <p className="text-gray-500 text-center">No meetings found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TakeMeetingMinutes;



"use client";

import { useGetMyAllAgendaQuery, useGetNextTwoMeetingsQuery } from "@/redux/api/meeting/meetingApi";
import React, { useEffect, useState } from "react";
import Loading from "../../loading";
import { decodedToken } from "@/utils/jwt";
import TakeMeetingMinutesModal from "./TakeMeetingMinutesModal";

interface MeetingItem {
  id: string;
  name: string;
  date: string;
  time: string;
  type: "Monthly" | "Quarterly" | "Weekly" | string;
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


  const { data, isLoading } = useGetNextTwoMeetingsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);
  
 
  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (token) {
  //     const userInfo = decodedToken(token);
  //     console.log(
  //       "User Info: in action item assign to me from take meeting minutes =======================> ",
  //       userInfo
  //     );
  //   }
  // }, []);
  // console.log(data);

  if (isLoading) {
    return <Loading />;
  }



  // Map API response into MeetingItem[] format
  const meetings: MeetingItem[] =
    data?.data?.map((meeting: any) => {
      const dateObj = new Date(meeting.meetingDate);
      return {
        id: meeting._id,
        name: meeting.name,
        date: dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: dateObj.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: meeting.type,
      };
    }) || [];


  return (
    <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
      {/* Header */}
      <div className="p-6 ">
        <h2 className="text-[22px] font-bold text-gray-800 flex items-center justify-between">
          Take Meeting Minutes
        </h2>
      </div>

      {/* Scrollable content */}
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto scrollable">
        {meetings.map((meeting) => (
          <div key={meeting.id}>
            <div className="flex border p-4 rounded-2xl justify-between items-center gap-4 min-w-2xl flex-nowrap">
              {/* <div className="text-[16px] font-semibold text-gray-800 truncate flex-shrink-0">
                {meeting.name}
              </div> */}
              <div className="text-[16px] font-semibold text-gray-800 flex-shrink-0">
  {meeting.name.length > 15 ? `${meeting.name.slice(0, 15)}...` : meeting.name}
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
              <button
                onClick={() => {
                  setSelectedMeetingId(meeting.id);
                  setIsModalOpen(true);
                }}
                className="px-6 py-2 text-[17px] font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-950 transition-colors duration-200 flex-shrink-0"
              >
                Open
              </button>
            </div>
          </div>
        ))}

        {meetings.length === 0 && (
          <p className="text-gray-500 text-center">No meetings found.</p>
        )}
      </div>

      {/* Modal */}
      <TakeMeetingMinutesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        meetingId={selectedMeetingId}
        // agendas={myAgendas}
        // loading={agendasLoading}
      />
    </div>
  );
};

export default TakeMeetingMinutes;
