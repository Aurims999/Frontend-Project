import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const ProtectedRoutes = ({requiredRole = null, navigateTo = "guest"}) => {
    const {currentUser, userData} = useContext(UserContext);
    if (currentUser == null || userData == null) return <Navigate to="guest"/>;
    if (requiredRole && userData.userRole != requiredRole) return <Navigate to={navigateTo}/>;

    return <Outlet />;
};

export default ProtectedRoutes;