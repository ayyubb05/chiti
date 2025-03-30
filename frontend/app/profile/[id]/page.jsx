"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProfilePage from "@/components/ProfilePage";

export default function UserProfile() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile.");

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError("Error fetching profile.");
      }
    };

    fetchProfile();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!profileData) return <p className="text-gray-500">Loading...</p>;

  return <ProfilePage profileData={profileData} />;
}