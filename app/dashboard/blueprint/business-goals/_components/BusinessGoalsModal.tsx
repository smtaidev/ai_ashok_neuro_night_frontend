"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import SharedDrawerButton from "../../_components/reuseable/SharedDrawerButton";
import AlignmentBeforeData from "@/public/static-json-data/blueprint/business-goal-before";
import AdditionalInfoModal from "./AdditionalImfoModal";

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
};

type AdditionalInfoForm = {
  risksChallenges: string;
  riskImpact: string;
  regulatoryCompliance: string;
  complianceImpact: string;
  culturalRealignment: string;
  culturalImpact: string;
  changeTransformation: string;
  changeImpact: string;
  capabilityEnhancement: string;
  capabilityImpact: string;
  capabilityInfluenced: string;
  capabilityOwner: string;
  capabilityEnhance: string;
  enhanceDetails: string;
  newCapability: string;
  capabilityName: string;
  capabilityType: string;
  capabilityDescription: string;
  otherDetails: string;
};

type BusinessGoalsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { businessGoals: BusinessGoalsForm; additionalInfo?: AdditionalInfoForm }) => void;
};

const BusinessGoalsModal = ({ isOpen, onClose, onSave }: BusinessGoalsModalProps) => {
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<BusinessGoalsForm>({
    defaultValues: { goalOwner: [] },
  });

  const [ownerInput, setOwnerInput] = useState("");
  const [owners, setOwners] = useState<string[]>([]);
  const [isAdditionalModalOpen, setIsAdditionalModalOpen] = useState(false);
  const [additionalInfoData, setAdditionalInfoData] = useState<AdditionalInfoForm | null>(null);

  const hasResources = watch("hasResources");
  const environmentalIssues = watch("environmentalIssues");

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
    const combinedData = additionalInfoData
      ? { businessGoals: data, additionalInfo: additionalInfoData }
      : { businessGoals: data };
    console.log("Combined Data before onSave:", combinedData); // Debug log
    try {
      onSave(combinedData); // Call onSave with combined data
      // console.log("onSave called successfully", combinedData);
    } catch (error) {
      console.error("Error in onSave:", error); // Log any errors
    }
    reset();
    setOwners([]);
    setAdditionalInfoData(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-900 text-white rounded-t-lg p-5 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Business Goals</h2>
          <button onClick={onClose} className="text-3xl font-light">&times;</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What Strategic Themes is this business goal tied to?<span className="text-red-500">*</span>
                </label>
                <div className="space-y-2 border border-gray-300 rounded-md p-3">
                  {["Brand Awareness", "Cost Reduction", "Expense Management"].map((theme) => (
                    <label key={theme} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={theme}
                        {...register("strategicThemes")}
                        className="w-4 h-4"
                      />
                      {theme}
                    </label>
                  ))}
                </div>
                {errors.strategicThemes && <p className="text-red-500 text-sm">At least one theme is required</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Owner<span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-md p-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={ownerInput}
                      onChange={(e) => setOwnerInput(e.target.value)}
                      placeholder="Enter Owner Name"
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleAddOwner}
                      className="bg-blue-900 text-white px-3 py-2 rounded-md hover:bg-blue-950"
                    >
                      Add
                    </button>
                  </div>
                  {owners.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {owners.map((owner, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                          <span>{owner}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveOwner(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {errors.goalOwner && <p className="text-red-500 text-sm">At least one owner is required</p>}
              </div>

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
                {errors.businessFunction && <p className="text-red-500 text-sm">{errors.businessFunction.message}</p>}
              </div>

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
                {errors.goalTimelineStart && <p className="text-red-500 text-sm">{errors.goalTimelineStart.message}</p>}
                {errors.goalTimelineEnd && <p className="text-red-500 text-sm">{errors.goalTimelineEnd.message}</p>}
              </div>

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

              <input
                type="number"
                {...register("goalProgress", { required: "Progress is required", min: 0, max: 100 })}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="% 0"
              />
              {errors.goalProgress && <p className="text-red-500 text-sm">{errors.goalProgress.message}</p>}

              <select
                {...register("isSpecificStrategic", { required: "Specificity is required" })}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Is this goal both specific and strategic?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.isSpecificStrategic && <p className="text-red-500 text-sm">{errors.isSpecificStrategic.message}</p>}

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

              <select
                {...register("environmentalIssues", { required: "Environmental issues status is required" })}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Are there any environmental and social issues?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.environmentalIssues && <p className="text-red-500 text-sm">{errors.environmentalIssues.message}</p>}

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
                        <input
                          type="radio"
                          value={level}
                          {...register("impact")}
                        />
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

          <div className="flex justify-between items-center p-5 border-t border-gray-200">
            <button
              onClick={() => setIsAdditionalModalOpen(true)}
              type="button"
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
            >
              Add additional information
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

        {isAdditionalModalOpen && (
          <AdditionalInfoModal
            isOpen={isAdditionalModalOpen}
            onClose={() => setIsAdditionalModalOpen(false)}
            onSave={(data) => {
              setAdditionalInfoData(data);
              setIsAdditionalModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BusinessGoalsModal;