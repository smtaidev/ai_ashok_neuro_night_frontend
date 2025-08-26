// "use client";
// import { useGetMeetingByIdQuery } from "@/redux/api/meeting/meetingApi";
// import React, { useEffect } from "react";

// // Define the meeting interface based on API data


// type DrawerProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   title?: string;
//   meetingId: string ;
// };

// const ArchiveFromModal: React.FC<DrawerProps> = ({
//   isOpen,
//   onClose,
//   title = "Meeting Details",
//   meetingId = "",
// }) => {
//   // Format date for display
//   const formatDate = (dateString: string) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleString("default", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };
  
//   const {data: meetingData} = useGetMeetingByIdQuery(meetingId);
//   console.log("==============================================>",meetingId, "meeting",
//     meetingData
//   );




//   useEffect(() => {
//     if (isOpen) {
//       const focusableElements = document.querySelectorAll(
//         "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
//       );
//       const firstFocusable = focusableElements[0] as HTMLElement;
//       firstFocusable?.focus();
//     } else {
//       (document.activeElement as HTMLElement)?.blur();
//     }
//   }, [isOpen]);

//   return (
//     <div
//       className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
//         isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//       role="dialog"
//       aria-labelledby="modal-title"
//     >
//       <div
//         className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
//           isOpen ? "opacity-100" : "opacity-0"
//         }`}
//         onClick={onClose}
//         aria-label="Close modal"
//       />

//       <div
//         className={`absolute top-0 right-0 w-full sm:w-[40rem] h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//         inert={!isOpen}
//       >
//         <div className="flex items-center justify-between p-4 bg-blue-600 text-gray-900">
//           <h2 id="modal-title" className="text-xl font-semibold text-white tracking-tight">
//             {title}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-2xl font-medium hover:text-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
//             aria-label="Close modal"
//           >
//             &times;
//           </button>
//         </div>
//          <div>{meetingId}</div>
//         {/* <div className="p-6 flex-grow overflow-y-auto">
//           {!meeting ? (
//             <p className="text-gray-600">No meeting selected</p>
//           ) : (
//             <div className="space-y-6">
//               <div>{JSON.stringify(meeting)}</div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Meeting Name</h3>
//                 <p className="text-gray-600">{meeting.name || "N/A"}</p>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Company Name</h3>
//                 <p className="text-gray-600">{meeting.companyName || "N/A"}</p>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Type</h3>
//                 <p className="text-gray-600">{meeting.type || "N/A"}</p>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Date & Time</h3>
//                 <p className="text-gray-600">{formatDate(meeting.meetingDate)}</p>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Location</h3>
//                 <p className="text-gray-600">{meeting.location || "N/A"}</p>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Duration</h3>
//                 <p className="text-gray-600">{meeting.meetingLength || "N/A"}</p>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Owner</h3>
//                 <p className="text-gray-600">{meeting.owner || "N/A"}</p>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Description</h3>
//                 <p className="text-gray-600">{meeting.description || "N/A"}</p>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Status</h3>
//                 <p className="text-gray-600">{meeting.status || "N/A"}</p>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Agenda Items</h3>
//                 {meeting.agendaItems && meeting.agendaItems.length > 0 ? (
//                   <ul className="list-disc list-inside text-gray-600">
//                     {meeting.agendaItems.map((item: string, index: number) => (
//                       <li key={index}>{item}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-gray-600">No agenda items available</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default ArchiveFromModal;

"use client";
import {
  useGetAllAgendaQuery,
  useGetMeetingByIdQuery,
} from "@/redux/api/meeting/meetingApi";
import Image from "next/image";
import React, { useEffect } from "react";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  meetingId: string;
};

const ArchiveFromModal: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title = "View Meeting Details",
  meetingId = "",
}) => {
  const { data: meetingData } = useGetMeetingByIdQuery(meetingId);
  const { data: allAgenda } = useGetAllAgendaQuery(meetingId);

  console.log("all agenda ======================>", allAgenda);

  const meeting = meetingData?.data;
  const agendaData =  allAgenda?.data[0] ; // your API response has data[0]

  // Format date and time
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Accessibility focus trap
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
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className={`relative bg-white w-full max-w-3xl h-[90vh] rounded-lg shadow-xl flex flex-col transform transition-all duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-blue-600 rounded-t-lg">
          <h2 id="modal-title" className="text-lg font-semibold text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Meeting Details Card */}
          <div className="border rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Start Date & Time
                </p>
                <div>
                  <Image src=''/>
                <p className="text-lg font-semibold">
                  {formatDate(meeting?.startDate)} <br />
                  {formatTime(meeting?.startDate)}
                </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  End Date & Time
                </p>
                <div>
                  <Image src=''/>
                <p className="text-lg font-semibold">
                  {formatDate(meeting?.endDate)} <br />
                  {formatTime(meeting?.endDate)}
                </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <p>
                <span className="font-semibold">Meeting Type :</span>{" "}
                {meeting?.type}
              </p>
              <p>
                <span className="font-semibold">Owner :</span>{" "}
                {meeting?.owner || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Title :</span> {meeting?.name}
              </p>
              <p>
                <span className="font-semibold">Location :</span>{" "}
                {meeting?.location}
              </p>
            </div>

            <div className="mt-3">
              <p className="font-semibold text-sm">Description :</p>
              <p className="text-sm text-gray-700 mt-1">
                {meeting?.description || "No description available"}
              </p>
            </div>
          </div>

          {/* Welcome & Opening Remark */}
          {agendaData?.welcomeAndOpeningRemark && (
            <div className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                Welcome & Opening Remark
              </h3>
              <p className="text-sm mb-2">
                <span className="font-semibold">Presenter:</span>{" "}
                {agendaData.welcomeAndOpeningRemark.presenter
                  ?.map((p: any) => p.userName)
                  .join(", ")}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Time Allocated:</span>{" "}
                {agendaData.welcomeAndOpeningRemark.timeAllocated?.hours} Hr{" "}
                {agendaData.welcomeAndOpeningRemark.timeAllocated?.minutes} Min
              </p>
            </div>
          )}

          {/* Agenda Items */}
          {agendaData?.agendaItems?.map((agenda: any, idx: number) => (
            <div
              key={agenda._id || idx}
              className="border rounded-lg p-4 shadow-sm"
            >
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                Agenda Item
              </h3>

              {/* Time Allocated */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⏱</span>
                  <div>
                    <p className="text-xs text-gray-500">Time Allocated</p>
                    <p className="text-lg font-bold text-gray-800">
                      {agenda?.timeAllocated?.hours || 0} Hr{" "}
                      {agenda?.timeAllocated?.minutes || 0} Min
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm mb-1">
                <span className="font-semibold">Title :</span>{" "}
                {agenda?.title || "N/A"}
              </p>

              {/* Show presenters only if they exist */}
              {agenda?.presenter?.length > 0 && (
                <p className="text-sm mb-1">
                  <span className="font-semibold">Presenter :</span>{" "}
                  {agenda.presenter.map((p: any) => p.userName).join(", ")}
                </p>
              )}

              <p className="font-semibold text-sm mt-2">
                Agenda Description :
              </p>
              <p className="text-sm text-gray-700">
                {agenda?.details || "No details available"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchiveFromModal;
