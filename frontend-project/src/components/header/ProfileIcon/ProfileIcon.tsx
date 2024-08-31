import { Link } from "react-router-dom";

import "./ProfileIcon.css";

export default function ProfileIcon({ userImage }) {
  return (
    <div className="userManagementButton">
      <Link to={"myProfile"} className="profileIcon">
        <img src={userImage} alt="An icon of a person's profile view" />
      </Link>
      <div className="dropdownMenu">
        <div className="userDescription">
          <p>aurimas.buta@zenitech.co.uk</p>
        </div>
       <Link to={"/profile"} className="dropdownItem"><p>User Profile</p></Link>
       <Link to={"/profile"} className="dropdownItem"><p>Settings</p></Link>
       <Link to={"/profile"} className="dropdownItem"><p>Logout</p></Link>
      </div>
    </div>
  );
}
