import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toastError } from "../utils/toast";
import './Style.css';
import userAxios from "./userAxios";

export default function YourAppointment() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        getAllAppointments();
    }, []);

    // Get all appointments
    const getAllAppointments = async () => {
        try {
            const res = await userAxios.get(`/getMyAppointments`);
            setAppointments(res.data || []);
        } catch {
            toastError("Failed to load appointments");
        }
    };

    // YYYY-MM-DD → DD-MM-YYYY
    const simpleDate = (date) => {
        if (!date) return "";
        const [y, m, d] = date.split("-");
        return `${d}-${m}-${y}`;
    };

    // 24 → 12 hour
    const simpleTime = (time) => {
        if (!time) return "";
        let [hour, minute] = time.split(":");
        hour = parseInt(hour);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${minute} ${ampm}`;
    };

    // Get Payment type
    const getPaymentClass = (status) => {
        if (!status) return "pending";

        status = status.toLowerCase();

        if (status === "paid") return "paid";
        if (status === "failed") return "failed";
        if (status === "pending") return "pending";

        return "pending";
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
                                    <button className="btn btn-warning mr-1">
                                        <NavLink to="/profile" className="text-decoration-none text-white">
                                            Profile
                                        </NavLink>
                                    </button>
                                    <button className="btn btn-danger ml-1">
                                        <NavLink to="/yourAppointment" className="text-decoration-none text-white">
                                            Your Appointments
                                        </NavLink>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container mt-4">
                <div className="p-4 border-0">
                    <h4 className="text-danger mb-3">My Appointments</h4>

                    {appointments.length === 0 ? (
                        <div className="alert alert-warning text-center">
                            No appointments found
                        </div>
                    ) : (
                        <div className="row">
                            {appointments.map((a, i) => (
                                <div key={a.appointment_id} className="col-lg-6 col-md-12 mb-4">

                                    <div className="card appointment-card border-0 shadow h-100"
                                        onClick={() => {
                                            if (!a.bill_id) {
                                                toastError("Bill not generated yet");
                                                return;
                                            }
                                            navigate(`/billPayment/${a.bill_id}`);
                                        }}>
                                        <div className="card-body">

                                            {/* Header */}
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <small className="text-muted">
                                                        Appointment #{i + 1}
                                                    </small>
                                                    <h5 className="mb-1 text-danger fw-bold">
                                                        {a.dr_name}
                                                    </h5>
                                                </div>

                                                <div>
                                                    <small className="text-muted">
                                                        Patient Name
                                                    </small>
                                                    <h5 className="mb-1 text-danger fw-bold">
                                                        {a.user_name}
                                                    </h5>
                                                </div>

                                                <div>
                                                    <small className="text-muted">
                                                        Appointment Status
                                                    </small> <br />
                                                    {a.status === "Pending" && (
                                                        <span className="badge bg-warning text-dark">
                                                            Pending
                                                        </span>
                                                    )}
                                                    {a.status === "Approved" && (
                                                        <span className="badge bg-success">
                                                            Approved
                                                        </span>
                                                    )}
                                                    {a.status === "Cancelled" && (
                                                        <span className="badge bg-danger">
                                                            Rejected
                                                        </span>
                                                    )}
                                                    {a.status === "Complete" && (
                                                        <span className="badge bg-primary">
                                                            Completed
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <hr />

                                            {/* Date & Time */}
                                            <div className="row text-center">
                                                <div className="col-6">
                                                    <div className="bg-light p-2 rounded">
                                                        <small className="text-muted">Date</small>
                                                        <div className="fw-bold">
                                                            {simpleDate(a.appointment_date)}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-6">
                                                    <div className="bg-light p-2 rounded">
                                                        <small className="text-muted">Time</small>
                                                        <div className="fw-bold">
                                                            {simpleTime(a.appointment_time)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="extra-info">
                                                <div>Your Number : <b>{a.token_number || "Not Assigned"}</b></div>
                                                <div>
                                                    Payment :
                                                    <span className={getPaymentClass(a.payment_status)}>
                                                        {a.payment_status || "Pending"}
                                                    </span>
                                                </div>
                                            </div>


                                            {/* hint */}
                                            <div className="mt-3 text-center text-muted small">
                                                Tap to view receipt & payment details
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                    )}
                </div>
            </div>
        </>
    );
}
