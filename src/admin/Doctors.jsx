import axios from "axios";
import { useEffect, useState } from "react";
import "./Doctor.css";

export default function Doctors() {
    const [searchDrName, setSearchDrName] = useState("");
    const [drName, setDrName] = useState("");
    const [drCertificate, setDrCertificate] = useState("");
    const [drPosition, setDrPosition] = useState("");
    const [drSpeciality, setDrSpeciality] = useState("");
    const [drContact, setDrContact] = useState("");
    const [drEmail, setDrEmail] = useState("");
    const [drPhoto, setDrPhoto] = useState(null);
    const [drAddress, setDrAddress] = useState("");

    const [doctors, setDoctors] = useState([]);

    // Which Section show or hide
    const [viewMode, setViewMode] = useState("list");

    useEffect(() => {
        let cancelled = false;

        const fetchDoctors = async () => {
            try {

                // If endpoint is protected, include token:
                // const token = localStorage.getItem("adminToken");
                // const res = await axios.get("http://localhost:5000/api/admin/getdoctors", { headers: { Authorization: `Bearer ${token}` } });

                const res = await axios.get("http://localhost:5000/api/admin/getdoctors");
                if (!cancelled) {
                    setDoctors(Array.isArray(res.data) ? res.data : []);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error("Error fetching doctors", err);
                }
            }
        };

        fetchDoctors();

        // cleanup on unmount
        return () => {
            cancelled = true;
        };
        // run only once on mount -> empty deps
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const token = localStorage.getItem("adminToken");
        if (!drPhoto) {
            alert("Please select an Doctor Photo first");
            return;
        }
        formData.append("dr_name", drName);
        formData.append("dr_certificate", drCertificate);
        formData.append("dr_position", drPosition);
        formData.append("dr_speciality", drSpeciality);
        formData.append("dr_contact", drContact);
        formData.append("dr_email", drEmail);
        formData.append("dr_photo", drPhoto);
        formData.append("dr_address", drAddress);

        const res = await axios.post("http://localhost:5000/api/admin/doctors", formData, {
            headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`, },
        });

        setDrPhoto(null);
        e.target.reset();
        alert("Slide added successfully!");
    };


    return (
        <>
            <div className="container-fluid bg-light py-3 mb-3">
                <h1 className="ms-3 mt-3 fw-bold">All Doctors</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb ms-3">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Doctors
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-warning w-100" onClick={() => setViewMode("add")}>
                                    <i className="fa fa-user-md me-2"></i>Add Doctor
                                </button>
                            </div>
                            <div className="col-md-6">
                                <button className="btn btn-danger w-100" onClick={() => setViewMode("list")}>
                                    <i className="fa fa-list me-2"></i>Doctors List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />

            {/* search always visible */}
            {viewMode === "list" && (

                <div className="container mb-4">
                    <form className="row g-2 justify-content-end" onSubmit={(e) => { e.preventDefault(); console.log("Searching for", searchDrName); }} >
                        <div className="col-md-4">
                            <input type="text" placeholder="Search Doctors" className="form-control shadow-sm" value={searchDrName}
                                onChange={(e) => setSearchDrName(e.target.value)} />
                        </div>
                        <div className="col-md-2">
                            <button type="submit" className="btn btn-warning w-100 shadow-sm">
                                <i className="fa fa-search me-1"></i>Search
                            </button>
                        </div>
                    </form>
                </div>

            )}

            {/* ADD DOCTOR form visible only if viewMode==="add" */}
            {viewMode === "add" && (
                <div className="container mb-5">
                    <div className="card shadow bg-light border-0">
                        <div className="card-header bg-dark text-white text-center">
                            <h4 className="mb-0">
                                <i className="fa fa-user-md me-2"></i>Add Doctor
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Dr. Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Dr. Name"
                                        value={drName}
                                        onChange={(e) => setDrName(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Dr. Certificate</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Dr. Certificate"
                                        value={drCertificate}
                                        onChange={(e) => setDrCertificate(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Dr. Position</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Dr. Position"
                                        value={drPosition}
                                        onChange={(e) => setDrPosition(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Dr. Speciality</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Dr. Speciality"
                                        value={drSpeciality}
                                        onChange={(e) => setDrSpeciality(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Contact No.</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter Dr. Contact"
                                        value={drContact}
                                        onChange={(e) => setDrContact(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Dr. Email"
                                        value={drEmail}
                                        onChange={(e) => setDrEmail(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Photo</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) => setDrPhoto(e.target.files[0])}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Dr. Address"
                                        value={drAddress}
                                        onChange={(e) => setDrAddress(e.target.value)}
                                    />
                                </div>

                                <div className="col-12 text-center mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-warning px-5 shadow"
                                    >
                                        <i className="fa fa-plus-circle me-1"></i>Add Doctor
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* DOCTOR TABLE visible only if viewMode==="list" */}
            {viewMode === "list" && (
                <div className="container-fluid">
                    <div className="card shadow bg-light border-0">
                        <div className="card-header bg-dark text-white text-center">
                            <h4 className="mb-0">
                                <i className="fa fa-user-md me-2"></i>Doctors
                            </h4>
                        </div>

                            <div className="p-2">
                                {doctors.length === 0 ? (
                                    <div className="alert alert-warning">No doctors found</div>
                                ) : (
                                    // 🔥 Wrap table in a div with overflow-x-auto
                                    <div className="table-responsive" style={{ overflowX: 'auto' }}>
                                        <table className="table table-striped table-bordered table-hover align-middle">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Sr. No.</th>
                                                    <th>Name</th>
                                                    <th>Speciality</th>
                                                    <th>Position</th>
                                                    <th>Contact</th>
                                                    <th>Email</th>
                                                    <th>Address</th>
                                                    <th>Photo</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {doctors.map((d, idx) => (
                                                    <tr key={d.dr_id ?? d.user_id ?? idx}>
                                                        <td>{idx + 1}</td>
                                                        <td>{d.dr_name ?? d.user_name ?? "—"}</td>
                                                        <td>{d.dr_speciality ?? "—"}</td>
                                                        <td>{d.dr_position ?? "—"}</td>
                                                        <td>{d.dr_contact ?? "—"}</td>
                                                        <td className="text-break">{d.dr_email ?? "—"}</td>
                                                        <td className="text-break">{d.dr_address ?? "—"}</td>
                                                        <td>
                                                            <img
                                                                src={
                                                                    'http://localhost:5000/uploads/' +
                                                                    (d.dr_photo ?? d.user_photo ?? '')
                                                                }
                                                                alt=""
                                                                className="img-fluid rounded"
                                                                style={{ maxWidth: '80px', height: 'auto' }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <div className="btn-group">
                                                                <button
                                                                    className="btn btn-sm btn-warning m-1"
                                                                // onClick={() => handleEdit(d.dr_id)}
                                                                >
                                                                    <i className="fa fa-edit"></i>
                                                                </button>
                                                                <button
                                                                    className="btn btn-sm btn-danger m-1"
                                                                // onClick={() => handleDelete(d.dr_id)}
                                                                >
                                                                    <i className="fa fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                    </div>
                </div>
            )}



        </>
    );
}
