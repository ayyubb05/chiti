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

async function fetchUserById (token, user_id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await response.json();
  return user;

}

async function logoutUser(token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Logout failed");
  return await res.json();
}

module.exports = {
	fetchUserProfile,
	fetchUserById,
	logoutUser,
}