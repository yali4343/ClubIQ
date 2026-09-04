const USER_SERVICE_ERROR = {
  USER_NOT_FOUND: {
    code: "USER_NOT_FOUND",
    message: "User not found",
  },
};

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

function getFormattedUsers(formatUsers, userFormatter) {
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
    return {
      ok: false,
      error: USER_SERVICE_ERROR.USER_NOT_FOUND,
    };
  }

  const updatedUser = {
    ...existingUser,
    ...userData,
  };

  users = users.map((user) => (user.id === userId ? updatedUser : user));

  return {
    ok: true,
    user: updatedUser,
  };
}

function deleteUser(userId) {
  const existingUser = findUserByIdOrUndefined(userId);

  if (!existingUser) {
    return {
      ok: false,
      error: USER_SERVICE_ERROR.USER_NOT_FOUND,
    };
  }

  users = users.filter((user) => user.id !== userId);

  return {
    ok: true,
    data: existingUser,
  };
}

export { getAllUsers, getFormattedUsers, createUser, updateUser, deleteUser };
