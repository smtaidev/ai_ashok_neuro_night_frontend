

"use client";

import React, { useState } from 'react';
import { MoreHorizontal, Edit, Trash2, Plus, X, ChevronDown } from 'lucide-react';
import { useGetClarhetAllUserQuery } from '@/redux/api/super-admin/superAdminApi';

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
}

const AdminManagementTable: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', email: '', role: 'Editor' });

  const {data} = useGetClarhetAllUserQuery()
  console.log("clarhet user ", data)

  // Dummy data - replace with API data later
  const admins: Admin[] = [
    {
      id: 1,
      name: 'Abdur Rahman',
      email: 'abdurrahman01@gmail.com',
      role: 'Editor'
    },
    {
      id: 2,
      name: 'Jubaidul Islam',
      email: 'jubaidulislam33@gmail.com',
      role: 'Support'
    },
    {
      id: 3,
      name: 'Afjal Ahmed',
      email: 'afjalahmed@gmail.com',
      role: 'Finance'
    }
  ];

  const handleDropdownToggle = (adminId: number) => {
    setOpenDropdown(openDropdown === adminId ? null : adminId);
  };

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setEditForm({
      name: admin.name,
      email: admin.email,
      role: admin.role
    });
    setOpenDropdown(null);
  };

  const handleSave = () => {
    console.log('Save admin:', editForm);
    setEditingAdmin(null);
  };

  const handleCloseEdit = () => {
    setEditingAdmin(null);
  };

  const roleOptions = ['Editor', 'Support', 'Finance', 'Super admin', 'Current', 'Me'];

  const handleDelete = (admin: Admin) => {
    console.log('Delete admin:', admin);
    setOpenDropdown(null);
  };

  const handleAddAdmin = () => {
    setShowAddModal(true);
    setAddForm({ name: '', email: '', role: 'Editor' });
  };

  const handleAddSave = () => {
    console.log('Add new admin:', addForm);
    setShowAddModal(false);
    setAddForm({ name: '', email: '', role: 'Editor' });
  };

  const handleCloseAdd = () => {
    setShowAddModal(false);
    setAddForm({ name: '', email: '', role: 'Editor' });
  };

  // Close dropdown when clicking outside
  const handleOutsideClick = () => {
    setOpenDropdown(null);
  };

  return (
    <div className="bg-white min-h-screen p-6" onClick={handleOutsideClick}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Management</h1>
          <button
            onClick={handleAddAdmin}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Admin
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownToggle(admin.id);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>

                    {/* Dropdown Menu */}
                    {openDropdown === admin.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        <div className="py-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(admin);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(admin);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editingAdmin && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-sm p-6 w-full max-w-3xl mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Edit</h2>
                <button
                  onClick={handleCloseEdit}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email"
                  />
                </div>

                {/* Role Dropdown */}
                <div className="relative">
                  <select
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Admin Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-sm p-8 w-full max-w-3xl mx-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-8 text-center">Add new admin</h2>

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={addForm.name}
                    onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={addForm.email}
                    onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email"
                  />
                </div>

                {/* Role Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <div className="relative">
                    <select
                      value={addForm.role}
                      onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={handleCloseAdd}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Add admin
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty space to match the design */}
        <div className="mt-8"></div>
      </div>
    </div>
  );
};

export default AdminManagementTable;