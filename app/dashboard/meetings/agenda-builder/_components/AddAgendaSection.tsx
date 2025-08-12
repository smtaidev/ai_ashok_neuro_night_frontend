// components/AddAgendaSection.tsx

"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import AddAgendaFromModal, { FormValues } from "./modals/AddAgendaFormModal";



interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "Annual" | "Board" | "Monthly" | "Quarterly";
}

const getTypeBadgeClass = (type: Meeting["type"]) => {
  switch (type) {
    case "Annual":
      return "bg-cyan-200 text-cyan-800";
    case "Board":
      return "bg-lime-300 text-lime-900";
    case "Monthly":
      return "bg-teal-700 text-white";
    case "Quarterly":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-300 text-gray-700";
  }
};

const AddAgendaSection: React.FC = () => {
  const [selectedMeeting, setSelectedMeeting] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null); // New state for selected meeting ID
  
  
    // Handle form data from Drawer
    const handleFormSubmit = (data: FormValues) => {
      console.log("Form Data from Drawer:", data, "Meeting ID:", selectedMeetingId);
    };
  const meetings: Meeting[] = [
    { id: "1", title: "Meeting Title .....", date: "March 23,2024", time: "7.50 P.M", type: "Annual" },
    { id: "2", title: "Meeting Title .....", date: "March 23,2024", time: "7.50 P.M", type: "Board" },
    { id: "3", title: "Meeting Title .....", date: "March 23,2024", time: "7.50 P.M", type: "Monthly" },
    { id: "4", title: "Meeting Title .....", date: "March 23,2024", time: "7.50 P.M", type: "Quarterly" },
    { id: "5", title: "Meeting Title .....", date: "March 23,2024", time: "7.50 P.M", type: "Quarterly" },
    { id: "6", title: "Meeting Title .....", date: "March 23,2024", time: "7.50 P.M", type: "Quarterly" },
  ];

  const handleAddClick = (meetingId: string) => {
  console.log("Add clicked for meeting:", meetingId);
  setSelectedMeetingId(meetingId);  // যেই মিটিং আইডি তে ক্লিক করছো সেট করবে
  setIsDrawerOpen(true);             // মডাল ওপেন করবে
};

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm">
      <h2 className="text-[22px] font-semibold text-gray-800 mb-3">Add Agenda</h2>

      {/* Dropdown with custom arrow */}
      <div className="mb-4 relative">
        <select
          value={selectedMeeting}
          onChange={(e) => setSelectedMeeting(e.target.value)}
          className="w-full border rounded-lg pl-3 pr-10 py-4 text-[16px]  focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
        >
          <option value="">Select Meeting</option>
          {meetings.map((meeting) => (
            <option key={meeting.id} value={meeting.id}>
              {meeting.title}
            </option>
          ))}
        </select>
        <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
      </div>

      {/* Table with horizontal scroll */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 text-[16px]">
            <tr>
              <th className="px-4 py-2 text-left font-medium whitespace-nowrap">Meeting Title</th>
              <th className="px-4 py-2 text-left font-medium whitespace-nowrap">Date</th>
              <th className="px-4 py-2 text-left font-medium whitespace-nowrap">Time</th>
              <th className="px-4 py-2 text-left font-medium whitespace-nowrap">Type</th>
              <th className="px-4 py-2 text-left font-medium whitespace-nowrap">Agenda</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.id} className="border-t">
                <td className="px-4 py-2 text-[16px] font-semibold text-gray-800 whitespace-nowrap">
                  {meeting.title}
                </td>
                <td className="px-4 py-2 text-[15px] text-gray-600 whitespace-nowrap">{meeting.date}</td>
                <td className="px-4 py-2 text-[15px] text-gray-600 whitespace-nowrap">{meeting.time}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-md text-[10px] font-medium ${getTypeBadgeClass(meeting.type)}`}
                  >
                    {meeting.type}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <button
                    onClick={() => handleAddClick(meeting.id)}
                    className="px-4 py-1 text-[10px] font-medium border border-blue-900 text-blue-900 rounded-md hover:bg-blue-900 hover:text-white transition"
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <AddAgendaFromModal
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedMeetingId(null); // Reset selected meeting ID when closing
        }}
        title="Add Meeting Details"
        onSubmit={handleFormSubmit}
        meetingId={selectedMeetingId} // Pass the selected meeting ID to the modal
      />
    </div>
  );
};

export default AddAgendaSection;
