import React from "react";

const StatCard = ({ title, value, icon, color }) => {

    return (

        <div className="col-md-3">
            <div className={`card shadow border-0`}>

                <div className="card-body d-flex justify-content-between">

                    <div>
                        <h6>{title}</h6>
                        <h3>{value}</h3>
                    </div>

                    <div style={{ fontSize: "30px", color: color }}>
                        {icon}
                    </div>

                </div>
            </div>
        </div>

    )

}

export default StatCard;