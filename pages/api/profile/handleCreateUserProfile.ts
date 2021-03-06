import { NextApiRequest, NextApiResponse } from "next";
import initializeDatabase from "../../../db/initDB";
import User from "../../../entity/User";
import Profile from "../../../entity/Profile";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const handleCreateUserProfile = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  } 
  try {
    const { firstName, lastName, email, password } = JSON.parse(req.body);
    const ROUNDS = 10;
    const salt = bcrypt.genSaltSync(ROUNDS);
    const hash = bcrypt.hashSync(password, salt);
    
    const connection = await initializeDatabase();
    const userRepository = connection.getRepository(User);
    const profileRepository = connection.getRepository(Profile);

    const newProfile = new Profile();
    newProfile.firstName = firstName;
    newProfile.lastName = lastName;
    await profileRepository.save(newProfile);

    const newUser = new User();
    newUser.email = email;
    newUser.password = hash;
    newUser.profile = newProfile;
    await userRepository.save(newUser);

    await connection.close();

    const userData = {
      email: newUser.email,
      id: newUser.id,
      profile: newUser.profile,
    };

    const token = jwt.sign(userData, process.env.APP_SECRET!, {
      expiresIn: "365d",
    });

    return res.status(201).json({
      data: {
        user: userData,
        token,
      },
    });
  } catch (e) {
    console.log('THE ERROR', e, req.body)
    return res.status(400).json({ message: e.message });
  }
};

export default handleCreateUserProfile;
