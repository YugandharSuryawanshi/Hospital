import axios from "axios";

const paymentAxios = axios.create({
    baseURL: "http://localhost:4000/api/payments",
});

paymentAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

paymentAxios.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
            localStorage.removeItem("userToken");
            localStorage.removeItem("userUser");
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);

export default paymentAxios;
