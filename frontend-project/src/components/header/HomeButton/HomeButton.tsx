import { Link } from "react-router-dom";

import "./homeButton.css";

export const HomeButton = () => {
    return(
        <Link to={"/"} className="homeButton">
            <img src="/assets/icons/home.png" alt="Home button" />
        </Link>
    );
}