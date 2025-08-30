// "use client";
// import React, { useState } from 'react';
// import welcomImage from "@/public/image/user-main.png"
// import Image from 'next/image';
// import { User, Search, MoreVertical, Edit, Trash2, X, ChevronDown } from 'lucide-react';
// import Button from '@/components/reusable-button/Button';

// interface UserAddModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (userData: any) => void;
// }

// type Permission = 'view' | 'edit' | 'hidden';

// const UserAddModal: React.FC<UserAddModalProps> = ({ isOpen, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     businessFunction: '',
//     notes: '',
//     companyRole: '',
//     collaboratesWithFinance: false,
//     permissions: {
//       foundations: 'view' as Permission,
//       trends: 'view' as Permission,
//       swot: 'view' as Permission,
//       challenges: 'view' as Permission,
//       competitorsAnalysis: 'view' as Permission,
//       clarhetAIRec: 'view' as Permission,
//       alignment: 'view' as Permission,
//       vision: 'view' as Permission,
//       themes: 'view' as Permission,
//       blueprintAlignment: 'view' as Permission,
//       businessGoal: 'view' as Permission,
//       choreographObjectives: 'view' as Permission,
//       teams: 'view' as Permission,
//       generateReport: 'view' as Permission,
//       reportArchives: 'view' as Permission,
//       agendaBuilder: 'view' as Permission,
//       archives: 'view' as Permission
//     }
//   });

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handlePermissionChange = (permission: string, value: Permission) => {
//     setFormData(prev => ({
//       ...prev,
//       permissions: {
//         ...prev.permissions,
//         [permission]: value
//       }
//     }));
//   };

//   const handleSave = () => {
//     onSave(formData);
//     onClose();
//   };

//   const PermissionDropdown = ({ value, onChange, label }: { value: Permission; onChange: (val: Permission) => void; label: string }) => {
//     const [isOpen, setIsOpen] = useState(false);
    
//     return (
//       <div className="relative">
//         <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
//         <button
//           type="button"
//           onClick={() => setIsOpen(!isOpen)}
//           className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         >
//           <span className="capitalize">{value}</span>
//           <ChevronDown className="w-4 h-4 text-gray-400" />
//         </button>
        
//         {isOpen && (
//           <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-20">
//             {(['view', 'edit', 'hidden'] as Permission[]).map((option) => (
//               <button
//                 key={option}
//                 type="button"
//                 className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 capitalize"
//                 onClick={() => {
//                   onChange(option);
//                   setIsOpen(false);
//                 }}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
//           <h2 className="text-lg font-semibold">User Add</h2>
//           <button
//             onClick={onClose}
//             className="text-white hover:text-gray-200 transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Left Column */}
//             <div className="space-y-4">
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => handleInputChange('name', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="James P"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange('email', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="James.p.@gmail.com"
//                 />
//               </div>

//               {/* User Primary Business Function */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">User Primary Business Function</label>
//                 <input
//                   type="text"
//                   value={formData.businessFunction}
//                   onChange={(e) => handleInputChange('businessFunction', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Executive Leadership team"
//                 />
//               </div>

//               {/* Notes */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
//                 <textarea
//                   value={formData.notes}
//                   onChange={(e) => handleInputChange('notes', e.target.value)}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                   placeholder="CEO since 2023"
//                 />
//               </div>

//               {/* Collaborates with function(s) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Collaborates with function(s):</label>
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={formData.collaboratesWithFinance}
//                     onChange={(e) => handleInputChange('collaboratesWithFinance', e.target.checked)}
//                     className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <span className="text-sm text-gray-700">Finance</span>
//                 </label>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-4">
//               {/* Company Role */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Company Role</label>
//                 <select
//                   value={formData.companyRole}
//                   onChange={(e) => handleInputChange('companyRole', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Select Role</option>
//                   <option value="CEO">CEO</option>
//                   <option value="Manager">Manager</option>
//                   <option value="Administrator">Administrator</option>
//                   <option value="Team Leader">Team Leader</option>
//                 </select>
//               </div>

//               {/* Manage Permissions */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-3">Manage Permissions:</label>
                
//                 {/* Foundations */}
//                 <div className="mb-3">
//                   <PermissionDropdown
//                     value={formData.permissions.foundations}
//                     onChange={(val) => handlePermissionChange('foundations', val)}
//                     label="Foundations"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Assess Section */}
//           <div className="mt-6">
//             <h3 className="text-sm font-semibold text-gray-800 mb-4">Assess</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               <PermissionDropdown
//                 value={formData.permissions.trends}
//                 onChange={(val) => handlePermissionChange('trends', val)}
//                 label="Trends"
//               />
//               <PermissionDropdown
//                 value={formData.permissions.swot}
//                 onChange={(val) => handlePermissionChange('swot', val)}
//                 label="SWOT"
//               />
//               <PermissionDropdown
//                 value={formData.permissions.challenges}
//                 onChange={(val) => handlePermissionChange('challenges', val)}
//                 label="Challenges"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <PermissionDropdown
//                 value={formData.permissions.competitorsAnalysis}
//                 onChange={(val) => handlePermissionChange('competitorsAnalysis', val)}
//                 label="Competitors Analysis"
//               />
//               <PermissionDropdown
//                 value={formData.permissions.alignment}
//                 onChange={(val) => handlePermissionChange('alignment', val)}
//                 label="Alignment"
//               />
//             </div>
//           </div>

//           {/* Blueprint Section */}
//           <div className="mt-6">
//             <h3 className="text-sm font-semibold text-gray-800 mb-4">Blueprint</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               <PermissionDropdown
//                 value={formData.permissions.vision}
//                 onChange={(val) => handlePermissionChange('vision', val)}
//                 label="Vision"
//               />
//               <PermissionDropdown
//                 value={formData.permissions.themes}
//                 onChange={(val) => handlePermissionChange('themes', val)}
//                 label="Themes"
//               />
//               <PermissionDropdown
//                 value={formData.permissions.blueprintAlignment}
//                 onChange={(val) => handlePermissionChange('blueprintAlignment', val)}
//                 label="Alignment"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               <PermissionDropdown
//                 value={formData.permissions.businessGoal}
//                 onChange={(val) => handlePermissionChange('businessGoal', val)}
//                 label="Business Goal"
//               />
//               <PermissionDropdown
//                 value={formData.permissions.choreographObjectives}
//                 onChange={(val) => handlePermissionChange('choreographObjectives', val)}
//                 label="Choreograph Objectives"
//               />
//               <PermissionDropdown
//                 value={formData.permissions.teams}
//                 onChange={(val) => handlePermissionChange('teams', val)}
//                 label="Teams"
//               />
//             </div>
//           </div>

//           {/* Reports Section */}
//           <div className="mt-6">
//             <h3 className="text-sm font-semibold text-gray-800 mb-4">Reports</h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <PermissionDropdown
//                 value={formData.permissions.generateReport}
//                 onChange={(val) => handlePermissionChange('generateReport', val)}
//                 label="Generate Report"
//               />
//               <PermissionDropdown
//                 value={formData.permissions.reportArchives}
//                 onChange={(val) => handlePermissionChange('reportArchives', val)}
//                 label="Report Archives"
//               />
//             </div>
//           </div>

//           {/* Agenda Builder Section */}
//           <div className="mt-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <PermissionDropdown
//                 value={formData.permissions.agendaBuilder}
//                 onChange={(val) => handlePermissionChange('agendaBuilder', val)}
//                 label="Agenda Builder"
//               />
//               <PermissionDropdown
//                 value={formData.permissions.archives}
//                 onChange={(val) => handlePermissionChange('archives', val)}
//                 label="Archives"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="border-t px-6 py-4 flex justify-end">
//           <button
//             onClick={handleSave}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors duration-200"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const WelcomePage: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [teamFilter, setTeamFilter] = useState('');
//   const [roleFilter, setRoleFilter] = useState('');
//   const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const users = [
//     {
//       id: 1,
//       name: 'James P.',
//       email: 'James.p.@gmail.com',
//       role: 'Administrator',
//       team: 'Executive Leadership team',
//       roleColor: 'bg-blue-600'
//     },
//     {
//       id: 2,
//       name: 'James P.',
//       email: 'James.p.@gmail.com',
//       role: 'Administrator',
//       team: 'Executive Leadership team',
//       roleColor: 'bg-blue-600'
//     },
//     {
//       id: 3,
//       name: 'James P.',
//       email: 'James.p.@gmail.com',
//       role: 'Team Leader',
//       team: 'Executive Leadership team',
//       roleColor: 'bg-green-600'
//     }
//   ];

//   const handleSaveUser = (userData: any) => {
//     console.log('User data:', userData);
//     // Here you would make your API call to save the user
//     // Example:
//     // try {
//     //   const response = await fetch('/api/users', {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify(userData)
//     //   });
//     //   if (response.ok) {
//     //     // Refresh user list or add to current list
//     //   }
//     // } catch (error) {
//     //   console.error('Error saving user:', error);
//     // }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="">
//         {/* Header Section */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//             {/* Left Content */}
//             <div className="flex-1 text-start max-w-3xl p-6 mb-4 lg:mb-0 lg:pr-6">
//               <h1 className="text-2xl font-bold text-gray-900 mb-3">
//                 Welcome to the Admin module!
//               </h1>
//               <p className="text-[#231f20] text-base leading-relaxed">
//                 Here, you can easily manage all your vital information. This module covers 
//                 everything from updating business functions, user management, and 
//                 strategy meetings to storing human resources and financial data.
//               </p>
//             </div>
            
//             {/* Admin Module Image */}
//             <div className="flex-shrink-0">
//               <Image
//                 src={welcomImage}
//                 alt="Admin Module"
//                 width={450}
//                 height={205}
//                 className="p-4"
//                 priority
//               />
//             </div>
//           </div>
//         </div>
        
//         {/* Controls Section */}
//         <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//             {/* Search */}
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search by name"
//                 className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <div className="flex items-center gap-3">
//               {/* Filter by Team */}
//               <select
//                 className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={teamFilter}
//                 onChange={(e) => setTeamFilter(e.target.value)}
//               >
//                 <option value="">Filter by Team</option>
//                 <option value="executive">Executive Leadership team</option>
//                 <option value="development">Development team</option>
//                 <option value="marketing">Marketing team</option>
//               </select>
              
//               {/* Filter by Role */}
//               <select
//                 className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 value={roleFilter}
//                 onChange={(e) => setRoleFilter(e.target.value)}
//               >
//                 <option value="">Filter by Role</option>
//                 <option value="administrator">Administrator</option>
//                 <option value="team-leader">Team Leader</option>
//                 <option value="member">Member</option>
//               </select>
              
//               {/* Add User Button - Only change is adding onClick handler */}
//               <Button onClick={() => setIsModalOpen(true)}>Add User</Button>
//             </div>
//           </div>
//         </div>
        
//         {/* User Table - Unchanged */}
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <tbody>
//                 {users.map((user, index) => (
//                   <tr key={user.id} className={index > 0 ? 'border-t border-gray-100' : ''}>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center">
//                         <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
//                           <User className="w-4 h-4 text-gray-600" />
//                         </div>
//                         <span className="text-gray-900 font-medium text-sm">{user.name}</span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">
//                       <span className="text-gray-600 text-sm">{user.email}</span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${user.roleColor}`}>
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                         {user.team}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-2">
//                         <Button className="text-xs px-3 py-1">
//                           View/Manage
//                         </Button>
//                         <div className="relative">
//                           <button
//                             onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
//                             className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
//                           >
//                             <MoreVertical className="w-4 h-4 text-gray-600" />
//                           </button>
                          
//                           {activeDropdown === user.id && (
//                             <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
//                               <button className="flex items-center w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors duration-200">
//                                 <Edit className="w-3 h-3 mr-2" />
//                                 Edit user
//                               </button>
//                               <button className="flex items-center w-full px-3 py-2 text-xs text-red-600 hover:bg-gray-50 transition-colors duration-200">
//                                 <Trash2 className="w-3 h-3 mr-2" />
//                                 Delete user
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* User Add Modal */}
//         <UserAddModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleSaveUser}
//         />
//       </div>
//     </div>
//   );
// };

// export default WelcomePage;

















"use client";
import React, { useState } from 'react';
import welcomImage from "@/public/image/user-main.png"
import Image from 'next/image';
import { User, Search, MoreVertical, Edit, Trash2, X, ChevronDown } from 'lucide-react';
import Button from '@/components/reusable-button/Button';

interface UserAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: any) => void;
}

