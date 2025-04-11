"use client"; 
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";

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
      
      router.push("/home"); // Redirect on success
    } catch (error) {
      setError("An error occurred while logging in.");
    }
  };


	const label_style = "block text-sm text-search-text font-semibold mt-2";
	const input_style = "w-full p-2 bg-search-bg mt-1 mb-4 text-search-text border border-gray-300 rounded-md";


  return (
    <div>
      <form onSubmit={handleSubmit}>
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
		<div>
		  <Button
		    text="Login"
		    onClick={handleSubmit}
		  />
		</div>
   		</form>
    </div>
  );
}