import React from "react";
import styles from "../../styles/MainNav.module.scss";

function MainNav() {

  return (
    <div className={styles.container}>
      <nav className={styles.navDesktop}></nav>
      <nav className={styles.navMobile}></nav>
    </div>
  );
}

export default MainNav;
