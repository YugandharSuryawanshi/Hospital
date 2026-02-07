import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import adminAxios from "./adminAxios";


export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem("adminUser") || "null");
    const [counts, setCounts] = useState({
        users: 0,
        slides: 0,
        doctors: 0,
        appointments: 0,
        facilities: 0,
        departments: 0
    });



    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        fetchDashboardCounts();
    }, []);


    const fetchDashboardCounts = async () => {
        try {
            const res = await adminAxios.get("/dashboard-counts");
            setCounts(res.data.data);

        } catch (error) {
            console.error("Dashboard error:", error);
        }
    };



    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <div className="card bg-white border-0">
                            <div className="card-header bg-white border-0">
                                <h1 className=" font-weight-bolder text-danger font-italic ">* Dashboard *</h1>
                                <h3 className="font-weight-bold text-left ">Welcome{user ? `, ${user.user_name}` : ""}..</h3>
                                <h5 className="text-muted " >Manage your application efficiently. Access details, View information and Update from here..</h5>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">

                    <div className="col-md-4 text-center mt-4">
                        <div className="card">
                            <div className="card-header bg-white border-0">
                                <h1><i className="fa fa-users text-danger"></i></h1>
                                <h3 className=" font-weight-bolder text-danger">
                                    Manage Patients </h3>
                                <h6 className="text-muted">Add, Update Or Remove</h6>
                                <p className=' font-weight-bold text-dark '>Total Patients : {counts.users}</p>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-danger">
                                    <NavLink className='text-decoration-none text-dark font-weight-bold' to="/admin/patients">Go To Patients</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 text-center mt-4">
                        <div className="card">
                            <div className="card-header bg-white border-0">
                                <h1><i className="fa fa-sliders text-warning"></i></h1>
                                <h3 className=" font-weight-bolder text-warning">
                                    Manage Slides </h3>
                                <h6 className="text-muted">Add, Update Or Remove</h6>
                                <p className=' font-weight-bold text-dark '>Total Slides : {counts.slides} </p>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-warning">
                                    <NavLink className='text-decoration-none text-dark font-weight-bold' to="/admin/slides">Go To Slides</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 text-center mt-4">
                        <div className="card">
                            <div className="card-header bg-white border-0">
                                <h1><i className="fa fa-user-md text-primary"></i></h1>
                                <h3 className=" font-weight-bolder text-primary">
                                    Manage Doctors</h3>
                                <h6 className="text-muted">Add, Update Or Remove</h6>
                                <p className=' font-weight-bold text-dark '>Total Doctors : {counts.doctors} </p>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-primary">
                                    <NavLink className='text-decoration-none text-dark font-weight-bold' to="/admin/doctors">Go To Doctors</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 text-center mt-4">
                        <div className="card">
                            <div className="card-header bg-white border-0">
                                <h1><i className="fa fa-calendar-check text-info"></i></h1>
                                <h3 className=" font-weight-bolder text-info">
                                    Manage Appointments</h3>
                                <h6 className="text-muted">Add, Update Or Remove</h6>
                                <p className=' font-weight-bold text-dark '>Total Appointments : {counts.appointments} </p>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-info">
                                    <NavLink className='text-decoration-none text-dark font-weight-bold' to="/admin/appointments">Go To Appointments</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 text-center mt-4">
                        <div className="card">
                            <div className="card-header bg-white border-0">
                                <h1><i className="fa fa-truck-medical text-dark"></i></h1>
                                <h3 className=" font-weight-bolder text-dark">
                                    Manage Facilities</h3>
                                <h6 className="text-muted">Add, Update Or Remove</h6>
                                <p className=' font-weight-bold text-dark '>Total Facilities : {counts.facilities} </p>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-dark">
                                    <NavLink className='text-decoration-none text-white font-weight-bold' to="/admin/facilities">Go To Facilities</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 text-center mt-4">
                        <div className="card">
                            <div className="card-header bg-white border-0">
                                <h1><i className="fa fa-sitemap text-danger"></i></h1>
                                <h3 className=" font-weight-bolder text-danger">
                                    Manage Departments</h3>
                                <h6 className="text-muted">Add, Update Or Remove</h6>
                                <p className=' font-weight-bold text-dark '>Total Departments : {counts.departments} </p>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-danger">
                                    <NavLink className='text-decoration-none text-dark font-weight-bold' to="/admin/departments">Go To Departments</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 text-center mt-4">
                        <div className="card">
                            <div className="card-header bg-white border-0">
                                <h1><i className="fa fa-comments text-success"></i></h1>
                                <h3 className=" font-weight-bolder text-success">
                                    Manage Cashless</h3>
                                <h6 className="text-muted">Add, Update Or Remove</h6>
                                <p className=' font-weight-bold text-dark '>Total Cashless : </p>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-success">
                                    <NavLink className='text-decoration-none text-dark font-weight-bold' to="/admin/slides">Go To Cashless</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 text-center mt-4">
                        <div className="card">
                            <div className="card-header bg-white border-0">
                                <h1><i className="fa fa-pen-to-square text-danger"></i></h1>
                                <h3 className=" font-weight-bolder text-danger">
                                    Manage Feedback</h3>
                                <h6 className="text-muted">Add, Update Or Remove</h6>
                                <p className=' font-weight-bold text-dark '>Total Feedback : </p>
                            </div>
                            <div className="card-body">
                                <button className="btn btn-danger">
                                    <NavLink className='text-decoration-none text-dark font-weight-bold' to="/admin/feedback">Go To Feedback</NavLink>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <br /><br />
        </>
    );
}



// bg-primary
// bg-secondary
// bg-success
// bg-danger
// bg-warning
// bg-info
// bg-light
// bg-dark
