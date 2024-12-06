import { useState } from "react";

import { InputField } from "../InputField/InputField";
import Button from "../../other/Button/Button";

import { validationMessages } from "./../../../utils/messages/popupMessages.js"

import {
  createNewUserWithEmailAndPassword,
  createUserDocument,
} from "../../../utils/firebase/firebase.utils";

import "./registerForm.css";

const defaultFields = {
  Username: "",
  Email: "",
  Password: "",
  PasswordConfirm: "",
};

export const RegisterForm = ({displayValidationPopup}) => {
  const [formFields, setFormFields] = useState(defaultFields);
  const { Username, Email, Password, PasswordConfirm } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFields = () => {
    setFormFields(defaultFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!Username){
      displayValidationPopup(validationMessages.USERNAME_MISSING);
      return;
    }

    if (!Email) {
      displayValidationPopup(validationMessages.EMAIL_MISSING);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(Email)){
      displayValidationPopup(validationMessages.EMAIL_INVALID);
      return;
    }
    if(!Password || !PasswordConfirm){
      displayValidationPopup(validationMessages.PASSWORD_MISSING);
      return;
    }

    if (Password != PasswordConfirm) {
      displayValidationPopup(validationMessages.PASSWORD_MISMATCH);
      return;
    }

    try {
      const { user } = await createNewUserWithEmailAndPassword(Email, Password);
      await createUserDocument(user, { displayName: Username });
      resetFields();
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          displayValidationPopup(validationMessages.EMAIL_TAKEN);
          break;
        case "auth/invalid-email":
          displayValidationPopup(validationMessages.EMAIL_INVALID);
          break;
        case "auth/weak-password":
          displayValidationPopup(validationMessages.PASSWORD_SHORT);
          break;
        default:
          console.log(error);
      }
      console.error("User creation error: ", error);
    }
  };

  return (
    <form className="defaultForm" onSubmit={handleSubmit}>
      <InputField
        title="Username"
        placeHolder="Enter your username"
        value={Username}
        onChange={handleChange}
      />
      <InputField
        title="Email"
        placeHolder="Enter your email"
        value={Email}
        onChange={handleChange}
      />
      <InputField
        type="password"
        title="Password"
        placeHolder="Create a strong password"
        value={Password}
        onChange={handleChange}
      />
      <InputField
        type="password"
        title="Confirm Your Password"
        name="PasswordConfirm"
        placeHolder="Repeat your password"
        value={PasswordConfirm}
        onChange={handleChange}
      />
      <Button isSubmitButton={true}>Create New Account</Button>
    </form>
  );
};
