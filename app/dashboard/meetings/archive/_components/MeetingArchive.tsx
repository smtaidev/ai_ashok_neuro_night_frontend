// "use client";
// import React, { useState } from "react";
// import ArchiveFromModal, { FormValues } from "../../agenda-builder/_components/modals/ArchiveFromModal";

// // Define the type for a single archived meeting item.
// interface Meeting {
//   id: string;
//   day: number;
//   month: string;
//   name: string;
//   type: "Annual" | "Board" | "Monthly" | "Quarterly";
// }

// // A helper function to get the color for the meeting type badge.
// const getTypeBadgeClass = (type: Meeting["type"]) => {
//   switch (type) {
//     case "Annual":
//       return "text-cyan-600";
//     case "Board":
//       return "text-lime-600";
//     case "Monthly":
//       return "text-teal-600";
//     case "Quarterly":
//       return "text-green-600";
//     default:
//       return "text-gray-600";
//   }
// };

// const MeetingsArchive: React.FC = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null); // New state for selected meeting ID
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("");

//   // Handle form data from Drawer
//   const handleFormSubmit = (data: FormValues) => {
//     console.log("Form Data from Drawer:", data, "Meeting ID:", selectedMeetingId);
//   };

//   const meetings: Meeting[] = [
//     { id: "1", day: 1, month: "July 2024", name: "Meeting Name", type: "Monthly" },
//     { id: "2", day: 1, month: "July 2024", name: "Meeting Name", type: "Quarterly" },
//     { id: "3", day: 1, month: "July 2024", name: "Meeting Name", type: "Annual" },
//     { id: "4", day: 1, month: "July 2024", name: "Meeting Name", type: "Board" },
//     { id: "5", day: 1, month: "July 2024", name: "Meeting Name", type: "Board" },
//     { id: "6", day: 1, month: "July 2024", name: "Meeting Name", type: "Board" },
//   ];

//   // Function to handle button click and set the selected meeting ID
//   const handleViewAgendaClick = (meetingId: string) => {
//     setSelectedMeetingId(meetingId);
//     setIsDrawerOpen(true);
//   };

//   return (
//     <div className="bg-white rounded-lg border overflow-hidden">
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-gray-800">Meetings Archive</h2>
//       </div>

//       {/* Search and Filter Section */}
//       <div className="px-6 border-gray-200 flex flex-col md:flex-row md:items-center gap-4">
//         <div className="flex-grow">
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full md:max-w-xs border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-600 font-medium">Filter By</span>
//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All</option>
//             <option value="Monthly">Monthly</option>
//             <option value="Quarterly">Quarterly</option>
//             <option value="Annual">Annual</option>
//             <option value="Board">Board</option>
//           </select>
//         </div>
//       </div>

//       {/* List of Meetings */}
//       <div className="divide-y divide-gray-200 m-4 border rounded-2xl">
//         {meetings.map((meeting) => (
//           <div key={meeting.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//             <div className="text-center font-bold text-gray-800">
//               <p className="text-2xl">{meeting.day}</p>
//               <p className="text-sm">{meeting.month}</p>
//             </div>
//             <div className="font-medium text-gray-800">{meeting.name}</div>
//             <div className={`text-sm font-medium ${getTypeBadgeClass(meeting.type)}`}>
//               {meeting.type}
//             </div>
//             <div>
//               <button
//                 onClick={() => handleViewAgendaClick(meeting.id)} // Pass meeting.id to handler
//                 className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-white cursor-pointer bg-blue-900 rounded-lg hover:bg-blue-950 transition-colors duration-200"
//               >
//                 View Agenda & Action Item
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <ArchiveFromModal
//         isOpen={isDrawerOpen}
//         onClose={() => {
//           setIsDrawerOpen(false);
//           setSelectedMeetingId(null); // Reset selected meeting ID when closing
//         }}
//         title="Add Meeting Details"
//         onSubmit={handleFormSubmit}
//         meetingId={selectedMeetingId} // Pass the selected meeting ID to the modal
//       />
//     </div>
//   );
// };

