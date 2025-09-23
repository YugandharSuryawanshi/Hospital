import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import Index from "./Index.jsx";
import ContactUs from "./ContactUs.jsx";
import Doctor from "./Doctor.jsx";
import Cashless from "./Cashless.jsx";
import Appointment from "./Appointment.jsx";

export default function UserMain() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/doctors" element={<Doctor />} />
                <Route path="/cashless" element={<Cashless />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/appointment" element={<Appointment />} />
            </Routes>
            <Footer />
        </>
    );
}
