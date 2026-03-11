import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../utils/toast";
import userAxios from "./userAxios";

export default function GetAppointment() {

    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentMode, setPaymentMode] = useState("offline");

    const [formData, setFormData] = useState({
        doctor_id: "",
        user_name: "",
        user_contact: "",
        user_email: "",
        appointment_date: "",
        appointment_time: "",
        user_address: "",
        notes: "",
    });

    // Fetch doctors
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        userAxios.get("/getdoctors").then((res) => {
                setDoctors(res.data);
            })
            .catch(() => toastError("Failed to load doctors"))
            .finally(() => setLoading(false));
    }, [navigate]);

    // Handle Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // When doctor change set selectedDoctor
        if (name === "doctor_id") {
            const found = doctors.find(
                d => String(d.doctor_id) === String(value)
            );
            setSelectedDoctor(found || null);
        }
    };

    // Handle Submit.
    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            doctor_id,
            user_name,
            user_contact,
            appointment_date,
            appointment_time
        } = formData;

        if (!doctor_id || !user_name || !user_contact || !appointment_date || !appointment_time) {
            toastError("Please fill all required fields.");
            return;
        }

        try {
            const payload = {
                ...formData,
                paymentMode
            };
            const res = await userAxios.post("/addAppointment",payload,{
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res.status === 409) {
                toastError(res.data.message + " Try another time slot.");
                return;
            }

            const { bill_id, token_number } = res.data;
            toastSuccess(res.data.message + " Your number is :- " + token_number);

            if (paymentMode === "online") {
                navigate(`/billPayment/${bill_id}`);
            } else {
                navigate("/yourAppointment");
            }

        } catch (error) {
            console.log("BOOK APPOINTMENT ERROR =>", error);
            toastError(error?.response?.data?.message || "Booking failed");
        }
    };

    if (loading) return <div className="alert alert-info">Loading...</div>;

    return (
        <div className="container my-4">

            <h2 className="text-center text-danger mb-4">
                Book Your Appointment
            </h2>

            <form onSubmit={handleSubmit} className="card p-4 shadow">

                {/* Select Doctor */}
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6 mt-4 mb-2">
                            <label>Select Doctor *</label>
                            <select className="form-control" name="doctor_id"
                                value={formData.doctor_id} onChange={handleChange} required>
                                <option value="">-- Select Doctor --</option>
                                {doctors.map(doc => (
                                    <option key={doc.doctor_id} value={doc.doctor_id}>
                                        {doc.dr_name} ({doc.dr_speciality})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Show Doctor Details */}
                        {selectedDoctor && (
                            <div className="col-md-6">
                                <div className="card mb-1 p-0 text-center">
                                    <div className="card-body d-flex align-items-center">
                                        <img src={`http://localhost:4000/uploads/${selectedDoctor.dr_photo}`}
                                            alt={selectedDoctor.dr_name}
                                            style={{ width: 80, height: 80, borderRadius: "50%" }}/>
                                        <div className="ml-3">
                                            <h5>{selectedDoctor.dr_name}</h5>
                                            <p className="mb-1">{selectedDoctor.dr_position}</p>
                                            <small>{selectedDoctor.dr_speciality}</small>
                                            <strong> Fees: ₹{selectedDoctor.dr_fee}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* User Details */}
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

                {/* Date time */}
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

                    {/* Payment Mode */}
                    <div className="col-md-4 mb-3 mt-4 text-center">
                        <label>Payment Mode</label><br />
                        <input
                            type="radio"
                            value="offline"
                            checked={paymentMode === "offline"}
                            onChange={(e) => setPaymentMode(e.target.value)}
                        /> Pay Offline

                        <input
                            type="radio"
                            className="ms-3 ml-2"
                            value="online"
                            checked={paymentMode === "online"}
                            onChange={(e) => setPaymentMode(e.target.value)}
                        /> Pay Online
                    </div>

                    <div className="col-md-8 mb-3 mt-2">
                        <label>Notes</label>
                        <textarea
                            className="form-control"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button className="btn btn-danger w-100">
                    Book Appointment
                </button>
            </form>

            <p className="text-center text-danger mt-3">
                Note:- Reach Hospital Before 30 minutes of Appointment Time.
            </p>

        </div>
    );
}