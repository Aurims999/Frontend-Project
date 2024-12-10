import { signInAuthUserWithEmailAndPassword, createNewUser } from "../../utils/firebase/firebase.utils";
import { validationMessages } from "../messages/popupMessages.js"

export const loginUser = async (email : string, password : string) => {
    try {
        await signInAuthUserWithEmailAndPassword(email, password);
    } catch (error) {
        switch (error.code) {
            case "auth/invalid-credential":
                return validationMessages.LOGIN_INVALID;
            default:
                console.error("User creation error: ", error);
                return "Unknown error occured!. Please contact service support!";
        }
    }

    return "";
}

export const registerNewUser = async (email : string, password : string, username : string) => {
    const registrationResults = await createNewUser({
        email,
        password,
        username,
    });
    
    return registrationResults;
}