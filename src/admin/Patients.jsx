import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink , useNavigate } from "react-router-dom";

export default function Patient() {
    const [patients, setPatients] = useState([]);
    const [viewMode, setViewMode] = useState("list");

    //Search
    const [searchTerm, setSearchTerm] = useState("");

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    // Add Patient
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !address || !password || !age || !gender) {
            alert("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("address", address);
            formData.append("password", password);
            formData.append("age", age);
            formData.append("gender", gender);
            formData.append("role", "user");


            const res = await axios.post(
                "http://localhost:4000/api/auth/register",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (res.status === 201) {
                alert("Patient Added Successfully.");
                viewMode = "list";
            }

        } catch (err) {
            console.error("Registration error:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        axios.get("http://localhost:4000/api/admin/getAllUsers", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
        })
            .then((res) => {
                setPatients(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    /* SEARCH LOGIC */
    const filteredPatients = patients.filter((patient) => {
        const keyword = searchTerm.toLowerCase();

        return (
            patient.user_id?.toString().includes(keyword) ||
            patient.user_name?.toLowerCase().includes(keyword) ||
            patient.user_email?.toLowerCase().includes(keyword) ||
            patient.user_phone?.toLowerCase().includes(keyword) ||
            patient.user_age?.toString().includes(keyword)
        );
    });

    /* PAGINATION LOGIC */
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentPatients = filteredPatients.slice(
        indexOfFirstUser,
        indexOfLastUser
    );

    const totalPages = Math.ceil(filteredPatients.length / usersPerPage);

    return (
        <>
            <h1 className="font-weight-bold text-danger text-center">Patients</h1>
            <h5 className="text-muted font-weight-bold text-center">
                Manage Your Patients
            </h5>

            {/* HEADER CONTROLS  */}
            <div className="container-fluid">
                <div className="card border-0">
                    <div className="row align-items-center">
                        <div className="col-md-8"></div>

                        <div className="col-md-3 bg-warning p-2 d-flex align-items-center">
                            <button
                                className="btn btn-danger mr-2"
                                onClick={() => setViewMode("add")}
                            >
                                Add
                            </button>

                            <button
                                className="btn btn-danger me-2"
                                onClick={() => setViewMode("list")}
                            >
                                List
                            </button>

                            <input
                                type="text"
                                className=" ml-2 mr-2 form-control form-control-sm"
                                placeholder="Search ID / Name / Email / Phone / Age"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // reset page on search
                                }}
                            />

                            <i className="fa fa-search ms-2"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* PATIENT LIST */}
            {viewMode === "list" && (
                <div className="container mt-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center">
                            <h4 className="mb-0 text-danger fw-bold">
                                <i className="fa fa-users me-2"></i>Patients List
                            </h4>
                            <span className="badge bg-danger">
                                Total: {filteredPatients.length}
                            </span>
                        </div>

                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered align-middle mb-0">
                                    <thead className="table-light text-center">
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Gender</th>
                                            <th>Age</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-center">
                                        {currentPatients.length > 0 ? (
                                            currentPatients.map((patient, index) => (
                                                <tr key={patient.user_id}>
                                                    <td>{index + 1}</td>
                                                    <td className="fw-semibold">
                                                        {patient.user_name}
                                                    </td>
                                                    <td>{patient.user_email}</td>
                                                    <td>{patient.user_phone}</td>
                                                    <td
                                                        className="text-truncate"
                                                        style={{ maxWidth: "150px" }}
                                                    >
                                                        {patient.user_address}
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-info">
                                                            {patient.user_gender}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-secondary">
                                                            {patient.user_age}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary m-2">
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-danger">
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-muted py-4">
                                                    No patients found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* PAGINATION */}
                        {totalPages > 1 && (
                            <div className="card-footer bg-white">
                                <nav>
                                    <ul className="pagination justify-content-center mb-0">
                                        {[...Array(totalPages)].map((_, index) => (
                                            <li
                                                key={index}
                                                className={`page-item ${currentPage === index + 1 ? "active" : ""
                                                    }`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() => setCurrentPage(index + 1)}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {viewMode === "add" && (
                <div className="container d-flex justify-content-center align-items-center mt-4">
                    <div className="card shadow-lg border-0 rounded-4 p-4 w-100">
                        <form onSubmit={handleRegister}>
                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Full Name</label>
                                    <input type="text" className="form-control form-control-lg" value={name}
                                        onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Email</label>
                                    <input type="email" className="form-control form-control-lg" value={email}
                                        onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Phone</label>
                                    <input type="text" className="form-control form-control-lg" value={phone}
                                        onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Address</label>
                                    <input type="text" className="form-control form-control-lg" value={address}
                                        onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Age</label>
                                    <input type="text" className="form-control form-control-lg" value={age}
                                        onChange={(e) => setAge(e.target.value)} placeholder="Enter Age" />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Gender</label><br />
                                    <select className="form-select w-75 h-50 form-select-lg" value={gender}
                                        onChange={(e) => setGender(e.target.value)} >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Password</label>
                                    <input type="password" className="form-control form-control-lg" value={password}
                                        onChange={(e) => setPassword(e.target.value)} placeholder="Create password" />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Confirm Password</label>
                                    <input type="password" className="form-control form-control-lg" value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" />
                                </div>
                            </div>

                            <div className="d-grid mt-3">
                                <button type="submit" className="btn btn-danger btn-lg shadow-sm" disabled={loading} >
                                    {loading ? "Registering..." : "Register"}
                                </button>
                            </div>

                            <p className="text-center mt-3 mb-0">
                                Already have an account?{" "}
                                <NavLink to="/login" className="fw-semibold">
                                    Login here
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            )}




            {/* PATIENT Edit */}
            {viewMode === "edit" && (
                <div className="container">
                    <h1>Edit Patient</h1>
                    <h1>Welcome to Edit Patient Page Are ano</h1>
                </div>
            )}



        </>
    );
}
