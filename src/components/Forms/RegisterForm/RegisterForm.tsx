import { useState } from "react";

import { InputField } from "../InputField/InputField";
import Button from "../../other/Button/Button";

import { validateUsername, validateEmail, validatePassword } from "../../../utils/methods/validateUserInput.js";
import { createNewUser } from "../../../utils/firebase/firebase.utils.js";

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

    const validations = [
      {validate : () => validateUsername(username)},
      {validate : () => validateEmail(email)},
      {validate : () => validatePassword(password, passwordConfirm)},
    ]

    for (const {validate} of validations){
      const validationError = validate();
      if(validationError){
        displayValidationPopup(validationError);
        return;
      }
    }

    const registrationResults = await createNewUser({
      email,
      password,
      username,
    });

    if (typeof registrationResults === "string") {
      displayValidationPopup(registrationResults);
      return;
    }
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
