import { signInAuthUserWithEmailAndPassword, createNewUser } from "../../utils/firebase/firebase.utils";

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