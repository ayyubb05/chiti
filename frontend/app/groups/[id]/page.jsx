"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { fetchGroupById } from "@/util/GroupsManager";
import { fetchUserById } from "@/util/ProfileManager";
import cycleManager from "@/util/CycleManager";
import CycleForm  from "@/components/forms/CycleForm";
import MembersList  from "@/components/MembersList";


// Font Awesome Icon Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faDollar,faBars, faArrowLeft, 
         faEye, faEyeSlash, faTimes, faTrash, faPlug, faHome} from "@fortawesome/free-solid-svg-icons";



function PageTitle({ title }) {
  const router = useRouter();
  const handleReturn = async () => {
    router.back(); 
  };

  return (
    <div className="w-full text-title-text flex justify-between items-center">
      <h2 className="font-bold text-[36px]">{title}</h2>
      <div className="flex space-x-4">
	      <button onClick={handleReturn}>
	        <FontAwesomeIcon className="text-[20px]" icon={faArrowLeft} />
	      </button>
	      <Link href="/home">
	        <FontAwesomeIcon className="text-[20px]" icon={faHome} />
	      </Link>
	    </div>
    </div>
  );
}


const CYCLE_STATUS = {
  INACTIVE: "inactive",
  ACTIVE: "active",
  COMPLETED: "completed",
};



function GroupDetails({token, router, group, conditions}) {
	const { isLoading, isAdmin } = conditions;

	useEffect(() => {
	}, [token, group.id]);
 
  return (
    <div>
      <div className="m-4 border border-green text-white px-2 flex flex-col justify-center">
	      { isLoading && (<p className="text-white">Loading...</p>) }
	      { !isLoading && (
  	    	<>
          <p>Name: {group.name}</p>
          <p>Admin: {group.admin_name}</p>
          <p>Description: {group.description}</p>
          <p>Members: 0 / {group.group_size}</p>
          <p>Monthly Fee: <FontAwesomeIcon icon={faDollar} /> {group.monthly_fee}</p>
          <p>
            Visibility:&nbsp;
            {group.visibility === "public" ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </p>
    	  	</>
  	    )}
      </div>
    </div>
  );
}


function CycleContainer ({token, router, group, conditions}) {
	const { isAdmin } = conditions;
  const [ cycle, setCycle ] = useState({});
  const [ showCycle, setShowCycle ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
	const [ cycleStatus, setCycleStatus ] = useState(null); // 'inactive', 'active', 'completed', etc.	


	useEffect(() => {
	  const fetchCycle = async () => {
	    if (!token || !group.id) return;

	    try {
	      let res = await cycleManager.fetchActiveCycle(token, group.id);

	      if (!res.ok) {
	        // Try inactive cycle if no active one found
	        res = await cycleManager.fetchNewCycle(token, group.id);
	      }

	      if (!res.ok) {
	        // Neither cycle found → state 1: no cycle
	        setCycleStatus(null);
	        return;
	      }

	      // Either inactive or active cycle found
	      setCycle(res.cycle);
	      setCycleStatus(res.cycle.status);

	    } catch (err) {
	      console.error("Error fetching cycle:", err);
	    } finally {
	      setIsLoading(false);
	    }
	  };

	  fetchCycle();
	}, [token, group.id]);

  const startCycle = async (token, group_id) => {
		setCycleStatus(CYCLE_STATUS.ACTIVE); 
    return await cycleManager.requestStartCycle(token, group_id);
  }

  const createCycle = async (token, group_id, form) => {
		setCycleStatus(CYCLE_STATUS.INACTIVE); 
    return await cycleManager.requestCreateCycle(token, group_id, form);
  }

	const showCycleForm = () => {
	  setShowCycle((prev) => !prev);
	}

	const CycleInfo = () => {
	  const parseDate = (str) => {
	    const [year, month, day] = str.split('-').map(Number);
	    return new Date(year, month - 1, day);
	  };

	  const formatDate = (date) =>
	    date.toLocaleDateString('en-US', {
	      year: 'numeric',
	      month: 'long',
	      day: '2-digit',
	    });

	  const baseDate = parseDate(cycle.start_date);
	  const formattedStartDate = formatDate(baseDate);
	  const endDate = parseDate(cycle.end_date);
	  const formattedEndDate = formatDate(endDate);

	  const paymentDeadline = new Date(baseDate);
	  paymentDeadline.setMonth(paymentDeadline.getMonth() + cycle.cycle_progress);
	  paymentDeadline.setDate(cycle.payment_deadline);

	  const payoutDate = new Date(baseDate);
	  payoutDate.setMonth(payoutDate.getMonth() + cycle.cycle_progress);
	  payoutDate.setDate(cycle.payout_date);

	  return (
	    <div className="text-chiti-text">
	      <p>Cycle Start: {formattedStartDate}</p>
	      <p>Cycle End: {formattedEndDate}</p>
	      <p>Cycle Status: {cycle.status}</p>
	      <p>Cycle Progress: {cycle.cycle_progress} / {cycle.length}</p>
	      <p>Payment Deadline: {formatDate(paymentDeadline)}</p>
	      <p>Payout Date: {formatDate(payoutDate)}</p>
	    </div>
	  );
	}

  return (
      <div className="m-4 border border-green px-2 flex flex-col justify-center">
        { isLoading && (<p className="text-white">Loading...</p>) }
        { !isLoading && (
          <div className="flex flex-col m-2 py-2 gap-y-2">
					{ isAdmin && !cycleStatus && 
					  <Button text="Create Cycle" onClick={showCycleForm} />
					}

					{ isAdmin && cycleStatus === "inactive" &&
				    <Button text="Start Cycle" onClick={() => startCycle(token, group.id)} />
					}

					{cycleStatus && 
					    <CycleInfo />
					}

					{ isAdmin && !cycleStatus && showCycle &&
					  <CycleForm onSubmit={(form_data) => createCycle(token, group.id, form_data)} />
					}

					{ !isAdmin &&
					  <Button text="Request to Join" />
					}
          </div>
        )}
      </div>
    );
}



function ButtonsContainer ({token, router, group, conditions}) {
	const { isLoading, isAdmin } = conditions;
  const [ showMembers, setShowMembers ] = useState(false);

	const showMembersList = () => {
	  setShowMembers((prev) => !prev);
	}

  return (
      <div className="m-4 border border-green px-2 flex flex-col justify-center">
        { isLoading && (<p className="text-white">Loading...</p>) }
        { !isLoading && (
          <div className="flex flex-col m-2 py-2 gap-y-2">
            <Button text="Members" onClick={showMembersList}/>
            { showMembers &&
              <MembersList/> 
						}
            <Button text="Group Chat" />
          </div>
        )}
      </div>
    );
}


export default function Home() {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const user_id = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
  const { id } = useParams();

  const [ group, setGroup ] = useState({});
  const [ adminName, setAdminName ] = useState("");
  const [ isAdmin, setIsAdmin ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) throw new Error("No token found.");
        const group_data = await fetchGroupById(token, id);
        const admin = await fetchUserById(token, group_data.admin_id);

        setIsAdmin(group_data.admin_id == user_id);
				setGroup({ ...group_data, admin_name: admin.username });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token, id]);

  return (
    <div className="w-full my-4 px-6 md:max-w-3xl md:mx-auto">
      <PageTitle title="Group" />
      <GroupDetails token={token} router={router} group={group} conditions={{isAdmin}}/>
      <CycleContainer token={token} router={router} group={group} conditions={{isLoading,isAdmin}}/>
      <ButtonsContainer token={token} router={router} group={group} conditions={{isLoading,isAdmin}}/>
    </div>
  );
}
