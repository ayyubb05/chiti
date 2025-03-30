"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import GroupCard from "@/components/GroupCard";
import SearchBar from "@/components/ui/SearchBar";

export default function Home() {
  const router = useRouter();
  const [groupData, setGroupData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [createGroupVisibility, setCreateGroupVisibility] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/groups`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch groups.");

        const data = await response.json();
        setGroupData(data);
      } catch (err) {
        setError("An error occurred while fetching groups.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);
  const goToGroup = useCallback((group_id) => {
    router.push(`/groups/${group_id}`);
  }, [router]);
  const toggleSearchVisibility = () => {
    setCreateGroupVisibility(false);
    setSearchVisibility((prev) => !prev);
  };
  const toggleCreateGroupVisibility = () => {
    setSearchVisibility(false);
    setCreateGroupVisibility((prev) => !prev);
  };


  return (
    <div className="bg-green-100 ">
      <div className="px-2 py-1 bg-green-400">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">GROUPS</h2>

          <div className="flex space-x-2"> 
            <button
              onClick={toggleSearchVisibility}
              className="w-10 h-8 bg-green-400 hover:bg-green-500 rounded-full flex 
                items-center justify-center text-white"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>

            <button
              onClick={toggleCreateGroupVisibility}
              className="w-10 h-8 bg-green-400 hover:bg-green-500 rounded-full flex 
                items-center justify-center text-white"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        {searchVisibility && <SearchBar/>}
        {createGroupVisibility && <SearchBar/>}
      </div>
      <div className="p-2">
        {loading && <p className="text-white">Loading groups...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && groupData.length === 0 && (
          <p className="text-white">No groups available.</p>
        )}

        <ul className="space-y-4">
          {groupData.map((group) => (
            <li 
              key={group.id} 
              className="w-full flex flex-col bg-white rounded-lg shadow">
              
              <GroupCard
                group={group}
              />

              <button 
                onClick={() => goToGroup(group.id)}
                className="w-full bg-green-600 text-white text-xs p-3 rounded-b hover:bg-green-700">
                <p><FontAwesomeIcon icon={faPlus} /> Request to Join Group</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}