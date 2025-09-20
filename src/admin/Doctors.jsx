import React from "react";

export default function Doctors()
{
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
                                <div className="col-md-6">
                                    <input type="text" placeholder="Search Doctors" className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-primary">Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

