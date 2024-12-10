import { useState } from "react";

import { InputField } from "../InputField/InputField";
import Button from "../../other/Button/Button";

import { validateData } from "../../../utils/services/validateUserInput.js";
import { registerNewUser } from "../../../utils/services/databaseInteractions.js";

import "./registerForm.css";

const defaultFields = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const RegisterForm = ({displayValidationPopup}) => {
  const [formFields, setFormFields] = useState(defaultFields);
  const { username, email, password, passwordConfirm } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let registrationErrorMessage = validateData(email, password);
    if(registrationErrorMessage){
      displayValidationPopup(registrationErrorMessage)
      return;
    }

    const registrationResults = await registerNewUser(email, password, username);
    if(typeof(registrationResults) === "string") displayValidationPopup(registrationResults);
  };

  return (
    <form className="defaultForm" onSubmit={handleSubmit}>
      <InputField
        title="Username"
        name = "username"
        placeHolder="Enter your username"
        value={username}
        onChange={handleChange}
      />
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
        placeHolder="Create a strong password"
        value={password}
        onChange={handleChange}
      />
      <InputField
        type="password"
        title="Confirm Your Password"
        name="passwordConfirm"
        placeHolder="Repeat your password"
        value={passwordConfirm}
        onChange={handleChange}
      />
      <Button isSubmitButton={true}>Create New Account</Button>
    </form>
  );
};