// // export default MeetingsArchive;

//? working code 


// "use client";
// import React, { useState } from "react";
// import ArchiveFromModal, { FormValues } from "../../agenda-builder/_components/modals/ArchiveFromModal";
// import { useGetPastMeetingsQuery } from "@/redux/api/meeting/meetingApi";

// // Define the type for a single archived meeting item based on API data
// interface Meeting {
//   _id: string;
//   companyName: string;
//   location: string;
//   description: string;
//   agendaItems?:any;
//   type: "Annual" | "Board" | "Monthly" | "Quarterly";
//   status: string;
//   name: string;
//   owner: string;
//   meetingLength: string;
//   meetingDate: string;
//   createdAt: string;
//   startDate: string;
//   __v: number;
//   endDate: string;
//   updatedAt: string;

  
// }

// // A helper function to get the color for the meeting type badge
// const getTypeBadgeClass = (type: Meeting["type"]) => {
//   switch (type) {
//     case "Annual":
//       return "text-cyan-600";
//     case "Board":
//       return "text-lime-600";
//     case "Monthly":
//       return "text-teal-600";
//     case "Quarterly":
//       return "text-green-600";
//     default:
//       return "text-gray-600";
//   }
// };

// // Helper function to format meeting date into day and month
// const formatMeetingDate = (dateString: string) => {
//   const date = new Date(dateString);
//   return {
//     day: date.getDate(),
//     month: date.toLocaleString('default', { month: 'long', year: 'numeric' })
//   };
// };

// const MeetingsArchive: React.FC = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("");

//   // Fetch meetings data
//   const { data: meetingsData, isLoading, error } = useGetPastMeetingsQuery();



//   console.log(meetingsData, "meetingsData");


//   // Handle form data from Drawer
//   const handleFormSubmit = (data: FormValues) => {
//     console.log("Form Data from Drawer:", data, "Meeting ID:", selectedMeetingId);
//   };

//   // Function to handle button click and set the selected meeting ID
//   const handleViewAgendaClick = (meetingId: string) => {
//     setSelectedMeetingId(meetingId);
//     setIsDrawerOpen(true);
//   };

//   // Filter and search logic
//   const filteredMeetings = meetingsData?.data?.filter((meeting: Meeting) => {
//     const matchesSearch = 
//       meeting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       meeting.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       meeting.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       meeting.owner.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesType = filterType ? meeting.type === filterType : true;
    
//     return matchesSearch && matchesType;
//   }) || [];

//   if (isLoading) {
//     return <div className="p-6">Loading meetings...</div>;
//   }

//   if (error) {
//     return <div className="p-6">Error loading meetings</div>;
//   }

//   return (
//     <div className="bg-white rounded-lg border overflow-hidden">
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-gray-800">Meetings Archive</h2>
//       </div>

//       {/* Search and Filter Section */}
//       <div className="px-6 border-gray-200 flex flex-col md:flex-row md:items-center gap-4">
//         <div className="flex-grow">
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full md:max-w-xs border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-600 font-medium">Filter By</span>
//           <select
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All</option>
//             <option value="Monthly">Monthly</option>
//             <option value="Quarterly">Quarterly</option>
//             <option value="Annual">Annual</option>
//             <option value="Board">Board</option>
//           </select>
//         </div>
//       </div>

//       {/* List of Meetings */}
//       <div className="divide-y divide-gray-200 m-4 border rounded-2xl">
//         {filteredMeetings.map((meeting: Meeting) => {
//           const { day, month } = formatMeetingDate(meeting.meetingDate);
//           return (
//             <div key={meeting._id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//               <div className="text-center font-bold text-gray-800">
//                 <p className="text-2xl">{day}</p>
//                 <p className="text-sm">{month}</p>
//               </div>
//               <div className="font-medium text-gray-800">{meeting.name}</div>
//               <div className={`text-sm font-medium ${getTypeBadgeClass(meeting.type)}`}>
//                 {meeting.type}
//               </div>
//               <div>
//                 <button
//                   onClick={() => handleViewAgendaClick(meeting._id)}
//                   className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-white cursor-pointer bg-blue-900 rounded-lg hover:bg-blue-950 transition-colors duration-200"
//                 >
//                   View Agenda & Action Item
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <ArchiveFromModal
//         isOpen={isDrawerOpen}
//         onClose={() => {
//           setIsDrawerOpen(false);
//           setSelectedMeetingId(null);
//         }}
//         title="Add Meeting Details"
//         onSubmit={handleFormSubmit}
//         meetingId={selectedMeetingId}
//       />
//     </div>
//   );
// };

