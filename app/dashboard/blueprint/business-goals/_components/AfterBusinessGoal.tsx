//? working code without filter 

// "use client";

// import { useState } from "react";
// import { FiGrid } from "react-icons/fi";
// import { GoRows } from "react-icons/go";
// import { MdOutlineBarChart } from "react-icons/md";
// import BusinessGoalImpactSummary from "./BusinessGoalImpactSummary";
// import BusinessGoalsModal from "./BusinessGoalsModal";

// import GanttView from "./views/GanttView";
// import GoalCard from "./views/GoalCard";
// import TreeComponent from "./views/TreeComponent";
// import { BusinessGoal } from "../page";
// import {
//   useCreateBusinessGoalMutation,
//   useUpdateBusinessGoalMutation, // New import
//   useDeleteBusinessGoalMutation,
// } from "@/redux/api/blueprint/businessGoal/businessGoalApi";
// import toast from "react-hot-toast";
// import EditBusinessGoalsModal from "./EditBusinessGoalModal";

// // Local type for UI-friendly GoalCard
// export interface GoalCardData {
//   id: string;
//   title: string;
//   subtitle: string;
//   priority: string;
//   status: string;
//   category: string;
//   progressLabel: string;
//   progressValue: number;
// }

// interface AfterBusinessGoalProps {
//   businessGoals: BusinessGoal[];
// }

// const AfterBusinessGoal: React.FC<AfterBusinessGoalProps> = ({
//   businessGoals,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false); // New state
//   const [selectedGoal, setSelectedGoal] = useState<BusinessGoal | null>(null); // New state
//   const [viewMode, setViewMode] = useState<
//     "row" | "structure" | "gantt" | "summary"
//   >("gantt");

//   const [createGoal, { isLoading }] = useCreateBusinessGoalMutation();
//   const [updateGoal, { isLoading: isUpdating }] = useUpdateBusinessGoalMutation(); // New mutation
//   const [deleteGoal] = useDeleteBusinessGoalMutation();

//   const handleSave = async (data: any) => {
//     try {
//       const response = await createGoal(data?.businessGoals).unwrap();
//       toast.success("Business Goal created successfully!");
//       setIsModalOpen(false);
//     } catch (error: any) {
//       console.error("❌ Failed to create business goal:", error);
//       toast.error(error?.data?.message || "Failed to create Business Goal");
//     }
//   };

//   // New edit handler
//   const handleEdit = (goal: GoalCardData) => {
//     // Find the full goal data from businessGoals array
//     const fullGoalData = businessGoals.find(bg => bg._id === goal.id);
//     if (fullGoalData) {
//       setSelectedGoal(fullGoalData);
//       setIsEditModalOpen(true);
//     }
//   };

//   // New update handler
//   const handleUpdate = async (data: any) => {
//     try {
//       const response = await updateGoal(data?.businessGoals).unwrap();
//       toast.success("Business Goal updated successfully!");
//       setIsEditModalOpen(false);
//       setSelectedGoal(null);
//     } catch (error: any) {
//       console.error("❌ Failed to update business goal:", error);
//       toast.error(error?.data?.message || "Failed to update Business Goal");
//     }
//   };

//   const handleDelete = async (goal: GoalCardData) => {
//     try {
//       const res = await deleteGoal(goal.id).unwrap();
//       toast.success(res.message || "Business Goal deleted successfully!");
//     } catch (error: any) {
//       console.error("❌ Failed to delete business goal:", error);
//       toast.error(error?.data?.message || "Failed to delete Business Goal");
//     }
//   };

//   // Map API data to GoalCard-friendly objects
//   const goals: GoalCardData[] = businessGoals.map((goal) => ({
//     id: goal._id,
//     title: goal.title,
//     subtitle: goal.description,
//     priority: goal.priority,
//     status: goal.resource_readiness === "Yes" ? "In Progress" : "Overdue",
//     category: goal.related_strategic_theme,
//     progressLabel: "Progress",
//     progressValue: goal.goalProgress,
//   }));

//   if (businessGoals.length === 0) {
//     return (
//       <div className="rounded-xl bg-white p-10 text-center text-gray-500 shadow">
//         No data found. Please add a business goal.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white rounded-2xl p-4 sm:p-5 lg:p-6 font-sans text-gray-800">
//       <div className="space-y-6">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-center md:text-left">
//             Business Goals
//           </h1>

//           <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-2">
//             {/* Summary + Add New */}
//             <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//               <button
//                 className="border border-black rounded-md bg-white px-4 py-2 text-sm font-medium hover:bg-black/90 hover:text-white cursor-pointer w-full sm:w-auto"
//                 onClick={() => setViewMode("summary")}
//               >
//                 Business Goal Impact Summary
//               </button>
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-950 w-full sm:w-auto"
//               >
//                 Add New Business Goal
//               </button>
//             </div>

