"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateGroupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    monthly_fee: "",
    group_size: "",
    payment_deadline: "",
    payout_day: "",
    visibility: "public",
  });

  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "payment_deadline" || name === "payout_day") {
      newValue = Math.min(28, Math.max(1, Number(value))); // Clamps value between 1 and 28
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("You must be logged in to create a group.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create group.");
      }

      const responseData = await response.json();
      goToGroup(Number(responseData.group.id));
    } catch (error) {
      setError(error.message);
    }
  };

  const goToGroup = useCallback((group_id) => {
    router.push(`/groups/${group_id}`);
  }, [router]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}

        <div className="w-full my-2">
          <input
            type="text"
            name="name"
            placeholder="Group Name..."
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-green-100 text-black px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="w-full my-2">
          <input
            type="text"
            name="description"
            placeholder="Description..."
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-green-100 text-black px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="w-full my-2">
          <input
            type="number"
            name="monthly_fee"
            placeholder="Monthly Fee..."
            value={formData.monthly_fee}
            onChange={handleChange}
            className="w-full bg-green-100 text-black px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="w-full my-2">
          <select
            name="group_size"
            value={formData.group_size}
            onChange={handleChange}
            className="w-full bg-green-100 text-black px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>Select Group Size...</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="12">12</option>
          </select>
        </div>

        <div className="w-full my-2">
          <input
            type="number"
            name="payment_deadline"
            placeholder="Payment Deadline (1-28)..."
            value={formData.payment_deadline}
            onChange={handleChange}
            min="1"
            max="28"
            className="w-full bg-green-100 text-black px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="w-full my-2">
          <input
            type="number"
            name="payout_day"
            placeholder="Payout Day (1-28)..."
            value={formData.payout_day}
            onChange={handleChange}
            min="1"
            max="28"
            className="w-full bg-green-100 text-black px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="w-full my-2">
          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className="w-full bg-green-100 text-black px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Create Group
        </button>
      </form>
    </div>
  );
}