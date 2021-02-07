import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/modules/MainNav.module.scss";

function MainNav({
  mobileNavOpen,
  toggleNav,
}: {
  mobileNavOpen: boolean;
  toggleNav: () => void;
}) {
  const DesktopNav = () => (
    <nav className={styles.navDesktop}>
      <Link href="/">
        <Image
          src="/images/icons/icon-chef-hat.svg"
          className={styles.navHomeImg}
          layout="fill"
        />
      </Link>
      {/*TODO: Update to actual links later*/}
      <div className={styles.navDesktopLinks}>
        <ul>
          <Link href="/">Profile</Link>
        </ul>
      </div>
    </nav>
  );

  const MobileNav = () => (
    <nav className={styles.navMobile}>
      <Link href="/">
        <Image
          src="/images/icons/icon-chef-hat.svg"
          className={styles.navHomeImg}
          layout="fill"
        />
      </Link>
      <div
        id={styles.burger}
        className={mobileNavOpen ? styles.active : ''}
        onClick={toggleNav}
      >
        <button type="button" className={styles.burgerButton}>
          <span className={`${styles.burgerBar} ${styles.burgerBar__1}`}></span>
          <span className={`${styles.burgerBar} ${styles.burgerBar__2}`}></span>
          <span className={`${styles.burgerBar} ${styles.burgerBar__3}`}></span>
        </button>
      </div>
    </nav>
  );

  return (
    <div className={styles.container}>
      <DesktopNav />
      <MobileNav />
    </div>
  );
}

export default MainNav;
