import React from "react";

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem("adminUser") || "null");
    // const userid = user ? user.user_id : null; //We can print user id also or it is help to access user.
    return (
        <>
        <div className="p-4">
            <h2>Dashboard</h2>
            <p>Welcome{user ? `, ${user.user_name}` : ""}.</p>
            <p>This is the protected admin area. </p>
            <p>user Profile : {user ? user.user_profile : ""}</p>
        </div>
        </>
    );
}
