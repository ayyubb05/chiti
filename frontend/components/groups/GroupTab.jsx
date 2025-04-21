"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function GroupTab ({ group, onClick }) {
  return (
    <button 
      className="bg-chiti-green text-chiti-text w-full py-4 px-8 rounded-lg hover:opacity-90 transition-opacity mb-3"
      onClick={onClick}
    >
    <div className="flex justify-between items-center">
	    <h2 className="text-lg font-semibold text-white">{group.name}</h2>
			<FontAwesomeIcon className="text-[26px]" icon={faChevronRight} />    	
    </div>
    </button>
  );
};


