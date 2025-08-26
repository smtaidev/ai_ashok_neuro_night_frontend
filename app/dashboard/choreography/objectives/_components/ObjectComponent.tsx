// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { ChevronDown, MoreHorizontal, Grid3X3, BarChart3, Pause, HelpCircle } from "lucide-react"

// const mockData = {
//   strategicThemes: [
//     {
//       id: 1,
//       name: "Strategic Theme Name",
//       progress: { completed: 10, total: 10, percentage: 82 },
//       businessGoals: [
//         {
//           id: 1,
//           name: "Business Goal Name",
//           progress: { completed: 10, total: 10, percentage: 82 },
//           objectives: [
//             {
//               id: 1,
//               title: "Lack of Funding",
//               subtitle: "Test Goal",
//               priority: "Urgent",
//               status: "Overdue",
//               category: "Finance",
//               progress: 20,
//               startDate: "2024-01-15",
//               endDate: "2024-02-28",
//             },
//             {
//               id: 2,
//               title: "Market Research",
//               subtitle: "Test Goal",
//               priority: "High",
//               status: "Overdue",
//               category: "Finance",
//               progress: 35,
//               startDate: "2024-03-01",
//               endDate: "2024-04-15",
//             },
//           ],
//         },
//         {
//           id: 2,
//           name: "Business Goal Name",
//           progress: { completed: 10, total: 10, percentage: 82 },
//           objectives: [
//             {
//               id: 3,
//               title: "Product Development",
//               subtitle: "Test Goal",
//               priority: "Medium",
//               status: "Overdue",
//               category: "Finance",
//               progress: 36,
//               startDate: "2024-02-15",
//               endDate: "2024-03-30",
//             },
//           ],
//         },
//         {
//           id: 3,
//           name: "Business Goal Name",
//           progress: { completed: 10, total: 10, percentage: 82 },
//           objectives: [
//             {
//               id: 4,
//               title: "Team Expansion",
//               subtitle: "Test Goal",
//               priority: "Low",
//               status: "Overdue",
//               category: "Finance",
//               progress: 38,
//               startDate: "2024-03-15",
//               endDate: "2024-04-30",
//             },
//           ],
//         },
//         {
//           id: 4,
//           name: "Business Goal Name",
//           progress: { completed: 10, total: 10, percentage: 82 },
//           objectives: [
//             {
//               id: 5,
//               title: "Customer Acquisition",
//               subtitle: "Test Goal",
//               priority: "Urgent",
//               status: "Overdue",
//               category: "Finance",
//               progress: 35,
//               startDate: "2024-01-01",
//               endDate: "2024-01-31",
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }

// const objectives = mockData.strategicThemes.flatMap((theme) => theme.businessGoals.flatMap((goal) => goal.objectives))

// // const StructureView = () => {
// //   return (
// //     <div className="space-y-8 p-6">
// //       <h2 className="text-lg font-medium text-gray-900">Structure View</h2>

// //       <div className="relative flex items-start justify-center" style={{ minHeight: "400px" }}>
// //         {/* Strategic Theme - Left Column */}
// //         <div className="flex flex-col items-center" style={{ marginTop: "60px" }}>
// //           <Card className="p-4 w-48 bg-white border border-gray-200 shadow-sm relative">
// //             <div className="absolute top-2 left-2 bg-teal-500 text-white text-xs px-2 py-1 rounded">10/10</div>
// //             <div className="font-medium text-gray-900 mb-2 mt-6">Strategic Theme Name</div>
// //             <div className="text-sm text-gray-600">82%</div>
// //           </Card>
// //         </div>

// //         {/* SVG for Connection Lines */}
// //         <svg
// //           className="absolute inset-0 pointer-events-none"
// //           style={{ width: "100%", height: "100%" }}
// //           viewBox="0 0 800 400"
// //         >
// //           {/* Curved lines from Strategic Theme to Business Goals */}
// //           <path d="M 200 120 Q 280 120 360 60" stroke="#d1d5db" strokeWidth="2" fill="none" />
// //           <path d="M 200 120 Q 280 120 360 120" stroke="#d1d5db" strokeWidth="2" fill="none" />
// //           <path d="M 200 120 Q 280 120 360 180" stroke="#d1d5db" strokeWidth="2" fill="none" />
// //           <path d="M 200 120 Q 280 120 360 240" stroke="#d1d5db" strokeWidth="2" fill="none" />

