//? working code without see more button 


// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import toast from "react-hot-toast";
// import link from "@/public/image/link-icon.svg";
// import { StrategicTheme } from "../page";
// import {
//   useCreateStrategicThemeMutation,
//   useUpdateStrategicThemeMutation,
//   useDeleteStrategicThemeMutation,
// } from "@/redux/api/blueprint/strategicTheme/strategicThemeApi";

// interface StrategicAfterProps {
//   themes: StrategicTheme[];
// }

// const StrategicAfter: React.FC<StrategicAfterProps> = ({ themes }) => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [themeTitle, setThemeTitle] = useState<string>("");
//   const [themeDetails, setThemeDetails] = useState<string>("");
//   const [editingTheme, setEditingTheme] = useState<StrategicTheme | null>(null);
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);

//   // API hooks
//   const [createStrategicTheme] = useCreateStrategicThemeMutation();
//   const [updateStrategicTheme] = useUpdateStrategicThemeMutation();
//   const [deleteStrategicTheme] = useDeleteStrategicThemeMutation();

//   // Save or Edit Theme
//   const handleSave = async () => {
//     try {
//       if (editingTheme) {
//         // ✅ Update theme
//         await updateStrategicTheme({
//           _id: editingTheme._id,
//           name: themeTitle,
//           description: themeDetails,
//         }).unwrap();
//         toast.success("Strategic theme updated successfully!");
//       } else {
//         // ✅ Create new theme
//         await createStrategicTheme({
//           name: themeTitle,
//           description: themeDetails,
//         }).unwrap();
//         toast.success("Strategic theme created successfully!");
//       }
//       setThemeTitle("");
//       setThemeDetails("");
//       setEditingTheme(null);
//       setIsModalOpen(false);
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Something went wrong!");
//     }
//   };

//   // Edit Theme
//   const handleEdit = (theme: StrategicTheme) => {
//     setThemeTitle(theme.name);
//     setThemeDetails(theme.description);
//     setEditingTheme(theme);
//     setIsModalOpen(true);
//     setActiveMenu(null);
//   };

//   // Delete Theme
//   const handleDelete = async (_id: string) => {
//     try {
//       await deleteStrategicTheme(_id).unwrap();
//       toast.success("Strategic theme deleted successfully!");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to delete theme!");
//     }
//     setActiveMenu(null);
//   };

//   return (
//     <div className="bg-blue-50/50 min-h-[calc(100vh-65px)] p-5">
//       <div className="space-y-10 p-5 bg-white rounded-2xl border border-gray-200">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-xl font-bold">Strategic Themes</h1>
//           <div className="flex items-center gap-3">
//             <Image src={link} alt="link" className="w-6 h-6 cursor-pointer" />
//             <button
//               onClick={() => {
//                 setThemeTitle("");
//                 setThemeDetails("");
//                 setEditingTheme(null);
//                 setIsModalOpen(true);
//               }}
//               className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
//             >
//               Add New Strategic Theme
//             </button>
//           </div>
//         </div>

//         {/* Themes Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {themes.map((theme, index) => (
//             <div key={theme._id} className="bg-sky-200 rounded-lg p-4 relative">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <span className="bg-blue-900 text-white rounded-full w-6 h-6 p-4 flex items-center justify-center">
//                     {String(index + 1).padStart(2, "0")}
//                   </span>
//                   <h3 className="text-lg font-semibold mt-2">{theme.name}</h3>
//                 </div>

//                 {/* Three dot menu */}
//                 <div className="relative">
//                   <button
//                     onClick={() =>
//                       setActiveMenu(activeMenu === theme._id ? null : theme._id)
//                     }
//                     className="text-gray-500 cursor-pointer hover:text-gray-700"
//                   >
//                     ⋮
//                   </button>
//                   {activeMenu === theme._id && (
//                     <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg">
//                       <button
//                         onClick={() => handleEdit(theme)}
//                         className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(theme._id)}
//                         className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               {theme.description && (
//                 <p className="text-sm mt-2">{theme.description}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
//           <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-2xl relative">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-3 right-3 text-2xl text-gray-700"
//             >
//               &times;
//             </button>
//             <div className="bg-blue-900 text-white rounded-t-xl p-4 mb-4">
//               <h2 className="text-xl font-bold">
//                 {editingTheme ? "Edit Strategic Theme" : "Create Strategic Theme"}
//               </h2>
//             </div>
//             <div className="p-4 mb-4 space-y-4">
//               <input
//                 type="text"
//                 value={themeTitle}
//                 onChange={(e) => setThemeTitle(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//                 placeholder="Strategic theme title"
//               />
//               <textarea
//                 value={themeDetails}
//                 onChange={(e) => setThemeDetails(e.target.value)}
//                 className="w-full min-h-[150px] p-2 border border-gray-300 rounded-lg"
//                 placeholder="Add Details..."
//               />
//             </div>
//             <div className="flex justify-end p-4 gap-4">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
//               >
//                 {editingTheme ? "Update" : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StrategicAfter;



