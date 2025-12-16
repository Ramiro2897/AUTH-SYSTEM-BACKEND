import { Response } from "express";

export const setSessionCookie = (
  res: Response,
  token: string
) => {
  res.cookie("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};
