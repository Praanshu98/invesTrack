import CustomButton from "../components/customButtons";
import CustomTextInput from "../components/customTextInput";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

import validateAndSignUp from "../utils/validateAndSignup";

const SignUpComponent = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold m-2 p-1 mt-6">Sign Up</h1>
      <form
        className="flex flex-col w-64"
        action="/api/v1/users/register"
        onSubmit={(event) => validateAndSignUp(event, setUser, navigate)}
        method="POST"
      >
        <CustomTextInput placeholderText="First Name" id="firstName" />
        <CustomTextInput placeholderText="Last Name" id="lastName" />
        <CustomTextInput placeholderText="Email" inputType="email" id="email" />
        <div className="flex flex-col">
          <CustomTextInput
            placeholderText="Password"
            inputType="password"
            id="password"
            classNameText="mb-0.5"
          />
          <p
            className="ml-2 pl-2 text-xs text-red-500 hidden"
            id="signup-error"
          >
            Problem in Password
          </p>
        </div>
        <CustomButton customValue="Sign Up" customType="submit" />
      </form>
      <div className="flex text-sm">
        <p>Already have an account?</p>
        <CustomButton
          customValue="Log in"
          onClick={() => navigate("/login")}
          className="underline pl-2 bg-transparent border-0 p-0 m-0 text-default"
        />
      </div>{" "}
    </div>
  );
};

export default SignUpComponent;
