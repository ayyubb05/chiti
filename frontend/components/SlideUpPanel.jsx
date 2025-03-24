"use client"

import SignInPanel from "./SignInPanel"; 
import { useState } from "react";

export default function SlideUpPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
    
    // If opening, set a delay before showing the content
    if (!isOpen) {
      setTimeout(() => {
        setShowContent(true);
      }, 130); // Delay of 500ms before showing the content
    } else {
      // If closing, immediately hide the content
      setShowContent(false);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-full">
      {/* Sliding Panel */}
      <div
        className={`w-full bg-green-700 hover:bg-green-800 border-2 border-gray-600
                    rounded-[28px] text-white p-4 text-center transition-all duration-300 
                    ${isOpen ? "h-[512px]" : "h-[56px]"}`}
      >
        <button onClick={togglePanel}>
          <p className="font-bold">Sign In / Up</p>
        </button>
        {isOpen && showContent && <SignInPanel/>}
      </div>

      {/* Toggle Button */}
    </div>
  );
}