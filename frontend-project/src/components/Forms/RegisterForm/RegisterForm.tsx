import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

import { InputField } from "../InputField/InputField";
import Button from "../../other/Button/Button";

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

export const RegisterForm = ({}) => {
  const [formFields, setFormFields] = useState(defaultFields);
  const { Username, Email, Password, PasswordConfirm } = formFields;

  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFields = () => {
    setFormFields(defaultFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Password != PasswordConfirm) {
      alert("PASSWORD DO NOT MATCH");
      return;
    }

    try {
      const { user } = await createNewUserWithEmailAndPassword(Email, Password);
      setCurrentUser(user);
      await createUserDocument(user, { displayName: Username });
      resetFields();
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("ALREADY USED EMAIL");
          break;
        case "auth/invalid-email":
          alert("INVALID EMAIL");
          break;
        case "auth/weak-password":
          alert("PASSWORD TOO SHORT");
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
        type="email"
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
