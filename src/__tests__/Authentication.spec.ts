import { getConnection } from 'typeorm';
import * as request from 'supertest';
import createConnection from '../database';
import { app } from '../app';
import * as path from 'path';

type User = {
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

describe("Authentication", () => {

  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });


  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

  it("should be not able to authenticate with a non existent account", async () => {
    const user = await request(app)
      .post('/session')
      .send({
        email: 'test@fake.com',
        password: 'fake123'
      });

    expect(user.status).toBe(401);
    expect(user.body).toHaveProperty("message");
    expect(user.body.message).toBe("Email/password does not match.");
  });

  it('should be able to create a new user', async () => {

    const user = await createUser('/user', {
      name: 'john doe',
      cpf: 123456789,
      email: 'johndoe@test.com',
      password: 'fakepassword',
      whatsapp: '123456789'
    });

    expect(user.status).toBe(200);
    expect(user.body).toHaveProperty('id');
  });


  it('should be able to authenticate on app', async () => {
    const user = await request(app)
      .post('/session')
      .send({
        email: 'johndoe@test.com',
        password: 'fakepassword'
      });

    expect(user.status).toBe(200);
    expect(user.body).toHaveProperty('token');
  });

  it('should be able to get user information', async () => {
    const createdUser = await createUser('/user', {
      name: 'João Gomes',
      cpf: 987654321,
      email: 'jao@test.com',
      password: 'joaotest',
      whatsapp: '123456789'
    });
    const userSession = await request(app).post('/session').send({
      email: createdUser.body.email,
      password: 'joaotest'
    })
    const userData = await request(app).get(`/user/${userSession.body.userId}`)
      .set('Authorization', ` Bearer ${userSession.body.token}`);

    expect(userData.body).toHaveProperty('id')
    expect(userData.body.id).not.toBeNull()
  });

});