//             {/* View Toggle */}
//             <div className="flex justify-center sm:justify-start gap-2 w-full sm:w-auto">
//               <button
//                 onClick={() => setViewMode("row")}
//                 className={`cursor-pointer ${
//                   viewMode === "row" ? "text-blue-500" : "text-gray-400"
//                 } hover:text-blue-500 transition-colors duration-200`}
//               >
//                 <GoRows size={25} />
//               </button>
//               <button
//                 onClick={() => setViewMode("structure")}
//                 className={`cursor-pointer ${
//                   viewMode === "structure" ? "text-blue-500" : "text-gray-400"
//                 } hover:text-blue-500 transition-colors duration-200`}
//               >
//                 <FiGrid size={25} />
//               </button>
//               <button
//                 onClick={() => setViewMode("gantt")}
//                 className={`cursor-pointer ${
//                   viewMode === "gantt" ? "text-blue-500" : "text-gray-400"
//                 } hover:text-blue-500 transition-colors duration-200`}
//               >
//                 <MdOutlineBarChart size={25} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* View & Filters */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//           <h2 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
//             {viewMode === "row" && "Row View"}
//             {viewMode === "structure" && "Structure View"}
//             {viewMode === "gantt" && "Gantt View"}
//             {viewMode === "summary" && "Business Goal Impact Summary"}
//           </h2>
//                 {viewMode === "row" && 
//                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//             <select className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
//               <option>Filter by Priority</option>
//               <option>Urgent</option>
//               <option>High</option>
//             </select>
//             <select className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
//               <option>Filter by Status</option>
//               <option>Overdue</option>
//               <option>In Progress</option>
//               <option>Completed</option>
//             </select>
//           </div>}
         
//         </div>

//         {/* Conditional Rendering */}
//         {viewMode === "summary" && <BusinessGoalImpactSummary />}

//         {viewMode === "row" && (
//           <div className="space-y-4 overflow-x-auto pb-10">
//             {goals.map((goal) => (
//               <GoalCard
//                 key={goal.id}
//                 goal={goal}
//                 onEdit={handleEdit} // Updated to use new handler
//                 onDelete={handleDelete}
//               />
//             ))}
//           </div>
//         )}

//         {viewMode === "gantt" && (
//           <GanttView
//             goals={businessGoals.map((goal, idx) => ({
//               id: idx + 1,
//               title: goal.title,
//               goalTimelineStart: goal.goalTimelineStart.split("T")[0],
//               goalTimelineEnd: goal.goalTimelineEnd.split("T")[0],
//               goalProgress: goal.goalProgress.toString(),
//             }))}
//           />
//         )}

//         {viewMode === "structure" && <TreeComponent />}
//       </div>

//       {/* Create Modal */}
//       <BusinessGoalsModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSave}
//       />

//       {/* Edit Modal */}
//       <EditBusinessGoalsModal
//         isOpen={isEditModalOpen}
//         onClose={() => {
//           setIsEditModalOpen(false);
//           setSelectedGoal(null);
//         }}
//         onSave={handleUpdate}
//         goalData={selectedGoal}
//       />
//     </div>
//   );
// };

// export default AfterBusinessGoal;







//! try 1 



"use client";

import { useState } from "react";
import { FiGrid } from "react-icons/fi";
import { GoRows } from "react-icons/go";
import { MdOutlineBarChart } from "react-icons/md";
import BusinessGoalImpactSummary from "./BusinessGoalImpactSummary";
import BusinessGoalsModal from "./BusinessGoalsModal";
import GanttView from "./views/GanttView";
import GoalCard from "./views/GoalCard";
import TreeComponent from "./views/TreeComponent";
import { BusinessGoal } from "../page";
import {
  useCreateBusinessGoalMutation,
  useUpdateBusinessGoalMutation,
  useDeleteBusinessGoalMutation,
} from "@/redux/api/blueprint/businessGoal/businessGoalApi";
import toast from "react-hot-toast";
import EditBusinessGoalsModal from "./EditBusinessGoalModal";

// Local type for UI-friendly GoalCard
export interface GoalCardData {
  id: string;
  title: string;
  subtitle: string;
  priority: string;
  status: string;
  category: string;
  progressLabel: string;
  progressValue: number;
}

interface AfterBusinessGoalProps {
  businessGoals: BusinessGoal[];
}

