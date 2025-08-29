  

// "use client";
// import CallangeHomePage from "./_components/CallangeHomePage";
// import CombinedChallengesComponent from "./_components/CombinedChallengesComponent";
// import { useGetChallengesQuery } from "@/redux/api/challenge/challengeApi";

// export default function ChallengePage() {
//   const { data, isLoading, error } = useGetChallengesQuery();

//   console.log("challange  normal data ", data)
//   if (isLoading) {
//       return <div>Loading...</div>;
//     }
//     if (error) {
//       return <div>Error loading challenges</div>;
//     }

//     return (
//       <div>
//         {data?.data?.challenge?.length === 0 ? (
//           <CallangeHomePage />
//         ) : (
//           <CombinedChallengesComponent />
//         )}
        
//       </div>
//     );
//   }  




"use client";
import CallangeHomePage from "./_components/CallangeHomePage";
import CombinedChallengesComponent from "./_components/CombinedChallengesComponent";
import { useGetChallengesQuery } from "@/redux/api/challenge/challengeApi";

export default function ChallengePage() {
  const { data, isLoading, error } = useGetChallengesQuery();

  console.log("challange normal data ", data)
  if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error loading challenges</div>;
    }

    return (
      <div>
        {!data?.data?.challenge || data?.data?.challenge.length === 0 ? (
          <CallangeHomePage />
        ) : (
          <CombinedChallengesComponent />
        )}
        
      </div>
    );
  }