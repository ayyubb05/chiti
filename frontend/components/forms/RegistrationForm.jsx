"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";


export default function  RegisterForm({ onRegisterSuccess })  {
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		full_name: "",
		email: "",
		phone: "",
		username: "",
		password: "",
	});


	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(""); // Reset errors

		// You can add validation here (e.g., check for empty fields)

		try {
		 const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		if (!response.ok) {
			throw new Error("Failed to register.");
		}

		onRegisterSuccess(); 
		
	 } catch (error) {
			setError("An error occurred while registering.");
		}
	};

	const label_style = "block text-sm text-search-text font-semibold mt-2";
	const input_style = "w-full p-2 bg-search-bg text-search-text mt-1 border border-gray-300 rounded-md";

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="full_name" className={label_style}>
						Full Name
					</label>
					<input
						type="text"
						id="full_name"
						name="full_name"
						value={formData.full_name}
						onChange={handleChange}
						className={input_style}
						required
					/>
				</div>

				<div>
					<label htmlFor="email" className={label_style}>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className={input_style}
						required
					/>
				</div>

				<div>
					<label htmlFor="phone" className={label_style}>
						Phone
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						className={input_style}

					/>
				</div>

				<div>
					<label htmlFor="username" className={label_style}>
						Username
					</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						className={input_style}
						required
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="password" className={label_style}>
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className={input_style}
						required
					/>
				</div>
				<div className="flex justify-center mt-9">
					<Button
						text="Register"
						onClick={handleSubmit}
						modifier="w-48"
						type="submit"
					/>
				</div>
			</form>
		</div>
	);
}