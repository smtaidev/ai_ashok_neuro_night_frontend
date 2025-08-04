"use client";
import Image from "next/image";
import React, { useState } from "react";
import visionImage from "@/public/image/blueprint-img.png";
import Modal from "./_comoponents/visionModal";
// import Modal from "./Modal"; // Import the new modal component

const Vision = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-blue-50/50 min-h-[calc(100vh-65px)] p-5">
      {/* Only single component */}
      <div className="space-y-10 p-5 bg-white rounded-2xl border border-gray-200 ">
        <h1 className="text-xl font-bold">Vision</h1>
        <div className="flex justify-center w-8/12 mx-auto items-center flex-col">
          <Image src={visionImage} className="w-full" alt="vision image" />
          <h1 className="py-10 text-sm lg:text-base">
            A Vision provides direction, motivation, and reinforcement for
            decision-making. It inspires employees, differentiates the
            organization, and serves as a benchmark for measuring progress.
            Crafting a clear Vision statement ensures alignment, focus, and
            success.
          </h1>

          {/* Button to open modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-900 text-white py-2 px-4 rounded-xl my-5 flex items-center gap-2 font-semibold"
          >
            <span className="text-2xl font-[300]">+</span> Lets create the vision!
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Your Vision"
      >
        <p className="text-gray-700">
          Here you can create your vision! Add your form or content here.
        </p>
      </Modal>
    </div>
  );
};

export default Vision;
