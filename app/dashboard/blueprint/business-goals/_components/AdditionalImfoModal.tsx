"use client";
import { useForm, SubmitHandler } from "react-hook-form";

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

type AdditionalInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AdditionalInfoForm) => void;
};

const AdditionalInfoModal = ({ isOpen, onClose, onSave }: AdditionalInfoModalProps) => {
  const { register, handleSubmit, reset, watch } = useForm<AdditionalInfoForm>({
    defaultValues: {
      newCapability: "No",
      capabilityEnhance: "No",
    },
  });

  const onSubmit: SubmitHandler<AdditionalInfoForm> = (data) => {
    onSave(data);
    reset();
    onClose(); // This will be handled by the parent now
  };

  const selectedNewCapability = watch("newCapability");
  const selectedEnhanceCapability = watch("capabilityEnhance");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[95vh] overflow-y-auto">
        <div className="bg-blue-900 text-white rounded-t-lg p-5 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Business Goals</h2>
          <button onClick={onClose} className="text-3xl font-light">&times;</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
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
                {...register(section.name as keyof AdditionalInfoForm)}
                placeholder="Add details..."
                className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md bg-sky-50"
              />
              <div className="flex space-x-4">
                {["High", "Medium", "Low"].map((level) => (
                  <label key={level} className="flex items-center space-x-1">
                    <input
                      {...register(section.impact as keyof AdditionalInfoForm)}
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

          <div className="flex justify-end items-center p-5 border-t border-gray-300 gap-4">
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdditionalInfoModal;