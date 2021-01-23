import "reflect-metadata";
import "regenerator-runtime";
import { AppProps } from "next/dist/next-server/lib/router/router";
import "../styles/globals.scss";
import AuthProvider from "../context/authContext";
import MainNav from "../components/nav/MainNav";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MainNav />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
