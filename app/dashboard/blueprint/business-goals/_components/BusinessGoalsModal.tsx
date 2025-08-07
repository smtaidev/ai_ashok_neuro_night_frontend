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
};

type BusinessGoalsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BusinessGoalsForm) => void;
};

const BusinessGoalsModal = ({
  isOpen,
  onClose,
  onSave,
}: BusinessGoalsModalProps) => {
  const { register, handleSubmit, watch, reset, setValue } =
    useForm<BusinessGoalsForm>({
      defaultValues: { goalOwner: [] },
    });

  const [ownerInput, setOwnerInput] = useState("");
  const [owners, setOwners] = useState<string[]>([]);

  const hasResources = watch("hasResources");
  const environmentalIssues = watch("environmentalIssues");

  /** Add new owner */
  const handleAddOwner = () => {
    if (ownerInput.trim() !== "") {
      const updatedOwners = [...owners, ownerInput.trim()];
      setOwners(updatedOwners);
      setValue("goalOwner", updatedOwners);
      setOwnerInput("");
    }
  };

  /** Remove owner */
  const handleRemoveOwner = (index: number) => {
    const updatedOwners = owners.filter((_, i) => i !== index);
    setOwners(updatedOwners);
    setValue("goalOwner", updatedOwners);
  };

  /** Submit form */
  const onSubmit: SubmitHandler<BusinessGoalsForm> = (data) => {
    console.log("Submitted Data:", data);
    onSave(data);
    reset();
    setOwners([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-900 text-white rounded-t-lg p-5 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Business Goals</h2>
          <button onClick={onClose} className="text-3xl font-light">
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT COLUMN */}
            <div className="space-y-5">
              {/* Goal Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Title<span className="text-red-500">*</span>
                </label>
                <input
                  {...register("goalTitle", { required: true })}
                  placeholder="Add Title....."
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              {/* Goal Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("goalDescription", { required: true })}
                  placeholder="Add Details....."
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md"
                />
              </div>

              {/* Strategic Themes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What Strategic Themes is this business goal tied to?
                  <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2 border border-gray-300 rounded-md p-3">
                  {[
                    "Brand Awareness",
                    "Cost Reduction",
                    "Expense Management",
                  ].map((theme) => (
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
              </div>

              {/* Goal Owner (Dynamic Array Input) */}
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
                  {/* Display added owners */}
                  {owners.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {owners.map((owner, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                        >
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
              </div>

              {/* Funding */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Funding allocated toward achieving this goal?
                  <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("funding", { required: true })}
                  placeholder="Enter Amount....."
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              {/* Business Function */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign this goal to a Business Function(s)
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("businessFunction", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Select Function(s)</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              {/* Goal Term */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Is this a long-term or short-term goal?
                  <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("goalTerm", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Select Term</option>
                  <option value="Long-term">Long-term</option>
                  <option value="Short-term">Short-term</option>
                </select>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-5">
              {/* Goal Timeline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Timeline<span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="date"
                    {...register("goalTimelineStart")}
                    className="w-1/2 p-3 border border-gray-300 rounded-md"
                  />
                  <input
                    type="date"
                    {...register("goalTimelineEnd")}
                    className="w-1/2 p-3 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Goal Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Priority<span className="text-red-500">*</span>
                </label>
                <select
                  {...register("goalPriority", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {/* Goal Progress */}
              <input
                type="number"
                {...register("goalProgress", {
                  required: true,
                  min: 0,
                  max: 100,
                })}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="% 0"
              />

              {/* Is Specific & Strategic */}
              <select
                {...register("isSpecificStrategic", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">
                  Is this goal both specific and strategic?
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              {/* Has Resources */}
              <select
                {...register("hasResources", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">
                  Do we possess the necessary resources (human and material)?
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              {hasResources === "No" && (
                <textarea
                  {...register("resourcesDetails")}
                  placeholder="Add Details....."
                  className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md"
                />
              )}

              {/* Environmental Issues */}
              <select
                {...register("environmentalIssues", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">
                  Are there any environmental and social issues?
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              {environmentalIssues === "Yes" && (
                <div className="space-y-3">
                  <textarea
                    {...register("environmentalIssuesDetails")}
                    placeholder="Add Details....."
                    className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md"
                  />

                  {/* Impact Radio Buttons */}
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

          {/* Footer */}
          <div className="flex justify-between items-center p-5 border-t border-gray-200">
            <button
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
      </div>
    </div>
  );
};

export default BusinessGoalsModal;
