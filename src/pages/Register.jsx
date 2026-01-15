import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !address || !password) {
            alert("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("address", address);
            formData.append("password", password);
            formData.append("role", "user");

            const res = await axios.post(
                "http://localhost:4000/api/auth/register",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (res.status === 201) {
                alert("Registration successful! Please login.");
                navigate("/login");
            }

        } catch (err) {
            console.error("Registration error:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div
                className="card shadow-lg border-0 rounded-4 p-4 w-100"
                style={{ maxWidth: "600px" }}
            >
                <h2 className="text-center mb-4 fw-bold text-danger">
                    Create User Account
                </h2>

                <form onSubmit={handleRegister}>
                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">Full Name</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">Email</label>
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">Phone</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter phone number"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">Address</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter address"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">Password</label>
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create password"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-semibold">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                            />
                        </div>
                    </div>

                    <div className="d-grid mt-3">
                        <button
                            type="submit"
                            className="btn btn-danger btn-lg shadow-sm"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </div>

                    <p className="text-center mt-3 mb-0">
                        Already have an account?{" "}
                        <NavLink to="/login" className="fw-semibold">
                            Login here
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
}
