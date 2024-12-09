import {
    createNewUserWithEmailAndPassword,
    createUserDocument,
} from "./../firebase/firebase.utils";

import { validationMessages } from "./../messages/popupMessages.js"

export const registerNewAccount = async (userInfo) => {
    const {Email, Password, Username} = userInfo;

    try {
        const { user } = await createNewUserWithEmailAndPassword(Email, Password);
        await createUserDocument(user, { displayName: Username });
    } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            return validationMessages.EMAIL_TAKEN;
          case "auth/invalid-email":
            return validationMessages.EMAIL_INVALID;
          case "auth/weak-password":
            return validationMessages.PASSWORD_SHORT;
          default:
            console.error("User creation error: ", error);
            return("Unexpected Error Occured. Please Contact Our Customer Support!");
        }
    }

    return null;
}