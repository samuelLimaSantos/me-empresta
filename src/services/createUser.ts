import { getRepository } from 'typeorm';
import UserModel from '../models/userModel';
import Error from '../errors/AppError';

interface IRequestDTO {
  photo_id: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  whatsapp: string;
}


export default class CreateUser {
  public async execute (userDate: IRequestDTO) {
    const userRepository = getRepository(UserModel);

    try {
      const user = userRepository.create(userDate);

      await userRepository.save(user);

      user.password = '';

      return user;

    } catch (error) {
      throw new Error('Internal error during create new user', 500)  ;
    }

  }
}
