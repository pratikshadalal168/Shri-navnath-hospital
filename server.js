import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.APP_URL || "http://localhost:3000",
  credentials: true
}));

// Database Connection with Lazy Init
let isDbConnected = false;
async function connectDB() {
  if (isDbConnected) return;
  
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("MONGODB_URI not found in environment variables. Database features will be disabled.");
    return;
  }

  try {
    await mongoose.connect(uri);
    isDbConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Import Routes
import apiRoutes from "./src/server/routes.js";

// API Routes
app.use("/api", apiRoutes);

// Vite middleware for development
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

// Start Server
async function start() {
  await connectDB();
  await setupVite();
  
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

start().catch(err => {
  console.error("Failed to start server:", err);
});
