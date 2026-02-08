import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminMain from "./admin/Main.jsx";
import UserMain from "./pages/Main.jsx";
import DoctorMain from "./doctor/Main.jsx";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<UserMain />} />
                <Route path="/admin/*" element={<AdminMain />} />
                <Route path="/doctor/*" element={<DoctorMain />} />
            </Routes>
        </Router>
    );
}
