import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import type { Request } from "express";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  keyGenerator: (req: Request) => {
    const email = req.body?.email ?? "unknown";

    // ✅ pasar string, no Request
    const ip = req.ip ?? "unknown";
    const ipKey = ipKeyGenerator(ip);

    return `${ipKey}:${email}`;
  },
  message: {
    errors: { general: "Demasiados intentos, prueba más tarde." },
  },
  standardHeaders: true,
  legacyHeaders: false,
});
