import { Router } from 'express';
import CartController from '../controllers/cartController';

const routes = Router();
const cartController = new CartController();

routes.post('/', cartController.addToCart);
routes.get('/:user_id', cartController.getProductsInCartByUserId);

export default routes;
