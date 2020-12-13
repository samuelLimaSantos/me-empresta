import { getRepository } from 'typeorm';
import UserModel from '../models/userModel';
import Error from '../errors/AppError';

export default class GetUser {
  public async execute (id = undefined) {
    const userRepository = getRepository(UserModel);

    if (id) {
      const user = await userRepository.findOne({
        select: ["id", "photo_id", "name", "cpf", "email", "whatsapp"],
        where: {
          id
        }
      });

      if (!user) {
        throw new Error('User not found', 404);
      }

      return user;
    }

    const users = await userRepository.find({
      select: ["id", "photo_id", "name", "cpf", "email", "whatsapp"],
    });

    return users;
  }
}
