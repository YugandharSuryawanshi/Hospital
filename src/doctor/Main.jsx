import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";

export default function DoctorMain() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />

            <Route path="/" element={
                <ProtectedRoute>
                    <Nav />
                </ProtectedRoute>
            }>
                {/* <Route index element={<Dashboard />} />
                <Route path="slides" element={<Slides />} />
                <Route path="profile" element={<Profile />} />
                <Route path="slidelist" element={<SlidesList />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="facilities" element={<Facilities />} />
                <Route path="patients" element={<Patient />} />
                <Route path="departments" element={<Departments />} /> */}
            </Route>

            <Route path="/" element={<Navigate to="/doctor" replace />} />
            <Route path="*" element={<Navigate to="/doctor" replace />} />
        </Routes>
    );
}
