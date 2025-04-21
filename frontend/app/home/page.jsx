"use client";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faWarning } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "@/util/ProfileManager";
import { fetchMyGroups } from "@/util/GroupsManager";
import { fetchCycleByGroupId } from "@/util/CycleManager";
import GroupCardCarousel from "@/components/groups/GroupCardCarousel";
import GroupTab from "@/components/groups/GroupTab";
import UpcomingCard from "@/components/groups/UpcomingCard";


function PageTitle({ title }) {
  const router = useRouter();
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await logoutUser(token); // backend logout
    } catch (err) {
      console.error("Failed to logout on server:", err);
    }

    localStorage.removeItem("token"); // clear it no matter what
    router.push("/"); // go to splash screen
  };

  return (
    <div className="w-full text-title-text flex justify-between items-center">
      <h2 className="font-bold text-[36px]">{title}</h2>
      <button onClick={handleLogout}>
        <FontAwesomeIcon className="text-[20px]" icon={faBars} />
      </button>
    </div>
  );
}


function CategoryTitle({ title }) {
	return (
		<div className="w-full text-title-text flex justify-between items-center">
			<h2 className="font-bold text-[20px]">{title}</h2>
		</div>
	);
}


function MyGroupsContainer({ token, router }) {
	const [ groups, setGroups ] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!token) throw new Error("No token found.");
				const data = await fetchMyGroups(token);
				setGroups(data);
			} catch (err) {
				console.error(err);
			}
		}
		fetchData();
	},[token]);


	const goToGroupById = (group_id) => {
		router.push(`/groups/${group_id}`);
	};

	return (
		<div className="relative mt-6">
			<CategoryTitle title="Your Groups" />

			<div className="border border-green-900 rounded-md my-1 px-3 pt-3 bg-transparent flex text-white ">
				<div>
					{groups.map((group) => (
						<GroupTab key={group.id} group={group} onClick={()=> goToGroupById(group.id)} />
					))}
				</div>
			</div>
			<Link href="/profile/my-groups" className="text-white text-right">
			  Go to Groups
			</Link>
		</div>
	);
}

function UpcomingContainer({ token, router }) {
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!token) throw new Error("No token found.");
				const groupList = await fetchMyGroups(token);
				setGroups(groupList);

			} catch (err) {
				console.error(err);
			}
		};

		fetchData();
	}, [token]);

	const goToGroupById = (group_id) => {
		router.push(`/groups/${group_id}`);
	};
	return (
		<div className="relative mt-6">
			<CategoryTitle title="Upcoming" />
			<div className="border border-green-900 rounded-md my-1 px-3 pt-3 bg-transparent flex text-white">
				<div>
					{groups.map((group) => (
						<UpcomingCard
							key={group.id}
							group={group}
							onClick={() => goToGroupById(group.id)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}


function FriendsContainer({ token, router }) {
	return (
		<div className="relative mt-6">
			<CategoryTitle title="Friends" />
			<div className="border border-green-900 rounded-md pt-5 pb-3 px-1 bg-transparent flex text-white ">
				<h2 className="px-4 ">WOW! You have no friends...</h2>
				<button onClick={dummy}>
	        <FontAwesomeIcon className="text-[20px]" icon={faWarning} />
				</button>
			</div>
		</div>
	);
}


function dummy() {
	alert("Hey! Don't click that!");
}


export default function Home() {
	const router = useRouter();
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

	return (
		<div className="w-full my-4 px-6 md:max-w-3xl md:mx-auto">
			<PageTitle title="Home" />
			<MyGroupsContainer token={token} router={router}/>
			<UpcomingContainer token={token} router={router}/>
			<FriendsContainer token={token} router={router}/>
		</div>
	);
}



