import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../../.env") });

export default {
  type: "mysql",
  ...{
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  },
  legacySpatialSupport: false,
  synchronize: false,
  logging: false,
  entities: [
    path.join(__dirname, "../entity/**/*.ts"),
    path.join(__dirname, "../entity/**/*.js"),
  ],
  migrations: [path.join(__dirname, "../migrations/**/*.ts")],
  cli: {
    entitiesDir: "src/typeorm/entity",
    migrationsDir: "src/typeorm/migrations",
  },
  extra: {
    connectionLimit: 5,
  },
};
