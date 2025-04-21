"use client";
import React from 'react';
import "@/app/globals.css";


const Button = ({ text, onClick, modifier="", type = "button" }) => {
	return (
		<button 
			type={type}
			onClick={onClick}
			className={`${modifier} btn-gradient btn-border-highlight py-4 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity  `}
		>
			{text}
			
		</button>
	);
};

export default Button;