import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toastError, toastSuccess } from "../utils/toast";
import userAxios from "./userAxios";

export default function Profile() {
    const user = JSON.parse(localStorage.getItem("userUser") || "null");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState(null);

    const [appointments, setAppointments] = useState([]);
    const [showMode, setShowMode] = useState("profile");
    const [loading, setLoading] = useState(true);

    const URL = 'http://localhost:4000/api/user';

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    // Load Profile
    useEffect(() => {
        if (!user?.user_id) return;

        axios.get(`${URL}/profile/${user.user_id}`)
            .then((res) => {
                setName(res.data.user_name);
                setEmail(res.data.user_email);
                setPhone(res.data.user_phone);
                setAddress(res.data.user_address);
                setImage(res.data.user_profile);

                setFormData({
                    name: res.data.user_name,
                    email: res.data.user_email,
                    phone: res.data.user_phone,
                    address: res.data.user_address,
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Image Change
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle Change in inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Update Profile
    const handleUpdate = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("address", formData.address);

        if (image && typeof image !== "string") {
            data.append("image", image);
        }

        try {
            const res = await axios.put(`${URL}/updateProfile/${user.user_id}`, data,
                { headers: { "Content-Type": "multipart/form-data" } });

            localStorage.setItem("userUser", JSON.stringify(res.data.user));

            setName(res.data.user.user_name);
            setEmail(res.data.user.user_email);
            setPhone(res.data.user.user_phone);
            setAddress(res.data.user.user_address);
            setImage(res.data.user.user_profile);

            setShowMode("profile");
            toastSuccess("Profile updated successfully!");

        } catch (err) {
            toastError("Profile update failed...");
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="card border-0">
                    <div className="card-body">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="text-center text-danger m-3">My Profile</h1>
                                </div>
                                <div className="col-md-8"></div>
                                <div className="col-md-4">
                                    <button className="btn btn-warning mr-1" onClick={() => setShowMode("profile")}>Profile</button>
                                    <button className="btn btn-danger ml-1"> <NavLink to="/yourAppointment" className="text-decoration-none text-white">Your Appointments</NavLink> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile */}
            {!loading && showMode === "profile" && (
                <div className="container">
                    <div className="card p-4 shadow border-0">
                        {loading && <p>Loading...</p>}
                        <div className="row">
                            <div className="col-md-4 text-center">
                                {image ? (
                                    <img src={`http://localhost:4000/uploads/${image}`} className="rounded-circle"
                                        style={{ width: 150, height: 150, objectFit: "cover" }} alt="profile" />
                                ) : (
                                    <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
                                        style={{ width: 150, height: 150, fontSize: 40 }}>
                                        {name?.[0]}
                                    </div>
                                )}
                            </div>

                            <div className="col-md-8">
                                <p><b>Name:</b> {name}</p>
                                <p><b>Email:</b> {email}</p>
                                <p><b>Phone:</b> {phone}</p>
                                <p><b>Address:</b> {address}</p>

                                <button className="btn btn-primary" onClick={() => setShowMode("edit")}>
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Profile */}
            {showMode === "edit" && (
                <div className="container">
                    <div className="card p-4 shadow border-0">
                        {loading && <p>Loading...</p>}
                        <form onSubmit={handleUpdate}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input className="form-control" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label>Email</label>
                                <input className="form-control" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label>Phone</label>
                                <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label>Address</label>
                                <input className="form-control" name="address" value={formData.address} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label>Profile Image</label>
                                <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                            </div>
                            <button className="btn btn-success me-2 mr-2"> Update </button>
                            <button type="button" className="btn btn-secondary ml-2" onClick={() => setShowMode("profile")}> Cancel </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}