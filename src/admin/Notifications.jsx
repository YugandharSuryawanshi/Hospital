import { useEffect, useState } from "react";

export default function Notifications() {

    const [notifications, setNotifications] = useState([]);
    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        loadNotifications();
        markAsRead();
    }, []);

    const loadNotifications = async () => {
        const res = await fetch(
            "http://localhost:4000/api/admin/notifications",
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        const data = await res.json();
        setNotifications(data);
    };

    const markAsRead = async () => {
        await fetch(
            "http://localhost:4000/api/admin/notifications/mark-read",
            {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` }
            }
        );
    };

    return (
        <div>
            <h4>Notifications</h4>
            {notifications.map(n => (
                <div key={n.notification_id}
                    className={`card p-2 mb-2 ${!n.is_read ? "bg-light" : ""}`}>
                    {n.message}
                </div>
            ))}
        </div>
    );
}