import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { HomeButton } from "../../components/header/HomeButton/HomeButton";
import SearchBar from "./../../components/header/SearchBar/SearchBar";
import ProfileIcon from "./../../components/header/ProfileIcon/ProfileIcon";

import "./header.css";

export default function Header({ data, setResults }) {
  const [isHomePage, setHomePage] = useState(false);

  let location = useLocation();
  useEffect(() => {
    setHomePage(location.pathname === "/" ? true : false);
  }, [location])

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
}
