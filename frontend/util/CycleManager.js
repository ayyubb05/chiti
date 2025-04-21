async function authFetch(token, url, method = "GET", body = null) {
	const options = {
		method,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	if (body && method !== "GET") {
		options.body = body;
	}

	const response = await fetch(url, options);
	const data = await response.json();

	return {
	  ok: response.ok,
	  status: response.status,
	  message: data.message,
	  cycle: data.cycle,
	};	
}

function fetchCycleHistory(token, group_id) {
	return authFetch(
		token, 
		`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${group_id}/cycle/all`
	);
}

function fetchActiveCycle(token, group_id) {
	return authFetch(
		token, 
		`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${group_id}/cycle/active`
	);
}

function fetchNewCycle(token, group_id) {
	return authFetch(
		token, 
		`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${group_id}/cycle/new`
	);
}

function requestCreateCycle(token, group_id, form_data) {
	const body = JSON.stringify({
		group_id,
		start_date: form_data.start_date,
		payment_deadline: form_data.payment_deadline,
		payout_date: form_data.payout_date,
	});

	return authFetch(
		token,
		`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${group_id}/cycle`,
		"POST",
		body
	);
}

function requestStartCycle(token, group_id) {
	return authFetch(
		token, 
		`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${group_id}/cycle/start`, 
		"PATCH"
	);
}

function requestUpdateCycle(token, group_id) {
	return authFetch(
		token, 
		`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${group_id}/cycle/update`, 
		"PATCH"
	);
}

module.exports = {
	fetchCycleHistory,
	fetchActiveCycle,
	fetchNewCycle,
	requestCreateCycle,
	requestStartCycle,
	requestUpdateCycle,
}