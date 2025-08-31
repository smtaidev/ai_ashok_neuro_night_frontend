// 'use client';
// import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import Image from 'next/image';
// import SpeedMeterPage from "./SpeedMeter";

// export default function OverviewContainerPage() {
//   const visionScore = 60
//   const accordionItems = [
//     {
//       value: "insight",
//       title: "Insight",
//       content: "Insight content goes here...",
//     },
//     {
//       value: "key-factors",
//       title: "Key Factors Impacting Strategy",
//       content: "Key Factors content goes here...",
//     },
//     {
//       value: "realignment",
//       title: "Realignment",
//       content: "Realignment content goes here...",
//     },
//     {
//       value: "future-outlook",
//       title: "Future Outlook: Strategic Trends",
//       content: "Future Outlook content goes here...",
//     },
//     {
//       value: "progress-overview",
//       title: "Progress Overview",
//       content: "Progress Overview content goes here...",
//     },
//   ]
//   // useEffect(() => {
//   //   if (!isUser) {
//   //     router.push(`/login?redirect=/dashboard/overview`);
//   //   } else {
//   //     // setIsLoading(true);
//   //   }
//   // }, [router, isUser]);

//   // if (!isLoading) {
//   //   return <Loading />;
//   // }
//   return (
//     <div className="p-6 space-y-6 bg-[#F5F7FA] min-h-screen">
//       <Card>
//         <CardHeader className="flex flex-col md:flex-row  md:justify-between gap-4">
//           <div className="flex items-start gap-4">
//             <Image
//               src="/image/dashboard-icon.png"
//               alt="dashboard icon"
//               width={48}
//               height={48}
//               className="size-20 text-blue-600"
//             />
//             <div>
//               <CardTitle className="text-xl font-bold text-gray-800">Vision</CardTitle>
//               <CardDescription className="text-gray-600 mt-1">
//                 A Vision provides direction, motivation, and reinforcement for decision-making.
//                 It inspires employees, differentiates the organization, and serves as a benchmark for measuring progress.
//                 Crafting a clear Vision statement ensures alignment, focus, and success.
//               </CardDescription>
//             </div>
//           </div>


//           {/* Vision Score */}
//           <div className="md:border-l-2 border-gray-200 pl-2">
//             <SpeedMeterPage score={visionScore} />
//           </div>
//         </CardHeader>
//       </Card>

//       {/* Accordion Sections */}
//       <Accordion type="multiple" className="w-full space-y-2">
//         {accordionItems.map((item) => (
//           <AccordionItem key={item.value} value={item.value} className="border-none">
//             <AccordionTrigger className="flex item-center gap-2 px-6 py-4 hover:no-underline hover:bg-gray-50 rounded-lg text-left font-medium">
//               <span className="text-sm font-semibold">{item.title}</span>
//               <div className="flex-1 h-px bg-gray-200 mt-2.5" />
//             </AccordionTrigger>
//             <AccordionContent className="px-6 pb-4 text-gray-600">
//               {item.content}
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </div>
//   )
// }


'use client';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from 'next/image';
import SpeedMeterPage from "./SpeedMeter";
import BusinessChallenges from "./(components)/BusinessChallengesDashboard";
import BusinessGoalsData from "./(components)/BusinessGoalsData";
import DifferentiationSection from "./(components)/DifferentiationSection";
import FinancialSnapshot from "./(components)/FinancialSnapshot";
import NewCapabilities from "./(components)/NewCapabilities";
import RegulatoryCompliance from "./(components)/RegulatoryCompliance";
import RisksSection from "./(components)/RisksSection";
import Roadblocks from "./(components)/Roadblocks";
import StrategicThemeData from "./(components)/StrategicThemeData";
import SwotAnalysis from "./(components)/SwotAnalysisData";
import TalentSection from "./(components)/TalentSection";
import TotalCapabilities from "./(components)/TotalCapabilities";
import MeetingsSection from "./(components)/UpcomingMeetingsDashboard";
import StrategicThemeContainerPage from "./(components)/reuseable/StrategicThemeContainer";
import KeyFactorsImpactingStrategy from "./(components)/KeyFactorsImpactingStrategy";
import Realignment from "./(components)/Realignment";
import FutureOutlookStrategicTrends from "./(components)/FutureOutlookStrategicTrends";
import ProgressOverview from "./(components)/ProgressOverview";


export default function OverviewContainerPage() {
  const visionScore = 60

  const accordionItems = [
    {
      value: "insight",
      title: "Insight",
      content: <StrategicThemeContainerPage />
      // <BusinessChallenges />, // ✅ render component
    },
    {
      value: "key-factors",
      title: "Key Factors Impacting Strategy",
      content: <KeyFactorsImpactingStrategy />,
    },
    {
      value: "realignment",
      title: "Realignment",
      content: <Realignment />,
    },
    {
      value: "future-outlook",
      title: "Future Outlook: Strategic Trends",
      content: <FutureOutlookStrategicTrends />,
    },
    {
      value: "progress-overview",
      title: "Progress Overview",
      content: (
        <ProgressOverview/>
      ),
    },
  ]

  return (
    <div className="p-6 space-y-6 bg-[#F5F7FA] min-h-screen">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <Image
              src="/image/dashboard-icon.png"
              alt="dashboard icon"
              width={48}
              height={48}
              className="size-20 text-blue-600"
            />
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">Vision</CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                A Vision provides direction, motivation, and reinforcement for decision-making.
                It inspires employees, differentiates the organization, and serves as a benchmark for measuring progress.
                Crafting a clear Vision statement ensures alignment, focus, and success.
              </CardDescription>
              <h1 className="text-red-500 text-center text-8xl">Working on it</h1>
            </div>
          </div>

          {/* Vision Score */}
          <div className="md:border-l-2 border-gray-200 pl-2">
            <SpeedMeterPage score={visionScore} />
          </div>
        </CardHeader>
      </Card>

      {/* Accordion Sections */}
      <Accordion type="multiple" className="w-full space-y-2">
        {accordionItems.map((item) => (
          <AccordionItem key={item.value} value={item.value} className="border-none">
            <AccordionTrigger className="flex item-center gap-2 px-6 py-4 hover:no-underline hover:bg-gray-50 rounded-lg text-left font-medium">
              <span className="text-sm font-semibold">{item.title}</span>
              <div className="flex-1 h-px bg-gray-200 mt-2.5" />
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-600">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
