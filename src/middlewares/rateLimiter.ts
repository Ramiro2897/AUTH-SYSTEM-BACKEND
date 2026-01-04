import type { Request, Response, NextFunction } from "express";

const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000; // 15 min

type AttemptInfo = {
  count: number;
  firstAttempt: number;
};

// 🔒 intentos por email (en memoria)
export const loginAttempts = new Map<string, AttemptInfo>();

export function loginLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const email = req.body?.email;
  if (!email) return next();

  const now = Date.now();
  const record = loginAttempts.get(email);

  if (!record) {
    loginAttempts.set(email, { count: 0, firstAttempt: now });
    return next();
  }

  // ⏱ ventana expirada → reset
  if (now - record.firstAttempt > WINDOW_MS) {
    loginAttempts.set(email, { count: 0, firstAttempt: now });
    return next();
  }

  // 🚫 bloqueado
  if (record.count >= MAX_ATTEMPTS) {
    return res.status(429).json({
      errors: { general: "Demasiados intentos, prueba más tarde." },
    });
  }

  next();
}
