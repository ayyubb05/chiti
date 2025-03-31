"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faDollar, faEye, faEyeSlash, faTimes } from "@fortawesome/free-solid-svg-icons";
import MembersList from "@/components/MembersList"; // Import MembersList component

export default function Home() {
  const { id: group_id } = useParams();
  const router = useRouter();
  const [groupData, setGroupData] = useState({});
  const [adminName, setAdminName] = useState("");
  const [memberCount, setMemberCount] = useState(0);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMembers, setShowMembers] = useState(false); // State for overlay visibility
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchGroup = async () => {
    if (!group_id || !token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${group_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch group.");

      const data = await response.json();
      setGroupData(data);

      if (data.admin_id) getUserByID(data.admin_id);
      fetchMembers();
    } catch (err) {
      setError("An error occurred while fetching groups.");
    } finally {
      setLoading(false);
    }
  };

  const getUserByID = async (user_id) => {
    if (!user_id || !token) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile.");

      const user = await response.json();
      setAdminName(user.username);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchMembers = async () => {
    if (!group_id || !token) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${group_id}/members`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch members.");

      const data = await response.json();
      setMembers(data.members);
      setMemberCount(data.members.length);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, [group_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative">
      <div className="px-2 py-1 bg-green-400">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">GROUP</h2>
          <div className="flex space-x-2">
            <button className="w-10 h-8 bg-green-400 hover:bg-green-500 rounded-full flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center p-2">
        <div className="w-full max-w-md bg-green-800 shadow-lg rounded-lg p-2 text-center text-white">
          <div className="w-24 h-24 bg-green-900 border-2 border-white rounded-full mx-auto mb-4"></div>

          <p>Name: {groupData.name}</p>
          <p>Admin: {adminName}</p>
          <p>Description: {groupData.description}</p>
          <p>Members: {memberCount} / {groupData.group_size}</p>
          <p>
            Monthly Fee: <FontAwesomeIcon icon={faDollar} /> {groupData.monthly_fee}
          </p>
          <p>Payment Due: {groupData.payment_deadline}th</p>
          <p>Payout Day: {groupData.payout_day}th</p>

          {groupData.visibility === "public" ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </div>

        <div className="w-full max-w-md mt-6">
          <div className="bg-green-800 shadow-md rounded-lg p-4 flex flex-col gap-3">
            <button
              onClick={() => setShowMembers(true)}
              className="w-full py-3 bg-green-500 rounded hover:bg-green-600"
            >
              Members
            </button>
            <button className="w-full py-3 bg-green-500 rounded hover:bg-green-600">Group Chat</button>
            <button className="w-full py-3 bg-green-500 rounded hover:bg-green-600">Button 3</button>
          </div>
        </div>
      </div>

      {/* Members Overlay */}
      {showMembers && (
        <div className="relative flex">
          <div className="w-full h-full bg-white shadow-lg ">
            <div className=" justify-between items-center bg-green-800 text-white">
              <button onClick={() => setShowMembers(false)} className="pl-2 pt-2 text-white">
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>
            <MembersList members={members} />
          </div>
        </div>
      )}
    </div>
  );
}