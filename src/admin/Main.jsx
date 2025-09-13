// src/admin/Main.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Slides from "./Slides";

export default function AdminMain() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Navbar />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="slides" element={<Slides />} />
                <Route path="settings" element={<h2>Admin Settings</h2>} />
            </Route>

            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
    );
}
