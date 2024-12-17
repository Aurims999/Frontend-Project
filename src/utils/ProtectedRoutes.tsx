import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SpotifyDataContext } from "../context/SpotifyDataContext";

import { LoadingScreen } from "../components/LoadingScreen/LoadingScreen";

const ProtectedRoutes = ({requiredRole = null, navigateTo = "guest"}) => {
    const {currentUser, userData, isUserLoading} = useContext(UserContext);
    const {isDataLoading} = useContext(SpotifyDataContext)

    if(isUserLoading || isDataLoading) return <LoadingScreen/>;
    if (currentUser == null || userData == null) return <Navigate to="guest"/>
    if (requiredRole && userData.userRole != requiredRole) return <Navigate to={navigateTo}/>;

    return <Outlet />;
};

export default ProtectedRoutes;