import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";

// .env dosyasını yükle
dotenv.config();

// Express uygulaması
const app = express();

// Ortam değişkenlerinden PORT ve MONGO_URI'yi al
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI as string;

// Middleware'ler
app.use(cors());
app.use(express.json());

// Routes
app.use("/", todoRoutes);

// MongoDB bağlantısı ve sunucunun başlatılması
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
