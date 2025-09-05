import React from "react";
import "./Style.css";
import Nav from "./Nav.jsx";
function Doctors() {
    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0 doctor_page_banner">
                        <h1 className="ml-5 mt-5">All Doctors</h1>
                        <ul>
                            <li className="d-inline-block ml-3">Home</li>
                            <li className="d-inline-block ml-3"><i class="fa-solid fa-chevron-right"></i></li>
                            <li className="d-inline-block ml-3">Doctors</li>
                        </ul>
                    </div>
                </div>
            </div>
            <section className="bg-light">
                <div className="container mt-5 pb-5">
                    <div className="row">
                        <div className="col-md-6 mt-2">
                            <div className="card card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <img src="./images/doc-8.jpg" className="doctor_img rounded-circle w-100"/>
                                    </div>
                                    <div className="col-8">
                                        <h3>Dr. Vinayak Murti</h3>
                                        <p>Consultant Cardiologist</p>
                                        <h6>M.D (Medicine), D.N.B, D.M (Cardiology) </h6>
                                        <button className="btn btn-outline-primary mt-2">View Profile</button><br /><br />
                                        <button className="btn btn-primary">Make An Appointment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mt-2">
                            <div className="card card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <img src="./images/doc-1.jpg" className="doctor_img rounded-circle w-100"/>
                                    </div>
                                    <div className="col-8">
                                        <h3>Dr. Isha patel</h3>
                                        <p>Consultant Obstetrician & Gynaecologist</p>
                                        <h6>M.D, D.N.B (OBGYN) Obstetrics and Gynecology </h6>
                                        <button className="btn btn-outline-primary mt-2">View Profile</button><br /><br />
                                        <button className="btn btn-primary">Make An Appointment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Doctors;

