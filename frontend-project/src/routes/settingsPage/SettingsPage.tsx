import { useState, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext.js";

import { SplitScreen } from "../../components/Containers/SplitScreen/SplitScreen.js";
import { NavigationButton } from "../../components/other/NavigationButton/NavigationButton.js";

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
                        <NavigationButton to="./profileInfo">Personal Information</NavigationButton>
                    </li>
                    <li>
                        <NavigationButton to="./profileInfo">Profile Personalization</NavigationButton>    
                    </li>
                    <li>
                        <NavigationButton to="./profileInfo">Privacy and Security</NavigationButton>      
                    </li>
                    <li>
                        <NavigationButton to="./profileInfo">Accessibility</NavigationButton>     
                    </li>
                    <li>
                        <NavigationButton to="./profileInfo">Reporting</NavigationButton>     
                    </li>
                </ul>
                <Outlet />
            </SplitScreen>
        </main>
    );
}