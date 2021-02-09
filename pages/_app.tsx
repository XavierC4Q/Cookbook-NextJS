import "reflect-metadata";
import "regenerator-runtime";
import { AppProps } from "next/dist/next-server/lib/router/router";
import "../styles/globals.scss";
import "semantic-ui-css/semantic.min.css";
import AuthProvider from "../context/authContext";
import MainNav from "../components/nav/MainNav";
import MobileSideMenu from "../components/nav/MobileSideMenu";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen);

  return (
    <AuthProvider>
      <MainNav mobileNavOpen={mobileNavOpen} toggleNav={toggleMobileNav} />
      <MobileSideMenu
        mobileNavOpen={mobileNavOpen}
        toggleNav={toggleMobileNav}
      />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
