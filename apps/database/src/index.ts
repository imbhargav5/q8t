export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
}

export function createDatabaseConnection(config: DatabaseConfig): void {
  console.log(`Connecting to database at ${config.host}:${config.port}/${config.database}`);
}

export default {
  createDatabaseConnection,
};
