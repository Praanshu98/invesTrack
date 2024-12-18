const signUp = async ({ firstName, lastName, email, password }) => {
  // Try to create a user
  const response = await fetch("/api/v1/users/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });

  return response;
};

export default signUp;
