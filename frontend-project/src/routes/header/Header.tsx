import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

import { HomeButton } from "../../components/header/HomeButton/HomeButton";
import SearchBar from "./../../components/header/SearchBar/SearchBar";
import ProfileIcon from "./../../components/header/ProfileIcon/ProfileIcon";

import "./header.css";

export default function Header({ data, setResults }) {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isHomePage, setHomePage] = useState(false);

  let location = useLocation();
  useEffect(() => {
    setHomePage(location.pathname === "/" ? true : false);
  }, [location])

  if(currentUser){
    return (
      <>
        <header className="mainHeader">
          {isHomePage ? (<div className="placeholder"></div>) : (<HomeButton/>)}
       
          <div className="headerComponents">
            <SearchBar searchData={data} setResult={setResults} />
            <ProfileIcon />
          </div>
        </header>
        <Outlet />
      </>
    );
  } else {
    navigate("/guest");
  }
}
