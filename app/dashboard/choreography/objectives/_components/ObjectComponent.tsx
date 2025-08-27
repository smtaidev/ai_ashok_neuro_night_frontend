// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { ChevronDown, MoreHorizontal, Grid3X3, BarChart3, Pause, HelpCircle } from "lucide-react";
// import { IObjective } from "@/redux/api/choreograph/objectivesApi"

// import dynamic from "next/dynamic";


// const StructureView = dynamic(() => import("./StructureView"), {
//   ssr: false,
//   loading: () => <p className="text-center py-4">Loading tree...</p>,
// });

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




// const TimelineView = () => {
//   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
//                   className="absolute top-1 bottom-1 bg-[#22398A] rounded flex items-center justify-end pr-2"
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
//               <Badge className="bg-[#22398A] text-white font-medium">{objective.category}</Badge>
//             </div>

//             {/* Progress Section */}
//             <div className="flex-shrink-0 mx-6">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-gray-900 mb-1">{objective.progress}% Complete</p>
//                 <div className="w-20 h-2 bg-gray-200 rounded-full">
//                   <div className="h-2 bg-[#22398A] rounded-full" style={{ width: `${objective.progress}%` }} />
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
// interface ObjectComponentProps {
//   data: IObjective[];
// }

// const ObjectivesPage = ({ data }: ObjectComponentProps) => {
//   const [currentView, setCurrentView] = useState<"card" | "structure" | "timeline">("structure")


//   const getViewTitle = () => {
//     switch (currentView) {
//       case "card": return "Card View"
//       case "structure": return "Structure View"
//       case "timeline": return "Timeline View"
//       default: return "Card View"
//     }
//   }

//   const renderCurrentView = () => {
//     switch (currentView) {
//       case "card": return <CardView />
//       case "structure": return <StructureView />
//       case "timeline": return <TimelineView />
//       default: return <CardView />
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
//             <Button className="bg-[#22398A] cursor-pointer text-white">Add objective</Button>
//             <div className="flex items-center gap-1 ml-2">
//               <Button
//                 variant={currentView === "card" ? "default" : "outline"}
//                 size="sm"
//                 className={`p-2 ${currentView === "card" ? "bg-[#22398A] text-white" : "bg-transparent"}`}
//                 onClick={() => setCurrentView("card")}
//               >
//                 <Grid3X3 className="w-4 h-4" />
//               </Button>
//               <Button
//                 variant={currentView === "structure" ? "default" : "outline"}
//                 size="sm"
//                 className={`p-2 ${currentView === "structure" ? "bg-[#22398A] text-white" : "bg-transparent"}`}
//                 onClick={() => setCurrentView("structure")}
//               >
//                 <BarChart3 className="w-4 h-4" />
//               </Button>
//               <Button
//                 variant={currentView === "timeline" ? "default" : "outline"}
//                 size="sm"
//                 className={`p-2 ${currentView === "timeline" ? "bg-[#22398A] text-white" : "bg-transparent"}`}
//                 onClick={() => setCurrentView("timeline")}
//               >
//                 <Pause className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters Section - Only for card view */}
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



//! Try - 1

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, MoreHorizontal, Grid3X3, BarChart3, Pause, HelpCircle } from "lucide-react"
import { IObjective } from "@/redux/api/choreograph/objectivesApi"
import dynamic from "next/dynamic"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const StructureView = dynamic(() => import("./StructureView"), {
  ssr: false,
  loading: () => <p className="text-center py-4">Loading tree...</p>,
})

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
      ],
    },
  ],
}

const objectives = mockData.strategicThemes.flatMap((theme) =>
  theme.businessGoals.flatMap((goal) => goal.objectives)
)

