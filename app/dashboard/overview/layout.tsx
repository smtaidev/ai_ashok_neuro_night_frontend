import BusinessChallenges from "./_components/(components)/BusinessChallengesDashboard";
import BusinessGoalsData from "./_components/(components)/BusinessGoalsData";
import DifferentiationSection from "./_components/(components)/DifferentiationSection";
import FinancialSnapshot from "./_components/(components)/FinancialSnapshot";
import NewCapabilities from "./_components/(components)/NewCapabilities";
import RegulatoryCompliance from "./_components/(components)/RegulatoryCompliance";
import RisksSection from "./_components/(components)/RisksSection";
import Roadblocks from "./_components/(components)/Roadblocks";
import StrategicThemeData from "./_components/(components)/StrategicThemeData";
import SwotAnalysis from "./_components/(components)/SwotAnalysisData";
import TalentSection from "./_components/(components)/TalentSection";
import TotalCapabilities from "./_components/(components)/TotalCapabilities";
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
    </div>
  );
}
