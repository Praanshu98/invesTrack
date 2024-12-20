import login from "../utils/login";
import { validatePassword } from "./validation";

const validateAndLogin = async (event, setUser, navigate, setError) => {
  try {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    // Check if the password is valid
    if (!validatePassword(password)) {
      throw new Error(
        "Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter, and one special character."
      );
    }

    // Try to log in the user
    const response = await login({ email, password });
    if (response.status === 400 || response.status === 500) {
      const error = await response.json();
      throw new Error(error.message);
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
