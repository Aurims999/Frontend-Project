//#region Configs
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, FieldPath, FieldValue } from "firebase/firestore";

import { validationMessages } from "../messages/popupMessages.js"

const firebaseConfig = {
  apiKey: "AIzaSyBeoY2lyUEs6HFMUnjjDhmclJec6NqLJAY",
  authDomain: "vibelift-db.firebaseapp.com",
  projectId: "vibelift-db",
  storageBucket: "vibelift-db.appspot.com",
  messagingSenderId: "750153358659",
  appId: "1:750153358659:web:5aba7c37bc9347c36a63f6",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();


//#endregion

//#region TABLE - USERS
export const createUserDocument = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const userRole = "USER";
    const createdAt = new Date();
    const userSettings = {
      colorMode: "LIGHT",
      fontSize: "REGULAR",
    };
    const userStats = {
      amountOfSubscribers: 0,
      hoursListened: 0,
    }

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        userRole,
        createdAt,
        favouriteSongs: [],
        favouriteArtists: [],
        userSettings,
        userStats,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error Creating New User", error.message);
    }
  }

  return userDocRef;
};

export const getOwnData = async () => {
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  return userSnap.data();
}

export const changeUsername = async (username) => {
  updateProfile(auth.currentUser, {
    displayName: username
  }).then(() => {
    alert("Username edited successfully");
    return true;
  }).catch((error) => {
    alert("500 While editing username");
    return false;
  });
};

export const updateColorTheme = async (selectedTheme) => {
  const userDocRef = doc(db, "users", auth.currentUser.uid);

  await updateDoc(userDocRef, {
    "userSettings.colorMode": selectedTheme,
  }).then(() => {
    return true;
  }).catch(() => {
    return false;
  });
}
//#endregion

//#region USERS AUTHENTIFICATION
export const createNewUser = async (userInfo) => {
  const { email, password, username } = userInfo;
  if (!email || !password || !username) return "Server Error Occurred. Please Contact Our Customer Support!";

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await createUserDocument(user, { displayName: username });
    return user;
  } catch (error) {
    console.error("User creation error: ", error);
    return error.code === "auth/email-already-in-use"
      ? validationMessages.EMAIL_TAKEN
      : "Unexpected Error Occurred. Please Contact Our Customer Support!";
  }
};


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return "";
  } catch (error){
    switch (error.code) {
      case "auth/invalid-credential":
          return validationMessages.LOGIN_INVALID;
      default:
          console.error("User creation error: ", error);
          return "Unknown error occured!. Please contact service support!";
    }
  }
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
//#endregion

//#region ARTISTS
export const addArtistToFavourites = async (artistId) => {
  const userDocRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userDocRef, {
    "favouriteArtists": arrayUnion(artistId),
  });
}

export const removeArtistFromFavourites = async (artistId) => {
  const userDocRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userDocRef, {
    "favouriteArtists": arrayRemove(artistId),
  });
}
//#endregion
