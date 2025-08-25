// "use client";

// import { useGetSingleTeamByTeamNameQuery } from "@/redux/api/choreograph/choreographApi";


// interface TeamMemberPageProps {
//   teamName: string;
// }

// const TeamMemberPage = ({ teamName }: TeamMemberPageProps) => {
//   const { data, error, isLoading } = useGetSingleTeamByTeamNameQuery(teamName);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Something went wrong!</p>;

//   console.log('Data: ', data);

//   return (
//     <div>
//       <h1>This is team member page</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default TeamMemberPage;

//! Try - 1

// "use client";

// import { useGetSingleTeamByTeamNameQuery } from "@/redux/api/choreograph/choreographApi";
// import { useDeleteTeamMemberMutation } from "@/redux/api/choreograph/teamMemberApi";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Eye, Edit, Trash, Plus } from "lucide-react";

// interface TeamMemberPageProps {
//   teamName: string;
// }

// const TeamMemberPage = ({ teamName }: TeamMemberPageProps) => {
//   const { data, error, isLoading, refetch } =
//     useGetSingleTeamByTeamNameQuery(teamName);

//   const [deleteMember] = useDeleteTeamMemberMutation();

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Something went wrong!</p>;

//   const team = data?.data;
//   const members = team?.members || [];

//   const handleDelete = async (memberId: string) => {
//     if (!team) {
//       console.error("Team is undefined");
//       return;
//     }

//     try {
//       await deleteMember({
//         choreographId: team._id,
//         memberId,
//       }).unwrap();
//       refetch();
//     } catch (err) {
//       console.error("Failed to delete member", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold text-white">
//           Team Members of {team?.teamName}
//         </h1>
//         <Button
//           className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
//           onClick={() => console.log("Open Add Team Member Modal")}
//         >
//           <Plus className="w-4 h-4" /> Add Team Member
//         </Button>
//       </div>

//       {/* Table */}
//       {members.length === 0 ? (
//         <p className="text-gray-400 text-center">No members found in this team.</p>
//       ) : (
//         <Card className="w-full overflow-x-auto bg-[#000000] rounded-2xl border border-gray-800">
//           <CardContent className="p-0">
//             <table className="min-w-full text-sm text-left">
//               <thead className="text-xs text-gray-300 uppercase border-b border-gray-800">
//                 <tr>
//                   <th className="px-6 py-4">User Name</th>
//                   <th className="px-6 py-4">Email</th>
//                   <th className="px-6 py-4">Company Name</th>
//                   <th className="px-6 py-4">Company Role</th>
//                   <th className="px-6 py-4">Location</th>
//                   <th className="px-6 py-4">Team Role</th>
//                   <th className="px-6 py-4">Skills</th>
//                   <th className="px-6 py-4">Status</th>
//                   <th className="px-6 py-4 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {members.map((member: any) => (
//                   <tr
//                     key={member._id}
//                     className="border-b border-gray-800 hover:bg-gray-900 transition"
//                   >
//                     <td className="px-6 py-4 text-white">{member.userName}</td>
//                     <td className="px-6 py-4 text-gray-300">{member.email}</td>
//                     <td className="px-6 py-4 text-gray-300">{member.companyName}</td>
//                     <td className="px-6 py-4 text-gray-300">{member.companyRole}</td>
//                     <td className="px-6 py-4 text-gray-300">
//                       {member.location || "--"}
//                     </td>
//                     <td className="px-6 py-4 text-gray-300">
//                       {member.teamRole || "--"}
//                     </td>
//                     <td className="px-6 py-4 text-gray-300">
//                       {member.skills?.length > 0
//                         ? member.skills.join(", ")
//                         : "--"}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${member.isDeleted
//                           ? "bg-red-900 text-red-400"
//                           : "bg-green-900 text-green-400"
//                           }`}
//                       >
//                         {member.isDeleted ? "Inactive" : "Active"}
//                       </span>
//                     </td>
//                     {/* Actions */}
//                     <td className="px-6 py-4 text-right flex justify-end gap-2">
//                       <Button
//                         size="sm"
//                         variant="secondary"
//                         className="bg-gray-700 hover:bg-gray-600"
//                         onClick={() => console.log("View Member", member)}
//                       >
//                         <Eye className="w-4 h-4" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         className="bg-blue-600 hover:bg-blue-700 text-white"
//                         onClick={() => console.log("Edit Member", member)}
//                       >
//                         <Edit className="w-4 h-4" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         className="bg-red-600 hover:bg-red-700 text-white"
//                         onClick={() => handleDelete(member._id)}
//                       >
//                         <Trash className="w-4 h-4" />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default TeamMemberPage;
