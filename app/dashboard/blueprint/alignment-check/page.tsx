"use client";
import React from "react";
import AlignmentHeader from "./_component/AlignmentHeader";
import AlignmentCheck from "./_component/CheckAlign";

const AlignmentSection = () => {
  return (
    <div className="space-y-8 pl-6">
      {/* Heading */}
      <AlignmentHeader/>

      {/* Cards Section */}
      <AlignmentCheck/>
    </div>
  );
};

export default AlignmentSection;
