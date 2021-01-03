import "reflect-metadata";
import { Connection, createConnection, getConnectionOptions } from "typeorm";

export const initializeDatabase = async (
  optionOverrides: Record<string, any> = {}
): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions();
  const isTestEnv = process.env.NODE_ENV === "test";
  const database = isTestEnv ? process.env.DB_NAME_TEST : process.env.DB_NAME;

  const options: any = {
    ...connectionOptions,
    database,
    ...optionOverrides,
    name: isTestEnv ? "test" : "default"
  };

  const connection = await createConnection(options);

  return connection;
};

export default initializeDatabase;
