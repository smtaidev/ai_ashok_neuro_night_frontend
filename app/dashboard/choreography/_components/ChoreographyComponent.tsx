
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { GoPlusCircle } from "react-icons/go";

const coreComponents = [
  {
    id: "01",
    title: "Objectives",
    description:
      "The Objectives component of the Choreograph module plays a crucial role in fostering coherence and alignment across various departments and teams. It focuses on translating business goals into specific, actionable objectives tailored to individual functions or teams within the organization. This component ensures that each team member is part of a synchronized approach and understands how their actions contribute to achieving the overall business strategy.",
    link: "/dashboard/choreography/objectives",
  },
  {
    id: "02",
    title: "Teams",
    description:
      "The Teams component of the Choreograph module focuses on organizing and assembling the required talent to achieve the identified objectives. The component involves assigning individuals and teams to identified objectives. Moreover, this section provides insight into the team's composition, enabling members to comprehend their interdependencies and promote cross-functional collaboration as required. The Teams section helps leaders make informed decisions regarding resource allocation, skill development, and team optimization, which enhances overall organizational effectiveness and agility.",
    link: "/dashboard/choreography/teams",
  },
  {
    id: "03",
    title: "Alignment Check",
    description:
      "The Alignment Check component of the Choreograph module focuses on ensuring that all teams and individuals are aligned with the identified objectives. This component involves regular check-ins and assessments to gauge progress, identify roadblocks, and realign efforts as necessary. The Alignment Check section promotes transparency and accountability, enabling teams to stay on track and make informed adjustments to their plans. By fostering a culture of continuous alignment, organizations can enhance collaboration and drive successful outcomes.",
    link: "/dashboard/choreography/alignment-check",
  },
];

export default function ChoreographyComponent() {
  return (
    <div className="dashboard-container">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <CardTitle className="md:text-2xl text-lg font-bold text-gray-900">
              Welcome to Choreograph
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              The Choreograph module is the hub for orchestrating the execution of business goals. It operates as the conductor, ensuring that identified strategic themes and business goals are translated into actionable plans and supported by well-aligned teams. Divided into two pivotal components—Objectives and Teams—the Choreograph module offers a structured approach to translating business goals into manageable tasks and assembling teams capable of executing them effectively.
              <br />
              <br />
              By leveraging this module, organizations can instill clarity, alignment, and synergy across teams, driving toward the achievement of strategic themes and business goals.
            </CardDescription>
          </div>
          <div>
            <Image
              src="/image/choreograph-img-1.png"
              alt="dashboard icon"
              width={900}
              height={900}
              className="rounded-lg"
            />
          </div>
        </CardHeader>
      </Card>

      <div className="p-6 bg-white rounded-lg shadow-md ">
        <h1 className="md:text-2xl text-lg font-bold text-gray-900">
          Core Component of Foundation
        </h1>
        <div className="flex flex-col md:flex-row gap-6 mt-4 space-y-4 md:space-y-0">
          {coreComponents.map((component) => (
            <Card
              key={component.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="default"
                    className="bg-[#22398A] hover:bg-[#22398A] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold"
                  >
                    {component.id}
                  </Badge>
                  <h3 className="md:text-xl text-base font-bold text-gray-900">
                    {component.title}
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {component.description}
                </p>
                <div className="flex items-center justify-end">
                  {
                    component.link ? (
                      <Link
                        href={component.link}
                        className="text-[#22398A] flex items-center gap-2"
                      >
                        <GoPlusCircle className="size-8" />
                      </Link>
                    ) : null
                  }
                </div>
              </CardContent>

            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}






