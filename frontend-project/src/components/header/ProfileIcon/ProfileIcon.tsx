import { Link } from "react-router-dom";

import "./ProfileIcon.css";

export default function ProfileIcon({ userImage }) {
  return (
    <Link to={"myProfile"} className="profileIcon">
      <img src={userImage} alt="An icon of a person's profile view" />
    </Link>
  );
}
