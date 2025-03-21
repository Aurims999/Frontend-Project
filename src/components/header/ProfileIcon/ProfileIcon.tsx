import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";

import { signOutUser } from "../../../utils/firebase/firebase.utils.js";

import { UserContext } from "../../../context/UserContext.js";

import "./ProfileIcon.css";

export default function ProfileIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownMenu = useRef(null);
  const imageIcon = useRef(null);
  const { currentUser } = useContext(UserContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownMenu.current &&
        !dropdownMenu.current.contains(event.target) &&
        !imageIcon.current.contains(event.target)
      ) {
        toggleMenu();
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownMenu, isOpen]);

  return (
    <div className="userManagementButton" ref={imageIcon}>
      <img
        src="/assets/images/defaultImages/artist__default.png"
        alt="An icon of a person's profile view"
        className="profileIcon"
        onClick={toggleMenu}
      />
      <div
        className="dropdownMenu"
        style={{ display: isOpen ? "block" : "none" }}
        ref={dropdownMenu}
      >
        <div className="userDescription">
          <p>{currentUser.email}</p>
        </div>
        <Link to={"/profile"} className="dropdownItem" onClick={toggleMenu}>
          <p>User Profile</p>
        </Link>
        <Link to={"/settings"} className="dropdownItem" onClick={toggleMenu}>
          <p>Settings</p>
        </Link>
        <Link to={"/profile"} className="dropdownItem" onClick={signOutUser}>
          <p>Logout</p>
        </Link>
      </div>
    </div>
  );
}
