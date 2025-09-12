import React from "react";
export default function ContactUs() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0 doctor_page_banner">
                        <h1 className="ml-5 mt-5">Contact Us</h1>
                        <ul>
                            <li className="d-inline-block ml-3">Home</li>
                            <li className="d-inline-block ml-3"><i class="fa-solid fa-chevron-right"></i></li>
                            <li className="d-inline-block ml-3">Contact Us</li>
                        </ul>
                    </div>
                </div>
            </div>
            <section className="bg-light">
                <div className="container pt-5 pb-5">
                    <div className="row">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59642.57188010298!2d74.72266103099992!3d20.88572026614832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdec5f2c571bb47%3A0x5827ae11b9d7cb1c!2sDhule%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1757091235023!5m2!1sen!2sin" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="map"></iframe>
                    </div>
                    <div className="row mt-4 mb-4">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-12">
                                    <h2>Leave Us Message</h2>
                                    <div style={{ color: "red", width: "50px", height: "1px", borderBottom: "4px solid red" }}></div>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <input type="text" placeholder="First Name*...." className="form-control" />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <input type="text" placeholder="Last Name*...." className="form-control" />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <input type="text" placeholder="Email*...." className="form-control" />
                                </div>
                                <div className="col-md-6 mt-3">
                                    <input type="text" placeholder="Phone*...." className="form-control" />
                                </div>
                                <div className="col-12 mt-3">
                                    <select name="state" id="">
                                        <option>Choose Dr.</option>
                                        <option value="">Dr. Vinayak Murti</option>
                                        <option value="">Dr. Isha Patel</option>
                                    </select>
                                </div>
                                <div className="col-12 mt-3">
                                    <textarea name="" id="" className="form-control" rows={5} placeholder="Message*...."></textarea>
                                </div>
                                <div className="col-12 mt-3">
                                    <button className="btn btn-primary btn-lg">Send Message</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-4">
                            <h2>Address</h2>
                            <ul type="none" className="pl-0">
                                <li className="mt-4 font-weight-bold"><i class="text-primary fa-solid fa-location-dot"></i> Vinayak Chowk Dhule, Maharashtra 424302</li>
                                <li className="mt-4 font-weight-bold"><i class="text-primary fa-solid fa-envelope"></i> vinayakhospitalcashless@gmail.com</li>
                                <li className="mt-4 font-weight-bold"><i class="text-primary fa-solid fa-phone"></i> 02562-XXXXXXX, 0000000, 1234567</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