// //           {/* Straight lines from Business Goals to Objectives */}
// //           <line x1="560" y1="60" x2="600" y2="60" stroke="#d1d5db" strokeWidth="2" />
// //           <line x1="560" y1="120" x2="600" y2="180" stroke="#d1d5db" strokeWidth="2" />
// //         </svg>

// //         {/* Business Goals - Middle Column */}
// //         <div className="flex flex-col items-center space-y-4 mx-16">
// //           <Card className="p-4 w-48 bg-white border border-gray-200 shadow-sm relative">
// //             <div className="absolute top-2 left-2 bg-teal-500 text-white text-xs px-2 py-1 rounded">10/10</div>
// //             <div className="font-medium text-gray-900 mb-2 mt-6">Business Goal Name</div>
// //             <div className="text-sm text-gray-600">82%</div>
// //           </Card>

// //           <Card className="p-4 w-48 bg-white border border-gray-200 shadow-sm relative">
// //             <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">10/10</div>
// //             <div className="font-medium text-gray-900 mb-2 mt-6">Business Goal Name</div>
// //             <div className="text-sm text-gray-600">82%</div>
// //           </Card>

// //           <Card className="p-4 w-48 bg-white border border-gray-200 shadow-sm relative">
// //             <div className="absolute top-2 left-2 bg-teal-500 text-white text-xs px-2 py-1 rounded">10/10</div>
// //             <div className="font-medium text-gray-900 mb-2 mt-6">Business Goal Name</div>
// //             <div className="text-sm text-gray-600">82%</div>
// //           </Card>

// //           <Card className="p-4 w-48 bg-white border border-gray-200 shadow-sm relative">
// //             <div className="absolute top-2 left-2 bg-teal-500 text-white text-xs px-2 py-1 rounded">10/10</div>
// //             <div className="font-medium text-gray-900 mb-2 mt-6">Business Goal Name</div>
// //             <div className="text-sm text-gray-600">82%</div>
// //           </Card>
// //         </div>

// //         {/* Objectives - Right Column */}
// //         <div className="flex flex-col items-center space-y-4">
// //           <div style={{ marginTop: "60px" }}>
// //             <Card className="p-4 w-48 bg-white border border-gray-200 shadow-sm relative">
// //               <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">10/10</div>
// //               <div className="font-medium text-gray-900 mb-2 mt-6">Objectives</div>
// //               <div className="text-sm text-gray-600">82%</div>
// //             </Card>
// //           </div>

// //           <div style={{ marginTop: "60px" }}>
// //             <Card className="p-4 w-48 bg-white border border-gray-200 shadow-sm relative">
// //               <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">10/10</div>
// //               <div className="font-medium text-gray-900 mb-2 mt-6">Objectives</div>
// //               <div className="text-sm text-gray-600">82%</div>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
// const StructureView = () => {
//   return (
//     <div className="space-y-8 p-6">
//       <h2 className="text-lg font-medium text-gray-900">Structure View</h2>

//       <div className="relative flex flex-col items-center" style={{ minHeight: "400px" }}>
//         {/* Strategic Theme - Top Center */}
//         <div className="flex flex-col items-center mb-8 -mt-6">
//           <Card className="p-4 w-48 bg-white border border-gray-200 shadow-sm relative">
//             <div className="absolute top-2 left-2 bg-teal-500 text-white text-xs px-2 py-1 rounded">10/10</div>
//             <div className="font-medium text-gray-900 mb-2 mt-6 text-center">Strategic Theme Name</div>
//             <div className="text-sm text-gray-600 text-center">82%</div>
//           </Card>
//         </div>

//         {/* SVG for Connection Lines */}
//         <svg
//           className="absolute inset-0 pointer-events-none"
//           style={{ width: "100%", height: "100%" }}
//           viewBox="0 0 800 400"
//         >
//           {/* Lines from Strategic Theme to Business Goals */}
//           <line x1="400" y1="100" x2="200" y2="180" stroke="#000000" strokeWidth="2" />
//           <line x1="400" y1="100" x2="300" y2="180" stroke="#000000" strokeWidth="2" />
//           <line x1="400" y1="100" x2="500" y2="180" stroke="#000000" strokeWidth="2" />
//           <line x1="400" y1="100" x2="600" y2="180" stroke="#000000" strokeWidth="2" />

//           {/* Lines from Business Goals to Objectives */}
//           <line x1="200" y1="230" x2="200" y2="280" stroke="#000000" strokeWidth="2" />
//           <line x1="300" y1="230" x2="300" y2="280" stroke="#000000" strokeWidth="2" />
//         </svg>

