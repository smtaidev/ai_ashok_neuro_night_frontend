"use client";



import CallangeHomePage from "./_components/CallangeHomePage";
import CombinedChallengesComponent from "./_components/CombinedChallengesComponent";
import { useGetChallengesQuery } from "@/redux/api/challenge/challengeApi";

export default function ChallengePage() {
const { data, isLoading, error } = useGetChallengesQuery();

  return (
    <div>
      {Array.isArray(data?.data) && data.data.length === 0 ? (
        <CallangeHomePage />
      ) : (
        <CombinedChallengesComponent />
      )}
      
    </div>
  );
}  
