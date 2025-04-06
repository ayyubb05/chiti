import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

export default function GroupCard({group}) {
  const payout_total = Number(group.group_size) * Number(group.monthly_fee);

  return (
    <div className="w-full">
      <div className="w-full bg-green-800 rounded-t p-3">
        <div className="flex w-full">
          {/* Profile Picture - Cell 1 (50% width) */}
          <div className="w-1/3 flex justify-center items-center">
            <div className="w-24 h-24 bg-green-900 border-2 border-white rounded-full"></div>
          </div>

          {/* User Info - Cell 2 (50% width, centered content, smaller text) */}
          <div className="w-2/3 bg-green-900 rounded p-1 flex flex-col justify-center items-center text-center">
            <h2 className="text-sm font-semibold text-white">{group.name}</h2>
            <p className="text-xs text-white">Members: [ {group.member_count} / {group.group_size} ]</p>
            <p className="text-xs text-white">Buy In: <FontAwesomeIcon icon={faDollarSign} /> {Number(group.monthly_fee)}</p>
            <p className="text-xs text-white">Payout: <FontAwesomeIcon icon={faDollarSign} /> {payout_total}</p>
            <p className="text-[10px] text-white">Join By: 04/12/25</p>
          </div>
        </div>
      </div>
    </div>
  );
}