import { testIds as signupTestIds } from "../../components/Signup/Signup";
import { testIds as feedTestIds } from "../../components/feed/Feed";
import { render } from "@testing-library/react";
import { AuthContext } from "../../context/authContext";
import Home from "../../pages/index";

describe("[PAGE] Home Page", () => {
  test("Shows login if no authenticated user", () => {
    const { getByTestId } = render(<Home />);

    getByTestId(signupTestIds.signupPage);
  });

  test("Shows feed if authenticated user", () => {
    const { getByTestId } = render(
      <AuthContext.Provider
        value={{ user: { email: "emailer@emailer.com" } as any }}
      >
        <Home />
      </AuthContext.Provider>
    );

    getByTestId(feedTestIds.feedPage);
  });
});
