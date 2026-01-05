import { Response } from "express";

export const setSessionCookie = (res: Response, token: string) => {
  res.cookie("session", token, {
    httpOnly: true,
    secure: true,        // 🔥 SIEMPRE true en prod
    sameSite: "none",    // 🔥 CLAVE para Vercel + Render
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};
