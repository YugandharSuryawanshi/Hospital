import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("All fields are required!");
            return;
        }

        const user = { name, email, password };
        localStorage.setItem("adminUser", JSON.stringify(user));

        alert("Registration successful! Please login.");
        navigate("/admin/login");
    };
    console.log(name, email, password);
    

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg border-0 rounded-4 p-4 w-100" style={{ maxWidth: "500px" }}>
                <h2 className="text-center mb-4 fw-bold text-danger">Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Full Name</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email Address</label>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="d-grid text-center">
                        <button type="submit" className="btn btn-warning btn-lg shadow-sm register-btn">
                            Register
                        </button>
                    </div>

                    <p className="text-center mt-3 mb-0">
                        Already have an account?{" "}
                        <span
                            className="text-primary fw-semibold"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/admin/login")}
                        >
                            Login here
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}
