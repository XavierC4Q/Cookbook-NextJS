import jwt from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import User from "../entity/User";

export default (handler: NextApiHandler) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization || null;

    if (token) {
      const user = jwt.verify(token, process.env.APP_SECRET!);
      req.user = user as Partial<User>;

      return handler(req, res);
    }

    return res.status(401).send("Login is required");
  };
};
