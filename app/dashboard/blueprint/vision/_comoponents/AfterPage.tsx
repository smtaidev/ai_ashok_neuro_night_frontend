"use client";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import ReuseableDrawer from "../../_components/reuseable/ReuseableDrawer";
import Image from "next/image";
import LinkImage from "@/public/image/link-icon.svg";
import Link from "next/link";
import VisionAfter from "@/public/static-json-data/blueprint/vision-after-form-db";
import { useCreateVisionMutation } from "@/redux/api/blueprint/vison/visonApi";
import toast from "react-hot-toast"; // ✅ import toast

type AfterPageProps = {
  visionData: { _id: string; vision: string };
};

const AfterPage: React.FC<AfterPageProps> = ({ visionData }) => {
  const [vision, setVision] = useState(
    visionData?.vision 
  );

  // For editing Vision (modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedVision, setEditedVision] = useState(
    visionData?.vision 
  );

  // For Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [infoData, setInfoData] = useState<React.ReactNode>(null);

  // ✅ Mutation hook
  const [updateVision, { isLoading: isUpdating }] = useCreateVisionMutation();

 

  /** Save vision changes (API call) */
  const handleSave = async () => {
    try {
      const payload = { id: visionData._id, vision: editedVision };
      const res = await updateVision(payload).unwrap();

      setVision(res.data.vision); // update local state
      setIsModalOpen(false);

      toast.success("Vision updated successfully ");
    } catch (error) {
      console.error("Failed to update vision:", error);
      toast.error("Failed to update vision ");
    }
  };

  /** Cancel vision editing */
  const handleCancel = () => {
    setEditedVision(vision);
    setIsModalOpen(false);
  };

  /** Open Drawer with AI insights */
  const handleMoreInfo = () => {
    setInfoData(<VisionAfter />);
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-5 min-h-[calc(100vh-110px)]">
      {/* Vision Section */}
      <div className="bg-white border border-gray-200 p-5 rounded-lg relative">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold mb-2">Vision</h2>
          <div className="flex items-center gap-4">
            <Link href="#">
              <Image src={LinkImage} alt="Link Image" height={25} width={25} />
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-800 cursor-pointer flex text-lg items-center gap-2"
            >
              <FaRegEdit size={25} /> Edit
            </button>
          </div>
        </div>
        <p className="mb-2">{vision}</p>
      </div>

      {/* Trigger Drawer */}
      <div className="flex justify-end">
        <button
          onClick={handleMoreInfo}
          className="bg-blue-900 mr-1 mt-5 text-white px-4 py-2 rounded-lg"
        >
          ClaretiAI Insights
        </button>
      </div>

      {/* Drawer (reusable) */}
      <ReuseableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="ClarhetAI Insights"
        isAi={true}
      >
        {infoData || (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
            <div className="animate-spin text-white rounded-full h-10 w-10 border-b-2 border-blue-800"></div>
          </div>
        )}
      </ReuseableDrawer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-2xl text-gray-600"
            >
              &times;
            </button>

            {/* Header */}
            <div className="bg-blue-900 text-white rounded-t-2xl p-4 mb-4">
              <h2 className="text-xl font-bold">Edit Vision</h2>
            </div>

            {/* Content */}
            <div className="p-4 mb-4">
              <textarea
                value={editedVision}
                onChange={(e) => setEditedVision(e.target.value)}
                className="w-full min-h-[150px] p-2 border border-gray-300 rounded-lg"
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
                disabled={isUpdating}
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950 disabled:opacity-50"
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AfterPage;
