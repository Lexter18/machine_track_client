import React from 'react';
import {Navigate} from "react-router-dom";


export const ProtectedRoute = ({ element: Component, roles, userRole }) => {
    return roles.includes(userRole)
        ? <Component />
        : <Navigate to="/home" />;
};