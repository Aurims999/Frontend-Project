import { validationMessages} from "../messages/popupMessages.js"

export const validateEmail = (email : string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return validationMessages.EMAIL_MISSING;
    }

    if(!emailRegex.test(email)){
        return validationMessages.EMAIL_INVALID;
    }

    return null;
}

export const validatePassword = (password : string, confirmPassword : string | null = null) => {
    if(!password){
        return validationMessages.PASSWORD_MISSING;
    }

    if (password != confirmPassword && confirmPassword != null) {
        return validationMessages.PASSWORD_MISMATCH;
    }

    return null;
}

export const validateUsername = (username : string) => {
    if (!username){
        return validationMessages.USERNAME_MISSING;
    }

    if(username.length < 5){
        return validationMessages.USERNAME_SHORT;
    }

    return null;
}