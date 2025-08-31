import { useGetMyAllAgendaQuery } from "@/redux/api/meeting/meetingApi";
import React from "react";

interface TakeMeetingMinutesModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingId: string | null;
 
}

const TakeMeetingMinutesModal: React.FC<TakeMeetingMinutesModalProps> = ({
  isOpen,
  onClose,
  meetingId,
  // agendas,
  // loading,
}) => {
  if (!isOpen) return null;
   // Query agendas only when modal is open and meetingId is set
  // const { data: myAgendas, isLoading: agendasLoading } = useGetMyAllAgendaQuery(meetingId, {
  //   skip: !meetingId,
  // });
  // console.log(myAgendas);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/20 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Right drawer */}
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-all">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-900 px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-white">Take Meeting Minutes</h2>
          <button
            onClick={onClose}
            className="text-white cursor-pointer hover:text-gray-200 text-xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {meetingId}
          <br />
         
               </div>
      </div>
    </div>
  );
};

export default TakeMeetingMinutesModal;



// import { useGetMyAllAgendaQuery } from "@/redux/api/meeting/meetingApi";
// import React from "react";
// import Loading from "../../loading";

// interface TakeMeetingMinutesModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   meetingId: string | null;
// }

// const TakeMeetingMinutesModal: React.FC<TakeMeetingMinutesModalProps> = ({
//   isOpen,
//   onClose,
//   meetingId,
// }) => {
// //   if (!isOpen) return null;

// //   // Query agendas only when modal is open and meetingId is set
// //   const { data: myAgendas, isLoading: agendasLoading } = useGetMyAllAgendaQuery(meetingId, {
// //     skip: !meetingId,
// //   });

// // console.log(myAgendas);

// //   const agendaData = myAgendas?.data?.[0]; // take first agenda object


//   // Query agendas only when modal is open and meetingId is set
// const { data: myAgendas, isLoading: agendasLoading } = useGetMyAllAgendaQuery(meetingId ?? '', {
//   skip: !isOpen || !meetingId,
// });

//   if (!isOpen) return null;

//   console.log(myAgendas);

//   const agendaData = myAgendas?.data?.[0]; // take first agenda object


//   if(agendasLoading) return <p className="text-[2px]">loading..</p>;

//   return (
//     <div className="fixed inset-0 z-50 overflow-hidden">
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black/20 transition-opacity"
//         onClick={onClose}
//       ></div>

//       {/* Right drawer */}
//       <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-all">
//         {/* Header */}
//         <div className="flex justify-between items-center bg-blue-900 px-6 py-4 border-b">
//           <h2 className="text-lg font-semibold text-white">Take Meeting Minutes</h2>
//           <button
//             onClick={onClose}
//             className="text-white cursor-pointer hover:text-gray-200 text-xl"
//           >
//             ×
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-64px)] custom-scrollbar">
//           {agendasLoading ? (
//             <p className="text-gray-600">Loading agendas...</p>
//           ) : agendaData ? (
//             <>
//               {/* Company */}
//               <div>
//                 <h3 className="text-base font-semibold text-gray-700">Company</h3>
//                 <p className="text-base text-[#231f20]">{agendaData.companyName}</p>
//               </div>

//               {/* Attendees */}
//               <div>
//                 <h3 className="text-base font-semibold text-gray-700">Attendees</h3>
//                 <ul className="list-disc list-inside text-base text-[#231f20]">
//                   {agendaData.inviteAttendees.attendees.map((att: string, idx: number) => (
//                     <li key={idx}>{att}</li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Welcome & Opening Remark */}
//               <div>
//                 <h3 className="text-base font-semibold text-gray-700">Welcome & Opening Remark</h3>
//                 <p className="text-base text-[#231f20]">
//                   <span className="font-semibold">Presenter(s):</span>{" "}
//                   {agendaData.welcomeAndOpeningRemark.presenter.join(", ")}
//                 </p>
//                 <p className="text-base text-[#231f20]">
//                   <span className="font-semibold">Time:</span>{" "}
//                   {agendaData.welcomeAndOpeningRemark.timeAllocated.hours}h{" "}
//                   {agendaData.welcomeAndOpeningRemark.timeAllocated.minutes}m
//                 </p>
//               </div>

