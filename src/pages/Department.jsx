import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Department() {
    const { id } = useParams(); // department_id
    const [department, setDepartment] = useState(null);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const deptRes = await axios.get(
                `http://localhost:4000/api/user/getDepartment/${id}`
            );
            setDepartment(deptRes.data);

            const doctors = await axios.get(
                `http://localhost:4000/api/user/getDoctorsByDepartment/${id}`
            );
            setDoctors(doctors.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (!department) {
        return <div className="container my-5">Loading...</div>;
    }

    return (
        <div className="container my-5">

            {/* Department Info */}
            <div className="card mb-4 border-0">
                <div className="card-body">
                    <div className="col-md-12 text-center text-danger float-weight-bold font-italic mb-1">
                        <h1>{department.department_name}</h1>
                    </div>
                    <p>{department.department_description}</p>
                </div>
            </div>

            {/* Doctors */}
            <h4>Doctors</h4>
            <div className="row">
                {doctors.map((d) => (
                    <div className="col-md-4 mb-4" key={d.doctor_id}>
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <img
                                    src={d.dr_photo
                                        ? `http://localhost:4000/uploads/${d.dr_photo}`
                                        : "/no-doctor.png"}
                                    className="rounded-circle mb-3"
                                    style={{ width: 100, height: 100 }}
                                />
                                <h5>{d.dr_name}</h5>
                                <p>{d.dr_position}</p>
                                <small>{d.dr_speciality}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}