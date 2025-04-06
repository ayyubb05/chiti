import Button from "./Button";

export default function ButtonStandard({ callback_function, button_text, icon }) {
	return (
		<Button 
			callback_function={callback_function}
			button_text={button_text}
			icon={icon}
			className="w-full py-3 bg-green-500 rounded hover:bg-green-600"
		/>
	);
}