import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/modules/MainNav.module.scss";

function MainNav({
  mobileNavOpen,
  toggleNav,
}: {
  mobileNavOpen: boolean;
  toggleNav: () => void;
}) {
  const router = useRouter();

  const DesktopNav = () => (
    <nav className={styles.navDesktop}>
      <Image
        src="/images/icons/icon-chef-hat.svg"
        className={styles.navHomeImg}
        layout="fill"
        onClick={() => router.replace("/")}
      />
      <div className={styles.navDesktopLinks}>
        <ul>
          <Link href="/profile/user/">Profile</Link>
        </ul>
      </div>
    </nav>
  );

  const MobileNav = () => (
    <nav className={styles.navMobile}>
      <Image
        src="/images/icons/icon-chef-hat.svg"
        className={styles.navHomeImg}
        layout="fill"
        onClick={() => router.replace("/")}
      />
      <div
        id={styles.burger}
        className={mobileNavOpen ? styles.active : ""}
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
