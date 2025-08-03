import React from "react";
import PricingBanner from "../../../components/web/pricingComponent/PricingBanner";
import WeGoBeyond from "../../../components/web/pricingComponent/WeGoBeyond";
import CostEfficiencySection from "./CostEfficiencySection";
import ExploreWithUs from "../../../components/web/pricingComponent/ExploreWithUs";

const page = () => {
  return <div>
    <PricingBanner></PricingBanner>
    <WeGoBeyond></WeGoBeyond>
    <CostEfficiencySection></CostEfficiencySection>
    <ExploreWithUs></ExploreWithUs>
  </div>;
};

export default page;
