import { sign } from 'jsonwebtoken';
import authConfig from '../config/authConfig';

export default class GenerateTokenJWT {
  public execute (id: number | string) {

    const { expiresIn } = authConfig.jwt;

    const secret = process.env.SECRET as string;

    const token = sign({
      id,
    },
    secret,
    {
      subject: String(id),
      expiresIn
    })

    return token;
  }
}
