import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function GetAppointment() {
    const [doctors, setDoctors] = useState([]);

    const [formData, setFormData] = useState({
        doctor_id: "",
        user_name: "",
        user_contact: "",
        user_email: "",
        user_address: "",
        appointment_date: "",
        appointment_time: "",
        notes: "",
    });

    /* GET DOCTORS */
    const getDoctors = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/user/getdoctors");
            setDoctors(res.data);
        } catch (err) {
            console.error("Error fetching doctors", err);
        }
    };

    useEffect(() => {
        getDoctors();
    }, []);

    /* HANDLE CHANGE */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /* SUBMIT */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("userToken");
        if (!token) {
            alert("Session expired, please log in again.");
            Navigate("/login");
            return;
        }

        if (!formData.user_name || !formData.user_contact || !formData.doctor_id) {
            alert("Please fill required fields");
            return;
        }

        const payload = {
            doctor_id: formData.doctor_id,
            user_name: formData.user_name,
            user_contact: formData.user_contact,
            user_email: formData.user_email,
            user_address: formData.user_address,
            appointment_date: formData.appointment_date,
            appointment_time: formData.appointment_time,
            appointment_datetime: `${formData.appointment_date}T${formData.appointment_time}`,
            notes: formData.notes,
        };

        try {
            const res = await axios.post("http://localhost:4000/api/user/addAppointment", payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );
            alert(res.data.message);
            setFormData({
                doctor_id: "",
                user_name: "",
                user_contact: "",
                user_email: "",
                user_address: "",
                appointment_date: "",
                appointment_time: "",
                appointment_datetime: "",
                notes: "",
            });
        } catch (err) {
            console.error(err);
            alert("Failed to book Appointment Try Later..!");
        }
    };

    return (
        <>
            <h1 className="text-center text-danger mb-4">Book Appointment</h1>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <form onSubmit={handleSubmit} className="card p-4 shadow">

                            {/* ROW 1 */}
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
                                    <label>Mobile Number *</label>
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

                            {/* ROW 2 */}
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

                            {/* DOCTOR */}
                            <div className="mb-3">
                                <label>Select Doctor *</label>
                                <select
                                    className="form-control"
                                    name="doctor_id"
                                    value={formData.doctor_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">-- Select Doctor --</option>
                                    {doctors.map((doc) => (
                                        <option key={doc.doctor_id} value={doc.doctor_id}>
                                            Dr. {doc.dr_name} ({doc.dr_speciality})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* ROW 3 */}
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label>Appointment Date *</label>
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
                                    <label>
                                        Appointment Time * <small>(24-hour format)</small>
                                    </label>
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

                            {/* NOTES */}
                            <div className="mb-3">
                                <label>Symptoms / Notes</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-danger w-100">
                                Book Appointment
                            </button>

                        </form>
                    </div>
                </div>
                <br />
                <p className="text-center text-danger">Note:- Reach Hospital Before 30 minutes of Appointment Time.</p>
            </div>
            <br /><br />
        </>
    );
}
