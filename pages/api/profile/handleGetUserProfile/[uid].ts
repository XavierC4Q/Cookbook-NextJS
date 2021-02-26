import initializeDatabase from "../../../../db/initDB";
import { NextApiRequest, NextApiResponse } from "next";
import loginRequired from "../../../../utils/loginRequired";
import User from "../../../../entity/User";
import { AuthUser } from "../../../../types";

const handleGetUserProfile = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const connection = await initializeDatabase();
  const userRepository = connection.getRepository(User);

  try {
    const { uid } = req.query;
    const user = await userRepository.findOneOrFail(
      {
        id: parseInt(uid as string),
      },
      { relations: ["profile"] }
    );

    const userData: AuthUser = {
      email: user.email,
      id: user.id,
      profile: user.profile,
    };

    await connection.close();
    return res.status(200).json({ data: userData });
  } catch (error) {
    console.error(error);
    await connection.close();
    return res.status(404).send("User not found");
  }
};

export default loginRequired(handleGetUserProfile);
