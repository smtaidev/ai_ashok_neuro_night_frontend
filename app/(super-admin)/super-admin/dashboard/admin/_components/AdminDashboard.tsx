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
  Calendar,
  ChevronDown
} from 'lucide-react';
import Button from '@/components/reusable-button/Button';
import Link from 'next/link';
import ExpiringTrials from './ExpiringTrials';

const AdminDashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    adminEmail: '',
    companyName: '',
    renewal: '',
    plan: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission here
    setShowModal(false);
    // Reset form
    setFormData({
      name: '',
      adminEmail: '',
      companyName: '',
      renewal: '',
      plan: ''
    });
  };

  const plans = ['Basic', 'Pro', 'Enterprise', 'Trial'];

  return (
    <div className="bg-gray-50 min-h-screen p-6 ml-6">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-[#0b1c33]">Dashboard</h1>
          <div className="flex space-x-3">
            <Button 
              onClick={() => setShowModal(true)}
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Company
            </Button>
            <Link href="/super-admin/dashboard/expairing">
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                Send Trial Reminders
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
                <span className="ml-3 text-base font-semibold text-gray-700">Active Companies</span>
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
                <span className="ml-3 text-base font-semibold text-gray-700">Trials User</span>
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
                <span className="ml-3 text-base font-semibold text-gray-700">Overdue Payments</span>
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
                <span className="ml-3 text-base font-semibold text-gray-700">Monthly Revenue</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">$12,500</div>
            <div className="text-sm text-green-600">+12% from last month</div>
          </div>
        </div>

        {/* Content Grid */}
        
          {/* Left Column - Alerts & Notifications */}
          <div className='mb-8'>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-semibold text-gray-700">Alerts & Notifications</h2>
              </div>
              
              <div className="space-y-4">
                {/* Trial Expiring Alert */}
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="p-1 bg-yellow-100 rounded">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">2 trials expiring this week</h3>
                    <p className="text-base text-[#231f20] mt-1">TechCorp, DataFlow, and 3 others need attention</p>
                  </div>
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">High Priority</span>
                </div>

                {/* New Signups */}
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="p-1 bg-green-100 rounded">
                    <UserPlus className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">8 new signups today</h3>
                    <p className="text-base text-[#231f20] mt-1">Welcome emails sent automatically</p>
                  </div>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Info</span>
                </div>
              </div>

              <div className="mt-4 text-right">
                <button className="text-sm text-blue-600 hover:text-blue-700">See more</button>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-base font-semibold text-gray-700 mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              {/* TechCorp Solutions */}
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <ArrowUpRight className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">TechCorp Solutions</h3>
                    <p className="text-base text-[#231f20]">Upgraded to Pro Plan</p>
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
                    <p className="text-base text-[#231f20]">Payment received - $510</p>
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
                    <p className="text-base text-[#231f20]">Payment Failed - $210</p>
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
                    <p className="text-base text-[#231f20]">New company registered</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">3 day ago</span>
              </div>
            </div>
          </div>
        
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm  p-8 max-w-4xl w-full mx-4 relative">
            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8">  
              <h2 className="text-3xl font-semibold text-[#0b1c33]">Add Company</h2>
            </div>

            {/* Form */}
            <div className="space-y-6 p-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-base font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-[#231f20] placeholder-gray-400"
                  required
                />
              </div>

              {/* Admin Email Field */}
              <div>
                <label htmlFor="adminEmail" className="block text-base font-semibold text-gray-700 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  id="adminEmail"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-[#231f20] placeholder-gray-400"
                  required
                />
              </div>

              {/* Company Name Field */}
              <div>
                <label htmlFor="companyName" className="block text-base font-semibold text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-[#231f20] placeholder-gray-400"
                  required
                />
              </div>

              {/* Renewal Field */}
              <div>
                <label htmlFor="renewal" className="block text-base font-semibold text-gray-700 mb-2">
                  Renewal
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="renewal"
                    name="renewal"
                    value={formData.renewal}
                    onChange={handleInputChange}
                    placeholder="Select date"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-[#231f20] placeholder-gray-400"
                    required
                  />
                  
                </div>
              </div>

              {/* Plan Field */}
              <div>
                <label htmlFor="plan" className="block text-base font-semibold text-gray-700 mb-2">
                  Plan
                </label>
                <div className="relative">
                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-[#231f20] appearance-none bg-white"
                    required
                  >
                    <option value="">Select Plan</option>
                    {plans.map((plan) => (
                      <option key={plan} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  
                  onClick={handleSubmit}
                  className="w-full "
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

export default AdminDashboard;