function validatePassword(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/;
  return regex.test(password);
}

const preUserCreationValidation = async (event) => {
  event.preventDefault();

  const firstName = event.target.firstName.value;
  const lastName = event.target.lastName.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

  console.log({ firstName, lastName, email, password });
  const checkPasswordValidation = validatePassword(password);
  const passwordErrorElement = document.getElementById("password-error");

  // If password is not valid, display error message
  if (!checkPasswordValidation) {
    passwordErrorElement.innerText =
      "Password must contain at least one number, one uppercase, one lowercase, one special character, and be between 6-20 characters long.";
    passwordErrorElement.style.display = "block";
  }

  // If password is valid, hide error message and send data to server
  if (checkPasswordValidation) {
    passwordErrorElement.style.display = "none";
    const newUser = await fetch("/api/v1/users/register", {
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
    }).then((response) => response.json());

    console.log(newUser);
  }
};

export { preUserCreationValidation };
