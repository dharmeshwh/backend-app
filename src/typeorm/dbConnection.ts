import {
  Connection,
  ConnectionOptions,
  ConnectionManager,
  createConnection,
  getConnectionManager,
} from "typeorm";
import ormConfig from "./config/ormconfig";

/**
 * Class - Manage database connections
 *
 */

export class Database {
  private connectionManager: ConnectionManager;
  private config: any;

  constructor(config?: ConnectionOptions) {
    this.connectionManager = getConnectionManager();
    this.config = config;
  }

  public async getConnection(name: string): Promise<Connection> {
    const CONNECTION_NAME: string = name;
    let connection: Connection;
    const hasConnection = this.connectionManager.has(CONNECTION_NAME);
    if (hasConnection) {
      connection = this.connectionManager.get(CONNECTION_NAME);
      if (!connection.isConnected) {
        connection = await connection.connect();
      }
      console.info("Connection found");
    } else {
      connection = await createConnection(this.config || ormConfig);
      console.info("New DB connection made");
    }
    return connection;
  }
}
