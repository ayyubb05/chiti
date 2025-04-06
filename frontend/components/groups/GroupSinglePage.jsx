"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEdit,
  faDollar,
  faEye,
  faEyeSlash,
  faTimes,
  faTrash,
  faPlug,
} from "@fortawesome/free-solid-svg-icons";

import MembersList from "@/components/MembersList";
import GroupSingleHeader from "@/components/groups/GroupSingleHeader";
import {
  fetchGroupByID,
  fetchUserByID,
  fetchMembers,
  sendJoinRequest,
} from "@/util/GroupsManager";

export default function Home({ group_id }) {
  const router = useRouter();

  const [groupData, setGroupData] = useState({});
  const [adminName, setAdminName] = useState("");
  const [memberCount, setMemberCount] = useState(0);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");

      if (!group_id || !token) {
        setError("Missing group ID or auth token.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const group = await fetchGroupByID(token, group_id);
        setGroupData(group);

        // Fetch admin
        const admin = await fetchUserByID(token, group.admin_id);
        setAdminName(admin.username);

        // Fetch members
        const groupMembers = await fetchMembers(token, group_id);
        setMembers(groupMembers);
        setMemberCount(groupMembers.length);
      } catch (err) {
        setError("An error occurred while loading the group.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [group_id]);

  const handleJoinRequest = async () => {
    const token = localStorage.getItem("token");
    if (!token || !group_id) return;
    try {
      await sendJoinRequest(token, group_id);
      alert("Join request sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send join request.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative">

      <div className="flex flex-col items-center p-2">
        <div className="w-full max-w-md bg-green-800 shadow-lg rounded-lg p-2 text-center text-white">
          <div className="w-24 h-24 bg-green-900 border-2 border-white rounded-full mx-auto mb-4"></div>

          <p>Name: {groupData.name}</p>
          <p>Admin: {adminName}</p>
          <p>Description: {groupData.description}</p>
          <p>
            Members: {memberCount} / {groupData.group_size}
          </p>
          <p>
            Monthly Fee: <FontAwesomeIcon icon={faDollar} /> {groupData.monthly_fee}
          </p>
          <p>Payment Due: {groupData.payment_deadline}th</p>
          <p>Payout Day: {groupData.payout_day}th</p>
          <p>
            Visibility:  
            {groupData.visibility === "public" ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </p>
        </div>

        <div className="w-full max-w-md mt-6">
          <div className="bg-green-800 shadow-md rounded-lg p-4 flex flex-col gap-3">
            <button
              onClick={handleJoinRequest}
              className="w-full py-3 bg-green-500 rounded hover:bg-green-600"
            >
              Request to Join
              <FontAwesomeIcon icon={faPlug} className="pl-2" />
            </button>

            <button
              onClick={() => setShowMembers(true)}
              className="w-full py-3 bg-green-500 rounded hover:bg-green-600"
            >
              Members
            </button>

            <button className="w-full py-3 bg-green-500 rounded hover:bg-green-600">
              Group Chat
            </button>
          </div>
        </div>
      </div>

      {/* Members Overlay */}
      {showMembers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 relative">
            <button
              onClick={() => setShowMembers(false)}
              className="absolute top-2 right-2 text-gray-700"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <MembersList members={members} />
          </div>
        </div>
      )}
    </div>
  );
}