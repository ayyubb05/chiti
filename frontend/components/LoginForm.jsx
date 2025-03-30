"use client"; 
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
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
    setError(""); 

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to login.");

      const data = await response.json();
      localStorage.setItem("token", data.token); // Correct localStorage usage
      
      router.push("/dashboard"); // Redirect on success
    } catch (error) {
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
		<div>
		  <button
		    type="submit"
		    className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
		  >
		    Login
		  </button>
		</div>
   		</form>
    </div>
  );
}