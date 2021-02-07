import styles from "../../styles/modules/MobileSideMenu.module.scss";

function MobileSideMenu({ toggleNav }: { toggleNav: () => void }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles["sidebar-backdrop"]} />
      <div>
        <div className={styles["sidebar-panel"]}>
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
