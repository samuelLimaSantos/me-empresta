import { getRepository } from 'typeorm';
import UserModel from '../../models/userModel';

const checkIfUserExists = async (cpf: string, email: string) => {
  const userRepository = getRepository(UserModel);

  const hasUser = await userRepository.findOne({
    where: [
      {
        cpf
      },
      {
        email
      }
    ]
  });

  if (hasUser) {
    throw new Error('User Already Exists');
  }

  return
}

export default checkIfUserExists;
