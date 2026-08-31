const USERS_URL = "http://localhost:3000/users";

export async function getUsers(signal) {
  const response = await fetch(USERS_URL, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }

  return response.json();
}

export async function createUser(userData) {
  const response = await fetch(USERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }); 

  if (!response.ok) {
    throw new Error('Failed to create user: ${response.status}');
  }

  const data = await response.json();

  return data.user;
}

export async function updateUser(userId, updates) {
  const response = await fetch(`${USERS_URL}/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.status}`);
  }

  const data = await response.json();

  return data.user;
}

export async function deleteUser(userId) {
  const response = await fetch(`${USERS_URL}/${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user: ${response.status}`);
  }
}
