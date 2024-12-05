import { Link } from "react-router-dom";

import "./exitButton.css";

export const ExitButton = ({}) => {
  return (
    <Link to="/guest" className="exitButton">
      <img src="/assets/icons/close.png" alt="" />
    </Link>
  );
};
