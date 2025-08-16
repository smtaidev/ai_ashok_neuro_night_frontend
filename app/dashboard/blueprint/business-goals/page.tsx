// pages/BusinessGoals.tsx
"use client";
import React, { useState, useEffect } from "react";
import BeforeAlignment from "./_components/BeforeBusinessGoal";
import AfterBusinessGoal from "./_components/AfterBusinessGoal"; // AfterBusinessGoal কম্পোনেন্ট ইম্পোর্ট করুন

const BusinessGoals = () => {
  const [hasGoals, setHasGoals] = useState('');

  // // localStorage চেক করে ডেটা আছে কি না দেখা
  // useEffect(() => {
  //   const savedGoals = localStorage.getItem("businessGoalsData");
  //   if (savedGoals) {
  //     try {
  //       const parsedGoals = JSON.parse(savedGoals);
  //       // console.log("ksldfjlsakjf", parsedGoals);
  //       setHasGoals(JSON.stringify(parsedGoals)); // যদি ডেটা থাকে তবে hasGoals কে true করুন
  //     } catch (error) {
  //       console.error("Failed to parse businessGoalsData:", error);
  //       setHasGoals('');
  //     }
  //   }
  // }, []);

  return (
    <div>
      {hasGoals ? <AfterBusinessGoal /> : <BeforeAlignment />}
    </div>
  );
};

export default BusinessGoals;


// {
//   "title": "Expand Cloud Services in Latin America",
//   "description": "Broaden our cloud service offerings across three new Latin American markets by end of year.",
//   "related_strategic_theme": "Digital Transformation",
//   "priority": "High",
//   "resource_readiness": "No",
//   "assigned_functions": [
//     "Product",
//     "Engineering",
//     "Sales"
//   ],
//   "duration": "Long-term",
//   "impact_ratings": {
//     "risks": "High",
//     "compliance": "Medium",
//     "culture": "Low",
//     "change_management": "High",
//     "l_and_d": "Medium",
//     "capabilities": "High"
//   },
//   "esg_issues": "Yes",
//   "new_capabilities_needed": "Yes",
//   "existing_capabilities_to_enhance": "No"
// }