// "use client";
// import React from "react";
// import BeforeAlignment from "./_components/BeforeBusinessGoal";
// import AfterBusinessGoal from "./_components/AfterBusinessGoal";
// import { useGetBusinessGoalsQuery } from "@/redux/api/blueprint/businessGoal/businessGoalApi";


// // API Response টাইপ ডিফাইন করলাম


// const BusinessGoals = () => {
//   const { data } =
//     useGetBusinessGoalsQuery();

//   console.log(
//     " ================================================>",
//     data,
//     "Business Goals Data"
//   );



//   if (data?.data?.length > 0) {
//     // return <AfterBusinessGoal businessGoals={data.data} />;
//     return (<div>
//       {JSON.stringify(data)}
//     </div>)
//   }

//   return <BeforeAlignment />;
// };

// export default BusinessGoals;
"use client";
import React from "react";
import BeforeAlignment from "./_components/BeforeBusinessGoal";
import AfterBusinessGoal from "./_components/AfterBusinessGoal";
import { useGetBusinessGoalsQuery } from "@/redux/api/blueprint/businessGoal/businessGoalApi";
import Loading from "../../loading";

// Type for Impact Ratings
interface ImpactRatings {
  risks: string;
  compliance: string;
  culture: string;
  change_management: string;
  l_and_d: string;
  capabilities: string;
  _id: string;
}

// Type for Each Business Goal
export interface BusinessGoal {
  _id: string;
  title: string;
  description: string;
  related_strategic_theme: string;
  priority: string;
  resource_readiness: string;
  assigned_functions: string[];
  duration: string;
  impact_ratings: ImpactRatings;
  esg_issues: string;
  new_capabilities_needed: string;
  existing_capabilities_to_enhance: string;
  capabilityDescription: string;
  capabilityEnhancement: string;
  capabilityInfluenced: string[];
  capabilityOwners: string[];
  capabilityType: string;
  changeTransformation: string;
  culturalRealignment: string;
  enhancementDetails: string;
  environmentalIssuesDetails: string;
  funding: number;
  goalOwner: string[];
  goalProgress: number;
  goalTimelineEnd: string; // ISO date string
  goalTimelineStart: string; // ISO date string
  goal_impact: string;
  hasTalent: string;
  isSpecificStrategic: string;
  newCapabilityName: string;
  otherDetails: string;
  regulatoryCompliance: string;
  resourcesDetails: string;
  risksChallenges: string;
  talentDetails: string;
}

// Type for API Response
export interface BusinessGoalResponse {
  success: boolean;
  message: string;
  data: BusinessGoal[];
}

const BusinessGoals = () => {
  const { data, isLoading } = useGetBusinessGoalsQuery<BusinessGoalResponse | any>();

  if (isLoading) return <Loading />;

  if (data?.data?.length > 0) {
    return <AfterBusinessGoal businessGoals={data.data} />;
  }
  return <BeforeAlignment />;
};

export default BusinessGoals;
