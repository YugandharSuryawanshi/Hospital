import { useEffect, useState } from "react";
import doctorAxios from "./doctorAxios";

export default function Dashboard() {

    const [stats, setStats] = useState({
        total_today: 0,
        waiting: 0,
        completed: 0,
        cancelled: 0,
        approved: 0
    });
    const [doctorID, setDoctorId] = useState(null);

    const doctor = JSON.parse(localStorage.getItem("doctorUser"));
    const user_id = doctor.user_id;

    useEffect(() => {
        if (user_id) {
            getDoctorId();
        }
    }, []);
    const getDoctorId = async () => {
        try {

            const res = await doctorAxios.get(`/getDoctorID/${user_id}`);
            console.log('Came Res Doc ID:- ' + res.data.doctor_id);
            const docId = res.data.doctor_id;

            console.log("Doctor ID:", docId);

            setDoctorId(docId);
            console.log('id store in usestate is :- ' + doctorID);

            getStats(res.data.doctor_id);

        } catch (err) {
            console.error(err);
        }
    };

    const getStats = async (doctorID) => {
        try {
            const res = await doctorAxios.get(`/doctor/stats/${doctorID}`);
            setStats(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="container mt-4">

            <h2 className="mb-4 text-danger">Doctor Dashboard</h2>

            <div className="row">

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Total Today</h5>
                            <h2>{stats.total_today}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Waiting</h5>
                            <h2>{stats.waiting}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Completed</h5>
                            <h2>{stats.completed}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Approved</h5>
                            <h2>{stats.approved}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Cancelled</h5>
                            <h2>{stats.cancelled}</h2>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}