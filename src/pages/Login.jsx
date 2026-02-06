import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContex";
import { toastError, toastSuccess } from "../utils/toast";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    /* HANDLE CHANGE */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /* SUBMIT */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.password) {
            toastError("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:4000/api/auth/login",
                formData
            );
            login(res.data.token, res.data.user);

            // Save token
            localStorage.setItem("userToken", res.data.token);
            localStorage.setItem("userUser", JSON.stringify(res.data.user));

            toastSuccess("Login successful!");

            navigate("/");

        } catch (err) {
            setError(
                err.response?.data?.message || "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card shadow">
                            <div className="card-body">
                                <h3 className="text-center text-danger mb-4">
                                    Login
                                </h3>

                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    {/* EMAIL */}
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="fa fa-envelope"></i>
                                            </span>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter email"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* PASSWORD */}
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="fa fa-lock"></i>
                                            </span>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter password"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-danger w-100"
                                        disabled={loading}
                                    >
                                        {loading ? "Logging in..." : "Login"}
                                    </button>
                                </form>

                                <div className="text-center mt-3">
                                    <small>
                                        Don’t have an account?{" "}
                                        <NavLink to="/register">
                                            Register
                                        </NavLink>
                                    </small>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
