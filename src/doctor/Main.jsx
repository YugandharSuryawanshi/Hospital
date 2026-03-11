import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Dashboard from "./Dashboard";
import TodayAppointments from "./Appointments";
import DoctorQueue from "./DoctorQueue";

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
                <Route path="/doctor/queue" element={<DoctorQueue />} />
                <Route path="/doctor/appointments" element={<TodayAppointments />} />
            </Route>

            <Route path="/" element={<Navigate to="/doctor" replace />} />
            <Route path="*" element={<Navigate to="/doctor" replace />} />
        </Routes>
    );
}
