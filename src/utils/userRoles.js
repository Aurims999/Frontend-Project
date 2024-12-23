export const userRoles = {
    ADMIN: "ADMIN",
    USER: "USER",
    GUEST: "GUEST",
}

export const isUserRoleValid = (requiredRole, userRole) => {
    switch (userRole) {
        case userRoles.USER:
            return requiredRole === userRole;
        case userRoles.ADMIN:
            return true;
        default:
            return requiredRole === userRoles.GUEST;
    }
}