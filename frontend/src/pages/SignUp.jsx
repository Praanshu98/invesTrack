import CustomButton from "../components/customButtons";
import CustomTextInput from "../components/customTextInput";
import { preUserCreationValidation } from "../utils/validation";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold m-2 p-1 mt-6">Sign Up</h1>
      <form
        className="flex flex-col w-64"
        action="/api/v1/users/register"
        onSubmit={(event) => preUserCreationValidation(event)}
        method="POST"
      >
        <CustomTextInput placeholderText="First Name" id="firstName" />
        <CustomTextInput placeholderText="Last Name" id="lastName" />
        <CustomTextInput placeholderText="Email" inputtype="email" id="email" />
        <div className="flex flex-col">
          <CustomTextInput
            placeholderText="Password"
            inputtype="password"
            id="password"
            classNameText="mb-0.5"
          />
          <p
            className="ml-2 pl-2 text-xs text-red-500 hidden"
            id="password-error"
          >
            Problem in Password
          </p>
        </div>
        <CustomButton customValue="Sign Up" customType="submit" />
      </form>
    </div>
  );
};

export default SignUp;
