import React from "react";
import './Style.css'
export default function Nav() {
    return (
        <>
            <div className="container-fluid color_format_back d-none d-md-block">
                <div className="row">
                    <div className="col-md-8">
                        <ul>
                            <li className="d-inline-block ml-2 mt-2 text-white"><i className="fa-solid fa-envelope mr-1"></i> vinayakhospitalcashless@gmail.com</li>
                            <li className="d-inline-block ml-2 mt-2 text-white"><i className="fa-solid fa-phone mr-1"></i> Call: 0000 000 0123</li>
                            <li className="d-inline-block ml-2 mt-2 text-white"><i className="fa-solid fa-clock mr-1"></i> Emergency 24 X 7</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul>
                            <li className="d-inline-block ml-4 mt-2 text-white">Marathi | English</li>
                            <li className="d-inline-block ml-4 mt-2 text-white"><i className="fa fa-facebook"></i></li>
                            <li className="d-inline-block ml-4 mt-2 text-white"><i className="fa fa-twitter"></i></li>
                            <li className="d-inline-block ml-4 mt-2 text-white"><i className="fa fa-youtube"></i></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-6 col-md-2">
                        <img src="./images/logo.png" className="ml-3 mt-2 w-100 h-50" alt="Logo" />
                    </div>
                    <div className="col-6 col-md-7 position-relative header-nav">
                        <nav className="navbar navbar-expand-lg navbar-light p-0 d-flex justify-content-end">
                            <button
                                className="navbar-toggler ms-auto"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div
                                className="collapse navbar-collapse justify-content-center header-collapse"
                                id="navbarSupportedContent"
                            >
                                <ul className="navbar-nav flex-lg-row flex-column align-items-lg-center">
                                    <li className="nav-item mx-lg-2">
                                        <a className="nav-link" href="#">Home</a>
                                    </li>

                                    <li className="nav-item dropdown mx-lg-2">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            role="button"
                                            data-toggle="dropdown"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Department
                                        </a>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </li>

                                    <li className="nav-item mx-lg-2">
                                        <a className="nav-link" href="#">Facilities</a>
                                    </li>
                                    <li className="nav-item mx-lg-2">
                                        <a className="nav-link" href="#">Doctors</a>
                                    </li>
                                    <li className="nav-item mx-lg-2">
                                        <a className="nav-link" href="#">Cashless</a>
                                    </li>
                                    <li className="nav-item mx-lg-2">
                                        <a className="nav-link" href="#">Contact Us</a>
                                    </li>

                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="col-md-3 d-none d-md-block justify-content-end">
                        <button className="btn btn-lg color_format_back text-white">
                            Appointment
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}