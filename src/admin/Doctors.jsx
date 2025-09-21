import React, { useEffect, useState } from "react";

export default function Doctors() {
    const [drname, setDrname] = useState();
    const [dr_certificate, setDr_certificate] = useState();
    const [dr_photo, setDr_photo] = useState();
    const [dr_position, setDr_position] = useState();
    const [dr_speciality, setDr_speciality] = useState();
    const [dr_contact, setDr_contact] = useState();
    const [dr_email, setDr_email] = useState();
    const [dr_address, setDr_address] = useState();
    useEffect(() => {
        console.log(drname);
    })
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0 ">
                        <h1 className="ml-5 mt-5">All Doctors</h1>
                        <ul>
                            <li className="d-inline-block ml-3">Home</li>
                            <li className="d-inline-block ml-3"><i class="fa-solid fa-chevron-right"></i></li>
                            <li className="d-inline-block ml-3">Doctors</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <form>
                            <div className="row">
                                <div className="col-md-6"></div>
                                <div className="col-md-4">
                                    <input type="text" placeholder="Search Doctors" className="form-control" onKeyUp={(e) => setDrname(e.target.value)} />
                                </div>
                                <div className="col-md-2">
                                    <button type="submit" className="btn btn-warning">Search</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}

