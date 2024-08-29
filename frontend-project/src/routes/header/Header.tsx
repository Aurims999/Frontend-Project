import { useState, useEffect, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";
import { signOutUser } from "../../utils/firebase/firebase.utils.js";

import SearchBar from "./../../components/header/SearchBar/SearchBar";
import ProfileIcon from "./../../components/header/ProfileIcon/ProfileIcon";

import "./header.css";

export default function Header({ data, setResults }) {
  const { currentUser } = useContext(UserContext);
  const [username, setUsername] = useState("DEFAULT USERNAME");

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.email);
    }
  }, [currentUser]);

  if(currentUser){
    return (
      <>
        <header className="mainHeader">
          <SearchBar searchData={data} setResult={setResults} />
          <ProfileIcon userImage="/assets/icons/user.png" />
          <Link to={"/"} style={{ all: "unset", cursor: "pointer" }}>
            <p className="userProfile">Home page</p>
          </Link>
          <h3 style={{ color: "white", margin: "0px 20px" }}>{username}</h3>
          <button onClick={signOutUser}>Sign Out</button>
        </header>
        <Outlet />
      </>
    );
  } else {
    navigate("/guest")
  }
}
