import initializeDatabase from "../../../db/initDB";
import User from "../../../entity/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const handleSignIn = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const connection = await initializeDatabase();
    const { email, password } = req.body;
    const userRepository = connection.getRepository(User);

    const user = await userRepository.findOne({ email });

    if (user) {
      const correctPassword = bcrypt.compareSync(password, user.password);

      if (correctPassword) {
        const userData = {
          email: user.email,
          id: user.id,
          profile: user.profile,
        };

        const token = jwt.sign(userData, process.env.APP_SECRET!, {
          expiresIn: "1m",
        });

        await connection.close();
        return res.status(200).json({
          data: {
            user: userData,
            token,
          },
        });
      }
    }
    await connection.close();
    return res.status(404).send("No user with these credentials");
  } catch (e) {
    return res.status(401).send("Incorrect credentials");
  }
};

export default handleSignIn;
