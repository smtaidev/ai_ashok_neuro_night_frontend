"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";




type FormInputs = Partial<any> & {
  // include all your form fields here matching the shape of Goal + extra if needed
  goalTitle: string;
  goalDescription: string;
  strategicThemes: string;
  // ... add all fields you want to edit
};

const EditGoalModal = ({ goal, onClose, onSave }: any) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  // When goal changes, reset form with its data
  useEffect(() => {
    if (goal) {
      reset({
        goalTitle: goal.title,
        goalDescription: goal.subtitle,
        strategicThemes: goal.strategicThemes || "",
        // ... set other form fields as needed
      });
    }
  }, [goal, reset]);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (!goal) return;
    // Compose updated goal object
    const updatedGoal: any = {
      ...goal,
      title: data.goalTitle,
      subtitle: data.goalDescription,
      strategicThemes: data.strategicThemes,
      // ... assign other fields
    };
    onSave(updatedGoal);
  };

  if (!goal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[95vh] overflow-y-auto">
        <div className="bg-blue-900 text-white rounded-t-lg p-5 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Edit Business Goal</h2>
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
                {errors.goalTitle && (
                  <p className="text-red-500 text-sm">{errors.goalTitle.message}</p>
                )}
              </div>

              {/* Goal Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("goalDescription", {
                    required: "Goal Description is required",
                  })}
                  placeholder="Add Details....."
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md"
                />
                {errors.goalDescription && (
                  <p className="text-red-500 text-sm">{errors.goalDescription.message}</p>
                )}
              </div>

              {/* Strategic Themes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What Strategic Theme is this business goal tied to?
                  <span className="text-red-500">*</span>
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

              {/* Add other fields as needed */}
            </div>

            {/* You can add more form inputs in second column */}

          </div>

          <div className="flex justify-end gap-4 mt-8 border-t border-gray-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGoalModal;
