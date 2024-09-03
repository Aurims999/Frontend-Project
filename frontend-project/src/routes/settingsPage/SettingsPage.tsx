import { useState, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext.js";

import { SplitScreen } from "../../components/Containers/SplitScreen/SplitScreen.js";

import {
    changeUsername
  } from "../../utils/firebase/firebase.utils.js";

import "./settingsPage.css";

export const SettingsPage = () => {
    const [username, setUsername] = useState("DEFAULT");
    const [newUsername, setNewUsername] = useState("");
    const {currentUser} = useContext(UserContext);

    const updateUsername = async (newUsername) => {
        if (await changeUsername(newUsername)){
            setUsername(currentUser.displayName);
        }
    }

    useEffect(() => {
        setUsername(currentUser.displayName)
    }, [currentUser])

    const handleChange = (event) => {
        setNewUsername(event.target.value);
    };
    

    return(
        <main className="settingsPage">
            <SplitScreen title="Profile Settings" rightSide="3.5fr">
                <ul className="sideMenu">
                    <li>
                        <Link to={"./profileInfo"}>
                            <img src="/assets/icons/search.png" alt="" />
                            <h3>Personal Information</h3>
                        </Link>        
                    </li>
                    <li>
                        <Link to={"./profileInfo"}>
                            <img src="/assets/icons/search.png" alt="" />
                            <h3>Profile Personalization</h3>
                        </Link>        
                    </li>
                    <li>
                        <Link to={"./profileInfo"}>
                            <img src="/assets/icons/search.png" alt="" />
                            <h3>Privacy and Security</h3>
                        </Link>        
                    </li>
                    <li>
                        <Link to={"./profileInfo"}>
                            <img src="/assets/icons/search.png" alt="" />
                            <h3>Reporting</h3>
                        </Link>        
                    </li>

                </ul>
                <Outlet />
            </SplitScreen>
        </main>
    );
}