//               {/* Agenda Items */}
//               <div>
//                 <h3 className="text-base font-semibold text-gray-700">Agenda Items</h3>
//                 {agendaData.agendaItems.map((item: any, idx: number) => (
//                   <div key={idx} className="border rounded-lg p-3 mb-3">
//                     <p className="text-base text-[#231f20]">
//                       <span className="font-semibold">Title:</span> {item.title}
//                     </p>
//                     <p className="text-base text-[#231f20]">
//                       <span className="font-semibold">Presenter(s):</span>{" "}
//                       {item.presenter.join(", ")}
//                     </p>
//                     <p className="text-base text-[#231f20]">
//                       <span className="font-semibold">Time:</span>{" "}
//                       {item.timeAllocated.hours}h {item.timeAllocated.minutes}m
//                     </p>
//                     <p className="text-base text-[#231f20]">
//                       <span className="font-semibold">Details:</span> {item.details}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-600">No agenda data available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TakeMeetingMinutesModal;


//? i have to fix this tomorow 

// import {
//   useGetMyAllAgendaQuery,
//   useCreateAssignAgendaToMeMutation,
// } from "@/redux/api/meeting/meetingApi";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// interface TakeMeetingMinutesModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   meetingId: string | null;
// }

// type TimeAllocated = { hours: number; minutes: number; _id?: string };
// type AgendaItemBase = {
//   _id?: string;
//   title: string;
//   presenter: string[];
//   timeAllocated: TimeAllocated;
//   details: string;
//   status?: string;
//   priority?: string;
//   notes?: string;
// };
// type AgendaDoc = {
//   _id: string;
//   companyName: string;
//   meetingId: string;
//   inviteAttendees: { attendees: string[] };
//   welcomeAndOpeningRemark: { presenter: string[]; timeAllocated: TimeAllocated };
//   agendaItems: AgendaItemBase[];
// };

// const TakeMeetingMinutesModal: React.FC<TakeMeetingMinutesModalProps> = ({
//   isOpen,
//   onClose,
//   meetingId,
// }) => {
//   const { data: myAgendas, isLoading: agendasLoading } = useGetMyAllAgendaQuery(
//     meetingId ?? "",
//     { skip: !meetingId }
//   );

//   const agendaData: AgendaDoc | undefined = myAgendas?.data?.[0];

//   // ✅ mutation hook
//   const [createAssignAgenda, { isLoading: isSaving }] =
//     useCreateAssignAgendaToMeMutation();

//   const [agendaItems, setAgendaItems] = useState<AgendaItemBase[]>([]);

//   useEffect(() => {
//     if (agendaData?.agendaItems) {
//       setAgendaItems(
//         agendaData.agendaItems.map((it) => ({
//           ...it,
//           status: it.status ?? "Not Started",
//           priority: it.priority ?? "Medium",
//           notes: it.notes ?? "",
//         }))
//       );
//     } else {
//       setAgendaItems([]);
//     }
//   }, [agendaData]);


//   console.log(myAgendas);

//   const updateItem = (index: number, field: keyof AgendaItemBase, value: string) => {
//     setAgendaItems((prev) =>
//       prev.map((it, i) => (i === index ? { ...it, [field]: value } : it))
//     );
//   };

//   // ✅ save one item (if you need per-item API call)
//   const saveOne = async (index: number) => {
//     const item = agendaItems[index];
//     const payload = {
//       ...item,
//     };

//     try {
//       await createAssignAgenda({
//   agendaId: agendaData?._id as string,
//   body: payload,
// }).unwrap();
//       toast.success("Agenda item saved successfully");
//     } catch (error) {
//       toast.error("Failed to save agenda item");
//       console.error(error);
//     }
//   };

