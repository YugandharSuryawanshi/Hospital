import React from "react";
import './Style.css'
export default function Nav()
{
    return(
        <>
            <div className="container-fluid color_format_back">
                <div className="row">
                    <div className="col-md-8">
                        <ul>
                            <li className="d-inline-block ml-2 mt-2 text-white"><i className="fa-solid fa-envelope"></i> vinayakhospitalcashless@gmail.com</li>
                            <li className="d-inline-block ml-2 mt-2 text-white"><i className="fa-solid fa-phone"></i> Call: 0000 000 0123</li>
                            <li className="d-inline-block ml-2 mt-2 text-white"><i className="fa-solid fa-clock"></i> Emergency 24 X 7</li>
                        </ul>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </>
    )
}