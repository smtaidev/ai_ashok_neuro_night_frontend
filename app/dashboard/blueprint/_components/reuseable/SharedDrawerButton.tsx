"use client";
import React, { useState } from "react";
import ReuseableDrawer from "./ReuseableDrawer";

type SharedDrawerButtonProps = {
  title: string;
  buttonLabel: string;
  content: React.ReactNode;
  buttonClassName?: string; // <-- Add this
};

const SharedDrawerButton: React.FC<SharedDrawerButtonProps> = ({
  title,
  buttonLabel,
  content,
  buttonClassName = "bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950", // default style
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsDrawerOpen(true)}
        className={buttonClassName} // <-- Use the prop
      >
        {buttonLabel}
      </button>

      <ReuseableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={title}
      >
        {content}
      </ReuseableDrawer>
    </>
  );
};

export default SharedDrawerButton;
