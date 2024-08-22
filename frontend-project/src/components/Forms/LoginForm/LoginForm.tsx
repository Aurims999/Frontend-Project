import { useState } from "react";
import { InputField } from "../InputField/InputField";
import Button from "../../other/Button/Button";

import { signInAuthUserWithEmailAndPassword } from "../../../utils/firebase/firebase.utils";

import "./loginForm.css";

const defaultFields = {
  Username: "",
  Password: "",
};

export const LoginForm = ({ setPageType }) => {
  const [formFields, setFormFields] = useState(defaultFields);
  const { Email, Password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        Email,
        Password
      );
      user ? alert("Logged In :)") : "FAILED TO LOGIN";
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          alert("WRONG LOGIN DATA");
          break;
        default:
          console.log(error);
      }
      console.error("User creation error: ", error);
    }
  };

  return (
    <>
      <form className="defaultForm" onSubmit={handleSubmit}>
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
          placeHolder="Enter your password"
          value={Password}
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
