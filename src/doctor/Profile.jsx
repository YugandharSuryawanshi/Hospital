import { useEffect, useState } from "react";
import doctorAxios from "./doctorAxios";
import { toastError, toastSuccess } from "../utils/toast";
import "./Profile.css";

export default function Profile() {

    const [tab, setTab] = useState("profile");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const user = JSON.parse(localStorage.getItem("doctorUser") || "null");

    useEffect(() => {
        if (user) {
            setName(user.user_name);
            setEmail(user.user_email);
            setPreview(`http://localhost:4000/uploads/${user.user_profile}`);
        }
    }, []);

    // ================= PROFILE UPDATE =================
    const updateProfile = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("id", user.user_id);
            formData.append("name", name);
            formData.append("email", email);
            if (image) formData.append("image", image);

            const res = await doctorAxios.put("/profile", formData);

            localStorage.setItem("doctorUser", JSON.stringify(res.data.user));
            toastSuccess("Profile Updated 🚀");

        } catch {
            toastError("Update Failed");
        }
    };

    // ================= OTP =================
    const sendOTP = async () => {
        await doctorAxios.post("/send-otp", { email });
        toastSuccess("OTP Sent 📩");
        setStep(2);
    };

    const changePassword = async () => {

        if (newPass !== confirmPass) {
            return toastError("Passwords not match");
        }

        await doctorAxios.post("/verify-otp-change-password", {
            email,
            otp,
            newPass
        });

        toastSuccess("Password Updated 🔐");
        setStep(1);
    };

    return (
        <div className="profile-page">

            <div className="profile-card">

                {/* LEFT PANEL */}
                <div className="left-panel">

                    <div className="avatar-wrapper">
                        <img src={preview} className="avatar" />
                        <div className="overlay">Change</div>
                    </div>

                    <h4>{name}</h4>
                    <p>{email}</p>

                    <div className="tabs">
                        <button
                            className={tab === "profile" ? "active" : ""}
                            onClick={() => setTab("profile")}
                        >
                            Profile
                        </button>

                        <button
                            className={tab === "password" ? "active" : ""}
                            onClick={() => setTab("password")}
                        >
                            Password
                        </button>
                    </div>

                </div>

                {/* RIGHT PANEL */}
                <div className="right-panel">

                    {tab === "profile" && (
                        <form onSubmit={updateProfile} className="form">

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                            />

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />

                            <input
                                type="file"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                    setPreview(URL.createObjectURL(e.target.files[0]));
                                }}
                            />

                            <button>Update Profile</button>
                        </form>
                    )}

                    {tab === "password" && (
                        <div className="form">

                            {step === 1 && (
                                <button onClick={sendOTP}>
                                    Send OTP
                                </button>
                            )}

                            {step === 2 && (
                                <>
                                    <input placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} />
                                    <input type="password" placeholder="New Password" onChange={(e) => setNewPass(e.target.value)} />
                                    <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPass(e.target.value)} />

                                    <button onClick={changePassword}>
                                        Change Password
                                    </button>
                                </>
                            )}

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}