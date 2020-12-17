import { Request, Response } from 'express';
import * as aws from 'aws-sdk';
import CreateUser from '../services/createUser';
import hashPassword from '../services/user_aux/hashPassword';
import checkIfUserExists from '../services/user_aux/checkIfUserExists';
import GetUsers from '../services/getUsers';

const s3 = new aws.S3()

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
        photo_id: request.key,
        name,
        cpf,
        email,
        password: hashedPassword,
        whatsapp,
      });

      return response.json(user);
    } catch (error) {
      s3.deleteObject({
        Bucket: 'upload-meempresta',
        Key: request.key,
      }).promise()
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
      response.status(500).json({message: error.message});
    }

  }

  public async index (request: Request, response: Response) {
    const { userId } = request.params;


    try {
      const getUsers = new GetUsers()

      const user = await getUsers.execute(userId);

      return response.json(user);

    } catch (error) {
      response.status(error.statusCode).json({message: error.message});
    }
  }

  public async store (request: Request, response: Response) {
    try {
      const getUsers = new GetUsers()

      const users = await getUsers.execute();

      return response.json(users);

    } catch (error) {
      response.status(error.statusCode).json({message: error.message});
    }
  }
}
