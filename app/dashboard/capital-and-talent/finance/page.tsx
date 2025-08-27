"use client";
import Image from "next/image";
import humanImage from "@/public/image/swot-img.png";

const FinancialFormPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Submitted Data:", data);
  };

  return (
    <div className="mx-auto py-12 bg-gray-50 p-6">
      <div className="w-full ml-3 md:h-[400px] space-y-6 bg-white   p-12 mb-12     md:flex justify-between items-center rounded-lg shadow-md gap-4">
        {/* text left side  */}
        <div className="flex-1 space-y-4 md:text-left">
          <p className="text-base text-[#231f20] mt-2 leading-relaxed">
            Track and analyze key financial metrics that influence strategy
            development and execution. This component helps you monitor revenue,
            expenses, cash flow, and credit risks to align financials with the
            strategic direction.
          </p>
        </div>
        <div className="flex-none mr-38 w-full md:w-[300px]">
          <Image
            src={humanImage}
            alt="Human Resources Image"
            layout="responsive"
            width={300}
            height={300}
          />
        </div>
      </div>
      {/* form data */}
      <div className=" p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 border rounded-lg bg-white shadow p-6"
        >
          {/* Revenue Overview */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Revenue Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="total_revenue"
                placeholder="Total Revenue"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="revenue_growth"
                placeholder="Revenue Growth"
                className="p-2 rounded bg-gray-100 border w-full"
              />
            </div>
          </div>

          {/* Expense Tracking */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Expense Tracking</h2>
            <input
              name="total_expense"
              placeholder="Total Expense"
              className="p-2 rounded bg-gray-100 border w-full"
            />
          </div>

          {/* Cash Flow Insight */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Cash Flow Insight</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="cash_inflows"
                placeholder="Cash Inflows"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="cash_outflows"
                placeholder="Cash Outflows"
                className="p-2 rounded bg-gray-100 border w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                name="net_cash_positions"
                placeholder="Net Cash Positions"
                className="p-2 rounded bg-gray-100 border w-full"
              />
            </div>
          </div>

          {/* Planned vs Actual */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Cash Flow Insight</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="planned_revenue"
                placeholder="Planned Revenue"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="planned_expenses"
                placeholder="Planned Expenses"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="actual_revenue"
                placeholder="Actual Revenue"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="actual_expenses"
                placeholder="Actual Expenses"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="variance_revenue"
                placeholder="Variance"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="variance_expenses"
                placeholder="Variance"
                className="p-2 rounded bg-gray-100 border w-full"
              />
            </div>
          </div>

          {/* Forecast Adjustments */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Forecast Adjustments</h2>
            <textarea
              name="forecast_adjustments"
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
                name="debt_to_equity"
                placeholder="Debt-to-Equity"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="interest_coverage"
                placeholder="Interest Coverage"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="current_ratio"
                placeholder="Current Ratio"
                className="p-2 rounded bg-gray-100 border w-full"
              />
              <input
                name="cash_flow_forecast"
                placeholder="Cash Flow Forecast"
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
              name="market_conditions"
              placeholder="Market Conditions"
              className="w-full p-2 rounded bg-gray-100 border mb-2"
              rows={2}
            />
            <textarea
              name="customer_resolvability"
              placeholder="Customer Resolvability"
              className="w-full p-2 rounded bg-gray-100 border mb-2"
              rows={2}
            />
            <textarea
              name="other_stability"
              placeholder="Other Stability"
              className="w-full p-2 rounded bg-gray-100 border"
              rows={2}
            />
          </div>

          {/* Credit Rating */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Credit Risk Rating</h2>
            <input
              name="credit_risk_rating"
              placeholder="Credit Risk Rating"
              className="p-2 rounded bg-gray-100 border w-full"
            />
          </div>

          {/* Risk Mitigation */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Risk Mitigation</h2>
            <textarea
              name="risk_mitigation"
              placeholder="Enter risk mitigation strategies..."
              className="w-full p-2 rounded bg-gray-100 border"
              rows={3}
            />
          </div>

          {/* Action Items */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Action Items</h2>
            <textarea
              name="action_items"
              placeholder="List action items..."
              className="w-full p-2 rounded bg-gray-100 border"
              rows={3}
            />
          </div>

          {/* Going Forward */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Going Forward</h2>
            <textarea
              name="going_forward"
              placeholder="Plans for future..."
              className="w-full p-2 rounded bg-gray-100 border"
              rows={3}
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default FinancialFormPage;
