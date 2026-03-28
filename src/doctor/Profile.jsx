import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../utils/toast";
import doctorAxios from "./doctorAxios";
import "./DoctorProfile.css";

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
    const [timeLeft, setTimeLeft] = useState(300); // 5 min = 300 sec
    const [timerActive, setTimerActive] = useState(false);

    const user = JSON.parse(localStorage.getItem("doctorUser") || "null");

    useEffect(() => {
        if (user) {
            setName(user.user_name);
            setEmail(user.user_email);
            setPreview(`http://localhost:4000/uploads/${user.user_profile}`);
        }
    }, []);

    // Update Profile
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
            toastSuccess("Profile Updated Successfully...");
        } catch {
            toastError("Update Failed");
        }
    };

    // Timer UseEffect
    useEffect(() => {
        let timer;
        if (timerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        if (timeLeft === 0) {
            setTimerActive(false);
        }
        return () => clearInterval(timer);
    }, [timerActive, timeLeft]);
    // Time Format
    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    };

    //Send Otp
    const sendOTP = async () => {
        try {
            await doctorAxios.post("/send-otp", { email });
            toastSuccess("OTP Sent Successfully..");
            setStep(2);
            // Start Timer
            setTimeLeft(300);
            setTimerActive(true);
        } catch {
            toastError("Failed to send OTP");
        }
    };

    //Change Password
    const changePassword = async () => {
        if (newPass !== confirmPass) {
            return toastError("Passwords do not match");
        }

        if (!timerActive) {
            return toastError("OTP expired..");
        }

        try {
            const res = await doctorAxios.post("/verify-otp-change-password", { email, otp, newPass });
            toastSuccess(res.data.message || "Password Updated Successfully..");

            setStep(1);
            setOtp("");
            setNewPass("");
            setConfirmPass("");
        } catch (err) {
            //Error Handling
            const msg = err.response?.data?.message || "Something went wrong";
            toastError(msg);
        }
    };

    return (
        <div className="profile-page">

            <div className="profile-card">

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

                <div className="right-panel">
                    {tab === "profile" && (
                        <form onSubmit={updateProfile} className="form">

                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />

                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

                            <input type="file" onChange={(e) => {
                                setImage(e.target.files[0]);
                                setPreview(URL.createObjectURL(e.target.files[0]));
                            }} />

                            <button>Update Profile</button>
                        </form>
                    )}

                    {tab === "password" && (
                        <div className="form">

                            {step === 1 && (
                                <button onClick={sendOTP}> Send OTP </button>
                            )}

                            {step === 2 && (
                                <>
                                    <input type="text" className="form-control mb-2" placeholder="Enter OTP"
                                        onChange={(e) => setOtp(e.target.value)} />

                                    <input type="password" className="form-control mb-2" placeholder="New Password"
                                        onChange={(e) => setNewPass(e.target.value)} />

                                    <input type="password" className="form-control mb-2" placeholder="Confirm Password"
                                        onChange={(e) => setConfirmPass(e.target.value)} />

                                    {/* Timer */}
                                    <div className="text-center mb-2">
                                        {timerActive ? (
                                            <span className="text-darker fw-bold">
                                                Time Left: {formatTime(timeLeft)}
                                            </span>
                                        ) : (
                                            <span className="text-danger text-dangers fw-bold">
                                                OTP Expired..!
                                            </span>
                                        )}
                                    </div>

                                    {/* btn */}
                                    <button className="btn btn-success w-100 mb-2" onClick={changePassword} disabled={!timerActive}>
                                        Change Password
                                    </button>

                                    {/* Resend */}
                                    {!timerActive && (
                                        <button className="btn btn-warning w-100" onClick={sendOTP}>
                                            Resend OTP
                                        </button>
                                    )}
                                </>
                            )}

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}