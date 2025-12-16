import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Session } from "../entities/Session";
dotenv.config(); 

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false, // ⚠️ NO usar true en producción
  logging: false,
  entities: [User, Session],
  migrations: ["src/migrations/*.ts"],
});
