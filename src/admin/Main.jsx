// Main.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login.jsx";
import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register.jsx";
import Slider from "./Slider.jsx";

export default function AdminMain() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Navbar>
                            <Dashboard />
                        </Navbar>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Navbar>
                            <h2>Admin Settings</h2>
                        </Navbar>
                    </ProtectedRoute>
                }
            />

            <Route path="/slider" element={
                <ProtectedRoute>
                    <Navbar>
                        <Slider />
                    </Navbar>
                </ProtectedRoute>
            }
            />

            {/* Redirect unknown routes */}
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
    );
}
