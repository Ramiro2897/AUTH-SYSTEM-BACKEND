import { Request, Response } from "express";
import { AppDataSource } from "../../config/database";
import {
  loginService,
  registerService,
  createSession,
} from "./auth.service";
import { setSessionCookie } from "../../utils/cookies";
import { getUserFromSession } from "./auth.service";
import { Session } from "../../entities/Session";

// =====================
// LOGIN
// =====================
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("llegaron los datos", email, password);

    if (!email || !password) {
      return res.status(400).json({
        errors: { general: "Datos incompletos" },
      });
    }

    const user = await loginService(email, password);

    if (!user) {
      console.log('aquiiiiii')
      return res.status(401).json({
        errors: { general: "Credenciales inválidas" },
      });
    }

    // ✅ crear sesión
    const session = await createSession(user.id);

    // ✅ setear cookie httpOnly
    setSessionCookie(res, session.refreshToken);
    console.log("✅ [LOGIN] Login exitoso");

    return res.json({
      message: "Login exitoso",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: { general: "Error interno" },
    });
  }
};

// =====================
// REGISTER
// =====================
const isStrongPassword = (password: string) => {
  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  return minLength && hasUpper && hasLower && hasNumber && hasSymbol;
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        errors: { general: "Datos incompletos" },
      });
    }

      if (!isStrongPassword(password)) {
      return res.status(400).json({
        errors: {
          general:
            "Debe incluir mayúscula, número y símbolo",
        },
      });
    }

    const user = await registerService(email, password);

    return res.status(201).json({
      message: "Usuario creado",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (e: any) {
    if (e.message === "EMAIL_EXISTS") {
      return res.status(409).json({
        errors: { general: "Email ya registrado" },
      });
    }

    console.error(e);
    return res.status(500).json({
      errors: { general: "Error interno" },
    });
  }
};

export const me = async (req: Request, res: Response) => {
  const token = req.cookies?.session;
  console.log('entro aquiiiii');
  if (!token) return res.status(401).json({ error: "No auth" });

  const user = await getUserFromSession(token);
  if (!user) return res.status(401).json({ error: "Session inválida" });

  return res.json({
    id: user.id,
    email: user.email,
  });
};

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies?.session;
  console.log('entra acaaaaa y cierra sesion');
  if (token) {
    const repo = AppDataSource.getRepository(Session);
    await repo.update({ refreshToken: token }, { revoked: true });
  }

   // Borra la cookie HTTP-only
  res.clearCookie("session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.clearCookie("session");
  return res.json({ message: "Logout OK" });
};

// refrescar la sesion
export const refreshSession = async (req: Request, res: Response) => {
  const token = req.cookies?.session;
  console.log('refresca');
  if (!token) return res.status(401).json({ error: "No session" });
  console.log('entro aqui');

  const sessionRepo = AppDataSource.getRepository(Session);
  const session = await sessionRepo.findOne({
    where: { refreshToken: token, revoked: false },
    relations: ["user"],
  });

  if (!session || session.expiresAt < new Date()) {
  console.log('entro aca');
    return res.status(401).json({ error: "Session inválida" });
  }

  // Renovar expiración de la cookie y sesión
  session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // +7 días
  await sessionRepo.save(session);

  setSessionCookie(res, session.refreshToken);

  return res.json({ user: session.user });
};


