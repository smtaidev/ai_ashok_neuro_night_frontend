"use client";



import CallangeHomePage from "./_components/CallangeHomePage";
import CombinedChallengesComponent from "./_components/CombinedChallengesComponent";
import { useGetChallengesQuery } from "@/redux/api/challenge/challengeApi";

export default function ChallengePage() {
const { data, isLoading, error } = useGetChallengesQuery();
if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading challenges</div>;
  }

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






// "use client";

// import CallangeHomePage from "./_components/CallangeHomePage";
// import CombinedChallengesComponent from "./_components/CombinedChallengesComponent";
// import { useGetChallengesQuery } from "@/redux/api/challenge/challengeApi";

// export default function ChallengePage() {
//   const { data, isLoading, error } = useGetChallengesQuery();

//   // Check if data exists and has valid challenges
//   const hasValidChallenges = () => {
//     if (!Array.isArray(data?.data) || data.data.length === 0) {
//       return false;
//     }
    
//     // Additional check: see if any challenges have valid impactOnBusiness values
//     const validChallenges = data.data.filter(challenge => 
//       challenge.impactOnBusiness && 
//       challenge.impactOnBusiness.trim() !== ''
//     );
    
//     return validChallenges.length > 0;
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading challenges</div>;
//   }

//   return (
//     <div>
//       {!hasValidChallenges() ? (
//         <CallangeHomePage />
//       ) : (
//         <CombinedChallengesComponent />
//       )}
//     </div>
//   );
// }