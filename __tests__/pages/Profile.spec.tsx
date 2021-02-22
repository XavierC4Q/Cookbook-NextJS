import { render } from "@testing-library/react";
import UserProfile, {
  testIds as profileTestIds,
} from "../../pages/profile/user";
import { AuthContext } from "../../context/authContext";
import { AuthUser } from "../../types";
import initializeDatabase from "../../db/initDB";
import User from "../../entity/User";
import Profile from "../../entity/Profile";

let USER: AuthUser | null = null;
let UserProfileComponent = UserProfile as () => JSX.Element;

beforeAll(async () => {
  const connection = await initializeDatabase();
  const profileRepository = connection.getRepository(Profile);
  const userRepository = connection.getRepository(User);

  const newProfile = new Profile();
  newProfile.firstName = "Profile";
  newProfile.lastName = "Page";
  newProfile.headline = 'I am the Profile Page';
  newProfile.description = 'A description';
  await profileRepository.save(newProfile);
  const newUser = new User();
  newUser.email = "profile@email.com";
  newUser.password = "password";
  newUser.profile = newProfile;
  await userRepository.save(newUser);
  USER = newUser;
  await connection.close();
});

describe("[PAGE] Profile Page", () => {
  test("Renders the profile page", () => {
    const { getByTestId, debug } = render(
      <AuthContext.Provider
        value={{
          user: USER,
        }}
      >
        <UserProfileComponent />
      </AuthContext.Provider>
    );

    getByTestId(profileTestIds.profilePage);
    debug();
  });
});
