import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SpotifyDataContext } from "../context/SpotifyDataContext";

import { LoadingScreen } from "../components/LoadingScreen/LoadingScreen";
import { userRoles, isUserRoleValid } from "./userRoles.js"

export const ProtectedRoutes = ({requiredRole = userRoles.USER}) => {
    const {userData, isUserLoading} = useContext(UserContext);
    const {isDataLoading} = useContext(SpotifyDataContext)
    
    const sessionUserRole = sessionStorage.getItem("userRole");
    const sessionRoleValid = isUserRoleValid(requiredRole, sessionUserRole);
    console.log(`REQUIRED: ${requiredRole} SESSION: ${sessionUserRole} ACTUAL: ${userData?.userRole} VALID: ${sessionRoleValid}`);
    if (sessionRoleValid){
        if (sessionUserRole === userRoles.GUEST) return <Outlet /> 
        if (isUserLoading || isDataLoading) return <LoadingScreen/>;

        const actualRoleValid = isUserRoleValid(requiredRole, userData.userRole);
        return actualRoleValid ? <Outlet /> : <Navigate to="404"/>
    } else {
        if (isUserLoading) return null;
        return sessionUserRole === userRoles.GUEST ? <Navigate to="guest"/> : <Navigate to="/404"/>
    }
};