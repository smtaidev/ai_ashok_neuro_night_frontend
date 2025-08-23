// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { MoreHorizontal, Plus, X } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import * as Radix from "@radix-ui/react-slot"
// import { useRouter } from "next/navigation"
// import { BsInboxes } from "react-icons/bs"

// type Team = {
//   id: string;
//   teamName: string;
//   headcount: string;
//   teamAllocation: string;
//   teamAvailability: string;
//   talentNeed: string;
//   skillNeed: string[];
//   members: string[];
// };

// const TeamComponentPage = () => {
//   const [teams, setTeams] = useState<Team[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTeam, setEditingTeam] = useState<Team | null>(null);
//   const router = useRouter();

//   const [formData, setFormData] = useState<Omit<Team, 'id'> & { id: string }>({
//     id: '',
//     teamName: '',
//     headcount: '',
//     teamAllocation: '',
//     teamAvailability: '',
//     talentNeed: '',
//     skillNeed: [],
//     members: [],
//   });

//   const [skillInput, setSkillInput] = useState("");
//   const [memberInput, setMemberInput] = useState("");

//   // ✅ Load teams from localStorage on mount
//   useEffect(() => {
//     const savedTeams = localStorage.getItem("teamsData");
//     if (savedTeams) {
//       setTeams(JSON.parse(savedTeams));
//     }
//   }, []);

//   // ✅ Save to localStorage whenever `teams` changes
//   useEffect(() => {
//     localStorage.setItem("teamsData", JSON.stringify(teams));
//   }, [teams]);

//   const handleAddNew = () => {
//     setEditingTeam(null);
//     setFormData({
//       id: '',
//       teamName: '',
//       headcount: '',
//       teamAllocation: '',
//       teamAvailability: '',
//       talentNeed: '',
//       skillNeed: [],
//       members: [],
//     });
//     setSkillInput("");
//     setMemberInput("");
//     setIsModalOpen(true);
//   };

