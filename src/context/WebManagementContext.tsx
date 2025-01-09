import {useState, useEffect, createContext} from "react";
import { useOnlineStatus } from "./../utils/services/browserAPI";

export const WebManagementContext = createContext({
    isUserOnline: null,
});

export const WebManagementProvider = ({children}) => {
  const isUserOnline = useOnlineStatus();
  const value = {isUserOnline};

  return <WebManagementContext.Provider value={value}>{children}</WebManagementContext.Provider>
}