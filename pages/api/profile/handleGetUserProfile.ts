import initializeDatabase from '../../../db/initDB';
import { NextApiRequest, NextApiResponse } from 'next';
import loginRequired from '../../../utils/loginRequired';

const handleGetUserProfile = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        
    } catch (error) {
        
    }
}

export default loginRequired(handleGetUserProfile);