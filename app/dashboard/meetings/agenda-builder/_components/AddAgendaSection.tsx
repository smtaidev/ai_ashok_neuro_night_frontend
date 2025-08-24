// components/AddAgendaSection.tsx
"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import AddAgendaFromModal, { FormValues } from "./modals/AddAgendaFormModal";
import {
  useGetMeetingsQuery,
  Meeting,
} from "@/redux/api/meeting/meetingApi";
import { format } from "date-fns"; // ✅ using date-fns

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
  const [selectedMeetingId, setSelectedMeetingId] = useState<string>(
    ""
  );

  // ✅ Fetch meetings from API
  const { data, isLoading, isError } = useGetMeetingsQuery();

  const handleFormSubmit = (formData: FormValues) => {
    console.log("Agenda Submitted:", formData, "Meeting ID:", selectedMeetingId);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border p-4 shadow-sm">
        <h2 className="text-[22px] font-semibold text-gray-800 mb-3">Add Agenda</h2>
        <p className="text-gray-600">Loading meetings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-xl border p-4 shadow-sm">
        <h2 className="text-[22px] font-semibold text-gray-800 mb-3">Add Agenda</h2>
        <p className="text-red-500">Failed to load meetings.</p>
      </div>
    );
  }

  const meetings: Meeting[] = data?.data || [];

  const handleAddClick = (meetingId: string) => {
    setSelectedMeetingId(meetingId);
    setIsDrawerOpen(true);
    // console.log(meetingId);
  };

  // ✅ Helper to format ISO string safely
  const formatDate = (isoString: string) =>
    isoString ? format(new Date(isoString), "MMMM dd, yyyy") : "";

  const formatTime = (isoString: string) =>
    isoString ? format(new Date(isoString), "hh:mm a") : "";

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm">
      <h2 className="text-[22px] font-semibold text-gray-800 mb-3">Add Agenda</h2>

      {/* Dropdown with custom arrow */}
      <div className="mb-4 relative">
        <select
          value={selectedMeeting}
          onChange={(e) => setSelectedMeeting(e.target.value)}
          className="w-full border rounded-lg pl-3 pr-10 py-4 text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
        >
          <option value="">Select Meeting</option>
          {meetings.map((meeting) => (
            <option key={meeting._id} value={meeting._id}>
              {meeting?.name}
            </option>
          ))}
        </select>
        <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
      </div>

      {/* Table with meetings */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 text-[16px]">
            <tr>
              <th className="px-4 py-2 text-left font-medium whitespace-nowrap">
                Meeting Title
              </th>
              <th className="px-4 pl-8 py-2 text-left font-medium whitespace-nowrap">
                Date
              </th>
              <th className="px-4 pl-5 py-2 text-left font-medium whitespace-nowrap">
                Time
              </th>
              <th className="px-4 py-2 pl-6 text-left font-medium whitespace-nowrap">
                Type
              </th>
              <th className="px-4 py-2 text-left font-medium whitespace-nowrap">
                Agenda
              </th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting._id} className="border-t">
                <td className="px-4 py-2 text-[16px] font-semibold text-gray-800 whitespace-nowrap">
                  {meeting?.name}
                </td>
                <td className="px-4 py-2 text-[15px] text-gray-600 whitespace-nowrap">
                  {formatDate(meeting.meetingDate)}
                </td>
                <td className="px-4 py-2 text-[15px] text-gray-600 whitespace-nowrap">
                  {formatTime(meeting.startDate)} 
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-md text-[10px] font-medium ${getTypeBadgeClass(
                      meeting.type
                    )}`}
                  >
                    {meeting.type}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <button
                    onClick={() => handleAddClick(meeting._id)}
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

      {/* Drawer Modal */}
      <AddAgendaFromModal
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedMeetingId("");
        }}
        title="Add Meeting Details"
        onSubmit={handleFormSubmit}
        meetingId={selectedMeetingId}
      />
    </div>
  );
};

export default AddAgendaSection;
