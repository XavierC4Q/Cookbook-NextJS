import getTestIDs from "../../utils/getTestId";
import { Form, Container, Header } from "semantic-ui-react";
import { useState, useContext } from "react";
import { AuthContext, IUserProfileConfig } from "../../context/authContext";
import Link from "next/link";

export const testIds = getTestIDs();

interface ISignupFields extends IUserProfileConfig {
  confirmPassword: string;
}

const signupFields: ISignupFields = {
  firstName: "",
  email: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const { signup } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    ...signupFields,
  });
  const [errors, setErrors] = useState({
    ...signupFields,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    switch (name) {
      case "confirmPassword":
        const matchingPasswords = inputs.password === inputs.confirmPassword;
        !matchingPasswords &&
          setErrors({ ...errors, confirmPassword: "Passwords must match" });
        break;
      case "password":
        const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        !inputs.password.match(validPassword) &&
          setErrors({
            ...errors,
            password:
              "Your password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
          });
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const isDisabled =
    Object.values(errors).every((e) => e) ||
    Object.values(inputs).every((i) => !i);

  return (
    <Container data-testid={testIds.signupPage}>
      <Form onSubmit={handleSubmit}>
        <Header size="medium" textAlign="center">
          Create an account today!
        </Header>
        <Form.Field>
          <label htmlFor="email">Enter Email</label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            required
            type="email"
            value={inputs.email}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="firstName">Enter Your First Name</label>
          <input
            id="firstName"
            name="firstName"
            onChange={handleChange}
            required
            type="text"
            value={inputs.firstName}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="lastName">Enter Your Last Name</label>
          <input
            id="lastName"
            name="lastName"
            onChange={handleChange}
            required
            type="text"
            value={inputs.lastName}
          />
        </Form.Field>
        <Form.Field
          error={
            errors.password
              ? {
                  content: errors.password,
                }
              : false
          }
        >
          <label htmlFor="password">Enter Password</label>
          <input
            id="password"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            required
            type="password"
            value={inputs.password}
          />
        </Form.Field>
        <Form.Field
          error={
            errors.confirmPassword
              ? {
                  content: errors.confirmPassword,
                }
              : false
          }
        >
          <label htmlFor="confirmPassword">Confirm Your Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            required
            type="password"
            value={inputs.confirmPassword}
          />
        </Form.Field>
        <Form.Button disabled={isDisabled}>Submit</Form.Button>
      </Form>
      <p>
        Already have an account? <Link href="/signin">Sign in here.</Link>
      </p>
    </Container>
  );
}

export default Signup;
