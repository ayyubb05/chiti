"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({ callback_function, button_text, icon, className = "" }) {
	return (
		<button 
			onClick={callback_function}
			className={`flex items-center justify-center ${className}`}
		>
			{button_text}
			{icon && <FontAwesomeIcon icon={icon} className="pl-2" />}
		</button>
	);
}