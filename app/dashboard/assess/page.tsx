import image from "@/public/image/assess-img.png"
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function assessPage() {

  return (
    <div className="  ">
      <div className="w-full md:h-[500px] space-y-6 bg-gray-50 p-6 md:flex rounded-lg shadow-md gap-4">
        {/* text left side  */}
        <div className="flex-1 space-y-4  md:text-left">
          <h1 className="text-3xl font-bold">Assess</h1>
          <p  className="text-sm text-gray-600 mt-2 leading-relaxed">Your compass for strategic excellence!</p>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">A robust strategy is imperative in the dynamic landscape of decision-making. Assess is designed to guide you through the <br /> intricacies of  decision-making by collecting relevant information and providing comprehensive insights across four vital <br /> elements: Trends, SWOT, Challenges, and Competitors Analysis.</p>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">In addition to these vital components, Assess has two additional components: Alignment and ClarhetAI Recommendations. <br /> Alignment ensures cohesion and  shared understanding among stakeholders regarding Trends, SWOT, Challenges, and <br /> Competitors Analysis. Meanwhile, the ClarhetAI Recommendations component showcases all recommendations generated <br /> by ClarhetAI.</p>
          
        </div>
        <div>
          <Image
            src={image}
            alt="Assessment Image"
            layout="responsive"
            width={400}
            height={500}
          />
        </div>
      </div>

      {/* core components of assess */}
    <div className="bg-gray-50 mt-6 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Core Components of Assess</h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        
        {/* 01 - Trends */}
        <div className="relative max-w-xl rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-white text-sm font-semibold">01</div>
              <h3 className="text-lg font-semibold text-gray-900">Trends</h3>
            </div>
            <p className="text-sm font-semibold text-gray-700 mt-1">Navigating the Future</p>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Stay ahead of the curve by exploring and understanding the latest trends shaping your industry. 
              The Trends section is your window to the future, allowing you to identify emerging opportunities 
              and potential disruptions. Embrace innovation, anticipate shifts, and transform challenges into 
              strategic advantages.
            </p>
          </div>
          <Link href={`/dashboard/assess/trends`}>
            <div className="absolute bottom-4 right-4 h-6 w-6 border-2 border-gray-400 rounded-full flex items-center justify-center cursor-pointer">
              <Plus className="w-4 h-4 text-gray-500" />
            </div>
          </Link>
        </div>

        {/* 02 - SWOT */}
        <div className="relative max-w-xl rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-white text-sm font-semibold">02</div>
              <h3 className="text-lg font-semibold text-gray-900">SWOT</h3>
            </div>
            <p className="text-sm font-semibold text-gray-700 mt-1">Uncover Strengths, Weaknesses, Opportunities, and Threats</p>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Stay ahead of the curve by exploring and understanding the latest trends shaping your industry. 
              The Trends section is your window to the future, allowing you to identify emerging opportunities 
              and potential disruptions. Embrace innovation, anticipate shifts, and transform challenges into 
              strategic advantages.
            </p>
          </div>
          <Link href={`/dashboard/assess/swot`}>
            <div className="absolute bottom-4 right-4 h-6 w-6 border-2 border-gray-400 rounded-full flex items-center justify-center cursor-pointer">
              <Plus className="w-4 h-4 text-gray-500" />
            </div>
          </Link>
        </div>

        {/* 03 - Challenges */}
        <div className="relative max-w-xl rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-white text-sm font-semibold">03</div>
              <h3 className="text-lg font-semibold text-gray-900">Challenges</h3>
            </div>
            <p className="text-sm font-semibold text-gray-700 mt-1">Confronting Roadblocks Head-On</p>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              In the journey towards success, challenges are inevitable. The Challenges section empowers you to 
              identify, analyze, and address obstacles that may impede progress. Turn hurdles into stepping 
              stones by crafting targeted actions that not only overcome challenges but also foster resilience 
              and adaptability.
            </p>
          </div>
          <Link href={`/dashboard/assess/challenges`}>
            <div className="absolute bottom-4 right-4 h-6 w-6 border-2 border-gray-400 rounded-full flex items-center justify-center cursor-pointer">
              <Plus className="w-4 h-4 text-gray-500" />
            </div>
          </Link>
        </div>

        {/* 04 - Competitor Analysis */}
        <div className="relative max-w-xl rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-white text-sm font-semibold">04</div>
              <h3 className="text-lg font-semibold text-gray-900">Competitor Analysis</h3>
            </div>
            <p className="text-sm font-semibold text-gray-700 mt-1">Understanding the Competitive Landscape</p>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              The competitor Analysis module provides essential insights by tracking and analyzing your 
              competitors relevant information. It is crucial for identifying and understanding competitive 
              positioning and making informed business decisions. It helps you stay ahead in your industry and 
              grow your business strategically.
            </p>
          </div>
          <Link href={`/dashboard/assess/competitors`}>
            <div className="absolute bottom-4 right-4 h-6 w-6 border-2 border-gray-400 rounded-full flex items-center justify-center cursor-pointer">
              <Plus className="w-4 h-4 text-gray-500" />
            </div>
          </Link>
        </div>

        {/* 05 - ClarretAI Recommendations */}
        <div className="relative max-w-xl rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-white text-sm font-semibold">05</div>
              <h3 className="text-lg font-semibold text-gray-900">ClarretAI Recommendations</h3>
            </div>
            <p className="text-sm font-semibold text-gray-700 mt-1">Strategic AI Insights</p>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Harness the power of artificial intelligence to elevate your strategy. The ClarretAI Recommendations 
              component considers all AI-generated recommendations from Trends, SWOT, Challenges, and Competitors 
              Analysis, providing a dynamic playbook for developing high-impact strategy.
            </p>
          </div>
          <Link href={`/dashboard/assess/clarhet-ai`}>
            <div className="absolute bottom-4 right-4 h-6 w-6 border-2 border-gray-400 rounded-full flex items-center justify-center cursor-pointer">
              <Plus className="w-4 h-4 text-gray-500" />
            </div>
          </Link>
        </div>

        {/* 06 - Alignment */}
        <div className="relative max-w-xl rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-white text-sm font-semibold">06</div>
              <h3 className="text-lg font-semibold text-gray-900">Alignment</h3>
            </div>
            <p className="text-sm font-semibold text-gray-700 mt-1">Ensuring Cohesion and Focus</p>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Achieving success requires alignment—shared priorities among all stakeholders. The Alignment section 
              helps ensure that every facet of your strategy is synchronized harmoniously and contributes cohesively 
              to the overarching mission.
            </p>
          </div>
          <Link href={`/dashboard/assess/alignment`}>
            <div className="absolute bottom-4 right-4 h-6 w-6 border-2 border-gray-400 rounded-full flex items-center justify-center cursor-pointer">
              <Plus className="w-4 h-4 text-gray-500" />
            </div>
          </Link>
        </div>

      </div>
    </div>

  <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-8">
        <p className="mt-4 text-sm text-gray-500">
        In essence, Assess is a strategic toolkit that empowers you to navigate the complexities of decision-making confidently. Use the insights gained from Trends, SWOT, Challenges, and Competitors Analysis to craft a robust strategy that not only guides you through current challenges but thrives in an ever-evolving business landscape.
      </p>
      
      <p className="mt-2 text-sm font-bold ">
        If you have any questions or need assistance, you can chat with ClarretAI to learn more, your strategic partner, who is available 24/7.
      </p>
    </div>

</div>
  );
}   