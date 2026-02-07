import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Facilities from "./Facilities";


export default function Index() {
    const [index, setIndex] = useState(0);
    const displayTime = 8000;
    const transitionTime = 1000;
    const totalTime = displayTime + transitionTime;

    const [slides, setSlides] = useState([]);

    const navigate = useNavigate();
    const [drdata, setDrdata] = useState([]);
    const [loading, setLoading] = useState(true);

    const URL = 'http://localhost:4000/api/user';
    const imgUrl = 'http://localhost:4000'; //here are not use uploads

    // Load/fetch Slides / doctors
    useEffect(() => {
        axios
            .get(`${URL}/slides`)
            .then((res) => setSlides(res.data))
            .catch((err) => console.error("Error fetching slides", err));

            let mounted = true;
        axios
            .get(`${URL}/getSomeDoctors`)
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

    // Navigate to appointment page with doctor ID
    const handleAppointmentClick = (doctor_id) => {
        navigate(`/appointment?doctor_id=${encodeURIComponent(doctor_id)}`);
    };

    // Specially for slides
    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, totalTime);
        return () => clearInterval(timer);
    }, [slides, totalTime]);

    // Go next Slide
    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % slides.length);
    };

    // came previous slide
    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // If no slides available
    if (slides.length === 0) {
        return (
            <div className="container text-center py-5">
                <h3>No slides available</h3>
            </div>
        );
    }

    return (
        <div className="container-fluid p-0">
            {/* Slider Section */}
            <div className="row m-0">
                <div className="col-12 p-0">
                    <div
                        className="position-relative d-flex justify-content-center align-items-center"
                        style={{
                            width: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={index}
                                src={`${imgUrl}/${slides[index].slide_image}`}
                                alt="slider"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{
                                    duration: transitionTime / 1000,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "cover",
                                    position: "relative",
                                }}
                            />
                        </AnimatePresence>

                        <button
                            onClick={prevSlide}
                            className="btn btn-dark position-absolute"
                            style={{
                                top: "50%",
                                left: "10px",
                                transform: "translateY(-50%)",
                                borderRadius: "50%",
                                opacity: 0.7,
                                zIndex: 2,
                            }}
                        >
                            ❮
                        </button>

                        <button
                            onClick={nextSlide}
                            className="btn btn-dark position-absolute"
                            style={{
                                top: "50%",
                                right: "10px",
                                transform: "translateY(-50%)",
                                borderRadius: "50%",
                                opacity: 0.7,
                                zIndex: 2,
                            }}
                        >
                            ❯
                        </button>

                        <div
                            className="position-absolute w-100 d-flex justify-content-center"
                            style={{ bottom: "12px", zIndex: 2 }}
                        >
                            {slides.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    style={{
                                        height: "10px",
                                        width: "10px",
                                        margin: "0 5px",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        backgroundColor: i === index ? "#000" : "#bbb",
                                        transition: "background-color 0.3s ease",
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Doctors */}
            <section>
                <h1 className="text-center font-weight-bold text-danger mt-3">Our Doctors</h1>
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
                                                            ? `${imgUrl}/uploads/${item.dr_photo}`
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

            {/* Facilities */}
            <Facilities />
        </div>
    );
}
