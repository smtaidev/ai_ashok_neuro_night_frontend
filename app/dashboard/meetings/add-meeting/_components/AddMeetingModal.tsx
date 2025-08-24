


// {
//   "name": "Business idea generate",
//   "location": "Dhaka, Bangladesh",
//   "type": "Monthly",
//   "meetingDate": "2025-08-25T10:00:00.000Z",
//   "startDate": "2025-08-25T10:00:00.000Z",
//   "endDate": "2025-08-25T11:00:00.000Z",
//   "meetingLength": "1 hour",
//   "owner": "Md. Sanim Mia",
//   "description": "Kickoff meeting for the new web development project.",
//   "status": "Not Started"
// }

"use client";

import React, { useState, useEffect } from "react";
import { parseISO, differenceInMinutes, format } from "date-fns";

interface AddMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (meetingData: {
    _id: string;
    name: string;
    location: string;
    type: string;
    meetingDate: string;
    startDate: string;
    endDate: string;
    meetingLength: string;
    owner: string;
    description: string;
    status: string;
  }) => void;
}

const AddMeetingModal: React.FC<AddMeetingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const today = format(new Date(), "yyyy-MM-dd");

  const [meetingTitle, setMeetingTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("07:00");
  const [meetingLength, setMeetingLength] = useState("");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");

  // Calculate meeting length dynamically
  useEffect(() => {
    if (startTime && endTime) {
      const start = parseISO(`2000-01-01T${startTime}:00`);
      const end = parseISO(`2000-01-01T${endTime}:00`);
      const diffMinutes = differenceInMinutes(end, start);
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;

      if (hours > 0 && minutes > 0) {
        setMeetingLength(`${hours} hour${hours > 1 ? "s" : ""} ${minutes} min`);
      } else if (hours > 0) {
        setMeetingLength(`${hours} hour${hours > 1 ? "s" : ""}`);
      } else {
        setMeetingLength(`${minutes} min`);
      }
    }
  }, [startTime, endTime]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${date}T${endTime}:00`);

    const meetingData = {
      _id: '',
      name: meetingTitle,
      location,
      type,
      meetingDate: startDateTime.toISOString(),
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
      meetingLength,
      owner,
      description,
      status: "Not Started",
    };

    onSubmit(meetingData);
    onClose();

    // Reset form
    setMeetingTitle("");
    setLocation("");
    setType("");
    setDate(today);
    setStartTime("06:00");
    setEndTime("07:00");
    setOwner("");
    setDescription("");
    setMeetingLength("");
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-md shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-blue-900 text-white">
          <h3 className="text-xl font-semibold">Add Meeting</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 gap-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              placeholder="Enter meeting name..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter meeting location..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select type...</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annual">Annual</option>
              <option value="Board">Board</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Length
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 cursor-not-allowed sm:text-sm"
                value={meetingLength}
                readOnly
                placeholder="Auto-calculated"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Enter owner name..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a description..."
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200 mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-900 text-white rounded-md text-sm font-medium hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer focus:ring-opacity-50"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMeetingModal;
