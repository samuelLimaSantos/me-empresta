import { Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';

class CheckJwt {
  public execute(request: Request, response: Response, next: NextFunction) {
    const bearer = request.headers.authorization;

    if (!bearer) {
      return response.status(401).json({ error: 'Token is missing' });
    }

    const token = bearer.split(" ")[1];

    try {
      const decode = jwt.verify(token, process.env.SECRET);
      request.user = decode;
      next();
    } catch (error) {
      return response.status(401).json({ error: 'Error in authentication' });
    }
  }
}

export default new CheckJwt();
