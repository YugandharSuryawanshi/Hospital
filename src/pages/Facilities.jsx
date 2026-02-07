import axios from "axios";
import { useEffect, useState } from "react";
import "./Facilities.css";

export default function Facilities() {
    const [facilities, setFacilities] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const URL = 'http://localhost:4000/api/user';
    const imgUrl = 'http://localhost:4000/uploads';

    useEffect(() => {
        axios.get(`${URL}/getFacilities`)
            .then((res) => setFacilities(res.data))
            .catch((err) => console.error(err));
    }, []);

    if (facilities.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                <div className="spinner-border text-warning" role="status"></div>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-center text-danger m-3 mb-5 font-weight-bold">Our Facilities</h1>

            <div className="container-fluid">
                <div className="row">
                    {facilities.map((facility) => (
                        <div className="col-md-4 mb-4" key={facility.facility_id}>
                            <div className="card h-100 shadow-sm text-center">

                                {/* IMAGE */}
                                <div className="facility-img-wrapper">
                                    <img
                                        src={
                                            facility.facility_image
                                                ? `${imgUrl}/${facility.facility_image}`
                                                : "https://via.placeholder.com/300x200?text=No+Image"
                                        }
                                        alt={facility.facility_name}
                                        className="facility-img"
                                    />
                                </div>

                                <div className="card-body">
                                    <h5 className="card-title text-danger">
                                        {facility.facility_name}
                                    </h5>

                                    <p className="card-text facility-desc">
                                        {expanded === facility.facility_id
                                            ? facility.facility_desc
                                            : facility.facility_desc.length > 120
                                                ? facility.facility_desc.substring(0, 120) + "..."
                                                : facility.facility_desc}
                                    </p>

                                    {facility.facility_desc.length > 120 && (
                                        <button
                                            className="btn btn-info p-1"
                                            onClick={() =>
                                                setExpanded(
                                                    expanded === facility.facility_id
                                                        ? null
                                                        : facility.facility_id
                                                )
                                            }
                                        >
                                            {expanded === facility.facility_id ? "Read Less" : "Read More"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
