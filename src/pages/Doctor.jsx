import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";

export default function Doctor() {
    const navigate = useNavigate();
    const [drdata, setDrdata] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        axios
            .get("http://localhost:4000/api/user/getdoctors")
            .then((res) => {
                if (mounted) setDrdata(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => {
                console.error("Error fetching doctors:", err);
                if (mounted) setDrdata([]);
            })
            .finally(() => mounted && setLoading(false));
        return () => (mounted = false);
    }, []);

    const handleAppointmentClick = (doctor_id) => {
        // use query param (encoded)
        navigate(`/appointment?doctor_id=${encodeURIComponent(doctor_id)}`);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0 doctor_page_banner">
                        <h1 className="ml-5 mt-5">All Doctors</h1>
                        <ul>
                            <li className="d-inline-block ml-3">Home</li>
                            <li className="d-inline-block ml-3">
                                <i className="fa-solid fa-chevron-right"></i>
                            </li>
                            <li className="d-inline-block ml-3">Doctors</li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="bg-light">
                <div className="container mt-5 pb-5">
                    {loading ? (
                        <div className="text-center py-5">Loading doctors...</div>
                    ) : drdata.length === 0 ? (
                        <div className="alert alert-warning">No doctors found.</div>
                    ) : (
                        <div className="row">
                            {drdata.map((item) => (
                                <div className="col-md-6 mt-2" key={item.doctor_id}>
                                    <div className="card card-body">
                                        <div className="row align-items-center">
                                            <div className="col-4">
                                                <img
                                                    src={
                                                        item.dr_photo
                                                            ? `http://localhost:4000/uploads/${item.dr_photo}`
                                                            : "https://via.placeholder.com/150?text=No+Image"
                                                    }
                                                    alt={item.dr_name || "Doctor"}
                                                    className="doctor_img rounded-circle w-100"
                                                    onError={(e) => {
                                                        e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image";
                                                    }}
                                                />
                                            </div>

                                            <div className="col-8">
                                                <h3 className="mb-0">{item.dr_name || "—"}</h3>
                                                <p className="mb-1 text-muted">{item.dr_position || "—"}</p>
                                                <h6 className="mb-2 text-secondary">{item.dr_certificate}</h6>

                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-outline-primary btn-sm mr-2">
                                                        View Profile
                                                    </button>
                                                    <button className="btn btn-primary btn-sm"
                                                        onClick={() => handleAppointmentClick(item.doctor_id)}>
                                                        Make An Appointment
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}