type Permission = 'view' | 'edit' | 'hidden';

const UserAddModal: React.FC<UserAddModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessFunction: '',
    notes: '',
    companyRole: '',
    permissions: {
      foundations: 'view' as Permission,
      trends: 'view' as Permission,
      swot: 'view' as Permission,
      challenges: 'view' as Permission,
      competitorsAnalysis: 'view' as Permission,
      clarhetAIRec: 'view' as Permission,
      alignment: 'view' as Permission,
      vision: 'view' as Permission,
      themes: 'view' as Permission,
      blueprintAlignment: 'view' as Permission,
      businessGoal: 'view' as Permission,
      choreographObjectives: 'view' as Permission,
      teams: 'view' as Permission,
      generateReport: 'view' as Permission,
      reportArchives: 'view' as Permission,
      agendaBuilder: 'view' as Permission,
      archives: 'view' as Permission
    }
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePermissionChange = (permission: string, value: Permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const PermissionDropdown = ({ value, onChange, label }: { value: Permission; onChange: (val: Permission) => void; label: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">{label}</label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
        >
          <span className="capitalize">{value}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-20">
            {(['view', 'edit', 'hidden'] as Permission[]).map((option) => (
              <button
                key={option}
                type="button"
                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 capitalize"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
          <h2 className="text-lg font-semibold">User Add</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  placeholder="James P"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  placeholder="James.p.@gmail.com"
                />
              </div>

              {/* User Primary Business Function */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">User Primary Business Function</label>
                <input
                  type="text"
                  value={formData.businessFunction}
                  onChange={(e) => handleInputChange('businessFunction', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Executive Leadership team"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="CEO since 2023"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Company Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Company Role</label>
                <select
                  value={formData.companyRole}
                  onChange={(e) => handleInputChange('companyRole', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Role</option>
                  <option value="CEO">CEO</option>
                  <option value="Manager">Manager</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Team Leader">Team Leader</option>
                </select>
              </div>

              {/* Manage Permissions */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3 text-left">Manage Permissions:</label>
                
                {/* Foundations */}
                <div className="mb-3">
                  <PermissionDropdown
                    value={formData.permissions.foundations}
                    onChange={(val) => handlePermissionChange('foundations', val)}
                    label="Foundations"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Assess Section */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 text-left">Assess</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <PermissionDropdown
                value={formData.permissions.trends}
                onChange={(val) => handlePermissionChange('trends', val)}
                label="Trends"
              />
              <PermissionDropdown
                value={formData.permissions.swot}
                onChange={(val) => handlePermissionChange('swot', val)}
                label="SWOT"
              />
              <PermissionDropdown
                value={formData.permissions.challenges}
                onChange={(val) => handlePermissionChange('challenges', val)}
                label="Challenges"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <PermissionDropdown
                value={formData.permissions.competitorsAnalysis}
                onChange={(val) => handlePermissionChange('competitorsAnalysis', val)}
                label="Competitors Analysis"
              />
              <PermissionDropdown
                value={formData.permissions.clarhetAIRec}
                onChange={(val) => handlePermissionChange('clarhetAIRec', val)}
                label="Clarhet AI Recommendations"
              />
              <PermissionDropdown
                value={formData.permissions.alignment}
                onChange={(val) => handlePermissionChange('alignment', val)}
                label="Alignment"
              />
            </div>
          </div>

          {/* Blueprint Section */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 text-left">Blueprint</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <PermissionDropdown
                value={formData.permissions.vision}
                onChange={(val) => handlePermissionChange('vision', val)}
                label="Vision"
              />
              <PermissionDropdown
                value={formData.permissions.themes}
                onChange={(val) => handlePermissionChange('themes', val)}
                label="Themes"
              />
              <PermissionDropdown
                value={formData.permissions.blueprintAlignment}
                onChange={(val) => handlePermissionChange('blueprintAlignment', val)}
                label="Alignment"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <PermissionDropdown
                value={formData.permissions.businessGoal}
                onChange={(val) => handlePermissionChange('businessGoal', val)}
                label="Business Goal"
              />
              <PermissionDropdown
                value={formData.permissions.choreographObjectives}
                onChange={(val) => handlePermissionChange('choreographObjectives', val)}
                label="Choreograph Objectives"
              />
              <PermissionDropdown
                value={formData.permissions.teams}
                onChange={(val) => handlePermissionChange('teams', val)}
                label="Teams"
              />
            </div>
          </div>

          {/* Reports Section */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 text-left">Reports</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <PermissionDropdown
                value={formData.permissions.generateReport}
                onChange={(val) => handlePermissionChange('generateReport', val)}
                label="Generate Report"
              />
              <PermissionDropdown
                value={formData.permissions.reportArchives}
                onChange={(val) => handlePermissionChange('reportArchives', val)}
                label="Report Archives"
              />
            </div>
          </div>

          {/* Agenda Builder Section */}
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <PermissionDropdown
                value={formData.permissions.agendaBuilder}
                onChange={(val) => handlePermissionChange('agendaBuilder', val)}
                label="Agenda Builder"
              />
              <PermissionDropdown
                value={formData.permissions.archives}
                onChange={(val) => handlePermissionChange('archives', val)}
                label="Archives"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 text-sm rounded transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const WelcomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const users = [
    {
      id: 1,
      name: 'James P.',
      email: 'James.p.@gmail.com',
      role: 'Administrator',
      team: 'Executive Leadership team',
      roleColor: 'bg-blue-600'
    },
    {
      id: 2,
      name: 'James P.',
      email: 'James.p.@gmail.com',
      role: 'Administrator',
      team: 'Executive Leadership team',
      roleColor: 'bg-blue-600'
    },
    {
      id: 3,
      name: 'James P.',
      email: 'James.p.@gmail.com',
      role: 'Team Leader',
      team: 'Executive Leadership team',
      roleColor: 'bg-green-600'
    }
  ];

  const handleSaveUser = (userData: any) => {
    console.log('User data:', userData);
    // API call implementation would go here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            {/* Left Content */}
            <div className="flex-1 text-start max-w-3xl p-6 mb-4 lg:mb-0 lg:pr-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                Welcome to the Admin module!
              </h1>
              <p className="text-[#231f20] text-base leading-relaxed">
                Here, you can easily manage all your vital information. This module covers 
                everything from updating business functions, user management, and 
                strategy meetings to storing human resources and financial data.
              </p>
            </div>
            
            {/* Admin Module Image */}
            <div className="flex-shrink-0">
              <Image
                src={welcomImage}
                alt="Admin Module"
                width={450}
                height={205}
                className="p-4"
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Controls Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name"
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              {/* Filter by Team */}
              <select
                className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
              >
                <option value="">Filter by Team</option>
                <option value="executive">Executive Leadership team</option>
                <option value="development">Development team</option>
                <option value="marketing">Marketing team</option>
              </select>
              
              {/* Filter by Role */}
              <select
                className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">Filter by Role</option>
                <option value="administrator">Administrator</option>
                <option value="team-leader">Team Leader</option>
                <option value="member">Member</option>
              </select>
              
              {/* Add User Button */}
              <Button onClick={() => setIsModalOpen(true)} className="text-sm">Add User</Button>
            </div>
          </div>
        </div>
        
        {/* User Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className={index > 0 ? 'border-t border-gray-100' : ''}>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="text-gray-900 font-medium text-sm">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600 text-sm">{user.email}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${user.roleColor}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {user.team}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button className="text-xs px-3 py-1">
                          View/Manage
                        </Button>
                        <div className="relative">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                          
                          {activeDropdown === user.id && (
                            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                              <button className="flex items-center w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                <Edit className="w-3 h-3 mr-2" />
                                Edit user
                              </button>
                              <button className="flex items-center w-full px-3 py-2 text-xs text-red-600 hover:bg-gray-50 transition-colors duration-200">
                                <Trash2 className="w-3 h-3 mr-2" />
                                Delete user
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Add Modal */}
        <UserAddModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
        />
      </div>
    </div>
  );
};

export default WelcomePage;