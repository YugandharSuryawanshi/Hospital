// src/user/GetAppointment.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../utils/toast";
import userAxios from "./userAxios";

export default function GetAppointment() {
    const [doctors, setDoctors] = useState([]);
    const [paymentMode, setPaymentMode] = useState("offline");
    const navigate = useNavigate();
    const URL = "http://localhost:4000/api/user";

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
            const res = await axios.get(`${URL}/getdoctors`);
            setDoctors(res.data);
        } catch (err) {
            console.error(err);
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
        const patient_id = JSON.parse(localStorage.getItem("userUser"));
        console.log(patient_id.user_id);
        

        const token = localStorage.getItem("userToken");
        if (!token) {
            toastError("Session expired, login again");
            navigate("/login");
            return;
        }

        if (!formData.user_name || !formData.user_contact || !formData.doctor_id) {
            toastError("Please fill required fields");
            return;
        }

        const appointmentPayload = {
            ...formData
        };

        try {
            // ==========================
            // OFFLINE FLOW
            // ==========================
            if (paymentMode === "offline") {
                const res = await userAxios.post("/addAppointment", {
                    ...appointmentPayload,
                    payment_mode: "offline"
                });

                alert(`Token Number: ${res.data.token_number}`);
                toastSuccess(res.data.message);
                navigate("/");
                return;
            }

            // ==========================
            // ONLINE FLOW
            // ==========================
            const orderRes = await axios.post("http://localhost:4000/api/payments/create-order", {
                doctor_id: formData.doctor_id, patient_id : patient_id.user_id
            });

            const options = {
                key: orderRes.data.key,
                amount: orderRes.data.order.amount,
                currency: "INR",
                order_id: orderRes.data.order.id,

                handler: async function (response) {
                    const verifyRes = await userAxios.post("http://localhost:4000/api/payments/verify-payment", {
                        ...response,
                        appointmentData: appointmentPayload,
                        bill_id: orderRes.data.bill_id
                    });

                    alert(`Token Number: ${verifyRes.data.token_number}`);
                    toastSuccess("Appointment Confirmed");
                    navigate("/");
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error(err);
            toastError("Booking failed");
        }
    };

    return (
        <>
            <h1 className="text-center text-danger mb-4">Book Appointment</h1>

            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        <form onSubmit={handleSubmit} className="card p-4 shadow">

                            {/* ROW 1 */}
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label>Full Name *</label>
                                    <input type="text" className="form-control"
                                        name="user_name"
                                        value={formData.user_name}
                                        onChange={handleChange} required />
                                </div>

                                <div className="col-md-6">
                                    <label>Mobile Number *</label>
                                    <input type="tel" className="form-control"
                                        name="user_contact"
                                        value={formData.user_contact}
                                        onChange={handleChange} required />
                                </div>
                            </div>

                            {/* ROW 2 */}
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label>Email</label>
                                    <input type="email" className="form-control"
                                        name="user_email"
                                        value={formData.user_email}
                                        onChange={handleChange} />
                                </div>

                                <div className="col-md-6">
                                    <label>Address</label>
                                    <input type="text" className="form-control"
                                        name="user_address"
                                        value={formData.user_address}
                                        onChange={handleChange} />
                                </div>
                            </div>

                            {/* DOCTOR */}
                            <div className="mb-3">
                                <label>Select Doctor *</label>
                                <select className="form-control"
                                    name="doctor_id"
                                    value={formData.doctor_id}
                                    onChange={handleChange} required>
                                    <option value="">-- Select Doctor --</option>
                                    {doctors.map((doc) => (
                                        <option key={doc.doctor_id} value={doc.doctor_id}>
                                            Dr. {doc.dr_name} ({doc.dr_speciality})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* DATE TIME */}
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label>Appointment Date *</label>
                                    <input type="date" className="form-control"
                                        name="appointment_date"
                                        value={formData.appointment_date}
                                        onChange={handleChange} required />
                                </div>

                                <div className="col-md-6">
                                    <label>Appointment Time *</label>
                                    <input type="time" className="form-control"
                                        name="appointment_time"
                                        value={formData.appointment_time}
                                        onChange={handleChange} required />
                                </div>
                            </div>

                            {/* PAYMENT */}
                            <div className="mb-3 text-center">
                                <label>Payment Mode</label><br />
                                <input type="radio" value="offline"
                                    checked={paymentMode === "offline"}
                                    onChange={(e) => setPaymentMode(e.target.value)}
                                /> Offline

                                <input type="radio" className="ms-3" value="online"
                                    checked={paymentMode === "online"}
                                    onChange={(e) => setPaymentMode(e.target.value)}
                                /> Online
                            </div>

                            {/* NOTES */}
                            <div className="mb-3">
                                <label>Notes</label>
                                <textarea className="form-control"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange} />
                            </div>

                            <button className="btn btn-danger w-100">
                                Book Appointment
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
