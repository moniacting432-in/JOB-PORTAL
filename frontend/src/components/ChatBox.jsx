import React, { useState, useEffect } from "react";

import io from "socket.io-client";

// Connect to your backend server
const socket = io("http://localhost:8000", {
  withCredentials: true
});

const ChatBox = ({ username , roomId}) => {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
    useEffect(() => {
    console.log("👤 username:", username);
    console.log("📦 roomId:", roomId);
  }, []);

  useEffect(() => {
    // Join the room when component mounts
    socket.emit("joinRoom", { roomId });
    socket.on("loadMessages", (messages) => {
    setChat(messages);
  });

    // Listen for messages
    socket.on("receiveMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim()) {
      const msgData = {
        sender: username,
        text: message,
        time: new Date().toLocaleTimeString()
      };
      
    console.log("Sending message:", msgData); // 🟡 Add this line

      // Emit the message to server
      socket.emit("sendMessage", { roomId, message: msgData });

      // Also show it immediately in UI
      setChat((prev) => [...prev, msgData]);
      setMessage("");
    }
  };

  return (
  <div style={{
  position: "fixed",
  bottom: "20px",
  right: "20px",
  width: "320px",
  fontFamily: "Arial",
  border: "1px solid #ccc",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  padding: "10px",
  backgroundColor: "#fff",
  zIndex: 1000
}}>

      <h2>Chat Room: {roomId}</h2>
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px"
        }}
      >
        {chat.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}</strong>: {msg.text}{" "}
            <small style={{ fontSize: "0.7em", color: "gray" }}>
              ({msg.time})
            </small>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        placeholder="Type message"
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "70%", padding: "5px" }}
      />
      <button onClick={sendMessage} style={{ padding: "5px 10px" }}>
        Send
      </button>
    </div>
  );
};

export default ChatBox;
