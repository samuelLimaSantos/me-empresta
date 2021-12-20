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

    let cart = await cartRepository.findOne({ user_id });

    if (cart) {
      cart.products = products;
    } else {
      cart = cartRepository.create({
        products,
        user_id
      });
    }

    cart = await cartRepository.save(cart);

    return response.json(cart);
  }

  public async getProductsInCartByUserId(request: Request, response: Response) {
    const cartRepository = getMongoRepository(Cart, 'mongo');

    const { user_id } = request.params;


    const products = await cartRepository.find({ where: {user_id} });

    return response.json(products);
  }

  public async removeCart(request: Request, response: Response) {
    const cartRepository = getMongoRepository(Cart, 'mongo');

    const { cart_id } = request.params;

    await cartRepository.delete(cart_id);

    return response.send();
  }
}
