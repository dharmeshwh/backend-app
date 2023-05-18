import {
  Connection,
  ConnectionOptions,
  ConnectionManager,
  createConnection,
  getConnectionManager,
} from "typeorm";
import ormConfig from "./config/ormconfig";

/**
 * Class - Database Connection Manager
 * This class manages database connections using TypeORM.
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
      // Connection already exists, reuse it
      connection = this.connectionManager.get(CONNECTION_NAME);
      if (!connection.isConnected) {
        // If the connection is not connected, establish the connection
        connection = await connection.connect();
      }
      console.info("Connection found");
    } else {
      // Create a new connection using the provided configuration or the default ormConfig
      connection = await createConnection(this.config || ormConfig);
      console.info("New DB connection made");
    }
    return connection;
  }
}
