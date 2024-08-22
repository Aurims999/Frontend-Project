import { useState } from "react";

import { LoginForm } from "../../components/Forms/LoginForm/LoginForm";
import { RegisterForm } from "../../components/Forms/RegisterForm/RegisterForm";
import { GoogleAuthButton } from "../../components/Forms/LoginForm/GoogleAuthButton";
import { ExitButton } from "../../components/other/ExitButton/ExitButton";

import "./loginPage.css";

export const LoginPage = ({}) => {
  const [isLogin, setLogin] = useState(true);

  return (
    <div className={`loginPage ${!isLogin ? "centeredContent" : ""}`}>
      <ExitButton />
      <h1 style={{ color: "white", fontSize: "3rem" }}>
        {isLogin ? "Login To Your Account" : "Register New Account"}
      </h1>
      <div className="formsContainer">
        {isLogin ? (
          <>
            <LoginForm setPageType={setLogin} />
            <div className="divider">Or</div>
            <GoogleAuthButton />
          </>
        ) : (
          <>
            <RegisterForm />
          </>
        )}
      </div>
    </div>
  );
};
