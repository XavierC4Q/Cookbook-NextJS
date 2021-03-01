import { AuthContext } from "../../../context/authContext";
import { useContext } from "react";
import getTestIDs from "../../../utils/getTestId";
import { Header, Dimmer, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import useUser from "../../../hooks/useUser";
import NotFound from "../../../components/shared/NotFound";

export const testIds = getTestIDs();

function UserProfile() {
  const { user: currentUser } = useContext(AuthContext);
  const router = useRouter();
  const { uid } = router.query;

  const { user, isCurrentUserProfile, loading: userLoading } = useUser(
    uid as string,
    currentUser!
  );
  /**
   * Do we want to allow non-logged in users to see profiles? Maybe only a part
   * of a profile?
   */
  if (!user && !userLoading) {
    return <NotFound />;
  }

  if (userLoading) {
    return (
      <Dimmer active>
        <Loader>Loading Profile</Loader>
      </Dimmer>
    );
  }
  return (
    <div data-testid={testIds.profilePage}>
      <Header size="medium">{user!.profile.headline}</Header>
    </div>
  );
}

export default UserProfile;
