import getTestIDs from "../../utils/getTestId";
import { Form, Container, Dimmer, Loader } from "semantic-ui-react";
import { useState, useContext } from "react";
import { AuthContext, IUserProfileConfig } from "../../context/authContext";

export const testIds = getTestIDs();

function Signup() {
  const { signup } = useContext(AuthContext);
  const [inputs, setInputs] = useState<IUserProfileConfig>({
    firstName: "",
    email: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <Container data-testid={testIds.signupPage}>
      <Form>
        <Form.Button>Submit</Form.Button>
      </Form>
    </Container>
  );
}

export default Signup;
