import { useState } from "react";

import { InputField } from "../InputField/InputField";
import Button from "../../other/Button/Button";

import { loginUser } from "../../../utils/services/databaseInteractions";
import { validateData } from "../../../utils/services/validateUserInput";

import "./loginForm.css";

const defaultFields = {
  username: "",
  password: "",
};

export const LoginForm = ({ setPageType, displayValidationPopup }) => {
  const [formFields, setFormFields] = useState(defaultFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let loginErrorMessage = validateData(email, password);
    if(loginErrorMessage){
      displayValidationPopup(loginErrorMessage)
      return;
    }
    
    loginErrorMessage = await loginUser(email, password);
    if(loginErrorMessage) displayValidationPopup(loginErrorMessage);
  };

  return (
    <>
      <form className="defaultForm" onSubmit={handleSubmit} noValidate>
        <InputField
          title="Email"
          name = "email"
          placeHolder="Enter your email"
          value={email}
          onChange={handleChange}
        />
        <InputField
          type="password"
          title="Password"
          name = "password"
          placeHolder="Enter your password"
          value={password}
          onChange={handleChange}
        />
        <Button isSubmitButton={true}>Login</Button>
      </form>

      <p className="registerNewAccount">
        Don't have an account?{" "}
        <span
          className="highlightedText"
          style={{ cursor: "pointer" }}
          onClick={() => setPageType(false)}
        >
          Register by clicking here
        </span>
      </p>
    </>
  );
};
