import getTestIDs from "../../utils/getTestId";
import Input from "../shared/Input";
import { useState } from "react";
import { AuthContext } from '../../context/authContext';

export const testIds = getTestIDs();

function Signup() {
  const [inputs, setInputs] = useState({
    firstName: "",
    email: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return <div data-testid={testIds.signupPage}>Signup</div>;
}

export default Signup;
