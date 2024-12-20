import CustomButton from "../components/customButtons";
import CustomTextInput from "../components/customTextInput";
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
      <h1 className="text-2xl font-bold m-2 p-1 mt-6">Login</h1>
      <form
        className="flex flex-col w-64"
        action="/api/v1/users/login"
        onSubmit={(event) =>
          validateAndLogin(event, setUser, navigate, setError)
        }
        method="POST"
      >
        <CustomTextInput placeholderText="Email" inputType="email" id="email" />
        <div className="flex flex-col">
          <CustomTextInput
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
      <div className="flex text-sm items-center">
        <p className="text-xs">Don't have an account? </p>
        <CustomButton
          customValue="Sign up"
          onClick={() => navigate("/signup")}
          className="!m-0 !p-0 !border-0 !pl-2 bg-transparent underline text-blue-400 text-sm font-bold"
        />
      </div>
    </div>
  );
};

export default LoginComponent;
