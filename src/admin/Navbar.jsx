import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const user = JSON.parse(localStorage.getItem("adminUser") || "null");
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [openGroups, setOpenGroups] = useState({});

    const toggleGroup = (group) => {
        setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminUser");
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    return (
        <div className="wrapper d-flex">
            <div className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
                <div className="sidebar-header">
                    <div className="sidebar-brand">Hospital Admin Panel</div>
                    <button
                        className="btn-close d-lg-none"
                        onClick={() => setSidebarOpen(false)}
                    >
                        ✖
                    </button>
                </div>

                <ul className="sidebar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin">
                            <i className="fas fa-tachometer-alt nav-icon"></i>
                            <b>Dashboard</b>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/slides">
                            <i className="fas fa-palette nav-icon"></i>
                            <b>Slides</b>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/">
                            <i className="fas fa-font nav-icon"></i>
                            <b>Typography</b>
                        </NavLink>
                    </li>

                    <li className="nav-title">Components</li>
                    <li className="nav-group">
                        <a
                            className="nav-link nav-group-toggle"
                            href="#"
                            onClick={() => toggleGroup("base")}
                        >
                            <i className="fas fa-puzzle-piece nav-icon"></i>
                            <b>Base</b>
                            <i className="fas fa-chevron-down ms-auto text-white"></i>
                        </a>
                        {openGroups["base"] && (
                            <ul className="nav-group-items">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="#">Accordion</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="#">Breadcrumb</NavLink>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li className="nav-title">Extras</li>
                    <li className="nav-group">
                        <a
                            className="nav-link nav-group-toggle"
                            href="#"
                            onClick={() => toggleGroup("pages")}
                        >
                            <i className="fas fa-file nav-icon"></i>
                            <b>Pages</b>
                            <i className="fas fa-chevron-down ms-auto text-white"></i>
                        </a>
                        {openGroups["pages"] && (
                            <ul className="nav-group-items">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/Login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/Register">Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/Error">Error 404</NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>

            <div className="main flex-grow-1">
                <header className="header">
                    <button
                        className="header-toggler"
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                    >
                        <i className="text-dark fas fa-bars nav-icon"></i>
                    </button>
                    <ul className="header-nav">
                        <li><a href="#">
                            <i className="fas fa-bell nav-icon text-dark"></i>
                        </a>
                        </li>
                    </ul>
                    <ul className="header-nav ms-auto">
                        <li className="dropdown">
                            <button className="btn">
                                <i className="fas fa-user nav-icon text-dark"></i>
                                <b>{user ? ` ${user.user_name}` : ""}</b>
                            </button>
                            <div className="dropdown-menu">
                                <a href="#">
                                    <i className="fas fa-cog nav-icon text-dark"></i>
                                    <b> Settings</b>
                                </a>
                                <button onClick={handleLogout}>
                                    <i className="fas fa-sign-out nav-icon text-dark"></i>
                                    <b> Logout</b>
                                </button>
                            </div>
                        </li>
                    </ul>
                </header>

                {/* Here the child pages will render */}
                <main className="content p-3">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
