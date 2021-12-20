import { Router } from 'express';
import CartController from '../controllers/cartController';
import checkJwt from '../middlewares/checkJwt';

const routes = Router();
const cartController = new CartController();

routes.post('/', checkJwt.execute, cartController.addToCart);
routes.get('/:user_id', checkJwt.execute, cartController.getProductsInCartByUserId);
routes.delete('/:cart_id', checkJwt.execute, cartController.removeCart);

export default routes;
