import { format } from 'date-fns';
import { toZonedTime } from "date-fns-tz";

const RecentAppointments = ({ appointments }) => {

    const formatDate = (dateString) => {

        const timeZone = "Asia/Kolkata";

        const zonedDate = toZonedTime(dateString, timeZone);

        return format(zonedDate, "dd MMM yyyy, hh:mm a");
    };

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
                            <td>{formatDate(a.appointment_datetime)}</td>
                            <td>{a.status}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )

}

export default RecentAppointments;