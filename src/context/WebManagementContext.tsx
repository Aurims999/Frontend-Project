import {useState, createContext} from "react";
import { useOnlineStatus } from "./../utils/services/browserAPI";

export const WebManagementContext = createContext({
    isUserOnline: null,
    isPageLoading: false,
    setPageLoading: (boolean) => null,
});

export const WebManagementProvider = ({children}) => {
  const isUserOnline = useOnlineStatus();
  const [isPageLoading, setPageLoading] = useState(false);
  const webManagementStates = {isUserOnline, isPageLoading, setPageLoading};

  return <WebManagementContext.Provider value={webManagementStates}>{children}</WebManagementContext.Provider>
}