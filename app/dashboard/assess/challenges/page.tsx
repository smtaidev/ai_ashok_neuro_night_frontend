import ChallengesSummarry from "./_components/ChallengesSummarry";

import CallangeHomePage from "./_components/CallangeHomePage";
import ChallengesDashboard from "./_components/ChallengesDashboard";

export default function ChallengePage() {
  return (
    <div>
      <CallangeHomePage />
      <ChallengesSummarry />
      <ChallengesDashboard />
    </div>
  );
}  
