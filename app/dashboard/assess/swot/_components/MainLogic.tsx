// "use client";

// import { useGetAiSwotQuery } from "@/redux/api/clarhetai-recomandation/clarhetaiApi";
// import SwotStartPage from "./SwotStartPage";
// import SWOTAnalysis from "./SwotAnalysis";
// import { useGetSwotsQuery } from "@/redux/api/swot/swotApi";




// export default function MainLogic() {

// const {data: swotData} = useGetSwotsQuery();
//   const { data: aiSwotData } = useGetAiSwotQuery();
//  console.log("Ai swot", aiSwotData)
//  console.log("swotnormal data ", swotData)
//   return (
//     <div>
//       {aiSwotData && aiSwotData.length === 0 ? (
//         <SwotStartPage />
//       ) : (
//         <SWOTAnalysis />
//       )}
//     </div>
//   );
// }  


"use client";

import { useGetAiSwotQuery } from "@/redux/api/clarhetai-recomandation/clarhetaiApi";
import SwotStartPage from "./SwotStartPage";
import SWOTAnalysis from "./SwotAnalysis";
import { useGetSwotsQuery } from "@/redux/api/swot/swotApi";

export default function MainLogic() {
  const { data: swotData } = useGetSwotsQuery();
  const { data: aiSwotData } = useGetAiSwotQuery();
  console.log("Ai swot", aiSwotData);
  console.log("swotnormal data ", swotData);

  const isSwotEmpty = () => {
    if (!swotData || !swotData.data || swotData.data.length !== 1) {
      return false;
    }
    const swot = swotData.data[0];
    return (
      swot.strengths.length === 0 &&
      swot.weaknesses.length === 0 &&
      swot.opportunities.length === 0 &&
      swot.threats.length === 0
    );
  };

  return (
    <div>
      {aiSwotData && isSwotEmpty() ? (
        <SwotStartPage />
      ) : (
        <SWOTAnalysis />
      )}
    </div>
  );
}