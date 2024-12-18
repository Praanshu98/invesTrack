const login = async (user) => {
  const { email, password } = user;
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
