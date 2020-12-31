import { NextApiRequest } from 'next';
import User from './entity/User';

declare module 'next' {
    interface NextApiRequest {
        user: Partial<User> | null;
    }
}