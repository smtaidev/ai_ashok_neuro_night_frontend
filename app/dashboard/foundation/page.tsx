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
    title: "Identity",
    description:
      "Your company's identity is its unique DNA in the business world. It encompasses your mission, values, and purpose. Through the Identity component of the Foundation module, you'll define what sets your company apart, clarifying your purpose and aligning your actions with your core beliefs. It helps you establish a clear direction and build authentic connections with your audience.",
    link: "/dashboard/foundation/identity",
  },
  {
    id: "02",
    title: "Zero In",
    description:
      "Focus is key in a sea of possibilities. The Zero In component helps you sharpen your strategic focus by identifying your target customer and defining a value proposition. This component enables you to streamline your efforts, optimize your approach and achieve meaningful results with precision.",
    link: "/dashboard/foundation/zero-in",
  },
  {
    id: "03",
    title: "Capability",
    description:
      "Your company's capabilities are its unique strengths and competencies. The Capability component of the Foundation module helps you identify and leverage these strengths to drive competitive advantage. By understanding your core and differentiating capabilities, you can tailor your offerings, optimize your operations, and outperform the competition. This component empowers you to build on your strengths, address weaknesses, and position your company for sustained success.",
    link: "/dashboard/foundation/capability",
  },
];

const FoundationPage = () => {
  return (
    <div className="dashboard-container">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <CardTitle className="md:text-2xl text-lg font-bold text-gray-900">
              Welcome to Foundation
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              The cornerstone of your company&apos;s strategic success! In the
              dynamic business landscape, having a solid base is paramount to
              navigating challenges and seizing opportunities with confidence.
              That&apos;s where the Foundation module empowers your organization to
              define and fortify its fundamental Components for enduring
              success.
              <br />
              <br />
              At the heart of Foundations lie three elements designed to help
              your company crystallize its Identity, Zero in on efforts, and
              define core and differentiating Capabilities.
            </CardDescription>
          </div>
          <div>
            <Image
              src="/image/foundation-img.png"
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
  );
};

export default FoundationPage;