//         {/* Business Goals - Middle Row */}
//         <div className="flex justify-center space-x-8 mb-8">
//           <div className="flex flex-col items-center">
//             <Card className="p-4 w-48 bg-white border border-gray-200 shadow-sm relative">
//               <div className="absolute top-2 left-2 bg-teal-500 text-white text-xs px-2 py-1 rounded">10/10</div>
//               <div className="font-medium text-gray-900 mb-2 mt-6 text-center">Business Goal Name</div>
//               <div className="text-sm text-gray-600 text-center">82%</div>
//             </Card>

//             {/* Objectives under first Business Goal */}
//             <div className="mt-4">
//               <Card className="p-4 w-48 bg-white border border-gray-200 shadow-sm relative">
//                 <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">10/10</div>
//                 <div className="font-medium text-gray-900 mb-2 mt-6 text-center">Objectives</div>
//                 <div className="text-sm text-gray-600 text-center">82%</div>
//               </Card>
//             </div>
//           </div>

//           <div className="flex flex-col items-center">
//             <Card className="p-4 w-48 bg-white border border-gray-200 shadow-sm relative">
//               <div className="absolute top-2 left-2 bg-teal-500 text-white text-xs px-2 py-1 rounded">10/10</div>
//               <div className="font-medium text-gray-900 mb-2 mt-6 text-center">Business Goal Name</div>
//               <div className="text-sm text-gray-600 text-center">82%</div>
//             </Card>

//             {/* Objectives under second Business Goal */}
//             <div className="mt-4">
//               <Card className="p-4 w-48 bg-white border border-gray-200 shadow-sm relative">
//                 <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">10/10</div>
//                 <div className="font-medium text-gray-900 mb-2 mt-6 text-center">Objectives</div>
//                 <div className="text-sm text-gray-600 text-center">82%</div>
//               </Card>
//             </div>
//           </div>

//           <div className="flex flex-col items-center">
//             <Card className="p-4 w-48 bg-white border border-gray-200 shadow-sm relative">
//               <div className="absolute top-2 left-2 bg-teal-500 text-white text-xs px-2 py-1 rounded">10/10</div>
//               <div className="font-medium text-gray-900 mb-2 mt-6 text-center">Business Goal Name</div>
//               <div className="text-sm text-gray-600 text-center">82%</div>
//             </Card>
//           </div>

//           <div className="flex flex-col items-center">
//             <Card className="p-4 w-48 bg-white border border-gray-200 shadow-sm relative">
//               <div className="absolute top-2 left-2 bg-teal-500 text-white text-xs px-2 py-1 rounded">10/10</div>
//               <div className="font-medium text-gray-900 mb-2 mt-6 text-center">Business Goal Name</div>
//               <div className="text-sm text-gray-600 text-center">82%</div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const TimelineView = () => {
//   const months = ["January", "February", "March", "April", "May"]

//   const projects = [
//     { name: "Project 1", progress: 35, startMonth: 0, duration: 1.5 },
//     { name: "Project 1", progress: 35, startMonth: 2, duration: 2 },
//     { name: "Project 1", progress: 36, startMonth: 1.5, duration: 2.5 },
//     { name: "Project 1", progress: 38, startMonth: 2.5, duration: 1.5 },
//   ]

//   return (
//     <div className="space-y-6 p-6">
//       <div className="grid grid-cols-6 gap-4 border-b border-gray-200 pb-4">
//         <div className="font-medium text-gray-900"># Name</div>
//         {months.map((month) => (
//           <div key={month} className="text-center">
//             <div className="font-medium text-gray-900 mb-2">{month}</div>
//             <div className="grid grid-cols-7 gap-1 text-xs text-gray-400">
//               <div>M</div>
//               <div>T</div>
//               <div>W</div>
//               <div>T</div>
//               <div>F</div>
//               <div>S</div>
//               <div>S</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="space-y-4">
//         {projects.map((project, index) => (
//           <div key={index} className="grid grid-cols-6 gap-4 items-center">
//             <div className="font-medium text-gray-700">{project.name}</div>
//             <div className="col-span-5 relative">
//               <div className="h-8 bg-gray-50 rounded relative">
//                 <div
//                   className="absolute top-1 bottom-1 bg-blue-600 rounded flex items-center justify-end pr-2"
//                   style={{
//                     left: `${(project.startMonth / 5) * 100}%`,
//                     width: `${(project.duration / 5) * 100}%`,
//                   }}
//                 >
//                   <span className="text-xs text-white font-medium">{project.progress}%</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// const CardView = () => {
//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "Urgent":
//         return "bg-red-100 text-red-600 border-red-200"
//       case "High":
//         return "bg-orange-100 text-orange-600 border-orange-200"
//       case "Medium":
//         return "bg-yellow-100 text-yellow-600 border-yellow-200"
//       case "Low":
//         return "bg-gray-100 text-gray-600 border-gray-200"
//       default:
//         return "bg-gray-100 text-gray-600 border-gray-200"
//     }
//   }

