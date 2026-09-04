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

function createUser(userData) {
  const newUserId = getNextUserId();

  const newUser = {
    id: newUserId,
    ...userData,
  };

  users = [...users, newUser];

  return newUser;
}

export { getAllUsers, createUser };
