import "reflect-metadata";
import "regenerator-runtime";
import { AppProps } from "next/dist/next-server/lib/router/router";
import "../styles/globals.scss";
import AuthProvider from "../context/authContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