//   return (
//     <div className="space-y-4">
//       {objectives.map((objective) => (
//         <Card key={objective.id} className="p-6 bg-white border border-gray-200 shadow-sm">
//           <div className="flex items-center justify-between">
//             {/* Left Section - Title and Subtitle */}
//             <div className="flex-1">
//               <h3 className="font-medium text-gray-900 mb-1">{objective.title}</h3>
//               <p className="text-sm text-gray-500">{objective.subtitle}</p>
//             </div>

//             {/* Priority Badge */}
//             <div className="flex-shrink-0 mx-6">
//               <Badge variant="outline" className={`${getPriorityColor(objective.priority)} font-medium`}>
//                 {objective.priority}
//               </Badge>
//             </div>

//             {/* Status Badge */}
//             <div className="flex-shrink-0 mx-6">
//               <Badge className="bg-pink-100 text-pink-600 border-pink-200 font-medium">{objective.status}</Badge>
//             </div>

//             {/* Category Badge */}
//             <div className="flex-shrink-0 mx-6">
//               <Badge className="bg-blue-600 text-white font-medium">{objective.category}</Badge>
//             </div>

//             {/* Progress Section */}
//             <div className="flex-shrink-0 mx-6">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-gray-900 mb-1">{objective.progress}% Complete</p>
//                 <div className="w-20 h-2 bg-gray-200 rounded-full">
//                   <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${objective.progress}%` }} />
//                 </div>
//               </div>
//             </div>

//             {/* Actions Menu */}
//             <div className="flex-shrink-0">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" size="sm" className="p-2">
//                     <MoreHorizontal className="w-4 h-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem>Edit</DropdownMenuItem>
//                   <DropdownMenuItem>Duplicate</DropdownMenuItem>
//                   <DropdownMenuItem>Archive</DropdownMenuItem>
//                   <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//         </Card>
//       ))}
//     </div>
//   )
// }

// const ObjectivesPage = () => {
//   const [currentView, setCurrentView] = useState<"card" | "structure" | "timeline">("card")

//   const getViewTitle = () => {
//     switch (currentView) {
//       case "card":
//         return "Card View"
//       case "structure":
//         return "Structure View"
//       case "timeline":
//         return "Timeline View"
//       default:
//         return "Card View"
//     }
//   }

//   const renderCurrentView = () => {
//     switch (currentView) {
//       case "card":
//         return <CardView />
//       case "structure":
//         return <StructureView />
//       case "timeline":
//         return <TimelineView />
//       default:
//         return <CardView />
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header Section */}
//       <div className="mb-8">
//         {/* Breadcrumb */}
//         <div className="flex items-center text-sm text-gray-500 mb-4">
//           <span>Choreograph</span>
//           <span className="mx-2">{">"}</span>
//           <span className="text-gray-900">Objectives</span>
//         </div>

//         {/* Main Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <h1 className="text-2xl font-semibold text-gray-900">Objectives</h1>
//             <HelpCircle className="w-5 h-5 text-gray-400" />
//           </div>

//           <div className="flex items-center gap-3">
//             <Button variant="outline" className="text-gray-700 border-gray-300 bg-transparent">
//               Objective Impact Summary
//             </Button>
//             <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add objective</Button>
//             <div className="flex items-center gap-1 ml-2">
//               <Button
//                 variant={currentView === "card" ? "default" : "outline"}
//                 size="sm"
//                 className={`p-2 ${currentView === "card" ? "bg-blue-600 text-white" : "bg-transparent"}`}
//                 onClick={() => setCurrentView("card")}
//               >
//                 <Grid3X3 className="w-4 h-4" />
//               </Button>
//               <Button
//                 variant={currentView === "structure" ? "default" : "outline"}
//                 size="sm"
//                 className={`p-2 ${currentView === "structure" ? "bg-blue-600 text-white" : "bg-transparent"}`}
//                 onClick={() => setCurrentView("structure")}
//               >
//                 <BarChart3 className="w-4 h-4" />
//               </Button>
//               <Button
//                 variant={currentView === "timeline" ? "default" : "outline"}
//                 size="sm"
//                 className={`p-2 ${currentView === "timeline" ? "bg-blue-600 text-white" : "bg-transparent"}`}
//                 onClick={() => setCurrentView("timeline")}
//               >
//                 <Pause className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters Section - Only show for card view */}
//       {currentView === "card" && (
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-lg font-medium text-gray-900">{getViewTitle()}</h2>

