const login = async ({ email, password }) => {
  // Try to log in the user
  const response = await fetch("/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response;
};

export default login;
