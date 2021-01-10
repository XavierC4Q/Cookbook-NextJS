import handleUpdateProfile from "../../pages/api/profile/handleUpdateProfile";
import { createMocks } from "node-mocks-http";
import initializeDatabase from "../../db/initDB";
import Profile from "../../entity/Profile";
import User from "../../entity/User";

const PROFILE_ID = 1;

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(() => ({
    email: "test@email.com",
    id: PROFILE_ID,
  })),
}));

beforeAll(async () => {
  const connection = await initializeDatabase();
  const profileRepository = connection.getRepository(Profile);
  const userRepository = connection.getRepository(User);

  const newProfile = new Profile();
  newProfile.firstName = "Test";
  newProfile.lastName = "User";
  await profileRepository.save(newProfile);
  const newUser = new User();
  newUser.email = "test@email.com";
  newUser.password = "password";
  newUser.profile = newProfile;
  await userRepository.save(newUser);

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
