import { formatUsers } from "./userFormatters.js";

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

function findUserByIdOrUndefined(userId) {
  return users.find((user) => user.id === userId);
}

function getAllUsers() {
  return users;
}

function getFormattedUsers(userFormatter) {
  const users = getAllUsers();

  return formatUsers(users, userFormatter);
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
  const existingUser = findUserByIdOrUndefined(userId);

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
  const existingUser = findUserByIdOrUndefined(userId);

  if (!existingUser) {
    return null;
  }

  users = users.filter((user) => user.id !== userId);

  return existingUser;
}

export { getAllUsers, getFormattedUsers, createUser, updateUser, deleteUser };
