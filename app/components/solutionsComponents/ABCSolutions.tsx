


import Image from 'next/image';
import waveLine from '@/public/assets/lines.svg'; // uploaded wave image
import assess from '@/public/assets/access.svg'
import blueprint from '@/public/assets/blueprint.svg'
import choreograph from '@/public/assets/choreograph.svg'


interface Module {
  title: string;
  image: string; 
  description: string;
  link: string;
}

const modules: Module[] = [
  {
    title: "Access",
    image:assess,
    description: "The Assess module analyzes both internal and external conditions to gain insights into challenges",
    link: "#"
  },
  {
    title: "Blueprint",
    image:blueprint,
    description: "The Blueprint module creates a vision and actionable business goals based on the Assess module outcomes",
    link: "#"
  },
  {
    title: "Choreograph",
    image:choreograph,
    description: "The Choreograph module operates as the conductor, ensuring that the identified strategic themes",
    link: "#"
  },
];

const ABCSolutions = () => {
  return (
    <section className="bg-[#FEEDD1] py-20 px-4 sm:px-8 relative text-black overflow-hidden">
      <div className="text-center mb-10 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          As Simple as <span className="bg-gradient-to-r from-[#0043E2] to-[#D95F8A] bg-clip-text font-extrabold text-transparent">ABC</span>
        </h2>

        <div className="w-full md:w-3/5 mx-auto py-10 md:py-20 flex gap-5 md:gap-10 items-center justify-center ">
          {["Assess", "Blueprint", "Choreograph"].map((label, i) => (
            <button
              key={i}
              className="w-full rounded-lg md:min-w-60 h-24 md:h-32 font-bold text-lg md:text-3xl px-2 bg-[#FFC35A] flex justify-center items-center"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center max-w-4xl mx-auto mb-16">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          How our solution help organizations<br /> shape their future
        </h3>
        <p className="text-gray-700 text-sm sm:text-base">
          Our approach combines industry expertise, cutting-edge technology, and innovative solutions to empower organizations to succeed.
          At the core of our solution are three modules: Assess, Blueprint, and Choreograph. These modules guide organizations through the
          journey of strategy development, communications, and translation into actions.
        </p>
      </div>

      {/* Card Section */}
      <div className="">
        

        



        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto relative">
            {/* Wave Image */}
        <div className=" hidden md:block absolute md:top-10 lg:top-7 opacity-35 md:left-30 lg:left-45 w-[70%] mx-auto z-30 pointer-events-none">
          <Image
            src={waveLine}
            alt="Wave"
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        {/* wave end  */}
          {modules.map((mod, index) => (
            <div
              key={index}
              className="bg-[#FFC35A] rounded-xl p-6 text-center shadow-md relative "
            >
              <div className="flex justify-center relative z-50 items-center mb-4">
                <div className="bg-[#FFC35A]  z-60 rounded-full p-3 shadow">
                    {/* i want to hide the wev image here  */}
                    {/* image  */}
                  <Image alt='mod-images' src={mod.image}/>
                </div>
              </div>
              {/* title  */}
              <h4 className="font-semibold text-black/80 text-xl mb-2">{mod.title}</h4>
              {/* description  */}
              <p className="text-sm text-gray-800">
                {mod.description}

                <a href={mod.link} className="text-blue-700 font-semibold">See More</a>
              </p>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default ABCSolutions;
