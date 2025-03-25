"use client";

import { useState } from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faDollarSign } from "@fortawesome/free-solid-svg-icons"; // FontAwesome icons

export default function GroupCard() {
  const [imageUrl, setImageUrl] = useState(null); // Placeholder for user image (null means no image)
  const groupName = "Sample Group";
  const membersCount = 10;
  const payoutAmount = "200";

  // Default image fallback style
  const defaultImageStyle = {
    backgroundColor: "#d1d5db", // A greyish shade to make the circle darker than the card
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    color: "#fff",
    fontSize: "2rem", // To display the first letter of the group or something simple
  };

  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden flex">
      {/* Left Column (Image) */}
      <div className="w-1/3 flex justify-center items-center p-1">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Group"
            className="w-16 h-16 object-cover rounded-full"
          />
        ) : (
          <div style={defaultImageStyle} className="w-16 h-16">
            {/* If no image, show the first letter of the group */}
            {groupName.charAt(0)}
          </div>
        )}
      </div>

      {/* Right Column (Text) */}
      <div className="w-2/3 p-2 flex flex-col justify-between">
        {/* Group Name (50% height) */}
        <h2 className="text-xl font-semibold mb-2">{groupName}</h2>

        {/* Members Count (15% height) */}
        <div className="flex items-center mb-2 text-gray-600">
          <FontAwesomeIcon icon={faUsers} className="mr-2" />
          <span>{membersCount} Members</span>
        </div>

        {/* Payout Amount (35% height) */}
        <div className="flex items-center text-green-500">
          <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
          <span>{payoutAmount} Payout</span>
        </div>
      </div>
    </div>
  );
}