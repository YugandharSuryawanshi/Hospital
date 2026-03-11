export default function DoctorProfileCard({ doctor }) {

    if (!doctor) return null;

    return (
        <div className="card mb-4 shadow">
            <div className="card-body d-flex align-items-center">

                <img
                    src={`http://localhost:4000/uploads/${doctor.dr_photo}`}
                    alt="doctor"
                    style={{ width: 100, height: 100, borderRadius: "50%" }}
                />

                <div className="ms-3">
                    <h4>{doctor.dr_name}</h4>
                    <p className="mb-1">{doctor.dr_position}</p>
                    <small>{doctor.dr_speciality}</small>

                    <div className="mt-2">
                        <span className="badge bg-success me-2">
                            Experience: {doctor.dr_experience} Years
                        </span>

                        <span className="badge bg-primary">
                            Fee: ₹{doctor.dr_fee}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}