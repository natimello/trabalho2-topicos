import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql", // Altera o tipo de banco de dados para MySQL
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"), // A porta padrão do MySQL é 3306
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "orm",
  synchronize: true,
  logging: false,
  entities: [__dirname + "/models/**/*.{js,ts}"],
  migrations: [__dirname + "/migrations/**/*.{js,ts}"],
  subscribers: [],
});
