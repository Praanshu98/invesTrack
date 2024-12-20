import login from "../utils/login";
import { validatePassword } from "./validation";
import { throwNew500Error, throwNewPasswordError } from "./handleError";

const validateAndLogin = async (event, setUser, navigate, setError) => {
  try {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    // Check if the password is valid
    if (!validatePassword(password)) {
      throwNewPasswordError();
    }

    // Try to log in the user
    const response = await login({ email, password });
    if (response.status === 400) {
      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status === 500) {
      throwNew500Error();
    }

    if (response.status === 200) {
      const user = await response.json();
      setUser(user.user);
      navigate("/dashboard");
    }
  } catch (error) {
    setError(error.message);
  }
};

export default validateAndLogin;
