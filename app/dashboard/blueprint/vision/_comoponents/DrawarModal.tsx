"use client";
import React from "react";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title = "More Info", children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      {/* Background overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer content */}
      <div
        className={`absolute top-0 right-0 w-[34rem] h-full bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-yellow-500 text-black">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>

        {/* Body */}
        <div className="p-4  max-h-[calc(100vh-4rem)] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
