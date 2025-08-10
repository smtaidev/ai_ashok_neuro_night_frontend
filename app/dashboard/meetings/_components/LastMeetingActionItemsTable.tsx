// components/LastMeetingActionItemsTable.tsx

import React from "react";
import { IoIosArrowForward } from "react-icons/io";

// Define the type for a single action item object.
interface ActionItem {
  id: string;
  title: string;
  date: string;
  agendaItem: string;
  priority: "High" | "Low" | "medium";
  status: "In Progress" | "Need More Info" | "Not Started" | "Done";
}

// A helper function to get the color for the priority badge.
const getPriorityColor = (priority: ActionItem["priority"]): string => {
  switch (priority) {
    case "High":
      return "text-red-600 font-semibold";
    case "Low":
    case "medium": // The image shows low and medium priorities having the same color
      return "text-yellow-600 font-semibold";
    default:
      return "text-gray-600";
  }
};

// A helper function to get the color and text for the status badge.
const getStatusBadge = (status: ActionItem["status"]) => {
  let bgColor: string;
  let textColor: string;
  switch (status) {
    case "In Progress":
      bgColor = "bg-blue-800";
      textColor = "text-white";
      break;
    case "Need More Info":
      bgColor = "bg-yellow-400";
      textColor = "text-gray-800";
      break;
    case "Not Started":
      bgColor = "bg-gray-300";
      textColor = "text-gray-800";
      break;
    case "Done":
      bgColor = "bg-green-500";
      textColor = "text-white";
      break;
    default:
      bgColor = "bg-gray-200";
      textColor = "text-gray-800";
  }
  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {status}
    </span>
  );
};

const LastMeetingActionItemsTable: React.FC = () => {
  // Mock data for the table, representing action items from the last meeting.
  const actionItems: ActionItem[] = [
    {
      id: "b1",
      title: "Meeting Title .....",
      date: "March 23, 2024",
      agendaItem: "This is Agenda...",
      priority: "High",
      status: "In Progress",
    },
    {
      id: "b2",
      title: "Meeting Title .....",
      date: "March 23, 2024",
      agendaItem: "This is Agenda...",
      priority: "Low",
      status: "Need More Info",
    },
    {
      id: "b3",
      title: "Meeting Title .....",
      date: "March 23, 2024",
      agendaItem: "This is Agenda...",
      priority: "medium",
      status: "Not Started",
    },
    {
      id: "b4",
      title: "Meeting Title .....",
      date: "March 23, 2024",
      agendaItem: "This is Agenda...",
      priority: "Low",
      status: "Done",
    },
    {
      id: "b5",
      title: "Meeting Title .....",
      date: "March 23, 2024",
      agendaItem: "This is Agenda...",
      priority: "Low",
      status: "Done",
    },
    {
      id: "b6",
      title: "Meeting Title .....",
      date: "March 23, 2024",
      agendaItem: "This is Agenda...",
      priority: "Low",
      status: "Done",
    },
  ];

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center justify-between">
          Action Items From Last Meeting
        </h2>
      </div>

      <div className="overflow-x-auto border m-3 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
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
                Meeting Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Agenda Item
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Priority
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {actionItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.agendaItem}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LastMeetingActionItemsTable;
