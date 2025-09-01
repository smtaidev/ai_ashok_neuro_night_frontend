// "use client";

// import React, { useState } from 'react';
// import { Search, Edit, Trash2, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// interface Company {
//   id: number;
//   name: string;
//   plan: string;
//   status: 'Active' | 'Suspend' | 'Trial';
//   adminEmail: string;
//   renewal: string;
//   startDate: string;
// }

// const CompaniesTable: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   // Company data matching the image
//   const companies: Company[] = [
//     {
//       id: 1,
//       name: 'TaleStream',
//       plan: 'Pro',
//       status: 'Active',
//       adminEmail: 'ubego02@gmail.com',
//       renewal: '15-08-2025',
//       startDate: '11-05-2024'
//     },
//     {
//       id: 2,
//       name: 'Victoria',
//       plan: 'Pro',
//       status: 'Suspend',
//       adminEmail: 'bengplas77@gmail.com',
//       renewal: '09-09-2025',
//       startDate: '12-06-2025'
//     },
//     {
//       id: 3,
//       name: 'Acme Inc.',
//       plan: 'Starter',
//       status: 'Trial',
//       adminEmail: 'ajajlmtal0@gmail.com',
//       renewal: '05-10-2025',
//       startDate: '05-08-2025'
//     }
//   ];

//   const getStatusDropdown = (status: Company['status'], companyId: number) => {
//     const getStatusClasses = (currentStatus: Company['status']) => {
//       const baseClasses = 'px-3 py-1 rounded text-xs font-medium inline-flex items-center space-x-1 cursor-pointer';
//       switch (currentStatus) {
//         case 'Active':
//           return `${baseClasses} bg-green-500 text-white`;
//         case 'Suspend':
//           return `${baseClasses} bg-red-500 text-white`;
//         case 'Trial':
//           return `${baseClasses} bg-blue-500 text-white`;
//         default:
//           return baseClasses;
//       }
//     };

