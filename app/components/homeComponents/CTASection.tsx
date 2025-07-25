import paperPlane from "@/public/assets/send_img.svg"; // make sure this image is added
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";

const CTASection = () => {
  return (
    <div className="px-4 md:px-8 py-10">
      <div className="bg-blue-600 max-w-7xl mx-auto rounded-xl p-6 sm:p-10 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6 text-white">
        {/* Text & Button */}
        <div className="sm:w-[60%]">
          <h2 className="text-base sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed mb-6">
            Ready to turn your business strategy into a success story? Dive into
            our user-friendly platform, designed to help you make your
            aspirations a reality.
          </h2>
          <a
            href="get-a-demo"
            className="btn flex w-fit pt-3 pb-2 px-4 text-center gap-2 text-blue-700 bg-white font-semibold rounded-lg  hover:bg-whte/20 transition-colors duration-300 transform hover:scale-105"
          >
            Get Started
            <GoArrowUpRight className="ml-2" size={30} />
          </a>
        </div>

        {/* Image with Dashed Path */}
        <div className="sm:w-[40%]">
          <Image src={paperPlane} alt="paper plane" className="" />
        </div>
      </div>
    </div>
  );
};

export default CTASection;
