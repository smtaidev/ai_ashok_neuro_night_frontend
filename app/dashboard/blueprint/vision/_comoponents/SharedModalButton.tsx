"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Modal from "./visionModal";
import Drawer from "./DrawarModal";
import { VisionHTML } from "@/public/static-json-data/blueprint/blueprint-vision";
import StrategicTheme from "@/public/static-json-data/blueprint/strategic-theme";
import { useCreateVisionMutation } from "@/redux/api/blueprint/vison/visonApi";
import toast from "react-hot-toast"; // ✅ import toast

const SharedModalButton = ({ label }: { label: string }) => {
  const pathname = usePathname();
  console.log(pathname, "pathname");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [visionText, setVisionText] = useState("");
  const [infoData, setInfoData] = useState<any>(null);

  const [createVision, { isLoading }] = useCreateVisionMutation();

  console.log(visionText, "visionText");
  const handleSend = async () => {
    try {
      if (pathname === "/dashboard/blueprint/vision") {
        await createVision({ vision: visionText }).unwrap();
        toast.success("Vision created successfully "); // ✅ success toast
      }

      // future: add more conditions for other routes
      setIsModalOpen(false);
      // setVisionText("");
    } catch (error) {
      console.error("Error creating vision:", error);
      toast.error("Failed to create vision "); // ✅ error toast
    }
  };

  const handleMoreInfo = () => {
    setIsDrawerOpen(true);

    if (pathname === "/dashboard/blueprint/vision") {
      setInfoData(<VisionHTML />);
    } else if (pathname === "/dashboard/blueprint/strategic-themes") {
      setInfoData(<StrategicTheme />);
    }
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
        {isLoading && <p className="text-sm text-gray-500 mt-2">Saving...</p>}
      </Modal>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Vision"
      >
        {infoData ? <div>{infoData}</div> : <p>Loading data...</p>}
      </Drawer>
    </>
  );
};

export default SharedModalButton;
