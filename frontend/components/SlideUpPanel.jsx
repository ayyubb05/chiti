"use client";

import SignInPanel from "./SignInPanel"; 
import { useState } from "react";

export default function SlideUpPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="absolute bottom-0 left-0 w-full">
      {/* Sliding Panel */}
          <i className="fa-solid fa-user"></i>
      <div
        className={`w-full bg-green-700 hover:bg-green-800 border-2 border-gray-600
                    rounded-[28px] text-white p-4 text-center transition-all duration-300 
                    ${isOpen ? "h-[512px]" : "h-[56px]"}`}
      >
        <button onClick={togglePanel}>

          <p className="font-bold">Sign In / Up</p>
        </button>

        {/* Make the SignInPanel scrollable when open */}
        {isOpen && (
          <div className="h-full overflow-y-auto pb-4">
            <SignInPanel />
          </div>
        )}
      </div>
    </div>
  );
}