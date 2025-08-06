
"use client";
import React, { useState } from 'react';
import { Grid, LayoutGrid, Plus, MoreHorizontal, Filter, Edit3, Trash2, Calendar } from 'lucide-react';

interface Challenge {
  id: number;
  name: string;
  category: 'Strategic' | 'Operational' | 'Financial' | 'Technical';
  riskScore: number;
  status: 'active' | 'inactive' | 'completed';
  timeline: 'monthly' | 'quarterly' | 'yearly';
  createdDate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const ChallengesDashboard = () => {
  // Sample data with timeline - replace with your backend data
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      name: "Lack of Funding",
      category: "Strategic",
      riskScore: 48,
      status: "active",
      timeline: "quarterly",
      createdDate: "2024-01-15",
      priority: "high"
    },
    {
      id: 2,
      name: "Market Competition",
      category: "Strategic",
      riskScore: 65,
      status: "active",
      timeline: "monthly",
      createdDate: "2024-02-10",
      priority: "critical"
    },
    {
      id: 3,
      name: "Technology Infrastructure",
      category: "Operational",
      riskScore: 42,
      status: "active",
      timeline: "yearly",
      createdDate: "2024-01-20",
      priority: "medium"
    },
    {
      id: 4,
      name: "Talent Acquisition",
      category: "Strategic",
      riskScore: 55,
      status: "active",
      timeline: "quarterly",
      createdDate: "2024-03-05",
      priority: "high"
    },
    {
      id: 5,
      name: "Regulatory Compliance",
      category: "Operational",
      riskScore: 38,
      status: "active",
      timeline: "yearly",
      createdDate: "2024-01-08",
      priority: "medium"
    }
  ]);

  const [viewMode, setViewMode] = useState('list');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState<Array<'strategic' | 'operational' | 'financial' | 'technical'>>([]);

  const sortOptions = [
    { value: 'all', label: 'All Timelines' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const filterOptions = [
    { value: 'strategic', label: 'Strategic' },
    { value: 'operational', label: 'Operational' },
    { value: 'financial', label: 'Financial' },
    { value: 'technical', label: 'Technical' }
  ];

  // Filter and sort challenges
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSort = currentSort === 'all' || challenge.timeline === currentSort;
    const matchesFilter = selectedFilters.length === 0 || 
      selectedFilters.some(filter => challenge.category.toLowerCase() === filter);
    return matchesSort && matchesFilter;
  });

  const getRiskScoreColor = (score: number) => {
    if (score < 30) return 'bg-green-100 text-green-800';
    if (score < 60) return 'bg-red-100 text-red-600';
    return 'bg-red-200 text-red-800';
  };

  const getTimelineColor = (timeline: string) => {
    switch (timeline) {
      case 'monthly': return 'bg-blue-100 text-blue-800';
      case 'quarterly': return 'bg-orange-100 text-orange-800';
      case 'yearly': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSortChange = (sortValue: 'all' | 'monthly' | 'quarterly' | 'yearly'): void => {
    setCurrentSort(sortValue);
    setSortOpen(false);
  };

  const handleFilterChange = (filterValue: 'strategic' | 'operational' | 'financial' | 'technical'): void => {
    setSelectedFilters(prev => 
      prev.includes(filterValue) 
        ? prev.filter(f => f !== filterValue)
        : [...prev, filterValue]
    );
  };

  const handleEdit = (challengeId: number): void => {
    console.log('Edit challenge:', challengeId);
    // TODO: Implement edit functionality - open modal/form
  };

  const handleDelete = (challengeId: number): void => {
    if (window.confirm('Are you sure you want to delete this challenge?')) {
      setChallenges(prev => prev.filter(challenge => challenge.id !== challengeId));
    }
  };

  const handleAddNew = () => {
    console.log('Add new challenge');
    // TODO: Implement add new challenge functionality - open modal/form
  };

  const clearAllFilters = () => {
    setCurrentSort('all');
    setSelectedFilters([]);
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-lg mt-8">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Challenges</h1>
            <p className="text-sm text-gray-600 mt-1">
              {filteredChallenges.length} of {challenges.length} challenges
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleAddNew}
              className="bg-[#22398A] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Challenge
            </button>
            <div className="flex items-center bg-white rounded-lg border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''} rounded-l-lg transition-colors`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''} rounded-r-lg transition-colors`}
              >
                <Grid className="w-4 h-4 rotate-90" />
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-600 text-base leading-relaxed max-w-6xl">
            What are the main challenges the company is facing? In other words, what are the major obstacles that the strategy needs to address? The intent is to establish a list of the most pressing business challenges in order of priority. It is crucial to engage all relevant stakeholders in developing the prioritized list to foster alignment and ensure that everyone is on board with the business challenges the strategy aims to tackle.
          </p>
        </div>

        {/* Filter and Sort Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {/* Sort by Timeline */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                {sortOptions.find(opt => opt.value === currentSort)?.label}
              </button>
              {sortOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                  <div className="p-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value as 'all' | 'monthly' | 'quarterly' | 'yearly')}
                        className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 transition-colors ${
                          currentSort === option.value ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Selected filters display */}
            {selectedFilters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedFilters.map((filter) => (
                  <span
                    key={filter}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    <button
                      onClick={() => handleFilterChange(filter)}
                      className="ml-2 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filter By Category
            </button>
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-10">
                <div className="p-3">
                  <div className="space-y-2">
                    {filterOptions.map((option) => (
                      <label key={option.value} className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="mr-3 rounded"
                          checked={selectedFilters.includes(option.value as 'strategic' | 'operational' | 'financial' | 'technical')}
                          onChange={() => handleFilterChange(option.value as 'strategic' | 'operational' | 'financial' | 'technical')}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                  {selectedFilters.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <button
                        onClick={() => setSelectedFilters([])}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Challenges List */}
        <div className="space-y-4">
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                {/* Challenge Name & Timeline */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {challenge.name}
                    </h3>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getTimelineColor(challenge.timeline)}`}>
                      {challenge.timeline.charAt(0).toUpperCase() + challenge.timeline.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Created: {new Date(challenge.createdDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Category */}
                <div className="flex-1 text-center">
                  <span className="text-gray-600 font-medium">
                    {challenge.category}
                  </span>
                </div>

                {/* Risk Score */}
                <div className="flex-1 text-center">
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getRiskScoreColor(challenge.riskScore)}`}>
                    Risk Score: {challenge.riskScore}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors">
                    View
                  </button>
                  <button 
                    onClick={() => handleEdit(challenge.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
                    title="Edit challenge"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(challenge.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-red-600"
                    title="Delete challenge"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State - Filtered Results */}
        {filteredChallenges.length === 0 && challenges.length > 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No challenges match your filters</h3>
            <p className="text-gray-600 mb-4">Try adjusting your timeline or category filters.</p>
            <button
              onClick={clearAllFilters}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Empty State - No Challenges */}
        {challenges.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Grid className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No challenges found</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first challenge.</p>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Challenge
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengesDashboard;