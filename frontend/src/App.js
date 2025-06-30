import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import WeekdayTimeChart from "./WeekdayTimeChart";
import PieChartExample from "./PieChartExample";
import WaterfallChart from "./WaterfallChart";

const App = () => {
    const socketRef = useRef(null);
    const [message, setMessage] = useState("");
    const [wsMessage, setWsMessage] = useState("");

    useEffect(() => {
        // Connect to WebSocket
        const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
        const wsUrl = `${wsProtocol}://${window.location.host}`;
        const socket = io(wsUrl, { path: "/ws/socket.io" });

        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("WebSocket connected");
        });

        socket.on("server_message", (data) => {
            console.log("Server:", data);
            setWsMessage(data.data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/api/hello")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not OK");
                }
                return response.json();
            })
            .then((data) => setMessage(data.message))
            .catch((error) => console.error("Fetch error:", error));
    }, []);

    // Handle button click
    const sendMessage = () => {
        if (socketRef.current) {
            socketRef.current.emit("client_message", { data: "Hello from client!" });
            console.log("Sent: Hello from client!");
        }
    };

    return (
        <div>
            <h1>React + RESTful API + WebSocket Example</h1>
            <p>Open console to see WebSocket events.</p>
            <p>Message from Flask: {message}</p>

            <button onClick={sendMessage}>Send WebSocket Message</button>
            <p>Message from Server: {wsMessage}</p>
            <div style={{ marginTop: "20px" }}>
                <h2>Weekly Time Scatter Chart</h2>
                <WeekdayTimeChart />
            </div>
            <div style={{ marginTop: "20px" }}>
                <h2>Pie Chart Example</h2>
                <PieChartExample />
            </div>
            <div style={{ marginTop: "20px" }}>
                <h2>Waterfall Example</h2>
                <WaterfallChart />
            </div>
        </div>
    );
};

export default App;
