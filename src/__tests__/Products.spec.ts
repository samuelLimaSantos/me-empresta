import { getConnection } from 'typeorm';
import * as request from 'supertest';
import createConnection from '../database';
import { app } from '../app';
import * as path from 'path';
import { createUser } from './Authentication.spec';

type Product = {
  user_id: string;
  title: string;
  description: string;
  price: number;
  quantity_days: number;
  delivery_way: string;
  delivery_point: string;
  uf: string;
  city: string;
}

export async function createProduct(route: string, product: Product, token: string) {
  const imagePath = path.resolve(__dirname, 'avatar_fake.jpg');

  const productCreated = await request(app)
    .post(route)
    .set('Authorization', `Bearer ${token}`)
    .field('user_id', product.user_id)
    .field('title', product.title)
    .field('description', product.description)
    .field('price', product.price)
    .field('quantity_days', product.quantity_days)
    .field('delivery_way', product.delivery_way)
    .field('delivery_point', product.delivery_point)
    .field('uf', product.uf)
    .field('city', product.city)
    .attach('photo', imagePath);

  return productCreated;
}

describe("Products", () => {

  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });


  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

  it('should be able to create a new product', async() => {
    await createUser('/user', {
      name: 'john doe',
      cpf: 123456789,
      email: 'johndoe@test.com',
      password: 'fakepassword',
      whatsapp: '123456789'
    });

    const session = await request(app)
      .post('/session')
      .send({
        email: 'johndoe@test.com',
        password: 'fakepassword'
      });


    const product = await createProduct('/product', {
      user_id: session.body.userId,
      title: 'produto da resenha',
      city: 'Gaibu',
      delivery_point: 'Recife',
      delivery_way: 'mail',
      description: 'descrição legal',
      price: 78.90,
      quantity_days: 10,
      uf: 'PE',
    }, session.body.token);

    expect(product.status).toBe(200);
    expect(product.body).toHaveProperty('id');
  });

  it('should be able to list a product by id', async() => {
    const session = await request(app)
      .post('/session')
      .send({
        email: 'johndoe@test.com',
        password: 'fakepassword'
      });

    const productCreated = await createProduct('/product', {
      user_id: session.body.userId,
      title: 'produto da resenha 2',
      city: 'Gaibu',
      delivery_point: 'Recife',
      delivery_way: 'mail',
      description: 'descrição legal',
      price: 78.90,
      quantity_days: 100,
      uf: 'PE',
    }, session.body.token);

    const product = await request(app)
      .get(`/product/${productCreated.body.id}`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(product.status).toBe(200);
    expect(product.body).toHaveProperty('id');
  })
});
