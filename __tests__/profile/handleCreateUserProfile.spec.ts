import "reflect-metadata";
import { createMocks } from "node-mocks-http";
import handleCreateUserProfile from "../../pages/api/profile/handleCreateUserProfile";
import initializeDatabase from '../../db/initDB';

const mockUserProfile = {
  firstName: "Xavier",
  lastName: "Test",
  email: "email@email.com",
  password: "passwordissecrethushhush",
};

beforeAll(async () => {
  const connection = await initializeDatabase();
  await connection.dropDatabase();
  await connection.close();
});

describe("/api/profile/handleCreateUserProfile", () => {

  test("can create a user profile", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        firstName: mockUserProfile.firstName,
        lastName: mockUserProfile.lastName,
        email: mockUserProfile.email,
        password: mockUserProfile.password,
      },
    });

    await handleCreateUserProfile(req, res);

    expect(res._getStatusCode()).toBe(201);

    const { data } = res._getJSONData();
    expect(data.user.email).toEqual(mockUserProfile.email);
  });
});
