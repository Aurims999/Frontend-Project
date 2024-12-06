import { useState } from "react";

import { LoginForm } from "../../components/Forms/LoginForm/LoginForm";
import { RegisterForm } from "../../components/Forms/RegisterForm/RegisterForm";
import { GoogleAuthButton } from "../../components/Forms/LoginForm/GoogleAuthButton";
import { ExitButton } from "../../components/other/ExitButton/ExitButton";

import { PopupMessage } from "../../components/other/PopupMessage/PopupMessage";

import "./loginPage.css";

export const LoginPage = ({}) => {
  const [isLogin, setLogin] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const handlePopupDisplay = (message, duration = 2500) => {
    if (message != "") {
      setPopupMessage(message);
      setPopupVisibility(true);
      setTimeout(() => {

        setPopupVisibility(false);
      }, duration);
    }
  };

  return (
    <div className={`loginPage ${!isLogin ? "centeredContent" : ""}`}>
      <ExitButton />
      <h1 style={{ color: "white", fontSize: "3rem" }}>
        {isLogin ? "Login To Your Account" : "Register New Account"}
      </h1>
      <div className="formsContainer">
        {isLogin ? (
          <>
            <LoginForm setPageType={setLogin} displayValidationPopup={handlePopupDisplay}/>
            <div className="divider">Or</div>
            <GoogleAuthButton />
          </>
        ) : (
          <>
            <RegisterForm displayValidationPopup={handlePopupDisplay}/>
          </>
        )}
      </div>
      <PopupMessage message={popupMessage} display={isPopupVisible}/>
    </div>
  );
};
