import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    errors: {
      general: "Demasiados intentos, prueba más tarde."
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
});

