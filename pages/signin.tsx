import React, { useContext, useState } from "react";
import getTestIDs from "../utils/getTestId";
import { AuthContext } from "../context/authContext";
import Input from "../components/shared/Input";
import { Container, Form, Header, Dimmer, Loader } from "semantic-ui-react";

export const testIds = getTestIDs();

function SignIn() {
  const { user, signin, loading, error } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signin!(inputs.email, inputs.password);
  };

  return (
    <Container>
      <div data-testid={testIds.signinPage}>
        {loading && (
          <Dimmer active>
            <Loader>Signing you in now</Loader>
          </Dimmer>
        )}
        {!loading && !user && (
          <Form onSubmit={handleSubmit}>
            <Header size="medium">Sign In Here</Header>
            <Input
              id="_email"
              name="email"
              placeholder="Email"
              value={inputs.email}
              label="Enter Your Email"
              onChange={handleChange}
            />
            <Input
              id="_password"
              name="password"
              value={inputs.password}
              label="Enter Your Password"
              placeholder="Password"
              onChange={handleChange}
            />
            <Form.Button data-testid={testIds.submitBtn}>Submit</Form.Button>
          </Form>
        )}
        {error && <p>Could not sign you in</p>}
      </div>
    </Container>
  );
}

export default SignIn;
