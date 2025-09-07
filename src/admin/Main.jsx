import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRoute from "./ProtectedRoute";

export default function AdminMain() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <Dashboard />
                            </>
                        </ProtectedRoute>
                    }
                />
                <Route path="/settings" element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <h2>Admin Settings</h2>
                            </>
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/admin" />} />
            </Routes>
        </>
    );
}
