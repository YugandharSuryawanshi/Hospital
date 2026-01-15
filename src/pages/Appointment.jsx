import React from "react";
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
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [notes, setNotes] = useState("");
    const [datetime, setDatetime] = useState("");

    useEffect(() => {
        if (!doctor_id) {
            setError("No doctor selected.");
            setLoading(false);
            return;
        }
        let mounted = true;
        axios
            .get("http://localhost:4000/api/admin/getdoctors")
            .then((res) => {
                if (!mounted) return;
                const arr = Array.isArray(res.data) ? res.data : [];
                const found = arr.find((d) => String(d.doctor_id) === String(doctor_id));
                if (found) setDoctor(found);
                else setError("Doctor not found.");
            })
            .catch((err) => {
                console.error("Failed to load doctor:", err);
                setError("Failed to load doctor data.");
            })
            .finally(() => mounted && setLoading(false));
        return () => (mounted = false);
    }, [doctor_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !contact || !datetime) {
            alert("Please fill name, contact and date/time");
            return;
        }

        // convert "YYYY-MM-DDTHH:MM" => "YYYY-MM-DD HH:MM:SS"
        let dt = datetime;
        if (typeof dt === "string" && dt.includes("T")) {
            dt = dt.replace("T", " ");
            if (dt.length === 16) dt = dt + ":00";
        }

        const payload = {
            doctor_id: doctor?.doctor_id ?? null,
            user_name: name,
            user_contact: contact,
            user_email: email || null,
            appointment_datetime: dt,
            notes: notes || null,
        };

        try {
            const res = await axios.post("http://localhost:4000/api/user/addAppointment", payload, {
                headers: { "Content-Type": "application/json" },
            });

            if (res.status !== 201) {
                throw new Error("Failed to create appointment.");
            }
            alert("Appointment request submitted.");

            // Clear form fields
            setName("");
            setContact("");
            setEmail("");
            setNotes("");
            setDatetime("");

            navigate("/doctors");
        } catch (err) {
            console.error("Error creating appointment:", err);
            alert("Failed to create appointment.");
        }
    };

    return (
        <div className="container my-4">
            <button className="btn btn-outline-danger pr-2 pl-2 mb-3" onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-left"></i> Back
            </button>

            {loading ? (
                <div className="alert alert-info">Loading doctor details…</div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <>
                    <div className="card mb-4">
                        <div className="card-body d-flex gap-3 align-items-center">
                            <img
                                src={doctor.dr_photo ? `http://localhost:4000/uploads/${doctor.dr_photo}` : "https://via.placeholder.com/120?text=No+Image"}
                                alt={doctor.dr_name}
                                style={{ width: 120, height: 120, objectFit: "cover", borderRadius: "8px" }}
                                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/120")}
                            />
                            <div className="ml-3">
                                <h3 className="mb-1">{doctor.dr_name}</h3>
                                <h6 className="mb-1">{doctor.dr_certificate}</h6>
                                <p className="mb-1 text-muted">{doctor.dr_position}</p>
                                <p className="mb-0">
                                    <strong>Speciality:</strong> {doctor.dr_speciality || "—"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Make an appointment</h3>
                            <form onSubmit={handleSubmit} className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Patient Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Contact Number</label>
                                    <input type="tel" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} required />
                                </div>

                                <div className="col-md-6 mt-2">
                                    <label className="form-label">Email ID</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div className="col-md-6 mt-2">
                                    <label className="form-label">Preferred Date & Time</label>
                                    <input type="datetime-local" className="form-control" value={datetime} onChange={(e) => setDatetime(e.target.value)} required />
                                </div>

                                <div className="col-12 mt-3">
                                    <label className="form-label">Additional Notes</label>
                                    <textarea className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                                </div>

                                <div className="col-12 m-4">
                                    <button className="btn btn-primary" type="submit">
                                        Request Appointment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
