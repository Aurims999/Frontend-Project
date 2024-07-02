import { Outlet, Link, useNavigate } from "react-router-dom";

import SearchBar from "./../../components/header/SearchBar/SearchBar";
import ProfileIcon from "./../../components/header/ProfileIcon/ProfileIcon";

import "./header.css";

export default function Header({ data, setResults }) {
  return (
    <>
      <header>
        <SearchBar searchData={data} setResult={setResults} />
        <ProfileIcon userImage="./assets/icons/user.png" />
        <a href="./index.html" style={{ all: "unset", cursor: "pointer" }}>
          <p className="userProfile">Home page</p>
        </a>
      </header>
      <Outlet />
    </>
  );
}
