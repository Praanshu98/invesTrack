import CustomButton from "../components/customButtons";
import CustomInput from "../components/customInput";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import validateAndLogin from "../utils/validateAndLogin";

const LoginComponent = () => {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="m-2 mt-6 p-1 text-2xl font-bold">Login</h1>
      <form
        className="flex w-64 flex-col"
        action="/api/v1/users/login"
        onSubmit={(event) =>
          validateAndLogin(event, setUser, navigate, setError)
        }
        method="POST"
      >
        <CustomInput placeholderText="Email" inputType="email" id="email" />
        <div className="flex flex-col">
          <CustomInput
            placeholderText="Password"
            inputType={showPassword ? "text" : "password"}
            id="password"
            classNameText="mb-0.5"
          />
          <div className="mr-4 flex items-center gap-2">
            <input
              type="checkbox"
              className="ml-4"
              id="show-password"
              onChange={toggleShowPassword}
            />
            <label
              htmlFor="show-password"
              className="text-pale-turquoise text-sm"
            >
              Show password
            </label>
          </div>
          {error && (
            <p className="ml-2 pl-2 text-xs text-red-500" id="login-error">
              {error}
            </p>
          )}
        </div>
        <CustomButton customValue="Login" customType="submit" />
      </form>
      <div className="flex items-center text-sm">
        <p className="text-xs">Don&apos;t have an account? </p>
        <CustomButton
          customValue="Sign up"
          onClick={() => navigate("/signup")}
          className="!m-0 !border-0 bg-transparent !p-0 !pl-2 text-sm font-bold text-blue-400 underline"
        />
      </div>
    </div>
  );
};

export default LoginComponent;
