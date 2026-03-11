import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
    transports: ["websocket"],
    withCredentials: true,
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
});

export default socket;