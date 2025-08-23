"use client";

import { useGetAiSwotQuery } from "@/redux/api/clarhetai-recomandation/clarhetaiApi";
import SwotStartPage from "./SwotStartPage";
import SWOTAnalysis from "./SwotAnalysis";




export default function MainLogic() {

  const {data: swotData} = useGetAiSwotQuery();
  console.log(swotData);
  return (
    <div>
      {swotData && swotData.length === 0 ? (
        <SwotStartPage />
      ) : (
        <SWOTAnalysis />
      )}
    </div>
  );
}  