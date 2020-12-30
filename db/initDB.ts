import "reflect-metadata";
import { Connection, createConnection, getConnectionOptions } from "typeorm";

export const initializeDatabase = async (
  optionOverrides: Record<string, any> = {}
): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions();
  const IS_TEST = process.env.NODE_ENV === "test";
  const database = IS_TEST ? process.env.DB_NAME_TEST : process.env.DB_NAME;

  const options: any = {
    ...connectionOptions,
    database,
    ...optionOverrides,
  };

  const connection = await createConnection(options);

  return connection;
};

export default initializeDatabase;
