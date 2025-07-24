import AdaptiveStrategiesSection from "./components/homeComponents/AdaptiveStrategiesSection";
import EscapeSlideSection from "./components/homeComponents/EscapeSlideSection";
import FeaturesSection from "./components/homeComponents/FeaturesSection";
import Hero from "./components/homeComponents/Hero";
import NoMoreComunication from "./components/homeComponents/NoMoreComunication";
import PrioritizeCulture from "./components/homeComponents/PrioritizeCulture";
import StrategyActionSection from "./components/homeComponents/StrategyActionSection";
import YouTubeKeyfrem from "./components/homeComponents/YouTubeKeyfrem";


export default function Home() {
  return (
    <div className="">
      <Hero/>
      <FeaturesSection></FeaturesSection>
      <YouTubeKeyfrem></YouTubeKeyfrem>
      <AdaptiveStrategiesSection></AdaptiveStrategiesSection>
      <StrategyActionSection></StrategyActionSection>
      <PrioritizeCulture></PrioritizeCulture>
      <NoMoreComunication></NoMoreComunication>
      <EscapeSlideSection></EscapeSlideSection>
    </div>
  );
}
