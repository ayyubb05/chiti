"use client";

import SignInPanel from "./SignInPanel"; 
import { useState } from "react";

export default function SlideUpPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div 
      className="py-3 px-5 bg-green-300 flex items-center justify-between w-full max-w-md mx-auto ">
      <div
        className={`relative w-full bg-green-700 border-2 border-gray-600
                    rounded-[28px] text-white p-4 text-center transition-all duration-300 
                    ${isOpen ? "h-[512px]" : "h-[56px]"}`}
      >
        <button className="absolute top-0 left-0 w-full hover:bg-green-800 
                    rounded-[28px] h-[56px] " onClick={togglePanel}>

          <p className="font-bold">Sign In / Up</p>
        </button>

        {/* Make the SignInPanel scrollable when open */}
        {isOpen && (
          <div className="h-full overflow-y-auto pb-4 pt-[32px]">
            <SignInPanel />
          </div>
        )}
      </div>
    </div>
  );
}