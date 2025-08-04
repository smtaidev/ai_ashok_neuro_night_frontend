import React from "react";
import { CiCirclePlus } from "react-icons/ci";

const CoreComponents= () => {
  type Data = {
    title: string;
    subtitle: string;
    description: string;
  };
    
const data:Data[] = [
  {
    title: "Vision",
    subtitle: "Picturing Tomorrow, Today",
    description:
      "At the core of Blueprint is the Vision; your organization is a forward-looking compass. Imagine the future, articulate your aspirations, and define the destination towards which your organization strives. It isn't just a vision; it's a magnetic force propelling your strategy toward unprecedented excellence.",
  },
  {
    title: "Strategic Themes",
    subtitle: "Foundations of Resilience and Innovation",
    description:
      "Strategic Themes are high-level, overarching areas of focus that guide an organization's actions and decision-making. They are broad, often qualitative, statements that capture the key priorities and goals the organization aims to address to achieve its Vision. Strategic Themes help align various initiatives and activities throughout the organization and reflect its strategic choices.",
  },
  {
    title: "Business Goals",
    subtitle: "Summit of Strategic Achievement",
    description:
      "Climb to the top of strategic success with Business Goals—the summits we aim for with every effort. In the Blueprint module, each goal is a key step that reflects the organization's shared Vision and efforts. Clear goal setting ensures that the organization stays aligned with the Vision and syncs with Strategic Themes.",
  },
];


  return (
    <div className='space-y-10 p-10 bg-white rounded-2xl border border-gray-200 mt-5'>
      <h1 className="p-2 text-2xl font-bold">Core Components of Blueprint</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item, index) => (
          
      <div key={index} className="relative w-full  mx-auto p-6 bg-white rounded-2xl border border-gray-200">
        {/* Card Header */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-800 text-white font-bold text-lg">
            {index + 1}
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{item?.title}</h2>
            <p className="font-thin text-xs text-gray-500">{item?.subtitle}</p>
          </div>
        </div>

        {/* Card Body */}
        <div className=" md:text-xs lg:text-sm leading-relaxed mb-6">
          <p>
            {item?.description}
          </p>
        </div>

        {/* Plus Icon */}
        <div className="absolute bottom-6 right-6">
          <CiCirclePlus className="text-blue-800 w-8 h-8"/> 
        </div>
      </div>

        ))}
      </div>
    </div>
  );
};

export default CoreComponents;
