// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";

// type Status = "blue" | "green" | "red";

// const CheckAlign = () => {
//   const [activeCard, setActiveCard] = useState<string | null>(null);
//   const [checks, setChecks] = useState<{ [key: string]: boolean }>({});
//   const [note, setNote] = useState("");
//   const [statuses, setStatuses] = useState<{ [key: string]: Status }>({
//     Vision: "blue",
//     "Strategic Themes": "blue",
//     "Business Goals": "blue",
//   });

//   const handleCheckboxChange = (key: string) => {
//     setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const handleSave = () => {
//     let newStatus: Status = "blue";

//     const allChecked =
//       Object.values(checks).length > 0 && Object.values(checks).every(Boolean);

//     if (allChecked && !note.trim()) {
//       newStatus = "green";
//     } else if (note.trim()) {
//       newStatus = "red";
//     }

//     if (activeCard) {
//       setStatuses((prev) => ({ ...prev, [activeCard]: newStatus }));
//     }

//     setChecks({});
//     setNote("");
//   };

//   const getCardStyle = (status: Status) => {
//     switch (status) {
//       case "green":
//         return "border-green-600 text-green-600";
//       case "red":
//         return "border-red-600 text-red-600";
//       default:
//         return "border-blue-600 text-blue-600";
//     }
//   };

//   const renderModal = () => (
//     <DialogContent className="max-w-2xl p-0">
//       <DialogHeader className="bg-blue-900 text-white px-6 py-3 rounded-t-md">
//         <DialogTitle>Blueprint Alignment Check</DialogTitle>
//       </DialogHeader>
//       <div className="p-6 space-y-6">
//         {/* Section 1 */}
//         <div>
//           <h4 className="font-semibold mb-2">
//             Were all relevant stakeholders involved in the Blueprint phase?
//           </h4>
//           {[
//             "Verified the inclusion of key internal and external stakeholders.",
//             "Ensured diverse perspectives were considered during the Blueprint phase.",
//             "Confirmed representation from relevant departments and teams.",
//           ].map((item, i) => (
//             <label key={i} className="flex items-start gap-2 mb-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={checks[item] || false}
//                 onChange={() => handleCheckboxChange(item)}
//                 className="mt-1 h-4 w-4 text-blue-900 border-gray-300 rounded"
//               />
//               <span>{item}</span>
//             </label>
//           ))}
//         </div>
//         <hr />
//         {/* Section 2 */}
//         <div>
//           <h4 className="font-semibold mb-2">
//             Do we have a shared understanding of the outcomes from the Blueprint phase?
//           </h4>
//           {[
//             "Conducted a review session to discuss assessment findings.",
//             "Ensured alignment of interpretations and insights among stakeholders.",
//             "Documented and communicated key takeaways from the Blueprint phase.",
//           ].map((item, i) => (
//             <label key={i} className="flex items-start gap-2 mb-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={checks[item] || false}
//                 onChange={() => handleCheckboxChange(item)}
//                 className="mt-1 h-4 w-4 text-blue-900 border-gray-300 rounded"
//               />
//               <span>{item}</span>
//             </label>
//           ))}
//         </div>
//         <div>
//           {["Vision", "Strategic Themes", "Business Goals"].map((item, i) => (
//             <label key={i} className="flex items-start gap-2 mb-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={checks[item] || false}
//                 onChange={() => handleCheckboxChange(item)}
//                 className="mt-1 h-4 w-4 text-blue-900 border-gray-300 rounded"
//               />
//               <span>{item}</span>
//             </label>
//           ))}
//         </div>
//         <hr />
//         {/* Notes */}
//         <div>
//           <h4 className="font-semibold mb-2">Suggestions/Notes</h4>
//           <Textarea
//             placeholder="Write your suggestion..."
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//             className="bg-gray-100"
//           />
//         </div>
//         <div className="flex justify-end">
//           <Button onClick={handleSave} className="bg-blue-900 text-white px-6">
//             Save
//           </Button>
//         </div>
//       </div>
//     </DialogContent>
//   );

//   return (
//     <div>
//       {/* Cards Section */}
//       <div className="grid  md:grid-cols-3 gap-6">
//         {Object.keys(statuses).map((title, idx) => (
//           <Dialog key={title}>
//             <div
//               className={`border-2 rounded-lg p-6 shadow  ${getCardStyle(
//                 statuses[title]
//               )}`}
//             >
//               <div className="flex items-center gap-2 mb-4">
//                 <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
//                   {`0${idx + 1}`}
//                 </span>
//                 <h3 className="font-semibold text-lg">{title}</h3>
//               </div>
//               <DialogTrigger asChild>
//                 <Button
//                   onClick={() => {
//                     setActiveCard(title);
//                   }}
//                   className="bg-blue-900 text-white text-sm px-4 py-2 rounded-md"
//                 >
//                   {title} Statements
//                 </Button>
//               </DialogTrigger>
//             </div>

//             {renderModal()}
//           </Dialog>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CheckAlign;

