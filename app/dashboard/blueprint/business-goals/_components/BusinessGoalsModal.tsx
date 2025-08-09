"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import SharedDrawerButton from "../../_components/reuseable/SharedDrawerButton";
import AlignmentBeforeData from "@/public/static-json-data/blueprint/business-goal-before";

type BusinessGoalsForm = {
  goalTitle: string;
  goalDescription: string;
  strategicThemes: string[];
  goalOwner: string[];
  funding: string;
  businessFunction: string;
  goalTerm: string;
  goalTimelineStart: string;
  goalTimelineEnd: string;
  goalPriority: string;
  goalProgress: number;
  isSpecificStrategic: string;
  hasResources: string;
  resourcesDetails?: string;
  environmentalIssues: string;
  environmentalIssuesDetails?: string;
  impact: string;

  // Additional info fields merged here
  risksChallenges?: string;
  riskImpact?: string;
  regulatoryCompliance?: string;
  complianceImpact?: string;
  culturalRealignment?: string;
  culturalImpact?: string;
  changeTransformation?: string;
  changeImpact?: string;
  capabilityEnhancement?: string;
  capabilityImpact?: string;
  capabilityInfluenced?: string;
  capabilityOwner?: string;
  capabilityEnhance?: string;
  enhanceDetails?: string;
  newCapability?: string;
  capabilityName?: string;
  capabilityType?: string;
  capabilityDescription?: string;
  otherDetails?: string;
};

type BusinessGoalsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { businessGoals: BusinessGoalsForm }) => void;
};

