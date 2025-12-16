import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true, // permite cookies
}));
app.use(express.json());
app.use(cookieParser());

// Rutas base (aún vacías)
app.get("/", (req, res) => res.send("API funcionando"));
app.use("/auth", authRoutes);

export default app;
