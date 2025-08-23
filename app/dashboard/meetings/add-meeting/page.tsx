// "use client";
// import React, { useState } from "react";
// import AddAgendaFormModal, { FormValues } from "../agenda-builder/_components/modals/AddAgendaFormModal";

// const Page = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   // Handle form data from Drawer
//   const handleFormSubmit = (data: FormValues) => {
//     console.log("Form Data from Drawer:", data);
//   };

//     return (
//         <div>
//                 <div className="p-6">
//       <button
//         onClick={() => setIsDrawerOpen(true)}
//         className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
//       >
//         Add Meeting
//       </button>

//       <AddAgendaFormModal
//         isOpen={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         title="Add Meeting Details"
//         onSubmit={handleFormSubmit}
//       />
//     </div>
//         </div>
//     );
// };

// export default Page;
import React from 'react';
import AddMeetingBanner from './_components/AddMeetingBanner';
import UpcomingMeetings from './_components/UpcomingMeetings';

const page = () => {
    return (
        <div className='space-y-6 min-h-[calc(100vh-100px)]'>
            <AddMeetingBanner />
            <UpcomingMeetings/>
        </div>
    );
};

export default page;