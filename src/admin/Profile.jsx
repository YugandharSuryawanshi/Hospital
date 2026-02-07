import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminAxios from "./adminAxios";
import { toastSuccess, toastError, toastInfo } from "../utils/toast";


export default function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("adminUser") || "null");
    const id = user ? user.user_id : null;
    const imageUrl = currentImage ? `http://localhost:4000/uploads/${currentImage}` : null;

    useEffect(() => {
        if (user) {
            setName(user.user_name || "");
            setEmail(user.user_email || "");
            setCurrentImage(user.user_profile || null);
        }
    }, []);

    const updateProfile = async (e) => {
        e.preventDefault();
        if (!name || !email) {
            toastError("Name and Email are required!");
            return;
        }

        try {
            const token = localStorage.getItem("adminToken");
            if (!token) {
                toastInfo('Session expired, Please log in again.');
                navigate("/admin/login");
                return;
            }

            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("email", email);
            if (image) formData.append("image", image);

            const res = await adminAxios.put("/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });


            const updatedUser = res.data.user;
            localStorage.setItem("adminUser", JSON.stringify(updatedUser));

            setCurrentImage(updatedUser.user_profile || null);
            toastSuccess("Profile updated successfully..!");
        } catch (err) {
            console.error("Profile update error:", err.response?.data || err.message);
            toastError(err.response?.data?.message || "Profile update failed");
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 p-0">
                        <h1 className="ml-2 mt-3">Profile</h1>
                        <ul>
                            <li className="d-inline-block ml-3">Home</li>
                            <li className="d-inline-block ml-3">
                                <i className="fa-solid fa-chevron-right"></i>
                            </li>
                            <li className="d-inline-block ml-3">Profile</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div
                    className="card shadow-lg border-0 rounded-4 p-4 w-100"
                    style={{ maxWidth: "500px" }}
                >
                    <h2 className="text-center mb-4 fw-bold text-primary">Update Profile</h2>

                    {imageUrl && (
                        <div className="text-center mb-3">
                            <img src={imageUrl} alt="Current Profile"
                                style={{
                                    width: 120,
                                    height: 120,
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    border: "2px solid #ddd",
                                }} />
                        </div>
                    )}

                    <form onSubmit={updateProfile}>
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
                            <label className="form-label fw-semibold">Profile Image</label>
                            <input
                                type="file"
                                className="form-control form-control-lg"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>

                        <div className="d-grid text-center">
                            <button type="submit" className="btn btn-warning btn-lg shadow-sm register-btn">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
