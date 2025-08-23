// "use client";
// import Image from "next/image";
// import image from "@/public/image/strategic-themes-img.png";

// import SharedDrawerButton from "../../_components/reuseable/SharedDrawerButton";
// import { useState } from "react";
// import StrategicThemeSlided from "@/public/static-json-data/blueprint/strategic-theme";

// const StrategicThemeBefore = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Separate states for title and details
//   const [themeTitle, setThemeTitle] = useState("");
//   const [themeDetails, setThemeDetails] = useState("");

//   /** Save data and close modal */
//   const handleSave = () => {
//     console.log("Strategic Theme Title:", themeTitle);
//     console.log("Strategic Theme Details:", themeDetails);

//     // Reset fields and close modal
//     setThemeTitle("");
//     setThemeDetails("");
//     setIsModalOpen(false);
//   };

//   /** Cancel and reset */
//   const handleCancel = () => {
//     setThemeTitle("");
//     setThemeDetails("");
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="bg-blue-50/50 min-h-[calc(100vh-65px)] p-5">
//       <div className="space-y-10 p-5 bg-white rounded-2xl border border-gray-200">
//         <h1 className="text-xl font-bold">Strategic Theme</h1>

//         <div className="flex justify-center w-8/12 mx-auto items-center flex-col relative">
//           <Image src={image} className="w-full" alt="strategic theme image" />

//           <h1 className="py-10 mb-10 text-sm lg:text-base">
//             Strategic themes provide a framework for prioritizing objectives and
//             aligning initiatives with long-term goals. They guide resource
//             allocation and ensure cohesive progress across the organization.
//           </h1>

//           <div className="absolute flex gap-4 bottom-0 right-0">
//             {/* Drawer Button */}
//             <SharedDrawerButton
//               title="Strategic Themes"
//               buttonLabel="More info"
//               content={<StrategicThemeSlided />}
//               buttonClassName="text-blue-900  cursor-pointer"
//             />

//             {/* Let's Start Button */}
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
//             >
//               + Let’s Start
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Center Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
//           <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-2xl relative">
//             {/* Close Button */}
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-3 right-3 text-2xl text-white"
//             >
//               &times;
//             </button>

//             {/* Header */}
//             <div className="bg-blue-900 text-white rounded-t-xl p-4 mb-4">
//               <h2 className="text-xl font-bold">Create Strategic Theme</h2>
//             </div>

//             {/* Content */}
//             <div className="p-4 mb-4 space-y-4">
//               {/* Title Field */}
//               <input
//                 type="text"
//                 value={themeTitle}
//                 onChange={(e) => setThemeTitle(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 placeholder="Strategic theme title"
//               />

//               {/* Details Field */}
//               <textarea
//                 value={themeDetails}
//                 onChange={(e) => setThemeDetails(e.target.value)}
//                 className="w-full min-h-[150px] p-2 border border-gray-300 rounded-lg"
//                 placeholder="Add Details..."
//               />
//             </div>

//             {/* Footer Buttons */}
//             <div className="flex justify-end p-4 gap-4">
//               <button
//                 onClick={handleCancel}
//                 className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StrategicThemeBefore;


"use client";
import Image from "next/image";
import image from "@/public/image/strategic-themes-img.png";

import SharedDrawerButton from "../../_components/reuseable/SharedDrawerButton";
import { useState } from "react";
import StrategicThemeSlided from "@/public/static-json-data/blueprint/strategic-theme";
import toast from "react-hot-toast";
import { useCreateStrategicThemeMutation } from "@/redux/api/blueprint/strategicTheme/strategicThemeApi";

const StrategicThemeBefore = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Separate states for title and details
  const [themeTitle, setThemeTitle] = useState("");
  const [themeDetails, setThemeDetails] = useState("");

  // Mutation hook
  const [createStrategicTheme, { isLoading }] =
    useCreateStrategicThemeMutation();

    console.log(themeDetails,themeTitle);

  /** Save data and close modal */
  const handleSave = async () => {
    if (!themeTitle.trim() || !themeDetails.trim()) {
      toast.error("Please fill in all fields ❌");
      return;
    }

    try {
      await createStrategicTheme({
        name: themeTitle,
        description: themeDetails,
      }).unwrap();

      toast.success("Strategic Theme created successfully 🎉");

      // Reset fields and close modal
      setThemeTitle("");
      setThemeDetails("");
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error creating strategic theme:", error);
      toast.error(error?.data?.message || "Failed to create Strategic Theme ❌");
    }
  };

  /** Cancel and reset */
  const handleCancel = () => {
    setThemeTitle("");
    setThemeDetails("");
    setIsModalOpen(false);
  };

  return (
    <div className="bg-blue-50/50 min-h-[calc(100vh-65px)] p-5">
      <div className="space-y-10 p-5 bg-white rounded-2xl border border-gray-200">
        <h1 className="text-xl font-bold">Strategic Theme</h1>

        <div className="flex justify-center w-8/12 mx-auto items-center flex-col relative">
          <Image src={image} className="w-full" alt="strategic theme image" />

          <h1 className="py-10 mb-10 text-sm lg:text-base">
            Strategic themes provide a framework for prioritizing objectives and
            aligning initiatives with long-term goals. They guide resource
            allocation and ensure cohesive progress across the organization.
          </h1>

          <div className="absolute flex gap-4 bottom-0 right-0">
            {/* Drawer Button */}
            <SharedDrawerButton
              title="Strategic Themes"
              buttonLabel="More info"
              content={<StrategicThemeSlided />}
              buttonClassName="text-blue-900 cursor-pointer"
            />

            {/* Let's Start Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
            >
              + Let’s Start
            </button>
          </div>
        </div>
      </div>

      {/* Center Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-2xl text-gray-700"
            >
              &times;
            </button>

            {/* Header */}
            <div className="bg-blue-900 text-white rounded-t-xl p-4 mb-4">
              <h2 className="text-xl font-bold">Create Strategic Theme</h2>
            </div>

            {/* Content */}
            <div className="p-4 mb-4 space-y-4">
              {/* Title Field */}
              <input
                type="text"
                value={themeTitle}
                onChange={(e) => setThemeTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Strategic theme title"
              />

              {/* Details Field */}
              <textarea
                value={themeDetails}
                onChange={(e) => setThemeDetails(e.target.value)}
                className="w-full min-h-[150px] p-2 border border-gray-300 rounded-lg"
                placeholder="Add Details..."
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end p-4 gap-4">
              <button
                onClick={handleCancel}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950 disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategicThemeBefore;
