import handleGetUserProfile from "../../pages/api/profile/handleGetUserProfile/[uid]";
import { createMocks } from "node-mocks-http";
import initializeDatabase from "../../db/initDB";
import Profile from "../../entity/Profile";
import User from "../../entity/User";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(() => ({
    email: "test@email.com",
    id: 201,
  })),
}));

let UID: number;

const MOCK_PROFILE = {
  firstName: "Cooker",
  lastName: "Booker",
  email: "mailmail@mail.com",
  password: "password",
};

beforeAll(async () => {
  const connection = await initializeDatabase();
  const profileRepository = connection.getRepository(Profile);
  const userRepository = connection.getRepository(User);

  const newProfile = new Profile();
  newProfile.firstName = MOCK_PROFILE.firstName;
  newProfile.lastName = MOCK_PROFILE.lastName;
  await profileRepository.save(newProfile);

  const newUser = new User();
  newUser.email = MOCK_PROFILE.email;
  newUser.password = MOCK_PROFILE.password;
  newUser.profile = newProfile;
  await userRepository.save(newUser);

  UID = newUser.id;
  await connection.close();
});

afterAll(async () => {
  const connection = await initializeDatabase();
  await connection.dropDatabase();
  await connection.close();
});

describe("[API] handleGetUserProfile", () => {
  test("Gets an existing user by uid", async () => {
    const { req, res } = createMocks({
      method: "GET",
      headers: {
        authorization: "Bearer authorized",
      },
      query: {
        uid: UID,
      },
    });
    await handleGetUserProfile(req, res);

    expect(res._getStatusCode()).toBe(200);
    const { data } = res._getJSONData();

    expect(data.id).toEqual(UID);
    expect(data.email).toEqual(MOCK_PROFILE.email);
    expect(data.profile.firstName).toEqual(MOCK_PROFILE.firstName);
    expect(data.profile.lastName).toEqual(MOCK_PROFILE.lastName);
  });
});
