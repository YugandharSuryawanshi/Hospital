import { useState, useEffect } from "react";
import {
    FaHome,
    FaBars,
    FaSignOutAlt,
    FaHospital,
    FaUsers,
    FaUserMd,
    FaImages,
    FaCreditCard,
    FaConciergeBell,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    // Update window width on resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowWidth < 768;

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        navigate("/login", { replace: true });
    };

    return (
        <div className="admin-panel">
            <div className={`sidebar ${isOpen ? "open" : "collapsed"} ${isMobile ? "mobile" : ""}`}>
                <div className="sidebar-header">
                    {isOpen && <span className="admin-title">Hospital Admin Panel</span>}
                    <button
                        className="sidebar-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <FaBars />
                    </button>
                </div>

                <ul className="sidebar-menu">
                    <li>
                        <NavLink to="/" onClick={handleLogout}><FaSignOutAlt className="icon" /> {isOpen && "Logout"}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin">
                            <FaHome className="icon" /> {isOpen && "Dashboard"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="users">
                            <FaUsers className="icon" /> {isOpen && "Users"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="add-doctor">
                            <FaUserMd className="icon" /> {isOpen && "Add Doctor"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="slider">
                            <FaImages className="icon" /> {isOpen && "Slider"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="facilities">
                            <FaHospital className="icon" /> {isOpen && "Facilities"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="cashless">
                            <FaCreditCard className="icon" /> {isOpen && "Cashless Points"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="services">
                            <FaConciergeBell className="icon" /> {isOpen && "Services"}
                        </NavLink>
                    </li>
                </ul>

            </div>
            <div
                className={`main-content ${isOpen ? "open" : "collapsed"} ${isMobile && !isOpen ? "full" : ""
                    }`}
            >
                {children}
            </div>
        </div>
    );
}
