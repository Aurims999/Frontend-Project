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

        navigate("/");
      } else {
        navigate("/guest");
        setUserData(null);
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
