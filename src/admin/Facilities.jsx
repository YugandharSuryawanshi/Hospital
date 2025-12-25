import React from "react";
// import axios from "axios";

export default function Facilities() {
    return (
        <>
            <div className="container">
                <h1 className="text-center text-danger">* Facilities *</h1>
                <button className="btn btn-danger float-right">Add Facility</button>
            </div><br /><br />

            <div className="container">
                <form action="">
                    <div className="form-group">
                        <label htmlFor="facility">Facility</label>
                        <input type="text" className="form-control" id="facility" placeholder="Enter Facility" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" placeholder="Enter Description" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
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
