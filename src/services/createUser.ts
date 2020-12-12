import { getRepository } from 'typeorm';
import UserModel from '../models/userModel';

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

    const user = userRepository.create(userDate);

    await userRepository.save(user);

    user.password = '';

    return user;
  }
}
