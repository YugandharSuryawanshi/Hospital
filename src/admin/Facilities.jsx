import axios from "axios";
import { useEffect, useState } from "react";
import "./Facilities.css";

export default function Facilities() {
    const [facilities, setFacilities] = useState([]);
    const [activeView, setActiveView] = useState("list");

    const [facility_name, setName] = useState("");
    const [facility_desc, setFacility_desc] = useState("");
    const [facility_image, setFacility_image] = useState(null);

    const [editingId, setEditingId] = useState(null);
    const [expanded, setExpanded] = useState(null);

    const token = localStorage.getItem("adminToken");

    // Fetch Facilities
    const fetchFacilities = () => {
        axios
            .get("http://localhost:4000/api/admin/getAllFacilities")
            .then((res) => setFacilities(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchFacilities();
    }, []);

    // Add Or Update
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("facility_name", facility_name);
        formData.append("facility_desc", facility_desc);

        if (facility_image) {
            formData.append("facility_image", facility_image);
        }

        const token = localStorage.getItem("adminToken");

        try {
            let res;

            if (editingId) {
                // UPDATE
                res = await axios.put(
                    `http://localhost:4000/api/admin/updateFacility/${editingId}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            } else {
                // ADD New
                res = await axios.post(
                    "http://localhost:4000/api/admin/addFacility",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            }

            alert(res.data.message);
            resetForm();
            fetchFacilities();
            setActiveView("list");
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };


    // EDIT
    const handleEdit = (item) => {
        setEditingId(item.facility_id);
        setName(item.facility_name);
        setFacility_desc(item.facility_desc);
        setFacility_image(null);
        setActiveView("add");
    };

    // DELETE
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:4000/api/admin/deleteFacility/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                alert(res.data.message);
                fetchFacilities();
            })
            .catch((err) => console.error(err));
    };

    // Reset Form
    const resetForm = () => {
        setEditingId(null);
        setName("");
        setFacility_desc("");
        setFacility_image(null);
    };

    
    return (
        <>
            <div className="container mb-4">
                <h2 className="text-center text-danger">Facilities</h2>

                <button
                    className="btn btn-danger float-right"
                    onClick={() => {
                        resetForm();
                        setActiveView("add");
                    }}
                >
                    Add Facility
                </button>

                <button
                    className="btn btn-warning float-right mr-2"
                    onClick={() => setActiveView("list")}
                >
                    Show Facilities
                </button>
            </div>
            <br /><br />

            {/* ADD OR EDIT Form */}
            {activeView === "add" && (
                <div className="container card p-4 text-center">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-4">
                                <label>Facility Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={facility_name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-4">
                                <label>Description</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={facility_desc}
                                    onChange={(e) => setFacility_desc(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-4">
                                <label>Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => setFacility_image(e.target.files[0])}
                                />
                            </div>
                        </div>

                        <button className="btn btn-danger mt-3">
                            {editingId ? "Update Facility" : "Add Facility"}
                        </button>
                    </form>
                </div>
            )}

            {/* LIST Print  */}
            {activeView === "list" && (
                <div className="container-fluid">
                    <div className="row">
                        {facilities.map((item) => (
                            <div className="col-md-4 mb-4 mt-1" key={item.facility_id}>
                                <div className="card h-100 shadow">

                                    <div className="facility-img-wrapper">
                                        <img
                                            src={
                                                item.facility_image
                                                    ? `http://localhost:4000/uploads/${item.facility_image}`
                                                    : "https://via.placeholder.com/300x200"
                                            }
                                            className="facility-img"
                                            alt=""
                                        />
                                    </div>

                                    <div className="card-body text-center">
                                        <h5>{item.facility_name}</h5>

                                        <p className="facility-desc">
                                            {expanded === item.facility_id
                                                ? item.facility_desc
                                                : item.facility_desc.substring(0, 120) + "..."}
                                        </p>

                                        {item.facility_desc.length > 120 && (
                                            <button
                                                className="btn btn-info text-dark fw-bold p-1"
                                                onClick={() =>
                                                    setExpanded(
                                                        expanded === item.facility_id ? null : item.facility_id
                                                    )
                                                }
                                            >
                                                {expanded === item.facility_id ? "Read Less" : "Read More"}
                                            </button>
                                        )}

                                        <br /><br />

                                        <button
                                            className="btn btn-warning mr-2"
                                            onClick={() => handleEdit(item)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(item.facility_id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
