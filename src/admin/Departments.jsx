import axios from "axios";
import { useEffect, useState } from "react";

export default function Departments() {

    const [departments, setDepartments] = useState([]);
    const [viewMode, setViewMode] = useState("list");

    const [departmentName, setDepartmentName] = useState("");
    const [departmentDesc, setDepartmentDesc] = useState("");
    const [departmentStatus, setDepartmentStatus] = useState("Active");
    const [editId, setEditId] = useState(null);

    const [search, setSearch] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;

    // FETCH
    const fetchDepartments = async () => {
        const res = await axios.get("http://localhost:4000/api/admin/getDepartments");
        setDepartments(res.data);
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    // ADD
    const handleSubmit = async (e) => {
        const token = localStorage.getItem("adminToken");
        e.preventDefault();

        if (!departmentName || !departmentDesc) {
            alert("Please fill all fields");
            return;
        }
        const formData = new FormData();
        formData.append("department_name", departmentName);
        formData.append("department_desc", departmentDesc);

        await axios.post("http://localhost:4000/api/admin/addDepartment", formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setDepartmentName("");
        setDepartmentDesc("");
        fetchDepartments();
        setViewMode("list");
    };

    // EDIT
    const editDepartment = (dept) => {
        setEditId(dept.department_id);
        setDepartmentName(dept.department_name);
        setDepartmentDesc(dept.department_description);
        setDepartmentStatus(dept.department_status);
        setViewMode("edit");
    };

    // UPDATE
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("department_name", departmentName);
        formData.append("department_desc", departmentDesc);
        formData.append("department_status", departmentStatus);

        await axios.put(
            `http://localhost:4000/api/admin/updateDepartment/${editId}`, formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
            }
        );

        fetchDepartments();
        setViewMode("list");
    };

    // DELETE
    const deleteDepartment = async (id) => {
        if (window.confirm("Delete department?")) {
            await axios.delete(
                `http://localhost:4000/api/admin/deleteDepartment/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                    },
                }
            );
            fetchDepartments();
        }
    };

    // SEARCH
    const filtered = departments.filter(d =>
        d.department_name.toLowerCase().includes(search.toLowerCase())
    );

    const currentDepartments = filtered.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filtered.length / recordsPerPage);

    return (
        <>
            <div className="container text-center py-3 mb-3">
                <div className="row">
                    <div className="col-md-6">
                <h2 className="ms-3 text-danger font-weight-bolder">* Departments *</h2>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-4">
                                <h3>{departments.length}</h3>
                                <p>Total Departments</p>
                            </div>
                            <div className="col-md-4">
                                <h3>{departments.filter(d => d.department_status === "Active").length}</h3>
                                <p>Active Departments</p>
                            </div>
                            <div className="col-md-4">
                                <h3>{departments.filter(d => d.department_status === "Inactive").length}</h3>
                                <p>Inactive Departments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BUTTON */}
            <div className="container mb-3">
                <div className="row">
                    <div className="col-md-6">
                        {/* SEARCH */}
                        {viewMode === "list" && (
                            <div className="container mb-3">
                                <input
                                    className="form-control"
                                    placeholder="Search department name..."
                                    value={search}
                                    onChange={e => {
                                        setSearch(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-warning w-100" onClick={() => setViewMode("add")}>
                            Add Department
                        </button>
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-secondary w-100" onClick={() => setViewMode("list")} >List</button>
                    </div>
                </div>
            </div>


            {/* ADD / EDIT FORM */}
            {(viewMode === "add" || viewMode === "edit") && (
                <div className="container card border-0 p-2">
                    <div className="card shadow bg-light border-0">
                        <div className="card-body">
                            <form onSubmit={viewMode === "add" ? handleSubmit : handleUpdate}>
                                <div className="row text-center">
                                    <div className="col-md-6">
                                        <label className="form-label font-weight-bold">Department Name</label>
                                        <input className="form-control mb-2" placeholder="Department Name"
                                            value={departmentName} onChange={e => setDepartmentName(e.target.value)} required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label font-weight-bold">Department Description</label>
                                        <textarea className="form-control mb-2" placeholder="Department Description"
                                            value={departmentDesc} onChange={e => setDepartmentDesc(e.target.value)} required
                                        />
                                    </div>
                                </div>


                                {viewMode === "edit" && (
                                    <div className="col-md-12">
                                        <label className="form-label font-weight-bold">Status</label>
                                        <select className="form-control mb-2" value={departmentStatus}
                                            onChange={e => setDepartmentStatus(e.target.value)}>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                )}

                                <div className="col-md-12 text-center">
                                    <button className="btn btn-success">
                                        {viewMode === "add" ? "Add" : "Update"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* TABLE */}
            {viewMode === "list" && (
                <div className="container-fluid">
                    <table className="table table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Sr No</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentDepartments.map((d, i) => (
                                <tr key={d.department_id}>
                                    <td>{indexOfFirst + i + 1}</td>
                                    <td>{d.department_name}</td>

                                    <td>
                                        <span className={`badge px-3 py-2 ${d.department_status === "Active"
                                            ? "bg-success"
                                            : "bg-danger"}`}
                                        >
                                            {d.department_status}
                                        </span>
                                    </td>

                                    <td>
                                        {d.department_description}
                                    </td>

                                    <td>
                                        <button className="btn btn-sm btn-warning mr-1" onClick={() => editDepartment(d)}>
                                            <i className="fa fa-edit"></i> Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger ml-1" onClick={() => deleteDepartment(d.department_id)}>
                                            <i className="fa fa-trash"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <ul className="pagination justify-content-center">
                            {[...Array(totalPages)].map((_, i) => (
                                <li
                                    key={i}
                                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    );
}
