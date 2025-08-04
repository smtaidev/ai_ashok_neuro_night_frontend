"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import SpeedMeterPage from "./_components/SpeedMeter"
import Image from 'next/image';

export default function OverViewPage() {
  const visionScore = 60

  // Accordion section content
  const accordionItems = [
    {
      value: "insight",
      title: "Insight",
      content: "Insight content goes here...",
    },
    {
      value: "key-factors",
      title: "Key Factors Impacting Strategy",
      content: "Key Factors content goes here...",
    },
    {
      value: "realignment",
      title: "Realignment",
      content: "Realignment content goes here...",
    },
    {
      value: "future-outlook",
      title: "Future Outlook: Strategic Trends",
      content: "Future Outlook content goes here...",
    },
    {
      value: "progress-overview",
      title: "Progress Overview",
      content: "Progress Overview content goes here...",
    },
  ]

  return (
    <div className="p-6 space-y-6 bg-[#F5F7FA] min-h-screen">
      <Card>
        <CardHeader className="flex flex-col md:flex-row  md:justify-between gap-4">
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


