import { loadFeature, defineFeature } from 'jest-cucumber';
import * as request from 'supertest';
import { app } from '../app';
import createConnection from '../database';
import { resolve } from 'path';
import { Connection, getConnection, getRepository } from 'typeorm';
import { createUser, User } from './utils/createUser';
import UserModel from '../models/userModel';

const featureName = 'CreateUser';

const feature = loadFeature(resolve(__dirname, 'features', `${featureName}.feature`));

defineFeature(feature, test => {

  beforeAll(async () => {
    const connection = await createConnection() as unknown as Connection;

    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

  test('Entering all correct data', ({ given, when, then}) => {
    let user: User;

    given('I have created an user object with all correct data', () => {
      user = {
        name: 'john doe',
        cpf: 123456789,
        email: 'johndoe@test.com',
        password: 'doe',
        whatsapp: '123456789',
      };
    });

    when('I make a request to endpoint for create user', async () => {
      await createUser('/user', user);
    });

    then('I had an created user', async () => {

      const userRepository = getRepository(UserModel);

      const user = await userRepository.find();

      expect(user).toHaveLength(1);
      expect(user[0]).toHaveProperty('id');
    })
  });

  test('Entering an existent email', ({ given, when, then}) => {
    let user: User;
    let response: request.Response;

    given('I have created an user', async () => {
      user = {
        name: 'john doe',
        cpf: 123456789,
        email: 'johndoe@test.com',
        password: 'doe',
        whatsapp: '123456789',
      };

      await createUser('/user', user);
    });

    when('I make a request to create an user with a same email that I used when I created a previously user', async () => {
      response = await createUser('/user', user);
    });

    then('I should not be able to create a user', async () => {
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("User Already Exists");
    })
  });
});
