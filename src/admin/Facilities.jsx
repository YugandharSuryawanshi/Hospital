import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Facilities() {

    const [facilities, setFacilities] = useState([]);
    const [facility_id, setId] = useState("");
    const [facility_name, setName] = useState("");
    const [facility_desc, setFacility_desc] = useState("");
    const [facility_image, setFacility_image] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("facility_id", facility_id);
        formData.append("facility_name", facility_name);
        formData.append("facility_desc", facility_desc);
        formData.append("facility_image", facility_image);

        const token = localStorage.getItem("adminToken");


        const payload = {
            facility_id: facility_id,
            facility_name: facility_name,
            facility_desc: facility_desc,
        };
        console.log(facility_name);
        console.log(facility_desc);
        console.log(facility_image);



        try {
            const res = await axios.post("http://localhost:5000/api/admin/addFacility", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status !== 201) {
                throw new Error("Failed to create appointment.");
            }

            alert("Facility added successfully!");
            setImage(null);
            e.target.reset();
        } catch (err) {
            console.error(err);
            alert("Error adding facility");
        }

    }

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/admin/facilities")
            .then((res) => setFacilities(res.data))
            .catch((err) => console.error("Error fetching appointments", err));
    }, []);

    // if (facilities.length === 0) {
    //     return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
    //         <span className="visually-hidden mr-3">Loading... </span>
    //         <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
    //         </div>
    //     </div>;
    // }

    return (
        <>
            <div className="container">
                <h1 className="text-center text-danger">* Facilities *</h1>
                <button className="btn badge-warning float-right ml-2">Show Facilities</button>
                <button className="btn btn-danger float-right">Add Facility</button>
            </div><br /><br />

            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 text-center align-content-center">
                        <form onSubmit={handleSubmit}>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <label className="form-label">Facility Name</label>
                                        <input type="text" className="form-control" value={facility_name} onChange={(e) => setName(e.target.value)} required placeholder="Enter Facility" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label className="form-label">Description</label>
                                        <input type="text" className="form-control" value={facility_desc} onChange={(e) => setFacility_desc(e.target.value)} id="description" placeholder="Enter Description" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label className="form-label">Facility Image</label>
                                        <input type="file" className="form-control" id="image" placeholder="Upload Image" onChange={(e) => setFacility_image(e.target.files[0])} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-danger mb-4">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Cashless Facilities</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
