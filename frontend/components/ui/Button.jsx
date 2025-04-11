"use client";
import React from 'react';
import "@/app/globals.css";

const Button = ({ text, onClick }) => {
  return (
    <button 
      className="btn-gradient btn-border-highlight py-4 px-8 rounded-lg text-lg w-48 hover:opacity-90 transition-opacity"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;