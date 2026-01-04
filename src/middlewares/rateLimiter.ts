import rateLimit from "express-rate-limit";
import type { Request } from "express";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  keyGenerator: (req: Request) => {
    const email = req.body?.email ?? "unknown";
    const key = `${req.ip}:${email}`;

    // console.log("🧩 RATE LIMIT KEY:", key);
    // console.log("📡 IP:", req.ip);
    // console.log("📨 XFF:", req.headers["x-forwarded-for"]);

    return key;
  },
  message: {
    errors: { general: "Demasiados intentos, prueba más tarde." },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

