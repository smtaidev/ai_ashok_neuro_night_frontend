
"use client";

import { useGetAiSwotQuery } from "@/redux/api/clarhetai-recomandation/clarhetaiApi";
import SWOTAnalysis from "./_components/SwotAnalysis";

import SwotStartPage from "./_components/SwotStartPage";

export default function SwotPage() {

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