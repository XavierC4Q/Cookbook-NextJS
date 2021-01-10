import initializeDatabase from "../../db/initDB";
import handleSignIn from "../../pages/api/auth/handleSignIn";
import { createMocks } from "node-mocks-http";
import User from "../../entity/User";

const mockCreds = {
  id: 999,
  email: "testuser2@email.com",
  password: "fakepassword",
};

jest.mock("bcryptjs", () => ({
  compareSync: jest.fn(() => true),
}));

beforeAll(async () => {
  const connection = await initializeDatabase();
  const userRepository = connection.getRepository(User);
  const mockUser = userRepository.create(mockCreds);
  await userRepository.save(mockUser);
  await connection.close();
});

afterAll(async () => {
  const connection = await initializeDatabase();
  await connection.dropDatabase();
  await connection.close();
});

describe("/api/auth/handleSignIn", () => {
  test("can signin an existing user", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: mockCreds,
    });

    await handleSignIn(req, res);

    expect(res._getStatusCode()).toBe(200);
  });
});