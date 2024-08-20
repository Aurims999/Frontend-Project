import {
  signInWithGooglePopup,
  createUserDocument,
} from "../../utils/firebase/firebase.utils";

import "./loginPage.css";

import { LoginForm } from "../../components/Forms/LoginForm/LoginForm";
import Button from "../../components/other/Button/Button";
import { ExitButton } from "../../components/other/ExitButton/ExitButton";

export const LoginPage = ({}) => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocument(user);
  };

  return (
    <div className="loginPage">
      <ExitButton />
      <h1 style={{ color: "white", fontSize: "3rem" }}>Sign In</h1>
      <div className="formsContainer">
        <LoginForm />
        <div className="divider">Or</div>
        <Button>Google Login</Button>
        <button onClick={logGoogleUser}>GOOGLE</button>
      </div>
    </div>
  );
};
