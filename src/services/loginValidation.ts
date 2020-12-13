import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import UserModel from '../models/userModel';
import Error from '../errors/AppError';

export default class LoginValidation {
  public async execute(email: string, password: string) {
    const userRepository = getRepository(UserModel);

    const user = await userRepository.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error ('Email/password does not match.', 401);
    }

    const hashedPassword = user.password;

    const hashMatch = await compare(password, hashedPassword);

    if (!hashMatch) {
      throw new Error("Email/password does not match.", 401);
    }

    return user;
  }
}
