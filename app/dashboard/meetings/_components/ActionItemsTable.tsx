// components/ActionItemsTable.tsx
"use client";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { decodedToken } from "@/utils/jwt";

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
      return "text-yellow-600 font-semibold";
    case "medium":
      return "text-blue-600 font-semibold";
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

const ActionItemsTable: React.FC = () => {

   useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const userInfo = decodedToken(token);
        console.log("User Info: in action item assign to me =======================> ", userInfo);
      }
    }, [])

  // We'll manage the action items in local state now, so we can update them.
  const [actionItems, setActionItems] = useState<ActionItem[]>([
    {
      id: "a1",
      title: "Meeting Title .....",
      date: "March 23, 2024",
      agendaItem: "This is Agenda...",
      priority: "High",
      status: "In Progress",
    },
    {
      id: "a2",
      title: "Meeting Title .....",
      date: "March 23, 2024",
      agendaItem: "This is Agenda...",
      priority: "Low",
      status: "Need More Info",
    },
    {
      id: "a3",
      title: "Meeting Title .....",
      date: "March 23, 2024",
      agendaItem: "This is Agenda...",
      priority: "medium",
      status: "Not Started",
    },
    {
      id: "a4",
      title: "Meeting Title .....",
      date: "March 23, 2024",
      agendaItem: "This is Agenda...",
      priority: "medium",
      status: "Done",
    },
    {
      id: "a5",
      title: "Meeting Title .....",
      date: "March 23, 2024",
      agendaItem: "This is Agenda...",
      priority: "Low",
      status: "Done",
    },
    {
      id: "a6",
      title: "Meeting Title .....",
      date: "March 23, 2024",
      agendaItem: "This is Agenda...",
      priority: "Low",
      status: "Done",
    },
  ]);

  // State to manage which dropdown is open. We store the id of the item.
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Function to handle changing the status of an action item.
  const handleStatusChange = (id: string, newStatus: ActionItem['status']) => {
    setActionItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    setOpenDropdownId(null); // Close the dropdown after a selection is made.
  };

  const handleDropdownToggle = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const statusOptions: ActionItem['status'][] = [
    'Not Started',
    'In Progress',
    'Need More Info',
    'Done',
  ];

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="p-6">
        <h2 className="text-[18px] font-bold text-gray-800 flex items-center justify-between">
          Action Items Assigned to Me
        </h2>
      </div>

      <div className="overflow-x-auto border m-3 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[16px] font-medium text-gray-500  tracking-wider"
              >
                Meeting Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[16px] font-medium text-gray-500  tracking-wider"
              >
                Meeting Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[16px] font-medium text-gray-500  tracking-wider"
              >
                Agenda Item
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[16px] font-medium text-gray-500  tracking-wider"
              >
                Priority
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-[16px] font-medium text-gray-500  tracking-wider"
              >
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Options</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {actionItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-[16px] text-gray-900">{item.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-[15px] font-semibold text-gray-500">{item.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-[15px] text-gray-500">{item.agendaItem}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-[15px] ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                {/* The dropdown button and menu */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-[15px] font-medium">
                  <div className="relative">
                    <button
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => handleDropdownToggle(item.id)}
                    >
                      <BsThreeDotsVertical className="h-5 w-5" />
                    </button>
                    {openDropdownId === item.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                        <div className="py-1">
                          {statusOptions.map((statusOption) => (
                            <button
                              key={statusOption}
                              onClick={() => handleStatusChange(item.id, statusOption)}
                              className="block w-full text-left px-4 py-2 text-[15px] text-gray-700 hover:bg-gray-100"
                            >
                              {statusOption}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActionItemsTable;
