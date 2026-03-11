import { useEffect, useState } from "react";
import doctorAxios from "./doctorAxios";

export default function TodayAppointments() {

    const [appointments, setAppointments] = useState([]);

    const doctor = JSON.parse(localStorage.getItem("doctor"));

    const getAppointments = async () => {

        try {

            const res = await doctorAxios.get(`/doctor/todayAppointments/${doctor.doctor_id}`);

            setAppointments(res.data);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {

        getAppointments();

    }, []);

    const updateStatus = async (id, status) => {

        try {

            await doctorAxios.put(`/doctor/updateStatus/${id}`, {
                status
            });

            getAppointments();

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">

            <h3 className="text-danger mb-4">Today's Appointments</h3>

            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>Token</th>
                        <th>Patient</th>
                        <th>Contact</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Notes</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {appointments.map((a) => (

                        <tr key={a.appointment_id}>

                            <td>{a.token_number}</td>
                            <td>{a.user_name}</td>
                            <td>{a.user_contact}</td>
                            <td>{a.appointment_date}</td>
                            <td>{a.appointment_time}</td>
                            <td>{a.notes}</td>
                            <td>{a.status}</td>

                            <td>

                                <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() => updateStatus(a.appointment_id, "Completed")}
                                >
                                    Complete
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => updateStatus(a.appointment_id, "Cancelled")}
                                >
                                    Cancel
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}