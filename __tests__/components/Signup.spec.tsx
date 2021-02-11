import { AuthContext } from "../../context/authContext";
import { fireEvent, render } from "@testing-library/react";
import Signup, { testIds } from "../../components/Signup/Signup";
import { ISignupFields, IUserProfileConfig } from "../../types/index";

const INPUT: ISignupFields = {
  email: "signup@gmail.com",
  password: "6jhuK8472hS8y",
  confirmPassword: "6jhuK8472hS8y",
  firstName: "Sign",
  lastName: "Up",
};

describe("[COMPONENT] Signup", () => {
  const mockSignup = jest.fn((config: IUserProfileConfig) =>
    Promise.resolve(true)
  );
  test("can submit successfully", () => {
    const { getByTestId, debug, getByRole } = render(
      <AuthContext.Provider
        value={{
          signup: mockSignup,
        }}
      >
        <Signup />
      </AuthContext.Provider>
    );
    const inputNodes = Object.keys(INPUT).map(
      (k) => [k, getByTestId(testIds[k])] as [keyof ISignupFields, HTMLElement]
    );

    inputNodes.forEach((n) =>
      fireEvent.change(n[1], {
        target: {
          value: INPUT[n[0]],
        },
      })
    );
    fireEvent.click(getByRole("button"));
    expect(mockSignup).toHaveBeenCalledWith({
      email: INPUT.email,
      password: INPUT.password,
      firstName: INPUT.firstName,
      lastName: INPUT.lastName,
    } as IUserProfileConfig);
    debug();
  });
});
