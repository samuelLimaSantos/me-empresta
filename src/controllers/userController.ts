import { Request, Response } from 'express';
import { promisify } from 'util';
import * as fs from 'fs';
import { getRepository } from 'typeorm';
import UserModel from '../models/userModel';
import CreateUser from '../services/createUser';
import hashPassword from '../services/user_aux/hashPassword';
import checkIfUserExists from '../services/user_aux/checkIfUserExists';


export default class UserController {
  public async create(request: Request, response: Response) {
    try {
      const {
        name,
        cpf,
        email,
        password,
        whatsapp,
      } = request.body;

      await checkIfUserExists(
        cpf,
        email,
      );

      const hashedPassword = await hashPassword(password);

      const createUser = new CreateUser();

      const user = await createUser.execute({
        photo_id: request.file.filename,
        name,
        cpf,
        email,
        password: hashedPassword,
        whatsapp,
      });

      return response.json(user);
    } catch (error) {
      console.log(error);
      const deleteAsync = promisify(fs.unlink);
      await deleteAsync(request.file.path);
      response.status(400).json({message: error.message});
    }

  }

  public async index (request: Request, response: Response) {
    const { userId } = request.params;

    const userRepository = getRepository(UserModel);

    const user = await userRepository.findOne({
      where: {
        id: userId
      }
    })

    user.password = "";

    return response.json(user);
  }
}
