import { signInAuthUserWithEmailAndPassword, createNewUser, createUserDocument, getOwnData } from "../../utils/firebase/firebase.utils";

import { userRoles } from "./../userRoles.js"

export const loginUser = async (email : string, password : string) => {
    const loginResults = await signInAuthUserWithEmailAndPassword(email, password);

    return loginResults;
}

export const registerNewUser = async (email : string, password : string, username : string) => {
    const registrationResults = await createNewUser({
        email,
        password,
        username,
    });
    
    return registrationResults;
}

export const handleAuthChange = async (user : object, navigate) => {
    let userData = null;

    if (user) {
        await createUserDocument(user);
        userData = await getOwnData();
        sessionStorage.setItem("userRole", userData.userRole);
        const userNewlyLogged = sessionStorage.getItem("userLogged") === "false" ? true : false;
        if(userNewlyLogged){
            sessionStorage.setItem("userLogged", "true");
            navigate("/");
        }
    } else {
        sessionStorage.setItem("userLogged", "false");
        sessionStorage.setItem("userRole", userRoles.GUEST);
    }

    return userData
}