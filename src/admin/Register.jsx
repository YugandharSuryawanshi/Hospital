import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../utils/toast";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState(null); // profile image
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toastError("All fields are required!");
            return;
        }
        if (password !== confirmPassword) {
            toastError("Passwords do not match!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("phone", phone);
            formData.append("age", age);
            formData.append("gender", gender);
            formData.append("address", address);
            formData.append("role", "admin");
            if (image) {
                formData.append("image", image);
            }

            const res = await axios.post("http://localhost:4000/api/auth/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.status === 201) {
                toastSuccess("Registration successful! Please login.");
                navigate("/admin/login");
            }
        } catch (err) {
            console.error("Registration error:", err.response?.data || err.message);
            toastError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg border-0 rounded-4 p-4 w-75">
                <h2 className="text-center mb-4 fw-bold text-danger">Create an Account</h2>

                <form onSubmit={handleRegister}>
                    <div className="col-md-12">
                        <div className="row">
                            <div className=" col-md-6 mb-3">
                                <label className="form-label fw-semibold">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className=" col-md-6 mb-3">
                                <label className="form-label fw-semibold">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className=" col-md-6 mb-3">
                                <label className="form-label fw-semibold">Phone</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className=" col-md-6 mb-3">
                                <label className="form-label fw-semibold">Age</label>
                                <input
                                    type="number"
                                    className="form-control form-control-lg"
                                    placeholder="Enter age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>

                            <div className="col-md-3 mb-3">
                                <label className="form-label fw-semibold">Gender</label>
                                <select
                                    className="form-control form-control-lg"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className=" col-md-9 mb-3">
                                <label className="form-label fw-semibold">Address</label>
                                <textarea
                                    className="form-control form-control-lg"
                                    placeholder="Enter address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-semibold">Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-semibold">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <div className=" col-md-12 d-grid text-center">
                                <button type="submit" className="btn btn-warning btn-lg shadow-sm register-btn">
                                    Register
                                </button>
                                <p className="text-center mt-3 mb-0">
                                    Already have an account?{" "}
                                    <span className="text-primary fw-semibold"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate("/admin/login")}
                                    > Login here..
                                    </span>
                                </p>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
