import { InputField } from "../InputField/InputField";
import Button from "../../other/Button/Button";
import { TextLink } from "../../other/TextLink/TextLink";

import "./loginForm.css";

export const LoginForm = ({}) => {
  return (
    <div className="loginForm">
      <InputField
        title="Username"
        placeHolder="Please write down your username"
      />
      <InputField
        type="password"
        title="Password"
        placeHolder="Please write down your password"
      />
      <Button>Login</Button>
      <p>
        Don't have an account?{" "}
        <TextLink link={"/"}>Register by clicking here</TextLink>
      </p>
    </div>
  );
};
