"use client";
import React from "react";
import ClarhetImage from "@/public/image/chat-bot-bg.png"
import Image from "next/image";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  width?: string; // Optional: allow dynamic width
};

const ReuseableDrawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title = "More Info",
  children,
  width = "w-[30rem]"
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300`}
        onClick={onClose}
      />

      {/* Drawer content */}
      <div
        className={`absolute top-0 right-0 ${width} h-full bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
       <div className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={ClarhetImage}
          alt="Product Interface showing challenges and data"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative z-10 flex items-center justify-between p-4 text-white">
        <h2 className="text-lg font-bold">{title}</h2>
        <button
          onClick={onClose}
          aria-label="Close"
          type="button"
          className="text-2xl font-thin"
        >
          &times;
        </button>
      </div>
    </div>

        {/* Scrollable Body */}
        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ReuseableDrawer;
