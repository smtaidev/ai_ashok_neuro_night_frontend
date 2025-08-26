
//? working code 

"use client";

import React, { useState } from "react";
import AddMeetingModal from "./AddMeetingModal";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { useCreateMeetingMutation, useGetMeetingsQuery, Meeting } from "@/redux/api/meeting/meetingApi";

const UpcomingMeetings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: meetingsData, refetch } = useGetMeetingsQuery();
  const [createMeeting] = useCreateMeetingMutation();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  //  _id: string;
  //   name: string;
  //   location: string;
  //   type: string;
  //   meetingDate: string;
  //   startDate: string;
  //   endDate: string;
  //   meetingLength: string;
  //   owner: string;
  //   description: string;
  //   status: string;
  const handleAddMeeting = async (newMeetingData: Meeting) => {
    const {  name, meetingDate,meetingLength, startDate, endDate, type, owner, location, description, status } = newMeetingData;


    console.log(newMeetingData ,"newMeetingData");


    const meetingDataToProvide = {
      name,
      meetingDate,
      startDate,
      endDate,
      type,
      owner,
      location,
      description,
      status,
      meetingLength,
    };

    console.log("New Meeting Data:", meetingDataToProvide);
    try {
      const res = await createMeeting(meetingDataToProvide).unwrap();
      if (res.success) {
        toast.success("Meeting added successfully!");
        refetch();
        handleCloseModal();
      } else {
        toast.error(res.message || "Failed to create meeting");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="border rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Upcoming Meetings</h2>
          <button
            onClick={handleOpenModal}
            className="px-5 py-2 bg-blue-800 text-white rounded-md text-sm font-medium hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add New Meeting
          </button>
        </div>

        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {meetingsData?.data && meetingsData.data.length > 0 ? (
                meetingsData.data.map((meeting: Meeting) => (
                  <tr key={meeting._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {meeting.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(meeting.meetingDate), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`${format(new Date(meeting.startDate), "h:mm a")}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-gray-600 text-xs font-semibold ${
                          meeting.type === "Monthly"
                            ? "bg-teal-600"
                            : meeting.type === "Quarterly"
                            ? "bg-green-600"
                            : meeting.type === "Annual"
                            ? "bg-sky-300"
                            : meeting.type === "Board"
                            ? "bg-red-300/50"
                            : "bg-gray-600"
                        }`}
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
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                    No upcoming meetings
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Meeting Modal */}
      <AddMeetingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddMeeting}
      />
    </div>
  );
};

export default UpcomingMeetings;