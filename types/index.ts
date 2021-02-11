import User from '../entity/User';

export type AuthUser = Omit<User, "password">;

export interface IUserProfileConfig {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ISignupFields extends IUserProfileConfig {
  confirmPassword: string;
}
