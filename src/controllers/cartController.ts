import { Request, Response } from 'express';
import { getMongoRepository} from 'typeorm';
import { Cart } from '../schemas/cartSchema';

export default class CartController {
  public async addToCart(request: Request, response: Response) {
    const cartRepository = getMongoRepository(Cart, 'mongo');

    const {
      products,
      user_id,
    } = request.body;

    const cartObject = cartRepository.create({
      products,
      user_id
    });

    await cartRepository.save(cartObject);

    return response.json();
  }

  public async getProductsInCartByUserId(request: Request, response: Response) {
    const cartRepository = getMongoRepository(Cart, 'mongo');

    const { user_id } = request.params;


    const products = await cartRepository.find({ where: {user_id} });
    console.log(products);

    return response.json(products);
  }
}
