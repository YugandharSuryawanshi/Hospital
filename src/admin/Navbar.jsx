import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login", { replace: true });
    };

    return (
        <>
            <h1>Welcome to Admin Navbar</h1>
            <NavLink to="/admin">Dashboard</NavLink>
            <NavLink to="/admin/register">Register</NavLink>

            <button onClick={handleLogout}>Logout</button>
        </>
    );
}
