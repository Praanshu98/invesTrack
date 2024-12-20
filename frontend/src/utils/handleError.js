const throwNew500Error = () => {
  throw new Error("Its not you, its us. Please try again later.");
};

const throwNewPasswordError = () => {
  throw new Error(
    "Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter, and one special character."
  );
};

export { throwNew500Error, throwNewPasswordError };
