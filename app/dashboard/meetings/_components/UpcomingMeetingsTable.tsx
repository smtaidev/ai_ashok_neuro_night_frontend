

// import React from 'react';


// interface Meeting {
//   id: string;
//   title: string;
//   date: string;
//   time: string;
//   type: 'Monthly' | 'Quarterly' | 'Annual' | 'Board';
//   agendaStatus: 'PDF' | 'Add Agenda' | 'Saved Agenda';
// }

// const getMeetingTypeColor = (type: Meeting['type']): string => {
//   switch (type) {
//     case 'Monthly':
//       return 'bg-blue-100 text-blue-800';
//     case 'Quarterly':
//       return 'bg-green-100 text-green-800';
//     case 'Annual':
//       return 'bg-teal-100 text-teal-800';
//     case 'Board':
//       return 'bg-lime-100 text-lime-800';
//     default:
//       return 'bg-gray-100 text-gray-800';
//   }
// };

// const UpcomingMeetingsTable: React.FC = () => {
//   const meetings: Meeting[] = [
//     { id: '1', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Monthly', agendaStatus: 'PDF' },
//     { id: '2', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Quarterly', agendaStatus: 'PDF' },
//     { id: '3', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Annual', agendaStatus: 'Add Agenda' },
//     { id: '4', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Board', agendaStatus: 'Saved Agenda' },
//     { id: '5', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Monthly', agendaStatus: 'PDF' },
//     { id: '6', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Quarterly', agendaStatus: 'PDF' },
//   ];

//   return (
//     <div className="bg-white border rounded-lg overflow-hidden">
//       <div className="p-6">
//         <h2 className="text-[18px] font-bold text-gray-800 flex items-center justify-between">
//           Upcoming Meetings
//         </h2>
//       </div>

//       <div className="overflow-x-auto border m-3 rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 tracking-wider"
//               >
//                 Meeting Title
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 tracking-wider"
//               >
//                 Date
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 tracking-wider"
//               >
//                 Time
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 tracking-wider"
//               >
//                 Type
//               </th>
//               {/* Agenda column removed */}
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y divide-gray-200">
//             {meetings.map((meeting) => (
//               <tr key={meeting.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-[16px] font-semibold text-gray-900">{meeting.title}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-[15px] text-gray-500">{meeting.date}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-[16px] text-gray-500">{meeting.time}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMeetingTypeColor(meeting.type)}`}
//                   >
//                     {meeting.type}
//                   </span>
//                 </td>
//                 {/* Agenda cell removed */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UpcomingMeetingsTable;


"use client";

import { useGetUpcomingMeetingsQuery } from "@/redux/api/meeting/meetingApi";
import React from "react";

// interface Meeting {
//   _id: string;
//   name: string;
//   meetingDate: string;
//   startDate: string;
//   endDate: string;
//   type: "Monthly" | "Quarterly" | "Annual" | "Board";
// }

interface Meeting {
  _id: string;
  name: string;
  meetingDate: string;
  startDate: string;
  endDate: string;
  type: string;
}

const getMeetingTypeColor = (type: Meeting["type"]): string => {
  switch (type) {
    case "Monthly":
      return "bg-blue-100 text-blue-800";
    case "Quarterly":
      return "bg-green-100 text-green-800";
    case "Annual":
      return "bg-teal-100 text-teal-800";
    case "Board":
      return "bg-lime-100 text-lime-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const UpcomingMeetingsTable: React.FC = () => {
  const { data, error, isLoading } = useGetUpcomingMeetingsQuery();

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-[18px] font-bold text-gray-800 flex items-center justify-between">
          Upcoming Meetings
        </h2>
      </div>

      <div className="overflow-x-auto border m-3 rounded-lg">
        {isLoading ? (
         <div className="flex justify-center items-center min-h-120"> <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
        ) : error ? (
          <p className="text-center text-red-500 py-6">
            Failed to load meetings. Please try again.
          </p>
        ) : data?.data?.length === 0 ? (
          <p className="text-center text-gray-400 py-6">
            No meetings added yet
          </p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 tracking-wider">
                  Meeting Title
                </th>
                <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 tracking-wider">
                  Type
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {data?.data?.map((meeting: Meeting) => (
                <tr key={meeting._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-[16px] font-semibold text-gray-900">
                      {meeting.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-[15px] text-gray-500">
                      {new Date(meeting.meetingDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-[16px] text-gray-500">
                      {`${new Date(meeting.startDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMeetingTypeColor(
                        meeting.type
                      )}`}
                    >
                      {meeting.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UpcomingMeetingsTable;
