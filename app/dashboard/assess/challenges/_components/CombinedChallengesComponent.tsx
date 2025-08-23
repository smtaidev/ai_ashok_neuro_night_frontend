


'use client';

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  Grid,
  LayoutGrid,
  Plus,
  MoreHorizontal,
  Filter,
  Edit3,
  Trash2,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BsFillGridFill } from 'react-icons/bs';
import { PiSquareSplitHorizontalFill } from 'react-icons/pi';
import Drawer from "@/app/dashboard/blueprint/vision/_comoponents/DrawarModal";
import { useGetChallengesQuery, useCreateChallengeMutation, useUpdateChallengeMutation, useDeleteChallengeMutation } from '@/redux/api/challenge/challengeApi';
import type { ChallengeItem, ChallengeResponse, CreateChallengeRequest } from '@/redux/api/challenge/challengeApi';
import toast from "react-hot-toast";
import { AbilityToAddressType, Challenge, ChallengeCategoryType, ImpactData, ImpactOnBusinessType, OverviewData, RiskCategory } from "@/types";

// Enums
export enum ChallengeCategory {
  HUMAN = "Human",
  POLITICAL = "Political", 
  FINANCIAL = "Financial",
  STRATEGIC = "Strategic",
  COMPLIANCE = "Compliance",
  OPERATIONAL = "Operational"
}

export enum ImpactOnBusiness {
  VERY_LOW = "Very Low",
  LOW = "Low",
  MODERATE = "Moderate", 
  HIGH = "High",
  VERY_HIGH = "Very High"
}

export enum AbilityToAddress {
  VERY_LOW = "Very Low",
  LOW = "Low",
  MODERATE = "Moderate",
  HIGH = "High", 
  VERY_HIGH = "Very High"
}

