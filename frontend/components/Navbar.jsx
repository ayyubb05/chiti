import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
		<div 
			className="py-3 px-5 bg-green-300 flex items-center justify-between w-full max-w-md mx-auto">

		  <Link href="/dashboard" 
		  	className="bg-green-400 hover:bg-green-500 rounded-full
		  		text-white w-12 h-12 rounded-full flex items-center justify-center">
		  	
    		<FontAwesomeIcon icon={faHome}/>
		  </Link>

		  <Link href="/groups" 
		  	className="bg-green-400 hover:bg-green-500 rounded-full
		  		text-white w-12 h-12 rounded-full flex items-center justify-center">
		  	
    		<FontAwesomeIcon icon={faUsers}/>
		  </Link>


		  <Link href="/profile"
				className="bg-green-400 hover:bg-green-500 rounded-full
		  		text-white w-12 h-12 rounded-full flex items-center justify-center">
		  	
    		<FontAwesomeIcon icon={faUser}/>
		  </Link>

    </div>
  );
}
