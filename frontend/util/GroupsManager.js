async function fetchGroups (token) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/groups`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const groups = await response.json();
  return groups;
};

async function fetchGroupByID (token, group_id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${group_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const group = await response.json();
  return group;
};

async function fetchUserByID (token, user_id) {
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

async function fetchMembers (token, group_id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${group_id}/members`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.members;

}

async function deleteGroup (token, group_id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${group_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}


async function sendJoinRequest (token, group_id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${group_id}/join-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

async function isAdmin (group_id, user_id) {
  return false;
}


module.exports = {
  fetchGroups,
  fetchGroupByID,
  fetchUserByID,
  fetchMembers,
  deleteGroup,
  sendJoinRequest,
  isAdmin,
}