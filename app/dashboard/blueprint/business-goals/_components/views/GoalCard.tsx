import React, { useState, useRef, useEffect } from "react";
import { Goal } from "../AfterBusinessGoal";

const GoalCard = ({
  goal,
  onEdit,
  onDelete,
}: {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="flex items-center justify-between rounded-md bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <div className="flex w-full items-center space-x-4">
        {/* গোলের শিরোনাম এবং উপশিরোনাম */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{goal.title}</h3>
          <p className="text-sm text-gray-500">{goal.subtitle}</p>
        </div>

        {/* লেবেল/ট্যাগ বিভাগ */}
        <div className="flex items-center space-x-2">
          {goal.priority && (
            <span
              className={`rounded-md px-3 py-1 text-xs font-medium ${
                goal.priority === "Urgent"
                  ? "text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {goal.priority}
            </span>
          )}
          {goal.status && (
            <span
              className={`rounded-md px-3 py-1 text-xs font-medium ${
                goal.status === "Overdue"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {goal.status}
            </span>
          )}
          {goal.category && (
            <span className="rounded-md bg-blue-900 px-3 py-1 text-xs font-medium text-white">
              {goal.category}
            </span>
          )}
        </div>

        {/* প্রগ্রেস বার বিভাগ */}
        <div className="flex w-40 flex-col items-end space-y-1">
          <p className="text-xs text-gray-500">{goal.progressLabel}</p>
          <div className="h-2 w-full overflow-hidden rounded-md bg-gray-200">
            <div
              className="h-full rounded-md bg-blue-900"
              style={{ width: `${goal.progressValue}%` }}
            />
          </div>
        </div>
      </div>

      {/* অ্যাকশন মেনু বাটন */}
      <div className="ml-4 relative" ref={menuRef}>
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={menuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8ZM12 14C10.9 14 10 14.9 10 16C10 17.1 10.9 18 12 18C13.1 18 14 17.1 14 16C14 14.9 13.1 14 12 14Z" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute right-0 z-10 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                onEdit(goal);
                setMenuOpen(false);
              }}
            >
              Edit
            </button>
            <button
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
              onClick={() => {
                onDelete(goal);
                setMenuOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalCard;
