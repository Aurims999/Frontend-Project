import { useState } from "react";
import { signInAuthUserWithEmailAndPassword } from "../../../utils/firebase/firebase.utils";

import { InputField } from "../InputField/InputField";
import Button from "../../other/Button/Button";

import { validateEmail, validatePassword } from "./../../../utils/methods/validateUserInput"
import { validationMessages } from "./../../../utils/messages/popupMessages.js"

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

    const validations = [
      {validate : () => validateEmail(email)},
      {validate : () => validatePassword(password)},
    ]

    for (const {validate} of validations){
      const validationError = validate();
      if(validationError){
        displayValidationPopup(validationError);
        return;
      }
    }

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          displayValidationPopup(validationMessages.LOGIN_INVALID);
          break;
        default:
          displayValidationPopup(error);
      }
      console.error("User creation error: ", error);
    }
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
