import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminMain from "./admin/Main.jsx";
import UserMain from "./pages/Main.jsx";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<UserMain />} />
                <Route path="/admin/*" element={<AdminMain />} />
            </Routes>
        </Router>
    );
}
