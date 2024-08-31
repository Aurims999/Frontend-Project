import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "./ProfileIcon.css";

export default function ProfileIcon({ userImage }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownMenu = useRef(null);
  const imageIcon = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(dropdownMenu.current && !dropdownMenu.current.contains(event.target) && !imageIcon.current.contains(event.target) ){
        toggleMenu();
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }

      if(isOpen){
        document.addEventListener("mousedown", handleClickOutside);
      } 

  }, [dropdownMenu, isOpen])

  return (
    <div className="userManagementButton" ref={imageIcon}>
      <img src={userImage} 
           alt="An icon of a person's profile view" 
           className="profileIcon"
           onClick={toggleMenu} />
      <div className="dropdownMenu" style={{ display: isOpen ? "block" : "none" }} ref={dropdownMenu}>
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
