import React, { useState } from "react";
import axios from "axios";

export default function Slides() {
    const [image, setImage] = useState(null);

    // handle form submit
    const addSlide = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please select an image first");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("slideImage", image); // must match upload.single("slideImage")

            const token = localStorage.getItem("adminToken");

            const res = await axios.post("http://localhost:5000/api/admin/slides", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, // add token if route protected
                },
            });

            alert("Slide added successfully!");
            setImage(null);
            e.target.reset();
            console.log("Server response:", res.data);
        } catch (err) {
            console.error(err);
            alert("Error uploading slide");
        }
    };


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <h1 className="ml-4 mt-4">Slides</h1>
                        <ul>
                            <li className="d-inline-block ml-3">Home</li>
                            <li className="d-inline-block ml-3">
                                <i className="fa-solid fa-chevron-right"></i>
                            </li>
                            <li className="d-inline-block ml-3">Slides</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 p-0">
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-8">
                                <form onSubmit={addSlide}>
                                    <div className=" col-md-4 mb-4 text-center">
                                        <label className="form-label fw-semibold">Add Slide Image:</label>
                                        <input
                                            type="file"
                                            className="form-control form-control-lg"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <button type="submit" className="btn btn-warning btn-lg shadow-sm register-btn">
                                            Add Slide
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
