
declare namespace Express {
  export interface Request {
    user: string | object;
    file: {
      key: string;
      location: string;
    }
  }
}

