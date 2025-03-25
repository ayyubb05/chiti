"use client";

import LoginForm from "./LoginForm"; 
import RegisterForm from "./RegisterForm"; 
import { useState } from "react";

export default function SignInPanel() {
  // State to track the active tab (either "login" or "register")
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="w-full p-3 mt-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
      {/* Label Box (Tabs) */}
      <div className="flex mb-4">
        {/* Login Label Box */}
        <div
          className={`w-1/2 border-b-2 text-center py-2 cursor-pointer ${activeTab === "login" ? "border-green-500 text-green-500" : "border-transparent text-gray-500"}`}
          onClick={() => setActiveTab("login")}
        >
          <p className="text-xl font-bold">Login</p>
        </div>

        {/* Register Label Box */}
        <div
          className={`w-1/2 border-b-2 text-center py-2 cursor-pointer ${activeTab === "register" ? "border-green-500 text-green-500" : "border-transparent text-gray-500"}`}
          onClick={() => setActiveTab("register")}
        >
          <p className="text-xl font-bold">Register</p>
        </div>
      </div>

      {/* Conditional rendering based on activeTab */}
      {activeTab === "login" && <LoginForm />}
      {activeTab === "register" && <RegisterForm />}
    </div>
  );
}