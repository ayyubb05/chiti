import Button from "./Button";

export default function ButtonPill({ callback_function, button_text, icon }) {
	return (
		<Button 
			callback_function={callback_function}
			button_text={button_text}
			icon={icon}
			className="bg-green-500 text-white text-sm px-4 py-1 rounded-full hover:bg-green-600"
		/>
	);
}
