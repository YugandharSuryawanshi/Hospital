import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        image: null
    });

    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("userUser") || "null");

    useEffect(() => {
        if (!user?.user_id) return;
        axios.get(`http://localhost:4000/api/user/profile/${user.user_id}`)
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
                    image: res.data.user_profile
                });

                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("address", formData.address);

        //password optional (if in future need that time help)
        if (formData.password) {
            data.append("password", formData.password);
        }

        //image optional
        if (image && typeof image !== "string") {
            data.append("image", image);
        }

        try {
            const res = await axios.put(
                `http://localhost:4000/api/user/updateProfile/${user.user_id}`,
                data, { headers: { "Content-Type": "multipart/form-data", }, }
            );

            setName(res.data.user.user_name);
            setEmail(res.data.user.user_email);
            setPhone(res.data.user.user_phone);
            setAddress(res.data.user.user_address);
            setImage(res.data.user.user_profile);

            setEditMode(false);
            alert("Profile updated");

        } catch (err) {
            console.error(err);
            alert("Update failed");
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
                                    <button className="btn btn-warning mr-1">Profile</button>
                                    <button className="btn btn-danger ml-1">Appointment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-7">
                        <div className="card shadow p-4">

                            {loading && (
                                <h5 className="text-center">Loading profile...</h5>
                            )}

                            {!loading && !editMode && (
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-5 d-flex flex-column align-items-center justify-content-center">
                                            {image ? (
                                                <img src={`http://localhost:4000/uploads/${image}`} alt="Profile"
                                                    className="rounded-circle mt-3 mb-3" style={{ width: "160px", height: "160px", objectFit: "cover" }}
                                                />
                                            ) : (
                                                <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center mt-3 mb-3"
                                                    style={{ width: "120px", height: "120px", fontSize: "36px", fontWeight: "bold" }}
                                                >
                                                    {name?.split(" ").map(word => word[0]).join("").toUpperCase()}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-md-7">
                                            <p><strong>Name:</strong> {name}</p>
                                            <p><strong>Email:</strong> {email}</p>
                                            <p><strong>Phone:</strong> {phone}</p>
                                            <p><strong>Address:</strong> {address}</p>

                                            <button
                                                className="btn btn-primary"
                                                onClick={() => setEditMode(true)}
                                            >
                                                Edit Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!loading && editMode && (
                                <form onSubmit={handleUpdate}>
                                    <div className="mb-3">
                                        <label>Name</label>
                                        <input
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Email</label>
                                        <input
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Phone</label>
                                        <input
                                            className="form-control"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Address</label>
                                        <input
                                            className="form-control"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label>Profile Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>

                                    <button className="btn btn-success me-2 mr-2"> Update </button>

                                    <button type="button" className="btn btn-secondary ml-2" onClick={() => setEditMode(false)}>
                                        Cancel
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
