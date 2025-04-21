"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { fetchActiveCycle } from "@/util/CycleManager";

export default function UpcomingCard ({ group, onClick }) {
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
	const [ cycle, setCycle ] = useState({});

	const isSelected = false;
	const amount_due = group.monthly_fee;
	const due_date = "Tomorrow";
	const group_name = group.name;

  // attributes: ['id', 'group_id', 'start_date', 'end_date', 'status', 'cycle_progress', 'cycle_length', 'payout_order'],

	useEffect(() => {
		const getCycleData = async (group_id) => {
			try {
				if (!token) throw new Error("No token found.");
				const data = await fetchActiveCycle(token, group_id);
				setCycle(data);
			} catch (err) {
				console.error(err);
			}
		}
		getCycleData(group.id);
	}, [token, group]);


	return (
		<button 
			className="bg-chiti-green text-chiti-text w-full py-4 px-8 rounded-lg hover:opacity-90 transition-opacity mb-3"
			onClick={onClick}
		>
			<div className="grid grid-cols-2 grid-rows-2 w-full">
			  {/* Pay Amount - top-left */}
				<div className="self-start justify-self-start flex items-center text-white">
				  <FontAwesomeIcon className="mx-1 text-[40px]" icon={faDollarSign} />
				  <p className="font-semibold text-[36px]">{amount_due}</p>
				</div>

			  {/* Due Date - top-right */}
			  <div className="self-start justify-self-end">
			    <p className="text-sm font-semibold text-chiti-text">{due_date}</p>
			  </div>

			  {/* Group Name - bottom center (spanning 2 columns) */}
			  <div className="col-span-2 self-end justify-self-start">
			    <p className="text-md font-semibold text-white">
			      Payment Due to {group.name}
			    </p>
			  </div>
			</div>
		</button>
	);
};
