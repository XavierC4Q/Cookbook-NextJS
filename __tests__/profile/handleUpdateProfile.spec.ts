import handleUpdateProfile from "../../pages/api/profile/handleUpdateProfile";
import { createMocks } from "node-mocks-http";
import initializeDatabase from "../../db/initDB";
import { getRepository } from "typeorm";
import Profile from "../../entity/Profile";
import User from "../../entity/User";

let PROFILE_ID: string;

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(() => ({
    email: "test@email.com",
    id: 1,
  })),
}));

beforeAll(async () => {
  const connection = await initializeDatabase();
  const profileRepository = getRepository(Profile);
  const userRepository = getRepository(User);

  const newProfile = new Profile();
  newProfile.firstName = "Test";
  newProfile.lastName = "User";
  PROFILE_ID = newProfile.id;
  await profileRepository.save(newProfile);

  const newUser = new User();
  newUser.email = "test@email.com";
  newUser.password = "password";
  newUser.profile = newProfile;
  await userRepository.save(newUser);

  await connection.close();
});

afterAll(async () => {
  const connection = await initializeDatabase();
  await connection.dropDatabase();
  await connection.close();
});

describe("/api/profile/handleUpdateProfile", () => {
  test("can update a user profile", async () => {
    const { req, res } = createMocks({
      method: "PATCH",
      body: {
        id: PROFILE_ID,
        displayName: "TestUser1",
        lastName: "Lastname",
      },
      headers: {
        authorization: `faketoken`,
      },
    });

    await handleUpdateProfile(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});
