"use client";
import React, { useEffect } from "react";

// Define the meeting interface based on API data
interface Meeting {
  _id: string;
  companyName: string;
  location: string;
  description: string;
  agendaItems?:any;
  type: "Annual" | "Board" | "Monthly" | "Quarterly";
  status: string;
  name: string;
  owner: string;
  meetingLength: string;
  meetingDate: string;
  createdAt: string;
  startDate: string;
  __v: number;
  endDate: string;
  updatedAt: string;
}

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  meeting: Meeting | null | any;
};

const ArchiveFromModal: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title = "Meeting Details",
  meeting,
}) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    if (isOpen) {
      const focusableElements = document.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      const firstFocusable = focusableElements[0] as HTMLElement;
      firstFocusable?.focus();
    } else {
      (document.activeElement as HTMLElement)?.blur();
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-label="Close modal"
      />

      <div
        className={`absolute top-0 right-0 w-full sm:w-[40rem] h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        inert={!isOpen}
      >
        <div className="flex items-center justify-between p-4 bg-blue-600 text-gray-900">
          <h2 id="modal-title" className="text-xl font-semibold text-white tracking-tight">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl font-medium hover:text-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="p-6 flex-grow overflow-y-auto">
          {!meeting ? (
            <p className="text-gray-600">No meeting selected</p>
          ) : (
            <div className="space-y-6">
              <div>{JSON.stringify(meeting)}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Meeting Name</h3>
                <p className="text-gray-600">{meeting.name || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Company Name</h3>
                <p className="text-gray-600">{meeting.companyName || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Type</h3>
                <p className="text-gray-600">{meeting.type || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Date & Time</h3>
                <p className="text-gray-600">{formatDate(meeting.meetingDate)}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Location</h3>
                <p className="text-gray-600">{meeting.location || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Duration</h3>
                <p className="text-gray-600">{meeting.meetingLength || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Owner</h3>
                <p className="text-gray-600">{meeting.owner || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                <p className="text-gray-600">{meeting.description || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Status</h3>
                <p className="text-gray-600">{meeting.status || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Agenda Items</h3>
                {meeting.agendaItems && meeting.agendaItems.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-600">
                    {meeting.agendaItems.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No agenda items available</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchiveFromModal;