import { useEffect, useState } from "react";
import axios from "axios";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        const res = await axios.get("http://localhost:4000/api/user/notifications",
            { headers: { Authorization: `Bearer ${token}` } });
        setNotifications(res.data);

        await axios.put("http://localhost:4000/api/user/notifications/read", {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
    };

    const deleteNotification = async (id) => {
        await axios.delete(`http://localhost:4000/api/user/deleteNotification/${id}`,
            { headers: { Authorization: `Bearer ${token}` } });
        loadNotifications();
    };

    return (
        <div className="container mt-4">
            <h3 className="text-danger mb-3">Notifications</h3>

            {notifications.length === 0 ? (
                <div className="alert alert-info text-center">
                    No notifications
                </div>
            ) : (
                notifications.map(n => (
                    <div key={n.notification_id} className={`alert ${n.is_read ? "alert-light" : "alert-warning"} border`}>
                        <div className="d-flex justify-content-between align-items-start">
                            <strong>{n.title}</strong>
                            <button type="button" className="btn btn-sm btn-danger px-2 py-0"
                                onClick={() => deleteNotification(n.notification_id)}>X</button>
                        </div>
                        <p className="mb-1 mt-2">{n.message}</p>
                        <small className="text-muted">
                            {new Date(n.created_at).toLocaleString()}
                        </small>
                    </div>
                ))
            )}
        </div>
    );
}
