// "use client";
// import {
//   useGetAllAgendaQuery,
//   useGetMeetingByIdQuery,
// } from "@/redux/api/meeting/meetingApi";
// import React, { useEffect, useRef } from "react";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

// type ModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   meetingId: string;
// };

// const MeetingDetailsModal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   meetingId,
// }) => {
//   const { data: meetingData } = useGetMeetingByIdQuery(meetingId);
//   const { data: allAgenda } = useGetAllAgendaQuery(meetingId);
//   const printRef = useRef<HTMLDivElement>(null);

//   const meeting = meetingData?.data;
//   const agendaData = allAgenda?.data?.agendaItems || [];
//   const welcomeRemark = allAgenda?.data?.welcomeAndOpeningRemark || {};

//   const formatDateTime = (dateString: string) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return {
//       date: date.toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       }),
//       time: date.toLocaleTimeString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       }),
//     };
//   };

//   const start = formatDateTime(meeting?.startDate ?? "");
//   const end = formatDateTime(meeting?.endDate ?? "");

//   useEffect(() => {
//     if (isOpen) {
//       const focusable = document.querySelector("button, [href], input") as HTMLElement;
//       focusable?.focus();
//     }
//   }, [isOpen]);

//   // ---------------------------
//   // DOWNLOAD FUNCTIONALITY
//   // ---------------------------
//   const handleDownloadPDF = async () => {
//     if (!printRef.current) return;

//     const clonedElement = printRef.current.cloneNode(true) as HTMLElement;

//     // Force inline colors to avoid "lab()" error
//     clonedElement.style.width = "800px";
//     clonedElement.style.maxHeight = "none";
//     clonedElement.style.overflow = "visible";
//     clonedElement.style.position = "absolute";
//     clonedElement.style.top = "-9999px";
//     clonedElement.style.backgroundColor = "#ffffff";
//     clonedElement.querySelectorAll("*").forEach((el: any) => {
//       const style = window.getComputedStyle(el);
//       el.style.color = style.color || "#000000";
//       el.style.backgroundColor = style.backgroundColor || "transparent";
//     });

//     document.body.appendChild(clonedElement);

//     try {
//       const canvas = await html2canvas(clonedElement, { scale: 2, useCORS: true, backgroundColor: null });
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "pt", "a4");
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`${meeting?.name || "Meeting"}_Details.pdf`);
//     } catch (error) {
//       console.error("PDF download failed:", error);
//     }

//     document.body.removeChild(clonedElement);
//   };
//   // ---------------------------

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/50" onClick={onClose} />

//       {/* Modal */}
//       <div className="relative bg-gray-200 w-full max-w-4xl h-[90vh] rounded-2xl shadow-lg flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 bg-gray-800 rounded-t-2xl">
//           <h2 className="text-lg font-semibold text-white">PDF Preview</h2>
//           <div className="flex gap-4">
//             <button
//               onClick={handleDownloadPDF}
//               className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               Download PDF
//             </button>
//             <button
//               onClick={onClose}
//               className="text-2xl text-white hover:text-gray-300"
//             >
//               &times;
//             </button>
//           </div>
//         </div>

//         {/* PDF Content */}
//         <div
//           ref={printRef}
//           className="flex-1 overflow-y-auto bg-white m-4 p-6 shadow-md border border-gray-300 rounded-lg"
//         >
//           {/* Meeting Info */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-4">
//             <div>
//               <p className="text-gray-500 font-medium">Start</p>
//               <p className="font-semibold">{typeof start === 'object' && start.date}</p>
//               <p className="text-gray-700">{typeof start === 'object' && start.time}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">End</p>
//               <p className="font-semibold">{typeof end === 'object' && end.date}</p>
//               <p className="text-gray-700">{typeof end === 'object' && end.time}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">Type</p>
//               <p className="font-semibold">{meeting?.type || "N/A"}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">Owner</p>
//               <p className="font-semibold">{meeting?.owner || "N/A"}</p>
//             </div>
//           </div>

//           {/* Title & Location */}
//           <div className="grid grid-cols-2 gap-6 text-sm mb-4">
//             <div>
//               <p className="text-gray-500 font-medium">Title</p>
//               <p className="font-semibold">{meeting?.name || "N/A"}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">Location</p>
//               <p className="font-semibold">{meeting?.location || "N/A"}</p>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="mb-6">
//             <p className="text-gray-500 font-medium mb-1">Description</p>
//             <p className="text-gray-700">{meeting?.description || "No description available"}</p>
//           </div>

