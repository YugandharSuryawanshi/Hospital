
export default function Footer() {
    return (
        <>
            <div className="container-fluid bg-dark p-5 text-white mt-3">
                <div className="row">
                    <div className="col-md-4">
                        <img src="./images/logo.png" alt="" className="w-100" />
                        <p className="mt-2 text-justify">Wide range of medical services like diagnostic, treatment, speciality clinics, ICU units, emergency rooms & surgery.</p>
                        <h6><i className="fa-solid fa-location-dot"></i>Vinayak Chowk, Dhule <br /> Maharashtra</h6>
                        <p className="font-weight-bold"><i className="fa-solid fa-phone-flip"></i> 0000 000 0123</p>
                        <p className="font-weight-bold"><i className="fa-solid fa-envelope"></i> vinayakhospitalcashless@gmail.com</p>
                    </div>
                    <div className="col-md-2">
                        <h2>Quick Links</h2>
                        <h6 className="mt-4">Home</h6>
                        <h6 className="mt-4">Facilities</h6>
                        <h6 className="mt-4">Doctors</h6>
                        <h6 className="mt-4">Cashless</h6>
                        <h6 className="mt-4">Contact Us</h6>
                    </div>
                    <div className="col-md-2">
                        <h2>Facilities</h2>
                        <h6 className="mt-4">Cashless Facilities</h6>
                        <h6 className="mt-4">Cath Lab</h6>
                        <h6 className="mt-4">Cauallty</h6>
                        <h6 className="mt-4">2D Echo</h6>
                        <h6 className="mt-4">ICU, Stress Test</h6>
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        <h2>Follow Us</h2>
                        <iframe
                            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fvinayakhospitalofficial%2Fposts%2F122295927938027364%2F&width=550"
                            width="100%" height="300" style={{ border: "none", overflow: "hidden" }}
                            allow="encrypted-media" title="Vinayak Hospital Facebook Post Embed">
                        </iframe>
                        <p>Developed By Yugandhar Marathe. Contact@ yugandharsuryawanshi0@gmail.com</p>

                    </div>

                </div>
            </div>
        </>
    );
}

