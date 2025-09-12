import React from "react";
import Index from "./Index.jsx";
import ContactUs from "./ContactUs.jsx";
import Doctor from "./Doctor.jsx";
import Cashless from "./Cashless.jsx";
import Nav from "./Nav";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";

export default function UserMain() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/doctors" element={<Doctor />} />
                <Route path="/cashless" element={<Cashless />} />
                <Route path="/contact" element={<ContactUs />} />
            </Routes>
            <Footer />
        </>
    );
}