const BusinessGoalsModal = ({ isOpen, onClose, onSave }: BusinessGoalsModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BusinessGoalsForm>({
    defaultValues: { goalOwner: [], newCapability: "No", capabilityEnhance: "No" },
  });

  const [ownerInput, setOwnerInput] = useState("");
  const [owners, setOwners] = useState<string[]>([]);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const hasResources = watch("hasResources");
  const environmentalIssues = watch("environmentalIssues");
  const selectedEnhanceCapability = watch("capabilityEnhance");
  const selectedNewCapability = watch("newCapability");

  const handleAddOwner = () => {
    if (ownerInput.trim() !== "") {
      const updatedOwners = [...owners, ownerInput.trim()];
      setOwners(updatedOwners);
      setValue("goalOwner", updatedOwners);
      setOwnerInput("");
    }
  };

  const handleRemoveOwner = (index: number) => {
    const updatedOwners = owners.filter((_, i) => i !== index);
    setOwners(updatedOwners);
    setValue("goalOwner", updatedOwners);
  };

  const onSubmit: SubmitHandler<BusinessGoalsForm> = (data) => {
    // console.log("Form Data to Save:", data);
    onSave({ businessGoals: data });
    reset();
    setOwners([]);
    setShowAdditionalInfo(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[95vh] overflow-y-auto">
        <div className="bg-blue-900 text-white rounded-t-lg p-5 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Business Goals</h2>
          <button onClick={onClose} className="text-3xl font-light">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              {/* Goal Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Title<span className="text-red-500">*</span>
                </label>
                <input
                  {...register("goalTitle", { required: "Goal Title is required" })}
                  placeholder="Add Title....."
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.goalTitle && <p className="text-red-500 text-sm">{errors.goalTitle.message}</p>}
              </div>

              {/* Goal Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("goalDescription", { required: "Goal Description is required" })}
                  placeholder="Add Details....."
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md"
                />
                {errors.goalDescription && <p className="text-red-500 text-sm">{errors.goalDescription.message}</p>}
              </div>

              {/* Strategic Themes as dropdown */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    What Strategic Theme is this business goal tied to?<span className="text-red-500">*</span>
  </label>
  <select
    {...register("strategicThemes", { required: "Strategic Theme is required" })}
    className="w-full p-3 border border-gray-300 rounded-md"
    defaultValue=""
  >
    <option value="" disabled>
      Select a theme
    </option>
    <option value="Brand Awareness">Brand Awareness</option>
    <option value="Cost Reduction">Cost Reduction</option>
    <option value="Expense Management">Expense Management</option>
  </select>
  {errors.strategicThemes && (
    <p className="text-red-500 text-sm">{errors.strategicThemes.message}</p>
  )}
</div>

          {/* Goal Owner */}
<div className="group">
  <label className="block text-sm mb-3">
    Goal Owner<span className="text-red-500 ml-1">*</span>
  </label>
  <div className="border border-gray-300 rounded-xl p-5">
    <div className="flex gap-3 mb-4">
      <input
        type="text"
        value={ownerInput}
        onChange={(e) => setOwnerInput(e.target.value)}
        placeholder="Enter Owner Name"
        className="flex-1 p-3 border-2 rounded-lg bg-white  focus:ring-2 focus:ring-blue-200 "
      />
      <button
        type="button"
        onClick={handleAddOwner}
        disabled={!ownerInput.trim()}
        className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-3 rounded-lg  disabled:from-blue-800 disabled:to-blue-700 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 font-medium"
      >
        Add
      </button>
    </div>

    {owners.length > 0 ? (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-800 mb-2">
          Added Owners ({owners.length}):
        </p>
        <div className="flex flex-wrap gap-3">
          {owners.map((owner, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 border-blue-300 transition-all duration-200"
            >
              {owner}
              <button
                type="button"
                onClick={() => handleRemoveOwner(index)}
                className="text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ml-1 transition-all duration-200"
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
    <p className="text-red-500 text-sm mt-2">
      At least one owner is required
    </p>
  )}
</div>




              {/* Funding */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Funding allocated toward achieving this goal?<span className="text-red-500">*</span>
                </label>
                <input
                  {...register("funding", { required: "Funding is required" })}
                  placeholder="Enter Amount....."
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.funding && <p className="text-red-500 text-sm">{errors.funding.message}</p>}
              </div>

              {/* Business Function */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign this goal to a Business Function(s)<span className="text-red-500">*</span>
                </label>
                <select
                  {...register("businessFunction", { required: "Business Function is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Select Function(s)</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                </select>
                {errors.businessFunction && (
                  <p className="text-red-500 text-sm">{errors.businessFunction.message}</p>
                )}
              </div>

              {/* Goal Term */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Is this a long-term or short-term goal?<span className="text-red-500">*</span>
                </label>
                <select
                  {...register("goalTerm", { required: "Goal Term is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Select Term</option>
                  <option value="Long-term">Long-term</option>
                  <option value="Short-term">Short-term</option>
                </select>
                {errors.goalTerm && <p className="text-red-500 text-sm">{errors.goalTerm.message}</p>}
              </div>
            </div>

            <div className="space-y-5">
              {/* Goal Timeline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Timeline<span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="date"
                    {...register("goalTimelineStart", { required: "Start date is required" })}
                    className="w-1/2 p-3 border border-gray-300 rounded-md"
                  />
                  <input
                    type="date"
                    {...register("goalTimelineEnd", { required: "End date is required" })}
                    className="w-1/2 p-3 border border-gray-300 rounded-md"
                  />
                </div>
                {errors.goalTimelineStart && (
                  <p className="text-red-500 text-sm">{errors.goalTimelineStart.message}</p>
                )}
                {errors.goalTimelineEnd && (
                  <p className="text-red-500 text-sm">{errors.goalTimelineEnd.message}</p>
                )}
              </div>

              {/* Goal Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Priority<span className="text-red-500">*</span>
                </label>
                <select
                  {...register("goalPriority", { required: "Priority is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                {errors.goalPriority && <p className="text-red-500 text-sm">{errors.goalPriority.message}</p>}
              </div>

              {/* Goal Progress */}
              <input
                type="number"
                {...register("goalProgress", {
                  required: "Progress is required",
                  min: 0,
                  max: 100,
                })}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="% 0"
              />
              {errors.goalProgress && <p className="text-red-500 text-sm">{errors.goalProgress.message}</p>}

              {/* Specific & Strategic */}
              <select
                {...register("isSpecificStrategic", { required: "Specificity is required" })}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Is this goal both specific and strategic?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.isSpecificStrategic && (
                <p className="text-red-500 text-sm">{errors.isSpecificStrategic.message}</p>
              )}

              {/* Has Resources */}
              <select
                {...register("hasResources", { required: "Resources status is required" })}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Do we possess the necessary resources (human and material)?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.hasResources && <p className="text-red-500 text-sm">{errors.hasResources.message}</p>}

              {hasResources === "No" && (
                <textarea
                  {...register("resourcesDetails")}
                  placeholder="Add Details....."
                  className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md"
                />
              )}

              {/* Environmental Issues */}
              <select
                {...register("environmentalIssues", { required: "Environmental issues status is required" })}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Are there any environmental and social issues?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.environmentalIssues && (
                <p className="text-red-500 text-sm">{errors.environmentalIssues.message}</p>
              )}

              {environmentalIssues === "Yes" && (
                <div className="space-y-3">
                  <textarea
                    {...register("environmentalIssuesDetails")}
                    placeholder="Add Details....."
                    className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md"
                  />
                  <div className="flex items-center gap-6">
                    {["High", "Medium", "Low"].map((level) => (
                      <label key={level} className="flex items-center gap-2">
                        <input type="radio" value={level} {...register("impact")} />
                        <span
                          className={
                            level === "High"
                              ? "text-red-500"
                              : level === "Medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                          }
                        >
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>


           {/* Additional info section */}
          {showAdditionalInfo && (
            <div className="mt-6 border-t border-gray-300 pt-4 space-y-6">
              <h2 className="text-blue-800 text-center py-6 border-b text-3xl font-bold">Additional Information</h2>
              {[
                {
                  label: "Are there any potential risks and challenges that could hinder our progress toward the goal?",
                  name: "risksChallenges",
                  impact: "riskImpact",
                },
                {
                  label: "Is there any regulatory compliance to address to ensure goal achievement?",
                  name: "regulatoryCompliance",
                  impact: "complianceImpact",
                },
                {
                  label: "What cultural realignment is necessary to bolster the goal's success?",
                  name: "culturalRealignment",
                  impact: "culturalImpact",
                },
                {
                  label: "What Change/transformation should be addressed to achieve this goal? (Change Management)",
                  name: "changeTransformation",
                  impact: "changeImpact",
                },
                {
                  label: "How will learning and development initiatives be integrated to enhance the skills and capabilities necessary for the successful execution of this objective?",
                  name: "capabilityEnhancement",
                  impact: "capabilityImpact",
                },
              ].map((section, index) => (
                <div key={section.name} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <span className="bg-blue-900 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    {section.label}
                  </label>
                  <textarea
                    {...register(section.name as keyof BusinessGoalsForm)}
                    placeholder="Add details..."
                    className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md bg-sky-50"
                  />
                  <div className="flex space-x-4">
                    {["High", "Medium", "Low"].map((level) => (
                      <label key={level} className="flex items-center space-x-1">
                        <input
                          {...register(section.impact as keyof BusinessGoalsForm)}
                          type="radio"
                          value={level}
                          className={
                            level === "High"
                              ? "accent-green-600"
                              : level === "Medium"
                              ? "accent-yellow-500"
                              : "accent-red-600"
                          }
                        />
                        <span
                          className={
                            level === "High"
                              ? "text-green-600"
                              : level === "Medium"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }
                        >
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {/* Rest additional info fields */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="bg-blue-900 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">
                    06
                  </span>
                  What capabilities will be influenced by the accomplishment of this goal?
                </label>
                <textarea
                  {...register("capabilityInfluenced")}
                  placeholder="Add capabilities..."
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md bg-sky-50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="bg-blue-900 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">
                    07
                  </span>
                  Capability Owner Name
                </label>
                <input
                  {...register("capabilityOwner")}
                  placeholder="John Doe"
                  className="w-full p-3 border border-gray-300 rounded-md bg-sky-50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="bg-blue-900 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">
                    08
                  </span>
                  Does this goal require enhancing existing capabilities to achieve it?
                </label>
                <select
                  {...register("capabilityEnhance")}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
                {selectedEnhanceCapability === "Yes" && (
                  <textarea
                    {...register("enhanceDetails")}
                    placeholder="Add enhancement details..."
                    className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md mt-2 bg-sky-50"
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="bg-blue-900 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">
                    09
                  </span>
                  Does this goal require adding new capabilities to achieve it?
                </label>
                <select
                  {...register("newCapability")}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                  <option value="Add">Add new capability name...</option>
                </select>
                {selectedNewCapability === "Add" && (
                  <div className="mt-2 space-y-2">
                    <input
                      {...register("capabilityName")}
                      placeholder="Add Capability Name"
                      className="w-full p-3 border border-gray-300 rounded-md bg-sky-50"
                    />
                    <input
                      {...register("capabilityType")}
                      placeholder="Select Capability Type"
                      className="w-full p-3 border border-gray-300 rounded-md bg-sky-50"
                    />
                    <input
                      {...register("capabilityDescription")}
                      placeholder="Please describe the new capability"
                      className="w-full p-3 border border-gray-300 rounded-md bg-sky-50"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="bg-blue-900 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-xs mr-2">
                    10
                  </span>
                  Add Other Detail (optional)
                </label>
                <textarea
                  {...register("otherDetails")}
                  placeholder="Add details..."
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md bg-sky-50"
                />
              </div>
            </div>
          )}

          {/* Button to toggle additional info */}
          <div className="flex justify-between items-center p-5 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
            >
              {showAdditionalInfo ? "Hide Additional Info" : "Add Additional Info"}
            </button>

            <div className="flex gap-4">
              <SharedDrawerButton
                title="Business Goals"
                buttonLabel="More info"
                content={<AlignmentBeforeData />}
                buttonClassName="text-blue-900 cursor-pointer"
              />
              <button
                type="submit"
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
              >
                Save
              </button>
            </div>
          </div>

         
        </form>
      </div>
    </div>
  );
};

export default BusinessGoalsModal;
