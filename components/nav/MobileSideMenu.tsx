import { useEffect, useRef } from "react";
import styles from "../../styles/modules/MobileSideMenu.module.scss";

function MobileSideMenu({
  mobileNavOpen,
  toggleNav,
}: {
  mobileNavOpen: boolean;
  toggleNav: () => void;
}) {
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (navRef.current && !(navRef.current as any).contains(event.target)) {
        toggleNav();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  return (
    <div className={styles.sidebar}>
      <div className={mobileNavOpen ? styles["sidebar-backdrop"] : ""} />
      <div
        className={`${styles.slide} ${
          mobileNavOpen ? styles.slideIn : styles.slideOut
        }`}
      >
        <div className={styles["sidebar-panel"]} ref={navRef}>
          <ul>
            <li>test1</li>
            <li>test2</li>
            <li>test3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MobileSideMenu;
