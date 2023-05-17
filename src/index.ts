import "reflect-metadata";

import os from "os";
import dotenv from "dotenv";
import * as http from "http";

import app from "./app";
import { Database } from "./typeorm/dbConnection";

dotenv.config({ path: "../.env " });

// libuv's threadpool have a default of 4 threads for async operations so we are changing it based on cpu cores
process.env.UV_THREADPOOL_SIZE = String(os.cpus().length);

const main = async () => {
  const PORT = process.env.PORT;

  // init database
  const database = new Database();
  const conn = await database.getConnection("default");

  const server = http.createServer(app);

  server.listen(PORT, async () => {
    console.info(`listening on port ${PORT}`);
  });

  server.on("error", async (err) => {
    if (err) {
      console.error("Server crashed while listening", err);
      await conn.close();
      throw err;
    }
  });

  server.on("close", async () => {
    console.warn("Closing server connection");
    await conn.close();
  });

  async function commonErrorHandler(err) {
    console.warn("SOMETHING BROKE!!");
    console.error(err);
    if (conn) {
      await conn.close();
      console.info("DB Connection Closed!!");
    }

    process.exit(0);
  }

  process.on("SIGINT", commonErrorHandler);
  process.on("unhandledRejection", commonErrorHandler);
  process.on("uncaughtException", commonErrorHandler);

  process.on("exit", async () => {
    console.warn("Process exit detected!!");

    // flush amplitude client
  });
};

(async () => {
  await main();
})();
