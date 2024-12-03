import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const ProtectedRoutes = () => {
    const {currentUser} = useContext(UserContext);
    return currentUser ? <Outlet /> : <Navigate to="guest" />;
};

export default ProtectedRoutes;