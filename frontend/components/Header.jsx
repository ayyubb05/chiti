"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Get token from localStorage
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        credentials: "include", // Ensures cookies are included
      });

      if (response.ok) {
        // Remove token from localStorage
        localStorage.removeItem("token");

        // Redirect to home page after logout
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="px-3 pt-9 pb-3 bg-green-300 flex items-center justify-between">
      {/* Left-aligned content */}
      <div className="flex items-center">
        <img 
          src="/cleanwater-logo.svg"
          alt="CHITI Logo"
          width={24}
          height={24}
          className="mr-2"
        />
        <h1 className="text-black text-lg font-bold">CHITI</h1>
      </div>

      {/* Logout Button */}
      <div className="ml-auto px-2">
        <button 
          onClick={handleLogout} 
          className="w-10 h-8 bg-green-400 hover:bg-green-500 rounded-full flex items-center justify-center text-white">
          <FontAwesomeIcon icon={faSignOut} />
        </button>
      </div>
    </div>
  );
}