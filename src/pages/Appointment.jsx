import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Appointment() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const doctor_id = searchParams.get("doctor_id");

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        user_name: "",
        user_contact: "",
        user_email: "",
        user_address: "",
        appointment_date: "",
        appointment_time: "",
        notes: "",
    });

    // Doctor fetch
    useEffect(() => {
        const token = localStorage.getItem("userToken");

        if (!token) {
            navigate("/login", {
                replace: true,
                state: { from: window.location.pathname + window.location.search },
            });
            return;
        }

        if (!doctor_id) {
            setError("No doctor selected.");
            setLoading(false);
            return;
        }

        axios
            .get("http://localhost:4000/api/user/getdoctors")
            .then((res) => {
                const found = res.data.find(
                    (d) => String(d.doctor_id) === String(doctor_id)
                );
                if (found) setDoctor(found);
                else setError("Doctor not found.");
            })
            .catch(() => setError("Failed to load doctor data."))
            .finally(() => setLoading(false));
    }, [doctor_id, navigate]);

    /* 📝 INPUT HANDLER */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /* 🚀 SUBMIT */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("userToken");
        console.log('Came Token is :- '+token);
        const {
            user_name,
            user_contact,
            appointment_date,
            appointment_time,
        } = formData;

        if (!user_name || !user_contact || !appointment_date || !appointment_time) {
            alert("Please fill all required fields.");
            return;
        }

        const payload = {
            doctor_id,
            ...formData
        };

        try {
            const res = await axios.post(
                "http://localhost:4000/api/user/addAppointment",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            alert(res.data.message);
            navigate("/doctors");

        } catch (err) {
            if (err.response?.status === 409) {
                alert(err.response.data.message);
            } else {
                alert("Unable to book appointment. Please try again.");
            }
        }
    };
    /* 🧾 UI */
    if (loading) return <div className="alert alert-info">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container my-4">
            <button className="btn btn-outline-danger mb-3" onClick={() => navigate(-1)}>
                ← Back
            </button>

            {/* DOCTOR CARD */}
            <div className="card mb-4">
                <div className="card-body d-flex align-items-center">
                    <img
                        src={`http://localhost:4000/uploads/${doctor.dr_photo}`}
                        alt={doctor.dr_name}
                        style={{ width: 100, height: 100, borderRadius: "50%" }}
                    />
                    <div className="ml-3">
                        <h4>{doctor.dr_name}</h4>
                        <p className="mb-1">{doctor.dr_position}</p>
                        <small>{doctor.dr_speciality}</small>
                    </div>
                </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label>Full Name *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label>Mobile *</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="user_contact"
                            value={formData.user_contact}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="user_email"
                            value={formData.user_email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label>Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="user_address"
                            value={formData.user_address}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label>Date *</label>
                        <input
                            type="date"
                            className="form-control"
                            name="appointment_date"
                            value={formData.appointment_date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label>Time *</label>
                        <input
                            type="time"
                            className="form-control"
                            name="appointment_time"
                            value={formData.appointment_time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label>Notes</label>
                    <textarea
                        className="form-control"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>

                <button className="btn btn-danger w-100">
                    Book Appointment
                </button>
            </form>
        </div>
    );
}