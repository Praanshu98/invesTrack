import CustomButton from "../components/customButtons";
import CustomInput from "../components/customInput";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import validateAndLogin from "../utils/validateAndLogin";

const LoginComponent = () => {
  const [error, setError] = useState(null);
  const { setUser } = useUserContext();
  const navigate = useNavigate();

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
            inputType="password"
            id="password"
            classNameText="mb-0.5"
          />
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
