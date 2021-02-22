import { AuthContext } from "../../context/authContext";
import { useContext, useEffect } from "react";
import getTestIDs from "../../utils/getTestId";
import { Header } from "semantic-ui-react";
import { useRouter } from "next/router";

export const testIds = getTestIDs();

function UserProfile() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/');
    }
  }, [user, loading])

  const fullName = `${user?.profile.firstName} ${user?.profile.lastName}`;
  return (
    <div data-testid={testIds.profilePage}>
      <Header size="large">{fullName}</Header>
      <Header size="medium">{user?.profile.headline}</Header>
    </div>
  );
}

export default UserProfile;