const TimelineView = () => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const projects = [
    { name: "Project 1", progress: 35, startMonth: 0, duration: 1.5 },
    { name: "Project 2", progress: 36, startMonth: 2, duration: 2.5 },
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
                  className="absolute top-1 bottom-1 bg-[#22398A] rounded flex items-center justify-end pr-2"
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
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">{objective.title}</h3>
              <p className="text-sm text-gray-500">{objective.subtitle}</p>
            </div>

            <div className="flex-shrink-0 mx-6">
              <Badge variant="outline" className={`${getPriorityColor(objective.priority)} font-medium`}>
                {objective.priority}
              </Badge>
            </div>

            <div className="flex-shrink-0 mx-6">
              <Badge className="bg-pink-100 text-pink-600 border-pink-200 font-medium">{objective.status}</Badge>
            </div>

            <div className="flex-shrink-0 mx-6">
              <Badge className="bg-[#22398A] text-white font-medium">{objective.category}</Badge>
            </div>

            <div className="flex-shrink-0 mx-6">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 mb-1">{objective.progress}% Complete</p>
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-[#22398A] rounded-full" style={{ width: `${objective.progress}%` }} />
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
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

interface ObjectComponentProps {
  data?: IObjective[];
}

const ObjectivesPage = ({ data }: ObjectComponentProps) => {
  const [currentView, setCurrentView] = useState<"card" | "structure" | "timeline">("structure")
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Objectives</h1>
          <HelpCircle className="w-5 h-5 text-gray-400" />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-gray-700 border-gray-300 bg-transparent">
            Objective Impact Summary
          </Button>
          <Button className="bg-[#22398A] cursor-pointer text-white" onClick={() => setIsModalOpen(true)}>
            Add objective
          </Button>
          <div className="flex items-center gap-1 ml-2">
            <Button
              variant={currentView === "card" ? "default" : "outline"}
              size="sm"
              className={`p-2 ${currentView === "card" ? "bg-[#22398A] text-white" : "bg-transparent"}`}
              onClick={() => setCurrentView("card")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={currentView === "structure" ? "default" : "outline"}
              size="sm"
              className={`p-2 ${currentView === "structure" ? "bg-[#22398A] text-white" : "bg-transparent"}`}
              onClick={() => setCurrentView("structure")}
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
            <Button
              variant={currentView === "timeline" ? "default" : "outline"}
              size="sm"
              className={`p-2 ${currentView === "timeline" ? "bg-[#22398A] text-white" : "bg-transparent"}`}
              onClick={() => setCurrentView("timeline")}
            >
              <Pause className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
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

      {/* Add Objective Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="p-0 border-0 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg relative">
            <div className="bg-[#22398A] text-white p-4 -mt-1 rounded-t-xl">
              <DialogTitle className="text-xl font-bold">Add an objective</DialogTitle>
            </div>

            <div className="grid grid-cols-2 gap-6 p-6 max-h-[80vh] overflow-y-auto">
              {/* Left Side */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input placeholder="Add Title....." />
                </div>
                <div className="space-y-2">
                  <Label>Description *</Label>
                  <textarea placeholder="Add Details....." className="w-full border rounded-md p-3" rows={4} />
                </div>
                <div className="space-y-2">
                  <Label>Objective Timeline *</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <Input type="date" />
                    <Input type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority *</Label>
                    <select className="w-full border rounded-md p-3">
                      <option>Select Priority</option>
                      <option>Urgent</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Progress (in %)</Label>
                    <Input placeholder="ie. 10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Funding allocated *</Label>
                  <Input placeholder="ie. 100" />
                </div>
                <div className="space-y-2">
                  <Label>Environmental & Social issues?</Label>
                  <select className="w-full border rounded-md p-3">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                  <textarea placeholder="Add Details....." className="w-full border rounded-md p-3 mt-2" />
                </div>
              </div>

              {/* Right Side */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Objective Owner</Label>
                  <select className="w-full border rounded-md p-3">
                    <option>Please select Name(s)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Assign team member</Label>
                  <select className="w-full border rounded-md p-3">
                    <option>Please select Name(s)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Cross-team collaboration?</Label>
                  <select className="w-full border rounded-md p-3">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>If yes, invite team members</Label>
                  <select className="w-full border rounded-md p-3">
                    <option>Please select Name(s)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Business goals tied to?</Label>
                  <select className="w-full border rounded-md p-3">
                    <option>Select Functionality</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Long-term or short-term?</Label>
                  <select className="w-full border rounded-md p-3">
                    <option>Please select</option>
                    <option>Long-term</option>
                    <option>Short-term</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Specific and strategic?</Label>
                  <select className="w-full border rounded-md p-3">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Do we have resources?</Label>
                  <select className="w-full border rounded-md p-3">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end p-4 gap-4">
              <Button onClick={() => setIsModalOpen(false)} className="bg-[#22398A] hover:bg-[#22398A]/90 text-white">
                Save Objective
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ObjectivesPage

//! Try - 2

// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { ChevronDown, MoreHorizontal, Grid3X3, BarChart3, Pause, HelpCircle, X } from "lucide-react"
// import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useCreateObjectiveMutation } from "@/redux/api/choreograph/objectivesApi"

// // Mock hooks for demonstration - replace with actual imports
// const useGetAllOrganizationUsersQuery = () => ({
//   data: [
//     { _id: "64f1c8a2b4567e1234567890", userId: { userName: "John Doe", email: "john@example.com" } },
//     { _id: "64f1c8a2b4567e1234567891", userId: { userName: "Jane Smith", email: "jane@example.com" } },
//     { _id: "64f1c8a2b4567e1234567892", userId: { userName: "Bob Wilson", email: "bob@example.com" } }
//   ],
//   isLoading: false,
//   error: null
// })

// const useGetAllMembersQuery = () => ({
//   data: {
//     data: [
//       { _id: "64f1c8a2b4567e1234567891", userName: "Alice Johnson", teamRole: "Developer", email: "alice@example.com" },
//       { _id: "64f1c8a2b4567e1234567892", userName: "Charlie Brown", teamRole: "Designer", email: "charlie@example.com" },
//       { _id: "64f1c8a2b4567e1234567893", userName: "David Lee", teamRole: "Manager", email: "david@example.com" },
//       { _id: "64f1c8a2b4567e1234567894", userName: "Emma Davis", teamRole: "Analyst", email: "emma@example.com" }
//     ]
//   },
//   isLoading: false,
//   error: null
// })



// interface IObjective {
//   _id?: string
//   title: string
//   description?: string
//   startDate?: string
//   endDate?: string
//   priority?: string
//   progress?: string
//   fundingAllocated?: string
//   envSocialIssues?: string
//   envSocialDetails?: string
//   risksAssociated?: string
//   riskDetails?: string
//   objectiveOwner?: string
//   assignedTeamMembers?: string[]
//   invitedTeamMembers?: string[]
//   crossTeamCollaboration?: string
//   businessGoals?: string
//   termType?: string
//   specificStrategic?: string
//   necessaryResources?: string
//   additionalTalent?: string
//   potentialChallenges?: string
// }

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
//       ],
//     },
//   ],
// }

// const objectives = mockData.strategicThemes.flatMap((theme) =>
//   theme.businessGoals.flatMap((goal) => goal.objectives)
// )

// const TimelineView = () => {
//   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

//   const projects = [
//     { name: "Project 1", progress: 35, startMonth: 0, duration: 1.5 },
//     { name: "Project 2", progress: 36, startMonth: 2, duration: 2.5 },
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
//                   className="absolute top-1 bottom-1 bg-[#22398A] rounded flex items-center justify-end pr-2"
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
//             <div className="flex-1">
//               <h3 className="font-medium text-gray-900 mb-1">{objective.title}</h3>
//               <p className="text-sm text-gray-500">{objective.subtitle}</p>
//             </div>

//             <div className="flex-shrink-0 mx-6">
//               <Badge variant="outline" className={`${getPriorityColor(objective.priority)} font-medium`}>
//                 {objective.priority}
//               </Badge>
//             </div>

//             <div className="flex-shrink-0 mx-6">
//               <Badge className="bg-pink-100 text-pink-600 border-pink-200 font-medium">{objective.status}</Badge>
//             </div>

//             <div className="flex-shrink-0 mx-6">
//               <Badge className="bg-[#22398A] text-white font-medium">{objective.category}</Badge>
//             </div>

//             <div className="flex-shrink-0 mx-6">
//               <div className="text-right">
//                 <p className="text-sm font-medium text-gray-900 mb-1">{objective.progress}% Complete</p>
//                 <div className="w-20 h-2 bg-gray-200 rounded-full">
//                   <div className="h-2 bg-[#22398A] rounded-full" style={{ width: `${objective.progress}%` }} />
//                 </div>
//               </div>
//             </div>

//             <div className="flex-shrink-0">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" size="sm" className="p-2">
//                     <MoreHorizontal className="w-4 h-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem>Edit</DropdownMenuItem>
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

// // Mock StructureView component
// const StructureView = () => (
//   <div className="p-6">
//     <div className="text-center py-8">
//       <h3 className="text-lg font-medium text-gray-900 mb-2">Structure View</h3>
//       <p className="text-gray-500">Organizational structure visualization would be displayed here</p>
//     </div>
//   </div>
// )

// interface ObjectComponentProps {
//   data?: IObjective[];
// }

// const ObjectivesPage = ({ data }: ObjectComponentProps) => {
//   const [currentView, setCurrentView] = useState<"card" | "structure" | "timeline">("structure")
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   // Form state
//   const [formData, setFormData] = useState<IObjective>({
//     title: '',
//     description: '',
//     startDate: '',
//     endDate: '',
//     priority: '',
//     progress: '',
//     fundingAllocated: '',
//     envSocialIssues: 'No',
//     envSocialDetails: '',
//     risksAssociated: '',
//     riskDetails: '',
//     objectiveOwner: '',
//     assignedTeamMembers: [],
//     invitedTeamMembers: [],
//     crossTeamCollaboration: 'No',
//     businessGoals: '',
//     termType: '',
//     specificStrategic: 'Yes',
//     necessaryResources: '',
//     additionalTalent: '',
//     potentialChallenges: ''
//   })

//   const [formErrors, setFormErrors] = useState<Record<string, string>>({})
//   const [assignedTeams, setAssignedTeams] = useState<string[]>([])

//   // API hooks
//   const { data: organizationUsers, isLoading: loadingUsers } = useGetAllOrganizationUsersQuery()
//   const { data: teamMembersData, isLoading: loadingMembers } = useGetAllMembersQuery()
//   const [createObjective, { isLoading: creating }] = useCreateObjectiveMutation()

//   const teamMembers = teamMembersData?.data || []

//   // Get today's date for minimum start date
//   const today = new Date().toISOString().split('T')[0]

//   // Get minimum end date (day after start date)
//   const getMinEndDate = () => {
//     if (!formData.startDate) return today
//     const startDate = new Date(formData.startDate)
//     const nextDay = new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
//     return nextDay.toISOString().split('T')[0]
//   }

//   // Update assigned teams when team members change
//   useEffect(() => {
//     if (formData.assignedTeamMembers && formData.assignedTeamMembers.length > 0) {
//       const selectedMembers = teamMembers.filter(member =>
//         formData.assignedTeamMembers?.includes(member._id)
//       )
//       const teams = [...new Set(selectedMembers.map(member => member.teamRole))]
//       setAssignedTeams(teams)
//     } else {
//       setAssignedTeams([])
//     }
//   }, [formData.assignedTeamMembers, teamMembers])

//   // Filter invited members (exclude those from assigned teams)
//   const availableInviteMembers = teamMembers.filter(member =>
//     !assignedTeams.includes(member.teamRole) &&
//     !formData.assignedTeamMembers?.includes(member._id)
//   )

//   const handleInputChange = (field: keyof IObjective, value: any) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }))

//     // Clear error when user starts typing
//     if (formErrors[field]) {
//       setFormErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }))
//     }

//     // Special handling for start date - clear end date if it becomes invalid
//     if (field === 'startDate' && formData.endDate) {
//       const startDate = new Date(value)
//       const endDate = new Date(formData.endDate)
//       if (endDate <= startDate) {
//         setFormData(prev => ({
//           ...prev,
//           startDate: value,
//           endDate: ''
//         }))
//       }
//     }
//   }

//   const handleArrayChange = (field: 'assignedTeamMembers' | 'invitedTeamMembers', memberId: string) => {
//     const currentArray = formData[field] || []
//     const updatedArray = currentArray.includes(memberId)
//       ? currentArray.filter(id => id !== memberId)
//       : [...currentArray, memberId]

//     handleInputChange(field, updatedArray)
//   }

//   const validateForm = (): boolean => {
//     const errors: Record<string, string> = {}

//     // Required fields
//     if (!formData.title?.trim()) errors.title = 'Title is required'
//     if (!formData.description?.trim()) errors.description = 'Description is required'
//     if (!formData.startDate) errors.startDate = 'Start date is required'
//     if (!formData.endDate) errors.endDate = 'End date is required'
//     if (!formData.priority) errors.priority = 'Priority is required'
//     if (!formData.fundingAllocated) errors.fundingAllocated = 'Funding allocation is required'

//     // Date validation
//     if (formData.startDate && formData.endDate) {
//       const startDate = new Date(formData.startDate)
//       const endDate = new Date(formData.endDate)
//       if (endDate <= startDate) {
//         errors.endDate = 'End date must be after start date'
//       }
//     }

//     // Progress validation
//     if (formData.progress) {
//       const progress = parseInt(formData.progress)
//       if (isNaN(progress) || progress < 0 || progress > 100) {
//         errors.progress = 'Progress must be between 0 and 100'
//       }
//     }

//     // Funding validation
//     if (formData.fundingAllocated) {
//       const funding = parseFloat(formData.fundingAllocated)
//       if (isNaN(funding) || funding < 0) {
//         errors.fundingAllocated = 'Funding must be a positive number'
//       }
//     }

//     setFormErrors(errors)
//     return Object.keys(errors).length === 0
//   }

//   const handleSubmit = async () => {
//     if (!validateForm()) return

//     try {
//       // Prepare data according to the JSON format
//       const objectiveData = {
//         title: formData.title,
//         description: formData.description,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         priority: formData.priority,
//         progress: formData.progress,
//         fundingAllocated: formData.fundingAllocated,
//         envSocialIssues: formData.envSocialIssues,
//         envSocialDetails: formData.envSocialDetails,
//         risksAssociated: formData.risksAssociated,
//         riskDetails: formData.riskDetails,
//         objectiveOwner: formData.objectiveOwner,
//         assignedTeamMembers: formData.assignedTeamMembers,
//         invitedTeamMembers: formData.invitedTeamMembers,
//         crossTeamCollaboration: formData.crossTeamCollaboration,
//         businessGoals: formData.businessGoals,
//         termType: formData.termType,
//         specificStrategic: formData.specificStrategic,
//         necessaryResources: formData.necessaryResources,
//         additionalTalent: formData.additionalTalent,
//         potentialChallenges: formData.potentialChallenges
//       }

//       await createObjective(objectiveData)
//       setIsModalOpen(false)
//       resetForm()
//       // You might want to show a success message here
//     } catch (error) {
//       console.error('Error creating objective:', error)
//       // Handle error (show error message)
//     }
//   }

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       description: '',
//       startDate: '',
//       endDate: '',
//       priority: '',
//       progress: '',
//       fundingAllocated: '',
//       envSocialIssues: 'No',
//       envSocialDetails: '',
//       risksAssociated: '',
//       riskDetails: '',
//       objectiveOwner: '',
//       assignedTeamMembers: [],
//       invitedTeamMembers: [],
//       crossTeamCollaboration: 'No',
//       businessGoals: '',
//       termType: '',
//       specificStrategic: 'Yes',
//       necessaryResources: '',
//       additionalTalent: '',
//       potentialChallenges: ''
//     })
//     setFormErrors({})
//     setAssignedTeams([])
//   }

//   const handleCloseModal = () => {
//     setIsModalOpen(false)
//     resetForm()
//   }

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
//       <div className="mb-8 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <h1 className="text-2xl font-semibold text-gray-900">Objectives</h1>
//           <HelpCircle className="w-5 h-5 text-gray-400" />
//         </div>

//         <div className="flex items-center gap-3">
//           <Button variant="outline" className="text-gray-700 border-gray-300 bg-transparent">
//             Objective Impact Summary
//           </Button>
//           <Button className="bg-[#22398A] cursor-pointer text-white" onClick={() => setIsModalOpen(true)}>
//             Add objective
//           </Button>
//           <div className="flex items-center gap-1 ml-2">
//             <Button
//               variant={currentView === "card" ? "default" : "outline"}
//               size="sm"
//               className={`p-2 ${currentView === "card" ? "bg-[#22398A] text-white" : "bg-transparent"}`}
//               onClick={() => setCurrentView("card")}
//             >
//               <Grid3X3 className="w-4 h-4" />
//             </Button>
//             <Button
//               variant={currentView === "structure" ? "default" : "outline"}
//               size="sm"
//               className={`p-2 ${currentView === "structure" ? "bg-[#22398A] text-white" : "bg-transparent"}`}
//               onClick={() => setCurrentView("structure")}
//             >
//               <BarChart3 className="w-4 h-4" />
//             </Button>
//             <Button
//               variant={currentView === "timeline" ? "default" : "outline"}
//               size="sm"
//               className={`p-2 ${currentView === "timeline" ? "bg-[#22398A] text-white" : "bg-transparent"}`}
//               onClick={() => setCurrentView("timeline")}
//             >
//               <Pause className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Filters Section */}
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

//       {/* Add Objective Modal */}
//       <Dialog open={isModalOpen} onOpenChange={() => { }}>
//         <DialogContent className="p-0 border-0 max-w-4xl max-h-[90vh] overflow-hidden">
//           <div className="bg-white rounded-xl shadow-lg relative">
//             <div className="bg-[#22398A] text-white p-4 -mt-1 rounded-t-xl flex justify-between items-center">
//               <DialogTitle className="text-xl font-bold">Add an objective</DialogTitle>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleCloseModal}
//                 className="text-white hover:bg-white/10 p-1"
//               >
//                 <X className="w-5 h-5" />
//               </Button>
//             </div>

//             <div className="grid grid-cols-2 gap-6 p-6 max-h-[75vh] overflow-y-auto">
//               {/* Left Side */}
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label>Title *</Label>
//                   <Input
//                     placeholder="Add Title....."
//                     value={formData.title}
//                     onChange={(e) => handleInputChange('title', e.target.value)}
//                     className={formErrors.title ? 'border-red-500' : ''}
//                   />
//                   {formErrors.title && <p className="text-red-500 text-sm">{formErrors.title}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Description *</Label>
//                   <textarea
//                     placeholder="Add Details....."
//                     className={`w-full border rounded-md p-3 ${formErrors.description ? 'border-red-500' : ''}`}
//                     rows={4}
//                     value={formData.description}
//                     onChange={(e) => handleInputChange('description', e.target.value)}
//                   />
//                   {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Objective Timeline *</Label>
//                   <div className="grid grid-cols-2 gap-4 mt-2">
//                     <div>
//                       <Input
//                         type="date"
//                         min={today}
//                         value={formData.startDate}
//                         onChange={(e) => handleInputChange('startDate', e.target.value)}
//                         className={formErrors.startDate ? 'border-red-500' : ''}
//                       />
//                       {formErrors.startDate && <p className="text-red-500 text-sm">{formErrors.startDate}</p>}
//                     </div>
//                     <div>
//                       <Input
//                         type="date"
//                         min={getMinEndDate()}
//                         value={formData.endDate}
//                         onChange={(e) => handleInputChange('endDate', e.target.value)}
//                         className={formErrors.endDate ? 'border-red-500' : ''}
//                         disabled={!formData.startDate}
//                       />
//                       {formErrors.endDate && <p className="text-red-500 text-sm">{formErrors.endDate}</p>}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label>Priority *</Label>
//                     <select
//                       className={`w-full border rounded-md p-3 ${formErrors.priority ? 'border-red-500' : ''}`}
//                       value={formData.priority}
//                       onChange={(e) => handleInputChange('priority', e.target.value)}
//                     >
//                       <option value="">Select Priority</option>
//                       <option value="Urgent">Urgent</option>
//                       <option value="High">High</option>
//                       <option value="Medium">Medium</option>
//                       <option value="Low">Low</option>
//                     </select>
//                     {formErrors.priority && <p className="text-red-500 text-sm">{formErrors.priority}</p>}
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Progress (in %)</Label>
//                     <Input
//                       placeholder="ie. 10"
//                       type="number"
//                       min="0"
//                       max="100"
//                       value={formData.progress}
//                       onChange={(e) => handleInputChange('progress', e.target.value)}
//                       className={formErrors.progress ? 'border-red-500' : ''}
//                     />
//                     {formErrors.progress && <p className="text-red-500 text-sm">{formErrors.progress}</p>}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Funding allocated *</Label>
//                   <Input
//                     placeholder="ie. 100"
//                     type="number"
//                     min="0"
//                     value={formData.fundingAllocated}
//                     onChange={(e) => handleInputChange('fundingAllocated', e.target.value)}
//                     className={formErrors.fundingAllocated ? 'border-red-500' : ''}
//                   />
//                   {formErrors.fundingAllocated && <p className="text-red-500 text-sm">{formErrors.fundingAllocated}</p>}
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Environmental & Social issues?</Label>
//                   <select
//                     className="w-full border rounded-md p-3"
//                     value={formData.envSocialIssues}
//                     onChange={(e) => handleInputChange('envSocialIssues', e.target.value)}
//                   >
//                     <option value="No">No</option>
//                     <option value="Yes">Yes</option>
//                   </select>
//                   {formData.envSocialIssues === 'Yes' && (
//                     <textarea
//                       placeholder="Add Details....."
//                       className="w-full border rounded-md p-3 mt-2"
//                       value={formData.envSocialDetails}
//                       onChange={(e) => handleInputChange('envSocialDetails', e.target.value)}
//                     />
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Risks Associated</Label>
//                   <select
//                     className="w-full border rounded-md p-3"
//                     value={formData.risksAssociated}
//                     onChange={(e) => handleInputChange('risksAssociated', e.target.value)}
//                   >
//                     <option value="">Select Risk Level</option>
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                   </select>
//                   {formData.risksAssociated && (
//                     <textarea
//                       placeholder="Describe the risks..."
//                       className="w-full border rounded-md p-3 mt-2"
//                       value={formData.riskDetails}
//                       onChange={(e) => handleInputChange('riskDetails', e.target.value)}
//                     />
//                   )}
//                 </div>
//               </div>

//               {/* Right Side */}
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label>Objective Owner</Label>
//                   <select
//                     className="w-full border rounded-md p-3"
//                     value={formData.objectiveOwner}
//                     onChange={(e) => handleInputChange('objectiveOwner', e.target.value)}
//                     disabled={loadingUsers}
//                   >
//                     <option value="">Please select Name(s)</option>
//                     {organizationUsers?.map((user) => (
//                       <option key={user._id} value={user._id}>
//                         {user.userId.userName} ({user.userId.email})
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Assign team member</Label>
//                   <div className="max-h-32 overflow-y-auto border rounded-md p-2">
//                     {loadingMembers ? (
//                       <p className="text-gray-500">Loading members...</p>
//                     ) : (
//                       teamMembers.map((member) => (
//                         <div key={member._id} className="flex items-center space-x-2 py-1">
//                           <input
//                             type="checkbox"
//                             id={`assign-${member._id}`}
//                             checked={formData.assignedTeamMembers?.includes(member._id) || false}
//                             onChange={() => handleArrayChange('assignedTeamMembers', member._id)}
//                             className="rounded border-gray-300"
//                           />
//                           <label htmlFor={`assign-${member._id}`} className="text-sm">
//                             {member.userName} ({member.teamRole})
//                           </label>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Cross-team collaboration?</Label>
//                   <select
//                     className="w-full border rounded-md p-3"
//                     value={formData.crossTeamCollaboration}
//                     onChange={(e) => handleInputChange('crossTeamCollaboration', e.target.value)}
//                   >
//                     <option value="No">No</option>
//                     <option value="Yes">Yes</option>
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>If yes, invite team members</Label>
//                   <div className="max-h-32 overflow-y-auto border rounded-md p-2">
//                     {formData.crossTeamCollaboration === 'Yes' ? (
//                       availableInviteMembers.length > 0 ? (
//                         availableInviteMembers.map((member) => (
//                           <div key={member._id} className="flex items-center space-x-2 py-1">
//                             <input
//                               type="checkbox"
//                               id={`invite-${member._id}`}
//                               checked={formData.invitedTeamMembers?.includes(member._id) || false}
//                               onChange={() => handleArrayChange('invitedTeamMembers', member._id)}
//                               className="rounded border-gray-300"
//                             />
//                             <label htmlFor={`invite-${member._id}`} className="text-sm">
//                               {member.userName} ({member.teamRole})
//                             </label>
//                           </div>
//                         ))
//                       ) : (
//                         <p className="text-gray-500 text-sm">No available members to invite</p>
//                       )
//                     ) : (
//                       <p className="text-gray-500 text-sm">Enable cross-team collaboration to invite members</p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Business goals tied to?</Label>
//                   <select
//                     className="w-full border rounded-md p-3"
//                     value={formData.businessGoals}
//                     onChange={(e) => handleInputChange('businessGoals', e.target.value)}
//                   >
//                     <option value="">Select Functionality</option>
//                     <option value="Revenue Growth">Revenue Growth</option>
//                     <option value="Cost Reduction">Cost Reduction</option>
//                     <option value="Market Expansion">Market Expansion</option>
//                     <option value="Operational Efficiency">Operational Efficiency</option>
//                     <option value="Customer Satisfaction">Customer Satisfaction</option>
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Long-term or short-term?</Label>
//                   <select
//                     className="w-full border rounded-md p-3"
//                     value={formData.termType}
//                     onChange={(e) => handleInputChange('termType', e.target.value)}
//                   >
//                     <option value="">Please select</option>
//                     <option value="Long-term">Long-term</option>
//                     <option value="Short-term">Short-term</option>
//                     <option value="Annual">Annual</option>
//                     <option value="Quarterly">Quarterly</option>
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Specific and strategic?</Label>
//                   <select
//                     className="w-full border rounded-md p-3"
//                     value={formData.specificStrategic}
//                     onChange={(e) => handleInputChange('specificStrategic', e.target.value)}
//                   >
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Do we have resources?</Label>
//                   <select
//                     className="w-full border rounded-md p-3"
//                     value={formData.necessaryResources}
//                     onChange={(e) => handleInputChange('necessaryResources', e.target.value)}
//                   >
//                     <option value="">Please select</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                     <option value="Partially">Partially</option>
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Additional talent needed?</Label>
//                   <textarea
//                     placeholder="Describe additional talent requirements..."
//                     className="w-full border rounded-md p-3"
//                     rows={3}
//                     value={formData.additionalTalent}
//                     onChange={(e) => handleInputChange('additionalTalent', e.target.value)}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Potential challenges</Label>
//                   <textarea
//                     placeholder="Describe potential challenges..."
//                     className="w-full border rounded-md p-3"
//                     rows={3}
//                     value={formData.potentialChallenges}
//                     onChange={(e) => handleInputChange('potentialChallenges', e.target.value)}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end p-4 gap-4 border-t">
//               <Button
//                 variant="outline"
//                 onClick={handleCloseModal}
//                 disabled={creating}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleSubmit}
//                 className="bg-[#22398A] hover:bg-[#22398A]/90 text-white"
//                 disabled={creating}
//               >
//                 {creating ? 'Saving...' : 'Save Objective'}
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

// export default ObjectivesPage
