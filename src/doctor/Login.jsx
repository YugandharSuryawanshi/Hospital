import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../utils/toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const API = process.env.REACT_APP_API_URL || "http://localhost:4000";

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            toastError("Please fill all fields");
            setError("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${API}/api/auth/login`, { email, password });
            const data = res.data;

            // backend must return { token, user: { role, ... } }
            if (!data || !data.token || !data.user) {
                toastError("Invalid server response");
                setError("Invalid server response");
                return;
            }

            // Require admin role for admin panel
            if (data.user.role !== "doctor") {
                toastError("Access denied: doctor only");
                setError("Access denied: doctor only");
                return;
            }

            // Save token & user for protected calls
            localStorage.setItem("doctorToken", data.token);
            localStorage.setItem("doctorUser", JSON.stringify(data.user));

            // Redirect to doctor root
            navigate("/doctor", { replace: true });
            toastSuccess("Login successful..!");
        } catch (err) {
            console.error("Login error", err);
            const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Login failed";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4" style={{ maxWidth: 420, width: "100%" }}>
                <h3 className="text-center mb-3">Doctor Login</h3>

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
                    <div className="mt-3">
                        <NavLink className="float-right" to="/doctor/forgot-password">Forgot Password?</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}
