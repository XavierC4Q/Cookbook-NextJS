import SignIn, { testIds as signinTestIds } from "../../pages/signin";
import { fireEvent, render } from "@testing-library/react";
import { AuthContext } from "../../context/authContext";

describe("[PAGE] signin page", () => {
  test("renders the signin", () => {
    const { getByTestId } = render(<SignIn />);
    getByTestId(signinTestIds.signinPage);
  });

  test("can submit successfully", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <AuthContext.Provider
        value={{
          signin: jest.fn(() => Promise.resolve(true)),
        }}
      >
        <SignIn />
      </AuthContext.Provider>
    );
    const email = getByPlaceholderText("Email");
    const password = getByPlaceholderText("Password");
    const submitBtn = getByTestId(signinTestIds.submitBtn);

    fireEvent.change(email, {
      target: { name: "email", value: "test@email.com" },
    });
    fireEvent.change(password, {
      target: {
        name: "password",
        value: "testpassword",
      },
    });
    fireEvent.submit(submitBtn);
  });
});
