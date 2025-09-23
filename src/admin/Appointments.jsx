import axios from "axios";
import { useEffect, useState } from "react";
import './table.css';

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/admin/appointments")
            .then((res) => setAppointments(res.data))
            .catch((err) => console.error("Error fetching appointments", err));
    }, []);

    if (appointments.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="col-12">
                            <h1 className="ml-5 mt-5">Appointments</h1>
                            <div className="ml-5 mb-3" style={{ color: "red", width: "50px", height: "1px", borderBottom: "4px solid red" }}></div>
                        </div>
                        <ul>
                            <li className="d-inline-block ml-3">Home</li>
                            <li className="d-inline-block ml-3"><i class="fa-solid fa-chevron-right"></i></li>
                            <li className="d-inline-block ml-3">Appointments</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* New section print all appointments */}
            <section className="bg-light p-3">
                <div className="responsive-table-wrapper">

                    <table className="table table-bordered table-hover responsive-table mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>Sr.No.</th>
                                <th>Patient Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Doctor Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((d, i) => (
                                <tr key={d.appointment_id}>
                                    <td>{d.appointment_id}</td>
                                    <td>{d.user_name}</td>
                                    <td>{d.user_contact}</td>
                                    <td>{d.user_email}</td>
                                    {/* Date */}
                                    <td>
                                        {new Date(d.appointment_datetime).toLocaleDateString()}
                                    </td>
                                    {/* Time */}
                                    <td>
                                        {new Date(d.appointment_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td>{d.notes}</td>
                                    <td>{d.status}</td>
                                    <td>{d.dr_name}</td>
                                    <td><button className="btn btn-primary">View</button></td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </section>


        </>
    );
}