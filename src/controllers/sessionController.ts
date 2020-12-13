import { Request, Response } from 'express';
import LoginValidation from '../services/loginValidation';
import GenerateTokenJWT from '../services/generateTokenJWT';


const loginValidation = new LoginValidation();
const generateTokenJWT = new GenerateTokenJWT();

export default class SessionController {
  public async createSession(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const user = await loginValidation.execute(email, password);

      const token = generateTokenJWT.execute(user.id);

      return response.json({ token, userId: user.id });
    } catch (error) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}
