import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";

const app = express();
app.set("trust proxy", 1);

// Middlewares
app.use(cors({
  origin: [
    "http://localhost:5173", // frontend local
    "https://auth-system-frontend-beige.vercel.app" // frontend en Vercel
  ],
  credentials: true, // permite cookies
}));

app.use(express.json());
app.use(cookieParser());

// Rutas base (aún vacías)
app.get("/", (req, res) => res.send("API funcionando"));
app.use("/auth", authRoutes);

export default app;
