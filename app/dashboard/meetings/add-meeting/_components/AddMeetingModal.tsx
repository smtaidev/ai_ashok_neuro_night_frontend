



// "use client";
// // components/AddMeetingModal.tsx
// import React, { useState, useEffect } from "react";

// interface AddMeetingModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (meetingData: {
//     title: string;
//     date: string;
//     startTime: string;
//     endTime: string;
//     meetingLength: string;
//     type: string;
//     owner: string;
//     location: string;
//     description: string;
//   }) => void;
// }

// const AddMeetingModal: React.FC<AddMeetingModalProps> = ({
//   isOpen,
//   onClose,
//   onSubmit,
// }) => {
//   const [meetingTitle, setMeetingTitle] = useState("Project Management");
//   const [date, setDate] = useState("2025-08-18");
//   const [startTime, setStartTime] = useState("06:00");
//   const [endTime, setEndTime] = useState("07:00");
//   const [meetingLength, setMeetingLength] = useState("1 hour");
//   const [type, setType] = useState("Quarterly");
//   const [owner, setOwner] = useState("");
//   const [location, setLocation] = useState("Various Location");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     const calculateMeetingLength = () => {
//       const start = new Date(`2000-01-01 ${startTime}`);
//       const end = new Date(`2000-01-01 ${endTime}`);
//       const diffMs = end.getTime() - start.getTime();
//       const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//       const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
//       if (diffHours > 0) {
//         return `${diffHours} hour${diffHours > 1 ? 's' : ''} ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
//       }
//       return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
//     };
//     setMeetingLength(calculateMeetingLength());
//   }, [startTime, endTime]);

//   if (!isOpen) return null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({
//       title: meetingTitle,
//       date,
//       startTime,
//       endTime,
//       meetingLength,
//       type,
//       owner,
//       location,
//       description,
//     });
//     onClose();
//     setMeetingTitle("Project Management");
//     setDate("2025-08-18");
//     setStartTime("06:00");
//     setEndTime("07:00");
//     setType("Quarterly");
//     setOwner("");
//     setLocation("Various Location");
//     setDescription("");
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
//         {/* Modal Header */}
//         <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-blue-800 text-white">
//           <h3 className="text-xl font-semibold">Add Meeting</h3>
//           <button
//             onClick={onClose}
//             className="text-white hover:text-gray-300 transition-colors duration-200"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               ></path>
//             </svg>
//           </button>
//         </div>

//         {/* Modal Body (Form) */}
//         <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 gap-y-4">
//           <div>
//             <label htmlFor="meetingTitle" className="block text-sm font-medium text-gray-700 mb-1">
//               Add Meeting Name
//             </label>
//             <input
//               type="text"
//               id="meetingTitle"
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               value={meetingTitle}
//               onChange={(e) => setMeetingTitle(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
//               Meeting Location
//             </label>
//             <input
//               type="text"
//               id="location"
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
//               Meeting Type *
//             </label>
//             <select
//               id="type"
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               required
//             >
//               <option value="">Select Type</option>
//               <option value="Monthly">Monthly</option>
//               <option value="Quarterly">Quarterly</option>
//               <option value="Annual">Annual</option>
//               <option value="Board">Board</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-2 gap-x-4">
//             <div>
//               <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
//                 Date *
//               </label>
//               <input
//                 type="date"
//                 id="date"
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
//                 Start Time *
//               </label>
//               <input
//                 type="time"
//                 id="startTime"
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-x-4">
//             <div>
//               <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
//                 End Time *
//               </label>
//               <input
//                 type="time"
//                 id="endTime"
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="meetingLength" className="block text-sm font-medium text-gray-700 mb-1">
//                 Meeting Length
//               </label>
//               <input
//                 type="text"
//                 id="meetingLength"
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
//                 value={meetingLength}
//                 readOnly
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
//               Meeting Owner
//             </label>
//             <select
//               id="owner"
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               value={owner}
//               onChange={(e) => setOwner(e.target.value)}
//             >
//               <option value="">Select Owner</option>
//               {/* Add options dynamically if needed */}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//               Descriptions
//             </label>
//             <textarea
//               id="description"
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Write a description"
//             ></textarea>
//           </div>

//           {/* Modal Footer (Submit Button) */}
//           <div className="flex justify-end pt-4 border-t border-gray-200 mt-4">
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-700 text-white rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddMeetingModal;



"use client";
// components/AddMeetingModal.tsx
import React, { useState, useEffect } from "react";
import { format, parseISO, differenceInMinutes } from "date-fns";

interface AddMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (meetingData: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    meetingLength: string;
    type: string;
    owner: string;
    location: string;
    description: string;
  }) => void;
}

const AddMeetingModal: React.FC<AddMeetingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [meetingTitle, setMeetingTitle] = useState("Project Management");
  const [date, setDate] = useState("2025-08-18");
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("07:00");
  const [meetingLength, setMeetingLength] = useState("1 hour");
  const [type, setType] = useState("Quarterly");
  const [owner, setOwner] = useState("");
  const [location, setLocation] = useState("Various Location");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const calculateMeetingLength = () => {
      const start = parseISO(`2000-01-01T${startTime}:00`);
      const end = parseISO(`2000-01-01T${endTime}:00`);
      const diffMinutes = differenceInMinutes(end, start);
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${minutes > 1 ? "s" : ""}`;
      }
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    };
    setMeetingLength(calculateMeetingLength());
  }, [startTime, endTime]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = format(parseISO(date), "MMM d, yyyy");
    onSubmit({
      title: meetingTitle,
      date: formattedDate,
      startTime: format(parseISO(`2000-01-01T${startTime}:00`), "h:mm a"),
      endTime: format(parseISO(`2000-01-01T${endTime}:00`), "h:mm a"),
      meetingLength,
      type,
      owner,
      location,
      description,
    });
    onClose();
    setMeetingTitle("Project Management");
    setDate("2025-08-18");
    setStartTime("06:00");
    setEndTime("07:00");
    setType("Quarterly");
    setOwner("");
    setLocation("Various Location");
    setDescription("");
  };

  // Format time for display in input (though input type="time" will still show 24h, this is for reference)
  const displayStartTime = format(parseISO(`2000-01-01T${startTime}:00`), "h:mm a");
  const displayEndTime = format(parseISO(`2000-01-01T${endTime}:00`), "h:mm a");

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-blue-800 text-white">
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

        {/* Modal Body (Form) */}
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 gap-y-4">
          <div>
            <label htmlFor="meetingTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Add Meeting Name
            </label>
            <input
              type="text"
              id="meetingTitle"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Location
            </label>
            <input
              type="text"
              id="location"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Type *
            </label>
            <select
              id="type"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annual">Annual</option>
              <option value="Board">Board</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                id="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                Start Time *
              </label>
              <input
                type="time"
                id="startTime"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                End Time *
              </label>
              <input
                type="time"
                id="endTime"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="meetingLength" className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Length
              </label>
              <input
                type="text"
                id="meetingLength"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100 cursor-not-allowed"
                value={meetingLength}
                readOnly
              />
            </div>
          </div>

          <div>
            <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Owner
            </label>
            <input
              type="text"
              id="owner"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descriptions
            </label>
            <textarea
              id="description"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a description"
            ></textarea>
          </div>

          {/* Modal Footer (Submit Button) */}
          <div className="flex justify-end pt-4 border-t border-gray-200 mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-700 text-white rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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