//           <div className="flex items-center gap-3">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="text-gray-700 border-gray-300 bg-transparent">
//                   Filter by Priority
//                   <ChevronDown className="w-4 h-4 ml-2" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem>All Priorities</DropdownMenuItem>
//                 <DropdownMenuItem>Urgent</DropdownMenuItem>
//                 <DropdownMenuItem>High</DropdownMenuItem>
//                 <DropdownMenuItem>Medium</DropdownMenuItem>
//                 <DropdownMenuItem>Low</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="text-gray-700 border-gray-300 bg-transparent">
//                   Filter by Status
//                   <ChevronDown className="w-4 h-4 ml-2" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem>All Statuses</DropdownMenuItem>
//                 <DropdownMenuItem>On Track</DropdownMenuItem>
//                 <DropdownMenuItem>At Risk</DropdownMenuItem>
//                 <DropdownMenuItem>Overdue</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       )}

//       {renderCurrentView()}
//     </div>
//   )
// }

// export default ObjectivesPage


//! Try - 1

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, MoreHorizontal, Grid3X3, BarChart3, Pause, HelpCircle } from "lucide-react";
import Tree from 'react-d3-tree';

const mockData = {
  strategicThemes: [
    {
      id: 1,
      name: "Strategic Theme Name",
      progress: { completed: 10, total: 10, percentage: 82 },
      businessGoals: [
        {
          id: 1,
          name: "Business Goal Name",
          progress: { completed: 10, total: 10, percentage: 82 },
          objectives: [
            {
              id: 1,
              title: "Lack of Funding",
              subtitle: "Test Goal",
              priority: "Urgent",
              status: "Overdue",
              category: "Finance",
              progress: 20,
              startDate: "2024-01-15",
              endDate: "2024-02-28",
            },
            {
              id: 2,
              title: "Market Research",
              subtitle: "Test Goal",
              priority: "High",
              status: "Overdue",
              category: "Finance",
              progress: 35,
              startDate: "2024-03-01",
              endDate: "2024-04-15",
            },
          ],
        },
        {
          id: 2,
          name: "Business Goal Name",
          progress: { completed: 10, total: 10, percentage: 82 },
          objectives: [
            {
              id: 3,
              title: "Product Development",
              subtitle: "Test Goal",
              priority: "Medium",
              status: "Overdue",
              category: "Finance",
              progress: 36,
              startDate: "2024-02-15",
              endDate: "2024-03-30",
            },
          ],
        },
        {
          id: 3,
          name: "Business Goal Name",
          progress: { completed: 10, total: 10, percentage: 82 },
          objectives: [
            {
              id: 4,
              title: "Team Expansion",
              subtitle: "Test Goal",
              priority: "Low",
              status: "Overdue",
              category: "Finance",
              progress: 38,
              startDate: "2024-03-15",
              endDate: "2024-04-30",
            },
          ],
        },
        {
          id: 4,
          name: "Business Goal Name",
          progress: { completed: 10, total: 10, percentage: 82 },
          objectives: [
            {
              id: 5,
              title: "Customer Acquisition",
              subtitle: "Test Goal",
              priority: "Urgent",
              status: "Overdue",
              category: "Finance",
              progress: 35,
              startDate: "2024-01-01",
              endDate: "2024-01-31",
            },
          ],
        },
      ],
    },
  ],
}

const objectives = mockData.strategicThemes.flatMap((theme) => theme.businessGoals.flatMap((goal) => goal.objectives))

// const StructureView = () => {
//   return (
//     <div className="space-y-8 p-6">
//       <h2 className="text-lg font-medium text-gray-900">Structure View</h2>

//       <div className="relative flex items-start justify-center" style={{ minHeight: "500px", width: "100%" }}>

//         <div className="flex flex-col items-center" style={{ marginTop: "120px", position: "absolute", left: "100px" }}>
//           <Card className="p-4 w-56 bg-white border border-gray-200 shadow-sm relative">
//             <div className="absolute top-3 left-3 bg-teal-500 text-white text-xs px-2 py-1 rounded">10/10</div>
//             <div className="font-medium text-gray-900 mb-2 mt-8 text-sm">Strategic Theme Name</div>
//             <div className="text-sm text-gray-600 font-medium">82%</div>
//           </Card>
//         </div>


