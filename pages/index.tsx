import styles from "../styles/modules/Home.module.scss";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import Feed from "../components/feed/Feed";
import Signup from "../components/Signup/Signup";
import { Dimmer, Loader } from "semantic-ui-react";

export default function Home() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Dimmer active>
      <Loader>Loading your feed</Loader>
    </Dimmer>
  }
  return (
    <div className={styles.container}>
      {user && <Feed />}
      {!user && (
        <div className={styles.homePage}>
          <div className={styles.welcome}>
            <h2>Welcome to CookbookXJM</h2>
          </div>
          <Signup />
        </div>
      )}
    </div>
  );
}
