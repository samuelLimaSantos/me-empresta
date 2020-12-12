import { sign } from 'jsonwebtoken';
import authConfig from '../config/authConfig';

export default class GenerateTokenJWT {
  public execute (id: string) {

    const { expiresIn } = authConfig.jwt;

    const secret = process.env.SECRET as string;

    const token = sign({
      id,
    },
    secret,
    {
      subject: id,
      expiresIn
    })

    return token;
  }
}
