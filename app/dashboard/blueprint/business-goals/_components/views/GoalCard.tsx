



// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { GoalCardData } from "../AfterBusinessGoal";

// const GoalCard = ({
//   goal,
//   onEdit,
//   onDelete,
// }: {
//   goal: GoalCardData;
//   onEdit: (goal: GoalCardData) => void;
//   onDelete: (goal: GoalCardData) => void;
// }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setMenuOpen(false);
//       }
//     };
//     if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [menuOpen]);

//   return (
//     <div className="flex items-center justify-between rounded-md bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg">
//       <div className="flex w-full justify-between items-center space-x-4">
//         <div className="">
//           <h3 className="text-lg font-semibold">{goal.title}</h3>
//           <p className="text-sm text-gray-500">{goal.subtitle}</p>
        
//         </div>

      
//         <div>

//           {goal.priority && (
//             <span className="rounded-md px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700">
//               {goal.priority}
//             </span>
//           )}
//           </div>
//               <div>

//           {goal.status && (
//             <span className="rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
//               {goal.status}
//             </span>
//           )}
//           </div>
//           <div>

//           {goal.category && (
//             <span className="rounded-md bg-blue-900 px-3 py-1 text-xs font-medium text-white">
//               {goal.category}
//             </span>
//           )}
//           </div>
        

//         <div className="flex w-40 flex-col items-start space-y-1">
//           <p className="text-xs text-gray-500 ">{goal.progressValue}% complete</p>
//           <div className="h-3 w-full overflow-hidden rounded-[4px] bg-gray-200">
//             <div
//               className="h-full rounded-[4px] bg-blue-900"
//               style={{ width: `${goal.progressValue}%` }}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="ml-4 relative" ref={menuRef}>
//         <button
//           className="text-gray-400 hover:text-gray-600"
//           onClick={() => setMenuOpen((prev) => !prev)}
//         >
//           ⋮
//         </button>

//         {menuOpen && (
//           <div className="absolute right-0 z-10 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
//             <button
//               className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//               onClick={() => {
//                 onEdit(goal);
//                 setMenuOpen(false);
//               }}
//             >
//               Edit
//             </button>
//             <button
//               className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
//               onClick={() => {
//                 onDelete(goal);
//                 setMenuOpen(false);
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GoalCard;


// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { GoalCardData } from "../AfterBusinessGoal";

// const GoalCard = ({
//   goal,
//   onEdit,
//   onDelete,
// }: {
//   goal: GoalCardData;
//   onEdit: (goal: GoalCardData) => void;
//   onDelete: (goal: GoalCardData) => void;
// }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setMenuOpen(false);
//       }
//     };
//     if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [menuOpen]);

//   return (
//    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_auto] items-center gap-4  p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg ">
//   {/* Title + Subtitle */}
//   <div className="flex flex-col min-w-0">
//     <h3 className="text-sm font-semibold truncate">{goal.title}</h3>
//     <p className="text-xs text-gray-500 truncate">{goal.subtitle}</p>
//   </div>

//   {/* Priority */}
//   <div className="flex justify-center">
//     {goal.priority && (
//       <span className="rounded-md px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 whitespace-nowrap">
//         {goal.priority}
//       </span>
//     )}
//   </div>

//   {/* Status */}
//   <div className="flex justify-center">
//     {goal.status && (
//       <span className="rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-700 whitespace-nowrap">
//         {goal.status}
//       </span>
//     )}
//   </div>

//   {/* Category */}
//   <div className="flex justify-center">
//     {goal.category && (
//       <span className="rounded-md bg-blue-900 px-3 py-1 text-xs font-medium text-white whitespace-nowrap">
//         {goal.category}
//       </span>
//     )}
//   </div>

//   {/* Progress */}
//   <div className="flex flex-col min-w-[140px]">
//     <p className="text-xs text-gray-500">{goal.progressValue}% complete</p>
//     <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
//       <div
//         className="h-full rounded bg-blue-900"
//         style={{ width: `${goal.progressValue}%` }}
//       />
//     </div>
//   </div>

//   {/* Menu */}
//   <div className="relative flex justify-end" ref={menuRef}>
//     <button
//       className="text-gray-400 hover:text-gray-600"
//       onClick={() => setMenuOpen((prev) => !prev)}
//     >
//       ⋮
//     </button>

//     {menuOpen && (
//       <div className="absolute right-0 z-10 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
//         <button
//           className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//           onClick={() => {
//             onEdit(goal);
//             setMenuOpen(false);
//           }}
//         >
//           Edit
//         </button>
//         <button
//           className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
//           onClick={() => {
//             onDelete(goal);
//             setMenuOpen(false);
//           }}
//         >
//           Delete
//         </button>
//       </div>
//     )}
//   </div>
// </div>


//   );
// };

// export default GoalCard;



"use client";
import React, { useState, useRef, useEffect } from "react";
import { GoalCardData } from "../AfterBusinessGoal";

const GoalCard = ({
  goal,
  onEdit,
  onDelete,
}: {
  goal: GoalCardData;
  onEdit: (goal: GoalCardData) => void;
  onDelete: (goal: GoalCardData) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
console.log(goal,"goal");
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="rounded-md bg-white md:border">
      {/* Notice the change here: first col has minmax */}
      <div className="grid grid-cols-[minmax(160px,2fr)_1fr_1fr_1fr_1.5fr_auto] items-center gap-4 p-4">
        
        {/* Title + Subtitle */}
        <div className="flex flex-col min-w-0">
          <h3 className="text-sm font-semibold truncate">{goal.title}</h3>
          <p className="text-xs text-gray-500 truncate">{goal.subtitle}</p>
        </div>

        {/* Priority */}
        <div className="flex justify-center">
          {goal.priority && (
            <span className={`rounded-md px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 whitespace-nowrap ${goal.priority === "High" ? "text-red-100 bg-red-600" : ""}
                ${goal.priority === "Medium" ? "text-white bg-yellow-500" : ""}
                ${goal.priority === "Low" ? "bg-green-600 text-white" : ""} `}>
              {goal.priority}
            </span>
          )}
        </div>

        {/* Status */}
        <div className="flex justify-center">
          {goal.status && (
            <span
              className={`rounded-md px-3 py-1 text-xs font-medium whitespace-nowrap
                ${goal.status === "Overdue" ? "bg-red-100 text-red-700" : ""}
                ${goal.status === "In Progress" ? "bg-yellow-100 text-yellow-700" : ""}
                ${goal.status === "Complete" ? "bg-green-100 text-green-700" : ""}
              `}
            >
              {goal.status}
            </span>
          )}
        </div>

        {/* Category */}
        <div className="flex justify-center">
          {goal.category && (
            <span className="rounded-md bg-blue-900 px-3 py-1 text-xs font-medium text-white whitespace-nowrap">
              {goal.category}
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="flex flex-col min-w-[140px]">
          <p className="text-xs text-gray-500">{goal.progressValue}% complete</p>
          <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
            <div
              className="h-full rounded bg-blue-900"
              style={{ width: `${goal.progressValue}%` }}
            />
          </div>
        </div>

        {/* Menu */}
        <div className="relative flex justify-end" ref={menuRef}>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ⋮
          </button>

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
    </div>
  );
};

export default GoalCard;