//     return (
//       <div className="relative group">
//         <div className={getStatusClasses(status)}>
//           <span>{status}</span>
//           <ChevronDown className="w-3 h-3" />
//         </div>
//         {/* Dropdown menu would go here in a full implementation */}
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white min-h-screen p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-xl font-bold text-[#0b1c33]">Companies</h1>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search"
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-[#231f20]"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Table Container */}
//         <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
//                   SN
//                 </th>
//                 <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
//                   Company Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
//                   Plan
//                 </th>
//                 <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
//                   Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
//                   Admin Contact Email
//                 </th>
//                 <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
//                   Renewal
//                 </th>
//                 <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
//                   Start Date
//                 </th>
//                 <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {companies.map((company, index) => (
//                 <tr key={company.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-base text-[#231f20]">
//                     {index + 1}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-base text-[#231f20]">
//                     {company.name}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-base text-[#231f20]">
//                     {company.plan}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {getStatusDropdown(company.status, company.id)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-base text-[#231f20]">
//                     {company.adminEmail}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-base text-[#231f20]">
//                     {company.renewal}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-base text-[#231f20]">
//                     {company.startDate}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <button className="p-1 hover:bg-gray-100 rounded text-blue-600">
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button className="p-1 hover:bg-gray-100 rounded text-red-600">
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center items-center space-x-2 mt-6">
//           <button 
//             className="p-2 hover:bg-gray-100 rounded text-gray-500"
//             onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>
          
//           {[1, 2, 3, 4, 5].map((page) => (
//             <button
//               key={page}
//               className={`w-8 h-8 rounded text-sm font-medium ${
//                 page === currentPage
//                   ? 'bg-blue-500 text-white'
//                   : 'hover:bg-gray-100 text-gray-700'
//               }`}
//               onClick={() => setCurrentPage(page)}
//             >
//               {page}
//             </button>
//           ))}
          
//           <button 
//             className="p-2 hover:bg-gray-100 rounded text-gray-500"
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompaniesTable;












"use client";

import React, { useState } from 'react';
import { Search, Edit, Trash2, ChevronDown, ChevronLeft, ChevronRight, X, Calendar } from 'lucide-react';
import Button from '@/components/reusable-button/Button';

interface Company {
  id: number;
  name: string;
  plan: string;
  status: 'Active' | 'Suspend' | 'Trial';
  adminEmail: string;
  renewal: string;
  startDate: string;
}

const CompaniesTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: 'TaleStream',
      plan: 'Pro',
      status: 'Active',
      adminEmail: 'ubego02@gmail.com',
      renewal: '15-08-2025',
      startDate: '11-05-2024'
    },
    {
      id: 2,
      name: 'Victoria',
      plan: 'Pro',
      status: 'Suspend',
      adminEmail: 'bengplas77@gmail.com',
      renewal: '09-09-2025',
      startDate: '12-06-2025'
    },
    {
      id: 3,
      name: 'Acme Inc.',
      plan: 'Starter',
      status: 'Trial',
      adminEmail: 'ajajlmtal0@gmail.com',
      renewal: '05-10-2025',
      startDate: '05-08-2025'
    }
  ]);

  const [editFormData, setEditFormData] = useState({
    name: '',
    adminEmail: '',
    companyName: '',
    renewal: '',
    plan: ''
  });

  const plans = ['Basic', 'Pro', 'Enterprise', 'Starter', 'Trial'];

  const handleEditClick = (company: Company) => {
    setEditingCompany(company);
    setEditFormData({
      name: company.name,
      adminEmail: company.adminEmail,
      companyName: company.name,
      renewal: company.renewal.split('-').reverse().join('-'), // Convert to YYYY-MM-DD format
      plan: company.plan
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = () => {
    if (editingCompany) {
      setCompanies(companies.map(company => 
        company.id === editingCompany.id 
          ? {
              ...company,
              name: editFormData.companyName,
              adminEmail: editFormData.adminEmail,
              plan: editFormData.plan,
              renewal: editFormData.renewal.split('-').reverse().join('-') // Convert back to DD-MM-YYYY
            }
          : company
      ));
    }
    setShowEditModal(false);
    setEditingCompany(null);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (companyId: number, newStatus: Company['status']) => {
    setCompanies(companies.map(company => 
      company.id === companyId 
        ? { ...company, status: newStatus }
        : company
    ));
    setDropdownOpen(null);
  };

  const getStatusClasses = (status: Company['status']) => {
    const baseClasses = 'px-3 py-1 rounded text-xs font-medium inline-flex items-center space-x-1 cursor-pointer';
    switch (status) {
      case 'Active':
        return `${baseClasses} bg-green-500 text-white`;
      case 'Suspend':
        return `${baseClasses} bg-red-500 text-white`;
      case 'Trial':
        return `${baseClasses} bg-blue-500 text-white`;
      default:
        return baseClasses;
    }
  };

  const getStatusDropdown = (company: Company) => {
    const isOpen = dropdownOpen === company.id;
    
    return (
      <div className="relative">
        <div 
          className={getStatusClasses(company.status)}
          onClick={() => setDropdownOpen(isOpen ? null : company.id)}
        >
          <span>{company.status}</span>
          <ChevronDown className="w-3 h-3" />
        </div>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
            {company.status !== 'Active' && (
              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
                onClick={() => handleStatusChange(company.id, 'Active')}
              >
                Unsuspend
              </button>
            )}
            {company.status !== 'Suspend' && (
              <button
                className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
                onClick={() => handleStatusChange(company.id, 'Suspend')}
              >
                Suspend
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#0b1c33]">Companies</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-[#231f20]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
                  SN
                </th>
                <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
                  Company Name
                </th>
                <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
                  Plan
                </th>
                <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
                  Admin Contact Email
                </th>
                <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
                  Renewal
                </th>
                <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
                  Start Date
                </th>
                <th className="px-6 py-4 text-left text-base font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company, index) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-base text-[#231f20]">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-[#231f20]">
                    {company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-[#231f20]">
                    {company.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusDropdown(company)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-[#231f20]">
                    {company.adminEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-[#231f20]">
                    {company.renewal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-[#231f20]">
                    {company.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="p-1 hover:bg-gray-100 rounded text-blue-600"
                        onClick={() => handleEditClick(company)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button 
            className="p-2 hover:bg-gray-100 rounded text-gray-500"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 rounded text-sm font-medium ${
                page === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          
          <button 
            className="p-2 hover:bg-gray-100 rounded text-gray-500"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Edit Company Modal */}
      {showEditModal && editingCompany && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 relative">
            {/* Close Button */}
            <button 
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#0b1c33]">Update Company</h2>
            </div>

            {/* Form Fields */}
            <div className="space-y-6 p-8">
              {/* Name Field */}
              <div>
                <label htmlFor="editName" className="block text-base font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="editName"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                  placeholder="Enter name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-[#231f20] placeholder-gray-400"
                />
              </div>

              {/* Admin Email Field */}
              <div>
                <label htmlFor="editAdminEmail" className="block text-base font-semibold text-gray-700 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  id="editAdminEmail"
                  name="adminEmail"
                  value={editFormData.adminEmail}
                  onChange={handleEditInputChange}
                  placeholder="Enter email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-[#231f20] placeholder-gray-400"
                />
              </div>

              {/* Company Name Field */}
              <div>
                <label htmlFor="editCompanyName" className="block text-base font-semibold text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="editCompanyName"
                  name="companyName"
                  value={editFormData.companyName}
                  onChange={handleEditInputChange}
                  placeholder="Enter company name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-[#231f20] placeholder-gray-400"
                />
              </div>

              {/* Renewal Field */}
              <div>
                <label htmlFor="editRenewal" className="block text-base font-semibold text-gray-700 mb-2">
                  Renewal
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="editRenewal"
                    name="renewal"
                    value={editFormData.renewal}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-[#231f20]"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Plan Field */}
              <div>
                <label htmlFor="editPlan" className="block text-base font-semibold text-gray-700 mb-2">
                  Plan
                </label>
                <div className="relative">
                  <select
                    id="editPlan"
                    name="plan"
                    value={editFormData.plan}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-[#231f20] appearance-none bg-white"
                  >
                    <option value="">Select Plan</option>
                    {plans.map((plan) => (
                      <option key={plan} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                 
                  onClick={handleEditSubmit}
                  className="w-full"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default CompaniesTable;