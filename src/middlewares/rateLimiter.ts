import express from "express";
import rateLimit from "express-rate-limit";

const app = express();

// Confía en el proxy de Render para obtener la IP real del usuario
app.set("trust proxy", 1);

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,                   // máximo 10 intentos por IP
  message: {
    errors: {
      general: "Demasiados intentos, prueba más tarde."
    }
  },
  standardHeaders: true,     // retorna info en headers RateLimit
  legacyHeaders: false,      // desactiva headers X-RateLimit
});
