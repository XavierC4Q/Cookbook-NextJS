import loginRequired from "../../../utils/loginRequired";
import { NextApiRequest, NextApiResponse } from "next";
import initializeDatabase from "../../../db/initDB";
import Profile from "../../../entity/Profile";

const handleUpdateProfile = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }
  try {
    const connection = await initializeDatabase();
    const profileRespository = connection.getRepository(Profile);
    const profile = await profileRespository.findOne(req.body.id);
    if (!profile) {
      return res.status(400).send(`No profile for id ${req.body.id}`);
    }

    delete req.body.id;

    await profileRespository.update(profile, { ...req.body });

    await connection.close();
    return res.status(200).send("Profile updated!");
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export default loginRequired(handleUpdateProfile);
