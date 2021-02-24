// import initializeDatabase from "../../../../db/initDB";
import { NextApiRequest, NextApiResponse } from "next";
import loginRequired from "../../../../utils/loginRequired";

const handleGetUserProfile = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    console.log('CONSOLE LOG', req.query.uid);
    return res.end();
  } catch (error) {}
};

export default loginRequired(handleGetUserProfile);
