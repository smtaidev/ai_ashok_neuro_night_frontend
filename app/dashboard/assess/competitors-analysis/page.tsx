

import MergedDashboard from "./_components/CompetitorsDashboard";
import CompetitiveAnalysisForm from "./_components/CompetitorsGetPage";
import CompetitorsGetPage from "./_components/CompetitorsGetPage";
import CompetitorsHomePage from "./_components/CompetitorsHomePage";


export default function CompetitorsAnalysisPage() {
  return (
    <div>
      <CompetitorsHomePage />
      <MergedDashboard />
      <CompetitiveAnalysisForm />
     

    </div>
  );
}  
