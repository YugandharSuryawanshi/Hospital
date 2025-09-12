import { useState, useEffect } from "react";
import {
    FaBars,
    FaHome,
    FaImages,
    FaSignOutAlt,
    FaUserMd,
    FaUsers,
    FaUserShield,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
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
            {/* Sidebar */}
            <div
                className={`sidebar ${isOpen ? "open" : "collapsed"} ${isMobile ? "mobile" : ""
                    }`}
            >
                <div className="sidebar-header">
                    <span className="admin-title">{isOpen && "Admin Panel"}</span>
                    <button
                        className="sidebar-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <FaBars />
                    </button>
                </div>

                <ul className="sidebar-menu">
                    <li>
                        <Link to="/dashboard">
                            <FaHome className="icon" />
                            {isOpen && "Dashboard"}
                        </Link>
                    </li>
                    <li>
                        <Link to="/users">
                            <FaUsers className="icon" />
                            {isOpen && "Users"}
                        </Link>
                    </li>
                    <li>
                        <Link to="/admins">
                            <FaUserShield className="icon" />
                            {isOpen && "Admins"}
                        </Link>
                    </li>
                    <li>
                        <Link to="/sliders">
                            <FaImages className="icon" />
                            {isOpen && "Sliders"}
                        </Link>
                    </li>
                    <li>
                        <Link to="/doctors">
                            <FaUserMd className="icon" />
                            {isOpen && "Doctors"}
                        </Link>
                    </li>
                </ul>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <FaSignOutAlt className="icon" />
                        {isOpen && "Logout"}
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div
                className={`main-content ${isOpen ? "open" : "collapsed"} ${isMobile && !isOpen ? "full" : ""
                    }`}
            >
                {children}
            </div>
        </div>
    );
}
