import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SERVER_URL } from "../utils/axiosInstance";

export const useSocket = (token) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!token) return;

    // Remove /api if present in SERVER_URL since socket.io usually runs on the root domain
    const socketUrl = SERVER_URL.replace("/api", "");
    
    const socketInstance = io(socketUrl, {
      withCredentials: true,
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected");
      // Authenticate socket after connection
      socketInstance.emit("authenticate", token);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token]);

  return socket;
};
