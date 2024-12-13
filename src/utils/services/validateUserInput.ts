import { validationMessages} from "./../messages/popupMessages.js"

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

    if (password.length < 6){
        return validationMessages.PASSWORD_SHORT;
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

export const validateData = (email : string, password : string, 
                             passwordConfirm : string | null = null, username : string | null = null) => {
    const validations = [
        {validate : () => username ? validateUsername(username) : ""},
        {validate : () => validateEmail(email)},
        {validate : () => validatePassword(password, passwordConfirm)},
      ]
  
      for (const {validate} of validations){
        const validationError = validate();
        if(validationError) return validationError;
      }

    return "";
}