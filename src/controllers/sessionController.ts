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

      console.log(user);

      const token = generateTokenJWT.execute(user.id);

      return response.json({ token });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
