import {useState, createContext} from "react";
import { useOnlineStatus } from "./../utils/services/browserAPI";

export const WebManagementContext = createContext({
    isUserOnline: null,
    isPageLoading: false,
    setPageLoading: () => null,
});

export const WebManagementProvider = ({children}) => {
  const isUserOnline = useOnlineStatus();
  const [isPageLoading, setPageLoading] = useState(false);
  const value = {isUserOnline, isPageLoading, setPageLoading};

  return <WebManagementContext.Provider value={value}>{children}</WebManagementContext.Provider>
}