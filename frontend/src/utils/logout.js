const logout = async () => {
  // Try to log out the user
  const response = await fetch("/api/v1/users/logout", {
    method: "POST",
  });

  return response;
};

export default logout;
