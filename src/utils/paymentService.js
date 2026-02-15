import axios from "axios";

export const createOrder = (data) =>
    axios.post("http://localhost:4000/api/payments/create-order", data);

export const verifyPayment = (data) =>
    axios.post("http://localhost:4000/api/payments/verify", data);