//           {/* Welcome & Opening Remarks */}
//           {welcomeRemark.presenter?.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome & Opening Remarks</h3>
//               <p className="text-sm text-gray-700 mb-2">
//                 <span className="font-medium">Presenter(s): </span>
//                 {welcomeRemark.presenter.map((p: any) => p.userName).join(", ")}
//               </p>
//               {welcomeRemark.timeAllocated && (
//                 <p className="text-sm text-gray-700 mb-2">
//                   <span className="font-medium">Time Allocated: </span>
//                   {welcomeRemark.timeAllocated.hours || 0} hr {welcomeRemark.timeAllocated.minutes || 0} min
//                 </p>
//               )}
//               {welcomeRemark.details && (
//                 <p className="text-sm text-gray-700">
//                   <span className="font-medium">Remarks: </span>
//                   {welcomeRemark.details || "No remarks provided"}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Agenda Items */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">Agenda Items</h3>
//             <div className="space-y-4">
//               {agendaData.map((agenda: any, idx: number) => (
//                 <div
//                   key={agenda._id || idx}
//                   className="border rounded-xl p-4 shadow-sm"
//                 >
//                   <p className="font-semibold text-gray-800 mb-2">{agenda?.title || "Untitled"}</p>

//                   <div className="flex gap-6 mb-3">
//                     <div className="text-center flex-1 border rounded-lg p-2">
//                       <p className="text-xs text-gray-500">Hours</p>
//                       <p className="text-lg font-bold">{agenda?.timeAllocated?.hours || 0}</p>
//                     </div>
//                     <div className="text-center flex-1 border rounded-lg p-2">
//                       <p className="text-xs text-gray-500">Minutes</p>
//                       <p className="text-lg font-bold">{agenda?.timeAllocated?.minutes || 0}</p>
//                     </div>
//                   </div>

//                   {agenda?.presenter?.length > 0 && (
//                     <p className="text-sm text-gray-700">
//                       <span className="font-medium">Presenter:</span>{" "}
//                       {agenda.presenter.map((p: any) => p.userName).join(", ")}
//                     </p>
//                   )}

//                   <p className="text-sm text-gray-700 mt-2">
//                     <span className="font-medium">Details:</span>{" "}
//                     {agenda?.details || "No details provided"}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeetingDetailsModal;


"use client";

import React, { useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import domtoimage from "dom-to-image";
import {
  useGetAllAgendaQuery,
  useGetMeetingByIdQuery,
} from "@/redux/api/meeting/meetingApi";

// Props type for the modal
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  meetingId: string;
};

/**
 * MeetingDetailsModal
 * -------------------
 * Renders a modal showing meeting details with agenda and remarks,
 * with the option to download the content as a PDF.
 */
const MeetingDetailsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  meetingId,
}) => {
  // API calls
  const { data: meetingData } = useGetMeetingByIdQuery(meetingId);
  const { data: allAgenda } = useGetAllAgendaQuery(meetingId);

  // Ref for the printable section
  const printRef = useRef<HTMLDivElement>(null);

  // Extract data
  const meeting = meetingData?.data;
  const agendaData = allAgenda?.data?.agendaItems || [];
  const welcomeRemark = allAgenda?.data?.welcomeAndOpeningRemark || {};

  /**
   * Format a datetime string into readable date & time
   * @param dateString - ISO datetime string
   * @returns Object with formatted date & time
   */
  const formatDateTime = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const start = formatDateTime(meeting?.startDate ?? "");
  const end = formatDateTime(meeting?.endDate ?? "");

  // Accessibility: focus a button/input when modal opens
  useEffect(() => {
    if (isOpen) {
      const focusable = document.querySelector(
        "button, [href], input"
      ) as HTMLElement;
      focusable?.focus();
    }
  }, [isOpen]);

  /**
   * Downloads the meeting details as a PDF
   * using dom-to-image + jsPDF
   */
  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    // Clone element to avoid layout shifts
    const clonedElement = printRef.current.cloneNode(true) as HTMLElement;

    // Force clean layout styles for PDF rendering
    Object.assign(clonedElement.style, {
      width: "800px",
      maxHeight: "none",
      overflow: "visible",
      position: "absolute",
      left: "0",
      top: "0",
      backgroundColor: "#ffffff",
      padding: "20px",
      boxSizing: "border-box",
    });

    document.body.appendChild(clonedElement);

    try {
      // Convert HTML to image
      const dataUrl = await domtoimage.toPng(clonedElement, {
        bgcolor: "#ffffff",
        width: 800,
        height: clonedElement.scrollHeight + 40,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
      });

      // Add image to PDF
      const pdf = new jsPDF("p", "pt", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${meeting?.name || "Meeting"}_Details.pdf`);
    } catch (error) {
      console.error("PDF download failed:", error);
    } finally {
      document.body.removeChild(clonedElement);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal container */}
      <div className="relative bg-gray-200 w-full max-w-4xl h-[90vh] rounded-2xl shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-800 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-white">PDF Preview</h2>
          <div className="flex gap-4">
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="text-2xl text-white hover:text-gray-300"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          id="pdf-content"
          ref={printRef}
          className="flex-1 overflow-y-auto bg-white m-4 p-6 shadow-md border border-gray-300 rounded-lg"
        >
          {/* Meeting info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-4">
            <div>
              <p className="text-gray-500 font-medium">Start</p>
              <p className="font-semibold">{typeof start === "object" && start.date}</p>
              <p className="text-gray-700">{typeof start === "object" && start.time}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">End</p>
              <p className="font-semibold">{typeof end === "object" && end.date}</p>
              <p className="text-gray-700">{typeof end === "object" && end.time}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Type</p>
              <p className="font-semibold">{meeting?.type || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Owner</p>
              <p className="font-semibold">{meeting?.owner || "N/A"}</p>
            </div>
          </div>

          {/* Title & Location */}
          <div className="grid grid-cols-2 gap-6 text-sm mb-4">
            <div>
              <p className="text-gray-500 font-medium">Title</p>
              <p className="font-semibold">{meeting?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Location</p>
              <p className="font-semibold">{meeting?.location || "N/A"}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-500 font-medium mb-1">Description</p>
            <p className="text-gray-700">
              {meeting?.description || "No description available"}
            </p>
          </div>

          {/* Welcome Remarks */}
          {welcomeRemark.presenter?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Welcome & Opening Remarks
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Presenter(s): </span>
                {welcomeRemark.presenter.map((p: any) => p.userName).join(", ")}
              </p>
              {welcomeRemark.timeAllocated && (
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Time Allocated: </span>
                  {welcomeRemark.timeAllocated.hours || 0} hr{" "}
                  {welcomeRemark.timeAllocated.minutes || 0} min
                </p>
              )}
              {welcomeRemark.details && (
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Remarks: </span>
                  {welcomeRemark.details || "No remarks provided"}
                </p>
              )}
            </div>
          )}

          {/* Agenda Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Agenda Items</h3>
            <div className="space-y-4">
              {agendaData.map((agenda: any, idx: number) => (
                <div
                  key={agenda._id || idx}
                  className="border rounded-xl p-4 shadow-sm"
                >
                  <p className="font-semibold text-gray-800 mb-2">
                    {agenda?.title || "Untitled"}
                  </p>
                  <div className="flex gap-6 mb-3">
                    <div className="text-center flex-1 border rounded-lg p-2">
                      <p className="text-xs text-gray-500">Hours</p>
                      <p className="text-lg font-bold">
                        {agenda?.timeAllocated?.hours || 0}
                      </p>
                    </div>
                    <div className="text-center flex-1 border rounded-lg p-2">
                      <p className="text-xs text-gray-500">Minutes</p>
                      <p className="text-lg font-bold">
                        {agenda?.timeAllocated?.minutes || 0}
                      </p>
                    </div>
                  </div>
                  {agenda?.presenter?.length > 0 && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Presenter:</span>{" "}
                      {agenda.presenter.map((p: any) => p.userName).join(", ")}
                    </p>
                  )}
                  <p className="text-sm text-gray-700 mt-2">
                    <span className="font-medium">Details:</span>{" "}
                    {agenda?.details || "No details provided"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailsModal;
