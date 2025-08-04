// "use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Gauge } from "lucide-react"

export default function OverViewPage() {
  const visionScore = 60

  const pointerAngle = (visionScore / 100) * 180

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
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-md">
              <Gauge className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle>Vision</CardTitle>
              <CardDescription>
                A Vision provides direction, motivation, and reinforcement for decision-making.
                It inspires employees, differentiates the organization, and serves as a benchmark for measuring progress.
                Crafting a clear Vision statement ensures alignment, focus, and success.
              </CardDescription>
            </div>
          </div>

          {/* Vision Score */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold">Vision Score</span>
            <div className="relative w-32 h-16">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#84cc16"
                  strokeDasharray="120"
                  strokeDashoffset="60"
                  strokeWidth="10"
                />
                <circle cx="60" cy="20" r="4" fill="#000" />
              </svg>
            </div>
            <span className="text-lg font-bold text-green-600">{visionScore}</span>
            <span className="text-xs text-muted-foreground text-center">
              A vision score of 60 or higher is considered a guiding and compelling vision.
            </span>
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


