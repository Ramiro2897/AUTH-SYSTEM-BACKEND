import express from "express";
import rateLimit from "express-rate-limit";

const app = express();
app.set("trust proxy", 1); // confía en el proxy de Render

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,                   // máximo 10 intentos por IP
  keyGenerator: (req) => {
  const xf = req.headers["x-forwarded-for"];
  if (xf && typeof xf === "string") {
    return xf.split(",")[0].trim();
  }
  // fuerza que sea string aunque req.ip sea undefined
  return String(req.ip ?? "unknown");
},
  message: {
    errors: {
      general: "Demasiados intentos, prueba más tarde."
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
});

