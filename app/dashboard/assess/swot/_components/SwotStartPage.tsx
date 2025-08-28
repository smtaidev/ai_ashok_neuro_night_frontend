





"use client";
import Image from "next/image";
import swotImage from "@/public/image/swot-img.png";
import Drawer from "@/app/dashboard/blueprint/vision/_comoponents/DrawarModal";
import { useState } from "react";
import { swotSectionsData } from "@/app/dashboard/foundation/_components/dummyData";
import { useCreateSwotMutation } from "@/redux/api/swot/swotApi";
import toast from "react-hot-toast";


type SectionType = (typeof swotSectionsData)[number];

const SwotStartPage = () => {
  const [sections] = useState(swotSectionsData);
  const [activeSection, setActiveSection] = useState<SectionType | null>(null);
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  // RTK Query mutation hook
  const [createSwot, { isLoading }] = useCreateSwotMutation();

  const handleMoreInfoClick = (sectionId: string) => {
    const foundSection = sections.find((sec) => sec.id === sectionId);
    if (foundSection) {
      setIsModalOpen(false);
      setDescription("");
      setActiveSection(foundSection);
      setOpenDrawerId(foundSection.id);
    }
  };

  const handleCloseDrawer = () => {
    setOpenDrawerId(null);
  };

  const handleGetStartedClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDescription("");
    setOpenDrawerId(null);
  };

  const handleSave = async () => {
    if (!category || !description) {
      toast.error("Please fill in both fields before saving.");
      return;
    }

    try {
      const payload = {
        categoryName: category.toLowerCase(),
        details: description.trim(),
      };

      const result = await createSwot(payload).unwrap();
      toast.success("SWOT created successfully:");
      
      // Reset form & close modal
      setCategory("");
      setDescription("");
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to create SWOT:");
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] pl-6">
      <div className="space-y-10 px-6 bg-white rounded-xl">
        <div className="flex justify-center w-8/12 mx-auto items-center flex-col">
          <Image src={swotImage} width={600} height={300} alt="swot image" />
          <h1 className="py-10 text-sm text-center lg:text-base text-[#231f20]">
            SWOT analysis is crucial for strategic decision-making. It evaluates internal strengths, weaknesses, external opportunities, and threats. Business leaders can create robust and actionable strategies by regularly reviewing and adapting the SWOT analysis. It sets the stage for strategic excellence.
          </h1>

          {/* Buttons */}
          <div className="mt-6 flex justify-end items-center space-x-8">
            <a
              href="#"
              onClick={() => handleMoreInfoClick("swot")}
              className="text-[#22398A] font-semibold hover:underline cursor-pointer"
            >
              More info
            </a>
            <button
              onClick={handleGetStartedClick}
              className="bg-[#22398A] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#1D2A6D]"
            >
              Get Started
            </button>
          </div>

          {/* Drawer */}
          {activeSection && (
            <Drawer
              isOpen={openDrawerId === activeSection.id}
              onClose={handleCloseDrawer}
              title={activeSection.title}
            >
              <div
                className="p-4 bg-white text-gray-700 space-y-6"
                dangerouslySetInnerHTML={{
                  __html: activeSection.drawerContent.description,
                }}
              />
            </Drawer>
          )}

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#1D2A6D] rounded-lg w-full max-w-4xl shadow-lg">
                <div className="p-3 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-white">SWOT Analysis</h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-white text-xl hover:text-gray-200"
                  >
                    ×
                  </button>
                </div>
                <div className="p-5 bg-white rounded-b-lg">
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    >
                      <option value="">Select Category</option>
                      <option value="strengths">Strengths</option>
                      <option value="weaknesses">Weaknesses</option>
                      <option value="threats">Threats</option>
                      <option value="opportunities">Opportunities</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700">Describe</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mt-1 h-24"
                      placeholder="Describe"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => handleMoreInfoClick("swot")}
                      className="text-[#22398A] font-semibold hover:underline"
                    >
                      More info
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-[#1D2A6D] text-white px-6 py-2 rounded-lg hover:bg-[#22398A] disabled:opacity-50"
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwotStartPage;
