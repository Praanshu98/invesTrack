const logout = async (navigate) => {
  // Try to log out the user
  const response = await fetch("/api/v1/users/logout", {
    method: "POST",
  });

  if (response.status === 200) {
    navigate("/login");
  }
};

export default logout;
