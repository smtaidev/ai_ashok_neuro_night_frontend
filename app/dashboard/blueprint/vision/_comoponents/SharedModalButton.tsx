'use client'

import { usePathname } from "next/navigation";
import { useState } from "react";
import Modal from "./visionModal";
import Drawer from "./DrawarModal";
import { VisionHTML } from "@/public/static-json-data/blueprint/blueprint-vision";
import StrategicTheme from "@/public/static-json-data/blueprint/strategic-theme";

const SharedModalButton = ({ label }: { label: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [visionText, setVisionText] = useState("");
  const [infoData, setInfoData] = useState<any>(null);

  const pathname = usePathname();

  const handleSend = () => {
    console.log("Vision:", visionText);
    setIsModalOpen(false);
    setVisionText("");
  };

  const handleMoreInfo = () => {
    setIsDrawerOpen(true);

    // Choose data based on pathname
    if (pathname === "/dashboard/blueprint/vision") {
      setInfoData(<VisionHTML />);
    }
    else if (pathname === "/dashboard/blueprint/strategic-themes") {
      setInfoData(<StrategicTheme />);
    }
    // else {
    //   setInfoData(defaultData);
    // }
  };


  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-900 text-white py-2 px-4 rounded-xl my-5 flex items-center gap-2 font-semibold"
      >
        <span className="text-2xl font-[300]">+</span> {label}
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Your Vision"
        onSend={handleSend}
        onMoreInfo={handleMoreInfo}
      >
        <textarea
          value={visionText}
          onChange={(e) => setVisionText(e.target.value)}
          placeholder="Create vision..."
          className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Modal>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Vision"
      >
        {infoData ? (
          // <pre className="text-sm">{JSON.stringify(infoData, null, 2)}</pre>
          <div>{infoData}</div>
        ) : (
          <p>Loading data...</p>
        )}
      </Drawer>
    </>
  );
};

export default SharedModalButton;
