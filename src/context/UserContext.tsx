import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getOwnData } from "../utils/firebase/firebase.utils.js"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase/firebase.utils.js";


import {
  onAuthStateChangedListener,
  createUserDocument,
} from "../utils/firebase/firebase.utils.js";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  userData: null,
  isUserLoading: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isUserLoading, setLoading] = useState(true);
  const value = { currentUser, setCurrentUser, userData, isUserLoading };

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      setCurrentUser(user);
      if (user) {
        createUserDocument(user);
        const data = await getOwnData();
        setUserData(data);
        const userNewlyLogged = sessionStorage.getItem("userLogged") === "false" ? true : false;
        if(userNewlyLogged){
          sessionStorage.setItem("userLogged", "true");
          navigate("/");
        }
      } else {
        setUserData(null);
        sessionStorage.setItem("userLogged", "false");
        sessionStorage.setItem("userRole", "GUEST");
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const userDocRef = doc(db, "users", currentUser.uid);

    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setUserData(docSnapshot.data());
        sessionStorage.setItem("userRole", docSnapshot.data().userRole);
      } else {
        setUserData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
