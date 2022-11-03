import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const user = localStorage.getItem('user');
    const userParse = JSON.parse(user);
    const token = userParse && userParse?.token;
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
