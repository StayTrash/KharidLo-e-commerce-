// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import cors from 'cors';

// Utiles
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "https://kharidlo-b4cd.onrender.com",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
// For production (Render), serve from backend/uploads. For local dev, use frontend/uploads
// On Render, __dirname is project root, so backend/uploads is correct
const uploadsPath = process.env.NODE_ENV === 'production'
  ? path.join(__dirname, "backend", "uploads")
  : path.join(__dirname, "frontend", "uploads");
app.use("/uploads", express.static(uploadsPath));

app.listen(port, () => console.log(`Server running on port: ${port}`));
