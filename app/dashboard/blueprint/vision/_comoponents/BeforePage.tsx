// app/before-page.tsx or wherever it's located
import Image from "next/image";
import visionImage from "@/public/image/blueprint-img.png";
import VisionButton from "./SharedModalButton";

const BeforePage = () => {
  return (
    <div className="bg-blue-50/50 min-h-[calc(100vh-65px)] p-5">
      <div className="space-y-10 p-5 bg-white rounded-2xl border border-gray-200">
        <h1 className="text-xl font-bold">Vision</h1>
        <div className="flex justify-center w-8/12 mx-auto items-center flex-col">
          <Image src={visionImage} className="w-full" alt="vision image" />
          <h1 className="py-10 text-sm lg:text-base">
            A Vision provides direction, motivation, and reinforcement for
            decision-making. It inspires employees, differentiates the
            organization, and serves as a benchmark for measuring progress.
            Crafting a clear Vision statement ensures alignment, focus, and
            success.
          </h1>

          {/* Now using the client component */}
          <VisionButton label="Lets create the vision!" />
        </div>
      </div>
    </div>
  );
};

export default BeforePage;
