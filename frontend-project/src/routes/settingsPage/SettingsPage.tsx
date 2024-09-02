import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext.js";

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
        <main>
            <h1>SETTINGS PAGE</h1>
            <h2>Current user: {username}</h2> 
            <input type="text" value={newUsername} onChange={handleChange}/>
            <button onClick={() => updateUsername(newUsername)}>SUBMIT</button>
        </main>
    );
}