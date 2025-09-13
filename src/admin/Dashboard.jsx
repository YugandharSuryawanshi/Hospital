import React from "react";

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem("adminUser") || "null");
    return (
        <>
        <h1 className="text-center text-danger mt-5" style={{fontSize:"150px"}}>
            <i class="fa fa-home"></i>Dashboard
        </h1>
        <p>Welcome... {user ? `, ${user.user_name}` : ""}.</p>
        </>
    );
}