"use client";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import link from "@/public/image/link-icon.svg";
import { StrategicTheme } from "../page";
import {
  useCreateStrategicThemeMutation,
  useUpdateStrategicThemeMutation,
  useDeleteStrategicThemeMutation,
} from "@/redux/api/blueprint/strategicTheme/strategicThemeApi";

interface StrategicAfterProps {
  themes: StrategicTheme[];
}

const StrategicAfter: React.FC<StrategicAfterProps> = ({ themes }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [themeTitle, setThemeTitle] = useState<string>("");
  const [themeDetails, setThemeDetails] = useState<string>("");
  const [editingTheme, setEditingTheme] = useState<StrategicTheme | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // ✅ Track expanded themes
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // API hooks
  const [createStrategicTheme] = useCreateStrategicThemeMutation();
  const [updateStrategicTheme] = useUpdateStrategicThemeMutation();
  const [deleteStrategicTheme] = useDeleteStrategicThemeMutation();

  // Save or Edit Theme
  const handleSave = async () => {
    try {
      if (editingTheme) {
        await updateStrategicTheme({
          _id: editingTheme._id,
          name: themeTitle,
          description: themeDetails,
        }).unwrap();
        toast.success("Strategic theme updated successfully!");
      } else {
        await createStrategicTheme({
          name: themeTitle,
          description: themeDetails,
        }).unwrap();
        toast.success("Strategic theme created successfully!");
      }
      setThemeTitle("");
      setThemeDetails("");
      setEditingTheme(null);
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  // Edit Theme
  const handleEdit = (theme: StrategicTheme) => {
    setThemeTitle(theme.name);
    setThemeDetails(theme.description);
    setEditingTheme(theme);
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  // Delete Theme
  const handleDelete = async (_id: string) => {
    try {
      await deleteStrategicTheme(_id).unwrap();
      toast.success("Strategic theme deleted successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete theme!");
    }
    setActiveMenu(null);
  };

  // Helper function to shorten text
  const getShortText = (text: string, wordLimit: number = 12) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="bg-blue-50/50 min-h-[calc(100vh-65px)] p-5">
      <div className="space-y-10 p-5 bg-white rounded-2xl border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Strategic Themes</h1>
          <div className="flex items-center gap-3">
            <Image src={link} alt="link" className="w-6 h-6 cursor-pointer" />
            <button
              onClick={() => {
                setThemeTitle("");
                setThemeDetails("");
                setEditingTheme(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
            >
              Add New Strategic Theme
            </button>
          </div>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme, index) => (
            <div key={theme._id} className="bg-sky-200 rounded-lg p-4 relative">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-blue-900 text-white rounded-full w-6 h-6 p-4 flex items-center justify-center">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold text-[#0b1c33]

 mt-2"> {theme.name}</h3>
                </div>

                {/* Three dot menu */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === theme._id ? null : theme._id)
                    }
                    className="text-gray-500 cursor-pointer hover:text-gray-700"
                  >
                    ⋮
                  </button>
                  {activeMenu === theme._id && (
                    <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg">
                      <button
                        onClick={() => handleEdit(theme)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(theme._id)}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* ✅ Description with See More */}
              {theme.description && (
                <p className="text-base text-[#231f20] mt-2">
                  {expanded[theme._id]
                    ? theme.description
                    : getShortText(theme.description, 7)}{" "}
                  {theme.description.split(" ").length > 7 && (
                    <button
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [theme._id]: !prev[theme._id],
                        }))
                      }
                      className="text-blue-900 font-medium hover:underline"
                    >
                      {expanded[theme._id] ? "See less" : "See more"}
                    </button>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-2xl text-gray-700"
            >
              &times;
            </button>
            <div className="bg-blue-900 text-white rounded-t-xl p-4 mb-4">
              <h2 className="text-xl font-bold">
                {editingTheme ? "Edit Strategic Theme" : "Create Strategic Theme"}
              </h2>
            </div>
            <div className="p-4 mb-4 space-y-4">
              <input
                type="text"
                value={themeTitle}
                onChange={(e) => setThemeTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Strategic theme title"
              />
              <textarea
                value={themeDetails}
                onChange={(e) => setThemeDetails(e.target.value)}
                className="w-full min-h-[150px] p-2 border border-gray-300 rounded-lg"
                placeholder="Add Details..."
              />
            </div>
            <div className="flex justify-end p-4 gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
              >
                {editingTheme ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategicAfter;
