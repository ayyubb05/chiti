import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="px-3 pt-9 pb-3 bg-green-300 flex items-center justify-between">
      {/* Left-aligned content */}
      <div className="flex items-center">
        <img 
          src="/cleanwater-logo.svg"
          alt="CHITI Logo"
          width={24}
          height={24}
          className="mr-2"
        />
        <h1 className="font-bold">
          CHITI
        </h1>
      </div>

      {/* Right-aligned button */}
      <div className="ml-auto px-2">
        <Link href="/groups">
          <div className="w-10 h-8 bg-green-400 hover:bg-green-500 rounded-full flex 
            items-center justify-center">      
            <FontAwesomeIcon icon={faBars} className="text-white" />
          </div>
        </Link>
      </div>
    </div>
  );
}