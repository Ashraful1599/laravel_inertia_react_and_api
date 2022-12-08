import React from 'react'
import { Navigate, useNavigate, Outlet } from "react-router-dom";

export default function AuthCheckPrivateOutlet() {

    const token = localStorage.getItem("auth_token");
    return token ? <Navigate to="/admin/dashboard" /> : <Outlet />;
}
