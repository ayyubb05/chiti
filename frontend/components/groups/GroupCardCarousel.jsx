"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLevelUp } from "@fortawesome/free-solid-svg-icons";
import ButtonStandard from "@/components/ui/buttons/ButtonStandard";
import GroupCard from "@/components/groups/GroupCard";


export default function GroupCardCarousel({ groupCards }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const router = useRouter();
	const scrollRef = useRef(null);

	const scrollToIndex = (index) => {
		const container = scrollRef.current;
		const cardWidth = container.offsetWidth;
		container.scrollTo({
			left: cardWidth * index,
			behavior: "smooth",
		});
		setCurrentIndex(index);
	};

	const handleScroll = () => {
		const container = scrollRef.current;
		const index = Math.round(container.scrollLeft / container.offsetWidth);
		setCurrentIndex(index);
	};

	const goToGroup = (group_id) => {
		router.push(`/groups/${group_id}`);
	};

	return (
		<div className="relative w-full">
			{/* Horizontal Scroll Container */}
			<div
				ref={scrollRef}
				onScroll={handleScroll}
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Firefox, IE
				className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
			>
				{groupCards.map((card, index) => (
					<div
						key={index}
						className="min-w-full snap-center px-2"
					>
						{/* Replace below div with your actual <GroupCard /> */}
						<GroupCard group={card} />
						<ButtonStandard
							callback_function={() => goToGroup(card.id)}
							button_text={"View Group"}
							icon={faLevelUp}
						/>
					</div>
				))}
			</div>

			{/* Dot indicators */}
			<div className="flex justify-center mt-2 space-x-1">
				{groupCards.map((_, index) => (
					<button
						key={index}
						onClick={() => scrollToIndex(index)}
						className={`h-2 w-2 rounded-full ${
							index === currentIndex ? "bg-green-500" : "bg-gray-300"
						}`}
					></button>
				))}
			</div>
		</div>
	);
}