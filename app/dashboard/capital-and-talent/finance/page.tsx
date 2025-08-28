




"use client";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import humanImage from "@/public/image/finance.png";
import { useCreateFunctionMutation } from "@/redux/api/talent/talentApi";

// Import your mutation hook (adjust the import path as needed)
 // Adjust path

interface FinancialFormData {
  totalRevenue: string;
  revenueGrowth: string;
  totalExpense: string;
  cashInFlow: string;
  cashOutFlow: string;
  netCashPosition: string;
  plannedRevenue: string;
  plannedExpense: string;
  actualRevenue: string;
  actualExpense: string;
  varianceRevenue: string;
  varianceExpense: string;
  forecastAdjustments: string;
  debtToEquity: string;
  interestCoverage: string;
  currentRatio: string;
  cashFlowForecast: string;
  marketConditions: string;
  customerReliability: string;
  otherStability: string;
  creditRiskRating: string;
  riskMitigation: string;
  actionItems: string;
  goingForward: string;
}

const FinancialFormPage = () => {
  const [formData, setFormData] = useState<FinancialFormData>({
    totalRevenue: "",
    revenueGrowth: "",
    totalExpense: "",
    cashInFlow: "",
    cashOutFlow: "",
    netCashPosition: "",
    plannedRevenue: "",
    plannedExpense: "",
    actualRevenue: "",
    actualExpense: "",
    varianceRevenue: "",
    varianceExpense: "",
    forecastAdjustments: "",
    debtToEquity: "",
    interestCoverage: "",
    currentRatio: "",
    cashFlowForecast: "",
    marketConditions: "",
    customerReliability: "",
    otherStability: "",
    creditRiskRating: "",
    riskMitigation: "",
    actionItems: "",
    goingForward: "",
  });

  // Use the mutation hook
  const [createFinancial, { isLoading }] = useCreateFunctionMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Show loading toast
      const loadingToast = toast.loading("Saving financial data...");

      // Prepare data for API (convert string numbers to actual numbers where needed)
      const apiData = {
        // Convert numeric fields to numbers
        totalRevenue: formData.totalRevenue ? Number(formData.totalRevenue) : 0,
        revenueGrowth: formData.revenueGrowth ? Number(formData.revenueGrowth) : 0,
        totalExpense: formData.totalExpense ? Number(formData.totalExpense) : 0,
        cashInFlow: formData.cashInFlow ? Number(formData.cashInFlow) : 0,
        cashOutFlow: formData.cashOutFlow ? Number(formData.cashOutFlow) : 0,
        netCashPosition: formData.netCashPosition ? Number(formData.netCashPosition) : 0,
        plannedRevenue: formData.plannedRevenue ? Number(formData.plannedRevenue) : 0,
        plannedExpense: formData.plannedExpense ? Number(formData.plannedExpense) : 0,
        actualRevenue: formData.actualRevenue ? Number(formData.actualRevenue) : 0,
        actualExpense: formData.actualExpense ? Number(formData.actualExpense) : 0,
        variance: formData.varianceRevenue ? Number(formData.varianceRevenue) : 0, // Assuming single variance field
        debtToEquity: formData.debtToEquity ? Number(formData.debtToEquity) : 0,
        interestCoverage: formData.interestCoverage ? Number(formData.interestCoverage) : 0,
        currentRatio: formData.currentRatio ? Number(formData.currentRatio) : 0,
        cashFlowForecast: formData.cashFlowForecast ? Number(formData.cashFlowForecast) : 0,
        // Keep text fields as strings
        forecastAdjustments: formData.forecastAdjustments,
        marketConditions: formData.marketConditions,
        customerReliability: formData.customerReliability, // Note: API uses different naming
        otherStability: formData.otherStability,
        creditRiskRating: formData.creditRiskRating,
        riskMitigation: formData.riskMitigation,
        actionItems: formData.actionItems,
        goingForward: formData.goingForward,
      };

      // Call the mutation
      const result = await createFinancial(apiData).unwrap();

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success toast
      toast.success(result.message || "Financial data created successfully!");

      // Log success
      console.log("Success:", result);

      // Reset form after successful submission
      setFormData({
        totalRevenue: "",
        revenueGrowth: "",
        totalExpense: "",
        cashInFlow: "",
        cashOutFlow: "",
        netCashPosition: "",
        plannedRevenue: "",
        plannedExpense: "",
        actualRevenue: "",
        actualExpense: "",
        varianceRevenue: "",
        varianceExpense: "",
        forecastAdjustments: "",
        debtToEquity: "",
        interestCoverage: "",
        currentRatio: "",
        cashFlowForecast: "",
        marketConditions: "",
        customerReliability: "",
        otherStability: "",
        creditRiskRating: "",
        riskMitigation: "",
        actionItems: "",
        goingForward: "",
      });

    } catch (error: any) {
      // Show error toast
      toast.error(
        error?.data?.message || 
        error?.message || 
        "Failed to save financial data. Please try again."
      );
      console.error("Error:", error);
    }
  };

  return (
    <div className="mx-auto py-12 bg-gray-50 p-6">
      <div className="w-full ml-3 md:h-[400px] space-y-6 bg-white p-12 mb-12 md:flex justify-between items-center rounded-lg shadow-md gap-4">
        {/* text left side  */}
        <div className="flex-1 space-y-4 md:text-left">
          <p className="text-base text-[#231f20] mt-2 leading-relaxed">
            Track and analyze key financial metrics that influence strategy
            development and execution. This component helps you monitor revenue,
            expenses, cash flow, and credit risks to align financials with the
            strategic direction.
          </p>
        </div>
        <div className="flex-none mr-20 w-full md:w-[400px]">
          <Image
            src={humanImage}
            alt="Financial Overview Image"
            layout="responsive"
            width={400}
            height={400}
          />
        </div>
      </div>
      
      {/* form data */}
      <div className="p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 border rounded-lg bg-white shadow p-6"
        >

          {/* Revenue Overview */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Revenue Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="totalRevenue"
                value={formData.totalRevenue}
                onChange={handleChange}
                placeholder="Total Revenue"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="revenueGrowth"
                value={formData.revenueGrowth}
                onChange={handleChange}
                placeholder="Revenue Growth (%)"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
            </div>
          </div>

          {/* Expense Tracking */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Expense Tracking</h2>
            <input
              name="totalExpense"
              value={formData.totalExpense}
              onChange={handleChange}
              placeholder="Total Expense"
              type="number"
              step="0.01"
              className="p-2 rounded bg-gray-100 border w-full"
            />
          </div>

          {/* Cash Flow Insight */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Cash Flow Insight</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="cashInFlow"
                value={formData.cashInFlow}
                onChange={handleChange}
                placeholder="Cash Inflows"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="cashOutFlow"
                value={formData.cashOutFlow}
                onChange={handleChange}
                placeholder="Cash Outflows"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                name="netCashPosition"
                value={formData.netCashPosition}
                onChange={handleChange}
                placeholder="Net Cash Positions"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
            </div>
          </div>

          {/* Planned vs Actual */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Planned vs Actual</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="plannedRevenue"
                value={formData.plannedRevenue}
                onChange={handleChange}
                placeholder="Planned Revenue"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="plannedExpense"
                value={formData.plannedExpense}
                onChange={handleChange}
                placeholder="Planned Expenses"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="actualRevenue"
                value={formData.actualRevenue}
                onChange={handleChange}
                placeholder="Actual Revenue"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="actualExpense"
                value={formData.actualExpense}
                onChange={handleChange}
                placeholder="Actual Expenses"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="varianceRevenue"
                value={formData.varianceRevenue}
                onChange={handleChange}
                placeholder="Revenue Variance"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="varianceExpense"
                value={formData.varianceExpense}
                onChange={handleChange}
                placeholder="Expense Variance"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
            </div>
          </div>

          {/* Forecast Adjustments */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Forecast Adjustments</h2>
            <textarea
              name="forecastAdjustments"
              value={formData.forecastAdjustments}
              onChange={handleChange}
              placeholder="Enter forecast adjustments..."
              className="w-full p-2 rounded bg-gray-100 border"
              rows={3}
            />
          </div>

          {/* Credit Risk Assessment */}
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Credit Risk Assessment
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="debtToEquity"
                value={formData.debtToEquity}
                onChange={handleChange}
                placeholder="Debt-to-Equity Ratio"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="interestCoverage"
                value={formData.interestCoverage}
                onChange={handleChange}
                placeholder="Interest Coverage Ratio"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="currentRatio"
                value={formData.currentRatio}
                onChange={handleChange}
                placeholder="Current Ratio"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="cashFlowForecast"
                value={formData.cashFlowForecast}
                onChange={handleChange}
                placeholder="Cash Flow Forecast"
                type="number"
                step="0.01"
                className="p-2 rounded bg-gray-100 border w-full"
              />
            </div>
          </div>

          {/* Qualitative Indicators */}
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Qualitative Indicators
            </h2>
            <textarea
              name="marketConditions"
              value={formData.marketConditions}
              onChange={handleChange}
              placeholder="Market Conditions"
              className="w-full p-2 rounded bg-gray-100 border mb-2"
              rows={2}
            />
            <textarea
              name="customerReliability"
              value={formData.customerReliability}
              onChange={handleChange}
              placeholder="Customer Reliability"
              className="w-full p-2 rounded bg-gray-100 border mb-2"
              rows={2}
            />
            <textarea
              name="otherStability"
              value={formData.otherStability}
              onChange={handleChange}
              placeholder="Other Stability Factors"
              className="w-full p-2 rounded bg-gray-100 border"
              rows={2}
            />
          </div>

          {/* Credit Rating */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Credit Risk Rating</h2>
            <select
              name="creditRiskRating"
              value={formData.creditRiskRating}
              onChange={handleChange}
              className="p-2 rounded bg-gray-100 border w-full"
            >
              <option value="">Select Credit Risk Rating</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Very High">Very High</option>
            </select>
          </div>

          {/* Risk Mitigation */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Risk Mitigation</h2>
            <textarea
              name="riskMitigation"
              value={formData.riskMitigation}
              onChange={handleChange}
              placeholder="Enter risk mitigation strategies..."
              className="w-full p-2 rounded bg-gray-100 border"
              rows={3}
            />
          </div>

          {/* Action Items */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Action Items</h2>
            <textarea
              name="actionItems"
              value={formData.actionItems}
              onChange={handleChange}
              placeholder="List action items..."
              className="w-full p-2 rounded bg-gray-100 border"
              rows={3}
            />
          </div>

          {/* Going Forward */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Going Forward</h2>
            <textarea
              name="goingForward"
              value={formData.goingForward}
              onChange={handleChange}
              placeholder="Plans for future..."
              className="w-full p-2 rounded bg-gray-100 border"
              rows={3}
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1D2A6D] text-white py-2 rounded-lg hover:bg-[#1D2A6D] transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </>
            ) : (
              "Save Financial Data"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FinancialFormPage;