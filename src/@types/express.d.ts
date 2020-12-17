
declare namespace Express {
  export interface Request {
    user: string | object;
    key: string;

  }


}


declare namespace Express.Multer.File {
  export interface File{
    key: string;
  }
}

