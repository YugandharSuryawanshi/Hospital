import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toastError, toastSuccess } from "../utils/toast";
import adminAxios from "./adminAxios";

export default function SlidesList() {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        adminAxios.get("/slides")
            .then((res) => setSlides(res.data))
            .catch((err) => console.error("Error fetching slides", err));
    }, []);

    if (slides.length === 0) {
        return <div>Loading...</div>;
    }

    const deleteSlide = async (id) => {
        if (window.confirm("Are you sure you want to delete this slide?")) {
            try {
                await adminAxios.delete(`/slides/${id}`);
                toastSuccess("Slide deleted successfully");
                setSlides((prev) => prev.filter((s) => s.slide_id !== id));
            } catch (err) {
                console.error(err);
                toastError("Error deleting slide");
            }
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <h1 className="ml-5 mt-5">Slides List</h1>
                        <ul>
                            <li className="d-inline-block ml-3">Home</li>
                            <li className="d-inline-block ml-3">
                                <i className="fa-solid fa-chevron-right"></i>
                            </li>
                            <li className="d-inline-block ml-3">Slides List</li>
                        </ul>
                    </div>
                    <div className="col-md-8"></div>
                    <div className="col-md-4">
                        <div className="d-flex justify-content-end">
                            <NavLink to="/admin/slides" className="btn btn-warning">
                                <i className="fa-solid fa-plus"></i>Add Slide
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-4">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark text-center">
                            <tr>
                                <th scope="col">Sr. No.</th>
                                <th scope="col">Slide Image</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {slides.length > 0 ? (
                                slides.map((slide, index) => (
                                    <tr key={slide.slide_id}>
                                        <td className="col-md-1">{index + 1}</td>
                                        <td className="col-md-4 text-center">
                                            <img
                                                src={`http://localhost:4000/${slide.slide_image}`}
                                                alt="Slide"
                                                style={{ width: "150px", height: "auto" }}
                                            />
                                        </td>
                                        <td className="col-md-2 text-center">
                                            <p>{slide.created_at.split("T")[0]}</p>
                                        </td>
                                        <td className="col-md-3 text-center">
                                            <button className="btn btn-danger btn-sm m-2"
                                                onClick={() => deleteSlide(slide.slide_id)}>
                                                <i className="fa-solid fa-trash"></i>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        No slides Available...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
