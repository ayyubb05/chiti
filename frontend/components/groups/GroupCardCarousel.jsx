import { Carousel } from 'flowbite-react';

const GroupCardCarousel = ({ groupCards }) => {
	if (!groupCards) {
		throw new Error("groupCards cannot be undefined.");
	} 
	return (
		<Carousel>
		{groupCards.map((card, index) => (
			<div key={index} className="flex justify-center items-center">
				{/* Render your group card component here */}
			{card}
			</div>
			))}
		</Carousel>
		);
}
