import axios from "axios";
import { useEffect, useState } from "react";
import "./Doctor.css";

export default function Doctors() {

    /*States */
    const [searchDrName, setSearchDrName] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [viewMode, setViewMode] = useState("list");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    // Add Doctor form states
    const [drID, setDrID] = useState(""); //Help for edit/update
    const [drName, setDrName] = useState("");
    const [drCertificate, setDrCertificate] = useState("");
    const [drPosition, setDrPosition] = useState("");
    const [drSpeciality, setDrSpeciality] = useState("");
    const [drContact, setDrContact] = useState("");
    const [drEmail, setDrEmail] = useState("");
    const [drPhoto, setDrPhoto] = useState(null);
    const [drAddress, setDrAddress] = useState("");
    const [drGender, setDrGender] = useState("");
    const [drExperience, setDrExperience] = useState("");
    const [drDepartment, setDrDepartment] = useState("");
    const [drFee, setDrFee] = useState("");
    const [drAbout, setDrAbout] = useState("");

    /* Fetch doctors */
    const fetchDoctors = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/admin/getdoctors");
            setDoctors(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Error fetching doctors:", err);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    /*Search Filter */
    const filteredDoctors = doctors.filter((doctor) => {
        const search = searchDrName.toLowerCase();

        return (
            doctor.dr_name?.toLowerCase().includes(search) ||
            doctor.dr_speciality?.toLowerCase().includes(search) ||
            doctor.dr_email?.toLowerCase().includes(search) ||
            doctor.dr_contact?.toString().includes(search) ||
            doctor.dr_position?.toLowerCase().includes(search)
        );
    });

    /*Pagination */
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const currentDoctors = filteredDoctors.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );

    const totalPages = Math.ceil(filteredDoctors.length / recordsPerPage);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Add Doctor
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!drPhoto) {
            alert("Please select a doctor photo");
            return;
        }

        try {
            const token = localStorage.getItem("adminToken");
            const formData = new FormData();

            formData.append("dr_name", drName);
            formData.append("dr_certificate", drCertificate);
            formData.append("dr_position", drPosition);
            formData.append("dr_speciality", drSpeciality);
            formData.append("dr_contact", drContact);
            formData.append("dr_email", drEmail);
            formData.append("dr_photo", drPhoto);
            formData.append("dr_address", drAddress);
            formData.append("dr_gender", drGender);
            formData.append("dr_experience", drExperience);
            formData.append("department_id", drDepartment);
            formData.append("dr_fee", drFee);
            formData.append("dr_about", drAbout);


            await axios.post(
                "http://localhost:4000/api/admin/doctors",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Doctor added successfully!");

            // Reset form fields after submit
            setDrName("");
            setDrCertificate("");
            setDrPosition("");
            setDrSpeciality("");
            setDrContact("");
            setDrEmail("");
            setDrPhoto(null);
            setDrAddress("");
            setDrGender("");
            setDrExperience("");
            setDrDepartment("");
            setDrFee("");
            setDrAbout("");


            fetchDoctors();
            setViewMode("list");

        } catch (error) {
            console.error(error);
            alert("Something went wrong while adding doctor");
        }
    };

    // Edit Doctor
    const editDoctor = (id) => {
        const doctor = doctors.find((d) => d.doctor_id === id);
        setDrID(id);

        setDrName(doctor.dr_name);
        setDrCertificate(doctor.dr_certificate);
        setDrPosition(doctor.dr_position);
        setDrSpeciality(doctor.dr_speciality);
        setDrContact(doctor.dr_contact);
        setDrEmail(doctor.dr_email);
        setDrPhoto();
        setDrAddress(doctor.dr_address);
        setDrGender(doctor.dr_gender);
        setDrExperience(doctor.dr_experience);
        setDrDepartment(doctor.department_id);
        setDrFee(doctor.dr_fee);
        setDrAbout(doctor.dr_about);

        setViewMode("edit");
    };

    // Update Doctor
    const handleUpdate = async (e) => {
        e.preventDefault();
        const doctor_id = drID;
        const formData = new FormData();
        formData.append("dr_name", drName);
        formData.append("dr_certificate", drCertificate);
        formData.append("dr_position", drPosition);
        formData.append("dr_speciality", drSpeciality);
        formData.append("dr_contact", drContact);
        formData.append("dr_email", drEmail);
        formData.append("dr_photo", drPhoto);
        formData.append("dr_address", drAddress);
        formData.append("dr_gender", drGender);
        formData.append("dr_experience", drExperience);
        formData.append("department_id", drDepartment);
        formData.append("dr_fee", drFee);
        formData.append("dr_about", drAbout);

        try {
            const res = await axios.put(
                `http://localhost:4000/api/admin/update_Doctor/${doctor_id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.status === 200) {
                alert("Doctor Updated Successfully");
                fetchDoctors();
                setViewMode("list");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong while updating doctor");
        }
    };

    // Delete Doctor
    const deleteDoctor = async (id) => {
        try {
            const token = localStorage.getItem("adminToken");
            await axios.delete(`http://localhost:4000/api/admin/deleteDoctor/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Doctor deleted successfully!");
            fetchDoctors();
        } catch (error) {
            console.error(error);
            alert("Something went wrong while deleting doctor");
        }
    };

    // Change mode with reset all fields ( after edit came into without update add mode that time reset all fields)
    const setAddViewMode = () => {
        setDrName("");
        setDrCertificate("");
        setDrPosition("");
        setDrSpeciality("");
        setDrContact("");
        setDrEmail("");
        setDrPhoto(null);
        setDrAddress("");
        setDrGender("");
        setDrExperience("");
        setDrDepartment("");
        setDrFee("");
        setDrAbout("");
        setViewMode("add");
    }

    return (
        <>
            {/* Header */}
            <div className="container-fluid bg-light py-3 mb-3">
                <h1 className="ms-3 fw-bold">All Doctors</h1>
            </div>

            {/* Buttons */}
            <div className="container mb-3">
                <div className="row">
                    <div className="col-md-6">
                        {/* Search Bar */}
                        {viewMode === "list" && (
                            <div className="card border-0">
                                <div className="col-md-12">
                                    <input className="form-control" placeholder="Search by name, speciality, position, email, contact"
                                        value={searchDrName} onChange={(e) => {
                                            setSearchDrName(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="col-md-3">
                        <button className="btn btn-warning w-100" onClick={() => setAddViewMode()}>
                            <i className="fa fa-user-md me-2"></i>Add Doctor
                        </button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-danger w-100" onClick={() => setViewMode("list")}>
                            <i className="fa fa-list me-2"></i>Doctors List
                        </button>
                    </div>
                </div>
            </div>

            {/* add section */}
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
                                    <input type="text" className="form-control" placeholder="Enter Dr. Name"
                                        value={drName} onChange={(e) => setDrName(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Dr. Certificate</label>
                                    <input type="text" className="form-control" placeholder="Enter Dr. Certificate"
                                        value={drCertificate} onChange={(e) => setDrCertificate(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Dr. Position</label>
                                    <input type="text" className="form-control" placeholder="Enter Dr. Position"
                                        value={drPosition} onChange={(e) => setDrPosition(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Dr. Speciality</label>
                                    <input type="text" className="form-control" placeholder="Enter Dr. Speciality"
                                        value={drSpeciality} onChange={(e) => setDrSpeciality(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Contact No.</label>
                                    <input type="number" className="form-control" placeholder="Enter Dr. Contact"
                                        value={drContact} onChange={(e) => setDrContact(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" placeholder="Enter Dr. Email"
                                        value={drEmail} onChange={(e) => setDrEmail(e.target.value)} />
                                </div>

                                <div className="col-md-4 mt-1 mb-1">
                                    <label className="form-label">Select Gender</label>
                                    <select className="form-control" value={drGender} onChange={e => setDrGender(e.target.value)}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">Experience</label>
                                    <input type="number" className="form-control"
                                        placeholder="Years of Experience" value={drExperience}
                                        onChange={e => setDrExperience(e.target.value)} />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">Photo</label>
                                    <input type="file" className="form-control" onChange={(e) => setDrPhoto(e.target.files[0])} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Select Department</label>
                                    <select className="form-control" value={drDepartment} onChange={e => setDrDepartment(e.target.value)}>
                                        <option value="">Select Department</option>
                                        <option value="1">Cardiology</option>
                                        <option value="2">Gynecology</option>
                                        <option value="3">Ophthalmology</option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Fees</label>
                                    <input type="number" className="form-control" placeholder="Consultation Fee"
                                        onChange={e => setDrFee(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">About Doctor</label>
                                    <textarea className="form-control" placeholder="About Doctor" value={drAbout}
                                        onChange={e => setDrAbout(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" placeholder="Enter Dr. Address"
                                        value={drAddress} onChange={(e) => setDrAddress(e.target.value)} />
                                </div>

                                <div className="col-12 text-center mt-3">
                                    <button type="submit" className="btn btn-warning px-5 shadow" >
                                        <i className="fa fa-plus-circle me-1"></i>Add Doctor
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* list Section */}
            {viewMode === "list" && (
                <div className="card">
                    <div className="container-fluid">
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Name</th>
                                        <th>Speciality</th>
                                        <th>Position</th>
                                        <th>Contact</th>
                                        <th>Email</th>
                                        <th>Photo</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentDoctors.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center text-danger">
                                                No doctors found
                                            </td>
                                        </tr>
                                    ) : (
                                        currentDoctors.map((d, i) => (
                                            <tr key={d.doctor_id}>
                                                <td>{indexOfFirstRecord + i + 1}</td>
                                                <td>{d.dr_name}</td>
                                                <td>{d.dr_speciality}</td>
                                                <td>{d.dr_position}</td>
                                                <td>{d.dr_contact}</td>
                                                <td>{d.dr_email}</td>
                                                <td>
                                                    <img
                                                        src={`http://localhost:4000/uploads/${d.dr_photo}`}
                                                        alt="doctor"
                                                        width="70"
                                                        className="rounded"
                                                    />
                                                </td>
                                                <td>
                                                    <button className="btn btn-warning mr-1" onClick={() => editDoctor(d.doctor_id)} >
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    <button className="btn btn-danger ml-1" onClick={() => deleteDoctor(d.doctor_id)}>
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Section */}
                        {totalPages > 1 && (
                            <nav className="d-flex justify-content-center mt-3">
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                        <button className="page-link" onClick={() => changePage(currentPage - 1)}>
                                            Previous
                                        </button>
                                    </li>

                                    {[...Array(totalPages)].map((_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                            <button className="page-link" onClick={() => changePage(index + 1)}>
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}

                                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                        <button className="page-link" onClick={() => changePage(currentPage + 1)}>
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            )}

            {/* Edit Section */}
            {viewMode === "edit" && (
                <div className="container mb-5">
                    <div className="card shadow bg-light border-0">
                        <div className="card-header bg-dark text-white text-center">
                            <h4 className="mb-0">
                                <i className="fa fa-user-md me-2"></i>Add Doctor
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleUpdate} className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Dr. Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Dr. Name"
                                        value={drName} onChange={(e) => setDrName(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Dr. Certificate</label>
                                    <input type="text" className="form-control" placeholder="Enter Dr. Certificate"
                                        value={drCertificate} onChange={(e) => setDrCertificate(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Dr. Position</label>
                                    <input type="text" className="form-control" placeholder="Enter Dr. Position"
                                        value={drPosition} onChange={(e) => setDrPosition(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Dr. Speciality</label>
                                    <input type="text" className="form-control" placeholder="Enter Dr. Speciality"
                                        value={drSpeciality} onChange={(e) => setDrSpeciality(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Contact No.</label>
                                    <input type="number" className="form-control" placeholder="Enter Dr. Contact"
                                        value={drContact} onChange={(e) => setDrContact(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" placeholder="Enter Dr. Email"
                                        value={drEmail} onChange={(e) => setDrEmail(e.target.value)} />
                                </div>

                                <div className="col-md-4 mt-1 mb-1">
                                    <label className="form-label">Select Gender</label>
                                    <select className="form-control" value={drGender} onChange={e => setDrGender(e.target.value)}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">Experience</label>
                                    <input type="number" className="form-control"
                                        placeholder="Years of Experience" value={drExperience}
                                        onChange={e => setDrExperience(e.target.value)} />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">Photo</label>
                                    <input type="file" className="form-control" onChange={(e) => setDrPhoto(e.target.files[0])} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Select Department</label>
                                    <select className="form-control" value={drDepartment} onChange={e => setDrDepartment(e.target.value)}>
                                        <option value="">Select Department</option>
                                        <option value="1">Cardiology</option>
                                        <option value="2">Gynecology</option>
                                        <option value="3">Ophthalmology</option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Fees</label>
                                    <input type="number" className="form-control" placeholder="Consultation Fee"
                                        onChange={e => setDrFee(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">About Doctor</label>
                                    <textarea className="form-control" placeholder="About Doctor" value={drAbout}
                                        onChange={e => setDrAbout(e.target.value)} />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" placeholder="Enter Dr. Address"
                                        value={drAddress} onChange={(e) => setDrAddress(e.target.value)} />
                                </div>

                                <div className="col-12 text-center mt-3">
                                    <button type="submit" className="btn btn-warning font-weight-bold px-5 shadow" >
                                        <i className="fa fa-edit me-1"></i>
                                        Update Doctor
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
