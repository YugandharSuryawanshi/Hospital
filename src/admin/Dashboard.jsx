import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
    const token = localStorage.getItem("adminToken");
    const user = JSON.parse(localStorage.getItem("adminUser") || "null");
    const [users , setUsers] = useState([]);
    const [slides , setSlides] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [cashless, setCashless] = useState([]);
    

    useEffect(() => {
        let cancelled = false;
        const fetchDetails = async () => {
            try {
                const users = await axios.get("http://localhost:4000/api/admin/getAllUsers",{
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    });
                const slides = await axios.get("http://localhost:4000/api/admin/slides");
                const doctors = await axios.get("http://localhost:4000/api/admin/getdoctors");
                const appointments = await axios.get("http://localhost:4000/api/admin/appointments");
                const facilities = await axios.get("http://localhost:4000/api/admin/getAllFacilities");
                // const feedbacks = await axios.get("http://localhost:4000/api/admin/getfeedbacks");
                // const cashless = await axios.get("http://localhost:4000/api/admin/getcashless");

                if (!cancelled) {
                    setUsers(Array.isArray(users.data) ? users.data : []);
                    setSlides(Array.isArray(slides.data) ? slides.data : []);
                    setDoctors(Array.isArray(doctors.data) ? doctors.data : []);
                    setAppointments(Array.isArray(appointments.data) ? appointments.data : []);
                    setFacilities(Array.isArray(facilities.data) ? facilities.data : []);
                    setFeedbacks(feedbacks.data);
                    setCashless(cashless.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchDetails();
        return () => {
            cancelled = true;
        };
    }, []);


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
                                    <p className=' font-weight-bold text-dark '>Total Patients : {users.length}</p>
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
                                    <p className=' font-weight-bold text-dark '>Total Slides : {slides.length} </p>
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
                                    <p className=' font-weight-bold text-dark '>Total Doctors : {doctors.length} </p>
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
                                    <p className=' font-weight-bold text-dark '>Total Appointments : {appointments.length} </p>
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
                                    <p className=' font-weight-bold text-dark '>Total Facilities : {facilities.length} </p>
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
