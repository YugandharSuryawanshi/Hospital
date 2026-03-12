import React from "react";

const RecentAppointments = ({ appointments }) => {

    return (

        <div className="card shadow p-3">

            <h5>Recent Appointments</h5>

            <table className="table">

                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    {appointments.map((a, index) => (

                        <tr key={index}>
                            <td>{a.patient_name}</td>
                            <td>{a.appointment_date}</td>
                            <td>{a.status}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )

}

export default RecentAppointments;