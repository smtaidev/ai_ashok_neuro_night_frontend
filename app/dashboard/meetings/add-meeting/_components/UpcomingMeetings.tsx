// "use client";
// // pages/UpcomingMeetings.tsx (or wherever your component is located)
// import React, { useState } from "react";
// import AddMeetingModal from "./AddMeetingModal";

// // For now, this data is hardcoded.
// // In a real application, you would fetch this from an API.
// const initialMeetings = [
//   {
//     title: "Meeting Title...",
//     date: "Nov 3, 2024",
//     time: "2:20 PM",
//     type: "Monthly",
//     owner: "Xyz",
//     location: "Zoom",
//     typeColor: "bg-blue-800",
//   },
//   {
//     title: "Meeting Title...",
//     date: "Nov 3, 2024",
//     time: "2:20 PM",
//     type: "Monthly",
//     owner: "Xyz",
//     location: "Zoom",
//     typeColor: "bg-pink-800",
//   },
//   {
//     title: "Meeting Title...",
//     date: "Nov 3, 2024",
//     time: "2:20 PM",
//     type: "Monthly",
//     owner: "Xyz",
//     location: "Zoom",
//     typeColor: "bg-green-800",
//   },
//   {
//     title: "Meeting Title...",
//     date: "Nov 3, 2024",
//     time: "2:20 PM",
//     type: "Monthly",
//     owner: "Xyz",
//     location: "Zoom",
//     typeColor: "bg-blue-800",
//   },
//   {
//     title: "Meeting Title...",
//     date: "Nov 3, 2024",
//     time: "2:20 PM",
//     type: "Monthly",
//     owner: "Xyz",
//     location: "Zoom",
//     typeColor: "bg-blue-800",
//   },
// ];

// const UpcomingMeetings = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [meetings, setMeetings] = useState(initialMeetings);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleAddMeeting = (newMeetingData: {
//     title: string;
//     date: string;
//     startTime: string;
//     endTime: string;
//     meetingLength: string;
//     type: string;
//     owner: string;
//     location: string;
//     description: string;
//   }) => {
//     console.log("New Meeting Data:", newMeetingData);
//     // Combine startTime and endTime into a single time field for display
//     const time = `${newMeetingData.startTime} - ${newMeetingData.endTime}`;
//     setMeetings((prevMeetings) => [
//       ...prevMeetings,
//       { 
//         title: newMeetingData.title,
//         date: newMeetingData.date,
//         time:newMeetingData.startTime,
//         type: newMeetingData.type,
//         owner: newMeetingData.owner,
//         location: newMeetingData.location,
//         typeColor: "bg-gray-600" 
//       },
//     ]);
//   };

//   return (
//     <div className="bg-white rounded-lg border p-3">
//       <div className="border rounded-xl p-4">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-gray-800">
//             Upcoming Meetings
//           </h2>
//           <button
//             onClick={handleOpenModal}
//             className="px-5 py-2 bg-blue-700 text-white rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//           >
//             Add New Meeting
//           </button>
//         </div>

//         <div className="overflow-x-auto border rounded-md">
//           <table className="min-w-full divide-y overflow-x-auto divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Meeting Title
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Date
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Time
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Type
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Owner
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Location
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {meetings.map((meeting, index) => (
//                 <tr key={index}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {meeting.title}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {meeting.date}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {meeting.time}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${meeting.typeColor}`}
//                     >
//                       {meeting.type}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {meeting.owner}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {meeting.location}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* AddMeetingModal component */}
//       <AddMeetingModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onSubmit={handleAddMeeting}
//       />
//     </div>
//   );
// };

// export default UpcomingMeetings;


"use client";
// pages/UpcomingMeetings.tsx (or wherever your component is located)
import React, { useState } from "react";
import AddMeetingModal from "./AddMeetingModal";
import { toast } from "react-hot-toast";

const initialMeetings = [
  {
    title: "Meeting Title...",
    date: "Nov 3, 2024",
    time: "2:20 PM",
    type: "Monthly",
    owner: "Xyz",
    location: "Zoom",
    typeColor: "bg-blue-800",
  },
  {
    title: "Meeting Title...",
    date: "Nov 3, 2024",
    time: "2:20 PM",
    type: "Monthly",
    owner: "Xyz",
    location: "Zoom",
    typeColor: "bg-pink-800",
  },
  {
    title: "Meeting Title...",
    date: "Nov 3, 2024",
    time: "2:20 PM",
    type: "Monthly",
    owner: "Xyz",
    location: "Zoom",
    typeColor: "bg-green-800",
  },
  {
    title: "Meeting Title...",
    date: "Nov 3, 2024",
    time: "2:20 PM",
    type: "Monthly",
    owner: "Xyz",
    location: "Zoom",
    typeColor: "bg-blue-800",
  },
  {
    title: "Meeting Title...",
    date: "Nov 3, 2024",
    time: "2:20 PM",
    type: "Monthly",
    owner: "Xyz",
    location: "Zoom",
    typeColor: "bg-blue-800",
  },
];

const UpcomingMeetings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetings, setMeetings] = useState(initialMeetings);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddMeeting = (newMeetingData: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    meetingLength: string;
    type: string;
    owner: string;
    location: string;
    description: string;
  }) => {
    console.log("New Meeting Data:", newMeetingData);
    toast.success("Meeting added successfully!");
    const time = `${newMeetingData.startTime} - ${newMeetingData.endTime}`;
    setMeetings((prevMeetings) => [
      ...prevMeetings,
      { 
        title: newMeetingData.title,
        date: newMeetingData.date,
        time,
        type: newMeetingData.type,
        owner: newMeetingData.owner,
        location: newMeetingData.location,
        typeColor: "bg-gray-600" 
      },
    ]);
  };

  return (
    <div className="bg-white rounded-lg border p-3">
      <div className="border rounded-xl p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Upcoming Meetings
          </h2>
          <button
            onClick={handleOpenModal}
            className="px-5 py-2 bg-blue-800 cursor-pointer text-white rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add New Meeting
          </button>
        </div>

        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full divide-y overflow-x-auto divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Meeting Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Owner
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {meetings.map((meeting, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {meeting.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {meeting.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {meeting.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${meeting.typeColor}`}
                    >
                      {meeting.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {meeting.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {meeting.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AddMeetingModal component */}
      <AddMeetingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddMeeting}
      />
    </div>
  );
};

export default UpcomingMeetings;