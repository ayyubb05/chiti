async function fetchUserProfile (token) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();
	return data;
}


module.exports = {
	fetchUserProfile,
}