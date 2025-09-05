import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Nav from "./Nav.jsx";

const images = [
    "./images/slider1.jpg",
    "./images/slider2.jpg",
    "./images/slider3.jpg",
];

export default function Index() {
    const [index, setIndex] = useState(0);

    const displayTime = 7000;
    const transitionTime = 1000;
    const totalTime = displayTime + transitionTime;

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, totalTime);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <>
            <Nav />
            <div className="container-fluid p-0">
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
                                    src={images[index]}
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
                                {images.map((_, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setIndex(i)}
                                        style={{
                                            height: "10px",
                                            width: "10px",
                                            margin: "0 5px",
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                            backgroundColor:
                                                i === index ? "#000" : "#bbb",
                                            transition:
                                                "background-color 0.3s ease",
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
