'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Gauge } from "lucide-react"; // Icon used for Vision
import { cn } from "@/lib/utils";

export default function OverViewPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Vision Card */}
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
            <span className="text-lg font-bold text-green-600">60</span>
            <span className="text-xs text-muted-foreground text-center">
              A vision score of 60 or higher is considered a guiding and compelling vision.
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Accordion Sections */}
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="insight">
          <AccordionTrigger>Insight</AccordionTrigger>
          <AccordionContent>
            {/* Replace with actual content */}
            Insight content goes here...
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="key-factors">
          <AccordionTrigger>Key Factors Impacting Strategy</AccordionTrigger>
          <AccordionContent>
            Key Factors content goes here...
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="realignment">
          <AccordionTrigger>Realignment</AccordionTrigger>
          <AccordionContent>
            Realignment content goes here...
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="future-outlook">
          <AccordionTrigger>Future Outlook: Strategic Trends</AccordionTrigger>
          <AccordionContent>
            Future Outlook content goes here...
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="progress-overview">
          <AccordionTrigger>Progress Overview</AccordionTrigger>
          <AccordionContent>
            Progress Overview content goes here...
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
