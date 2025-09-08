import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${API}/api/auth/login`, { email, password });
            const data = res.data;

            // backend must return { token, user: { role, ... } }
            if (!data || !data.token || !data.user) {
                setError("Invalid server response");
                return;
            }

            // Require admin role for admin panel (adjust if you want different behavior)
            if (data.user.role !== "admin") {
                setError("Access denied: admin only");
                return;
            }

            // Save token & user for protected calls
            localStorage.setItem("adminToken", data.token);
            localStorage.setItem("adminUser", JSON.stringify(data.user));

            // Redirect to admin root (AdminMain handles protected routes)
            navigate("/admin", { replace: true });
        } catch (err) {
            console.error("Login error", err);
            const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Login failed";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };
    console.log(email);
    console.log(password);
    

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4" style={{ maxWidth: 420, width: "100%" }}>
                <h3 className="text-center mb-3">Admin Login</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="d-grid">
                        <button className="btn btn-primary" type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
