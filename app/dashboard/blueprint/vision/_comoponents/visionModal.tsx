"use client";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  onSend?: () => void;
  onMoreInfo?: () => void; // <-- Added
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = "Vision",
  children,
  onSend,
  onMoreInfo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-400 text-2xl"
        >
          &times;
        </button>

        {/* Header */}
        <div className="bg-blue-800 text-white rounded-t-2xl p-4 mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>

        {/* Content Area */}
        <div className="p-2 mb-4 h-60">
          {children || <p className="text-gray-500">Create Vision...</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-end p-4 gap-4">
          <button
            onClick={onMoreInfo} // <-- Trigger drawer
            className="cursor-pointer"
          >
            More info
          </button>
          <button
            onClick={onSend}
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
