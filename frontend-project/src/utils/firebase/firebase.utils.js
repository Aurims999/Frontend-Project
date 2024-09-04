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
import { getFirestore, doc, getDoc, setDoc, updateDoc, Firestore, } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeoY2lyUEs6HFMUnjjDhmclJec6NqLJAY",
  authDomain: "vibelift-db.firebaseapp.com",
  projectId: "vibelift-db",
  storageBucket: "vibelift-db.appspot.com",
  messagingSenderId: "750153358659",
  appId: "1:750153358659:web:5aba7c37bc9347c36a63f6",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocument = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const userSettings = {
      colorMode: "LIGHT",
      fontSize: "REGULAR",
    };

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        favouriteSongs: [],
        userSettings,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error Creating New User", error.message);
    }
  }

  return userDocRef;
};

export const createNewUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const changeUsername = async (username) => {
  console.log("New username: " + username)
  updateProfile(auth.currentUser, {
    displayName: username
  }).then(() => {
    alert("Username edited successfully");
    return true;
  }).catch((error) => {
    alert("500 While editing username");
    return false;
  });
}

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