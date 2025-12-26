import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Facilities() {

    const [facilities, setFacilities] = useState([]);

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
                <button className="btn btn-danger float-right">Add Facility</button>
            </div><br /><br />

            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <form action="" className="text-center">
                            <div className="form-group">
                                <input type="text" className="form-control" id="facility" placeholder="Enter Facility" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" id="description" placeholder="Enter Description" />
                            </div>
                            <button type="submit" className="btn btn-danger mb-4">Add</button>
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
