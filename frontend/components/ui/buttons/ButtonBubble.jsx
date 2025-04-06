import Button from "./Button";

export default function ButtonBubble({ callback_function, button_text, icon }) {
	return (
		<Button 
			callback_function={callback_function}
			button_text={button_text}
			icon={icon}
			className="w-10 h-8 bg-green-400 hover:bg-green-500 rounded-full text-white"
		/>
	);
}