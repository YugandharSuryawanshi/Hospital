import { Navigate, Route, Routes } from "react-router-dom";
import TodayAppointments from "./Appointments";
import Dashboard from "./Dashboard";
import DoctorQueue from "./DoctorQueue";
import Login from "./Login";
import Nav from "./Nav";
import Notifications from "./Notifications";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";

export default function DoctorMain() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />

            <Route path="/" element={
                <ProtectedRoute>
                    <Nav />
                </ProtectedRoute>
            }>
                <Route index element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/doctor/queue" element={<DoctorQueue />} />
                <Route path="/doctor/appointments" element={<TodayAppointments />} />
                <Route path="/notifications" element={<Notifications />} />
            </Route>

            <Route path="/" element={<Navigate to="/doctor" replace />} />
            <Route path="*" element={<Navigate to="/doctor" replace />} />
        </Routes>
    );
}
