import React from "react";
import styles from "../../styles/MainNav.module.scss";
import { useMediaQuery } from "react-responsive";

function MainNav() {
  const isDesktop = useMediaQuery({ query: "(min-device-width: 762px)" });
  const isMobile = useMediaQuery({ query: "(max-device-width: 761px)" });

  return (
    <React.Fragment>
      {isDesktop && <div></div>}
      {isMobile && <div></div>}
    </React.Fragment>
  );
}

export default MainNav;
