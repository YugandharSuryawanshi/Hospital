export default function TodayAppointments({ appointments }) {

    return (
        <div className="card shadow">

            <div className="card-header bg-danger text-white">
                Today's Appointments
            </div>

            <div className="card-body table-responsive">

                <table className="table table-bordered">

                    <thead>
                        <tr>
                            <th>Token</th>
                            <th>Patient Name</th>
                            <th>Contact</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {appointments.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No Appointments Today
                                </td>
                            </tr>
                        ) : (
                            appointments.map((app) => (
                                <tr key={app.appointment_id}>
                                    <td>{app.token_number}</td>
                                    <td>{app.user_name}</td>
                                    <td>{app.user_contact}</td>
                                    <td>{app.appointment_date}</td>
                                    <td>{app.appointment_time}</td>
                                    <td>
                                        <span className="badge bg-warning">
                                            {app.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}