"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { faLevelUp } from "@fortawesome/free-solid-svg-icons";
import GroupCard from "@/components/groups/GroupCard";
import ButtonStandard from "@/components/ui/buttons/ButtonStandard";
import { fetchGroups } from "@/util/GroupsManager";

export default function GroupList() {
	const router = useRouter();
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

	const [ groups, setGroups ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!token) throw new Error("No token found.");
				setGroups(await fetchGroups(token));
			} catch (err) {
        setError("Failed to fetch groups.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	},[]);


	const goToGroup = (group_id) => {
		router.push(`/groups/${group_id}`);
	};

	return (
		<div className="p-2">
			{loading && <p className="text-white">Loading groups...</p>}
			{error && <p className="text-red-500">{error}</p>}

			{!loading && !error && groups.length === 0 && (
				<p className="text-white">No groups available.</p>
			)}

			<ul className="space-y-4">
				{groups.map((group) => (
					<li 
						key={group.id} 
						className="w-full flex flex-col bg-white rounded-lg shadow">
						
						<GroupCard group={group} />

						<ButtonStandard
							callback_function={() => goToGroup(group.id)}
							button_text={"View Group"}
							icon={faLevelUp}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}