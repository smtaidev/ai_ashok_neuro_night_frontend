import { Button } from "@/components/ui/button";
import AdaptiveStrategiesSection from "../components/web/homeComponents/AdaptiveStrategiesSection";
import CTASection from "../components/web/homeComponents/CTASection";
import EscapeSlideSection from "../components/web/homeComponents/EscapeSlideSection";
import FeaturesSection from "../components/web/homeComponents/FeaturesSection";
import Hero from "../components/web/homeComponents/Hero";
import NoMoreComunication from "../components/web/homeComponents/NoMoreComunication";
import PrioritizeCulture from "../components/web/homeComponents/PrioritizeCulture";
import StrategyActionSection from "../components/web/homeComponents/StrategyActionSection";
import StatsBanner from "../components/web/homeComponents/TodaysUpdateSection";
import WhyClarhetSection from "../components/web/homeComponents/WhyClarhetSection";
import YouTubeKeyfrem from "../components/web/homeComponents/YouTubeKeyfrem";


export default function Home() {
  return (
    <div className="">
      <Hero />
      <Button className="text-red-400">Test Button</Button>
      <FeaturesSection></FeaturesSection>
      <YouTubeKeyfrem></YouTubeKeyfrem>
      <AdaptiveStrategiesSection></AdaptiveStrategiesSection>
      <StrategyActionSection></StrategyActionSection>
      <PrioritizeCulture></PrioritizeCulture>
      <NoMoreComunication></NoMoreComunication>
      <EscapeSlideSection></EscapeSlideSection>
      <WhyClarhetSection></WhyClarhetSection>
      <StatsBanner></StatsBanner>
      <CTASection></CTASection>
    </div>
  );
}
