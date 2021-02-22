import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import User from "../entity/User";
import Profile from "../entity/Profile";
import Recipe from "../entity/Recipe";

export const initializeDatabase = async (
  optionOverrides: Record<string, any> = {}
): Promise<Connection> => {
  const isTestEnv = process.env.NODE_ENV === "test";
  const database = isTestEnv ? process.env.DB_NAME_TEST : process.env.DB_NAME;

  const options: any = {
    type: "postgres",
    host: "localhost",
    port: "5432",
    username: "postgres",
    password: "9!october",
    synchronize: true,
    logging: false,
    database,
    entities: [User, Profile, Recipe],
    name: isTestEnv ? "test" : "default",
    ...optionOverrides,
  };

  const connection = await createConnection(options);

  return connection;
};

export default initializeDatabase;
