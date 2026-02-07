import axios from "axios";

const adminAxios = axios.create({
    baseURL: "http://localhost:4000/api/admin",
});

adminAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
        throw new axios.Cancel("Admin token missing");
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

adminAxios.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminUser");
            window.location.href = "/admin/login";
        }
        return Promise.reject(err);
    }
);

export default adminAxios;
