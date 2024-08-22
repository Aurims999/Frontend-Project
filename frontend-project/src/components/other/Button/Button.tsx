import { Link } from "react-router-dom";

import "./button.css";

const Button = ({ children, nextPage, isSubmitButton = false }) => {
  return nextPage ? (
    <Link to={nextPage} className="defaultButton">
      {children}
    </Link>
  ) : (
    <button
      type={isSubmitButton ? "submit" : undefined}
      className="defaultButton"
    >
      {children}
    </button>
  );
};

export default Button;
