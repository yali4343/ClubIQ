let users = [
  {
    id: 1,
    name: "Yali",
    age: 26,
  },
  {
    id: 2,
    name: "Daniel",
    age: 24,
  },
];

function getNextUserId() {
  return (
    users.reduce(
      (highestId, currentUser) => Math.max(highestId, currentUser.id),
      0,
    ) + 1
  );
}

function getAllUsers() {
  return users;
}

function findUserById(userId) {
  return users.find((user) => user.id === userId);
}

function createUser(userData) {
  const newUserId = getNextUserId();

  const newUser = {
    id: newUserId,
    ...userData,
  };

  users = [...users, newUser];

  return newUser;
}

function updateUser(userId, userData) {
  const existingUser = findUserById(userId);

  if (!existingUser) {
    return null;
  }

  const updatedUser = {
    ...existingUser,
    ...userData,
  };

  users = users.map((user) => (user.id === userId ? updatedUser : user));

  return updatedUser;
}

function deleteUser(userId) {
  const existingUser = findUserById(userId);

  if (!existingUser) {
    return null;
  }

  users = users.filter((user) => user.id !== userId);

  return existingUser;
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
