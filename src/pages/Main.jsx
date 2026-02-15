import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import socket from "../socket.js";
import Appointment from "./Appointment.jsx";
import BillPayment from "./BillPayment";
import Cashless from "./Cashless.jsx";
import ContactUs from "./ContactUs.jsx";
import Department from "./Department.jsx";
import Doctor from "./Doctor.jsx";
import Facilities from "./Facilities.jsx";
import Footer from "./Footer";
import GetAppointment from "./GetAppointment";
import Index from "./Index.jsx";
import Login from "./Login.jsx";
import Nav from "./Nav";
import Notifications from "./Notifications.jsx";
import Profile from "./Profile.jsx";
import Register from "./Register.jsx";
import YourAppointment from "./YourAppointment.jsx";

export default function UserMain() {
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userUser"));
        if (user?.user_id) {
            socket.emit("user_", user.user_id);
            console.log("User joined socket room:", user.user_id);
        }
    }, [])
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/doctors" element={<Doctor />} />
                <Route path="/cashless" element={<Cashless />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/getAppointment" element={<GetAppointment />} />
                <Route path="/department/:id" element={<Department />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/billPayment/:bill_id" element={<BillPayment />} />
                <Route path="/yourAppointment" element={<YourAppointment />} />
            </Routes>
            <Footer />
        </>
    );
}