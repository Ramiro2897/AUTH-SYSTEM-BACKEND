import "reflect-metadata";
import { DataSource } from "typeorm";

const isProd = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,

  entities: isProd
    ? ["dist/entities/*.js"]
    : ["src/entities/*.ts"],

  migrations: isProd
    ? ["dist/migrations/*.js"]
    : ["src/migrations/*.ts"],
});
