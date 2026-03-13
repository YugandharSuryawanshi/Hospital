import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AppointmentChart = ({ data }) => {

    return (

        <div className="card shadow p-3">

            <h5>Weekly Appointments</h5>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="appointments" stroke="#f84024" />
                </LineChart>
            </ResponsiveContainer>
            
        </div>
    )
}

export default AppointmentChart;