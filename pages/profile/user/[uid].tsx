import { AuthContext } from "../../../context/authContext";
import { useContext } from "react";
import getTestIDs from "../../../utils/getTestId";
import { Header } from "semantic-ui-react";
// import { useRouter } from "next/router";

export const testIds = getTestIDs();

function UserProfile() {
  const { user, loading } = useContext(AuthContext);
  // const router = useRouter();
  // const {uid} = router.query;

  const fullName = `${user?.profile.firstName} ${user?.profile.lastName}`;
  return (
    <div data-testid={testIds.profilePage}>
      <Header size="large">{fullName}</Header>
      <Header size="medium">{user?.profile.headline}</Header>
    </div>
  );
}

export default UserProfile;
