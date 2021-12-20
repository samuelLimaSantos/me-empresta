import * as path from 'path';
import * as request from 'supertest';
import { app } from '../../app';

export type User = {
  name: string;
  cpf: number;
  email: string;
  password: string;
  whatsapp: string;
}

export async function createUser(route: string, user: User) {
  const imagePath = path.resolve(__dirname, 'avatar_fake.jpg');

  const userCreated = await request(app)
    .post(route)
    .field('name', user.name)
    .field('cpf', user.cpf)
    .field('email', user.email)
    .field('password', user.password)
    .field('whatsapp', user.whatsapp)
    .attach('photo', imagePath);

  return userCreated;
}