"use client";

import React, { useState, useEffect } from "react";
import {
  useCreateAlignmentMutation,
  useGetMyAlignmentQuery,
} from "@/redux/api/Alignment/alignmentApi";
import toast from "react-hot-toast";

interface ClarhetAiRecommendationsProps {
  headerColor?: string;
}

// Define valid color keys as a type
type ColorKey = "blue-500" | "green-600";

// Color mapping utility
const colorMap: Record<
  ColorKey,
  { bg: string; text: string; border: string; borderTop: string }
> = {
  "blue-500": {
    bg: "bg-blue-500",
    text: "text-blue-500",
    border: "border-blue-500",
    borderTop: "border-t-4 border-t-blue-500",
  },
  "green-600": {
    bg: "bg-green-600",
    text: "text-green-600",
    border: "border-green-600",
    borderTop: "border-t-4 border-t-green-600",
  },
};

const getColorProperties = (color: string) => {
  const validColor = color as ColorKey;
  return colorMap[validColor] || colorMap["blue-500"]; // Fallback to blue
};

const ChoreographAlignmentCheck: React.FC<
  ClarhetAiRecommendationsProps
> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<string>("");
  const [formData, setFormData] = useState<{ [key: string]: boolean }>({});
  const [suggestions, setSuggestions] = useState<string>("");

  const [sectionColors, setSectionColors] = useState<{ [key: string]: string }>(
    {
      trends: "blue-500",
      swot: "blue-500",
      challenges: "blue-500",
      competitor: "blue-500",
    }
  );

  const [completedSections, setCompletedSections] = useState<{
    [key: string]: boolean;
  }>({
    trends: false,
    swot: false,
    challenges: false,
    competitor: false,
  });

  // ✅ Fetch data from API
  const { data: alignmentData } = useGetMyAlignmentQuery();

  useEffect(() => {
    if (alignmentData?.success) {
      const completed: { [key: string]: boolean } = {};
      const colors: { [key: string]: string } = {};

      alignmentData.data.forEach((alignment) => {
        if (alignment.title.includes("Teams")) {
          completed["trends"] = true;
          colors["trends"] = "green-600";
        }
        if (alignment.title.includes("Objectives")) {
          completed["swot"] = true;
          colors["swot"] = "green-600";
        }
      });

      setCompletedSections((prev) => ({ ...prev, ...completed }));
      setSectionColors((prev) => ({ ...prev, ...colors }));
    }
  }, [alignmentData]);

  const getModalTitle = (type: string) => {
    const titles: { [key: string]: string } = {
      trends: "Vision Alignment Check",
      swot: "Strategic Theme Alignment Check",
      challenges: "Business Goals Alignment Check",
    };
    return titles[type] || "Alignment Check";
  };

  // alignment mutation
  const [createAlignment] = useCreateAlignmentMutation();

  const modalData = {
    questions: [
      {
        question:
          "Were all relevant stakeholders involved in the Blueprint phase?",
        options: [
          "Verified the inclusion of key internal and external stakeholders.",
          "Ensured diverse perspectives were considered during the Blueprint phase.",
          "Confirmed representation from relevant departments and teams.",
        ],
      },

      {
        question:
          "Do we have a shared understanding of the outcomes from the Blueprint phase?",
        options: [
          "Conducted a review session to discuss assessment findings.",
          "Ensured alignment of interpretations and insights among stakeholders.",
          "Documented and communicated key takeaways from the Blueprint phase.",
        ],
      },
    ],
    additionalOptions: ["vision", "Strategic Themes", "Business Goals"],
  };

  const openModal = (type: string) => {
    setCurrentModal(type);
    setIsModalOpen(true);
    setFormData({});
    setSuggestions("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentModal("");
    setFormData({});
    setSuggestions("");
  };

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  const handleSave = () => {
    const answers = modalData.questions.map((q, qIndex) => {
      const selectedOptions = q.options.filter(
        (_, oIndex) => formData[`q${qIndex}_o${oIndex}`]
      );
      return {
        questionNumber: qIndex + 1,
        selectedOptions,
      };
    });

    const selectedComponents = modalData.additionalOptions.map(
      (opt, index) => ({
        name: opt,
        checked: !!formData[`additional_${index}`],
      })
    );

    const body = {
      title: getModalTitle(currentModal),
      answers,
      selectedComponents,
      suggestions,
    };
    console.log("Body : ", body);
    const result = createAlignment(body)
      .unwrap()
      .then(() => {
        toast.success("Alignment check saved successfully");
        setSectionColors((prev) => ({ ...prev, [currentModal]: "green-600" }));
        setCompletedSections((prev) => ({ ...prev, [currentModal]: true }));
        closeModal();
      })
      .catch((error) => {
        console.error("❌ Failed to save alignment:", error);
        toast.error("Failed to save alignment");
      });

    console.log("Result : ", result);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-2">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Vision Card */}
          <div
            className={`bg-white rounded-lg shadow-sm border-t-32 border-gray-200 p-6 min-h-[16rem] ${
              getColorProperties(sectionColors.trends).borderTop
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-6 h-6 ${
                  getColorProperties(sectionColors.trends).bg
                } rounded-full flex items-center justify-center`}
              >
                <span className="text-white text-xs font-bold">01</span>
              </div>
              <h3
                className={`text-lg font-semibold ${
                  getColorProperties(sectionColors.trends).text
                }`}
              >
                Vision
              </h3>
            </div>
            <div className="flex justify-center items-center h-32 mb-6"></div>
            <div className="flex justify-center">
              <button
                onClick={() => openModal("trends")}
                className="bg-[#22398A] hover:bg-[#1E2A78] text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Vision
              </button>
            </div>
          </div>

          {/* Strategic Theme Card */}
          <div
            className={`bg-white rounded-lg shadow-sm border-t-32 border-gray-200 p-6 min-h-[16rem] ${
              getColorProperties(sectionColors.swot).borderTop
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-6 h-6 ${
                  getColorProperties(sectionColors.swot).bg
                } rounded-full flex items-center justify-center`}
              >
                <span className="text-white text-xs font-bold">02</span>
              </div>
              <h3
                className={`text-lg font-semibold ${
                  getColorProperties(sectionColors.swot).text
                }`}
              >
                Strategic Theme
              </h3>
            </div>
            <div className="flex justify-center items-center h-32 mb-6"></div>
            <div className="flex justify-center">
              <button
                onClick={() => openModal("swot")}
                className="bg-[#22398A] hover:bg-[#1E2A78] text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Strategic Theme
              </button>
            </div>
          </div>
          {/* Business Goal Card */}
          <div
            className={`bg-white rounded-lg shadow-sm border-t-32 border-gray-200 p-6 min-h-[16rem] ${
              getColorProperties(sectionColors.challenges).borderTop
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-6 h-6 ${
                  getColorProperties(sectionColors.challenges).bg
                } rounded-full flex items-center justify-center`}
              >
                <span className="text-white text-xs font-bold">02</span>
              </div>
              <h3
                className={`text-lg font-semibold ${
                  getColorProperties(sectionColors.challenges).text
                }`}
              >
                Business Goal
              </h3>
            </div>
            <div className="flex justify-center items-center h-32 mb-6"></div>
            <div className="flex justify-center">
              <button
                onClick={() => openModal("challenges")}
                className="bg-[#22398A] hover:bg-[#1E2A78] text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Business Goal
              </button>
            </div>
          </div>
          {/* <div
            className={`bg-white rounded-lg shadow-sm border-t-32 border-gray-200 p-6 min-h-[16rem] ${
              getColorProperties(sectionColors.swot).borderTop
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-6 h-6 ${
                  getColorProperties(sectionColors.swot).bg
                } rounded-full flex items-center justify-center`}
              >
                <span className="text-white text-xs font-bold">02</span>
              </div>
              <h3
                className={`text-lg font-semibold ${
                  getColorProperties(sectionColors.swot).text
                }`}
              >
                Business Goal
              </h3>
            </div>
            <div className="flex justify-center items-center h-32 mb-6"></div>
            <div className="flex justify-center">
              <button
                onClick={() => openModal("swot")}
                className="bg-[#22398A] hover:bg-[#1E2A78] text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Business Goal
              </button>
            </div>
          </div> */}
        </div>

        {/* Status Legend */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Alignment Status Legend
          </h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Not Started</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-600 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-[#22398A] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {getModalTitle(currentModal)}
              </h2>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Questions */}
              {modalData.questions.map((questionData, qIndex) => (
                <div key={qIndex} className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {questionData.question}
                  </h3>
                  <div className="space-y-3">
                    {questionData.options.map((option, oIndex) => (
                      <label
                        key={oIndex}
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          checked={formData[`q${qIndex}_o${oIndex}`] || false}
                          onChange={(e) =>
                            handleCheckboxChange(
                              `q${qIndex}_o${oIndex}`,
                              e.target.checked
                            )
                          }
                          disabled={completedSections[currentModal]}
                        />
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {/* Additional Options */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="space-y-3">
                  {modalData.additionalOptions.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={formData[`additional_${index}`] || false}
                        onChange={(e) =>
                          handleCheckboxChange(
                            `additional_${index}`,
                            e.target.checked
                          )
                        }
                        disabled={completedSections[currentModal]}
                      />
                      <span className="text-gray-700 font-medium">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">
                  Suggestions/Notes
                </h3>
                <textarea
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  placeholder="Enter your suggestions or notes here..."
                  disabled={completedSections[currentModal]}
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSave}
                  disabled={completedSections[currentModal]}
                  className={`px-8 py-2 rounded-md font-medium transition-colors ${
                    completedSections[currentModal]
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-[#22398A] hover:bg-[#1E2A78] text-white"
                  }`}
                >
                  {completedSections[currentModal]
                    ? "Already Completed"
                    : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoreographAlignmentCheck;