// export default MeetingsArchive;


"use client";
import React, { useState } from "react";
import ArchiveFromModal from "../../agenda-builder/_components/modals/ArchiveFromModal";
import { useGetPastMeetingsQuery } from "@/redux/api/meeting/meetingApi";

// Define the type for a single archived meeting item based on API data


interface Meeting {
  _id: string ;
  companyName: string;
  location: string;
  description: string;
  agendaItems?: {
    data: []} | any;
  type: "Annual" | "Board" | "Monthly" | "Quarterly";
  status: string;
  name: string;
  owner: string;
  meetingLength: string;
  meetingDate: string;
  createdAt?: string;
  startDate?: string;
  __v?: number;
  endDate?: string;
  updatedAt?: string;

  
}

// A helper function to get the color for the meeting type badge
const getTypeBadgeClass = (type: Meeting["type"]) => {
  switch (type) {
    case "Annual":
      return "text-cyan-600";
    case "Board":
      return "text-lime-600";
    case "Monthly":
      return "text-teal-600";
    case "Quarterly":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

// Helper function to format meeting date into day and month
const formatMeetingDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month: date.toLocaleString("default", { month: "long", year: "numeric" }),
  };
};

const MeetingsArchive: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  // Fetch meetings data
  const { data: meetingsData, isLoading, error } = useGetPastMeetingsQuery();

  // Function to handle button click and set the selected meeting
  const handleViewAgendaClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsDrawerOpen(true);
  };

  // Filter and search logic
  const filteredMeetings = meetingsData?.data?.filter((meeting: Meeting) => {
    const matchesSearch =
      meeting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.owner.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType ? meeting.type === filterType : true;

    return matchesSearch && matchesType;
  }) || [];

  if (isLoading) {
    return <div className="p-6">Loading meetings...</div>;
  }

  if (error) {
    return <div className="p-6">Error loading meetings: {(error as any).message}</div>;
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Meetings Archive</h2>
      </div>

      {/* Search and Filter Section */}
      <div className="px-6 border-gray-200 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:max-w-xs border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Filter By</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Annual">Annual</option>
            <option value="Board">Board</option>
          </select>
        </div>
      </div>

      {/* List of Meetings */}
      <div className="divide-y divide-gray-200 m-4 border rounded-2xl">
        {filteredMeetings.length === 0 ? (
          <div className="p-6 text-center text-gray-600">No meetings found</div>
        ) : (
          filteredMeetings.map((meeting: Meeting) => {
            const { day, month } = formatMeetingDate(meeting.meetingDate);
            return (
              <div
                key={meeting._id}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="text-center font-bold text-gray-800">
                  <p className="text-2xl">{day}</p>
                  <p className="text-sm">{month}</p>
                </div>
                <div className="font-medium text-gray-800">{meeting.name}</div>
                <div className={`text-sm font-medium ${getTypeBadgeClass(meeting.type)}`}>
                  {meeting.type}
                </div>
                <div>
                  <button
                    onClick={() => handleViewAgendaClick(meeting)}
                    className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-white cursor-pointer bg-blue-900 rounded-lg hover:bg-blue-950 transition-colors duration-200"
                  >
                    View Agenda & Action Item
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <ArchiveFromModal
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedMeeting(null);
        }}
        title="Meeting Details"
        meetingId={selectedMeeting?._id ?? ''}
      />
    </div>
  );
};

export default MeetingsArchive;