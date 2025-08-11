import express from "express";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import Chat from "./models/chat.model.js";

dotenv.config({});

const app = express();
const server = http.createServer(app);

// ✅ Allowed origins for CORS (local + production)
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app" // ⬅ Replace with your actual Vercel URL
];

// ✅ Socket.IO instance with CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ✅ Socket.IO events
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("joinRoom", async ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    try {
      const messages = await Chat.find({ roomId }).sort({ createdAt: 1 });
      socket.emit("loadMessages", messages);
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  });

  socket.on("sendMessage", async ({ roomId, message }) => {
    try {
      const chat = new Chat({ ...message, roomId });
      await chat.save();

      io.to(roomId).emit("receiveMessage", message);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

// ✅ API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ✅ Simple health check route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// ✅ Start server only after DB connection
const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  });
