export const generateRandomString = (amountOfCharacters: number)=> {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < amountOfCharacters; i++ ) {
        randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomString;
};

export const randomEmail = `userVibeLift+${generateRandomString(10)}@gmail.com`;