import { loadFeature, defineFeature } from 'jest-cucumber';
import * as request from 'supertest';
import { app } from '../app';
import createConnection from '../database';
import { resolve } from 'path';
import { Connection, getConnection } from 'typeorm';
import { createUser } from './utils/createUser';
import UserModel from '../models/userModel';

const feature = loadFeature(resolve(__dirname, 'features', 'Authentication.feature'));

defineFeature(feature, test => {

  beforeAll(async () => {
    const connection = await createConnection() as unknown as Connection;

    await connection[0].runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

  test('Entering a correct email and password', ({ given, when, then}) => {
    let user: UserModel;

    given('I have previously created an user with email and password', async () => {
      const { body } = await createUser('/user', {
        name: 'john doe',
        cpf: 123456789,
        email: 'johndoe@test.com',
        password: 'doe',
        whatsapp: '123456789'
      });

      user = body;
    });

    when('I enter my email and password correctly', () => {
      user.email = 'johndoe@test.com';
      user.password = 'doe'
    });

    then('I should be able to authenticate in application', async () => {
      const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: user.password
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    })
  });

  test('Entering a wrong email', ({ when, then}) => {
    let user: UserModel = {
      email: '',
      password: ''
    } as UserModel;

    when('I enter an incorrect email', () => {
      user.email = 'incorrect@test.com';
      user.password = 'doe'
    });

    then('I should not be able to authenticate in application', async () => {
      const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: user.password
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Email/password does not match.");
    })
  });

  test('Entering a wrong password', ({ given, when, then, and }) => {
    let user: UserModel;

    given('I have previously created an user with email and password', async () => {
      const { body } = await createUser('/user', {
        name: 'wrongPassword',
        cpf: 987654321,
        email: 'wrongPassword@test.com',
        password: 'correctly',
        whatsapp: '123456789'
      });

      user = body;
    });

    when('I enter my email correctly', () => {
      user.email = 'wrongPassword@test.com';
    });

    and('I enter my password incorrectly', () => {
      user.password = 'incorrectly'
    })

    then('I should not be able to authenticate in application', async () => {
      const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: user.password
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Email/password does not match.");
    })
  });
});
