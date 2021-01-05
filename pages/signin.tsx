import React, { useContext } from "react";
import getTestIDs from "../utils/getTestId";
import { AuthContext } from "../context/authContext";

export const signinTestIds = getTestIDs();

function SignIn() {
  const {user} = useContext(AuthContext);
  return <div data-testid={signinTestIds.signinPage}></div>;
}

export default SignIn;
