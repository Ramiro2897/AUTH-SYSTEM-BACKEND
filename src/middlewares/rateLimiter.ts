import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import type { Request } from "express";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  keyGenerator: (req: Request) => {
    const xf = req.headers["x-forwarded-for"];
    if (xf && typeof xf === "string") {
      // toma la primera IP de la cabecera
      return ipKeyGenerator({ ip: xf.split(",")[0].trim() } as any);
    }
    // si no hay X-Forwarded-For, usa req.ip forzado a string
    return ipKeyGenerator({ ip: String(req.ip ?? "unknown") } as any);
  },
  message: {
    errors: { general: "Demasiados intentos, prueba más tarde." }
  },
  standardHeaders: true,
  legacyHeaders: false,
});
