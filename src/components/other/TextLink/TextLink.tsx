import { Link } from "react-router-dom";
import "./textLink.css";

export const TextLink = ({ children, link }) => {
  return (
    <>
      <Link to={link} className="highlightedText">
        {children}
      </Link>
    </>
  );
};