//   const handleEdit = (team: Team) => {
//     setEditingTeam(team);
//     setFormData(team);
//     setSkillInput("");
//     setMemberInput("");
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id: string) => {
//     setTeams(teams.filter((team) => team.id !== id));
//   };

//   const handleSave = () => {
//     if (!formData.teamName.trim()) return;

//     if (editingTeam) {
//       setTeams(
//         teams.map((team) =>
//           team.id === editingTeam.id ? formData : team
//         )
//       );
//     } else {
//       setTeams([
//         ...teams,
//         {
//           ...formData,
//           id: Date.now().toString(),
//         },
//       ]);
//     }

//     setIsModalOpen(false);
//   };

//   const handleModalDelete = () => {
//     if (editingTeam) {
//       handleDelete(editingTeam.id);
//       setIsModalOpen(false);
//     }
//   };

//   const addSkill = () => {
//     if (skillInput.trim()) {
//       setFormData({
//         ...formData,
//         skillNeed: [...formData.skillNeed, skillInput.trim()]
//       });
//       setSkillInput("");
//     }
//   };

//   const removeSkill = (index: number) => {
//     setFormData({
//       ...formData,
//       skillNeed: formData.skillNeed.filter((_, i) => i !== index)
//     });
//   };

//   const addMember = () => {
//     if (memberInput.trim()) {
//       setFormData({
//         ...formData,
//         members: [...formData.members, memberInput.trim()]
//       });
//       setMemberInput("");
//     }
//   };

//   const removeMember = (index: number) => {
//     setFormData({
//       ...formData,
//       members: formData.members.filter((_, i) => i !== index)
//     });
//   };

//   const getCardColor = (index: number) => {
//     return index % 2 === 0 ? "bg-[#7DD3FC]" : "bg-[#1B2E83]";
//   };

//   const getTextColor = (index: number) => {
//     return index % 2 === 0 ? "text-gray-800" : "text-white";
//   };

//   const handleView = (teamName: string) => {
//     router.push(`/dashboard/choreography/teams/${teamName}`);
//   };

//   return (
//     <div className="bg-[#F5F7FA] min-h-screen px-6 py-8">
//       {/* Breadcrumb */}
//       <div className="flex items-center justify-end gap-2 mb-4 text-sm text-gray-600">
//         <span>Foundation</span>
//         <span>{">"}</span>
//         <span className="text-gray-900">Team</span>
//       </div>

//       {/* Header */}
//       <div className="flex items-center justify-start mb-6">
//         <h2 className="text-2xl font-semibold text-gray-900">Team&apos;s Dashboard</h2>
//       </div>

//       {/* Dashboard Metrics */}
//       <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
//         <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
//           <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Total Headcounts</h1>
//           <p className="lg:text-lg md:text-sm text-xs font-light">
//             {teams.reduce((sum, team) => sum + parseInt(team.headcount || '0'), 0)}
//           </p>
//         </div>
//         <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
//           <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Total Teams</h1>
//           <p className="lg:text-lg md:text-sm text-xs font-light">{teams.length}</p>
//         </div>
//         <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
//           <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Allocations</h1>
//           <p className="lg:text-lg md:text-sm text-xs font-light">
//             {teams.length > 0
//               ? (teams.reduce((sum, team) => sum + parseFloat(team.teamAllocation || '0'), 0) / teams.length + '%')
//               : '0.00%'}
//           </p>
//         </div>
//         <div className="md:w-[50%] w-[100%] h-24 md:grow bg-[#7DD3FC] rounded-lg p-2">
//           <h1 className="lg:text-lg md:text-sm text-xs font-semibold">The following skills are lacking</h1>
//           <p className="lg:text-lg md:text-sm text-xs font-light">
//             {teams.length > 0
//               ? Array.from(new Set(teams.flatMap(team => team.skillNeed))).join(', ') || 'None'
//               : 'No skills data'}
//           </p>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row items-center justify-start mb-4 gap-4">
//         <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
//           <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Availability</h1>
//           <p className="lg:text-lg md:text-sm text-xs font-light">
//             {teams.reduce((sum, team) => sum + parseInt(team.teamAvailability || '0'), 0)}
//           </p>
//         </div>
//         <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
//           <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Talent Need</h1>
//           <p className="lg:text-lg md:text-sm text-xs font-light">
//             {teams.reduce((sum, team) => sum + parseInt(team.talentNeed || '0'), 0)}
//           </p>
//         </div>
//       </div>

//       {/* Team List */}
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-2xl font-semibold text-gray-900">Team List</h3>
//         <Button onClick={handleAddNew}>
//           <Plus className="h-4 w-4 mr-2" />
//           Create Team
//         </Button>
//       </div>

//       {teams.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-16 text-center">
//           <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
//             <BsInboxes className="h-8 w-8 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h3>
//           <p className="text-gray-500 mb-4">Get started by adding your first Team.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {teams.map((team, index) => (
//             <Card
//               key={team.id}
//               className={`${getCardColor(index)} ${getTextColor(index)} relative border-0`}
//             >
//               <CardContent className="p-4 text-sm font-medium">
//                 <div className="pr-8">
//                   <h4 className="font-bold mb-2">Team Name: {team.teamName}</h4>
//                   <div className="text-xs mb-1">Headcount: {team.headcount}</div>
//                   <div className="text-xs mb-1">Allocation: {team.teamAllocation} %</div>
//                   <div className="text-xs mb-1">Availability: {team.teamAvailability} %</div>
//                   <div className="text-xs mb-1">Talent Need: {team.talentNeed}</div>
//                 </div>
//                 <div className="absolute top-2 right-2 flex items-center gap-1">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className={`h-6 w-6 ${getTextColor(index)} hover:bg-white/10`}
//                       >
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="bg-white text-black">
//                       <DropdownMenuItem onClick={() => handleEdit(team)}>
//                         Edit
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         onClick={() => handleDelete(team.id)}
//                         className="text-red-600"
//                       >
//                         Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-end items-center">
//                 <Button variant="ghost" onClick={() => handleView(team.teamName)}>
//                   View Details
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="sm:max-w-[600px]">
//           <DialogHeader className="bg-[#1B2E83] text-white p-4 -m-6 mb-4 rounded-t-lg">
//             <DialogTitle className="text-lg font-medium">
//               {editingTeam ? "Edit Team" : "Create Team"}
//             </DialogTitle>
//           </DialogHeader>

//           {/* Form Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="teamName">Team Name*</Label>
//               <Input
//                 id="teamName"
//                 value={formData.teamName}
//                 onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
//                 placeholder="Marketing Team"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="headcount">Headcount</Label>
//               <Input
//                 id="headcount"
//                 type="text"
//                 value={formData.headcount}
//                 onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
//                 placeholder="10"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="teamAllocation">Allocation (%)</Label>
//               <Input
//                 id="teamAllocation"
//                 type="text"
//                 value={formData.teamAllocation}
//                 onChange={(e) => setFormData({ ...formData, teamAllocation: e.target.value })}
//                 placeholder="100"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="teamAvailability">Availability (%)</Label>
//               <Input
//                 id="teamAvailability"
//                 type="text"
//                 value={formData.teamAvailability}
//                 onChange={(e) => setFormData({ ...formData, teamAvailability: e.target.value })}
//                 placeholder="80"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="talentNeed">Talent Need</Label>
//               <Input
//                 id="talentNeed"
//                 value={formData.talentNeed}
//                 onChange={(e) => setFormData({ ...formData, talentNeed: e.target.value })}
//                 placeholder="3 new developers"
//               />
//             </div>
//           </div>

//           {/* Skills Input */}
//           <div className="space-y-2">
//             <Label>Required Skills</Label>
//             <div className="flex flex-wrap gap-2 p-2 border rounded-md">
//               {formData.skillNeed.map((skill, index) => (
//                 <div
//                   key={index}
//                   className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs flex items-center"
//                 >
//                   {skill}
//                   <button
//                     type="button"
//                     onClick={() => removeSkill(index)}
//                     className="ml-2 hover:text-red-600"
//                   >
//                     <X className="h-3 w-3" />
//                   </button>
//                 </div>
//               ))}
//               <div className="flex items-center gap-2 flex-1 min-w-[100px]">
//                 <Input
//                   value={skillInput}
//                   onChange={(e) => setSkillInput(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') {
//                       e.preventDefault();
//                       addSkill();
//                     }
//                   }}
//                   placeholder="Add skill and press Enter"
//                   className="border-0 shadow-none focus-visible:ring-0"
//                 />
//                 <Radix.Slot>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     onClick={addSkill}
//                     className="h-8 px-3"
//                   >
//                     Add
//                   </Button>
//                 </Radix.Slot>
//               </div>
//             </div>
//             <p className="text-xs text-muted-foreground">
//               {formData.skillNeed.length} skill(s) entered
//             </p>
//           </div>

//           {/* Members Input */}
//           <div className="space-y-2">
//             <Label>Team Members</Label>
//             <div className="flex flex-wrap gap-2 p-2 border rounded-md">
//               {formData.members.map((member, index) => (
//                 <div
//                   key={index}
//                   className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs flex items-center"
//                 >
//                   {member}
//                   <button
//                     type="button"
//                     onClick={() => removeMember(index)}
//                     className="ml-2 hover:text-red-600"
//                   >
//                     <X className="h-3 w-3" />
//                   </button>
//                 </div>
//               ))}
//               <div className="flex items-center gap-2 flex-1 min-w-[100px]">
//                 <Input
//                   value={memberInput}
//                   onChange={(e) => setMemberInput(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') {
//                       e.preventDefault();
//                       addMember();
//                     }
//                   }}
//                   placeholder="Add member and press Enter"
//                   className="border-0 shadow-none focus-visible:ring-0"
//                 />
//                 <Radix.Slot>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     onClick={addMember}
//                     className="h-8 px-3"
//                   >
//                     Add
//                   </Button>
//                 </Radix.Slot>
//               </div>
//             </div>
//             <p className="text-xs text-muted-foreground">
//               {formData.members.length} member(s) entered
//             </p>
//           </div>

//           {/* Actions */}
//           <div className="flex justify-between pt-4">
//             {editingTeam ? (
//               <Button
//                 variant="outline"
//                 onClick={handleModalDelete}
//                 className="text-red-600 border-red-600 hover:bg-red-50"
//               >
//                 Delete Team
//               </Button>
//             ) : (
//               <div />
//             )}
//             <Button
//               onClick={handleSave}
//               disabled={!formData.teamName.trim()}
//               className="bg-[#1B2E83] hover:bg-[#1B2E83]/90"
//             >
//               {editingTeam ? "Update Team" : "Create Team"}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default TeamComponentPage;

//! Try - 1

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { MoreHorizontal, Plus, X } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import * as Radix from "@radix-ui/react-slot"
// import { useRouter } from "next/navigation"
// import { BsInboxes } from "react-icons/bs"

// type Team = {
//   id: string;
//   teamName: string;
//   headcount: string;
//   teamAllocation: string;
//   teamAvailability: string;
//   talentNeed: string;
//   skillNeed: string[];
//   members: string[];
// };

// const TeamComponentPage = () => {
//   const [teams, setTeams] = useState<Team[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTeam, setEditingTeam] = useState<Team | null>(null);
//   const router = useRouter();

//   const [formData, setFormData] = useState<Omit<Team, 'id'> & { id: string }>({
//     id: '',
//     teamName: '',
//     headcount: '',
//     teamAllocation: '',
//     teamAvailability: '',
//     talentNeed: '',
//     skillNeed: [],
//     members: [],
//   });

//   const [skillInput, setSkillInput] = useState("");
//   const [memberInput, setMemberInput] = useState("");

//   // ✅ Load teams from localStorage on mount
//   useEffect(() => {
//     const savedTeams = localStorage.getItem("teamsData");
//     if (savedTeams) {
//       setTeams(JSON.parse(savedTeams));
//     }
//   }, []);

//   // ✅ Save to localStorage whenever `teams` changes
//   useEffect(() => {
//     localStorage.setItem("teamsData", JSON.stringify(teams));
//   }, [teams]);

//   const handleAddNew = () => {
//     setEditingTeam(null);
//     setFormData({
//       id: '',
//       teamName: '',
//       headcount: '',
//       teamAllocation: '',
//       teamAvailability: '',
//       talentNeed: '',
//       skillNeed: [],
//       members: [],
//     });
//     setSkillInput("");
//     setMemberInput("");
//     setIsModalOpen(true);
//   };

//   const handleEdit = (team: Team) => {
//     setEditingTeam(team);
//     setFormData(team);
//     setSkillInput("");
//     setMemberInput("");
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id: string) => {
//     setTeams(teams.filter((team) => team.id !== id));
//   };

//   const handleSave = () => {
//     if (!formData.teamName.trim()) return;

//     if (editingTeam) {
//       setTeams(
//         teams.map((team) =>
//           team.id === editingTeam.id ? formData : team
//         )
//       );
//     } else {
//       setTeams([
//         ...teams,
//         {
//           ...formData,
//           id: Date.now().toString(),
//         },
//       ]);
//     }

//     setIsModalOpen(false);
//   };

//   const handleModalDelete = () => {
//     if (editingTeam) {
//       handleDelete(editingTeam.id);
//       setIsModalOpen(false);
//     }
//   };

//   const addSkill = () => {
//     if (skillInput.trim()) {
//       setFormData({
//         ...formData,
//         skillNeed: [...formData.skillNeed, skillInput.trim()]
//       });
//       setSkillInput("");
//     }
//   };

//   const removeSkill = (index: number) => {
//     setFormData({
//       ...formData,
//       skillNeed: formData.skillNeed.filter((_, i) => i !== index)
//     });
//   };

//   const addMember = () => {
//     if (memberInput.trim()) {
//       setFormData({
//         ...formData,
//         members: [...formData.members, memberInput.trim()]
//       });
//       setMemberInput("");
//     }
//   };

//   const removeMember = (index: number) => {
//     setFormData({
//       ...formData,
//       members: formData.members.filter((_, i) => i !== index)
//     });
//   };

//   const getCardColor = (index: number) => {
//     return index % 2 === 0 ? "bg-[#7DD3FC]" : "bg-[#1B2E83]";
//   };

//   const getTextColor = (index: number) => {
//     return index % 2 === 0 ? "text-gray-800" : "text-white";
//   };

//   const handleView = (teamName: string) => {
//     router.push(`/dashboard/choreography/teams/${teamName}`);
//   };

//   return (
//     <div className="bg-[#F5F7FA] min-h-screen px-6 py-8">
//       {/* Breadcrumb */}
//       <div className="flex items-center justify-end gap-2 mb-4 text-sm text-gray-600">
//         <span>Foundation</span>
//         <span>{">"}</span>
//         <span className="text-gray-900">Team</span>
//       </div>

//       {/* Header */}
//       <div className="flex items-center justify-start mb-6">
//         <h2 className="text-2xl font-semibold text-gray-900">Team&apos;s Dashboard</h2>
//       </div>

//       {/* Dashboard Metrics */}
//       <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
//         <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
//           <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Total Headcounts</h1>
//           <p className="lg:text-lg md:text-sm text-xs font-light">
//             {teams.reduce((sum, team) => sum + parseInt(team.headcount || '0'), 0)}
//           </p>
//         </div>
//         <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
//           <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Total Teams</h1>
//           <p className="lg:text-lg md:text-sm text-xs font-light">{teams.length}</p>
//         </div>
//         <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
//           <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Allocations</h1>
//           <p className="lg:text-lg md:text-sm text-xs font-light">
//             {teams.length > 0
//               ? (teams.reduce((sum, team) => sum + parseFloat(team.teamAllocation || '0'), 0) / teams.length + '%')
//               : '0.00%'}
//           </p>
//         </div>
//         <div className="md:w-[50%] w-[100%] h-24 md:grow bg-[#7DD3FC] rounded-lg p-2">
//           <h1 className="lg:text-lg md:text-sm text-xs font-semibold">The following skills are lacking</h1>
//           <p className="lg:text-lg md:text-sm text-xs font-light">
//             {teams.length > 0
//               ? Array.from(new Set(teams.flatMap(team => team.skillNeed))).join(', ') || 'None'
//               : 'No skills data'}
//           </p>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row items-center justify-start mb-4 gap-4">
//         <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
//           <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Availability</h1>
//           <p className="lg:text-lg md:text-sm text-xs font-light">
//             {teams.reduce((sum, team) => sum + parseInt(team.teamAvailability || '0'), 0)}
//           </p>
//         </div>
//         <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
//           <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Talent Need</h1>
//           <p className="lg:text-lg md:text-sm text-xs font-light">
//             {teams.reduce((sum, team) => sum + parseInt(team.talentNeed || '0'), 0)}
//           </p>
//         </div>
//       </div>

//       {/* Team List */}
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-2xl font-semibold text-gray-900">Team List</h3>
//         <Button onClick={handleAddNew}>
//           <Plus className="h-4 w-4 mr-2" />
//           Create Team
//         </Button>
//       </div>

//       {teams.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-16 text-center">
//           <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
//             <BsInboxes className="h-8 w-8 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h3>
//           <p className="text-gray-500 mb-4">Get started by adding your first Team.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {teams.map((team, index) => (
//             <Card
//               key={team.id}
//               className={`${getCardColor(index)} ${getTextColor(index)} relative border-0`}
//             >
//               <CardContent className="p-4 text-sm font-medium">
//                 <div className="pr-8">
//                   <h4 className="font-bold mb-2">Team Name: {team.teamName}</h4>
//                   <div className="text-xs mb-1">Headcount: {team.headcount}</div>
//                   <div className="text-xs mb-1">Allocation: {team.teamAllocation} %</div>
//                   <div className="text-xs mb-1">Availability: {team.teamAvailability} %</div>
//                   <div className="text-xs mb-1">Talent Need: {team.talentNeed}</div>
//                 </div>
//                 <div className="absolute top-2 right-2 flex items-center gap-1">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className={`h-6 w-6 ${getTextColor(index)} hover:bg-white/10`}
//                       >
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="bg-white text-black">
//                       <DropdownMenuItem onClick={() => handleEdit(team)}>
//                         Edit
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         onClick={() => handleDelete(team.id)}
//                         className="text-red-600"
//                       >
//                         Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-end items-center">
//                 <Button variant="ghost" onClick={() => handleView(team.teamName)}>
//                   View Details
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="sm:max-w-[800px]">
//           <DialogHeader className="bg-[#1B2E83] text-white p-4 -m-6 mb-4 rounded-t-lg">
//             <DialogTitle className="text-lg font-medium">
//               {editingTeam ? "Edit Team" : "Create Team"}
//             </DialogTitle>
//           </DialogHeader>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Left Section */}
//             <div className="space-y-4">
//               {/* Team Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="teamName">Team Name*</Label>
//                 <Input
//                   id="teamName"
//                   value={formData.teamName}
//                   onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
//                   placeholder="Enter team name..."
//                 />
//               </div>

//               {/* Description */}
//               <div className="space-y-2">
//                 <Label htmlFor="description">Description*</Label>
//                 <textarea
//                   id="description"
//                   value={(formData as any).description || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value } as any)
//                   }
//                   placeholder="Add details..."
//                   className="w-full border rounded-md p-2 h-32 resize-none"
//                 />
//               </div>
//             </div>

//             {/* Right Section */}
//             <div className="space-y-4">
//               <Label>Add Team Members</Label>
//               <div className="flex gap-2">
//                 <select
//                   value={memberInput}
//                   onChange={(e) => setMemberInput(e.target.value)}
//                   className="flex-1 border rounded-md p-2"
//                 >
//                   <option value="">Select a member...</option>
//                   <option value="Brooklyn Simmons">Brooklyn Simmons</option>
//                   <option value="Courtney Henry">Courtney Henry</option>
//                   <option value="Cody Fisher">Cody Fisher</option>
//                 </select>
//                 <Button type="button" onClick={addMember}>
//                   Add
//                 </Button>
//               </div>

//               {/* Members List */}
//               <div className="flex flex-wrap gap-2">
//                 {formData.members.map((member, index) => (
//                   <div
//                     key={index}
//                     className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
//                   >
//                     {member}
//                     <button
//                       type="button"
//                       onClick={() => removeMember(index)}
//                       className="hover:text-red-600"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end gap-4 pt-6">
//             {editingTeam && (
//               <Button
//                 variant="outline"
//                 onClick={handleModalDelete}
//                 className="text-red-600 border-red-600 hover:bg-red-50"
//               >
//                 Delete Team
//               </Button>
//             )}
//             <Button
//               onClick={handleSave}
//               disabled={!formData.teamName.trim()}
//               className="bg-[#1B2E83] hover:bg-[#1B2E83]/90"
//             >
//               {editingTeam ? "Update Team" : "Create Team"}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//     </div>
//   );
// };

// export default TeamComponentPage;

//! Try - 2

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Plus, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { BsInboxes } from "react-icons/bs"

type Team = {
  id: string;
  teamName: string;
  description: string;
  members: string[];
};

const TeamComponentPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState<Omit<Team, 'id'> & { id: string }>({
    id: '',
    teamName: '',
    description: '',
    members: [],
  });

  const [memberInput, setMemberInput] = useState("");

  //! Load teams from localStorage on mount
  useEffect(() => {
    const savedTeams = localStorage.getItem("teamsData");
    if (savedTeams) {
      setTeams(JSON.parse(savedTeams));
    }
  }, []);

  //! Save to localStorage whenever `teams` changes
  useEffect(() => {
    localStorage.setItem("teamsData", JSON.stringify(teams));
  }, [teams]);

  const handleAddNew = () => {
    setEditingTeam(null);
    setFormData({
      id: '',
      teamName: '',
      description: '',
      members: [],
    });
    setMemberInput("");
    setIsModalOpen(true);
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setFormData(team);
    setMemberInput("");
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTeams(teams.filter((team) => team.id !== id));
  };

  const handleSave = () => {
    if (!formData.teamName.trim()) return;

    if (editingTeam) {
      setTeams(
        teams.map((team) =>
          team.id === editingTeam.id ? formData : team
        )
      );
    } else {
      setTeams([
        ...teams,
        {
          ...formData,
          id: Date.now().toString(),
        },
      ]);
    }

    setIsModalOpen(false);
  };

  const handleModalDelete = () => {
    if (editingTeam) {
      handleDelete(editingTeam.id);
      setIsModalOpen(false);
    }
  };

  const addMember = () => {
    if (memberInput.trim()) {
      setFormData({
        ...formData,
        members: [...formData.members, memberInput.trim()]
      });
      setMemberInput("");
    }
  };

  const removeMember = (index: number) => {
    setFormData({
      ...formData,
      members: formData.members.filter((_, i) => i !== index)
    });
  };

  const getCardColor = (index: number) => {
    return index % 2 === 0 ? "bg-[#7DD3FC]" : "bg-[#1B2E83]";
  };

  const getTextColor = (index: number) => {
    return index % 2 === 0 ? "text-gray-800" : "text-white";
  };

  const handleView = (id: string) => {
    router.push(`/dashboard/choreography/teams/${id}`);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center justify-end gap-2 mb-4 text-sm text-gray-600">
        <span>Foundation</span>
        <span>{">"}</span>
        <span className="text-gray-900">Team</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-start mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Team&apos;s Dashboard</h2>
      </div>

      {/* Dashboard Metrics */}
      {/* <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <div className="md:w-[25%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Total Teams</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">{teams.length}</p>
        </div>
        <div className="md:w-[75%] w-[100%] h-24 md:grow bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Team Descriptions</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {teams.length > 0
              ? teams.map(team => `${team.teamName}: ${team.description}`).join(" | ")
              : "No team descriptions"}
          </p>
        </div>
      </div> */}
      {/* ! Dashboard Metrics */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Total Headcounts</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {/* ! {teams.reduce((sum, team) => sum + parseInt(team.headcount || '0'), 0)} */}
            50
          </p>
        </div>
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Total Teams</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">{teams.length}</p>
        </div>
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Allocations</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {/* ! {teams.length > 0
              ? (teams.reduce((sum, team) => sum + parseFloat(team.teamAllocation || '0'), 0) / teams.length + '%')
              : '0.00%'} */}
            25 %
          </p>
        </div>
        <div className="md:w-[50%] w-[100%] h-24 md:grow bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">The following skills are lacking</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {/* {teams.length > 0
              ? Array.from(new Set(teams.flatMap(team => team.skillNeed))).join(', ') || 'None'
              : 'No skills data'} */}
            Lead for Marketing
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-start mb-4 gap-4">
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Availability</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {/* ! {teams.reduce((sum, team) => sum + parseInt(team.teamAvailability || '0'), 0)} */}
            10 %
          </p>
        </div>
        <div className="md:w-[16.67%] w-[100%] h-24 flex-none bg-[#7DD3FC] rounded-lg p-2">
          <h1 className="lg:text-lg md:text-sm text-xs font-semibold">Talent Need</h1>
          <p className="lg:text-lg md:text-sm text-xs font-light">
            {/* ! {teams.reduce((sum, team) => sum + parseInt(team.talentNeed || '0'), 0)} */}
            Sales
          </p>
        </div>
      </div>

      {/* Team List */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-gray-900">Team List</h3>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Create Team
        </Button>
      </div>

      {teams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <BsInboxes className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first Team.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teams.map((team, index) => (
            <Card
              key={team.id}
              className={`${getCardColor(index)} ${getTextColor(index)} relative border-0`}
            >
              <CardContent className="p-4 text-sm font-medium">
                <div className="pr-8">
                  <h4 className="mb-2 text-lg text-[#231F20]"><span className="font-bold">Team Name:</span> {team.teamName}</h4>
                  <div className="text-base mb-1 text-[#231F20]"> <span className="font-bold">Description:</span> {team.description}</div>
                  <div className="text-base mb-1"><span className="font-bold">Members:</span> {team.members.length}</div>
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-6 w-6 ${getTextColor(index)} hover:bg-white/10`}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white text-black">
                      <DropdownMenuItem onClick={() => handleEdit(team)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(team.id)}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end items-center">
                <Button variant="ghost" onClick={() => handleView(team.id)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader className="bg-[#1B2E83] text-white p-4 -m-6 mb-4 rounded-t-lg">
            <DialogTitle className="text-lg font-medium">
              {editingTeam ? "Edit Team" : "Create Team"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Section */}
            <div className="space-y-4">
              {/* Team Name */}
              <div className="space-y-2">
                <Label htmlFor="teamName" className="text-lg">Team Name*</Label>
                <Input
                  id="teamName"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  placeholder="Enter team name..."
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-lg">Description*</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Add details..."
                  className="w-full border rounded-md p-2 h-32 resize-none"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              <Label className="text-lg">Add Team Members</Label>
              <div className="flex gap-2">
                <select
                  value={memberInput}
                  onChange={(e) => setMemberInput(e.target.value)}
                  className="flex-1 border rounded-md p-2"
                >
                  <option value="">Select a member...</option>
                  <option value="Brooklyn Simmons">Brooklyn Simmons</option>
                  <option value="Courtney Henry">Courtney Henry</option>
                  <option value="Cody Fisher">Cody Fisher</option>
                </select>
                <Button type="button" onClick={addMember}>
                  Add
                </Button>
              </div>

              {/* Members List */}
              <div className="flex flex-wrap gap-2">
                {formData.members.map((member, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {member}
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6">
            {editingTeam && (
              <Button
                variant="outline"
                onClick={handleModalDelete}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Delete Team
              </Button>
            )}
            <Button
              onClick={handleSave}
              disabled={!formData.teamName.trim()}
              className="bg-[#1B2E83] hover:bg-[#1B2E83]/90"
            >
              {editingTeam ? "Update Team" : "Create Team"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamComponentPage;

