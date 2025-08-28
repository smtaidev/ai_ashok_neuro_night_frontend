"use client";

import React from 'react';
import { Users, TrendingUp, BarChart3, PieChart, ArrowRight, Building2, Target, Briefcase } from 'lucide-react';
import Link from 'next/link';

const CapitalTalentHomepage = () => {
  const handleNavigate = (path: string) => {
    // Replace with your actual navigation logic (Next.js router, React Router, etc.)
    console.log(`Navigating to: ${path}`);
    // Example: router.push(path)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <Building2 className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Capital & Talent
              <span className="block text-blue-200">Management Hub</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive platform for strategic talent management and financial tracking. 
              Empower your organization with data-driven insights and strategic decision-making tools.
            </p>
           
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-blue-300/20 rounded-full animate-ping"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Talent Overview Card */}
          <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-12 w-12 text-white" />
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Talent Overview</h2>
              <p className="text-emerald-100 text-lg">
                Strategic Human Resources Management
              </p>
            </div>
            
            <div className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Skills Gap Analysis</h4>
                    <p className="text-gray-600 text-sm">Identify and prioritize critical skill shortages in your organization</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Workforce Trend Monitoring</h4>
                    <p className="text-gray-600 text-sm">Track market trends affecting your talent pipeline and retention</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Training & Development Planning</h4>
                    <p className="text-gray-600 text-sm">Create comprehensive development programs aligned with strategic goals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Risk Assessment</h4>
                    <p className="text-gray-600 text-sm">Evaluate talent shortage risks and regulatory compliance impacts</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <p className="text-gray-700 mb-6">
                  The Human Resources component analyzes key HR factors to enhance strategic development. 
                  It assists in reviewing talent capabilities, workforce trends, and HR considerations 
                  that influence strategic direction and execution.
                </p>
                <Link href={`/dashboard/capital-and-talent/finance`}>
                <button 
                  onClick={() => handleNavigate('/talent-overview')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center group"
                >
                  Manage Talent Overview
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Financial Tracker Card */}
          <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-12 w-12 text-white" />
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Financial Tracker</h2>
              <p className="text-blue-100 text-lg">
                Strategic Financial Management & Analysis
              </p>
            </div>
            
            <div className="p-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Revenue & Expense Tracking</h4>
                    <p className="text-gray-600 text-sm">Monitor total revenue, growth patterns, and comprehensive expense management</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Cash Flow Analysis</h4>
                    <p className="text-gray-600 text-sm">Track inflows, outflows, and net cash positions for optimal liquidity management</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Performance vs. Planning</h4>
                    <p className="text-gray-600 text-sm">Compare planned versus actual performance with variance analysis</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Credit Risk Assessment</h4>
                    <p className="text-gray-600 text-sm">Evaluate debt ratios, interest coverage, and overall financial stability</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <p className="text-gray-700 mb-6">
                  Track and analyze key financial metrics that influence strategy development and execution. 
                  This comprehensive tool helps monitor revenue, expenses, cash flow, and credit risks to 
                  align financials with strategic direction.
                </p>
                <Link href={`/dashboard/capital-and-talent/human-resources`}>
                <button 
                  onClick={() => handleNavigate('/financial-tracker')}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center group"
                >
                  Access Financial Tracker
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        

       
      </div>
    </div>
  );
};

export default CapitalTalentHomepage;