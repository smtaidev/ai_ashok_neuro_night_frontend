





"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  LayoutGrid,
  Plus,
  MoreHorizontal,
  Filter,
  Edit3,
  Trash2,
  Calendar,
} from "lucide-react";
import Drawer from "@/app/dashboard/blueprint/vision/_comoponents/DrawarModal";
import { useGetChallengesQuery, useCreateChallengeMutation } from '@/redux/api/challenge/challengeApi';
import type { ChallengeItem, ChallengeResponse, CreateChallengeRequest } from '@/redux/api/challenge/challengeApi';
import toast from "react-hot-toast";

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

// Alternative string union types
export type ChallengeCategoryType = 
  | "Human"
  | "Political" 
  | "Financial"
  | "Strategic"
  | "Compliance"
  | "Operational";

export type ImpactOnBusinessType = 
  | "Very Low"
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";

export type AbilityToAddressType = 
  | "Very Low"
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";

// Interfaces
interface Challenge {
  id: string;
  name: string;
  category: string;
  riskScore: number;
  status: "active" | "inactive" | "completed";
  timeline: "monthly" | "quarterly" | "yearly";
  createdDate: string;
  priority: "low" | "medium" | "high" | "critical";
  description?: string;
  impactOnBusiness?: string;
  abilityToAddress?: string;
}

interface ChallengeForm {
  challengeTitle: string;
  category: ChallengeCategoryType;
  impact: ImpactOnBusinessType;
  abilityToAddress: AbilityToAddressType;
  description: string;
}

const ChallengesSummary = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [challengeTitle, setChallengeTitle] = useState<string>("");
  const [category, setCategory] = useState<ChallengeCategoryType | "">("");
  const [impact, setImpact] = useState<ImpactOnBusinessType | "">("");
  const [abilityToAddress, setAbilityToAddress] = useState<AbilityToAddressType | "">("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, error } = useGetChallengesQuery();
  const [createChallenge] = useCreateChallengeMutation();

  const handleMoreInfoClick = () => {
    setIsModalOpen(false); // Close the modal
    setChallengeTitle("");
    setCategory("");
    setImpact("");
    setAbilityToAddress("");
    setDescription("");
    setIsDrawerOpen(true); // Open the drawer
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleGetStartedClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setChallengeTitle("");
    setCategory("");
    setImpact("");
    setAbilityToAddress("");
    setDescription("");
  };

  const handleSave = async () => {
    // Validate required fields
    if (!challengeTitle || !category || !impact || !abilityToAddress) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the request body to match your API format
      const challengeData: CreateChallengeRequest = {
        title: challengeTitle,
        category: category as ChallengeCategoryType,
        impact_on_business: impact.toLowerCase() as string,
        ability_to_address: abilityToAddress.toLowerCase() as string,
        description: description
      };

      console.log("Creating challenge:", challengeData);

      const response = await createChallenge(challengeData).unwrap();
      
      console.log("Challenge created successfully:", response);
      
      // Show success message
      toast.success("Challenge created successfully!");
      
      // Close modal and reset form
      handleCloseModal();
      
    } catch (error: any) {
      console.error("Error creating challenge:", error);
      
      if (error?.data?.message) {
        alert(`Error: ${error.data.message}`);
      } else if (error?.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert("Failed to create challenge. Please try again.");
      }
    }
  };

  // Sample data with timeline - replace with your backend data
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data?.success && data?.data?.challenge) {
      console.log('API data received:', data);
      
      const challengesData = data.data.challenge;
      console.log('Challenges array:', challengesData);

      const riskScoreMap: { [key: string]: number } = {
        'very low': 20,
        'low': 40,
        'moderate': 60,
        'high': 80,
        'very high': 100,
      };
      
      try {
        const mapped: Challenge[] = challengesData.map((item: ChallengeItem) => {
          // Use the risk_score from API or calculate from impact_on_business
          const riskScore = item.risk_score || riskScoreMap[item.impact_on_business?.toLowerCase()] || 50;
          
          // Determine priority with proper typing
          const priority: Challenge['priority'] = riskScore > 70 ? "high" : riskScore > 40 ? "medium" : "low";
          
          return {
            id: item._id,
            name: item.title,
            category: item.category,
            riskScore,
            status: "active" as const,
            timeline: "quarterly" as const,
            createdDate: "2024-01-01", // Since there's no createdAt in the API response
            priority,
            description: item.description,
            impactOnBusiness: item.impact_on_business,
            abilityToAddress: item.ability_to_address,
          };
        });
        
        console.log('Mapped challenges:', mapped);
        setChallenges(mapped);
      } catch (error) {
        console.error('Error mapping challenges data:', error);
        setChallenges([]);
      }
    } else if (error) {
      console.error('API Error:', error);
      setChallenges([]);
    } else if (!isLoading && data && !data.success) {
      console.warn('API returned success: false');
      setChallenges([]);
    }
  }, [data, isLoading, error]);

  const [viewMode, setViewMode] = useState<string>("list");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [currentSort, setCurrentSort] = useState<string>("all");
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filterOptions = [
    { value: "human", label: "Human" },
    { value: "political", label: "Political" },
    { value: "strategic", label: "Strategic" },
    { value: "operational", label: "Operational" },
    { value: "financial", label: "Financial" },
    { value: "compliance", label: "Compliance" },
  ];

  // Filter and sort challenges
  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSort =
      currentSort === "all" || challenge.timeline === currentSort;
    const matchesFilter =
      selectedFilters.length === 0 ||
      selectedFilters.some(
        (filter) => challenge.category.toLowerCase() === filter
      );
    return matchesSort && matchesFilter;
  });

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
    console.log("Edit challenge:", challengeId);
    // TODO: Implement edit functionality - open modal/form with existing data
  };

  const handleDelete = (challengeId: string): void => {
    if (window.confirm("Are you sure you want to delete this challenge?")) {
      setChallenges((prev) =>
        prev.filter((challenge) => challenge.id !== challengeId)
      );
    }
  };

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const clearAllFilters = () => {
    setCurrentSort("all");
    setSelectedFilters([]);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div className="min-h-screen bg-white p-6 rounded-lg mt-8">Loading...</div>;
  }

  // Show loading state
  if (isLoading) {
    return <div className="min-h-screen bg-white p-6 rounded-lg mt-8">Loading challenges...</div>;
  }

  // Show error state
  if (error) {
    return <div className="min-h-screen bg-white p-6 rounded-lg mt-8">Error loading challenges. Please try again.</div>;
  }

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
              onClick={handleGetStartedClick}
              className="bg-[#22398A] text-white px-4 py-2 cursor-pointer rounded-lg font-medium flex items-center gap-2 hover:bg-[#1D2A6D] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Challenge
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-600 text-base leading-relaxed max-w-6xl">
            What are the main challenges the company is facing? In other words,
            what are the major obstacles that the strategy needs to address? The
            intent is to establish a list of the most pressing business
            challenges in order of priority. It is crucial to engage all
            relevant stakeholders in developing the prioritized list to foster
            alignment and ensure that everyone is on board with the business
            challenges the strategy aims to tackle.
          </p>
        </div>

        {/* Filter and Sort Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
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
                  <button className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1 mr-44 rounded hover:bg-blue-50 transition-colors">
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
            <div className="text-gray-400 mb-4">
              <Grid className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No challenges found
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by adding your first challenge.
            </p>
            <button
              onClick={handleAddNew}
              className="bg-[#22398A] hover:bg-[#1D2A6D] text-white px-6 py-2 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Challenge
            </button>
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

        {/* Modal */}
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
      </div>
      
    </div>
  );
};

export default ChallengesSummary;