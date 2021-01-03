import { NextApiRequest, NextApiResponse } from "next";
import loginRequired from "../../../utils/loginRequired";

const handleGetUser = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  return res.status(200).json({
    data: {
      user: req.user,
    },
  });
};

export default loginRequired(handleGetUser);
