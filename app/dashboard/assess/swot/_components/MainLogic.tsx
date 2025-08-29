// "use client";


// import SwotStartPage from "./SwotStartPage";
// import SWOTAnalysis from "./SwotAnalysis";
// import { useGetSwotsQuery } from "@/redux/api/swot/swotApi";




// export default function MainLogic() {

// const {data: swotData} = useGetSwotsQuery();
//   // const { data: aiSwotData } = useGetAiSwotQuery();
// //  console.log("Ai swot", aiSwotData)
//  console.log("swotnormal data ", swotData)
//   return (
//     <div>
//       {swotData && swotData.length === 0 ? (
//         <SwotStartPage />
//       ) : (
//         <SWOTAnalysis />
//       )}
//     </div>
//   );
// }  




"use client";

import SwotStartPage from "./SwotStartPage";
import SWOTAnalysis from "./SwotAnalysis";
import { useGetSwotsQuery } from "@/redux/api/swot/swotApi";
import { useGetAiSwotQuery } from "@/redux/api/clarhetai-recomandation/clarhetaiApi";
// Uncomment if using this query
// import { useGetAiSwotQuery } from "@/redux/api/swot/aiSwotApi"; // Adjust path as needed

export default function MainLogic() {
  const { data: swotData, isLoading: isSwotLoading, isError: isSwotError } = useGetSwotsQuery();
  const { data: aiSwotData, isLoading: isAiLoading, isError: isAiError } = useGetAiSwotQuery();
  console.log("Ai swot", aiSwotData);
  console.log("swotnormal data ", swotData);

  if (isSwotLoading || isAiLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // Show StartPage on error (e.g., no login causing auth error) or if no data
  if (isSwotError || isAiError || !swotData?.data || swotData.data.length === 0) {
    return <SwotStartPage />;
  }

  return <SWOTAnalysis  />;
}


// "use client";

// import { useGetAiSwotQuery } from "@/redux/api/clarhetai-recomandation/clarhetaiApi";
// import SwotStartPage from "./SwotStartPage";
// import SWOTAnalysis from "./SwotAnalysis";
// import { useGetSwotsQuery } from "@/redux/api/swot/swotApi";

// export default function MainLogic() {
//   const { data: swotData } = useGetSwotsQuery();
//   const { data: aiSwotData } = useGetAiSwotQuery();
//   console.log("Ai swot", aiSwotData);
//   console.log("swotnormal data ", swotData);

//   const isSwotEmpty = () => {
//     if (!swotData || !swotData.data || swotData.data.length !== 0) {
//       return false;
//     }
//     const swot = swotData.data[0];
//     return (
//       swot.strengths.length === 0 &&
//       swot.weaknesses.length === 0 &&
//       swot.opportunities.length === 0 &&
//       swot.threats.length === 0
//     );
//   };

//   return (
//     <div>
//       {aiSwotData && isSwotEmpty() ? (
//         <SwotStartPage />
//       ) : (
//         <SWOTAnalysis />
//       )}
//     </div>
//   );
// }