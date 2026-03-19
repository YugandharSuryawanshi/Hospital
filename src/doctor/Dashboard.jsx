import { useEffect, useState } from "react";
import { FaCalendarCheck, FaCheckCircle, FaClock, FaUserInjured } from "react-icons/fa";
import AppointmentChart from "./components/AppointmentChart";
import RecentAppointments from "./components/RecentAppointments";
import RevenueChart from "./components/RevenueChart";
import StatCard from "./components/StatCard";
import GenderChart from "./components/GenderChart";
import doctorAxios from "./doctorAxios";

export default function Dashboard() {

    const [stats, setStats] = useState({});
    const [chart, setChart] = useState([]);
    const [revenue, setRevenue] = useState([]);
    const [recent, setRecent] = useState([]);
    const [genderData, setGenderData] = useState([]);

    const getDoctorStats = (doctorId) => {
        return doctorAxios.get(`/stats/${doctorId}`);
    };
    const getAppointmentChart = (doctorId) => {
        return doctorAxios.get(`/appointments-week/${doctorId}`);
    };
    const getRevenueChart = (doctorId) => {
        return doctorAxios.get(`/revenue/${doctorId}`);
    };
    const getRecentAppointments = (doctorId) => {
        return doctorAxios.get(`/recent/${doctorId}`);
    };
    const getGenderChart = (doctorId) => {
        return doctorAxios.get(`/gender/${doctorId}`);
    };

    useEffect(() => {
        loadDashboard();
    }, [])

    const loadDashboard = async () => {

        const doctorRes = await doctorAxios.get("/getDoctorID");

        const doctorId = doctorRes.data.doctor_id;

        const statsRes = await getDoctorStats(doctorId);
        setStats(statsRes.data);

        const chartRes = await getAppointmentChart(doctorId);
        setChart(chartRes.data);

        const revenueRes = await getRevenueChart(doctorId);
        setRevenue(revenueRes.data);

        const recentRes = await getRecentAppointments(doctorId);
        setRecent(recentRes.data);

        const genderRes = await getGenderChart(doctorId);
        setGenderData(genderRes.data);
    }

    return (

        <div className="container-fluid">

            <div className="row mb-4">

                <StatCard
                    title="Total Patients"
                    value={stats.totalPatients}
                    icon={<FaUserInjured />}
                    color="blue"
                />

                <StatCard
                    title="Today Appointments"
                    value={stats.todayAppointments}
                    icon={<FaCalendarCheck />}
                    color="green"
                />

                <StatCard
                    title="Upcoming"
                    value={stats.upcoming}
                    icon={<FaClock />}
                    color="orange"
                />

                <StatCard
                    title="Completed"
                    value={stats.completed}
                    icon={<FaCheckCircle />}
                    color="purple"
                />

            </div>

            <div className="row">

                <div className="col-md-6">
                    <AppointmentChart data={chart} />
                </div>

                <div className="col-md-6">
                    <RevenueChart data={revenue} />
                </div>

            </div>
            

            <div className="row mt-4">

                <div className="col-md-4 mb-4">
                    <GenderChart data={genderData} />
                </div>

                <div className="col-md-8">
                    <RecentAppointments appointments={recent} />
                </div>

            </div>
        </div>

    )
}