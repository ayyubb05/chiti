"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function MembersList({ members = [] }) {

  return (
    <div className="w-full bg-green-800">
	    <h1 className="text-white text-lg font-bold mb-4 px-4">Members</h1>
	    <div className="flex flex-col gap-3 mx-2 px-2 pb-4">
	      {members?.map((member, index) => (
	        <div key={index} className="flex rounded text-black items-center justify-between w-full py-3 bg-green-300 px-3">
	          <p>{member.User.username}</p>
	          <Link href={`/profile/${member.User.id}`}>
	            <button className="text-green-800 hover:text-green-600">
	              <FontAwesomeIcon icon={faUser} />
	            </button>
	          </Link>
	        </div>
	      ))}
	    </div>
    </div>
  );
}