import jwt from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import User from "../entity/User";

export default (handler: NextApiHandler) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null;

      if (token) {
        const user = jwt.verify(token, process.env.APP_SECRET!);
        req.user = user as Partial<User>;

        return handler(req, res);
      }
      return res.status(401).send("Login is required");
    } catch (e) {
      return res.status(500).send("Error validating token");
    }
  };
};
