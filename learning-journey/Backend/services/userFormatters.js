export const basicUserFormatter = {
  format(user) {
    return {
      ...user,
      displayName: user.name,
    };
  },
};

export const detailedUserFormatter = {
  format(user) {
    return {
      ...user,
      displayName: `${user.name} (${user.age})`,
    };
  },
};

export function formatUsers(users, formatter) {
  return users.map((user) => formatter.format(user));
}