//   // ✅ save all minutes
//   const saveAll = async () => {
//     const payload = {
//       inviteAttendees: agendaData?.inviteAttendees,
//       welcomeAndOpeningRemark: agendaData?.welcomeAndOpeningRemark,
//       agendaItems: agendaItems.map((it) => ({
//         title: it.title,
//         presenter: it.presenter,
//         timeAllocated: it.timeAllocated,
//         details: it.details,
//         status: it.status,
//         priority: it.priority,
//         notes: it.notes,
//       })),
//     };

//     try {
//       await createAssignAgenda({
//         agendaId: agendaData?._id,
//         body: payload,
//       }).unwrap();
//       toast.success("Meeting minutes submitted successfully");
//       onClose();
//     } catch (error) {
//       toast.error("Failed to submit meeting minutes");
//       console.error(error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-hidden">
//       <div className="absolute inset-0 bg-black/20" onClick={onClose} />

//       <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl">
//         <div className="flex justify-between items-center bg-blue-900 px-6 py-4 border-b">
//           <h2 className="text-lg font-semibold text-white">Take Meeting Minutes</h2>
//           <button onClick={onClose} className="text-white text-xl">×</button>
//         </div>

//         <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-64px)]">
//           {agendasLoading ? (
//             <p>Loading agendas...</p>
//           ) : agendaData ? (
//             <>
//               {/* Company */}
//               <div>
//                 <h3 className="text-base font-semibold text-gray-700">Company</h3>
//                 <p>{agendaData.companyName}</p>
//               </div>

//               {/* Attendees */}
//               <div>
//                 <h3 className="text-base font-semibold text-gray-700">Attendees</h3>
//                 <ul className="list-disc list-inside">
//                   {agendaData.inviteAttendees.attendees.map((att, i) => (
//                     <li key={i}>{att}</li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Agenda Items */}
//               <div>
//                 <h3 className="text-base font-semibold text-gray-700">Agenda Items</h3>
//                 {agendaItems.map((item, idx) => (
//                   <div key={item._id ?? idx} className="border rounded-lg p-3 mb-3">
//                     <p><b>Title:</b> {item.title}</p>
//                     <p><b>Presenter(s):</b> {item.presenter.join(", ")}</p>
//                     <p><b>Time:</b> {item.timeAllocated.hours}h {item.timeAllocated.minutes}m</p>
//                     <p><b>Details:</b> {item.details}</p>

//                     <div className="grid gap-3 mt-3">
//                       <div>
//                         <label>Status</label>
//                         <select
//                           className="w-full border rounded px-2 py-1"
//                           value={item.status ?? "Not Started"}
//                           onChange={(e) => updateItem(idx, "status", e.target.value)}
//                         >
//                           <option value="Not Started">Not Started</option>
//                           <option value="In Progress">In Progress</option>
//                           <option value="Completed">Completed</option>
//                         </select>
//                       </div>

//                       <div>
//                         <label>Priority</label>
//                         <select
//                           className="w-full border rounded px-2 py-1"
//                           value={item.priority ?? "Medium"}
//                           onChange={(e) => updateItem(idx, "priority", e.target.value)}
//                         >
//                           <option value="High">High</option>
//                           <option value="Medium">Medium</option>
//                           <option value="Low">Low</option>
//                         </select>
//                       </div>

//                       <div>
//                         <label>Notes</label>
//                         <textarea
//                           className="w-full border rounded px-2 py-1"
//                           rows={2}
//                           value={item.notes ?? ""}
//                           onChange={(e) => updateItem(idx, "notes", e.target.value)}
//                         />
//                       </div>

//                       <button
//                         type="button"
//                         onClick={() => saveOne(idx)}
//                         disabled={isSaving}
//                         className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
//                       >
//                         {isSaving ? "Saving..." : "Save this item"}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Save All */}
//               <div className="pt-2">
//                 <button
//                   type="button"
//                   onClick={saveAll}
//                   disabled={isSaving}
//                   className="w-full rounded-md bg-blue-600 text-white py-2 font-medium hover:bg-blue-700"
//                 >
//                   {isSaving ? "Submitting..." : "Submit full minutes"}
//                 </button>
//               </div>
//             </>
//           ) : (
//             <p>No agenda data available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TakeMeetingMinutesModal;
