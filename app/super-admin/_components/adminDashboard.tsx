"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Building2, 
  Users, 
  AlertTriangle, 
  DollarSign, 
  AlertCircle,
  TrendingUp,
  UserPlus,
  ArrowUpRight,
  CreditCard,
  UserX,
  X,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';

const AdminDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    adminEmail: '',
    companyName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    setIsModalOpen(false);
    // Reset form
    setFormData({
      name: '',
      adminEmail: '',
      companyName: '',
    });
  };
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex space-x-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Company
            </button>
            <Link href={`/super-admin/trail-reminder`}>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
              Send Trial Reminders
            </button>
            </Link>
            <Link href={`/super-admin/failed-payment`}>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
              Review Failed Payments
            </button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Companies */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">Active Companies</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">125</div>
            <div className="text-sm text-green-600">+12% from last month</div>
          </div>

          {/* Trials User */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">Trials User</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">15</div>
            <div className="text-sm text-green-600">+12% from last month</div>
          </div>

          {/* Overdue Payments */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">Overdue Payments</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">03</div>
            <div className="text-sm text-red-600">-12% from last month</div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">Monthly Revenue</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">$12,500</div>
            <div className="text-sm text-green-600">+12% from last month</div>
          </div>
        </div>

        {/* Full Width Alerts & Notifications */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Alerts & Notifications</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Trial Expiring Alert */}
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="p-1 bg-yellow-100 rounded">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">2 trials expiring this week</h3>
                <p className="text-sm text-gray-600 mt-1">TechCorp, DataFlow, and 3 others need attention</p>
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded mt-2 inline-block">High Priority</span>
              </div>
            </div>

            {/* Failed Payments Alert */}
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="p-1 bg-red-100 rounded">
                <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">12 failed payments</h3>
                <p className="text-sm text-gray-600 mt-1">Automatic retry scheduled for tomorrow</p>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded mt-2 inline-block">Action Required</span>
              </div>
            </div>

            {/* New Signups */}
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="p-1 bg-green-100 rounded">
                <UserPlus className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">8 new signups today</h3>
                <p className="text-sm text-gray-600 mt-1">Welcome emails sent automatically</p>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded mt-2 inline-block">Info</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-right">
            <button className="text-sm text-blue-600 hover:text-blue-700">See more</button>
          </div>
        </div>

        {/* Bottom Grid - Recent Activity (unified section) */}
        <div className="grid grid-cols-1  gap-8">
          {/* Left Column - Logs */}
          

          {/* Right Column - Recent Activity */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              {/* TechCorp Solutions */}
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <ArrowUpRight className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">TechCorp Solutions</h3>
                    <p className="text-sm text-gray-600">Upgraded to Pro Plan</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>

              {/* DataFlow Inc */}
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CreditCard className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">DataFlow Inc</h3>
                    <p className="text-sm text-gray-600">Payment received - $510</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">4 hours ago</span>
              </div>

              {/* InnovateCorp */}
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <UserX className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">InnovateCorp</h3>
                    <p className="text-sm text-gray-600">Payment Failed - $210</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>

              {/* StartupXYZ */}
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">StartupXYZ</h3>
                    <p className="text-sm text-gray-600">New company registered</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">3 day ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-12 w-full max-w-2xl mx-4 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Add Company</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                  <input
                    type="email"
                    name="adminEmail"
                    value={formData.adminEmail}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;