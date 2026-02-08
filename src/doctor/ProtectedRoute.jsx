import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("doctorToken");
    const rawUser = localStorage.getItem("doctorUser");
    let user = null;
    try { user = rawUser ? JSON.parse(rawUser) : null; } catch { user = null; }

    if (!token) return <Navigate to="/doctor/login" replace />;
    if (!user || user.role !== "doctor") return <Navigate to="/doctor/login" replace />;

    return children;
}
