import styles from "../styles/modules/Home.module.scss";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import Feed from "../components/feed/Feed";
import Signup from "../components/Signup/Signup";

export default function Home() {
  const { user } = useContext(AuthContext);
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
