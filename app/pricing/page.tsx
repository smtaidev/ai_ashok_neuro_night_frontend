import React from "react";
import PricingBanner from "../components/pricingComponent/PricingBanner";
import WeGoBeyond from "../components/pricingComponent/WeGoBeyond";
import CostEfficiencySection from "./CostEfficiencySection";
import ExploreWithUs from "../components/pricingComponent/ExploreWithUs";

const page = () => {
  return <div>
    <PricingBanner></PricingBanner>
    <WeGoBeyond></WeGoBeyond>
    <CostEfficiencySection></CostEfficiencySection>
    <ExploreWithUs></ExploreWithUs>
  </div>;
};

export default page;
