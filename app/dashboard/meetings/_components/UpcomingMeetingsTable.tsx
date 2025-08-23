// // components/UpcomingMeetingsTable.tsx

// import React from 'react';
// import { FaDownload } from 'react-icons/fa';
// import { IoCloudDownloadOutline } from 'react-icons/io5'; // An icon for "PDF"

// // Define the type for a single meeting object to ensure type safety.
// // This is crucial for a clean, well-structured application.
// interface Meeting {
//   id: string;
//   title: string;
//   date: string;
//   time: string;
//   type: 'Monthly' | 'Quarterly' | 'Annual' | 'Board';
//   agendaStatus: 'PDF' | 'Add Agenda' | 'Saved Agenda';
// }

// // A helper function to determine the color of the meeting type badge.
// // Using a function like this centralizes logic and keeps the JSX clean.
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

// // The main component for displaying the upcoming meetings table.
// const UpcomingMeetingsTable: React.FC = () => {
//   // Mock data for the table. In a real application, this data would be
//   // fetched from an API or a state management solution.
//   const meetings: Meeting[] = [
//     { id: '1', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Monthly', agendaStatus: 'PDF' },
//     { id: '2', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Quarterly', agendaStatus: 'PDF' },
//     { id: '3', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Annual', agendaStatus: 'Add Agenda' },
//     { id: '4', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Board', agendaStatus: 'Saved Agenda' },
//     { id: '5', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Monthly', agendaStatus: 'PDF' },
//     { id: '6', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Quarterly', agendaStatus: 'PDF' },
//   ];

//   // A helper function to render the correct button based on the agenda status.
//   const renderAgendaButton = (status: Meeting['agendaStatus']) => {
//     switch (status) {
//       case 'PDF':
//         return (
//           <button className="flex items-center justify-center gap-1 px-4 py-2 text-[16px] font-medium text-white bg-blue-700 hover:bg-blue-800 cursor-pointer rounded-lg transition-colors duration-200 shadow-md">
//             {/* <IoCloudDownloadOutline className="h-4 w-4" /> */}
//             <FaDownload className="w-3 h-3" />
//             PDF
//           </button>
//         );
//       case 'Add Agenda':
//         return (
//           <button className="flex items-center justify-center gap-1 px-4 py-2 text-[16px] font-medium text-indigo-700 bg-white hover:bg-gray-50 rounded-lg border border-indigo-700 shadow-md transition-colors duration-200">
        
//             Add Agenda
//           </button>
//         );
//       case 'Saved Agenda':
//         return (
//           <button className="flex items-center justify-center gap-1 px-4 py-2 text-[16px] font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-lg border border-gray-400 shadow-md transition-colors duration-200">
           
//             Saved Agenda
//           </button>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     // The main container. It is centered with padding and has a shadow.
    
//         <div className="bg-white border rounded-lg overflow-hidden">
//           <div className="p-6">
//             <h2 className="text-[18px] font-bold text-gray-800 flex items-center justify-between">
//               Upcoming Meetings
              
//             </h2>
//           </div>
          
//           {/* The responsive table wrapper. It will scroll horizontally on small screens. */}
//           <div className="overflow-x-auto border m-3 rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-[16px] font-medium text-gray-500  tracking-wider"
//                   >
//                     Meeting Title
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-[16px] font-medium text-gray-500  tracking-wider"
//                   >
//                     Date
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-[16px] font-medium text-gray-500  tracking-wider"
//                   >
//                     Time
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-[16px] font-medium text-gray-500  tracking-wider"
//                   >
//                     Type
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-[16px] font-medium text-gray-500  tracking-wider"
//                   >
//                     Agenda
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {meetings.map((meeting) => (
//                   <tr key={meeting.id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-[16px] font-semibold text-gray-900">{meeting.title}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-[15px] text-gray-500">{meeting.date}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-[16px] text-gray-500">{meeting.time}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMeetingTypeColor(meeting.type)}`}
//                       >
//                         {meeting.type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {renderAgendaButton(meeting.agendaStatus)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
        
     
 
//   );
// };

// export default UpcomingMeetingsTable;



// components/UpcomingMeetingsTable.tsx

import React from 'react';
import { FaDownload } from 'react-icons/fa';
import { IoCloudDownloadOutline } from 'react-icons/io5';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Monthly' | 'Quarterly' | 'Annual' | 'Board';
  agendaStatus: 'PDF' | 'Add Agenda' | 'Saved Agenda';
}

const getMeetingTypeColor = (type: Meeting['type']): string => {
  switch (type) {
    case 'Monthly':
      return 'bg-blue-100 text-blue-800';
    case 'Quarterly':
      return 'bg-green-100 text-green-800';
    case 'Annual':
      return 'bg-teal-100 text-teal-800';
    case 'Board':
      return 'bg-lime-100 text-lime-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const UpcomingMeetingsTable: React.FC = () => {
  const meetings: Meeting[] = [
    { id: '1', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Monthly', agendaStatus: 'PDF' },
    { id: '2', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Quarterly', agendaStatus: 'PDF' },
    { id: '3', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Annual', agendaStatus: 'Add Agenda' },
    { id: '4', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Board', agendaStatus: 'Saved Agenda' },
    { id: '5', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Monthly', agendaStatus: 'PDF' },
    { id: '6', title: 'Meeting Title .....', date: 'March 23, 2024', time: '7.50 P.M', type: 'Quarterly', agendaStatus: 'PDF' },
  ];

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-[18px] font-bold text-gray-800 flex items-center justify-between">
          Upcoming Meetings
        </h2>
      </div>

      <div className="overflow-x-auto border m-3 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 tracking-wider"
              >
                Meeting Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 tracking-wider"
              >
                Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[16px] font-medium text-gray-500 tracking-wider"
              >
                Type
              </th>
              {/* Agenda column removed */}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {meetings.map((meeting) => (
              <tr key={meeting.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-[16px] font-semibold text-gray-900">{meeting.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-[15px] text-gray-500">{meeting.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-[16px] text-gray-500">{meeting.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMeetingTypeColor(meeting.type)}`}
                  >
                    {meeting.type}
                  </span>
                </td>
                {/* Agenda cell removed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingMeetingsTable;
