import React from "react";
import axios from "axios";
export default function SlidesList()
{
    return(
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 p-0">
                    <h1 className="ml-5 mt-5">Slides List</h1>
                    <ul>
                        <li className="d-inline-block ml-3">Home</li>
                        <li className="d-inline-block ml-3"><i class="fa-solid fa-chevron-right"></i></li>
                        <li className="d-inline-block ml-3">Slides List</li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}