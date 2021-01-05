import React from "react";
import getTestIDs from "../utils/getTestId";
import { AuthUser } from "../context/authContext";

interface IProps {
  user: AuthUser | null;
}

export const signinTestIds = getTestIDs();

function SignIn({ user }: IProps) {
  return <div data-testid={signinTestIds.signinPage}></div>;
}

export const getInitialProps = async ({ user }: IProps) => {
  return {
    user,
  };
};

export default SignIn;
