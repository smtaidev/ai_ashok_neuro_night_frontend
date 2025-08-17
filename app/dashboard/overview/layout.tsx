import BusinessChallenges from "./_components/(components)/BusinessChallengesDashboard";
import BusinessGoals from "./_components/(components)/BusinessGoals";
import BusinessGoalsData from "./_components/(components)/BusinessGoalsData";
import ChangeManagement from "./_components/(components)/ChangeManagement";
import CompetitorAnalysis from "./_components/(components)/CompetitorAnalysis";
import CultureRealignment from "./_components/(components)/CultureRealignment";
import DifferentiationSection from "./_components/(components)/DifferentiationSection";
import FinancialSnapshot from "./_components/(components)/FinancialSnapshot";
import LearningAndDevelopment from "./_components/(components)/LearningAndDevelopment";
import NewCapabilities from "./_components/(components)/NewCapabilities";
import RecommendationsSection from "./_components/(components)/RecommendationsSection";
import RegulatoryCompliance from "./_components/(components)/RegulatoryCompliance";
import RisksSection from "./_components/(components)/RisksSection";
import Roadblocks from "./_components/(components)/Roadblocks";
import StrategicThemeData from "./_components/(components)/StrategicThemeData";
import SwotAnalysis from "./_components/(components)/SwotAnalysisData";
import TalentSection from "./_components/(components)/TalentSection";
import TotalCapabilities from "./_components/(components)/TotalCapabilities";
import TrendsCard from "./_components/(components)/TrendsCard";
import MeetingsSection from "./_components/(components)/UpcomingMeetingsDashboard";
import OverviewContainerPage from "./_components/overviewPage";

export const metadata = {
  title: "Dashboard : Overview",
  description: "Dashboard Overview Page",
};

export default function OverViewPage() {
  return (
    <div>
      <OverviewContainerPage />
      <div>
        <BusinessGoals/>
      </div>
    </div>
  );
}
