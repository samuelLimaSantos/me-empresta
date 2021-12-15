import { Router } from 'express';
import UserRoutes from './user.routes';
import SessionRoutes from './session.routes';
import ProductRoutes from './product.routes';
import CartRoutes from './cart.routes';

const routes = Router();

routes.use('/user', UserRoutes);
routes.use('/cart', CartRoutes);
routes.use('/session', SessionRoutes);
routes.use('/product', ProductRoutes);


export default routes;
