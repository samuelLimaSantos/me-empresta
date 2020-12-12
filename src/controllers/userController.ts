import { Request, Response } from 'express';
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
      response.status(400).json({message: error.message});
    }

  }
}
