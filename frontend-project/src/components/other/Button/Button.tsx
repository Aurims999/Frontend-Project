import { Link } from "react-router-dom";

import "./button.css";

const Button = ({ children, nextPage }) => {
  return nextPage ? (
    <Link to={nextPage} className="defaultButton">
      {children}
    </Link>
  ) : (
    <button className="defaultButton">{children}</button>
  );
};

export default Button;
