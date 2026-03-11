import { useEffect, useState } from "react";
import doctorAxios from "./doctorAxios";

export default function DoctorQueue() {

    const [patients, setPatients] = useState([]);

    const doctor = JSON.parse(localStorage.getItem("doctor"));

    useEffect(() => {

        const getQueue = async () => {

            try {

                const res = await doctorAxios.get(`/doctor/queue/${doctor.doctor_id}`);

                setPatients(res.data);

            } catch (err) {
                console.error(err);
            }
        };

        getQueue();

    }, []);

    return (
        <div className="container mt-4">

            <h3 className="text-danger mb-4">Patient Queue</h3>

            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>Token</th>
                        <th>Patient Name</th>
                        <th>Contact</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    {patients.map((p) => (

                        <tr key={p.appointment_id}>
                            <td>{p.token_number}</td>
                            <td>{p.user_name}</td>
                            <td>{p.user_contact}</td>
                            <td>{p.appointment_time}</td>
                            <td>{p.status}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}