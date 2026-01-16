import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContex";
import './Style.css';
export default function Nav() {
    const navigate = useNavigate();
    const { isAuth, user, logout } = useAuth();
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.user_name || "");
            setImage(user.user_profile || null);
        }
    }, [user]);

    useEffect(() => {
        if (!logout) {
            navigate("/", { replace: true });
        }
    }, [logout, navigate]);


    /* LOGOUT */
    const handleLogout = () => {
        logout();
        localStorage.removeItem("userUser");
        localStorage.removeItem("userToken");
        alert("Logout successful");
        navigate("/", { replace: true });
    };
    return (
        <>
            <div className="container-fluid color_format_back d-none d-md-block">
                <div className="row">
                    <div className="col-md-8">
                        <ul>
                            <li className="d-inline-block ml-3 mt-2 text-white"><i className="fa-solid fa-envelope mr-1"></i> vinayakhospitalcashless@gmail.com</li>
                            <li className="d-inline-block ml-3 mt-2 text-white"><i className="fa-solid fa-phone mr-1"></i> Call: 0000 000 0123</li>
                            <li className="d-inline-block ml-3 mt-2 text-white"><i className="fa-solid fa-clock mr-1"></i> Emergency 24 X 7</li>
                        </ul>
                    </div>
                    <div className="col-md-4 text-right">
                        <ul>
                            <li className="d-inline-block ml-4 mt-2 text-white"><i className="fa fa-instagram"></i></li>
                            <li className="d-inline-block ml-4 mt-2 text-white"><i className="fa fa-facebook"></i></li>
                            <li className="d-inline-block ml-4 mt-2 text-white"><i className="fa fa-twitter"></i></li>
                            <li className="d-inline-block ml-4 mt-2 text-white"><i className="fa fa-youtube"></i></li>
                            <li className="d-inline-block ml-4 mt-2 text-white mr-5"><i className="fa fa-bell"></i></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-6 col-md-2">
                        <img src="./images/logo.png" className="ml-3 mt-2 w-100 h-50" alt="Logo" />
                    </div>
                    <div className="col-6 col-md-8 position-relative header-nav">
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
                                        <NavLink className="nav-link" to="/">Home</NavLink>
                                    </li>

                                    <li className="nav-item dropdown mx-lg-2">
                                        <NavLink className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                            Departments
                                        </NavLink>
                                        <div className="dropdown-menu">
                                            <NavLink className="dropdown-item" to="/cardiology">Cardiology</NavLink>
                                            <NavLink className="dropdown-item" to="/neurology">Neurology</NavLink>
                                            <NavLink className="dropdown-item" to="/orthopedics">Orthopedics</NavLink>
                                            <NavLink className="dropdown-item" to="/pediatrics">Pediatrics</NavLink>
                                            <NavLink className="dropdown-item" to="/gynecology">Gynecology</NavLink>
                                            <NavLink className="dropdown-item" to="/ophthalmology">Ophthalmology</NavLink>
                                        </div>
                                    </li>

                                    <li className="nav-item dropdown mx-lg-2">
                                        <NavLink className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                            Facilities
                                        </NavLink>
                                        <div className="dropdown-menu">
                                            <NavLink className="nav-link" to="/facilities">Facilities</NavLink>
                                            <NavLink className="dropdown-item" to="/testimonial">Patient Testimonials</NavLink>
                                            <NavLink className="dropdown-item" to="/gallery">Gallery Page</NavLink>
                                            <NavLink className="dropdown-item" to="/insurance">Insurance & <br /> Cashless Info</NavLink>
                                            <NavLink className="dropdown-item" to="/blog">Blog / Health Tips</NavLink>
                                        </div>
                                    </li>
                                    <li className="nav-item mx-lg-2">
                                        <NavLink className="nav-link" to="/doctors">Doctors</NavLink>
                                    </li>
                                    <li className="nav-item mx-lg-2">
                                        <NavLink className="nav-link" to="/cashless">Cashless</NavLink>
                                    </li>
                                    <li className="nav-item mx-lg-2">
                                        <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                                    </li>
                                    <li className="nav-item mx-lg-2">
                                        <NavLink className="nav-link" to="/getAppointment">Book Appointment</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="col-md-2 d-md-block justify-content-end">
                        <div className="row">
                            <div>
                                <button className="btn btn-sm btn-danger mb-3 ml-2">
                                    <NavLink className="nav-link" to="/emergency">Emergency</NavLink>
                                </button>
                                {isAuth ? (
                                    // <button className="btn btn-sm color_format_back text-white m-0 mb-3" onClick={handleLogout}>
                                    //     <NavLink className="nav-link">Logout</NavLink>
                                    // </button>
                                    <button className="btn btn-sm  text-white nav-item dropdown m-0 mb-3 p-0 ">
                                        <NavLink className="nav-link " role="button" data-toggle="dropdown" data-bs-toggle="dropdown" aria-expanded="false">


                                            <div className="col-md-5 d-flex flex-column align-items-center justify-content-center">
                                                {image ? (
                                                    <img src={`http://localhost:4000/uploads/${image}`} alt="Profile"
                                                        className="rounded-circle" style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                                    />
                                                ) : (
                                                    <div className="rounded-circle bg-dark text-white text-center d-flex align-items-center justify-content-center"
                                                        style={{ width: "40px", height: "40px", fontSize: "30px", fontWeight: "bold" }}
                                                    >
                                                        {name?.split(" ").map(word => word[0]).join("").toUpperCase()}
                                                    </div>
                                                )}
                                            </div>




                                        </NavLink>
                                        <div className="dropdown-menu">
                                            <NavLink className="dropdown-item" to="/profile">Profile</NavLink>
                                            <button type="button" className="dropdown-item bg-white text-dark" onClick={handleLogout}>LogOut</button>
                                        </div>
                                    </button>
                                ) : (
                                    <button className="btn btn-sm color_format_back text-white m-0 mb-3">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </button>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}