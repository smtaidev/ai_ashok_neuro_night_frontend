// pages/BusinessGoals.tsx
"use client";
import React, { useState, useEffect } from "react";
import BeforeAlignment from "./_components/BeforeBusinessGoal";
import AfterBusinessGoal from "./_components/AfterBusinessGoal"; // AfterBusinessGoal কম্পোনেন্ট ইম্পোর্ট করুন

const BusinessGoals = () => {
  const [hasGoals, setHasGoals] = useState(false);

  // localStorage চেক করে ডেটা আছে কি না দেখা
  useEffect(() => {
    const savedGoals = localStorage.getItem("businessGoalsData");
    if (savedGoals) {
      try {
        const parsedGoals = JSON.parse(savedGoals);
        setHasGoals(Array.isArray(parsedGoals) && parsedGoals.length > 0);
      } catch (error) {
        console.error("Failed to parse businessGoalsData:", error);
        setHasGoals(false);
      }
    }
  }, []);

  return (
    <div>
      {hasGoals ? <AfterBusinessGoal /> : <BeforeAlignment />}
    </div>
  );
};

export default BusinessGoals;