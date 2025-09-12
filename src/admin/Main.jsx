import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login.jsx";
import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register.jsx";

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
