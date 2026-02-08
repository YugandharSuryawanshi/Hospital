import axios from "axios";

const doctorAxios = axios.create({
    baseURL: "http://localhost:4000/api/doctor",
});

doctorAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("doctorToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

doctorAxios.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
            localStorage.removeItem("doctorToken");
            localStorage.removeItem("doctorUser");
            window.location.href = "/doctor/login";
        }
        return Promise.reject(err);
    }
);

export default doctorAxios;