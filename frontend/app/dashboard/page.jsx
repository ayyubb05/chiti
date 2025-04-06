"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import GroupCardCarousel from "@/components/groups/GroupCardCarousel";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ButtonPill from "@/components/ui/buttons/ButtonPill";
import { fetchMyGroups } from "@/util/GroupsManager";

function Header() {
	return (
		<div className="px-2 py-1 bg-green-400">
			<div className="w-full flex justify-between items-center">
				<h2 className="text-white font-bold text-lg">DASHBOARD</h2>
			</div>
		</div>
	);
}

function MyGroupsContainer() {
	const router = useRouter();
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
	const [ groups, setGroups ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!token) throw new Error("No token found.");
				setGroups(await fetchMyGroups(token));
			} catch (err) {
				setError(`Failed to fetch groups. ${err}`);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	},[token]);

	const goToMyGroups = () => {
		router.push("/profile/my-groups")
	}

	const goToCreateGroup = () => {
		router.push("/groups/create-group")
	}

	return (
		<div className="relative mt-6 mx-2 px-1">
			<div className="absolute -top-2 left-4 bg-green-100 px-2  text-sm text-green-900">
				My Groups
			</div>

			<div className="border border-green-900 rounded-md pt-5 pb-3 px-1 bg-transparent">
				{loading && <p className="text-black">Loading groups...</p>}
				{!loading && !error && groups.length === 0 && (
					<p className="text-black">No groups available.</p>
				)}
				{!loading && !error && groups.length > 0 && (
					<>
		        <div className="flex space-x-2 justify-center mb-2"> 
							<ButtonPill
								callback_function={() => goToMyGroups()}
								button_text={"All Groups"}
								icon={''}
							/>
							<ButtonPill
								callback_function={() => goToCreateGroup()}
								button_text={"New Group"}
								icon={faPlus}
							/>
						</div>
						<GroupCardCarousel groupCards={groups} />
					</>
				)}
			</div>
		</div>
	);
}

function Component2() {
	return (
		<div className="w-full my-2 ">
			<input
				type="text"
				placeholder="Search..."
				className="w-full bg-green-100 text-black px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
			/>
		</div>
	);
}

function dummy() {
	console.log("Hey! Don't click that!");
}

export default function Home() {
	useEffect(() => {

	}, []);

	return (
		<>
			<Header />
			<MyGroupsContainer />		 
		</>
	);
}





