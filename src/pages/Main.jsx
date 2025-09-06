import React from "react";
import Index from "./Index.jsx";
import ContactUs from "./ContactUs.jsx";
import Doctor from "./Doctor.jsx";
import Cashless from "./Cashless.jsx";
import Nav from "./Nav";
import Footer from "./Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Main()
{
    return (
        <>
            <Router>
                <Nav />
                <Routes>
                    <Route path="/" element={<Index ></Index>} />
                    <Route path="/doctors" element={<Doctor></Doctor>} />
                    <Route path="/cashless" element={<Cashless></Cashless>} />
                    <Route path="/contact" element={<ContactUs></ContactUs>} />
                </Routes>
                <Footer />
            </Router>
        </>
    )
}
