export const isAuthenticated = (request) => {
  if (!request.user) {
    //if request doesn't have a user.
    throw Error("You need to log in to perform this action");
  }
  return;
};
