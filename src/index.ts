import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config(); // ✅ SIEMPRE primero

import { AppDataSource } from "./config/database";
import app from "./app";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("✅ Base de datos conectada");

    if (process.env.RUN_MIGRATIONS === "true") {
      await AppDataSource.runMigrations();
      console.log("✅ Migraciones ejecutadas con éxito");
    }

    app.listen(PORT, () =>
      console.log(`🚀 Server corriendo en puerto ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Error DB:", err);
  });

