import signUp from "../utils/signUp";
import login from "../utils/login";

import { validatePassword } from "./validation";

const validateAndSignUp = async (event, setUser, navigate) => {
  try {
    event.preventDefault();
    document.getElementById("signup-error").classList.add("hidden");

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Check if the password is valid
    if (!validatePassword(password)) {
      throw new Error(
        "Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter, and one special character."
      );
    }

    // Try to create a user
    const response = await signUp({ firstName, lastName, email, password });

    if (response.status === 400) {
      // If there was an error, show the error
      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status === 201) {
      // If the user was created successfully, log them in
      const loginUserResponse = await login({ email, password });

      if (loginUserResponse.status === 200) {
        // If the user was logged in successfully, set the user in the context
        const user = await loginUserResponse.json();
        setUser(user.user);

        // Redirect to the dashboard
        navigate("/dashboard");
      }

      if (
        loginUserResponse.status === 400 ||
        loginUserResponse.status === 500
      ) {
        // If there was an error, show the error
        const error = await loginUserResponse.json();
        throw new Error(error.message);
      }
    }
  } catch (error) {
    console.error("Error in validateAndSignUp", error);
    document.getElementById("signup-error").classList.remove("hidden");
    document.getElementById("signup-error").textContent = error.message;
  }
};

export default validateAndSignUp;
