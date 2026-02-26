import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { toastError, toastSuccess } from "../utils/toast";
import adminAxios from "./adminAxios";
import './appointment.css';


export default function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [changeView, setChangeView] = useState('list');

    // Pagination Code
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(appointments.length / itemsPerPage);

    // Search/ filter
    const [search, setSearch] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    // Edit code
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    // Function for date
    const toInputDate = (dateValue) => {
        if (!dateValue) return "";
        return new Date(dateValue).toISOString().split("T")[0];
    };

    useEffect(() => {
        adminAxios.get("/appointments")
            .then((res) => setAppointments(res.data))
            .catch((err) => {
                console.error("Error fetching appointments", err);
                toastError("Failed to load appointments");
            });
    }, []);


    if (appointments.length === 0) {
        return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <span className="visually-hidden mr-3">Loading... </span>
            <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
            </div>
        </div>;
    }

    // Search filter function
    const filteredAppointments = appointments.filter((a) => {
        //Search filter
        const searchText = search.toLowerCase();
        const matchesSearch =
            a.user_name?.toLowerCase().includes(searchText) ||
            a.dr_name?.toLowerCase().includes(searchText) ||
            a.user_contact?.includes(searchText) ||
            a.user_email?.toLowerCase().includes(searchText);
        //Date filter
        const matchesDate = filterDate ? new Date(a.appointment_datetime).toISOString().split("T")[0] === filterDate : true;
        //Status filter
        const matchesStatus = filterStatus ? a.status === filterStatus : true;
        return matchesSearch && matchesDate && matchesStatus;
    });

    // export data in exel file
    const exportToExcel = () => {
        const data = filteredAppointments.map((a, i) => ({
            "Sr No": i + 1,
            "Patient Name": a.user_name,
            "Phone": a.user_contact,
            "Email": a.user_email,
            "Doctor": a.dr_name,
            "Date": new Date(a.appointment_datetime).toLocaleDateString(),
            "Time": new Date(a.appointment_datetime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }),
            "Status": a.status,
            "Notes": a.notes,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");
        XLSX.writeFile(workbook, "appointments.xlsx");
    };

    // Export data in pdf format
    const exportToPDF = () => {
        const doc = new jsPDF("landscape"); // landscape avoids column cut
        doc.setFontSize(14);
        doc.text("Appointments Report", 14, 15);

        const tableColumn = [
            "Sr No",
            "Patient Name",
            "Doctor",
            "Date",
            "Time",
            "Status",
        ];

        const tableRows = filteredAppointments.map((a, index) => [
            index + 1,
            a.user_name,
            a.dr_name,
            new Date(a.appointment_datetime).toLocaleDateString("en-IN"),
            new Date(a.appointment_datetime).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }),
            a.status,
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 25,
            theme: "grid",
            styles: {
                fontSize: 9,
            },
            headStyles: {
                fillColor: [22, 160, 133],
            },
        });
        doc.save("appointments.pdf");
    };

    const editAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setChangeView('edit');
    };

    // Edit form submit
    const handleUpdate = async (e) => {
        e.preventDefault();
        const id = selectedAppointment.appointment_id;
        const updateData = {
            appointment_date: selectedAppointment.appointment_date,
            appointment_time: selectedAppointment.appointment_time,
            status: selectedAppointment.status,
            notes: selectedAppointment.notes,
        };

        try {
            await adminAxios.put(`/updateAppointment/${id}`, updateData);

            toastSuccess("Appointment updated successfully!");

            const res = await adminAxios.get("/appointments");

            setAppointments(res.data);
            setChangeView("list");
            setSelectedAppointment(null);
        } catch (err) {
            console.error(err);
            toastError("Failed to update appointment.");
        }
    };

    // Time
    // 24 → 12 hour
    const simpleTime = (time) => {
        if (!time) return "";
        let [hour, minute] = time.split(":");
        hour = parseInt(hour);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${minute} ${ampm}`;
    };

    return (
        <>
            {changeView === 'list' && (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="col-12">
                                <h1 className="ml-5 mt-5">Appointments</h1>
                                <div className="ml-5 mb-3" style={{ color: "red", width: "50px", height: "1px", borderBottom: "4px solid red" }}></div>
                            </div>
                            <ul>
                                <li className="d-inline-block ml-3">Home</li>
                                <li className="d-inline-block ml-3"><i class="fa-solid fa-chevron-right"></i></li>
                                <li className="d-inline-block ml-3">Appointments</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Print all appointment here */}
            {changeView === 'list' && (
                <section className="bg-light p-2 ">
                    <div className="responsive-table-wrapper">

                        {/* Export data */}
                        <div className="row mb-3 justify-content-end mr-3">
                            <button className="btn btn-success mr-2" onClick={exportToExcel}>
                                Export Excel
                            </button>
                            <button className="btn btn-danger" onClick={exportToPDF}>
                                Export PDF
                            </button>
                        </div>

                        {/* search/filter boxes */}
                        <div className="container">
                            <div className="row mb-4">
                                {/*search with name,email */}
                                <div className="col-md-4">
                                    <input type="text" className="form-control" placeholder="Search patient / doctor / phone / email"
                                        value={search} onChange={(e) => setSearch(e.target.value)} />
                                </div>

                                {/*date */}
                                <div className="col-md-3">
                                    <input type="date" className="form-control" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
                                </div>

                                {/*status */}
                                <div className="col-md-3">
                                    <select className="form-control" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                        <option value="">All Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Complete">Complete</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>

                                {/* Clear Btn */}
                                <div className="col-md-2">
                                    <button className="btn btn-secondary w-100" onClick={() => {
                                        setSearch("");
                                        setFilterDate("");
                                        setFilterStatus("");
                                    }}> Clear
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Printed all appointments in table */}
                        <table className="table table-bordered table-hover responsive-table mb-0 ml-0 align-middle text-center">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>Sr.No.</th>
                                    <th>Patient Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Doctor Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map((d, i) => (
                                    <tr key={d.appointment_id}>
                                        <td>{indexOfFirstItem + i + 1}</td>
                                        <td>{d.user_name}</td>
                                        <td>{d.user_contact}</td>
                                        <td>{d.user_email}</td>
                                        <td>
                                            {new Date(d.appointment_date).toLocaleDateString()}
                                        </td>
                                        <td>
                                            {simpleTime(d.appointment_time)}
                                        </td>
                                        <td>{d.notes}</td>
                                        <td>{d.status}</td>
                                        <td>{d.dr_name}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => editAppointment(d)}>View More</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="d-flex justify-content-center mt-3">
                            <nav>
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                                            Prev
                                        </button>
                                    </li>

                                    {[...Array(totalPages)].map((_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}

                                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>
                </section>
            )}

            {changeView === 'edit' && (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="col-12">
                                <h1 className="ml-5 mt-5">Edit Appointment</h1>
                                <div className="ml-5 mb-3" style={{ color: "red", width: "50px", height: "1px", borderBottom: "4px solid red" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {changeView === "edit" && selectedAppointment && (
                <section className="container mt-4">
                    <div className="card p-4">
                        <h4 className="mb-3">Edit Appointment</h4>

                        <form onSubmit={handleUpdate}>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label>Patient Name</label>
                                    <input
                                        className="form-control"
                                        value={selectedAppointment.user_name}
                                        disabled
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label>Doctor</label>
                                    <input
                                        className="form-control"
                                        value={selectedAppointment.dr_name}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={toInputDate(selectedAppointment.appointment_date)}
                                        onChange={(e) =>
                                            setSelectedAppointment({
                                                ...selectedAppointment,
                                                appointment_date: e.target.value, // YYYY-MM-DD
                                            })
                                        }
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label>Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={selectedAppointment.appointment_time}
                                        onChange={(e) =>
                                            setSelectedAppointment({
                                                ...selectedAppointment,
                                                appointment_time: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label>Status</label>
                                    <select
                                        className="form-control"
                                        value={selectedAppointment.status}
                                        onChange={(e) =>
                                            setSelectedAppointment({
                                                ...selectedAppointment,
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Cancelled">Rejected</option>
                                        <option value="Complete">Complete</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label>Notes</label>
                                <textarea className="form-control" rows="3"
                                    value={selectedAppointment.notes || ""}
                                    onChange={(e) =>
                                        setSelectedAppointment({
                                            ...selectedAppointment,
                                            notes: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <button className="btn btn-success me-2">Update</button>
                            <button type="button" className="btn btn-secondary ms-2"
                                onClick={() => {
                                    setChangeView("list");
                                    setSelectedAppointment(null);
                                }}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </section>
            )}

        </>
    );
}