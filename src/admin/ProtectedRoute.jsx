import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("adminToken");
    const rawUser = localStorage.getItem("adminUser");
    let user = null;
    try { user = rawUser ? JSON.parse(rawUser) : null; } catch { user = null; }

    if (!token) return <Navigate to="/admin/login" replace />;
    if (!user || user.role !== "admin") return <Navigate to="/admin/login" replace />;

    return children;
}