//         <div className="flex flex-col items-center space-y-2" style={{ position: "absolute", left: "400px", top: "40px" }}>
//           <Card className="p-4 w-56 bg-white border border-gray-200 shadow-sm relative">
//             <div className="absolute top-3 left-3 bg-teal-500 text-white text-xs px-2 py-1 rounded">10/10</div>
//             <div className="font-medium text-gray-900 mb-2 mt-8 text-sm">Business Goal Name</div>
//             <div className="text-sm text-gray-600 font-medium">82%</div>
//           </Card>

//           <Card className="p-4 w-56 bg-white border border-gray-200 shadow-sm relative">
//             <div className="absolute top-3 left-3 bg-teal-500 text-white text-xs px-2 py-1 rounded">10/10</div>
//             <div className="font-medium text-gray-900 mb-2 mt-8 text-sm">Business Goal Name</div>
//             <div className="text-sm text-gray-600 font-medium">82%</div>
//           </Card>

//           <Card className="p-4 w-56 bg-white border border-gray-200 shadow-sm relative">
//             <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded">10/10</div>
//             <div className="font-medium text-gray-900 mb-2 mt-8 text-sm">Business Goal Name</div>
//             <div className="text-sm text-gray-600 font-medium">82%</div>
//           </Card>

//           <Card className="p-4 w-56 bg-white border border-gray-200 shadow-sm relative">
//             <div className="absolute top-3 left-3 bg-teal-500 text-white text-xs px-2 py-1 rounded">10/10</div>
//             <div className="font-medium text-gray-900 mb-2 mt-8 text-sm">Business Goal Name</div>
//             <div className="text-sm text-gray-600 font-medium">82%</div>
//           </Card>
//         </div>


//         <div className="flex flex-col items-center space-y-2" style={{ position: "absolute", left: "700px", top: "40px" }}>
//           <Card className="p-4 w-56 bg-white border border-gray-200 shadow-sm relative">
//             <div className="absolute top-3 left-3 bg-teal-500 text-white text-xs px-2 py-1 rounded">10/10</div>
//             <div className="font-medium text-gray-900 mb-2 mt-8 text-sm">Objectives</div>
//             <div className="text-sm text-gray-600 font-medium">82%</div>
//           </Card>

//           <Card className="p-4 w-56 bg-white border border-gray-200 shadow-sm relative">
//             <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-2 py-1 rounded">10/10</div>
//             <div className="font-medium text-gray-900 mb-2 mt-8 text-sm">Objectives</div>
//             <div className="text-sm text-gray-600 font-medium">82%</div>
//           </Card>
//         </div>


//         <svg
//           // className="absolute inset-0 pointer-events-none"
//           className="absolute inset-0 "
//           //! SVG for Connection Lines 
//           style={{ width: "100%", height: "100%", top: 0, left: -240 }}
//           // viewBox="0 0 1000 500"
//           viewBox="0 0 1000 500"
//           preserveAspectRatio="xMidYMid meet"
//         >

//           <path
//             // Curved lines from Strategic Theme to Business Goals 
//             // ! Line to first Business  1 
//             // ! d="M 356 180 Q 370 180 400 100" 
//             d="M 356 180 Q 370 180 430 100"
//             stroke="#d1d5db"
//             strokeWidth="2"
//             fill="none"
//           />


//           <path
//             // ! Line to second Business Goal 2
//             // ! d="M 356 180 Q 370 180 400 200" 
//             d="M 356 180 Q 370 200 430 250"
//             stroke="#d1d5db"
//             strokeWidth="2"
//             fill="none"
//           />


//           <path
//             //! Line to third Business Goal 3 
//             // ! d="M 356 180 Q 370 180 400 240" 
//             d="M 356 180 Q 380 250 430 390"
//             stroke="#d1d5db"
//             strokeWidth="2"
//             fill="none"
//           />


//           <path
//             // Line to fourth Business Goal 4 
//             //  ! d="M 356 180 Q 370 180 400 510" 
//             //  ! d="M 356 180 Q 370 180 400 100" 
//             d="M 356 180 Q 390 900 6799 17900"
//             stroke="#d1d5db"
//             strokeWidth="2"
//             fill="none"
//           />


//           <path
//             //! d="M 656 100 Q 670 100 700 100" 
//             d="M 656 100 Q 670 100 730 100"
//             stroke="#d1d5db"
//             strokeWidth="2"
//             fill="none"
//           />


