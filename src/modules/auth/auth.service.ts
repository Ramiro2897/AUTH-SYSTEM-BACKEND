import { AppDataSource } from "../../config/database";
import { User } from "../../entities/User";
import { comparePassword, hashPassword } from "../../utils/password";
import { Session } from "../../entities/Session";
import { randomUUID } from "crypto";


export const loginService = async (email: string, password: string) => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({ where: { email } });
  if (!user) return null;

  const isValid = await comparePassword(password, user.passwordHash);
  if (!isValid) return null;

  return user;
};

export const registerService = async (email: string, password: string) => {
  const userRepo = AppDataSource.getRepository(User);

  const exists = await userRepo.findOne({ where: { email } });
  if (exists) {
    throw new Error("EMAIL_EXISTS");
  }

  const passwordHash = await hashPassword(password);

  const user = userRepo.create({
    email,
    passwordHash,
  });

  return userRepo.save(user);
};

// registar la sesion
export const createSession = async (userId: string) => {
  const repo = AppDataSource.getRepository(Session);

  const session = repo.create({
     user: { id: userId },
    refreshToken: randomUUID(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 días
  });

  return repo.save(session);
};

export const getUserFromSession = async (token: string) => {
  const sessionRepo = AppDataSource.getRepository(Session);

  const session = await sessionRepo.findOne({
    where: { refreshToken: token, revoked: false },
    relations: ["user"],
  });

  if (!session || session.expiresAt < new Date()) return null;

  return session.user;
};
