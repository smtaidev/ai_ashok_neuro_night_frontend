"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { useGetStrategicThemesQuery } from "@/redux/api/blueprint/strategicTheme/strategicThemeApi";
import { BusinessGoalsForm } from "./BusinessGoalsModal";
import { BusinessGoal } from "../page";

type EditBusinessGoalsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { businessGoals: BusinessGoalsForm }) => void;
  goalData: BusinessGoal | null;
};

const EditBusinessGoalsModal = ({
  isOpen,
  onClose,
  onSave,
  goalData,
}: EditBusinessGoalsModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BusinessGoalsForm>({
    defaultValues: {
      goalOwner: [],
      assigned_functions: [],
      new_capabilities_needed: "No",
      existing_capabilities_to_enhance: "No",
      capabilityOwners: [],
    },
  });

  const { data: strategicThemes, isLoading: strategicThemesLoading } =
    useGetStrategicThemesQuery();

  const [capabilityOwners, setCapabilityOwners] = useState<string[]>([]);
  const [capabilityOwnerInput, setCapabilityOwnerInput] = useState("");
  const [ownerInput, setOwnerInput] = useState("");
  const [owners, setOwners] = useState<string[]>([]);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  // Pre-populate form when goalData changes
  useEffect(() => {
    if (goalData && isOpen) {
      // Set basic form values
      setValue("title", goalData.title);
      setValue("description", goalData.description);
      setValue("related_strategic_theme", goalData.related_strategic_theme);
      setValue("funding", goalData.funding);
      setValue("assigned_functions", goalData.assigned_functions || []);
      setValue("duration", goalData.duration);
      setValue("goalTimelineStart", goalData.goalTimelineStart.split("T")[0]);
      setValue("goalTimelineEnd", goalData.goalTimelineEnd.split("T")[0]);
      setValue("priority", goalData.priority);
      setValue("goalProgress", goalData.goalProgress);
      setValue("isSpecificStrategic", goalData.isSpecificStrategic);
      setValue("hasTalent", goalData.hasTalent);
      setValue("talentDetails", goalData.talentDetails || "");
      setValue("resource_readiness", goalData.resource_readiness);
      setValue("resourcesDetails", goalData.resourcesDetails || "");
      setValue("esg_issues", goalData.esg_issues);
      setValue("environmentalIssuesDetails", goalData.environmentalIssuesDetails || "");
      setValue("goal_impact", goalData.goal_impact);

      // Set owners
      setOwners(goalData.goalOwner || []);
      setValue("goalOwner", goalData.goalOwner || []);

      // Set capability owners
      setCapabilityOwners(goalData.capabilityOwners || []);
      setValue("capabilityOwners", goalData.capabilityOwners || []);

      // Set additional info fields if they exist
      setValue("risksChallenges", goalData.risksChallenges || "");
      setValue("regulatoryCompliance", goalData.regulatoryCompliance || "");
      setValue("culturalRealignment", goalData.culturalRealignment || "");
      setValue("changeTransformation", goalData.changeTransformation || "");
      setValue("capabilityEnhancement", goalData.capabilityEnhancement || "");
      setValue("capabilityInfluenced", goalData?.capabilityInfluenced || "");
      setValue("existing_capabilities_to_enhance", goalData.existing_capabilities_to_enhance || "No");
      setValue("enhancementDetails", goalData.enhancementDetails || "");
      setValue("new_capabilities_needed", goalData.new_capabilities_needed || "No");
      setValue("newCapabilityName", goalData.newCapabilityName || "");
      setValue("capabilityType", goalData.capabilityType || "");
      setValue("capabilityDescription", goalData.capabilityDescription || "");
      setValue("otherDetails", goalData.otherDetails || "");

      // Set impact ratings
      if (goalData.impact_ratings) {
        setValue("risks", goalData.impact_ratings.risks || "");
        setValue("compliance", goalData.impact_ratings.compliance || "");
        setValue("culture", goalData.impact_ratings.culture || "");
        setValue("change_management", goalData.impact_ratings.change_management || "");
        setValue("l_and_d", goalData.impact_ratings.l_and_d || "");
        setValue("capabilities", goalData.impact_ratings.capabilities || "");
      }
    }
  }, [goalData, isOpen, setValue]);

  // Sync capability owners with form
  useEffect(() => {
    setValue("capabilityOwners", capabilityOwners);
  }, [capabilityOwners, setValue]);

  // Sync goal owners with form
  useEffect(() => {
    setValue("goalOwner", owners);
  }, [owners, setValue]);

  const handleAddCapabilityOwner = () => {
    if (capabilityOwnerInput.trim()) {
      setCapabilityOwners([...capabilityOwners, capabilityOwnerInput.trim()]);
      setCapabilityOwnerInput("");
    }
  };

  const handleRemoveCapabilityOwner = (index: number) => {
    setCapabilityOwners(capabilityOwners.filter((_, i) => i !== index));
  };

  const handleAddOwner = () => {
    if (ownerInput.trim() !== "") {
      const updatedOwners = [...owners, ownerInput.trim()];
      setOwners(updatedOwners);
      setOwnerInput("");
    }
  };

  const handleRemoveOwner = (index: number) => {
    const updatedOwners = owners.filter((_, i) => i !== index);
    setOwners(updatedOwners);
  };

  const onSubmit: SubmitHandler<BusinessGoalsForm> = (data) => {
    // Ensure arrays are properly set
    const formData = {
      ...data,
      goalOwner: owners,
      capabilityOwners: capabilityOwners,
      // Format impact ratings as requested
      impact_ratings: {
        risks: data.risks || "",
        compliance: data.compliance || "",
        culture: data.culture || "",
        change_management: data.change_management || "",
        l_and_d: data.l_and_d || "",
        capabilities: data.capabilities || "",
      }
    };
    
    // Remove the individual impact rating fields from the main object
    const {
      risks,
      compliance,
      culture,
      change_management,
      l_and_d,
      capabilities,
      ...cleanedData
    } = formData;
    
    const finalData = {
      ...cleanedData,
      _id: goalData?._id, // Add the ID for update
      impact_ratings: formData.impact_ratings
    };
    
    console.log("Edit Form Data to Save:", finalData);
    onSave({ businessGoals: finalData });
    
    // Reset form and state
    reset();
    setOwners([]);
    setCapabilityOwners([]);
    setShowAdditionalInfo(false);
    onClose();
  };

  if (!isOpen) return null;
  if (strategicThemesLoading) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        <div className="bg-blue-900 text-white rounded-t-lg p-5 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Edit Business Goal</h2>
          <button onClick={onClose} className="text-3xl font-light hover:text-gray-300">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5 border rounded-2xl p-4">
              {/* Goal Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Title<span className="text-red-500">*</span>
                </label>
                <input
                  {...register("title", {
                    required: "Goal Title is required",
                  })}
                  placeholder="Add Title....."
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Goal Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("description", {
                    required: "Goal Description is required",
                  })}
                  placeholder="Add Details....."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Strategic Themes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What Strategic Theme is this business goal tied to?
                  <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {strategicThemes?.data.map((theme, index) => (
                    <label className="flex items-center space-x-2" key={index}>
                      <input
                        type="radio"
                        {...register("related_strategic_theme", {
                          required: "Strategic Theme is required",
                        })}
                        value={theme?.name}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{theme?.name}</span>
                    </label>
                  ))}
                </div>
                {errors.related_strategic_theme && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.related_strategic_theme.message}
                  </p>
                )}
              </div>

              {/* Goal Owner */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Owner<span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={ownerInput}
                      onChange={(e) => setOwnerInput(e.target.value)}
                      placeholder="Enter Owner Name"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddOwner())}
                    />
                    <button
                      type="button"
                      onClick={handleAddOwner}
                      disabled={!ownerInput.trim()}
                      className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>

                  {owners.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Added Owners ({owners.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {owners.map((owner, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                          >
                            {owner}
                            <button
                              type="button"
                              onClick={() => handleRemoveOwner(index)}
                              className="text-red-600 hover:text-red-800 ml-1"
                              aria-label={`Remove ${owner}`}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      Add goal owners using the input above
                    </p>
                  )}
                </div>
                {errors.goalOwner && (
                  <p className="text-red-500 text-sm mt-1">
                    At least one owner is required
                  </p>
                )}
              </div>

              {/* Funding */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Funding allocated toward achieving this goal?
                  <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("funding", { 
                    required: "Funding is required",
                    min: { value: 0, message: "Funding must be positive" }
                  })}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter Amount....."
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.funding && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.funding.message}
                  </p>
                )}
              </div>

              {/* Business Function */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign this goal to a Business Function(s)
                  <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2 border border-gray-300 rounded-md p-3 bg-gray-50">
                  {[
                    { value: "Sales", label: "Sales" },
                    { value: "Marketing", label: "Marketing" },
                    { value: "Engineering", label: "Engineering" },
                    { value: "Product", label: "Product" },
                    { value: "Operations", label: "Operations" },
                  ].map((func, index) => (
                    <label className="flex items-center space-x-2" key={index}>
                      <input
                        type="checkbox"
                        {...register("assigned_functions", {
                          required: "At least one Business Function is required",
                        })}
                        value={func.value}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{func.label}</span>
                    </label>
                  ))}
                </div>
                {errors.assigned_functions && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.assigned_functions.message}
                  </p>
                )}
              </div>

              {/* Goal Term */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Is this a long-term or short-term goal?
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("duration", {
                    required: "Goal Term is required",
                  })}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Term</option>
                  <option value="Long-term">Long-term</option>
                  <option value="Short-term">Short-term</option>
                </select>
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.duration.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5 border rounded-2xl p-4">
              {/* Goal Timeline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Timeline<span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      {...register("goalTimelineStart", {
                        required: "Start date is required",
                      })}
                      className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.goalTimelineStart && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.goalTimelineStart.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      {...register("goalTimelineEnd", {
                        required: "End date is required",
                      })}
                      className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.goalTimelineEnd && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.goalTimelineEnd.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Priority and Progress */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goal Priority<span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("priority", {
                      required: "Priority is required",
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  {errors.priority && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.priority.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goal Progress (%)<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    {...register("goalProgress", {
                      required: "Progress is required",
                      min: { value: 0, message: "Progress must be at least 0%" },
                      max: { value: 100, message: "Progress cannot exceed 100%" },
                    })}
                    min="0"
                    max="100"
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0-100"
                  />
                  {errors.goalProgress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.goalProgress.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Specific & Strategic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Is this goal both specific and strategic?
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("isSpecificStrategic", { required: "This field is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.isSpecificStrategic && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.isSpecificStrategic.message}
                  </p>
                )}
              </div>

              {/* Has Talent */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do we possess the necessary talent to accomplish this goal?
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("hasTalent", { required: "This field is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.hasTalent && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.hasTalent.message}
                  </p>
                )}
                
                <div className="mt-2">
                  <label className="block text-xs text-gray-600 mb-1">
                    If no, please explain
                  </label>
                  <textarea
                    {...register("talentDetails")}
                    placeholder="Add Details....."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                </div>
              </div>

              {/* Has Resources */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do we possess the necessary resources (material) to accomplish this Goal?
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("resource_readiness", { required: "This field is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.resource_readiness && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.resource_readiness.message}
                  </p>
                )}
                
                <div className="mt-2">
                  <label className="block text-xs text-gray-600 mb-1">
                    If no, please explain
                  </label>
                  <textarea
                    {...register("resourcesDetails")}
                    placeholder="Add Details....."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                </div>
              </div>

              {/* Environmental Issues */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Are there any environmental and social issues that must be addressed while accomplishing this goal?
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("esg_issues", { required: "This field is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.esg_issues && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.esg_issues.message}
                  </p>
                )}

                <div className="mt-3 space-y-3">
                  <label className="block text-xs text-gray-600">
                    If yes, what specific environmental and social issues need to be addressed, and how might they impact the accomplishment of this goal?
                  </label>
                  <textarea
                    {...register("environmentalIssuesDetails")}
                    placeholder="Add Details....."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />

                  <div className="space-y-2">
                    <label className="block text-xs text-gray-600">Impact Level:</label>
                    <div className="flex gap-4">
                      {["High", "Medium", "Low"].map((level) => (
                        <label key={level} className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            value={level} 
                            {...register("goal_impact")}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span
                            className={`text-sm font-medium ${
                              level === "High"
                                ? "text-red-600"
                                : level === "Medium"
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {level}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          {showAdditionalInfo && (
            <div className="mt-8 border-t border-gray-200 pt-6 space-y-6">
              <h3 className="text-2xl font-bold text-blue-900 text-center mb-6">
                Additional Information
              </h3>

              {/* Additional Info Fields */}
              {[
                {
                  label: "Are there any potential risks and challenges that could hinder our progress toward the goal?",
                  name: "risksChallenges",
                  impact: "risks",
                },
                {
                  label: "Is there any regulatory compliance to address to ensure goal achievement?",
                  name: "regulatoryCompliance",
                  impact: "compliance",
                },
                {
                  label: "What cultural realignment is necessary to bolster the goal's success?",
                  name: "culturalRealignment",
                  impact: "culture",
                },
                {
                  label: "What Change/transformation should be addressed to achieve this goal? (Change Management)",
                  name: "changeTransformation",
                  impact: "change_management",
                },
                {
                  label: "How will learning and development initiatives be integrated to enhance the skills and capabilities necessary for the successful execution of this objective?",
                  name: "capabilityEnhancement",
                  impact: "l_and_d",
                },
              ].map((section, index) => (
                <div key={section.name} className="space-y-3 p-4 border border-gray-200 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700">
                    <span className="bg-blue-900 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    {section.label}
                  </label>
                  <textarea
                    {...register(section.name as keyof BusinessGoalsForm)}
                    placeholder="Add details..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                  
                  <div className="space-y-2">
                    <label className="block text-xs text-gray-600">Impact Level:</label>
                    <div className="flex gap-4">
                      {["High", "Medium", "Low"].map((level) => (
                        <label key={level} className="flex items-center gap-2">
                          <input
                            {...register(section.impact as keyof BusinessGoalsForm)}
                            type="radio"
                            value={level}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span
                            className={`text-sm font-medium ${
                              level === "High"
                                ? "text-red-600"
                                : level === "Medium"
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {level}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Capabilities Section */}
              <div className="space-y-6 p-4 border border-gray-200 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800">Capabilities Management</h4>

                {/* Influenced Capabilities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What capabilities will be influenced by the accomplishment of this goal?
                  </label>
                  <select
                    {...register("capabilityInfluenced")}
                    multiple
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    size={4}
                  >
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Product Development">Product Development</option>
                    <option value="Supply Chain">Supply Chain</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or ⌘ (Mac) to select multiple</p>
                </div>

                {/* Capability Impact */}
                <div className="space-y-2">
                  <label className="block text-xs text-gray-600">Capability Impact Level:</label>
                  <div className="flex gap-4">
                    {["High", "Medium", "Low"].map((level) => (
                      <label key={level} className="flex items-center gap-2">
                        <input
                          {...register("capabilities")}
                          type="radio"
                          value={level}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span
                          className={`text-sm font-medium ${
                            level === "High"
                              ? "text-red-600"
                              : level === "Medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Capability Owners */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capability Owner(s)
                  </label>
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={capabilityOwnerInput}
                        onChange={(e) => setCapabilityOwnerInput(e.target.value)}
                        placeholder="Enter Capability Owner"
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCapabilityOwner())}
                      />
                      <button
                        type="button"
                        onClick={handleAddCapabilityOwner}
                        disabled={!capabilityOwnerInput.trim()}
                        className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                    </div>

                    {capabilityOwners.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Added Capability Owners ({capabilityOwners.length}):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {capabilityOwners.map((owner, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                            >
                              {owner}
                              <button
                                type="button"
                                onClick={() => handleRemoveCapabilityOwner(index)}
                                className="text-red-600 hover:text-red-800 ml-1"
                                aria-label={`Remove ${owner}`}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm italic">
                        Add capability owners using the input above
                      </p>
                    )}
                  </div>
                </div>

                {/* Enhance Existing Capabilities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Does this goal require enhancing existing capabilities to achieve it?
                  </label>
                  <select
                    {...register("existing_capabilities_to_enhance")}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Enhancement Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    If Yes, briefly explain what we are enhancing in this existing capabilities
                  </label>
                  <textarea
                    {...register("enhancementDetails")}
                    placeholder="Briefly explain the enhancement..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                </div>

                {/* Add New Capabilities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Does this goal require adding new capabilities to achieve it?
                  </label>
                  <select
                    {...register("new_capabilities_needed")}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* New Capability Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    If yes, add new capability name
                  </label>
                  <input
                    {...register("newCapabilityName")}
                    placeholder="Enter new capability name"
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Capability Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Capability Type
                  </label>
                  <select
                    {...register("capabilityType")}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Capability Type</option>
                    <option value="Core">Core</option>
                    <option value="Differentiating">Differentiating</option>
                    <option value="Supporting">Supporting</option>
                  </select>
                </div>

                {/* New Capability Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Please describe the new capability
                  </label>
                  <textarea
                    {...register("capabilityDescription")}
                    placeholder="Describe the capability..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                </div>

                {/* Other Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add Other Detail (optional)
                  </label>
                  <textarea
                    {...register("otherDetails")}
                    placeholder="Add other details..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-between items-center p-5 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <button
              type="button"
              onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
              className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-950 transition-colors duration-200"
            >
              {showAdditionalInfo ? "Hide Additional Info" : "Add Additional Info"}
            </button>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-950 transition-colors duration-200"
              >
                Update Goal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBusinessGoalsModal;