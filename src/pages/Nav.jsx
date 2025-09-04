import React from "react";
import './Style.css'
export default function Nav()
{
    return(
        <>
            <div className="container-fluid color_format_back d-none d-md-block">
                <div className="row">
                    <div className="col-md-8">
                        <ul>
                            <li className="d-inline-block ml-2 mt-2 text-white"><i className="fa-solid fa-envelope mr-1"></i> vinayakhospitalcashless@gmail.com</li>
                            <li className="d-inline-block ml-2 mt-2 text-white"><i className="fa-solid fa-phone mr-1"></i> Call: 0000 000 0123</li>
                            <li className="d-inline-block ml-2 mt-2 text-white"><i className="fa-solid fa-clock mr-1"></i> Emergency 24 X 7</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul>
                            <li className="d-inline-block ml-4 mt-2 text-white">Marathi | English</li>
                            <li className="d-inline-block ml-4 mt-2 text-white"><i className="fa fa-facebook"></i></li>
                            <li className="d-inline-block ml-4 mt-2 text-white"><i className="fa fa-twitter"></i></li>
                            <li className="d-inline-block ml-4 mt-2 text-white"><i className="fa fa-youtube"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-md-3">
                        <img src="./images/logo.png" className="w-100 mt-0" alt="" />
                    </div>
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-lg color_format_back mt-3 text-white">Appointment</button>
                    </div>
                </div>
            </div>
        </>
    )
}