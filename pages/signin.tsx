import React, { useContext, useState } from "react";
import getTestIDs from "../utils/getTestId";
import { AuthContext } from "../context/authContext";
import Input from "../components/shared/Input";

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
    <div data-testid={testIds.signinPage}>
      {loading && <div>Signing you in now...</div>}
      {!loading && !user && (
        <form onSubmit={handleSubmit}>
          <h2>Sign In Here</h2>
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
          <button data-testid={testIds.submitBtn} type="submit">Submit</button>
        </form>
      )}
      {error && <p>Could not sign you in</p>}
    </div>
  );
}

export default SignIn;
