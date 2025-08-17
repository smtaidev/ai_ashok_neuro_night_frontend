// 'use client'

// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import Modal from "./visionModal";
// import Drawer from "./DrawarModal";
// import { VisionHTML } from "@/public/static-json-data/blueprint/blueprint-vision";
// import StrategicTheme from "@/public/static-json-data/blueprint/strategic-theme";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// const SharedModalButton = ({ label }: { label: string }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [visionText, setVisionText] = useState("");
//   const [infoData, setInfoData] = useState<any>(null);

//   const pathname = usePathname();

//   const handleSend = async () => {
//     try {
//       if (pathname === "/dashboard/blueprint/vision") {
//         const res = await fetch(`${BASE_URL}/blueprint/create-vison`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ vision: visionText }),
//         });

//         if (!res.ok) {
//           throw new Error("Failed to create vision");
//         }

//         const data = await res.json();
//         console.log("Vision saved:", data);
//       }

//       // You can add other conditions here:
//       // else if (pathname === "/dashboard/blueprint/strategic-themes") { ... }

//       setIsModalOpen(false);
//       setVisionText("");
//     } catch (err) {
//       console.error("Error saving data:", err);
//     }
//   };

//   const handleMoreInfo = () => {
//     setIsDrawerOpen(true);

//     if (pathname === "/dashboard/blueprint/vision") {
//       setInfoData(<VisionHTML />);
//     } else if (pathname === "/dashboard/blueprint/strategic-themes") {
//       setInfoData(<StrategicTheme />);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="bg-blue-900 text-white py-2 px-4 rounded-xl my-5 flex items-center gap-2 font-semibold"
//       >
//         <span className="text-2xl font-[300]">+</span> {label}
//       </button>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Create Your Vision"
//         onSend={handleSend}
//         onMoreInfo={handleMoreInfo}
//       >
//         <textarea
//           value={visionText}
//           onChange={(e) => setVisionText(e.target.value)}
//           placeholder="Create vision..."
//           className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </Modal>

//       <Drawer
//         isOpen={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         title="Vision"
//       >
//         {infoData ? (
//           <div>{infoData}</div>
//         ) : (
//           <p>Loading data...</p>
//         )}
//       </Drawer>
//     </>
//   );
// };

// export default SharedModalButton;


"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Modal from "./visionModal";
import Drawer from "./DrawarModal";
import { VisionHTML } from "@/public/static-json-data/blueprint/blueprint-vision";
import StrategicTheme from "@/public/static-json-data/blueprint/strategic-theme";
import { useCreateVisionMutation } from "@/redux/api/blueprint/vison/visonApi";

const SharedModalButton = ({ label }: { label: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [visionText, setVisionText] = useState("");
  const [infoData, setInfoData] = useState<any>(null);

  const pathname = usePathname();
  const [createVision, { isLoading }] = useCreateVisionMutation();

  const handleSend = async () => {
    try {
      if (pathname === "/dashboard/blueprint/vision") {
        await createVision({ vision: visionText }).unwrap();
        console.log("Vision created successfully");
      }

      // other conditions (themes, etc.) can be added later

      setIsModalOpen(false);
      setVisionText("");
    } catch (error) {
      console.error("Error creating vision:", error);
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
        {infoData ? (
          <div>{infoData}</div>
        ) : (
          <p>Loading data...</p>
        )}
      </Drawer>
    </>
  );
};

export default SharedModalButton;
