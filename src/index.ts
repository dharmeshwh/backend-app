import "reflect-metadata";

import dotenv from "dotenv";
import * as http from "http";

import app from "./app";
import { Database } from "./typeorm/dbConnection";

dotenv.config({ path: "../.env " });

const main = async () => {
  const PORT = process.env.PORT;

  // init database
  const database = new Database();
  const conn = await database.getConnection("default");

  const server = http.createServer(app);

  // Start the server
  server.listen(PORT, async () => {
    console.info(`listening on port ${PORT}`);
  });

  // Event handler for server errors
  server.on("error", async (err) => {
    if (err) {
      console.error("Server crashed while listening", err);
      await conn.close();
      throw err;
    }
  });

  // Event handler for server close
  server.on("close", async () => {
    console.warn("Closing server connection");
    await conn.close();
  });
};

main();
