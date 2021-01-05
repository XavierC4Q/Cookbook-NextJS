import SignIn, { signinTestIds } from "../../pages/signin";
import { render } from "@testing-library/react";

describe("[PAGE] signin page", () => {
  test("renders the signin", () => {
    const { getByTestId } = render(<SignIn />);
    getByTestId(signinTestIds.signinPage);
  });
});
