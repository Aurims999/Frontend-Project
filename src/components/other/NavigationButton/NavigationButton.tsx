import { Link } from "react-router-dom";
import "./navigationButton.css";

export const NavigationButton = ({children, to = "/", icon = "/assets/icons/search.png"}) => {
    return(
        <Link to={to} className="navButton">
            <img src={icon} alt="" />
            <h3>{children}</h3>
        </Link>  
    );
}