import React from "react";

const BusinessGoalBeforeData = () => {
  return (
    <div className="">
      <div className="bg-white rounded-lg border border-gray-200 p-4 max-w-2xl w-full mb-6">
        <p className="text-xs">
          Business goals are specific, measurable targets a company aims to
          achieve within a specific time frame. These are designed to guide the
          organization&#39;s efforts and help it focus on what must be
          accomplished to succeed. Business goals can include financial targets,
          such as revenue or profit margins, as well as non-financial goals,
          like market share, customer satisfaction, or product innovation.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 max-w-2xl w-full">
        <p className="text-gray-900 font-semibold mb-4 leading-relaxed">
          Importance of Goals
        </p>

        <ol className="space-y-4 list-decimal list-inside">
          <li>
            <p className="text-gray-700 text-xs">
              <span className="font-semibold mr-2">•</span> Goals provide a
              clear direction and purpose for the entire organization.
            </p>
          </li>
          <li>
            <p className="text-gray-700  text-xs">
              <span className="font-semibold mr-2">• </span>They align efforts
              across different departments and teams towards common strategic
              objectives.
            </p>
          </li>
          <li>
            <p className="text-gray-700  text-xs">
              <span className="font-semibold mr-2">•</span> Goals serve as a
              benchmark for measuring progress and success.
            </p>
          </li>
        </ol>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 mt-6 p-4 max-w-2xl w-full">
        <h2 className=" font-semibold text-gray-800 mb-4">
          Characteristics of Effective Goals
        </h2>

        <ul className="space-y-4 text-xs">
          <li>
            <p className="text-gray-700">
              <span className="font-semibold">Alignment with Strategy:</span>{" "}
              Goals should stem directly from the organization&#39;s overall
              strategy and strategic themes.
            </p>
          </li>
          <li>
            <p className="text-gray-700">
              <span className="font-semibold">Clarity and Simplicity:</span>{" "}
              They should be easy to understand and communicate throughout the
              organization.
            </p>
          </li>
          <li>
            <p className="text-gray-700">
              <span className="font-semibold">Measurable: </span> Goals should
              be quantifiable, allowing for an accurate assessment of progress.
            </p>
          </li>
          <li>
            <p className="text-gray-700">
              <span className="font-semibold">Relevance: </span> Each goal
              should contribute to the organization&#39;s vision.
            </p>
          </li>
          <li>
            <p className="text-gray-700">
              <span className="font-semibold">Time-Bound:</span> Goals should
              have a clear timeframe for achievement, promoting accountability
              and focus.
            </p>
          </li>
        </ul>
      </div>

      <div className="border mt-6 p-4 rounded-lg">
        <h2 className=" font-semibold mb-5">
          Dos and Don&#39;ts of Vision Statement
        </h2>
        {/* dos container */}
        <div className="flex justify-between w-full gap-3">
          <div className="border p-2 rounded-md w-full">
            <h2 className="text-sm font-semibold mb-5">Do&#39;s</h2>
            <p className="text-[10px] font-thin mb-2  text-gray-600">
              <span className="text-[10px] mr-2 text-black font-semibold">
                •
              </span>{" "}
              Engage stakeholders in the goal-setting process to ensure buy-in
              and alignment.
            </p>
            <p className="text-[10px] font-thin mb-2  text-gray-600">
              <span className="text-[10px] mr-2 text-black font-semibold">
                •
              </span>{" "}
              Regularly review and adjust goals in response to changing market
              conditions or organizational priorities.
            </p>
          </div>
          <div className="border p-2  rounded-md w-full">
            <h2 className="text-sm font-semibold mb-5">Don&#39;ts</h2>
            <p className="text-[10px] font-thin mb-2  text-gray-600">
              <span className="text-[10px] mr-2 text-black font-semibold">
                •
              </span>{" "}
              Set too many goals, which can dilute focus and resources.
            </p>
            <p className="text-[10px] font-thin mb-2  text-gray-600">
              <span className="text-[10px] mr-2 text-black font-semibold">
                •
              </span>{" "}
              Set vague or unrealistic goals that are difficult to measure or
              achieve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessGoalBeforeData;
