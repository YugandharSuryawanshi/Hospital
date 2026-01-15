import { Route, Routes } from "react-router-dom";
import Appointment from "./Appointment.jsx";
import Cashless from "./Cashless.jsx";
import ContactUs from "./ContactUs.jsx";
import Doctor from "./Doctor.jsx";
import Facilities from "./Facilities.jsx";
import Footer from "./Footer";
import GetAppointment from "./GetAppointment";
import Index from "./Index.jsx";
import Nav from "./Nav";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

export default function UserMain() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/doctors" element={<Doctor />} />
                <Route path="/cashless" element={<Cashless />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/getAppointment" element={<GetAppointment />} />
            </Routes>
            <Footer />
        </>
    );
}
