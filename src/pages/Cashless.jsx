import React from "react";
import Nav from "./Nav.jsx";

export default function Cashless() {
    return (
        <>
            <section>
                <Nav />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 p-0 doctor_page_banner">
                            <h1 className="ml-5 mt-5">Cashless Facility</h1>
                            <ul>
                                <li className="d-inline-block ml-3">Home</li>
                                <li className="d-inline-block ml-3"><i class="fa-solid fa-chevron-right"></i></li>
                                <li className="d-inline-block ml-3">Cashless</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <section className="bg-white">
                    <div className="container mt-5 pb-5">
                        <div className="row">
                            <div className="col-md-12">
                                <h2>Cashless Facility Available</h2>
                                <div style={{ color: "red", width: "50px", height: "1px", borderBottom: "4px solid red" }}></div>
                                <table className="table table-primary table-striped bg-light mt-3 table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Star Health and Allied Insurance</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Bajaj Allianz General Insurance</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>ICICI Lombard General Insurance</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Max Bupa General Insurance</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>Reliance General Insurance</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>Apollo Munich Health Insurance</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-md-12 mt-3">
                                <h2>TPA Services</h2>
                                <div style={{ color: "red", width: "50px", height: "1px", borderBottom: "4px solid red" }}></div>
                                <table className="table table-primary table-striped bg-light mt-3 table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>MD India Health Services (TPA) Pvt. Ltd.</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Paramount Health Services (TPA) Pvt. Ltd.</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Medicare TPA Service Pvt. Ltd.</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Medi Assist India TPA Pvt. Ltd.</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>Vipul Medicorp TPA Service Pvt. Ltd.</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>Apollo Munich Health Insurance</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-md-12 mt-3">
                                <h2>Government Health Scheme Available</h2>
                                <div style={{ color: "red", width: "50px", height: "1px", borderBottom: "4px solid red" }}></div>
                                <table className="table table-primary table-striped bg-light mt-3 table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>(MJPJAY) Mahatma Jyotiba Phule Jan Arogya Yojana</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>(PMJAY) Pradhan Mantri Jan Arogya Yojana</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>(MPKAY) Maharashtra Police Kutumb Arogya Yojana</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>(MKSSKAY) Maharashtra Karagruh Sudhar Sevabai Kutumb Arogya Yojana</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>(ECHS) Ex-service Men Contributory Health Scheme</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-md-12 mt-3">
                                <h2>Pre Policy Health Checkup</h2>
                                <div style={{ color: "red", width: "50px", height: "1px", borderBottom: "4px solid red" }}></div>
                                <table className="table table-primary table-striped bg-light mt-3 table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>HDFC Life Insurance Co.</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>ICICI General Insurance Company</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Vipul Mecare Pvt. Ltd.</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Call Health</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}