const CombinedChallengesComponent = () => {
  // View state: 'both', 'dashboard', 'summary'
  const [viewMode, setViewMode] = useState<'both' | 'dashboard' | 'summary'>('both');
  
  // Modal and Drawer states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [challengeTitle, setChallengeTitle] = useState<string>("");
  const [category, setCategory] = useState<ChallengeCategoryType | "">("");
  const [impact, setImpact] = useState<ImpactOnBusinessType | "">("");
  const [abilityToAddress, setAbilityToAddress] = useState<AbilityToAddressType | "">("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API hooks
  const { data, isLoading, error, refetch } = useGetChallengesQuery();
  const [createChallenge] = useCreateChallengeMutation();
  const [updateChallenge] = useUpdateChallengeMutation();
  const [deleteChallenge] = useDeleteChallengeMutation();

  // Summary section states
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [mounted, setMounted] = useState(false);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [currentSort, setCurrentSort] = useState<string>("all");
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  console

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Dashboard states
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  // Dashboard data
  const riskScoreData = [
    { name: 'Low', value: 20, color: '#22c55e' },
    { name: 'Medium', value: 40, color: '#eab308' },
    { name: 'High', value: 30, color: '#f97316' },
    { name: 'Critical', value: 10, color: '#ef4444' }
  ];

  const riskCategories: RiskCategory[] = [
    { name: 'Human', score: 45, color: '#6b7280' },
    { name: 'Political', score: 45, color: '#6b7280' },
    { name: 'Financial', score: 95, color: '#3b82f6' },
    { name: 'Strategic', score: 25, color: '#6b7280' },
    { name: 'Compliance', score: 30, color: '#6b7280' },
    { name: 'Operational', score: 15, color: '#6b7280' }
  ];

  const impactData: ImpactData[] = [
    { category: 'Very Low', value: 25, color: '#22c55e' },
    { category: 'Low', value: 20, color: '#eab308' },
    { category: 'Moderate', value: 41, color: '#eab308' },
    { category: 'High', value: 35, color: '#f97316' },
    { category: 'Very High', value: 30, color: '#1e40af' }
  ];

  const overviewData: OverviewData[] = [
    { category: 'Q1', value: 65 },
    { category: 'Q2', value: 45 },
    { category: 'Q3', value: 35 },
    { category: 'Q4', value: 85 },
    { category: 'Q5', value: 95 },
    { category: 'Q6', value: 75 },
    { category: 'Q7', value: 55 }
  ];

  const filterOptions = [
    { value: "human", label: "Human" },
    { value: "political", label: "Political" },
    { value: "strategic", label: "Strategic" },
    { value: "operational", label: "Operational" },
    { value: "financial", label: "Financial" },
    { value: "compliance", label: "Compliance" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data?.success && data?.data?.challenge) {
      const challengesData = data.data.challenge;
      const riskScoreMap: { [key: string]: number } = {
        'very low': 20,
        'low': 40,
        'moderate': 60,
        'high': 80,
        'very high': 100,
      };
      
      try {
        const mapped: Challenge[] = challengesData.map((item: ChallengeItem) => {
          const riskScore = item.risk_score || riskScoreMap[item.impact_on_business?.toLowerCase()] || 50;
          const priority: Challenge['priority'] = riskScore > 70 ? "high" : riskScore > 40 ? "medium" : "low";
          
          return {
            id: item._id,
            name: item.title,
            category: item.category,
            riskScore,
            status: "active" as const,
            timeline: "quarterly" as const,
            createdDate: "2024-01-01",
            priority,
            description: item.description,
            impactOnBusiness: item.impact_on_business,
            abilityToAddress: item.ability_to_address,
          };
        });
        
        setChallenges(mapped);
      } catch (error) {
        console.error('Error mapping challenges data:', error);
        setChallenges([]);
      }
    } else if (error) {
      console.error('API Error:', error);
      setChallenges([]);
    }
  }, [data, isLoading, error]);

  // Custom gauge chart component
  const GaugeChart = ({ value }: { value: number }) => {
    return (
      <div className="relative w-full h-56 mx-auto flex justify-center items-center">
        <svg width="500" height="280" viewBox="0 0 500 280" className="overflow-visible">
          <defs>
            <path id="gaugePath" d="M 80 220 A 170 170 0 0 1 420 220" />
          </defs>
          
          <path
            d="M 80 220 A 170 170 0 0 1 420 220"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="40"
            strokeLinecap="round"
          />
          
          <path
            d="M 80 220 A 170 170 0 0 1 165 80"
            fill="none"
            stroke="#10b981"
            strokeWidth="40"
            strokeLinecap="round"
          />
          
          <path
            d="M 165 80 A 170 170 0 0 1 220 60"
            fill="none"
            stroke="#84cc16"
            strokeWidth="40"
            strokeLinecap="round"
          />
          
          <path
            d="M 220 60 A 170 170 0 0 1 280 60"
            fill="none"
            stroke="#eab308"
            strokeWidth="40"
            strokeLinecap="round"
          />
          
          <path
            d="M 280 60 A 170 170 0 0 1 335 80"
            fill="none"
            stroke="#f97316"
            strokeWidth="40"
            strokeLinecap="round"
          />
          
          <path
            d="M 335 80 A 170 170 0 0 1 420 220"
            fill="none"
            stroke="#ef4444"
            strokeWidth="40"
            strokeLinecap="round"
          />
          
          <g transform="translate(250, 220)">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-140"
              stroke="#1f2937"
              strokeWidth="6"
              strokeLinecap="round"
              transform="rotate(-126)"
            />
            <circle
              cx="0"
              cy="0"
              r="8"
              fill="#1f2937"
            />
          </g>
          
          <text x="70" y="235" fontSize="14" fill="#6b7280" fontWeight="500">0</text>
          <text x="150" y="90" fontSize="14" fill="#6b7280" fontWeight="500">20</text>
          <text x="210" y="50" fontSize="14" fill="#6b7280" fontWeight="500">40</text>
          <text x="250" y="40" fontSize="14" fill="#6b7280" fontWeight="500">60</text>
          <text x="290" y="50" fontSize="14" fill="#6b7280" fontWeight="500">80</text>
          <text x="350" y="90" fontSize="14" fill="#6b7280" fontWeight="500">100</text>
          <text x="430" y="235" fontSize="14" fill="#6b7280" fontWeight="500">100</text>
        </svg>
        
        <div className="absolute" style={{ 
          top: '65%', 
          left: '50%', 
          transform: 'translateX(-50%)',
          marginTop: '-10px'
        }}>
          <div className="text-6xl font-bold text-lime-400">30</div>
        </div>
      </div>
    );
  };

  // Event handlers
  const handleMoreInfoClick = () => {
    setIsModalOpen(false);
    setChallengeTitle("");
    setCategory("");
    setImpact("");
    setAbilityToAddress("");
    setDescription("");
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleGetStartedClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedChallenge(null);
    setChallengeTitle("");
    setCategory("");
    setImpact("");
    setAbilityToAddress("");
    setDescription("");
  };

  const handleViewChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedChallenge(null);
  };

  const handleEditChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setChallengeTitle(challenge.name);
    setCategory(challenge.category as ChallengeCategoryType);
    setImpact(challenge.impactOnBusiness as ImpactOnBusinessType);
    setAbilityToAddress(challenge.abilityToAddress as AbilityToAddressType);
    setDescription(challenge.description || "");
    setIsUpdateModalOpen(true);
  };

  const handleSave = async () => {
    if (!challengeTitle || !category || !impact || !abilityToAddress) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const challengeData: CreateChallengeRequest = {
        title: challengeTitle,
        category: category as ChallengeCategoryType,
        impact_on_business: impact.toLowerCase() as string,
        ability_to_address: abilityToAddress.toLowerCase() as string,
        description: description
      };

      console.log("Saving challenge:", challengeData); // Debug log

      const response = await createChallenge(challengeData).unwrap();
      toast.success("Challenge created successfully!");
      handleCloseModal();
      refetch();
      
    } catch (error: any) {
      console.error("Error creating challenge:", error);
      
      if (error?.data) {
        console.error("Error data:", error.data);
      }
      
      if (error?.data?.message) {
        alert(`Error: ${error.data.message}`);
      } else if (error?.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert("Failed to create challenge. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!challengeTitle || !category || !impact || !abilityToAddress || !selectedChallenge) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        title: challengeTitle,
        category: category as ChallengeCategoryType,
        impact_on_business: impact.toLowerCase(), // Convert to lowercase
        ability_to_address: abilityToAddress.toLowerCase(), // Convert to lowercase
        description: description
      };

      console.log("Updating challenge:", updateData); // Debug log

      await updateChallenge({ 
        id: selectedChallenge.id, 
         ...updateData 
      }).unwrap();
      
      
      
      toast.success("Challenge updated successfully!");
      handleCloseModal();
      refetch();
      
    } catch (error: any) {
      console.error("Error updating challenge:", error);
      
      if (error?.data) {
        console.error("Error data:", error.data);
      }
      
      if (error?.data?.errorSources) {
        const errorMessages = error.data.errorSources.map((err: any) => err.message).join(', ');
        alert(`Validation Error: ${errorMessages}`);
      } else if (error?.data?.message) {
        alert(`Error: ${error.data.message}`);
      } else if (error?.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert("Failed to update challenge. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSort = currentSort === "all" || challenge.timeline === currentSort;
    const matchesFilter = selectedFilters.length === 0 || selectedFilters.some(filter => challenge.category.toLowerCase() === filter);
    return matchesSort && matchesFilter;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChallenges.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredChallenges.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters, currentSort]);

  const getRiskScoreColor = (score: number): string => {
    if (score < 30) return "bg-green-100 text-green-800";
    if (score < 60) return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };

  const handleFilterChange = (filterValue: string): void => {
    setSelectedFilters((prev) =>
      prev.includes(filterValue)
        ? prev.filter((f) => f !== filterValue)
        : [...prev, filterValue]
    );
  };

  const handleEdit = (challengeId: string): void => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      handleEditChallenge(challenge);
    }
  };

  const handleDelete = async (challengeId: string): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this challenge?")) {
      try {
        await deleteChallenge(challengeId).unwrap();
        toast.success("Challenge deleted successfully!");
        refetch();
        
        // Optimistically update the local state
        setChallenges((prev) =>
          prev.filter((challenge) => challenge.id !== challengeId)
        );
      } catch (error: any) {
        console.error("Error deleting challenge:", error);
        
        if (error?.data?.message) {
          alert(`Error: ${error.data.message}`);
        } else if (error?.message) {
          alert(`Error: ${error.message}`);
        } else {
          alert("Failed to delete challenge. Please try again.");
        }
      }
    }
  };

  const clearAllFilters = () => {
    setCurrentSort("all");
    setSelectedFilters([]);
  };

  // Handle view mode changes
  const handleGridClick = () => {
    setViewMode('both');
  };

  const handleSplitClick = () => {
    setViewMode('summary');
  };

  if (!mounted) {
    return <div className="min-h-screen bg-white p-6 rounded-lg mt-8">Loading...</div>;
  }

  if (isLoading) {
    return <div className="min-h-screen bg-white p-6 rounded-lg mt-8">Loading challenges...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-white p-6 rounded-lg mt-8">Error loading challenges. Please try again.</div>;
  }

  return (
    <div className="min-h-screen bg-white p-6 rounded-lg mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Challenges</h1>
          <p className="text-sm text-gray-600 max-w-6xl">
            What are the main challenges the company is facing? In other words, what are the major obstacles that the strategy needs to address? The intent is to establish a list of the most pressing business challenges in order of priority. It is crucial to engage all relevant stakeholders in developing the prioritized list to foster alignment and ensure that everyone is on board with the business challenges the strategy aims to tackle.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleGetStartedClick}
            className="bg-[#22398A] text-white px-4 py-2 cursor-pointer rounded-lg font-medium flex items-center gap-2 hover:bg-[#1D2A6D] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Challenge
          </button>
          
          <div className="ml-4 flex gap-2">
            <button 
              onClick={handleGridClick}
              className={`p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${
                viewMode === 'both' ? 'bg-blue-50 border-blue-300' : ''
              }`}
            >
              <BsFillGridFill className={`w-5 h-5 cursor-pointer ${
                viewMode === 'both' ? 'text-blue-600' : 'text-gray-600'
              }`} />
            </button>
            <button 
              onClick={handleSplitClick}
              className={`p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${
                viewMode === 'summary' ? 'bg-blue-50 border-blue-300' : ''
              }`}
            >
              <PiSquareSplitHorizontalFill className={`w-5 h-5 cursor-pointer ${
                viewMode === 'summary' ? 'text-blue-600' : 'text-gray-600'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      {(viewMode === 'both' || viewMode === 'dashboard') && (
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Challenge Risk Score */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Challenge Risk Score</h3>
              <p className="text-sm text-gray-600 mb-6">
                The risk score is a concise numerical reflection of the combined impact and mitigation abilities for identified challenges. A higher score implies a greater risk. This metric helps prioritize risk management efforts and guides strategic decisions by indicating the overall risk exposure. Regular updates maintain its relevance in the dynamic business environment.
              </p>
              <GaugeChart value={30} />
            </div>

            {/* Risk Score by Category */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Risk Score by Category</h3>
              <p className="text-sm text-gray-600 mb-6">
                Risk score by category offers a granular evaluation of key business aspects.
              </p>
              <div className="space-y-4">
                {riskCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-20">{category.name}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300" 
                          style={{ 
                            width: `${category.score}%`,
                            backgroundColor: category.color 
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 w-8 text-right">{category.score}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-4">
                <span>0</span>
                <span>20</span>
                <span>40</span>
                <span>60</span>
                <span>80</span>
                <span>100</span>
              </div>
            </div>

            {/* Impact on Business */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Impact on business</h3>
              <p className="text-sm text-gray-600 mb-4">Click on a category to drill down</p>
              
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie
                        data={impactData}
                        cx={100}
                        cy={100}
                        innerRadius={60}
                        outerRadius={90}
                        dataKey="value"
                        onMouseEnter={(data) => setHoveredSegment(data.category)}
                        onMouseLeave={() => setHoveredSegment(null)}
                      >
                        {impactData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      {hoveredSegment ? (
                        <>
                          <div className="text-sm text-gray-500">{hoveredSegment}</div>
                          <div className="text-2xl font-bold text-gray-800">
                            {impactData.find(item => item.category === hoveredSegment)?.value}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-sm text-gray-500">Moderate</div>
                          <div className="text-2xl font-bold text-gray-800">41</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 justify-center">
                {impactData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-xs text-gray-600">{item.category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Overview</h3>
              <p className="text-sm text-gray-600 mb-6">
                Systematically analyze each challenge to identify high-impact areas requiring immediate attention and leverage our strengths to mitigate risks effectively.
              </p>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overviewData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis 
                      dataKey="category" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      domain={[0, 100]}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-500 transform -rotate-90 inline-block">Impact challenges</span>
              </div>
              
              <div className="mt-2 text-center">
                <span className="text-sm text-gray-500">Ability to Address</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Section */}
      {(viewMode === 'both' || viewMode === 'summary') && (
        <div className="p-6">
          {/* Header for Summary */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Challenges Summary</h2>
              <p className="text-sm text-gray-600 mt-1">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredChallenges.length)} of {filteredChallenges.length} challenges
              </p>
            </div>
          </div>

          {/* Filter and Sort Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
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
                        <label
                          key={option.value}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="mr-3 rounded"
                            checked={selectedFilters.includes(option.value)}
                            onChange={() => handleFilterChange(option.value)}
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
            {currentItems.map((challenge) => (
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
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex-1 text-center">
                    <span className="text-gray-600 font-medium">
                      {challenge.category}
                    </span>
                  </div>

                  {/* Risk Score */}
                  <div className="flex-1 text-center">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getRiskScoreColor(
                        challenge.riskScore
                      )}`}
                    >
                      Risk Score: {challenge.riskScore}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between gap-2">
                    <button 
                      onClick={() => handleViewChallenge(challenge)}
                      className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1 mr-44 rounded hover:bg-blue-50 transition-colors"
                    >
                      View
                    </button>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === challenge.id ? null : challenge.id)
                        }
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                      </button>
                      {openMenuId === challenge.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-1 z-10 border">
                          <button
                            onClick={() => {
                              handleEdit(challenge.id);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(challenge.id);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* Empty State - Filtered Results */}
          {filteredChallenges.length === 0 && challenges.length > 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No challenges match your filters
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your timeline or category filters.
              </p>
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
              <div className="text-gray-40 mb-4">
                <Grid className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No challenges found
              </h3>
              <p className="text-gray-600 mb-4">
                Get started by adding your first challenge.
              </p>
              <button
                onClick={handleGetStartedClick}
                className="bg-[#22398A] hover:bg-[#1D2A6D] text-white px-6 py-2 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New Challenge
              </button>
            </div>
          )}
        </div>
      )}

      {/* Drawer Component */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title="Challenges"
      >
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            Identifying and prioritizing business challenges is crucial for
            crafting a robust and impactful strategy. To improve
            effectiveness, begin by listing all your business&apos;s
            challenges. Subsequently, delve deeper into understanding their
            root cause and how they are interconnected, which could create a
            potential domino effect.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            For example, a drop in sales may seem like an issue with your
            product or other related processes, but it could also indicate
            that your target market has changed, and you need to adjust your
            offerings accordingly.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            Determining the root cause is pivotal, as it reveals the broader
            context and may unearth untapped opportunities for business
            growth. For instance, if you discover your business has untapped
            potential in the digital domain, you could set a goal for
            expanding your online presence.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            Some of the most common business challenges include inferior
            strategy, declining sales, changing customer needs, new
            competition, poor business processes, inefficient use of
            resources, lack of capabilities, poor customer service, high
            employee turnover, poor financial management, etc.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            By carefully analyzing each challenge, understanding its
            interaction with others, and identifying the root causes, you can
            pave the path for strategic solutions that not only address
            immediate challenges but reveal opportunities for sustainable
            growth.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            Once you have identified all the challenges impacting your
            business, the next step is to prioritize them. It involves
            assessing the importance and urgency of each challenge.
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            Some challenges can significantly impact your business performance
            more than others. For example, a decrease in sales due to
            poor-quality products or services will have a much greater impact
            than delaying upgrading a slightly older version of your CRM
            system by one or more years. (This example is just for
            illustration purposes because each business has its unique
            challenges).
          </p>
        </div>
        <div className="p-4 rounded-lg mb-4 border border-gray-200">
          <p className="text-gray-800">
            The intent here is to create a prioritized list of the business
            challenges. It&#39;s important to involve all relevant
            stakeholders in developing the prioritized list, creating
            alignment, and bringing everyone on board with the real business
            challenges to be addressed by the strategy.
          </p>
        </div>
      </Drawer>

      {/* Add Challenge Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg">
            <div
              className="bg-[#1D2A6D] text-white p-3 rounded-t-lg flex justify-between items-center"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <h2 className="text-lg font-semibold">Add Challenge</h2>
              <button
                onClick={handleCloseModal}
                className="text-white text-xl hover:text-gray-200 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-5 border border-[#e5e7eb] rounded-b-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Challenge Title *
                </label>
                <input
                  type="text"
                  value={challengeTitle}
                  onChange={(e) => setChallengeTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                  placeholder="Enter challenge title"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Challenge Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ChallengeCategoryType)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                >
                  <option value="">Select challenge category</option>
                  <option value={ChallengeCategory.HUMAN}>Human</option>
                  <option value={ChallengeCategory.POLITICAL}>Political</option>
                  <option value={ChallengeCategory.FINANCIAL}>Financial</option>
                  <option value={ChallengeCategory.STRATEGIC}>Strategic</option>
                  <option value={ChallengeCategory.COMPLIANCE}>Compliance</option>
                  <option value={ChallengeCategory.OPERATIONAL}>Operational</option>
                </select>
              </div>
              
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Impact on Business *
                  </label>
                  <select
                    value={impact}
                    onChange={(e) => setImpact(e.target.value as ImpactOnBusinessType)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                  >
                    <option value="">Select impact level</option>
                    <option value={ImpactOnBusiness.VERY_LOW}>Very Low</option>
                    <option value={ImpactOnBusiness.LOW}>Low</option>
                    <option value={ImpactOnBusiness.MODERATE}>Moderate</option>
                    <option value={ImpactOnBusiness.HIGH}>High</option>
                    <option value={ImpactOnBusiness.VERY_HIGH}>Very High</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ability to Address *
                  </label>
                  <select
                    value={abilityToAddress}
                    onChange={(e) => setAbilityToAddress(e.target.value as AbilityToAddressType)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                  >
                    <option value="">Select ability level</option>
                    <option value={AbilityToAddress.VERY_LOW}>Very Low</option>
                    <option value={AbilityToAddress.LOW}>Low</option>
                    <option value={AbilityToAddress.MODERATE}>Moderate</option>
                    <option value={AbilityToAddress.HIGH}>High</option>
                    <option value={AbilityToAddress.VERY_HIGH}>Very High</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded h-24 focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                  placeholder="Describe the challenge..."
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleMoreInfoClick}
                  className="text-[#22398A] font-semibold hover:underline transition-colors"
                >
                  More info
                </button>
                <button
                  onClick={handleSave}
                  className="bg-[#1D2A6D] text-white px-6 py-2 rounded-lg hover:bg-[#22398A] transition-colors"
                  disabled={isSubmitting}
                >
                 {isSubmitting ? "Creating..." : "Create Challenge"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedChallenge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg">
            <div
              className="bg-[#1D2A6D] text-white p-3 rounded-t-lg flex justify-between items-center"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <h2 className="text-lg font-semibold">Challenge Details</h2>
              <button
                onClick={handleCloseViewModal}
                className="text-white text-xl hover:text-gray-200 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{selectedChallenge.name}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                    <p className="text-gray-800">{selectedChallenge.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Priority</label>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      selectedChallenge.priority === 'high' ? 'bg-red-100 text-red-800' :
                      selectedChallenge.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedChallenge.priority}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Impact on Business</label>
                    <p className="text-gray-800 capitalize">{selectedChallenge.impactOnBusiness}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Ability to Address</label>
                    <p className="text-gray-800 capitalize">{selectedChallenge.abilityToAddress}</p>
                  </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                    <span className="text-gray-800 capitalize">{selectedChallenge.status}</span>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Timeline</label>
                    <span className="text-gray-800 capitalize">{selectedChallenge.timeline}</span>
                </div>
                
                {selectedChallenge.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                    <p className="text-gray-800 leading-relaxed">{selectedChallenge.description}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Created Date</label>
                  <p className="text-gray-800">{selectedChallenge.createdDate}</p>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleCloseViewModal}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && selectedChallenge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg">
            <div
              className="bg-[#1D2A6D] text-white p-3 rounded-t-lg flex justify-between items-center"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <h2 className="text-lg font-semibold">Update Challenge</h2>
              <button
                onClick={handleCloseModal}
                className="text-white text-xl hover:text-gray-200 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-5 border border-[#e5e7eb] rounded-b-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Challenge Title *
                </label>
                <input
                  type="text"
                  value={challengeTitle}
                  onChange={(e) => setChallengeTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                  placeholder="Enter challenge title"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Challenge Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ChallengeCategoryType)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                >
                  <option value={ChallengeCategory.HUMAN}>Human</option>
                  <option value={ChallengeCategory.POLITICAL}>Political</option>
                  <option value={ChallengeCategory.FINANCIAL}>Financial</option>
                  <option value={ChallengeCategory.STRATEGIC}>Strategic</option>
                  <option value={ChallengeCategory.COMPLIANCE}>Compliance</option>
                  <option value={ChallengeCategory.OPERATIONAL}>Operational</option>
                </select>
              </div>
              
              <div className="mb-4 flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Impact on Business *
                  </label>
                  <select
                    value={impact}
                    onChange={(e) => setImpact(e.target.value as ImpactOnBusinessType)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                  >
                    <option value={ImpactOnBusiness.VERY_LOW}>Very Low</option>
                    <option value={ImpactOnBusiness.LOW}>Low</option>
                    <option value={ImpactOnBusiness.MODERATE}>Moderate</option>
                    <option value={ImpactOnBusiness.HIGH}>High</option>
                    <option value={ImpactOnBusiness.VERY_HIGH}>Very High</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ability to Address *
                  </label>
                  <select
                    value={abilityToAddress}
                    onChange={(e) => setAbilityToAddress(e.target.value as AbilityToAddressType)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                  >
                    <option value={AbilityToAddress.VERY_LOW}>Very Low</option>
                    <option value={AbilityToAddress.LOW}>Low</option>
                    <option value={AbilityToAddress.MODERATE}>Moderate</option>
                    <option value={AbilityToAddress.HIGH}>High</option>
                    <option value={AbilityToAddress.VERY_HIGH}>Very High</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded h-24 focus:ring-2 focus:ring-[#22398A] focus:border-transparent"
                  placeholder="Describe the challenge..."
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCloseModal}
                  className="text-gray-600 font-medium px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-[#1D2A6D] text-white px-6 py-2 rounded-lg hover:bg-[#22398A] transition-colors"
                  disabled={isSubmitting}
                >
                 {isSubmitting ? "Updating..." : "Update Challenge"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombinedChallengesComponent;