import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Dummy check (replace with real API call)
        if (email === "admin@gmail.com" && password === "admin") {
            localStorage.setItem("adminToken", "sample_token");
            navigate("/admin", { replace: true });
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div style={{ padding: "50px" }}>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
