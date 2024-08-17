import "./loginPage.css";

import { LoginForm } from "../../components/Forms/LoginForm/LoginForm";
import Button from "../../components/other/Button/Button";

export const LoginPage = ({}) => {
  return (
    <div className="loginPage">
      <h1 style={{ color: "white", fontSize: "3rem" }}>Sign In</h1>
      <div className="formsContainer">
        <LoginForm />
        <h2 style={{ color: "white" }}>
          ---------------- Separator line -----------------------------
        </h2>
        <Button>Google Login</Button>
      </div>
    </div>
  );
};
