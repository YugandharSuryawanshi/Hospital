import { Navigate, Route, Routes } from "react-router-dom";
import Appointments from "./Appointments";
import Dashboard from "./Dashboard";
import Doctors from "./Doctors";
import Facilities from "./Facilities";
import Login from "./Login";
import Navbar from "./Navbar";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Slides from "./Slides";
import SlidesList from "./SlidesList";

export default function AdminMain() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="/" element={
                <ProtectedRoute>
                    <Navbar />
                </ProtectedRoute>
            }>
                <Route index element={<Dashboard />} />
                <Route path="slides" element={<Slides />} />
                <Route path="profile" element={<Profile />} />
                <Route path="slidelist" element={<SlidesList />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="facilities" element={<Facilities />} />
            </Route>

            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
    );
}
