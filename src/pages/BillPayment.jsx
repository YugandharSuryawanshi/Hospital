import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import paymentAxios from "../utils/paymentAxios";
import { toastError, toastSuccess } from "../utils/toast";
import './Style.css';
import userAxios from "./userAxios";

export default function BillPayment() {
    const navigate = useNavigate();

    const { bill_id } = useParams();
    const [bill, setBill] = useState(null);
    const [loading, setLoading] = useState(true);

    //Getting Bill details
    useEffect(() => {
        userAxios.get(`/bill/${bill_id}`).then(res => { setBill(res.data); })
            .catch(() => {
                toastError("Failed to load bill detail's.");
                navigate("/yourAppointment");
            })
            .finally(() => setLoading(false));
    }, [bill_id, navigate]);

    //Load Razorpay
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
            } else {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            }
        });
    };

    // Pay Now
    const handlePayment = async () => {
        try {
            const ok = await loadRazorpay();
            if (!ok) {
                toastError("Razorpay SDK failed Server Error..");
                return;
            }

            const { data } = await paymentAxios.post("/create-order", { bill_id });

            if (!data.success) {
                toastError("Order creation failed. Try again later..");
                return;
            }

            const options = {
                key: data.key,
                amount: data.order.amount,
                currency: data.order.currency,
                name: "Vinayak Hospital",
                description: "Bill Payment",
                order_id: data.order.id,

                handler: async function (response) {
                    try {
                        const verify = await paymentAxios.post("/verify", {
                            ...response,
                            bill_id
                        });

                        if (verify.data.success) {
                            toastSuccess("Payment successful");
                            navigate("/yourAppointment");
                        } else {
                            toastError("Verification failed");
                        }
                    } catch (err) {
                        console.log(err);
                        toastError("Verification API error");
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);

            //Payment Failed
            paymentObject.on("payment.failed", async function (response) {
                try {
                    await paymentAxios.post("/payment-failed", {
                        razorpay_order_id: response.error.metadata.order_id,
                        bill_id
                    });
                    toastError("Payment Failed. Please try again.");
                    navigate("/yourAppointment");
                } catch (err) {
                    console.log(err);
                    toastError("Failed to update payment.");
                }
            });
            paymentObject.open();
        } catch (error) {
            console.log(error);
            toastError("Payment failed");
        }
    };

    const formatTime12Hour = (time) => {
        if (!time) return "";
        const [hour, minute] = time.split(":");
        let h = parseInt(hour, 10);
        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12;
        if (h === 0) h = 12;
        return `${h}:${minute} ${ampm}`;
    };


    if (loading) return <div className="alert alert-info">Loading...</div>;
    if (!bill) return null;

    return (
        <div className="container my-5" id="receipt">
            <div className="card shadow-lg border-0">

                {/* Header Part */}
                <div className="bg-danger text-white p-4 text-center">
                    <h3 className="mb-0">Vinayak Hospital</h3>
                    <small>Health Care Receipt</small>
                </div>

                <div className="p-4">

                    {/* Bill Status. */}
                    <div className="d-flex justify-content-between mb-3">
                        <div>
                            <h5 className="mb-1">Bill ID: #{bill.bill_id}</h5>
                            <small>
                                Date: {new Date(bill.created_at).toLocaleDateString()}
                            </small>
                        </div>

                        <div>
                            <span className={`badge fs-6 ${bill.bill_status === "paid" ? "bg-success" : "bg-warning text-dark"}`}>
                                {bill.bill_status}
                            </span>
                        </div>
                    </div>

                    <hr />

                    {/* Patient Info */}
                    <h5 className="text-danger">Patient Details</h5>
                    <div className="row mb-3">
                        <div className="col-md-4"><strong>Name:</strong> {bill.patient_name}</div>
                        <div className="col-md-4"><strong>Email:</strong> {bill.patient_email}</div>
                        <div className="col-md-4"><strong>Contact:</strong> {bill.patient_contact}</div>
                    </div>

                    <hr />

                    {/* Doctor Info */}
                    <h5 className="text-danger">Doctor Details</h5>
                    <div className="row mb-3">
                        <div className="col-md-4"><strong>Name:</strong> {bill.dr_name}</div>
                        <div className="col-md-4"><strong>Speciality:</strong> {bill.dr_speciality}</div>
                        <div className="col-md-4"><strong>Contact:</strong> {bill.dr_contact}</div>
                        <div className="col-md-12"><strong>Qualification:</strong> {bill.dr_certificate}</div>
                    </div>

                    <hr />

                    {/* Appointment Details */}
                    <h5 className="text-danger">Appointment Details</h5>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <strong>Date:</strong>{" "}
                            {new Date(bill.appointment_date).toLocaleDateString()}
                        </div>
                        <div className="col-md-4">
                            <strong>Time:</strong> {formatTime12Hour(bill.appointment_time)}
                        </div>
                        <div className="col-md-4">
                            <strong>Token:</strong> {bill.token_number}
                        </div>
                        <div className="col-md-12 mt-2">
                            <strong>Notes / Symptoms: </strong> {bill.notes || "-"}
                        </div>
                    </div>

                    <hr />

                    {/* Payment Info */}
                    <h5 className="text-danger">Payment Summary</h5>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>Total</th>
                                    <th>Tax</th>
                                    <th>Discount</th>
                                    <th>Final Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>₹{bill.total_amount}</td>
                                    <td>₹{bill.tax}</td>
                                    <td>₹{bill.discount}</td>
                                    <td className="fw-bold text-danger">₹{bill.final_amount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <strong>Payment Mode:</strong> {bill.payment_mode}
                        </div>
                        <div className="col-md-6">
                            <strong>Payment Status:</strong> {bill.payment_status}
                        </div>
                    </div>

                    {/* Buttons */}
                    {bill.bill_status !== "paid" && bill.payment_mode === "online" && (
                        <button className="btn btn-danger w-100 mt-4" onClick={handlePayment}>
                            Pay Now
                        </button>
                    )}

                    <button className="btn btn-outline-secondary w-100 mt-2" onClick={() => window.print()}>
                        Print Receipt
                    </button>
                </div>
            </div>
            {/* Important Instructions for patients. */}
            <div className="mt-4 p-3 border rounded bg-light">
                <h6 className="text-danger mb-2">Important Instructions</h6>
                <ul className="mb-0 small">
                    <li>Please arrive 20–30 minutes before your appointment time.</li>
                    <li>Carry previous medical records if available.</li>
                    <li>Please carry this receipt with you and present it at the reception. Your token number will be required.</li>
                </ul>
            </div>

        </div>
    );

}
