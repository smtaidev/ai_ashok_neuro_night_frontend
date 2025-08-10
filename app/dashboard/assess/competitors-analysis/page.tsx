


import MergedDashboard from "./_components/CompetitorsDashboard";
import CompetitiveAnalysisForm from "./_components/CompetitorsGetPage";
import CompetitorsHomePage from "./_components/CompetitorsHomePage";


export default function CompetitorsAnalysisPage() {

  
  const mediaCoverage = [
   
  ]
  
  return (
    <div>
    {/* {mediaCoverage.length==0&&  <CompetitorsHomePage />}

    { mediaCoverage.length !==0 && <MergedDashboard />}
    { mediaCoverage.length !==0 &&
      <CompetitiveAnalysisForm />
     
    } */}
     <CompetitorsHomePage />
    <CompetitiveAnalysisForm />
    <MergedDashboard />
    </div>
  );
}  
