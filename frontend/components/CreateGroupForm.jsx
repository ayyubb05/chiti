"use client";

import { useState } from "react";

export default function  RegisterForm({ onRegisterSuccess })  {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="full_name" className="block text-sm text-green-700 font-semibold mt-2">
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
		    className="w-full p-2 bg-[#FFF5E1] mt-1 border border-gray-300 rounded-md text-green-700"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-green-700 font-semibold mt-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
		    className="w-full p-2 bg-[#FFF5E1] mt-1 border border-gray-300 rounded-md text-green-700"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm text-green-700 font-semibold mt-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
		    className="w-full p-2 bg-[#FFF5E1] mt-1 border border-gray-300 rounded-md text-green-700"
            
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm text-green-700 font-semibold mt-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
		    className="w-full p-2 bg-[#FFF5E1] mt-1 border border-gray-300 rounded-md text-green-700"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm text-green-700 font-semibold mt-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
		    className="w-full p-2 bg-[#FFF5E1] mt-1 border border-gray-300 rounded-md text-green-700"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}