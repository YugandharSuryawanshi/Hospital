import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toastError, toastSuccess } from "../utils/toast";
import userAxios from "./userAxios";

export default function Appointment() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const doctor_id = searchParams.get("doctor_id");
    const [paymentMode, setPaymentMode] = useState("offline");
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        user_name: "",
        user_contact: "",
        user_email: "",
        appointment_date: "",
        appointment_time: "",
        user_address: "",
        notes: "",
    });

    // Fetch Doctor
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
            setError("Not Any One Doctor Selected.");
            setLoading(false);
            return;
        }

        userAxios.get("/getdoctors").then((res) => {
            const found = res.data.find(
                (d) => String(d.doctor_id) === String(doctor_id)
            );
            if (found) {
                setDoctor(found);
            }
            else setError("Doctor not found Try later.");
        })
            .catch(() => setError("Failed to load doctor data."))
            .finally(() => setLoading(false));
    }, [doctor_id, navigate]);

    // Handle Change of input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            user_name,
            user_contact,
            appointment_date,
            appointment_time,
        } = formData;

        if (!user_name || !user_contact || !appointment_date || !appointment_time) {
            toastError("Please fill all required fields.");
            return;
        }

        try {
            const payload = { doctor_id, ...formData, paymentMode };
            const res = await userAxios.post("/addAppointment", payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.status === 409) {
                toastError(res.data.message);
            }
            const { bill_id, token_number, paymentMode: responsePaymentMode } = res.data;
            toastSuccess(res.data.message+'Your number is :- '+token_number);
            if (paymentMode === "online") {
                navigate(`/billPayment/${bill_id}`);
            } else {
                navigate("/yourAppointment");
            }
        } catch (error) {
            console.log("BOOK APPOINTMENT ERROR =>", error);
        }
    };

    // User Interface
    if (loading) return <div className="alert alert-info">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container my-4">
            <button className="btn btn-outline-danger mb-3" onClick={() => navigate(-1)}>
                ← Back
            </button>

            {/* Doctor Card */}
            <div className="card mb-4">
                <div className="card-body d-flex align-items-center">
                    <img src={`http://localhost:4000/uploads/${doctor.dr_photo}`} alt={doctor.dr_name}
                        style={{ width: 100, height: 100, borderRadius: "50%" }} />
                    <div className="ml-3">
                        <h4>{doctor.dr_name}</h4>
                        <p className="mb-1">{doctor.dr_position}</p>
                        <small>{doctor.dr_speciality}</small>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label>Full Name *</label>
                        <input type="text" className="form-control" name="user_name" value={formData.user_name}
                            onChange={handleChange} required />
                    </div>

                    <div className="col-md-6">
                        <label>Mobile *</label>
                        <input type="tel" className="form-control" name="user_contact" value={formData.user_contact}
                            onChange={handleChange} required />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label>Email</label>
                        <input type="email" className="form-control" name="user_email" value={formData.user_email}
                            onChange={handleChange} />
                    </div>

                    <div className="col-md-6">
                        <label>Address</label>
                        <input type="text" className="form-control" name="user_address" value={formData.user_address}
                            onChange={handleChange} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label>Date *</label>
                        <input type="date" className="form-control" name="appointment_date" value={formData.appointment_date}
                            onChange={handleChange} required />
                    </div>

                    <div className="col-md-6">
                        <label>Time *</label>
                        <input type="time" className="form-control" name="appointment_time" value={formData.appointment_time}
                            onChange={handleChange} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <div className="mb-3 text-center">
                            <label className="form-label">Payment Mode</label>
                            <div className="">
                                <input type="radio" value="offline"
                                    checked={paymentMode === "offline"}
                                    onChange={(e) => setPaymentMode(e.target.value)}
                                /> Pay Offline

                                <input type="radio" className="ms-3 ml-3" value="online"
                                    checked={paymentMode === "online"}
                                    onChange={(e) => setPaymentMode(e.target.value)}
                                /> Pay Online
                            </div>
                            <label className="form-label">Doctor Fees </label>
                            <span className="form-label" name="dr_fee" value={doctor.dr_fee}> Rs.{doctor.dr_fee}</span>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="mb-3">
                            <label>Notes / Symptoms </label>
                            <textarea className="form-control" name="notes" value={formData.notes}
                                onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <button className="btn btn-danger w-100"> Book Appointment </button>
            </form>
            <br /><br />
            <p className="text-center text-danger">Note:- Reach Hospital Before 30 minutes of Appointment Time.</p>
        </div>
    );
}
