import {useState, useEffect, createContext} from "react";
import { useOnlineStatus } from "./../utils/services/browserAPI";

export const WebManagementContext = createContext({
    isUserOnline: null,
});

export const WebManagementProvider = ({children}) => {
  const isUserOnline = useOnlineStatus();

  return <WebManagementContext.Provider value={{isUserOnline}}>{children}</WebManagementContext.Provider>
}