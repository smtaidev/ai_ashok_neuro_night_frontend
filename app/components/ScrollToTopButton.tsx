'use client';

import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-2 rounded-full bg-blue-500/40 hover:bg-blue-600/50 backdrop-blur-md border border-white/20 text-white fixed bottom-6 right-6 z-50 shadow-xl transition-all duration-300"

        >
          <FaAngleUp className="text-2xl" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
