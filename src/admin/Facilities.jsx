import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Facilities() {

    const [facilities, setFacilities] = useState([]);
    const [activeView, setActiveView] = useState("list");

    const [facility_name, setName] = useState("");
    const [facility_desc, setFacility_desc] = useState("");
    const [facility_image, setFacility_image] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("facility_name", facility_name);
        formData.append("facility_desc", facility_desc);
        formData.append("facility_image", facility_image);

        const token = localStorage.getItem("adminToken");

        // const payload = {
        //     facility_id: facility_id,
        //     facility_name: facility_name,
        //     facility_desc: facility_desc,
        // };


        try {
            const res = await axios.post("http://localhost:5000/api/admin/addFacility", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(res.data.message);
            setFacility_image(null);
            e.target.reset();
        } catch (err) {
            console.error(err);
            alert("Error adding facility");
        }

    }

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/admin/getAllFacilities")
            .then((res) => setFacilities(res.data))
            .catch((err) => console.error("Error fetching appointments", err));
    }, []);

    const handleFacility = (facility_id) => {
        const token = localStorage.getItem("adminToken");
        axios
            .delete(`http://localhost:5000/api/admin/deleteFacility/${facility_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                alert(res.data.message);
                setFacilities(facilities.filter((facility) => facility.facility_id !== facility_id));
            })
            .catch((err) => console.error("Error deleting facility", err));
    };

    // facility option show hide
    const [showFacilities, setShowFacilities] = useState(false);
    const handleShowFacilities = () => {
        setShowFacilities(!showFacilities);
    };


    if (facilities.length === 0) {
        return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <span className="visually-hidden mr-3">Loading... </span>
            <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
            </div>
        </div>;
    }

    return (
        <>
            <div className="container">
                <h1 className="text-center text-danger">* Facilities *</h1>

                <button className="btn badge-warning float-right ml-2" onClick={() => setActiveView("list")}>
                    Show Facilities
                </button>

                <button className="btn btn-danger float-right" onClick={() => setActiveView("add")}>
                    Add Facility
                </button>
            </div>

            <br /><br />

            {activeView === "add" &&
                <div className="container card border-0">
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
            }


            {activeView === "list" && (
                <div className="container-fluid">
                    <div className="row">
                        {facilities.map((item) => (
                            <div className="col-md-4 m-3">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{item.facility_name}</h5>
                                        <p className="card-text" style={{ height: "100px" }}>{item.facility_desc}</p>
                                        <img src={
                                            item.facility_image
                                                ? `http://localhost:5000/uploads/${item.facility_image}`
                                                : "https://via.placeholder.com/150?text=No+Image"
                                        } alt="" className="" style={{ height: "auto", width: "50%" }} /><br></br>
                                        <a onClick={() => { handleFacility(item.facility_id) }} className="btn btn-danger"> <i className="fa fa-trash"></i> Delete </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}