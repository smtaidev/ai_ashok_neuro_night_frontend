"use client";

import { useState } from "react";
import Modal from "./visionModal";
import Drawer from "./DrawarModal";


const VisionButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [visionText, setVisionText] = useState("");
  const [infoData, setInfoData] = useState<any>(null);

  const handleSend = () => {
    console.log("Vision:", visionText);
    setIsModalOpen(false);
    setVisionText("");
  };

  const handleMoreInfo = async () => {
    setIsDrawerOpen(true);

    // Example backend fetch
    // try {
    //   const res = await fetch("#");
    //   const data = await res.json();
    //   setInfoData(data);
    // } catch (err) {
    //   console.error("Failed to fetch data:", err);
    // }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-900 text-white py-2 px-4 rounded-xl my-5 flex items-center gap-2 font-semibold"
      >
        <span className="text-2xl font-[300]">+</span> Lets create the vision!
      </button>

      {/* Main Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Your Vision"
        onSend={handleSend}
        onMoreInfo={handleMoreInfo} // <-- Trigger drawer
      >
        <textarea
          value={visionText}
          onChange={(e) => setVisionText(e.target.value)}
          placeholder="Create vision..."
          className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </Modal>

      {/* Right-Side Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="More Information">
        {infoData ? (
          <pre className="text-sm">{JSON.stringify(infoData, null, 2)}</pre>
        ) : (
          <p>Loading data...</p>
        )}
      </Drawer>
    </>
  );
};

export default VisionButton;