const AfterBusinessGoal: React.FC<AfterBusinessGoalProps> = ({
  businessGoals,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedGoal, setSelectedGoal] = useState<BusinessGoal | null>(null);
  const [viewMode, setViewMode] = useState<
    "row" | "structure" | "gantt" | "summary"
  >("gantt");

  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const [createGoal] = useCreateBusinessGoalMutation();
  const [updateGoal] = useUpdateBusinessGoalMutation();
  const [deleteGoal] = useDeleteBusinessGoalMutation();

  const handleSave = async (data: any) => {
    try {
      await createGoal(data?.businessGoals).unwrap();
      toast.success("Business Goal created successfully!");
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("❌ Failed to create business goal:", error);
      toast.error(error?.data?.message || "Failed to create Business Goal");
    }
  };

  const handleEdit = (goal: GoalCardData) => {
    const fullGoalData = businessGoals.find((bg) => bg._id === goal.id);
    if (fullGoalData) {
      setSelectedGoal(fullGoalData);
      setIsEditModalOpen(true);
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      await updateGoal(data?.businessGoals).unwrap();
      toast.success("Business Goal updated successfully!");
      setIsEditModalOpen(false);
      setSelectedGoal(null);
    } catch (error: any) {
      console.error("❌ Failed to update business goal:", error);
      toast.error(error?.data?.message || "Failed to update Business Goal");
    }
  };

  const handleDelete = async (goal: GoalCardData) => {
    try {
      const res = await deleteGoal(goal.id).unwrap();
      toast.success(res.message || "Business Goal deleted successfully!");
    } catch (error: any) {
      console.error("❌ Failed to delete business goal:", error);
      toast.error(error?.data?.message || "Failed to delete Business Goal");
    }
  };

  // Map API data to GoalCard-friendly objects
  const goals: GoalCardData[] = businessGoals.map((goal) => ({
    id: goal._id,
    title: goal.title,
    subtitle: goal.description,
    priority: goal.priority,
    status: goal.resource_readiness === "Yes" ? "In Progress" : "Overdue",
    category: goal.related_strategic_theme,
    progressLabel: "Progress",
    progressValue: goal.goalProgress,
  }));

  // Filter goals based on priority & status
  const filteredGoals = goals.filter((goal) => {
    const priorityMatch =
      !priorityFilter || priorityFilter === "Filter by Priority"
        ? true
        : goal.priority === priorityFilter;
    const statusMatch =
      !statusFilter || statusFilter === "Filter by Status"
        ? true
        : goal.status === statusFilter;
    return priorityMatch && statusMatch;
  });

  if (businessGoals.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center text-gray-500 shadow">
        No data found. Please add a business goal.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white rounded-2xl p-4 sm:p-5 lg:p-6 font-sans text-gray-800">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-center md:text-left">
            Business Goals
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-2">
            {/* Summary + Add New */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                className="border border-black rounded-md bg-white px-4 py-2 text-sm font-medium hover:bg-black/90 hover:text-white cursor-pointer w-full sm:w-auto"
                onClick={() => setViewMode("summary")}
              >
                Business Goal Impact Summary
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-950 w-full sm:w-auto"
              >
                Add New Business Goal
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex justify-center sm:justify-start gap-2 w-full sm:w-auto">
              <button
                onClick={() => setViewMode("row")}
                className={`cursor-pointer ${viewMode === "row" ? "text-blue-500" : "text-gray-400"
                  } hover:text-blue-500 transition-colors duration-200`}
              >
                <GoRows size={25} />
              </button>
              <button
                onClick={() => setViewMode("structure")}
                className={`cursor-pointer ${viewMode === "structure" ? "text-blue-500" : "text-gray-400"
                  } hover:text-blue-500 transition-colors duration-200`}
              >
                <FiGrid size={25} />
              </button>
              <button
                onClick={() => setViewMode("gantt")}
                className={`cursor-pointer ${viewMode === "gantt" ? "text-blue-500" : "text-gray-400"
                  } hover:text-blue-500 transition-colors duration-200`}
              >
                <MdOutlineBarChart size={25} />
              </button>
            </div>
          </div>
        </div>

        {/* View & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
            {viewMode === "row" && "Row View"}
            {viewMode === "structure" && "Structure View"}
            {viewMode === "gantt" && "Gantt View"}
            {viewMode === "summary" && "Business Goal Impact Summary"}
          </h2>

          {/* Filters for Row View */}
          {viewMode === "row" && (
            <div className="flex flex-row gap-2 w-full sm:w-auto">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              >
                <option>Filter by Priority</option>
                <option>Urgent</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              >
                <option>Filter by Status</option>
                <option>Overdue</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          )}
        </div>

        {/* Conditional Rendering */}
        {viewMode === "summary" && <BusinessGoalImpactSummary />}

        {viewMode === "row" && (
          <div className="space-y-4 overflow-x-auto pb-10">
            {filteredGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {viewMode === "gantt" && (
          <GanttView
            goals={businessGoals.map((goal, idx) => ({
              id: idx + 1,
              title: goal.title,
              goalTimelineStart: goal.goalTimelineStart.split("T")[0],
              goalTimelineEnd: goal.goalTimelineEnd.split("T")[0],
              goalProgress: goal.goalProgress.toString(),
            }))}
          />
        )}

        {viewMode === "structure" && <TreeComponent />}
      </div>

      {/* Create Modal */}
      <BusinessGoalsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {/* Edit Modal */}
      <EditBusinessGoalsModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedGoal(null);
        }}
        onSave={handleUpdate}
        goalData={selectedGoal}
      />
    </div>
  );
};

export default AfterBusinessGoal;