//           <path
//             // ! d="M 656 170 Q 670 170 700 170"
//             d="M 700 100 Q 700 170 730 250"
//             stroke="#d1d5db"
//             strokeWidth="2"
//             fill="none"
//           />
//         </svg>
//       </div>
//     </div>
//   )
// }

const StructureView = () => {
  const [treeData, setTreeData] = useState<any>(null);

  useEffect(() => {
    const mockData = {
      strategicThemes: [
        {
          id: 1,
          name: "Strategic Theme Name",
          progress: { completed: 10, total: 10, percentage: 82 },
          businessGoals: [
            {
              id: 1,
              name: "Business Goal Name",
              progress: { completed: 10, total: 10, percentage: 82 },
              objectives: [
                {
                  id: 1,
                  title: "Lack of Funding",
                  subtitle: "Test Goal",
                  priority: "Urgent",
                  status: "Overdue",
                  category: "Finance",
                  progress: 20,
                  startDate: "2024-01-15",
                  endDate: "2024-02-28",
                },
                {
                  id: 2,
                  title: "Market Research",
                  subtitle: "Test Goal",
                  priority: "High",
                  status: "Overdue",
                  category: "Finance",
                  progress: 35,
                  startDate: "2024-03-01",
                  endDate: "2024-04-15",
                },
              ],
            },
            {
              id: 2,
              name: "Business Goal Name",
              progress: { completed: 10, total: 10, percentage: 82 },
              objectives: [
                {
                  id: 3,
                  title: "Product Development",
                  subtitle: "Test Goal",
                  priority: "Medium",
                  status: "Overdue",
                  category: "Finance",
                  progress: 36,
                  startDate: "2024-02-15",
                  endDate: "2024-03-30",
                },
              ],
            },
            {
              id: 3,
              name: "Business Goal Name",
              progress: { completed: 10, total: 10, percentage: 82 },
              objectives: [
                {
                  id: 4,
                  title: "Team Expansion",
                  subtitle: "Test Goal",
                  priority: "Low",
                  status: "Overdue",
                  category: "Finance",
                  progress: 38,
                  startDate: "2024-03-15",
                  endDate: "2024-04-30",
                },
              ],
            },
            {
              id: 4,
              name: "Business Goal Name",
              progress: { completed: 10, total: 10, percentage: 82 },
              objectives: [
                {
                  id: 5,
                  title: "Customer Acquisition",
                  subtitle: "Test Goal",
                  priority: "Urgent",
                  status: "Overdue",
                  category: "Finance",
                  progress: 35,
                  startDate: "2024-01-01",
                  endDate: "2024-01-31",
                },
              ],
            },
          ],
        },
      ],
    }
    setTreeData(mockData);
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {treeData && (
        <Tree
          data={treeData}
          orientation="horizontal"
          translate={{ x: 50, y: 300 }}
          nodeSize={{ x: 200, y: 200 }}
          separation={{ siblings: 1, nonSiblings: 1 }}
          renderCustomNodeElement={(rd3tProps) => {
            const nodeWidth = Math.max(150, rd3tProps.nodeDatum.name.length * 10 + 20);
            return (
              <g>
                <rect
                  width={nodeWidth}
                  height="50"
                  x={-nodeWidth / 2}
                  y="-25"
                  rx="10"
                  ry="10"
                  fill={rd3tProps.nodeDatum.children ? '#34d399' : '#facc15'}
                  stroke="#4b5563"
                  strokeWidth="1"
                />
                <text
                  fill="#1f2937"
                  strokeWidth="0"
                  x="0"
                  y="0"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {rd3tProps.nodeDatum.name}
                </text>
                <text
                  fill="#1f2937"
                  strokeWidth="0"
                  x="0"
                  y="15"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                >
                  {rd3tProps.nodeDatum.attributes?.progress}
                </text>
              </g>
            );
          }}
        />
      )}
    </div>
  )
}



const TimelineView = () => {
  const months = ["January", "February", "March", "April", "May"]

  const projects = [
    { name: "Project 1", progress: 35, startMonth: 0, duration: 1.5 },
    { name: "Project 1", progress: 35, startMonth: 2, duration: 2 },
    { name: "Project 1", progress: 36, startMonth: 1.5, duration: 2.5 },
    { name: "Project 1", progress: 38, startMonth: 2.5, duration: 1.5 },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-6 gap-4 border-b border-gray-200 pb-4">
        <div className="font-medium text-gray-900"># Name</div>
        {months.map((month) => (
          <div key={month} className="text-center">
            <div className="font-medium text-gray-900 mb-2">{month}</div>
            <div className="grid grid-cols-7 gap-1 text-xs text-gray-400">
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="grid grid-cols-6 gap-4 items-center">
            <div className="font-medium text-gray-700">{project.name}</div>
            <div className="col-span-5 relative">
              <div className="h-8 bg-gray-50 rounded relative">
                <div
                  className="absolute top-1 bottom-1 bg-blue-600 rounded flex items-center justify-end pr-2"
                  style={{
                    left: `${(project.startMonth / 5) * 100}%`,
                    width: `${(project.duration / 5) * 100}%`,
                  }}
                >
                  <span className="text-xs text-white font-medium">{project.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const CardView = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-600 border-red-200"
      case "High":
        return "bg-orange-100 text-orange-600 border-orange-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-600 border-yellow-200"
      case "Low":
        return "bg-gray-100 text-gray-600 border-gray-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      {objectives.map((objective) => (
        <Card key={objective.id} className="p-6 bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            {/* Left Section - Title and Subtitle */}
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">{objective.title}</h3>
              <p className="text-sm text-gray-500">{objective.subtitle}</p>
            </div>

            {/* Priority Badge */}
            <div className="flex-shrink-0 mx-6">
              <Badge variant="outline" className={`${getPriorityColor(objective.priority)} font-medium`}>
                {objective.priority}
              </Badge>
            </div>

            {/* Status Badge */}
            <div className="flex-shrink-0 mx-6">
              <Badge className="bg-pink-100 text-pink-600 border-pink-200 font-medium">{objective.status}</Badge>
            </div>

            {/* Category Badge */}
            <div className="flex-shrink-0 mx-6">
              <Badge className="bg-blue-600 text-white font-medium">{objective.category}</Badge>
            </div>

            {/* Progress Section */}
            <div className="flex-shrink-0 mx-6">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 mb-1">{objective.progress}% Complete</p>
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${objective.progress}%` }} />
                </div>
              </div>
            </div>

            {/* Actions Menu */}
            <div className="flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

const ObjectivesPage = () => {
  const [currentView, setCurrentView] = useState<"card" | "structure" | "timeline">("structure")

  const getViewTitle = () => {
    switch (currentView) {
      case "card":
        return "Card View"
      case "structure":
        return "Structure View"
      case "timeline":
        return "Timeline View"
      default:
        return "Card View"
    }
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "card":
        return <CardView />
      case "structure":
        return <StructureView />
      case "timeline":
        return <TimelineView />
      default:
        return <CardView />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>Choreograph</span>
          <span className="mx-2">{">"}</span>
          <span className="text-gray-900">Objectives</span>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">Objectives</h1>
            <HelpCircle className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="text-gray-700 border-gray-300 bg-transparent">
              Objective Impact Summary
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add objective</Button>
            <div className="flex items-center gap-1 ml-2">
              <Button
                variant={currentView === "card" ? "default" : "outline"}
                size="sm"
                className={`p-2 ${currentView === "card" ? "bg-blue-600 text-white" : "bg-transparent"}`}
                onClick={() => setCurrentView("card")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={currentView === "structure" ? "default" : "outline"}
                size="sm"
                className={`p-2 ${currentView === "structure" ? "bg-blue-600 text-white" : "bg-transparent"}`}
                onClick={() => setCurrentView("structure")}
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
              <Button
                variant={currentView === "timeline" ? "default" : "outline"}
                size="sm"
                className={`p-2 ${currentView === "timeline" ? "bg-blue-600 text-white" : "bg-transparent"}`}
                onClick={() => setCurrentView("timeline")}
              >
                <Pause className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section - Only show for card view */}
      {currentView === "card" && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">{getViewTitle()}</h2>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-gray-700 border-gray-300 bg-transparent">
                  Filter by Priority
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Priorities</DropdownMenuItem>
                <DropdownMenuItem>Urgent</DropdownMenuItem>
                <DropdownMenuItem>High</DropdownMenuItem>
                <DropdownMenuItem>Medium</DropdownMenuItem>
                <DropdownMenuItem>Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-gray-700 border-gray-300 bg-transparent">
                  Filter by Status
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Statuses</DropdownMenuItem>
                <DropdownMenuItem>On Track</DropdownMenuItem>
                <DropdownMenuItem>At Risk</DropdownMenuItem>
                <DropdownMenuItem>Overdue</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {renderCurrentView()}
    </div>
  )
}

export default ObjectivesPage